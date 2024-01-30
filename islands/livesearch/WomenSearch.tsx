import { ArtistRow } from "@utils/types.tsx";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { DELAY_API_CALL } from "@utils/constants.ts";
import ky from "ky";
import { UrlBasePath } from "../../env.ts";
import { useEffect, useLayoutEffect, useState } from "preact/hooks";

import ArtistsLayout from "@islands/layout/ArtistsLayout.tsx";
import { WomanLogo } from "@components/Assets.tsx";

export default function WomenSearch() {
  const [searchResults, setSearchResults] = useState<ArtistRow[]>([]);

  const gender = "Femme";
  const grid =
    "grid gap-4 sm:gap-5 grid-cols-1 grid-cols-2 md:grid-cols-3 xl:grid-cols-5 pb-20";

  // Appel à l'API
  useEffect(() => {
    setTimeout(() => {
      ky.get(
        `${UrlBasePath}/api/artists?gender=${gender}`,
      )
        .json<ArtistRow[]>()
        .then((response) => {
          setSearchResults(response);
        });
    }, DELAY_API_CALL);
  }, []);

  // Background pour la page des femmes artistes
  useLayoutEffect(() => {
    const body = document.querySelector("body");

    if (body) {
      body.style.background = `url(/background/white)`;
      body.style.backgroundColor = colorScheme[currentColorScheme].gray;
      body.style.backgroundPosition = "center";
      body.style.backgroundSize = "3400px";
    }
  }, []);

  return (
    <>
      <div
        class={`p-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}
      >
        <div
          class={`paper max-w-[280px] mt-5 mb-16`}
        >
          <div class="tape-section"></div>
          <h1 class={`text-5xl leading-none font-medium mb-2 ml-2`}>
            Femmes artistes
          </h1>
          <div class={`w-full m-3`}>
            <WomanLogo />
          </div>
          <div class="tape-section"></div>
        </div>
      </div>

      <ArtistsLayout artists={searchResults} flag="women" grid={grid} />
    </>
  );
}
