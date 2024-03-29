import { ArtRow } from "@utils/types.tsx";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { css } from "@twind/core";
import { DELAY_API_CALL, DELAY_REACH_HREF } from "@utils/constants.ts";
import { h } from "preact";
import ky from "ky";
import { UrlBasePath } from "../../env.ts";
import { useEffect, useLayoutEffect, useState } from "preact/hooks";

import { SearchInput } from "@components/SearchInput.tsx";

export default function ArtsSearch() {
  const [searchResults, setSearchResults] = useState<ArtRow[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Appel à l'API
  useEffect(() => {
    setTimeout(() => {
      ky.get(`${UrlBasePath}/api/arts?name=${searchTerm}`)
        .json<ArtRow[]>()
        .then((response) => {
          setSearchResults(response);
        });
    }, DELAY_API_CALL);
  }, [searchTerm]);

  // Background pour la page des œuvres d'art
  useLayoutEffect(() => {
    const body = document.querySelector("body");

    if (body) {
      body.style.background = `url(/background/gray)`;
      body.style.backgroundColor = colorScheme[currentColorScheme].white;
      body.style.backgroundPosition = "center";
      body.style.backgroundSize = "3200px";
    }
  }, []);

  function handleClick(event: h.JSX.TargetedMouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const href = (event.currentTarget as HTMLAnchorElement).href;
    setTimeout(() => {
      window.location.href = href;
    }, DELAY_REACH_HREF);
  }

  return (
    <div class={`p-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
      <div
        class={`paper min-h-[60px] max-w-[230px] my-5`}
      >
        <div class="top-tape"></div>
        <h1 class={`text-5xl font-medium mx-auto`}>
          Œuvres
        </h1>
      </div>

      <h2 class={`text-lg font-medium text-lighterdark mx-auto mb-1 w-48`}>
        Nom(s) :
      </h2>

      <div class="brush-input-box relative w-48 max-h-[68px] mx-auto mb-4">
        <SearchInput value={searchTerm} onInput={(e) => setSearchTerm((e.currentTarget as HTMLInputElement).value)} />
      </div>

      <div class={`flex flex-wrap`}>
        {searchResults &&
          (
            <ul
              class={`text-lighterdark lg:w-1/3 sm:w-1/2 p-2 ${
                css({
                  "mask-image":
                    `linear-gradient(to bottom, black 50%, transparent 100%)`,
                  "-webkit-mask-image":
                    `linear-gradient(to bottom, black 50%, transparent 100%)`,
                  "-o-mask-image":
                    `linear-gradient(to bottom, black 50%, transparent 100%)`,
                  "-moz-mask-image":
                    `linear-gradient(to bottom, black 50%, transparent 100%)`,
                })
              }`}
            >
              {searchResults.map((item, index) => (
                <li class={`mx-2 my-4`} key={index}>
                  <a
                    href={"/art/" + item.slug + "?id=" + item.id}
                    onClick={handleClick}
                    class={`cursor-pointer`}
                  >
                    <p class={`relative group text-xl leading-none`}>
                      <span>{item.name}</span>
                      <span class={`italic text-[1.05rem]`}>
                        {" "}({item.last_name})
                      </span>
                      <span
                        class={`absolute -bottom-2 left-0 w-0 h-1 transition-all group-hover:w-full ${
                          css({"background": item.color})
                        }`}
                      >
                      </span>
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          )}
      </div>
    </div>
  );
}
