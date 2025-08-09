import { ArtCollection } from "@utils/types.d.ts";
import { artModalOpenSignal } from "@utils/signals.ts";
import { BG_STYLE, DELAY_MODAL_CLOSE, TALENTS } from "@utils/constants.ts";
import i18next from "i18next";
import "@utils/i18n/config.ts";
import { render } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";

import { ButtonCross } from "@components/Assets.tsx";


type ArtModalProps = {
  readonly art: ArtCollection;
  readonly panel: string;
  readonly url: string;
};


export default function ArtModal({ art, panel, url }: ArtModalProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement | null>(null);

  
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
    return () => clearTimeout(timer);
  }, []);
  
  
  // Désactiver le scroll à l'ouverture
  useEffect(() => {
    if (isVisible) {
      // Évite le décalage dû à la scrollbar
      const scrollbarWidth = globalThis.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.classList.add("no-scroll");
    } else {
      document.body.style.paddingRight = "";
      document.body.classList.remove("no-scroll");
    }

    return () => {
      // Réactiver le scroll si fermeture
      document.body.style.paddingRight = "";
      document.body.classList.remove("body-no-scroll");
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


  // Fermeture de la modal avec Escape ou clic à l'extérieur
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleClose();
      }
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

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => (artModalOpenSignal.value = false), DELAY_MODAL_CLOSE);
  };


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


  const modalLayout = (
    <div
      class={`fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-2 z-[99999]
      overlay-transition ${isVisible ? "visible" : ""}`}
    >

      {/* Modal */}
      <div
        ref={modalRef}
        onClick={(event) => event.stopPropagation()}
        class={`art-modal-container relative max-w-[90vw] md:max-w-[50vw] w-full max-h-[80vh] mx-auto p-4 bg-gray overflow-y-auto custom-scrollbar ${isVisible ? "visible" : ""}`}
        style={BG_STYLE[art.movement_slug]}
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
          <div class="flex-shrink-0 flex flex-col items-center md:items-start px-2 mt-5">
            <div class="img-marble-engraved-wrapper">
              <img
                src={url}
                alt={art.name}
                class="max-w-[70vw] md:max-w-[30vw] max-h-60 md:max-h-80 object-contain"
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
            <h2 class="title-marble-engraved text-xl md:text-2xl font-bold leading-5 mb-4">{art.name + panelText(panel)}</h2>
            <div class="flex gap-4 mb-4">
              <div class={`paper paper-shadow min-h-8 min-w-[100px] z-10 transform -rotate-3`}>
                <div class="top-tape max-h-3"></div>
                <a
                  href={`/art/${art.artist_slug}`}
                  class="text-base italic text-center leading-4 underline px-2 py-1 z-10 select-none"
                >
                  {(art.first_name ?? "") + " " + art.last_name}
                </a>
                <img
                  class="w-14 ml-3 p-1"
                  src={art.avatar_url}
                  alt={(art.first_name ?? "") + " " + art.last_name}
                />
              </div>
              {!TALENTS.includes(art.artist_slug) && (
                <div class="paper paper-shadow max-h-8 min-h-8 min-w-[100px] z-10 transform rotate-6">
                  <div class="top-tape"></div>
                  <a
                    href={`/movement/${art.movement_slug}`}
                    class={`text-base italic leading-4 underline px-2 py-1 z-10 select-none`}
                  >
                    {art.movement}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section bas : Description */}
        <div class="relative mt-6 pt-4 text-center md:text-left">
          <div class="drawline-animation"></div>
          <h3 class="text-lg font-semibold">{i18next.t("modal.description", { ns: "translation" })}</h3>
          <div class="paper paper-shadow w-[90%] md:w-[80%] min-h-[60px] mx-auto mb-4">
            <div class="tape-section"></div>
            <p class="text-lg text-justify leading-4 p-4 z-10">
              {art.info}
            </p>
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
