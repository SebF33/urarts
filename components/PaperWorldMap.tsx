import i18next from "i18next";
import "@utils/i18n/config.ts";

export function PaperWorldMap() {
  const draggable = false;
  return (
    <div class="paper w-28 md:w-44 mx-10 md:mr-2 rotate-[15deg] transform-gpu">
      <div class="tape-section"></div>
      <a
        href="/worldmap"
        class="block w-full h-full"
        draggable={draggable}
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
