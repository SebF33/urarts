import { Any } from "any";
import { artModalOpenSignal } from "@utils/signals.ts";
import { DELAY_MODAL_CLOSE } from "@utils/constants.ts";
import i18next from "i18next";
import "@utils/i18n/config.ts";
import { useEffect, useRef, useState } from "preact/hooks";


type ArtModalProps = {
  readonly art: Any;
  readonly panel: string;
  readonly url: string;
};

export default function ArtModal({ art, panel, url }: ArtModalProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);


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


  // Fermeture de la modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };
    globalThis.addEventListener("keydown", handleKeyDown);
    return () => globalThis.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isVisible) {
      globalThis.addEventListener("click", handleClickOutside);
      return () => globalThis.removeEventListener("click", handleClickOutside);
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => artModalOpenSignal.value = false, DELAY_MODAL_CLOSE);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      handleClose();
    }
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


  return (
    <div
      onClick={(event: MouseEvent) => handleClickOutside(event)}
      class={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 z-[99999]
      modal-overlay ${isVisible ? "visible" : ""}`}
    >

      {/* Modal */}
      <div
        ref={modalRef}
        onClick={(event) => event.stopPropagation()}
        class={`relative bg-white mx-auto p-4 max-w-[90%] lg:max-w-4xl w-full max-h-[80vh] overflow-y-auto custom-scrollbar
        art-modal-container ${isVisible ? "visible" : ""}`}
      >
        <button
          onClick={handleClose}
          class="absolute top-2 right-3 text-dark hover:text-red text-base sm:text-xl md:text-2xl font-black"
        >
          &#10005;
        </button>

        <div class="flex flex-col md:flex-row gap-6">
          {/* Section gauche : Image */}
          <div class="flex-shrink-0 mt-2 mr-2 ml-2 flex flex-col items-center md:items-start">
            <img
              class="h-60 w-auto max-w-full object-contain drop-shadow-md md:h-40 lg:h-60"
              src={url}
              alt={art.name}
            />
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
          <div class="flex flex-col justify-start flex-grow text-center md:text-left">
            <h2 class="text-xl md:text-2xl font-bold leading-5 mb-2">{art.name + panelText(panel)}</h2>
            <p class="text-base mb-4 leading-5">
              <span class="font-semibold underline">{i18next.t("artists.artist", { ns: "translation" })}</span>{" "}
              {(art.first_name ?? "") + " " + art.last_name}
            </p>
            <p class="text-base italic">{art.movement}.</p>
          </div>
        </div>

        {/* Section bas : Description */}
        <div class="mt-6 pt-4 border-t text-center md:text-left">
          <h3 class="text-lg font-semibold underline">{i18next.t("modal.description", { ns: "translation" })}</h3>
          <p class="text-base leading-4">{art.info}</p>
        </div>
      </div>
    </div>
  );
}
