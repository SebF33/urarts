import i18next from "i18next";
import "@utils/i18n/config.ts";
import { Language } from "@utils/i18n/i18next.d.ts";
import { languageSignal } from "@utils/signals.ts";

export default function Note() {
  const draggable = false;

  // Langue
  function handleLanguage(lng: Language) {
    if (languageSignal.value !== lng) {
      i18next.changeLanguage(lng);
      languageSignal.value = lng;
      setTimeout(() => { globalThis.location.reload(); }, 100);
    }
  };

  return (
    <div class="paper max-w-[700px] mx-auto mt-12 md:mt-2 mb-2">
      <div class="tape-section"></div>
      <div class="flex flex-col w-full p-6 font-medium">
        <div class="flex items-center mb-4 z-10 select-none">
          <p class="text-xl leading-6 md:text-2xl">
            {i18next.t("leonardo.lng", { ns: "translation" })}{" "}
          </p>
          <div class="appear-effect-very-fast-fadein inline-flex items-center space-x-2 ml-3">
            <button
              onClick={() => handleLanguage("en")}
              class="inline-block flex items-center focus:outline-none"
            >
              <img
                class="w-7 md:w-9 transform-gpu transition-all duration-50 ease-in-out hover:(transform scale-110)"
                src="/icons/Royaume-Uni.png"
                alt="en"
                draggable={draggable}
              />
            </button>
            {" "}
            <button
              onClick={() => handleLanguage("fr")}
              class="inline-block flex items-center focus:outline-none"
            >
              <img
                class="w-7 md:w-9 transform-gpu transition-all duration-50 ease-in-out hover:(transform scale-110)"
                src="/icons/France.png"
                alt="fr"
                draggable={draggable}
              />
            </button>
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: i18next.t("about.msg", { ns: "translation" }) }}/>
        <a
          href="https://fresh.deno.dev"
          class="appear-effect-very-fast-fadein inline-block ml-auto z-10"
          draggable={draggable}
          target="_blank"
          rel="noopener"
        >
          <img
            class="w-32"
            src="/deno-plush.svg"
            alt="deno-plush"
            draggable={draggable}
          />
        </a>
      </div>
      <div class="tape-section"></div>
    </div>
  );
}
