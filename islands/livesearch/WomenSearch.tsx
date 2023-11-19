import { ArtistRow } from "@utils/types.tsx";
import ky from "ky";
import { tw } from "twind";
import { UrlBasePath } from "../../env.ts";
import { useEffect, useState } from "preact/hooks";

import ArtistsLayout from "@islands/layout/ArtistsLayout.tsx";
import { WomanLogo } from "@components/Assets.tsx";

export default function WomenSearch() {
  const [searchResults, setSearchResults] = useState<ArtistRow[]>([]);

  const gender = "Femme";
  const grid =
    "grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 pb-20";

  useEffect(() => {
    setTimeout(() => {
      ky.get(
        `${UrlBasePath}/api/artists?gender=${gender}`,
      )
        .json<ArtistRow[]>()
        .then((response) => {
          setSearchResults(response);
        });
    }, 150);
  }, []);

  return (
    <main class={tw`flex-grow font-brush`}>
      <div
        class={tw`p-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}
      >
        <div
          class={tw`paper max-w-[280px] mt-5 mb-16`}
        >
          <div class="tape-section"></div>
          <h1 class={tw`text-5xl leading-none font-medium mb-2 ml-2`}>
            Femmes artistes
          </h1>
          <div class={tw`w-full m-3`}>
            <WomanLogo />
          </div>
          <div class="tape-section"></div>
        </div>
      </div>

      <ArtistsLayout artists={searchResults} grid={grid} />
    </main>
  );
}
