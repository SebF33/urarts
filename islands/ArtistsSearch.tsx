import { ArtistRow } from "@utils/types.tsx";
import ky from "ky";
import { css, tw } from "@twind";
import { useEffect, useState } from "preact/hooks";

import ArtistsLayout from "@components/ArtistsLayout.tsx";
import { PaintPalette } from "@components/Assets.tsx";

export default function ArtistsSearch() {
  const [searchNationality, setSearchNationality] = useState("France");
  const [searchResults, setSearchResults] = useState<ArtistRow[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    ky.get(
      `https://urarts.fly.dev/api/artists?nationality=${searchNationality}&name=${searchTerm}`,
    )
      .json<ArtistRow[]>()
      .then((response) => {
        setSearchResults(response);
      });
  }, [searchNationality, searchTerm]);

  const draggable = false;
  const grid =
    "grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 pt-10 pb-10 lg:pt-20 lg:pb-20";

  return (
    <main class={tw`flex-grow font-brush`}>
      <div
        class={tw`p-4 max-w-7xl mx-auto mb-44 sm:mb-28 px-4 sm:px-6 lg:px-8`}
      >
        <h1 class={tw`text-5xl font-medium mx-auto mb-16 z-20`}>
          Artistes
        </h1>
        <div class={tw`relative w-60 sm:w-80 mx-auto mt-6 mb-24`}>
          <div class={tw`absolute w-full -top-16`}>
            <PaintPalette />
          </div>
          <button
            onClick={() => setSearchNationality("")}
            class={tw`absolute flex items-center -top-16 left-20 sm:-top-14 sm:left-24 focus:outline-none`}
          >
            <img
              class={tw`w-12 sm:w-16`}
              src="/flags/world.png"
              alt="Monde"
              draggable={draggable}
            />
          </button>
          <button
            onClick={() => setSearchNationality("France")}
            class={tw`absolute flex items-center -top-12 right-16 sm:-top-10 sm:right-20 focus:outline-none`}
          >
            <img
              class={tw`w-8 sm:w-10`}
              src="/flags/france.png"
              alt="France"
              draggable={draggable}
            />
          </button>
          <button
            onClick={() => setSearchNationality("Espagne")}
            class={tw`absolute flex items-center -top-8 right-8 sm:-top-4 sm:right-11 focus:outline-none`}
          >
            <img
              class={tw`w-8 sm:w-10`}
              src="/flags/spain.png"
              alt="Espagne"
              draggable={draggable}
            />
          </button>
          <button
            onClick={() => setSearchNationality("Italie")}
            class={tw`absolute flex items-center -top-2 right-3 sm:top-3 sm:right-5 focus:outline-none`}
          >
            <img
              class={tw`w-8 sm:w-10`}
              src="/flags/italy.png"
              alt="Italie"
              draggable={draggable}
            />
          </button>
          <button
            onClick={() => setSearchNationality("Pays-Bas")}
            class={tw`absolute flex items-center top-5 right-1 sm:top-11 sm:right-2 focus:outline-none`}
          >
            <img
              class={tw`w-8 sm:w-10`}
              src="/flags/netherlands.png"
              alt="Pays-Bas"
              draggable={draggable}
            />
          </button>
          <button
            onClick={() => setSearchNationality("Belgique")}
            class={tw`absolute flex items-center top-12 right-4 sm:top-20 sm:right-5 focus:outline-none`}
          >
            <img
              class={tw`w-8 sm:w-10`}
              src="/flags/belgium.png"
              alt="Belgique"
              draggable={draggable}
            />
          </button>
          <button
            onClick={() => setSearchNationality("Allemagne")}
            class={tw`absolute flex items-center -bottom-24 right-14 sm:top-32 sm:left-56 focus:outline-none`}
          >
            <img
              class={tw`w-8 sm:w-10`}
              src="/flags/germany.png"
              alt="Allemagne"
              draggable={draggable}
            />
          </button>
          <button
            onClick={() => setSearchNationality("Pologne")}
            class={tw`absolute flex items-center right-24 sm:top-36 sm:left-44 focus:outline-none ${
              css(
                {
                  "bottom": "calc(-6.6rem)",
                },
              )
            }`}
          >
            <img
              class={tw`w-8 sm:w-10`}
              src="/flags/poland.png"
              alt="Pologne"
              draggable={draggable}
            />
          </button>
          <button
            onClick={() => setSearchNationality("Royaume-Uni")}
            class={tw`absolute flex items-center -bottom-24 left-11 sm:-bottom-40 sm:left-20 focus:outline-none`}
          >
            <img
              class={tw`w-8 sm:w-10`}
              src="/flags/united-kingdom.png"
              alt="Royaume-Uni"
              draggable={draggable}
            />
          </button>
          <button
            onClick={() => setSearchNationality("Japon")}
            class={tw`absolute flex items-center -bottom-20 left-3 sm:-bottom-36 sm:left-8 focus:outline-none`}
          >
            <img
              class={tw`w-8 sm:w-10`}
              src="/flags/japan.png"
              alt="Japon"
              draggable={draggable}
            />
          </button>
          <h2
            class={tw`absolute text-lg font-medium w-48 top-32 sm:top-5 left-0 right-0 mx-auto z-10`}
          >
            Prénom(s), nom(s) :
          </h2>
          <div
            class={tw`brush-input-box absolute w-48 top-40 sm:top-12 left-0 right-0 mx-auto z-10`}
          >
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
      </div>
      <ArtistsLayout artists={searchResults} grid={grid} />
    </main>
  );
}
