import { Any } from "any";
import {
  ART_IMG_WRAPPER,
  DELAY_DISPLAY,
  DELAY_MODAL_TRIGGER,
  NB_LOADING_ARTS,
  TALENTS,
} from "@utils/constants.ts";
import { ArtCollection } from "@utils/types.d.ts";
import {
  artModalOpenSignal,
  isClickableSignal,
  isForAloneArtworkSignal,
} from "@utils/signals.ts";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import i18next from "i18next";
import "@utils/i18n/config.ts";
import tippy from "tippyjs";
import { useEffect, useMemo, useState } from "preact/hooks";
import { useImageOnLoad } from "@utils/hooks/useImageOnLoad.ts";
import { useIntersectionObserver } from "@utils/hooks/useIntersectionObserver.ts";

import ArtModal from "@islands/layout/ArtModal.tsx";
import { PencilLine } from "@components/Assets.tsx";
import RollingGallery from "@islands/RollingGallery.tsx";


type Arts = Array<ArtCollection>;
interface ArtsLayoutProps {
  readonly arts: Arts;
  readonly font?: string;
  readonly ispersogallery?: boolean;
  readonly type?: string;
}


// Ajuster la luminosité d'une couleur HEX
function adjustColorBrightness(hex: string, amount: number): string {
  const color = hex.startsWith('#') ? hex.slice(1) : hex;
  const num = parseInt(color, 16);

  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));

  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
}


