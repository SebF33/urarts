import { ArtistRow } from "@utils/types.d.ts";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import i18next from "i18next";
import "@utils/i18n/config.ts";
import { useLayoutEffect } from "preact/hooks";

import ArtistsLayout from "@islands/layout/ArtistsLayout.tsx";

type Artists = Array<ArtistRow>;

export default function TalentsList(
  props: { artists: Artists },
) {
  const grid =
    "grid gap-4 sm:gap-5 grid-cols-1 grid-cols-2 md:grid-cols-3 xl:grid-cols-5 my-20 p-4";

  // Background pour la page des talents
  useLayoutEffect(() => {
    const body = document.querySelector("body");
    const main = document.querySelector<HTMLElement>('[data-name="talents"]');

    if (body) {
      body.style.backgroundColor = colorScheme[currentColorScheme].white;
    }

    if (main) {
      main.style.background = `url(/background/gray_half)`;
      main.style.backgroundAttachment = "local";
      main.style.backgroundPosition = "center";
      main.style.backgroundSize = "420px";
    }
  }, []);

  return (
    <>
      <div
        class={`p-4 max-w-7xl mx-auto mb-5 sm:mb-8 px-4 sm:px-6 lg:px-8`}
      >
        <div
          class={`paper min-h-[60px] max-w-[240px] mt-5`}
        >
          <div class="top-tape"></div>
          <h1 class={`text-5xl leading-none font-medium mx-auto`}>
            {i18next.t("title.talents", { ns: "translation" })}
          </h1>
        </div>
      </div>

      <ArtistsLayout artists={props.artists} flag="talents" grid={grid} />
    </>
  );
}
