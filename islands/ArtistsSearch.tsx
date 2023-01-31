import { ArtistRow } from "@utils/types.tsx";
import ky from "ky";
import { tw } from "@twind";
import { useEffect, useState } from "preact/hooks";

import ArtistsLayout from "@components/ArtistsLayout.tsx";

export default function ArtistsSearch() {
  const [searchResults, setSearchResults] = useState<ArtistRow[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    ky.get(`https://urarts.fly.dev/api/artists?name=${searchTerm}`)
      .json<ArtistRow[]>()
      .then((response) => {
        setSearchResults(response);
      });
  }, [searchTerm]);

  const grid =
    "grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 pt-10 pb-10 lg:pt-20 lg:pb-20";

  return (
    <main class={tw`flex-grow font-brush`}>
      <div class={tw`p-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
        <h1 class={tw`text-5xl font-medium mx-auto mb-2`}>
          Artistes
        </h1>
        <h2 class={tw`text-lg font-medium mx-auto mb-1 w-48`}>
          Prénom(s), nom(s) :
        </h2>
        <div class={tw`brush-input-box relative w-48 mx-auto mb-4`}>
          <input
            type="text"
            value={searchTerm}
            onKeyPress={(e) => {
              e.key === "Enter" && e.preventDefault();
            }}
            onKeyUp={(e) => setSearchTerm(e.currentTarget.value)}
            class={tw`w-full rounded border text-base outline-none py-1 px-3`}
          />
        </div>
      </div>
      <ArtistsLayout artists={searchResults} grid={grid} />
    </main>
  );
}
