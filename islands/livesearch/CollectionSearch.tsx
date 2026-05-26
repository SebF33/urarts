import {
  applyPageBackground,
  getTextureBasePath,
  resetPageBackground,
  resolveCollectionBackground,
} from "@utils/background.ts";
import type { ArtCollection, ArtNavigationDirection } from "@utils/types.d.ts";
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

interface CollectionSearchProps {
  readonly font?: string;
  readonly ispersogallery?: boolean;
  readonly myslug?: string;
  readonly query?: {
    readonly alone?: boolean;
    readonly id?: string | number;
  };
  readonly type?: string;
}


export default function CollectionSearch(props: CollectionSearchProps) {
  const [searchResults, setSearchResults] = useState<Arts>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedValue = useDebounce<string>(searchTerm, DELAY_DEBOUNCE);
  const [navigationArts, setNavigationArts] = useState<Arts>([]);
  const [currentArtworkId, setCurrentArtworkId] = useState<
    string | number | undefined
  >(props.query?.id);
  const [previousArtworkId, setPreviousArtworkId] = useState<
    string | number | null
  >(null);
  const [nextArtworkId, setNextArtworkId] = useState<string | number | null>(
    null,
  );
  const [artNavigationDirection, setArtNavigationDirection] = useState<
    ArtNavigationDirection
  >(null);

  // Contexte
  const isPersoGallery: boolean = !!props.ispersogallery;
  isForAloneArtworkSignal.value = !!props.query?.alone;


  /**
   * Appels à l'API "Collection"
   *
   * Chargement des données de la collection dans deux cas :
   *
   * 1) Mode "collection" (dans le contexte classique)
   *    → charge une liste filtrée d'œuvres (searchResults)
   *
   * 2) Mode "navigation" (dans le contexte d'un contenu qui concerne une seule œuvre)
   *    → charge la liste complète de navigation (navigationArts),
   *      puis en extrait l'œuvre courante pour alimenter les résultats de recherche (searchResults)
   */
  useEffect(() => {
    // si c'est aussi dans le contexte qui concerne un(e) seul(e) artiste
    const aloneArtistSlug = isForAloneArtistSignal.value
      ? artistSlugSignal.value
      : "";

    const apiUrl = `${UrlBasePath}/api/collection?lng=${languageSignal.value}` +
      `&type=${props.type}` +
      `&slug=${props.myslug}` +
      `&name=${debouncedValue}` +
      `&aloneartistslug=${aloneArtistSlug}`;

    const timer = setTimeout(() => {
      ky.get(apiUrl)
        .json<Arts>()
        .then((response) => {
          if (isForAloneArtworkSignal.value) {
            setNavigationArts(response);
            const currentArtwork = response.find((art) =>
              String(art.id) === String(currentArtworkId)
            );
            setSearchResults(currentArtwork ? [currentArtwork] : []);
          } else {
            setSearchResults(response);
            setNavigationArts([]);
          }
        })
        .catch((error) => {
          console.error("Collection API error:", error);
        });
    }, DELAY_API_CALL);

    return () => clearTimeout(timer);
  }, [
    debouncedValue,
    currentArtworkId,
    artistSlugSignal.value,
    isForAloneArtworkSignal.value,
  ]);


  // Navigation des œuvres (précédente/suivante)
  // (dans le contexte d'un contenu qui concerne une seule œuvre)
  useEffect(() => {
    if (
      !isForAloneArtworkSignal.value || currentArtworkId == null ||
      navigationArts.length === 0
    ) {
      setPreviousArtworkId(null);
      setNextArtworkId(null);
      return;
    }

    const currentIndex = navigationArts.findIndex(
      (art) => String(art.id) === String(currentArtworkId),
    );

    if (currentIndex === -1) {
      setPreviousArtworkId(null);
      setNextArtworkId(null);
      return;
    }

    const prev = navigationArts[currentIndex - 1] ?? null;
    const next = navigationArts[currentIndex + 1] ?? null;

    setPreviousArtworkId(prev?.id ?? null);
    setNextArtworkId(next?.id ?? null);
  }, [currentArtworkId, navigationArts]);

  useEffect(() => {
    setCurrentArtworkId(props.query?.id);
  }, [props.query?.id]);

  const goToPreviousArtwork = () => {
    if (previousArtworkId != null) {
      setArtNavigationDirection("prev");
      setCurrentArtworkId(previousArtworkId);
    }
  };

  const goToNextArtwork = () => {
    if (nextArtworkId != null) {
      setArtNavigationDirection("next");
      setCurrentArtworkId(nextArtworkId);
    }
  };


  // Atteindre l'œuvre
  useLayoutEffect(() => {
    if (isForAloneArtworkSignal.value) return;

    if (props.query?.id !== "") {
      let delay;
      props.query?.fromLeonardo
        ? delay = DELAY_LEONARDO_REACH_ART
        : delay = DELAY_REACH_ART;

      setTimeout(() => {
        const target: HTMLElement | null = document.getElementById(
          `${props.query?.id}`,
        );
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
          getTextureBasePath(isPersoGallery),
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
            <div
              class={`brush-input-box relative w-48 max-h-[68px] mx-auto mb-4`}
            >
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
        hasPreviousArtwork={previousArtworkId != null}
        hasNextArtwork={nextArtworkId != null}
        onPreviousArtwork={goToPreviousArtwork}
        onNextArtwork={goToNextArtwork}
        artNavigationDirection={artNavigationDirection}
      />
    </div>
  );
}
