import i18next from "i18next";
import "@utils/i18n/config.ts";

export function WelcomePaper() {
  return (
    <div class="paper paper-shadow w-60 md:w-80 mx-10 md:mr-2 -rotate-[10deg] text-center">
      <div class="tape-section"></div>
      <div class="p-3 md:p-4 text-[0.8rem] md:text-[0.9rem] leading-snug text-dark">
        <h3 class="font-bold text-base md:text-xl mb-1 ml-12">
          Urarts.art
        </h3>
        <p>
          {i18next.t("paper.welcome", { ns: "translation" })}
        </p>
      </div>
      <div class="tape-section"></div>
    </div>
  );
}
