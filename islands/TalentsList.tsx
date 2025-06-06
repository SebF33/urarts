import { ArtistRow } from "@utils/types.d.ts";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { useLayoutEffect } from "preact/hooks";

import ArtistsLayout from "@islands/layout/ArtistsLayout.tsx";
import Title from "@islands/Title.tsx";

type Artists = Array<ArtistRow>;


export default function TalentsList(
  props: { readonly artists: Artists },
) {

  const grid =
    "grid gap-4 sm:gap-5 grid-cols-1 grid-cols-2 md:grid-cols-3 xl:grid-cols-5 mt-6 mb-2 md:mb-20 p-4";

  
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
      <div class={`p-4 max-w-7xl mx-auto mb-16 sm:mb-8 px-4 sm:px-6 lg:px-8`}>
        <Title
          name="talents"
          dimension="min-h-[30px] max-w-[115px] md:min-h-[60px] md:max-w-[230px]"
          margin="mt-2 md:mt-5 md:mb-6"
        />
      </div>

      <ArtistsLayout artists={props.artists} flag="talents" grid={grid} />
    </>
  );
}
