import { ArtCollection } from "@utils/types.tsx";
import { css } from "@twind/core";
import ky from "ky";
import { UrlBasePath } from "../../env.ts";
import { useEffect, useState } from "preact/hooks";

import { SearchInput } from "@components/SearchInput.tsx";

type Arts = Array<ArtCollection>;

export default function FamousArtSideBar() {
  const [searchResults, setSearchResults] = useState<Arts[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const draggable = false;
  const type = "famousart";

  // Appel à l'API
  useEffect(() => {
    setTimeout(() => {
      ky.get(
        `${UrlBasePath}/api/collection?type=${type}&name=${searchTerm}`,
      )
        .json<Arts[]>()
        .then((response) => {
          setSearchResults(response);
        });
    }, 150);
  }, [searchTerm]);

  function handleClick(event: h.JSX.TargetedMouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const href = (event.currentTarget as HTMLAnchorElement).href;
    setTimeout(() => {
      window.location.href = href;
    }, 200);
  }

  return (
    <section
      x-show="open"
      x-transition:enter="transition-opacity ease-out duration-300"
      x-transition:enter-start="opacity-0"
      x-transition:enter-end="opacity-100"
      x-transition:leave="transition-opacity ease-in duration-300"
      x-transition:leave-start="opacity-100"
      x-transition:leave-end="opacity-0"
      class={`absolute right-0 max-h-screen min-h-screen max-w-full hidden 2xl:flex bg-opacity-75 transition-opacity z-40 overflow-hidden ${
        css({
          "mask-image": `linear-gradient(to bottom, black 94%, transparent 96%)`,
          "-webkit-mask-image": `linear-gradient(to bottom, black 94%, transparent 96%)`,
          "-o-mask-image": `linear-gradient(to bottom, black 94%, transparent 96%)`,
          "-moz-mask-image": `linear-gradient(to bottom, black 94%, transparent 96%)`,
        })
      }`}
    >
      <div
        x-show="open"
        x-transition:enter="transition-transform ease-out duration-300"
        x-transition:enter-start="transform translate-x-full"
        x-transition:enter-end="transform translate-x-0"
        x-transition:leave="transition-transform ease-in duration-300"
        x-transition:leave-start="transform translate-x-0"
        x-transition:leave-end="transform translate-x-full"
        class="max-w-md"
      >
        <div class="h-full flex flex-col text-lighterdark shadow-xl">
          <div class="w-[282px] mt-16">
            <div
              x-on:click="open = false"
              class="paper cursor-pointer">
              <span class="sr-only">Fermer</span>
              <h1 class="p-2 text-2xl font-semibold text-center leading-none select-none">Œuvres d’art parmi les plus célèbres...</h1>
            </div>
            <div class="mt-5 px-4">
              <div class="brush-input-box relative w-48 max-h-[68px] mx-auto mb-4">
                <SearchInput value={searchTerm} onInput={(e) => setSearchTerm((e.currentTarget as HTMLInputElement).value)} />
              </div>
            </div>
          </div>
          <div class={`h-full px-4 overflow-auto ${
              css({
                "mask-image": `linear-gradient(to top, black 99%, transparent 100%)`,
                "-webkit-mask-image": `linear-gradient(to top, black 99%, transparent 100%)`,
                "-o-mask-image": `linear-gradient(to top, black 99%, transparent 100%)`,
                "-moz-mask-image": `linear-gradient(to top, black 99%, transparent 100%)`,
              })
            }`}
          >
            <div class="grid grid-cols-1 gap-4">
              {searchResults &&
                searchResults.map((p) => (
                  <div class="max-w-[250px] flex justify-center p-1 first:mt-4">
                    <a
                      x-on:mouseover="isHovered = true"
                      x-on:mouseout="isHovered = false"
                      x-data="{ isHovered: false }"
                      href={"/art/" + p.artist_slug + "?id=" + p.id}
                      onClick={handleClick}
                      class="cursor-pointer"
                      draggable={draggable}
                    >
                      <div
                        x-bind:class="{ 'transition-transform duration-100 transform scale-[1.04]': isHovered }"
                        class={`art-frame art-frame-type-${p.frame}`}>
                        <img
                          src={p.url}
                          alt={p.name}
                          draggable={draggable}
                        />
                      </div>
                    </a>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
