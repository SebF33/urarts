import { ArtCollection } from "@utils/types.tsx";
import ky from "ky";
import { tw } from "@twind";
import { useEffect, useState } from "preact/hooks";

import ArtsLayout from "@islands/layout/ArtsLayout.tsx";

type Arts = Array<ArtCollection>;

export default function HistoSearch() {
  const [searchResults, setSearchResults] = useState<Arts[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const type = "histocharacters";

  useEffect(() => {
    ky.get(
      `https://urarts.fly.dev/api/collection?type=${type}&name=${searchTerm}`,
    )
      .json<Arts[]>()
      .then((response) => {
        setSearchResults(response);
      });
  }, [searchTerm]);

  return (
    <main class={tw`flex-grow font-brush`}>
      <div
        class={tw`p-4 max-w-7xl mx-auto mb-4 sm:mb-16 px-4 sm:px-6 lg:px-8`}
      >
        <h1 class={tw`text-5xl font-medium mx-auto mb-2`}>
          Personnages historiques
        </h1>
        <h2 class={tw`text-lg font-medium mx-auto mb-1 w-48`}>
          Nom(s) :
        </h2>
        <div class={tw`brush-input-box relative w-48 mx-auto mb-4`}>
          <input
            type="text"
            value={searchTerm}
            onKeyPress={(e) => {
              e.key === "Enter" && e.preventDefault();
            }}
            onKeyUp={(e) => setSearchTerm(e.currentTarget.value)}
            class={tw`w-full rounded text-base outline-none py-1 px-3`}
          />
        </div>
      </div>

      <ArtsLayout
        arts={searchResults}
      />
    </main>
  );
}
