import i18next from "i18next";
import "@utils/i18n/config.ts";
import { Language } from "@utils/i18n/i18next.d.ts";
import { languageSignal } from "@utils/signals.ts";


export default function AboutNotePaper() {
  const draggable = false;

  // Langue
  function handleLanguage(lng: Language) {
    if (languageSignal.value !== lng) {
      i18next.changeLanguage(lng);
      languageSignal.value = lng;
      setTimeout(() => { globalThis.location.reload(); }, 100);
    }
  }


  return (
    <div class="paper max-w-[500px] mx-6 mt-6 mb-2 scale-[0.9] md:scale-[0.85] xl:scale-[0.8]">
      <div class="tape-section"></div>
      <div class="flex flex-col w-full p-4 font-medium text-sm md:text-base">
        {/* En-tête langue */}
        <div class="flex items-center mb-3 select-none">
          <p class="text-lg md:text-xl">
            {i18next.t("leonardo.lng", { ns: "translation" })}
            {" "}
          </p>
          <div class="inline-flex items-center space-x-2 ml-2">
            <button
              onClick={() => handleLanguage("en")}
              class="focus:outline-none"
            >
              <img
                class="w-9 hover:scale-110 transition-transform duration-50"
                src="/icons/Royaume-Uni.png"
                alt="en"
                draggable={draggable}
              />
            </button>
            <button
              onClick={() => handleLanguage("fr")}
              class="focus:outline-none"
            >
              <img
                class="w-9 hover:scale-110 transition-transform duration-50"
                src="/icons/France.png"
                alt="fr"
                draggable={draggable}
              />
            </button>
          </div>
        </div>
        {/* Contenu texte */}
        <div
          dangerouslySetInnerHTML={{ __html: i18next.t("about.msg", { ns: "translation" }) }}
        />
        {/* Logo Deno */}
        <a
          href="https://fresh.deno.dev"
          class="inline-block ml-auto mt-4"
          draggable={draggable}
          target="_blank"
          rel="noopener"
        >
          <img
            class="w-24 md:w-28"
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
