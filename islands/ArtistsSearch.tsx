import { ArtistRow } from "@utils/types.tsx";
import ky from "ky";
import { tw } from "@twind";
import { useEffect, useState } from "preact/hooks";

import ArtistsLayout from "@components/ArtistsLayout.tsx";

export default function ArtistsSearch() {
  const [searchResults, setSearchResults] = useState<ArtistRow[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    ky.get(`http://localhost:8000/api/artists?name=${searchTerm}`)
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
        <h2 class={tw`text-lg font-medium mx-auto mb-1 w-48`}>
          Artiste(s) :
        </h2>
        <div class={tw`relative mx-auto mb-4 w-48`}>
          <input
            type="text"
            value={searchTerm}
            onKeyPress={(e) => {
              e.key === "Enter" && e.preventDefault();
            }}
            onKeyUp={(e) => setSearchTerm(e.currentTarget.value)}
            class={tw`w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
          />
        </div>
      </div>
      <ArtistsLayout artists={searchResults} grid={grid} />
    </main>
  );
}
