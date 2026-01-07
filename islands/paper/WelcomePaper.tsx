import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import i18next from "i18next";
import "@utils/i18n/config.ts";
import { useLayoutEffect } from "preact/hooks";


export function WelcomePaper() {

  // Background pour la page d'accueil
  useLayoutEffect(() => {
    const body = document.querySelector("body");
    const main = document.querySelector<HTMLElement>('[data-name="home"]');
  
    if (body) {
      body.style.backgroundColor = colorScheme[currentColorScheme].gray;
    }
  
    if (main) {
      main.style.background = `url(/background/gray)`;
      main.style.backgroundAttachment = "local";
      main.style.backgroundPosition = "center";
      main.style.backgroundSize = "466px";
    }
  }, []);


  return (
    <div class="paper paper-shadow w-60 md:w-80 mx-10 md:mr-2 -rotate-[10deg] text-center">
      <div class="tape-section"></div>
      <div class="p-3 md:p-4 text-[0.8rem] md:text-[0.9rem] leading-snug text-dark">
        <h1 class="font-bold text-base md:text-xl mb-1 ml-12">
          Urarts.art
        </h1>
        <p>
          {i18next.t("paper.welcome", { ns: "translation" })}
        </p>
      </div>
      <div class="tape-section"></div>
    </div>
  );
}
