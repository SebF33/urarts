import { ArtistRow } from "@utils/types.d.ts";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { DELAY_API_CALL } from "@utils/constants.ts";
import i18next from "i18next";
import "@utils/i18n/config.ts";
import ky from "ky";
import { languageSignal } from "@utils/signals.ts";
import { UrlBasePath } from "@/env.ts";
import { useEffect, useLayoutEffect, useState } from "preact/hooks";

import ArtistsLayout from "@islands/layout/ArtistsLayout.tsx";
import { WomanLogo } from "@components/Assets.tsx";


export default function WomenSearch() {
  const [searchResults, setSearchResults] = useState<ArtistRow[]>([]);

  const gender = "Femme";
  const grid =
    "grid gap-4 sm:gap-5 grid-cols-1 grid-cols-2 md:grid-cols-3 xl:grid-cols-5 mt-6 mb-2 md:mb-20 p-4";


  // Appel à l'API "Artistes"
  useEffect(() => {
    const timer = setTimeout(() => {
      ky.get(`${UrlBasePath}/api/artists?lng=${languageSignal.value}&gender=${gender}`)
        .json<ArtistRow[]>()
        .then((response) => {
          setSearchResults(response);
        });
    }, DELAY_API_CALL);

    return () => clearTimeout(timer);
  }, []);


  // Background pour la page des femmes artistes
  useLayoutEffect(() => {
    const body = document.querySelector("body");
    const main = document.querySelector<HTMLElement>('[data-name="women"]');

    if (body) {
      body.style.backgroundColor = colorScheme[currentColorScheme].gray;
    }

    if (main) {
      main.style.background = `url(/background/white)`;
      main.style.backgroundAttachment = "local";
      main.style.backgroundPosition = "center";
      main.style.backgroundSize = "3400px";
    }
  }, []);


  return (
    <>
      <div
        class={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}
      >
        <div
          class={`paper min-h-[30px] max-w-[140px] md:min-h-[60px] md:max-w-[280px] mt-6 mb-5 md:mt-9 md:mb-16`}
        >
          <div class="tape-section"></div>
          <h1 class={`text-2xl md:text-4xl leading-none font-medium text-center mb-2 ml-2`}>
            {i18next.t("title.women", { ns: "translation" })}
          </h1>
          <div class={`w-6/12 m-2`}>
            <WomanLogo />
          </div>
          <div class="tape-section"></div>
        </div>
      </div>

      <ArtistsLayout artists={searchResults} flag="women" grid={grid} />
    </>
  );
}
