
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import i18next from "i18next";
import "@utils/i18n/config.ts";
import { useLayoutEffect } from "preact/hooks";


export default function Copyright() {

  // Background pour la page d'une collection d'arts sous copyright
  useLayoutEffect(() => {
    const body = document.querySelector("body");
    const main = document.querySelector<HTMLElement>('[data-name="collection"]');

    if (body) {
      body.style.backgroundColor = colorScheme[currentColorScheme].gray;
    }

    if (main) {
      main.style.background = `${colorScheme[currentColorScheme].gray} url(../textures/default.png)`;
      main.style.backgroundAttachment = "local";
      main.style.backgroundPosition = "center";
      main.style.backgroundSize = "480px";
    }
  }, []);


  return (
    <div class="flex-grow mb-24">
      <div class="max-w-2xl mx-auto py-10 px-6 mt-5">
        <div class="paper paper-shadow max-w-[600px] m-4">
          <div class="tape-section"></div>
          <p class="text-2xl md:text-3xl font-extrabold text-center text-lighterdark leading-5 p-4 z-10">
            <span class="text-7xl md:text-8xl">©</span>
            <br />
            {i18next.t("paper.copyright", { ns: "translation" })}
          </p>
          <div class="tape-section"></div>
        </div>
      </div>
    </div>
  );
}
