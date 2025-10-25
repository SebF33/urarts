import { ArtCollection } from "@utils/types.d.ts";
import {
  artistSlugSignal,
  isForAloneArtistSignal,
  languageSignal,
} from "@utils/signals.ts";
import { BG_STYLE } from "@utils/constants.ts";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import {
  DELAY_API_CALL,
  DELAY_DEBOUNCE,
  DELAY_LEONARDO_REACH_ART,
  DELAY_REACH_ART,
} from "@utils/constants.ts";
import i18next from "i18next";
import "@utils/i18n/config.ts";
import ky from "ky";
import { UrlBasePath } from "@/env.ts";
import { useDebounce } from "@utils/hooks/useDebounce.ts";
import { useEffect, useLayoutEffect, useState } from "preact/hooks";

import ArtsLayout from "@islands/layout/ArtsLayout.tsx";
import { SearchInput } from "@islands/input/SearchInput.tsx";


type Arts = Array<ArtCollection>;

export interface Props {
  font?: string;
  ispersogallery?: boolean;
  myslug: string;
  query?: object;
  type: string;
}


export default function CollectionSearch(props: Props) {
  const [searchResults, setSearchResults] = useState<Arts[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedValue = useDebounce<string>(searchTerm, DELAY_DEBOUNCE);
  
  const isPersoGallery: boolean = !!props.ispersogallery;


  // Appel à l'API "Collection"
  useEffect(() => {
    // faire afficher seulement le contenu qui concerne un(e) artiste (si c'est le contexte)
    let aloneArtistSlug = '';
    if (isForAloneArtistSignal.value) aloneArtistSlug = artistSlugSignal.value;
    
    let apiUrl;
    if (props.query?.alone) apiUrl = `${UrlBasePath}/api/collection?lng=${languageSignal.value}&type=${props.type}&slug=${props.myslug}&alone&id=${props.query.id}`;
    else apiUrl = `${UrlBasePath}/api/collection?lng=${languageSignal.value}&type=${props.type}&slug=${props.myslug}&name=${debouncedValue}&aloneartistslug=${aloneArtistSlug}`;

    const timer = setTimeout(() => {
      ky.get(apiUrl)
        .json<Arts[]>()
        .then((response) => {
          setSearchResults(response);
        });
    }, DELAY_API_CALL);

    return () => clearTimeout(timer);
  }, [debouncedValue, artistSlugSignal.value]);


  // Atteindre l'œuvre
  useLayoutEffect(() => {
    let delay;
    props.query?.fromLeonardo ? delay = DELAY_LEONARDO_REACH_ART : delay = DELAY_REACH_ART;

    if (props.query?.id !== "") {
      setTimeout(() => {
        const target: HTMLElement | null = document.getElementById(`${props.query?.id}`);
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          });
        }
      }, delay);
    }
  }, [props.query]);


  function slugToCamelCase(slug: string): string {
    return slug.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
  }


  // Background pour la page d'une collection d'arts
  useLayoutEffect(() => {
    const body = document.querySelector("body");
    const main = document.querySelector<HTMLElement>('[data-name="collection"]');
    const basePath = isPersoGallery ? "../../textures/" : "../textures/";
    const camelSlug = slugToCamelCase(props.myslug);
    const styleForSlug = BG_STYLE[camelSlug];

    if (body) {
      body.style.backgroundColor = colorScheme[currentColorScheme].gray;
    }
  
    if (main && styleForSlug) {
      // Défini dans BG_STYLE
      const { background, backgroundSize } = styleForSlug;
      main.style.background = background.replace("../textures/", basePath);
      main.style.backgroundAttachment = "local";
      main.style.backgroundPosition = "center";
      main.style.backgroundSize = backgroundSize;
    } else if (main) {
      // Fallback si non défini dans BG_STYLE
      main.style.background = `${colorScheme[currentColorScheme].gray} url(${basePath}default.png)`;
      main.style.backgroundAttachment = "local";
      main.style.backgroundPosition = "center";
      main.style.backgroundSize = "480px";
    }
  }, []);


  return (
    <div class={`flex-grow`}>
    
    {!props.query?.alone &&
      (
        <div class={`max-w-7xl mx-auto p-4 sm:px-6 lg:px-8`}>
          {/* Entrée de recherche */}
          <div class="paper paper-shadow w-[60px] md:w-[80px] mx-auto mb-2 -translate-x-16">
          <div class="top-tape max-h-2.5"></div>
            <h2 class={`text-md md:text-lg font-medium text-lighterdark`}>
              {i18next.t("paper.name", { ns: "translation" })}
            </h2>
          </div>
          <div class={`brush-input-box relative w-48 max-h-[68px] mx-auto mb-4`}>
            <SearchInput
              type="collectionsearch"
              value={searchTerm}
              onInput={(e) => setSearchTerm((e.currentTarget as HTMLInputElement).value)}
            />
          </div>
        </div>
      )}

      <ArtsLayout
        arts={searchResults}
        font={props.font}
        ispersogallery={isPersoGallery}
      />
    </div>
  );
}