export default function ArtsLayout(
  props: ArtsLayoutProps,
) {
  const [display, setDisplay] = useState<boolean>(false);
  const [displayedArtIndex, setDisplayedArtIndex] = useState<number>(0);
  const { handleImageOnLoad, imageOnLoadStyle } = useImageOnLoad()
  const { isIntersecting, ref: endRef } = useIntersectionObserver({ threshold: 0.9 }) // Seuil d'intersection des éléments
  const [selectedArt, setSelectedArt] = useState<ArtCollection | null>(null);
  const [selectedPanel, setSelectedPanel] = useState<string>("");
  const [selectedUrl, setSelectedUrl] = useState<string>("");
  const [tippyInstances, setTippyInstances] = useState<Any[]>([]);
  
  const draggable = false;
  const isPersoGallery: boolean = !!props.ispersogallery;


  // Rendu des œuvres d'art
  const displayedArts = display ? props.arts.slice(0, displayedArtIndex + NB_LOADING_ARTS) : [];
  const galleryImages = useMemo(() => {
    return props.arts
      .slice()
      .sort(() => Math.random() - 0.5)
      .slice(0, 10)
      .map(item => ({
        artist_slug: item.artist_slug,
        id: item.id,
        url: item.url
      }));
  }, [props.arts]);


  // Délai d'affichage initial
  useEffect(() => {
    const timeoutId = setTimeout(() => { setDisplay(true); }, DELAY_DISPLAY);
    return () => clearTimeout(timeoutId);
  }, []);


  // Chargement à la fin de la liste
  useEffect(() => {
    if (isIntersecting) {
      if (displayedArtIndex + NB_LOADING_ARTS < props.arts.length) { // Vérifier s'il reste des éléments à afficher
        setDisplayedArtIndex(displayedArtIndex + NB_LOADING_ARTS); // Mettre à jour pour afficher les prochains
      }
    }
  }, [isIntersecting]);


  // Infobulles
  useEffect(() => {

    const isTouchDevice = () => {
      return (
        'ontouchstart' in globalThis || 
        navigator.maxTouchPoints > 0 || 
        globalThis.matchMedia("(pointer: coarse)").matches
      );
    };

    // Détruire seulement les instances qui ne sont pas visibles
    tippyInstances.forEach((instance) => {
      if (!instance.state.isVisible) { instance.destroy(); }
    });

    // Mettre à jour la liste des instances en supprimant celles qui ne sont pas visibles
    setTippyInstances((prevInstances) => prevInstances.filter((instance) => instance.state.isVisible));

    displayedArts.forEach((p) => {
      let content;
      let copyright;
      const artElement: HTMLElement | null = document.querySelector(`[data-artist-id="${p.id}"]`);

      if (artElement) {
        copyright = p.copyright === 0 ? '<s style="font-size:1.3em">©</s> ' + i18next.t("arts.public_domain", { ns: "translation" }) : '<span style="font-size:1.3em">©</span> ' + (p.first_name ?? "") + " " + p.last_name;

        if (props.type === "histocharacters") {
          content =
            `<p style="margin-top:2px;font-size:1.4em;line-height:1;color:${colorScheme[currentColorScheme].gray}"><strong>${p.name}</strong></p>
            <p style="margin-top:2px;font-size:1.1em;font-style:italic;line-height:1">${p.birthyear} — ${p.deathyear}</p>
            <p style="margin-top:6px;line-height:1">${i18next.t("artists.artist", { ns: "translation" })} <strong style="color:${p.color}"><a href="/art/${p.artist_slug}">${p.last_name}</a></strong></p>
            <div style="min-width:180px;margin-top:8px;text-justify:auto;line-height:1.1;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden">${p.info}</div>
            <p style="margin-top:2px;font-size:1.2em;line-height:1;text-align:end">${copyright}</p>`;
        } else {
          const isTalent: boolean = TALENTS.includes(p.artist_slug);
          const parts = [
            `<p style="margin-top:2px;font-size:1.4em;line-height:1;color:${colorScheme[currentColorScheme].gray}"><strong>${p.name}</strong></p>`,
            !isTalent && `<p style="margin-top:10px;font-size:1.1em;line-height:1"><strong>${p.movement}</strong></p>`,
            !isTalent && `<p style="line-height:1">${i18next.t("artists.artist", { ns: "translation" })} <strong style="color:${p.color}"><a href="/art/${p.artist_slug}">${p.last_name}</a></strong></p>`,
            `<div style="min-width:180px;margin-top:8px;text-justify:auto;line-height:1.1;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden">${p.info}</div>`,
            `<p style="margin-top:2px;font-size:1.2em;line-height:1;text-align:end">${copyright}</p>`,
          ];
          content = parts.filter(Boolean).join("");
        }

        // Création des infobulles pour chaque œuvre
        tippy(artElement, {
          allowHTML: true,
          content: content,
          interactive: true,
          placement: "bottom",
          theme: "urarts",
          trigger: isTouchDevice() ? "manual" : "mouseenter focus",
          zIndex: 30,
          onCreate(instance: Any) {
            setTippyInstances((prevInstances) => [...prevInstances, instance]);
          },
          onDestroy(instance: Any) {
            setTippyInstances((prevInstances) =>
              prevInstances.filter((i) => i !== instance)
            );
          },
        });
      }
    });

    return () => {
      // Nettoyer les listeners et instances pour éviter les fuites mémoire
      tippyInstances.forEach((instance) => instance.destroy());
    };
  }, [props.arts, isIntersecting]);


  // Clic sur une œuvre : ouverture de la modal
  const handleClick = (art: ArtCollection, panel: string, url: string) => {
    // pas d'action si le clic n'est pas autorisé
    if (!isClickableSignal.value) return;

    setSelectedArt(art);
    setSelectedPanel(panel);
    setSelectedUrl(url);

    setTimeout(() => artModalOpenSignal.value = true, DELAY_MODAL_TRIGGER);
  };


  // Regroupement des œuvres par année
  const artsByYear = (displayedArts ?? []).reduce((acc, art) => {
    const year = art.year ?? i18next.t("common.without_year", { ns: "translation" });
    if (!acc[year]) acc[year] = [];
    acc[year].push(art);
    return acc;
  }, {} as Record<string, typeof displayedArts[number][]>);

  const sortedYears = Object.keys(artsByYear).sort((a, b) => {
    const na = Number(a);
    const nb = Number(b);
    if (Number.isNaN(na) || Number.isNaN(nb)) return a.localeCompare(b);
    return nb - na; // années décroissantes
  });


  return (
    <>
      <div className="appear-effect-fast-fadein flex flex-col mx-auto mt-4 max-w-[600px] items-center justify-center">
        {/* Galerie roulante */}
        {galleryImages && galleryImages.length > 9 ? (
          <RollingGallery
            autoplay={true}
            images={galleryImages}
            ispersogallery={isPersoGallery}
            pauseOnHover={true}
            type={props.type}
          />
        ) : null}
      </div>
      <div class="flex flex-wrap mx-auto md:mx-10 mb-48">
        
        {/* Liste des œuvres d'art */}
        {displayedArts && displayedArts.length > 0
          ? (
            sortedYears.map((year) => (
              <section
                key={year}
                class="year-group w-full col-span-full my-6 md:my-10"
              >
                <div
                  class={`relative w-full ${!isForAloneArtworkSignal.value ? "mt-4 md:mt-10" : ""}`}
                >
                  {/* Trait crayonné */}
                  <div class="absolute inset-x-0 top-1/2 -translate-y-1/2">
                    <PencilLine aria-hidden="true" />
                  </div>
                  <div class="relative flex items-center justify-center gap-6">
                    {/* Nom de l'artiste */}
                    {isForAloneArtworkSignal.value && (
                      <div class="relative transform -rotate-6 z-10">
                        <div class="paper paper-shadow p-3 min-w-[80px] text-center">
                          <div class="top-tape"></div>
                          <p class="text-sm sm:text-xl md:text-2xl font-semibold leading-tight">
                            {artsByYear[year][0]?.first_name}{" "}
                            {artsByYear[year][0]?.last_name}
                          </p>
                        </div>
                      </div>
                    )}
                    {/* Année des œuvres */}
                    {!isForAloneArtworkSignal.value && (
                      <div class="relative z-10">
                        <div class="paper paper-shadow px-4 py-1 md:px-6 md:py-2 min-w-[120px] text-center">
                          <div class="top-tape"></div>
                          <p class="text-xl md:text-2xl font-semibold tracking-wide">
                            {year}
                          </p>
                        </div>
                      </div>
                    )}
                    {/* Avatar de l'artiste */}
                    {isForAloneArtworkSignal.value && (
                      <div class="relative transform rotate-4 z-10">
                        <div class="paper paper-shadow p-2">
                          <div class="top-tape"></div>
                          <img
                            src={artsByYear[year][0]?.avatar_url}
                            alt={`${artsByYear[year][0]?.first_name} ${artsByYear[year][0]?.last_name}`}
                            class="h-16 w-16 sm:h-24 sm:w-24 md:h-36 md:w-36 rounded-full object-cover z-10"
                            draggable={false}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Œuvres pour cette année */}
                <div class="flex flex-wrap justify-center">
                  {artsByYear[year].map((p, index) => {
                    const isLastItemOfLastYear = year === sortedYears[sortedYears.length - 1] && index === artsByYear[year].length - 1;
                    return (
                      <div
                        key={index + 1}
                        class={`art-container flex flex-col mx-auto`}
                      >
                        <div
                          id={p.id}
                          class={`art-wrap-${p.polyptych} ${p.custom_css}`}
                        >
                          {p.polyptych > 3 &&
                            (
                              <div
                                onClick={() => handleClick(p, '4', p.url_4)}
                                class={`art-frame art-frame-type-${p.frame} art-polyptych-${p.polyptych} cursor-pointer`}
                                style={{
                                  ...ART_IMG_WRAPPER.wrap,
                                  ...(p.frame === 2 || p.frame === 4 ? {
                                    border: `solid 1.8vmin ${p.color}`,
                                    borderBottomColor: adjustColorBrightness(p.color, 50),
                                    borderLeftColor: p.color,
                                    borderRightColor: p.color,
                                    borderTopColor: adjustColorBrightness(p.color, -20),
                                  } : {})
                                }}
                              >
                                <img
                                  style={{ ...ART_IMG_WRAPPER.image, ...imageOnLoadStyle.thumbnail }}
                                  src="/textures/placeholder_150.png"
                                  alt="placeholder_150"
                                />
                                <img
                                  onLoad={handleImageOnLoad}
                                  class={`max-w-full ${p.gap_4}`}
                                  style={{
                                    ...imageOnLoadStyle.fullSize,
                                    ...(p.frame === 2 || p.frame === 4 ? {
                                      border: 'solid 2px',
                                      borderBottomColor: adjustColorBrightness(p.color, 50),
                                      borderLeftColor: adjustColorBrightness(p.color, -20),
                                      borderRightColor: adjustColorBrightness(p.color, -20),
                                      borderTopColor: adjustColorBrightness(p.color, -40),
                                    } : {})
                                  }}
                                  src={p.url_4}
                                  alt={p.name + "_4"}
                                  draggable={draggable}
                                />
                              </div>
                            )}
                          {p.polyptych > 1 &&
                            (
                              <div
                                onClick={() => handleClick(p, '2', p.url_2)}
                                class={`art-frame art-frame-type-${p.frame} art-polyptych-${p.polyptych} cursor-pointer`}
                                style={{
                                  ...ART_IMG_WRAPPER.wrap,
                                  ...(p.frame === 2 || p.frame === 4 ? {
                                    border: `solid 1.8vmin ${p.color}`,
                                    borderBottomColor: adjustColorBrightness(p.color, 50),
                                    borderLeftColor: p.color,
                                    borderRightColor: p.color,
                                    borderTopColor: adjustColorBrightness(p.color, -20),
                                  } : {})
                                }}
                              >
                                <img
                                  style={{ ...ART_IMG_WRAPPER.image, ...imageOnLoadStyle.thumbnail }}
                                  src="/textures/placeholder_150.png"
                                  alt="placeholder_150"
                                />
                                <img
                                  onLoad={handleImageOnLoad}
                                  class={`max-w-full ${p.gap_2}`}
                                  style={{
                                    ...imageOnLoadStyle.fullSize,
                                    ...(p.frame === 2 || p.frame === 4 ? {
                                      border: 'solid 2px',
                                      borderBottomColor: adjustColorBrightness(p.color, 50),
                                      borderLeftColor: adjustColorBrightness(p.color, -20),
                                      borderRightColor: adjustColorBrightness(p.color, -20),
                                      borderTopColor: adjustColorBrightness(p.color, -40),
                                    } : {})
                                  }}
                                  src={p.url_2}
                                  alt={p.name + "_2"}
                                  draggable={draggable}
                                />
                              </div>
                            )}
                          <div
                            onClick={() => handleClick(p, '1', p.url)}
                            data-artist-id={p.id}
                            class={`art-frame art-frame-type-${p.frame} art-polyptych-${p.polyptych} cursor-pointer`}
                            style={{
                              ...ART_IMG_WRAPPER.wrap,
                              ...(p.frame === 2 || p.frame === 4 ? {
                                border: `solid 1.8vmin ${p.color}`,
                                borderBottomColor: adjustColorBrightness(p.color, 50),
                                borderLeftColor: p.color,
                                borderRightColor: p.color,
                                borderTopColor: adjustColorBrightness(p.color, -20),
                              } : {})
                            }}
                          >
                            {(p.frame === 0 || p.frame > 2) &&
                              (
                                <p
                                  id="name"
                                  class={`text-lighterdark font-${p.font ?? props.font}`}
                                >
                                  {p.name}
                                </p>
                              )}
                            <img
                              style={{ ...ART_IMG_WRAPPER.image, ...imageOnLoadStyle.thumbnail }}
                              src="/textures/placeholder_150.png"
                              alt="placeholder_150"
                            />
                            <img
                              onLoad={handleImageOnLoad}
                              class={`max-w-full ${p.gap_1}`}
                              style={{
                                ...imageOnLoadStyle.fullSize,
                                ...(p.frame === 2 || p.frame === 4 ? {
                                  border: 'solid 2px',
                                  borderBottomColor: adjustColorBrightness(p.color, 50),
                                  borderLeftColor: adjustColorBrightness(p.color, -20),
                                  borderRightColor: adjustColorBrightness(p.color, -20),
                                  borderTopColor: adjustColorBrightness(p.color, -40),
                                } : {})
                              }}
                              src={p.url}
                              alt={p.name}
                              draggable={draggable}
                            />
                          </div>
                          {p.polyptych > 2 &&
                            (
                              <div
                                onClick={() => handleClick(p, '3', p.url_3)}
                                class={`art-frame art-frame-type-${p.frame} art-polyptych-${p.polyptych} cursor-pointer`}
                                style={{
                                  ...ART_IMG_WRAPPER.wrap,
                                  ...(p.frame === 2 || p.frame === 4 ? {
                                    border: `solid 1.8vmin ${p.color}`,
                                    borderBottomColor: adjustColorBrightness(p.color, 50),
                                    borderLeftColor: p.color,
                                    borderRightColor: p.color,
                                    borderTopColor: adjustColorBrightness(p.color, -20),
                                  } : {})
                                }}
                              >
                                <img
                                  style={{ ...ART_IMG_WRAPPER.image, ...imageOnLoadStyle.thumbnail }}
                                  src="/textures/placeholder_150.png"
                                  alt="placeholder_150"
                                />
                                <img
                                  onLoad={handleImageOnLoad}
                                  class={`max-w-full ${p.gap_3}`}
                                  style={{
                                    ...imageOnLoadStyle.fullSize,
                                    ...(p.frame === 2 || p.frame === 4 ? {
                                      border: 'solid 2px',
                                      borderBottomColor: adjustColorBrightness(p.color, 50),
                                      borderLeftColor: adjustColorBrightness(p.color, -20),
                                      borderRightColor: adjustColorBrightness(p.color, -20),
                                      borderTopColor: adjustColorBrightness(p.color, -40),
                                    } : {})
                                  }}
                                  src={p.url_3}
                                  alt={p.name + "_3"}
                                  draggable={draggable}
                                />
                              </div>
                            )}
                          {p.polyptych === 5 &&
                            (
                              <div
                                onClick={() => handleClick(p, '5', p.url_5)}
                                class={`art-frame art-frame-type-${p.frame} art-polyptych-${p.polyptych} cursor-pointer`}
                                style={{
                                  ...ART_IMG_WRAPPER.wrap,
                                  ...(p.frame === 2 || p.frame === 4 ? {
                                    border: `solid 1.8vmin ${p.color}`,
                                    borderBottomColor: adjustColorBrightness(p.color, 50),
                                    borderLeftColor: p.color,
                                    borderRightColor: p.color,
                                    borderTopColor: adjustColorBrightness(p.color, -20),
                                  } : {})
                                }}
                              >
                                <img
                                  style={{ ...ART_IMG_WRAPPER.image, ...imageOnLoadStyle.thumbnail }}
                                  src="/textures/placeholder_150.png"
                                  alt="placeholder_150"
                                />
                                <img
                                  onLoad={handleImageOnLoad}
                                  class={`max-w-full ${p.gap_5}`}
                                  style={{
                                    ...imageOnLoadStyle.fullSize,
                                    ...(p.frame === 2 || p.frame === 4 ? {
                                      border: 'solid 2px',
                                      borderBottomColor: adjustColorBrightness(p.color, 50),
                                      borderLeftColor: adjustColorBrightness(p.color, -20),
                                      borderRightColor: adjustColorBrightness(p.color, -20),
                                      borderTopColor: adjustColorBrightness(p.color, -40),
                                    } : {})
                                  }}
                                  src={p.url_5}
                                  alt={p.name + "_5"}
                                  draggable={draggable}
                                />
                              </div>
                            )}
                        </div>
                        {(p.frame !== 0 && p.frame < 3) && (
                          <div class="frame-label flex mx-3">
                            <div class="paper paper-shadow transform-gpu appear-effect-very-fast-fadein min-h-[30px] md:min-h-[40px] min-w-[180px] mx-auto">
                              <div class="top-tape"></div>
                              <p
                                id="name"
                                class={`px-3 text-lighterdark font-${p.font ?? props.font} leading-none`}
                              >
                                {p.name}
                              </p>
                            </div>
                          </div>
                        )}
                        {/* Référence à la fin de la liste */}
                        {isLastItemOfLastYear && (
                          <div ref={endRef} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            ))
          )
          : ( // Pas de résultats
          <div class="paper paper-shadow transform-gpu appear-effect-fast-fadein min-h-[70px] max-w-[360px] mx-auto my-2">
            <div class="tape-section"></div>
            <p class="text-2xl md:text-3xl font-medium text-center leading-none break-words p-2">
              {i18next.t("common.no_results", { ns: "translation" })}
            </p>
            <div class="tape-section"></div>
          </div>
        )}

        {/* Modal */}
        {artModalOpenSignal.value && (
          <ArtModal
            art={selectedArt}
            ispersogallery={isPersoGallery}
            panel={selectedPanel}
            url={selectedUrl}
          />
        )}
      </div>
    </>
  );
}
