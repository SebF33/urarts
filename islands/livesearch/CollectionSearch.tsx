
import {
  applyPageBackground,
  getTextureBasePath,
  resetPageBackground,
  resolveCollectionBackground,
} from "@utils/background.ts";
import { ArtCollection } from "@utils/types.d.ts";
import {
  artistSlugSignal,
  isForAloneArtistSignal,
  isForAloneArtworkSignal,
  languageSignal,
} from "@utils/signals.ts";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import {
  DELAY_API_CALL,
  DELAY_DEBOUNCE,
  DELAY_LEONARDO_REACH_ART,
  DELAY_REACH_ART,
} from "@utils/constants.ts";
import i18next from "i18next";
import "@utils/i18n/config.ts";
import { isTouchDevice, slugToCamelCase } from "@utils/helpers.ts";
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
  
  // Contexte
  const isPersoGallery: boolean = !!props.ispersogallery;
  isForAloneArtworkSignal.value = !!props.query?.alone;


  // Appel à l'API "Collection"
  useEffect(() => {
    let aloneArtistSlug = '';
    // si c'est dans le contexte qui concerne uniquement un(e) artiste
    if (isForAloneArtistSignal.value) aloneArtistSlug = artistSlugSignal.value;
    
    let apiUrl;
    // faire afficher le contenu qui concerne uniquement une œuvre (si c'est le contexte)
    if (isForAloneArtworkSignal.value) apiUrl = `${UrlBasePath}/api/collection?lng=${languageSignal.value}&type=${props.type}&slug=${props.myslug}&alone&id=${props.query.id}`;
    // ou faire afficher le contenu d'une collection d'œuvres (selon le contexte)
    else apiUrl = `${UrlBasePath}/api/collection?lng=${languageSignal.value}&type=${props.type}&slug=${props.myslug}&name=${debouncedValue}&aloneartistslug=${aloneArtistSlug}`;

    const timer = setTimeout(() => {
      ky.get(apiUrl)
        .json<Arts[]>()
        .then((response) => {
          setSearchResults(response);
        });
    }, DELAY_API_CALL);

    return () => clearTimeout(timer);
  }, [debouncedValue, artistSlugSignal.value, isForAloneArtworkSignal.value]);


  // Atteindre l'œuvre
  useLayoutEffect(() => {
    if (isForAloneArtworkSignal.value) return;

    if (props.query?.id !== "") {
      let delay;
      props.query?.fromLeonardo ? delay = DELAY_LEONARDO_REACH_ART : delay = DELAY_REACH_ART;

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


  // Background pour la page d'une collection d'œuvres
  useLayoutEffect(() => {
    const isTouch = isTouchDevice();
  
    const config = isTouch
      ? {
          bodyBackgroundColor: colorScheme[currentColorScheme].gray,
          mainSelector: '[data-name="collection"]',
          removeMainBackground: true,
        }
      : {
          bodyBackgroundColor: colorScheme[currentColorScheme].gray,
          mainSelector: '[data-name="collection"]',
          mainStyle: resolveCollectionBackground(
            slugToCamelCase(props.myslug),
            getTextureBasePath(isPersoGallery)
          ),
        };
  
    applyPageBackground(config);
  
    return () => {
      resetPageBackground(config);
    };
  }, [isPersoGallery, props.myslug]);


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
