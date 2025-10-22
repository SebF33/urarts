import i18next from "i18next";
import "@utils/i18n/config.ts";

export function WorldMapPaper() {
  const draggable = false;
  return (
    <div class="paper paper-shadow w-32 md:w-56 mx-10 mr-2 rotate-[15deg] transform-gpu">
      <div class="tape-section"></div>
      <a
        href="/worldmap"
        class="block w-full h-full"
        draggable={draggable}
        aria-label={i18next.t("paper.worldmap", { ns: "translation" })}
      >
        <img
          src="/worldmap.png"
          alt={i18next.t("paper.worldmap", { ns: "translation" })}
          title={i18next.t("paper.worldmap", { ns: "translation" })}
          class="w-full h-full object-cover"
          draggable={draggable}
        />
      </a>
      <div class="tape-section"></div>
    </div>
  );
}
