import { Any } from "any";
import { ArtCollection } from "@utils/types.tsx";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { css } from "@twind/core";
import { DELAY_API_CALL, DELAY_REACH_HREF, DELAY_TOOLTIP_TRIGGER } from "@utils/constants.ts";
import { h } from "preact";
import ky from "ky";
import tippy from "tippyjs";
import { UrlBasePath } from "../../env.ts";
import { useEffect, useState } from "preact/hooks";

import { SearchInput } from "@components/SearchInput.tsx";

type Arts = Array<ArtCollection>;

export default function FamousArtSideBar() {
  const [searchResults, setSearchResults] = useState<Arts[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [tippyInstances, setTippyInstances] = useState<Any[]>([]);

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
    }, DELAY_API_CALL);
  }, [searchTerm]);

  // Infobulles
  useEffect(() => {
    tippyInstances.forEach((instance) => {
      instance.destroy();
    });
    setTippyInstances([]);

    searchResults.forEach((p) => {
      const art = document.querySelector(`[data-art-id="${p.id}"]`);

      if (art) {
        tippy(art, {
          allowHTML: true,
          content:
            `<p style="margin-top:2px;font-size:1.4em;line-height:1;color:${colorScheme[currentColorScheme].gray}"><strong>${p.name}</strong></p>
            <p style="line-height:1">Artiste : <strong style="color:${p.color}"><a href="/art/${p.artist_slug}" target="_blank">${p.last_name}</a></strong></p>`,
          delay: DELAY_TOOLTIP_TRIGGER,
          interactive: true,
          placement: "bottom",
          theme: "urarts",
          onCreate(instance: Any) {
            setTippyInstances((prevInstances) => [...prevInstances, instance]);
          },
          onDestroy(instance: Any) {
            setTippyInstances((prevInstances) =>
              prevInstances.filter((i) => i !== instance)
            );
          },
        });
      }
    });
  }, [searchResults]);

  function handleClick(event: h.JSX.TargetedMouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const href = (event.currentTarget as HTMLAnchorElement).href;
    setTimeout(() => {
      window.location.href = href;
    }, DELAY_REACH_HREF);
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
          <div class={`famous-results h-full px-4 overflow-auto ${
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
                        data-art-id={p.id}
                        x-bind:class="{ 'transform-gpu transition-transform duration-100 transform scale-[1.03]': isHovered }"
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
