import { ArtistRow } from "@utils/types.tsx";
import ky from "ky";
import { tw } from "@twind";
import { useEffect, useState } from "preact/hooks";

import ArtistsLayout from "@islands/layout/ArtistsLayout.tsx";
import { WomanLogo } from "@components/Assets.tsx";

export default function ArtistsSearch() {
  const [searchResults, setSearchResults] = useState<ArtistRow[]>([]);

  const gender = "Femme";
  const grid =
    "grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 pt-10 pb-10 lg:pt-20 lg:pb-20";

  useEffect(() => {
    ky.get(
      `https://urarts.fly.dev/api/artists?gender=${gender}`,
    )
      .json<ArtistRow[]>()
      .then((response) => {
        setSearchResults(response);
      });
  }, []);

  return (
    <main class={tw`flex-grow font-brush`}>
      <div
        class={tw`p-4 max-w-7xl mx-auto mb-20 sm:mb-32 px-4 sm:px-6 lg:px-8`}
      >
        <h1 class={tw`text-5xl font-medium mx-auto mb-16 z-20`}>
          Femmes artistes
        </h1>
        <div class={tw`relative w-40 sm:w-60 mx-auto mt-6 mb-24`}>
          <div class={tw`absolute w-full -top-12`}>
            <WomanLogo />
          </div>
        </div>
      </div>
      <ArtistsLayout artists={searchResults} grid={grid} />
    </main>
  );
}