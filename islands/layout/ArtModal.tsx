import { Any } from "any";
import { artModalOpenSignal } from "@utils/signals.ts";
import { DELAY_MODAL_CLOSE } from "@utils/constants.ts";
import i18next from "i18next";
import "@utils/i18n/config.ts";
import { useEffect, useRef, useState } from "preact/hooks";


type ArtModalProps = {
  readonly art: Any;
  readonly url: string;
};

export default function ArtModal({ art, url }: ArtModalProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);


  // Ouverture de la modal
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 0);
    return () => clearTimeout(timer);
  }, []);


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


  return (
    <div
      onClick={(event: MouseEvent) => handleClickOutside(event)}
      class={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999] 
      modal-overlay ${isVisible ? "visible" : ""}`}
    >

      {/* Modal */}
      <div
        ref={modalRef}
        onClick={(event) => event.stopPropagation()}
        class={`relative bg-white rounded-lg m-4 p-6 max-w-4xl w-full
        art-modal-container ${isVisible ? "visible" : ""}`}
      >
        <button
          onClick={handleClose}
          class="absolute top-2 right-3 text-dark hover:text-red font-black"
        >
          &#10005;
        </button>

        <div class="flex flex-col md:flex-row gap-6">
          {/* Section gauche : Image */}
          <div class="flex-shrink-0 mt-2 mr-2 ml-2">
            <img
              class="h-60 w-auto max-w-full object-contain rounded-lg drop-shadow-md"
              src={url}
              alt={art.name}
            />
            {art.copyright === 0 ? (
              <>
                <s className="text-base">©</s>
                {i18next.t("arts.public_domain", { ns: "translation" })}
              </>
            ) : (
              <>
                <span className="text-base">©</span>
                {art.first_name ?? ""} {art.last_name}
              </>
            )}
          </div>

          {/* Section droite : Détails */}
          <div class="flex flex-col justify-start flex-grow">
            <h2 class="text-2xl font-bold leading-5 mb-2">{art.name}</h2>
            <p class="text-lg mb-4 leading-5">
              <span class="font-semibold underline">{i18next.t("artists.artist", { ns: "translation" })}</span>{" "}
              {(art.first_name ?? "") + " " + art.last_name}
            </p>
            <div class="mt-auto">
              <p class="italic">
                {art.movement}.
              </p>
            </div>
          </div>
        </div>

        {/* Section bas : Description */}
        <div class="mt-6 pt-4 border-t">
          <h3 class="text-lg font-semibold underline">{i18next.t("modal.description", { ns: "translation" })}</h3>
          <p class="leading-5">{art.info}</p>
        </div>
      </div>
    </div>
  );
}
