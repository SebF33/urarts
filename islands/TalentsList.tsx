import { ArtistRow } from "@utils/types.tsx";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { useLayoutEffect } from "preact/hooks";

import ArtistsLayout from "@islands/layout/ArtistsLayout.tsx";

type Artists = Array<ArtistRow>;

export default function TalentsList(
  props: { artists: Artists },
) {
  const grid =
    "grid gap-4 sm:gap-5 lg:gap-64 xl:gap-96 grid-cols-1 grid-cols-2 pt-10 pb-10 lg:pt-20 md:pb-4 lg:pb-0";

  // Background pour la page des talents
  useLayoutEffect(() => {
    const body = document.querySelector("body");

    if (body) {
      body.style.background = `url(/background/gray_half)`;
      body.style.backgroundColor = colorScheme[currentColorScheme].white;
      body.style.backgroundPosition = "center";
      body.style.backgroundSize = "420px";
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
          <h1
            class={`text-5xl leading-none font-medium mx-auto`}
          >
            Talents
          </h1>
        </div>
      </div>

      <ArtistsLayout artists={props.artists} flag="talents" grid={grid} />
    </>
  );
}
