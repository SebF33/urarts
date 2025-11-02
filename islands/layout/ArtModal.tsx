import { ArtCollection } from "@utils/types.d.ts";
import {
  artistNameSignal,
  artistSlugSignal,
  artModalOpenSignal,
  isClickableSignal,
  isForAloneArtistSignal,
} from "@utils/signals.ts";
import {
  BG_STYLE,
  DELAY_REACH_ART_FROM_MODAL,
  TALENTS,
} from "@utils/constants.ts";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import i18next from "i18next";
import "@utils/i18n/config.ts";
import { render } from "preact";
import { useEffect, useMemo, useRef, useState } from "preact/hooks";

import { ButtonCross } from "@components/Assets.tsx";


type ArtModalProps = {
  readonly art: ArtCollection;
  readonly ispersogallery?: boolean;
  readonly panel: string;
  readonly url: string;
};


export default function ArtModal({ art, ispersogallery, panel, url }: ArtModalProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement | null>(null);
  const scrollYRef = useRef<number>(0);

  const lng = i18next.language;

  const isPersoGallery = !!ispersogallery;
  const basePath = isPersoGallery ? "../../textures/" : "../textures/";

  const draggable = false;
  const rotationClasses: string[] = ['rotate-3', '-rotate-6', 'rotate-2', '-rotate-2', 'rotate-1', '-rotate-3'];

  // Style pour page perso
  const LinksDisablerStyle = (
    isPersoGallery ? (
      <style>
        {`
          .art-modal-container.no-links a {
            text-decoration: none !important;
          }
          .art-modal-container.no-links a:not(:has(img)) {
            pointer-events: none !important;
          }
          .art-modal-container.no-links a img {
            pointer-events: auto !important;
          }
        `}
      </style>
    ) : null
  );


  // Background de la modal
  const resolvedBgStyle = useMemo(() => {
    const rawBgStyle = BG_STYLE[art.movement_slug];
    
    return rawBgStyle
      ? {
          ...rawBgStyle,
          background: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), ${rawBgStyle.background.replace("../textures/", basePath)}`,
        }
      : {
          background: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), ${colorScheme[currentColorScheme].gray} url(${basePath}default.png)`,
          backgroundSize: "480px",
        };
  }, [ispersogallery, art.movement_slug]);


  // Créer un conteneur de portail dans le body
  useEffect(() => {
    portalRef.current = document.createElement("div");
    document.body.appendChild(portalRef.current);

    return () => {
      if (portalRef.current) {
        render(null, portalRef.current);
        document.body.removeChild(portalRef.current);
        portalRef.current = null;
      }
    };
  }, []);


  // Ouverture de la modal
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 0);
  
    if (globalThis.location.hash !== "#modal") {
      globalThis.location.hash = "modal";
    }
  
    const onHash = () => {
      if (globalThis.location.hash !== "#modal") {
        handleClose({ fromHistory: true }); // fermer la modal
      }
    };
    addEventListener("hashchange", onHash);
  
    return () => {
      clearTimeout(timer);
      removeEventListener("hashchange", onHash);
      if (globalThis.location.hash === "#modal") {
        history.back();
      }
    };
  }, []);


  // Bloquer le défilement de la page à sa position actuelle à l'ouverture
  useEffect(() => {
    if (isVisible) {
      document.body.classList.add("no-scroll");
  
      // désactiver la restauration auto native du navigateur
      try { history.scrollRestoration = 'manual'; } catch {}
  
      // mémoriser la position actuelle
      scrollYRef.current = globalThis.scrollY || globalThis.pageYOffset || 0;
  
      // éviter le décalage dû à largeur de la scrollbar
      const scrollbarWidth = globalThis.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
  
      // geler la page à la position courante
      document.documentElement.style.scrollBehavior = 'auto';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      document.body.style.overscrollBehavior = 'contain';
    } else {
      document.body.classList.remove("no-scroll");
    }
  
    return () => {
      // réactiver le scroll si fermeture
      document.body.classList.remove("no-scroll");
      document.body.style.paddingRight = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.style.overscrollBehavior = '';
      document.documentElement.style.scrollBehavior = '';
      try { history.scrollRestoration = 'auto'; } catch {}
    };
  }, [isVisible]);


  // Annuler les clics dans la barre de navigation
  useEffect(() => {
    const navElement = document.getElementById("Urarts-Nav");
  
    if (navElement) {
      if (isVisible) {
        navElement.classList.add("pointer-events-none");
      } else {
        navElement.classList.remove("pointer-events-none");
      }
    }
  
    return () => {
      if (navElement) {
        navElement.classList.remove("pointer-events-none");
      }
    };
  }, [isVisible]);


  // Fermeture de la modal avec "Échap" ou sur clic à l'extérieur
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose(); // fermer la modal
    };
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) handleClose(); // fermer la modal
    };

    if (isVisible) {
      globalThis.addEventListener("keydown", handleKeyDown);
      globalThis.addEventListener("click", handleClickOutside);
    }

    return () => {
      globalThis.removeEventListener("keydown", handleKeyDown);
      globalThis.removeEventListener("click", handleClickOutside);
    };
  }, [isVisible]);


  const handleClose = (opts?: { fromHistory?: boolean }) => {
    if (!opts?.fromHistory && globalThis.location.hash === "#modal") {
      history.back();
      return;
    }
  
    setIsVisible(false);
    restoreScroll();
    // à voir : bug d'affichage si délai de fermeture, donc pas d'animation
    //setTimeout(() => (artModalOpenSignal.value = false), DELAY_MODAL_CLOSE);
    artModalOpenSignal.value = false
  };


  const restoreScroll = () => {
    const y = scrollYRef.current || 0;
  
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        globalThis.scrollTo(0, y);
        requestAnimationFrame(() => globalThis.scrollTo(0, y));
      });
    });
  };


  // Clic sur un lien dans la modal
  const handleLinkClick = (event: MouseEvent, href: string) => {
    // pas d'action si le clic n'est pas autorisé
    if (!isClickableSignal.value) return;
    // pas d'action pour une page perso
    if (isPersoGallery) return;

    // désactiver les clics pendant le délai
    isClickableSignal.value = false;

    event.preventDefault();

    // on précise que c'est pour du contenu concernant seulement un(e) artiste
    isForAloneArtistSignal.value = true;
    artistNameSignal.value = art.last_name;
    artistSlugSignal.value = art.artist_slug;
    
    // si c'est dans une page perso
    //const finalHref = isPersoGallery ? `${href}/gallery` : href;

    handleClose(); // fermer la modal

    // pour préserver la navigation Fresh côté client
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = href;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, DELAY_REACH_ART_FROM_MODAL);

    // réactiver les clics après le délai
    setTimeout(() => {
      isClickableSignal.value = true;
    }, DELAY_REACH_ART_FROM_MODAL + 200);
  };


  // Pas de liens si page perso
  useEffect(() => {
    if (!isPersoGallery || !modalRef.current) return;

    const anchors = modalRef.current.querySelectorAll<HTMLAnchorElement>("a");
    anchors.forEach((a) => {
      if (a.hasAttribute("href")) {
        a.dataset.href = a.getAttribute("href") || "";
        a.removeAttribute("href");
      }
      a.setAttribute("aria-disabled", "true");
      a.setAttribute("tabindex", "-1");
    });

    return () => {
      anchors.forEach((a) => {
        if (a.dataset.href) {
          a.setAttribute("href", a.dataset.href);
          delete a.dataset.href;
        }
        a.removeAttribute("aria-disabled");
        a.removeAttribute("tabindex");
      });
    };
  }, [isPersoGallery, isVisible]);


  // Panneau
  function panelText(panel: string) {
    let txt = '';

    if (panel === '2') {
      txt = ` ${i18next.t("modal.panel_left", { ns: "translation" })}`;
    } else if (panel === '3') {
      txt = ` ${i18next.t("modal.panel_right", { ns: "translation" })}`;
    } else if (panel === '4') {
      txt = ` ${i18next.t("modal.panel_far_left", { ns: "translation" })}`;
    } else if (panel === '5') {
      txt = ` ${i18next.t("modal.panel_far_right", { ns: "translation" })}`;
    }
  
    return txt;
  }


  // Formatage des dimensions (FR en cm, EN en inches)
  const nfCM = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 1 });
  const nfIN = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });

  const formatDimensions = (w?: number | string, h?: number | string) => {
    const toNum = (v: unknown) => (typeof v === "string" ? Number(v) : v) as number;
    const ww = toNum(w);
    const hh = toNum(h);
    
    if (!Number.isFinite(ww) || !Number.isFinite(hh)) {
      return `${h} × ${w} ${lng === "fr" ? "cm" : "in"}`; // fallback brut si invalide
    }
    
    if (lng === "fr") {
      // convention FR : hauteur × largeur en cm
      return `${nfCM.format(hh)} × ${nfCM.format(ww)} cm`;
    } else {
      // convention EN : width × height en inches (cm / 2.54)
      const wIn = ww / 2.54;
      const hIn = hh / 2.54;
      return `${nfIN.format(wIn)} × ${nfIN.format(hIn)} in`;
    }
  };


  const modalLayout = (
    <div
      class={`fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-2 z-[99999]
      overlay-transition ${isVisible ? "visible" : ""}`}
    >
      {LinksDisablerStyle}

      {/* Modal */}
      <div
        ref={modalRef}
        class={`art-modal-container relative max-w-[90vw] md:max-w-[50vw] w-full max-h-[80vh] mx-auto p-4 bg-gray overflow-y-auto custom-scrollbar ${isVisible ? "visible" : ""} ${isPersoGallery ? "no-links" : ""}`}
        style={resolvedBgStyle}
      >
        <button
          onClick={handleClose}
          class="absolute top-2.5 right-2.5 text-lighterdark hover:text-red focus:outline-none"
          aria-label="Fermer"
        >
          <ButtonCross />
        </button>

        <div class="flex flex-wrap gap-6">
          {/* Section gauche : Image */}
          <div class="flex-shrink-0 flex flex-col items-start md:items-start px-2 mt-5">
            <div class="img-marble-engraved-wrapper max-w-[50vw] md:max-w-[30vw]">
              <img
                src={url}
                alt={art.name}
                class="max-h-40 md:max-h-80 object-contain"
                draggable={draggable}
              />
            </div>
            {art.copyright === 0 ? (
              <div class="flex items-center">
                <s class="text-base inline">©</s>
                <span class="text-base inline ml-1">{i18next.t("arts.public_domain", { ns: "translation" })}</span>
              </div>
            ) : (
              <div class="flex items-center">
                <span class="text-base inline">©</span>
                <span class="text-base inline ml-1">{art.first_name ?? ""} {art.last_name}</span>
              </div>
            )}
          </div>

          {/* Section droite : Détails */}
          <div class="flex flex-col justify-start text-center md:text-left flex-grow w-full md:w-auto">
            <div class="flex items-center justify-center md:justify-start gap-1 md:gap-2 mb-4">
              {/* Titre */}
              <h2 class="title-marble-engraved text-xl md:text-2xl font-bold leading-5">
                {art.name + panelText(panel)}
              </h2>
              {/* Année */}
              {art.year && (
                <div class="paper paper-shadow min-h-12 min-w-[50px] inline-flex items-center p-1 z-10 transform -rotate-3 rounded-md">
                  <div class="top-tape h-2 min-h-2 max-h-2 max-w-[70%] -mb-1"></div>
                  <span class="w-full text-xl leading-4 text-center">
                    {art.year}
                  </span>
                </div>
              )}
              {/* Dimensions */}
              {art.width_cm != null && art.height_cm != null && (
                <div class="paper paper-shadow min-h-12 min-w-[70px] inline-flex items-center px-2 py-1 z-10 transform rotate-12 rounded-md">
                  <div class="top-tape h-2 min-h-2 max-h-2 max-w-[70%] -mb-1"></div>
                  <span class="w-full text-md leading-4 text-center">
                    {formatDimensions(art.width_cm, art.height_cm)}
                  </span>
                </div>
              )}
            </div>

            {/* Artiste et mouvement */}
            <div class="flex gap-4 m-auto md:m-2">
              <div class={`paper paper-shadow min-h-8 min-w-[100px] max-w-[90vw] sm:max-w-[320px] transform -rotate-3`}>
                <div class="top-tape h-4 max-h-4 min-h-4 max-w-[90%]"></div>
                <div class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2 px-2 py-1 z-10 select-none">
                  <div class="text-sm sm:text-base leading-4 select-none min-w-0 whitespace-normal break-keep">
                    {(art.first_name ?? "") + " " + art.last_name}
                  </div>
                  <a
                    onClick={(e) => handleLinkClick(e, `/art/${art.artist_slug}`)}
                    class="m-1 shrink-0"
                    title={(art.first_name ?? "") + " " + art.last_name}
                    draggable={draggable}
                  >
                    <img
                      src={art.avatar_url}
                      alt={(art.first_name ?? "") + " " + art.last_name}
                      class="h-14 sm:h-16 max-w-full object-cover flex-none"
                      draggable={draggable}
                    />
                  </a>
                </div>
              </div>
              {!TALENTS.includes(art.artist_slug) && (
                <div class="paper paper-shadow max-h-8 min-h-8 min-w-[100px] transform rotate-6">
                  <div class="top-tape"></div>
                  <a
                    onClick={(e) => handleLinkClick(e, `/movement/${art.movement_slug}`)}
                    class={`text-base italic leading-4 underline px-2 py-1 z-10 select-none`}
                    draggable={draggable}
                  >
                    {art.movement}
                  </a>
                </div>
              )}
            </div>

            {/* Tags de l'œuvre */}
            {art.tags && art.tags.length > 0 && (
              <div class="flex flex-wrap gap-3 my-4">
                {art.tags.map((tag, idx) => (
                  <div
                    key={idx}
                    class={`paper paper-shadow transform ${rotationClasses[idx % rotationClasses.length]} max-w-[44vw] sm:max-w-[220px] rounded-md`}
                  >
                    <a
                      onClick={(e) => handleLinkClick(e, `/tag/${tag.slug}`)}
                      class="block flex flex-col items-center gap-1 px-2 py-1 z-10 select-none text-xs sm:text-sm leading-4 min-w-0 break-words whitespace-normal [hyphens:auto]"
                      draggable={draggable}
                    >
                      <div class="top-tape h-4 min-h-4 max-h-4 max-w-[85%] -mb-2"></div>
                      <img
                        src={`/icons/${tag.name}.png`}
                        alt={tag.name}
                        title={tag.name}
                        class="w-8"
                        draggable={draggable}
                      />
                      <span
                        class="block text-[11px] sm:text-xs leading-4 text-lighterdark text-center w-full truncate"
                        title={tag.name}
                      >
                        {tag.name}
                      </span>
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Section bas : Description */}
        <div class="relative mt-6 pt-4 text-center md:text-left">
          <div class="drawline-animation"></div>
          <h3 class="text-lg font-semibold">{i18next.t("modal.description", { ns: "translation" })}</h3>
          <div class="paper paper-shadow w-[90%] md:w-[80%] min-h-[60px] mx-auto mb-4">
            <div class="tape-section"></div>
            <div
              class="art-modal-info text-lg text-justify leading-4 p-4 z-10 select-none"
              dangerouslySetInnerHTML={{ __html: art.info }}
            >
            </div>
            <div class="tape-section"></div>
          </div>
        </div>
      </div>
    </div>
  );


  // Rendre le contenu dans le portail
  useEffect(() => {
    if (portalRef.current) {
      render(modalLayout, portalRef.current);
    }
  }, [modalLayout]);


  return null;
}
