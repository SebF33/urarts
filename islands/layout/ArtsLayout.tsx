import { Any } from "any";
import { ART_IMG_WRAPPER, DELAY_DISPLAY, DELAY_MODAL_TRIGGER, NB_LOADING_ARTS } from "@utils/constants.ts";
import { ArtCollection } from "@utils/types.d.ts";
import { artModalOpenSignal } from "@utils/signals.ts";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import i18next from "i18next";
import "@utils/i18n/config.ts";
import tippy from "tippyjs";
import { useEffect, useState } from "preact/hooks";
import { useImageOnLoad } from "@utils/hooks/useImageOnLoad.ts";
import { useIntersectionObserver } from "@utils/hooks/useIntersectionObserver.ts";

import ArtModal from "@islands/layout/ArtModal.tsx";


type Arts = Array<ArtCollection>;
interface ArtsLayoutProps {
  arts: Arts;
  font?: string;
  type?: string;
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
  const [selectedArt, setSelectedArt] = useState(null);
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [tippyInstances, setTippyInstances] = useState<Any[]>([]);

  // Rendu des œuvres d'art
  const displayedArts = display ? props.arts.slice(0, displayedArtIndex + NB_LOADING_ARTS) : [];
  const draggable = false;


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
      const el = document.querySelector(`[data-artist-id="${p.id}"]`);

      if (el) {
        copyright = p.copyright === 0 ? '<s style="font-size:1.3em">©</s> ' + i18next.t("arts.public_domain", { ns: "translation" }) : '<span style="font-size:1.3em">©</span> ' + (p.first_name ?? "") + " " + p.last_name;

        if (props.type === "histocharacters") {
          content =
            `<p style="margin-top:2px;font-size:1.4em;line-height:1;color:${colorScheme[currentColorScheme].gray}"><strong>${p.name}</strong></p>
            <p style="margin-top:2px;font-size:1.1em;font-style:italic;line-height:1">${p.birthyear} — ${p.deathyear}</p>
            <p style="margin-top:6px;line-height:1">${i18next.t("artists.artist", { ns: "translation" })} <strong style="color:${p.color}"><a href="/art/${p.artist_slug}">${p.last_name}</a></strong></p>
            <p style="min-width:180px;margin-top:8px;line-height:1">${p.info}</p>
            <p style="margin-top:2px;font-size:1.2em;line-height:1;text-align:end">${copyright}</p>`;
        } else {
          content =
            `<p style="margin-top:2px;font-size:1.4em;line-height:1;color:${colorScheme[currentColorScheme].gray}"><strong>${p.name}</strong></p>
            <p style="margin-top:10px;font-size:1.1em;line-height:1"><strong><a href="/movement/${p.movement_slug}" f-client-nav={false}>${p.movement}</a></strong></p>
            <p style="line-height:1">${i18next.t("artists.artist", { ns: "translation" })} <strong style="color:${p.color}"><a href="/art/${p.artist_slug}" f-client-nav={false}>${p.last_name}</a></strong></p>
            <p style="min-width:180px;margin-top:8px;line-height:1">${p.info}</p>
            <p style="margin-top:2px;font-size:1.2em;line-height:1;text-align:end">${copyright}</p>`;
        }

        tippy(el, {
          allowHTML: true,
          content: content,
          interactive: true,
          placement: "bottom",
          theme: "urarts",
          trigger: isTouchDevice() ? "manual" : "mouseenter focus",
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
  }, [props.arts, isIntersecting]);

  
  // Modal
  const handleClick = (art, url) => {
    setSelectedArt(art);
    setSelectedUrl(url);
    setTimeout(() => artModalOpenSignal.value = true, DELAY_MODAL_TRIGGER);
  };


  return (
    <div class={`flex flex-wrap mx-auto mb-40`}>

      {/* Liste des œuvres d'art */}
      {displayedArts.map((p, index) => (
        <div key={index + 1} class={`flex flex-col mx-auto`}>
          <div
            id={p.id}
            class={`art-wrap-${p.polyptych}`}
          >
            {p.polyptych > 3 &&
              (
                <div
                  onClick={() => handleClick(p, p.url_4)}
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
                    src="/placeholder_150.png"
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
                  onClick={() => handleClick(p, p.url_2)}
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
                    src="/placeholder_150.png"
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
              onClick={() => handleClick(p, p.url)}
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
                src="/placeholder_150.png"
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
                  onClick={() => handleClick(p, p.url_3)}
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
                    src="/placeholder_150.png"
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
                  onClick={() => handleClick(p, p.url_5)}
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
                    src="/placeholder_150.png"
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
          {(p.frame !== 0 && p.frame < 3) &&
            (
              <div class="frame-label flex mx-3">
                <div
                  class={`paper min-h-[30px] md:min-h-[40px] min-w-[180px] mx-auto`}
                >
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
        </div>
      ))}

      {/* Référence à la fin de la liste */}
      <div ref={endRef}></div>

      {/* Modal */}
      {artModalOpenSignal.value && (
        <ArtModal art={selectedArt} url={selectedUrl} />
      )}
    </div>
  );
}
