import { ArtCollection, ArtRow } from "@utils/types.d.ts";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { css } from "@twind/core";
import {
  DELAY_API_CALL,
  DELAY_DEBOUNCE,
  DELAY_REACH_HREF,
  TAGS,
} from "@utils/constants.ts";
import { h } from "preact";
import i18next from "i18next";
import "@utils/i18n/config.ts";
import ky from "ky";
import { isForAloneArtistSignal, languageSignal } from "@utils/signals.ts";
import { UrlBasePath } from "@/env.ts";
import { useDebounce } from "@utils/hooks/useDebounce.ts";
import { useEffect, useLayoutEffect, useState } from "preact/hooks";

import Preview from "@islands/Preview.tsx";
import { SearchInput } from "@islands/input/SearchInput.tsx";
import TagsPapers from "@/islands/paper/TagsPapers.tsx";
import Title from "@islands/paper/Title.tsx";


type Arts = Array<ArtCollection>;


export default function ArtsSearch() {
  const [hoveredImageUrl, setHoveredImageUrl] = useState<object | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<number | null>(null);
  const [searchResults, setSearchResults] = useState<ArtRow[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedValue = useDebounce<string>(searchTerm, DELAY_DEBOUNCE)

  const draggable = false;

  isForAloneArtistSignal.value = false;


  // Aperçu
  useEffect(() => {
    async function fetchInitialPreview() {
      try {
        const response = await ky.get(`${UrlBasePath}/api/arts?lng=${languageSignal.value}&random`).json<ArtRow[]>();

        if (response && response.length > 0) {
          const firstArt = response[0];
          getPreviewImageUrl(firstArt.id.toString(), firstArt.name, firstArt.slug, firstArt.url);
        }
      } catch (error) {
        console.error("Error", error);
      }
    }

    fetchInitialPreview();
  }, []);


  useEffect(() => {
    const previews = document.querySelectorAll(".preview");
    previews.forEach(preview => { preview.classList.add("is-active"); });
  }, [hoveredImageUrl]);


  const handleMouseEnter = (id: number, slug: string) => {
    if (hoverTimeout !== null) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }

    setHoveredImageUrl(null);

    const timeoutId = setTimeout(() => {

      async function fetchPreview() {
        try {
          const response = await ky.get(`${UrlBasePath}/api/collection?type=artist&slug=${slug}&id=${id}&alone`).json<Arts>();
  
          if (response && response.length > 0) {
            const art = response[0];
            getPreviewImageUrl(art.id, art.name, art.artist_slug, art.url);
          }
        } catch (error) {
          console.error("Error", error);
        }
      }
  
      fetchPreview();

    }, DELAY_API_CALL);
    setHoverTimeout(timeoutId);
  };


  function getPreviewImageUrl(id: string, name: string, slug: string, url: string) {
    const hoveredImageUrl = {
      id: id,
      name: name,
      slug: slug,
      url: url
    }
    setHoveredImageUrl(hoveredImageUrl);
  }
  

  // Appel à l'API "Œuvres d'art"
  useEffect(() => {
    const timer = setTimeout(() => {
      ky.get(`${UrlBasePath}/api/arts?lng=${languageSignal.value}&name=${debouncedValue}`)
        .json<ArtRow[]>()
        .then((response) => {
          setSearchResults(response);
        });
    }, DELAY_API_CALL);

    return () => clearTimeout(timer);
  }, [debouncedValue]);


  // Background pour la page des œuvres d'art
  useLayoutEffect(() => {
    const body = document.querySelector("body");
    const main = document.querySelector<HTMLElement>('[data-name="arts"]');

    if (body) {
      body.style.backgroundColor = colorScheme[currentColorScheme].white;
    }

    if (main) {
      main.style.background = `url(/background/gray)`;
      main.style.backgroundAttachment = "local";
      main.style.backgroundPosition = "center";
      main.style.backgroundSize = "3200px";
    }
  }, []);


  // Délai au click
  function handleClick(event: h.JSX.TargetedMouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const href = (event.currentTarget as HTMLAnchorElement).href;
    setTimeout(() => { window.location.href = href; }, DELAY_REACH_HREF);
  }


  return (
    <div class="max-w-7xl mx-auto p-4 px-4 sm:px-6 lg:px-8 mb-24">
      <div class="flex justify-between items-start">
        {/* Titre de la page */}
        <Title
          name="arts"
          dimension="min-h-[30px] md:min-h-[60px] w-[115px] md:w-[230px]"
          margin="mt-2 mb-5 md:mt-5"
        />
      </div>

      {/* Post-it : tous les tags (seulement de type standard) */}
      <div class="relative w-full mx-auto hidden xl:block mt-8 z-10">
        <TagsPapers
          animated={false}
          draggable={draggable}
          maxWidthPx={1800}
          nbTagsByRow={19}
          tags={TAGS
            .filter(tag => tag.type === 0)
            .map((tag, index) => ({
              ...tag,
              rotation: ((index % 7) - 3) * 5,
              position: index % 2 === 0 ? "rotate-2" : "-rotate-2",
            }))}
        />
      </div>

      {/* Entrée de recherche */}
      <div class="paper paper-shadow w-[60px] md:w-[80px] max-h-[24px] mx-auto xl:mt-40 mb-2 -translate-x-16">
        <div class="top-tape max-h-2.5"></div>
        <h2 class={`text-md md:text-lg font-medium text-lighterdark`}>
          {i18next.t("paper.name", { ns: "translation" })}
        </h2>
      </div>
      <div class="brush-input-box relative w-48 max-h-[68px] mx-auto mb-4">
        <SearchInput
          type="artssearch"
          value={searchTerm}
          onInput={(e) => setSearchTerm((e.currentTarget as HTMLInputElement).value)}
        />
      </div>

      <div class={`flex flex-wrap`}>
        {/* Liste des arts */}
        {searchResults &&
          (
            <ul class={`text-lighterdark lg:w-1/3 sm:w-1/2 p-2 mask-50`}>
              {searchResults.map((item, index) => (
                <li class={`appear-effect-list-fadein mx-2 my-4`} key={index}>
                  <a
                    href={"/art/" + item.slug + "?alone&id=" + item.id}
                    class="cursor-pointer"
                    onClick={handleClick}
                    onMouseEnter={() => handleMouseEnter(item.id, item.slug)}
                    onPointerEnter={() => handleMouseEnter(item.id, item.slug)}
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

              {/* Pas de résultats */}
              {searchResults.length === 0 && searchTerm !== "" &&
                (
                  <li class="appear-effect-list-fadein mx-2 my-4">
                    <div class="paper paper-shadow min-h-[70px] max-w-[360px]">
                      <div class="tape-section"></div>
                      <p class="text-2xl md:text-3xl font-medium text-center leading-none break-words p-2">
                        {i18next.t("common.no_results", { ns: "translation" })} {" =>"}
                        <br />
                        {"«"} {searchTerm} {"»"}
                      </p>
                      <div class="tape-section"></div>
                    </div>
                  </li>
                )}
            </ul>
          )}

          {/* Aperçu d'une œuvre */}
          <Preview image={hoveredImageUrl} />
      </div>
    </div>
  );
}
