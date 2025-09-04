import { ArtistRow } from "@utils/types.d.ts";
import { artistsYearsSignal, languageSignal, nationalitySignal } from "@utils/signals.ts";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { css } from "@twind/core";
import { DELAY_API_CALL, DELAY_DEBOUNCE } from "@utils/constants.ts";
import { Fragment, h } from "preact";
import i18next from "i18next";
import "@utils/i18n/config.ts";
import ky from "ky";
import { UrlBasePath } from "@/env.ts";
import { useDebounce } from "@utils/hooks/useDebounce.ts";
import { useEffect, useLayoutEffect, useState } from "preact/hooks";

import ArtistsLayout from "@islands/layout/ArtistsLayout.tsx";
import { PaintPalette } from "@components/Assets.tsx";
import { PaperWorldMap } from "@components/PaperWorldMap.tsx";
import { SearchInput } from "@components/SearchInput.tsx";
import Title from "../paper/Title.tsx";


export default function ArtistsSearch(props: { readonly nationality: string }) {
  const [flags, setFlags] = useState(1);
  const [searchResults, setSearchResults] = useState<ArtistRow[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showFlags1, setShowFlags1] = useState(true);
  const [showFlags2, setShowFlags2] = useState(true);
  const [showFlags3, setShowFlags3] = useState(true);
  const debouncedValue = useDebounce<string>(searchTerm, DELAY_DEBOUNCE)

  // CSS
  const blur = "blur(0)";
  const draggable = false;
  const grid = "grid gap-4 sm:gap-5 grid-cols-1 grid-cols-2 md:grid-cols-3 xl:grid-cols-5 my-20 p-4";
  const scale105 = "transform-gpu transition-all duration-150 ease-in-out hover:(transform scale-105)";
  const scale110 = "transform-gpu transition-all duration-300 ease-in-out hover:(transform scale-110)";
  const shadow = "drop-shadow(0.01rem 0.01rem 0.04rem rgba(0, 0, 0, 0.5))";
  const width8 = "w-8 sm:w-10";
  const width12 = "w-12 sm:w-16";
  const flagClasses1 = `${width8} ${css({ "filter": shadow, "backdrop-filter": blur })} ${scale110} fade ${showFlags1 ? "fade-enter-active" : "fade-exit-active"}`;
  const flagClasses2 = `${width8} ${css({ "filter": shadow, "backdrop-filter": blur })} ${scale110} fade ${showFlags2 ? "fade-enter-active" : "fade-exit-active"}`;
  const flagClasses3 = `${width8} ${css({ "filter": shadow, "backdrop-filter": blur })} ${scale110} fade ${showFlags3 ? "fade-enter-active" : "fade-exit-active"}`;
  const moreClasses = `w-8 ${css({ "filter": shadow, "backdrop-filter": blur })} ${scale105}`;
  const worldFlagClasses = `${width12} ${css({ "filter": shadow, "backdrop-filter": blur })} ${scale105}`;


  const handleMoreClick = (event: h.JSX.TargetedMouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const link = event.currentTarget;
    link.style.pointerEvents = "none";

    if (flags === 1) {
      setShowFlags1((prevShowFlags1) => !prevShowFlags1);
      if (!showFlags2) setShowFlags2(true);
    } else if (flags === 2) {
      setShowFlags2((prevShowFlags2) => !prevShowFlags2);
      setShowFlags1((prevShowFlags1) => !prevShowFlags1);
      if (!showFlags3) setShowFlags3(true);
    } else if (flags === 3) {
      setShowFlags3((prevShowFlags3) => !prevShowFlags3);
    }

    setTimeout(() => {
      setFlags((prevFlags) => prevFlags + 1);
      link.style.pointerEvents = "";
    }, 280);
  };


  // Slider
  useEffect(() => {
    // Valeur à l'initialisation
    let value = [1900, 2000];
    if (artistsYearsSignal.value.length !== 0 && (artistsYearsSignal.value[0] !== value[0] || artistsYearsSignal.value[1] !== value[1]))  value = artistsYearsSignal.value;

    // Nationalité et années définies si paramètre "nationality" dans l'URL
    if (props.nationality !== "") {
      nationalitySignal.value = props.nationality;
      value = [1400, 2100];
    }

    // Création du slider
    const slider: HTMLElement | null = document.getElementById("slider");
    const valuesForSlider = [1400,1500,1600,1700,1800,1900,2000,2100];
    const format = {
      to: function (value) {
        return valuesForSlider[Math.round(value)];
      },
      from: function (value) {
        return valuesForSlider.indexOf(Number(value));
      },
    };

    noUiSlider.create(slider, {
      connect: true,
      format: format,
      margin: 1,
      pips: { mode: "steps", density: 1.5, format: format },
      range: { min: 0, max: valuesForSlider.length - 1 },
      start: value,
      step: 1,
      tooltips: true,
    });

    //slider?.noUiSlider.set(["1900", "2000"]);

    // Extrémités du slider
    const valuesLarge: HTMLCollectionOf<Element> = document.getElementsByClassName("noUi-value-large");
    for (let i = 0; i < valuesLarge.length; i++) {
      valuesLarge[i].textContent = i18next.t("slider.value_large", { ns: "translation" }) + valuesLarge[i].textContent;
    }

    // Mise à jour du slider
    let debounceTimer;
    slider?.noUiSlider.on("update", () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        if (artistsYearsSignal.value[0] !== slider.noUiSlider.get()[0] || artistsYearsSignal.value[1] !== slider.noUiSlider.get()[1])  artistsYearsSignal.value = slider.noUiSlider.get();
      }, DELAY_DEBOUNCE);
    });

    return () => {
      slider?.noUiSlider.destroy();
    };
  }, []);


  useEffect(() => {
    if (flags === 4) {
      setFlags(1);
    }
  }, [flags]);


  // Appel à l'API "Artistes"
  useEffect(() => {
    if (artistsYearsSignal.value.length > 0) {
      const timer = setTimeout(() => {
        ky.get(`${UrlBasePath}/api/artists?lng=${languageSignal.value}&nationality=${nationalitySignal.value}&name=${debouncedValue}&years=${artistsYearsSignal.value}`)
          .json<ArtistRow[]>()
          .then((response) => {
            setSearchResults(response);
          });
      }, DELAY_API_CALL);

      return () => clearTimeout(timer);
    }
  }, [nationalitySignal.value, debouncedValue, artistsYearsSignal.value]);


  // Background pour la page des artistes
  useLayoutEffect(() => {
    const body = document.querySelector("body");
    const main = document.querySelector<HTMLElement>('[data-name="artists"]');

    if (body) {
      body.style.backgroundColor = colorScheme[currentColorScheme].white;
    }

    if (main) {
      main.style.background = `url(/background/gray)`;
      main.style.backgroundAttachment = "local";
      main.style.backgroundPosition = "center";
      main.style.backgroundSize = "3400px";
    }
  }, []);


  return (
    <>
      <div class="max-w-7xl mx-auto p-4 px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-start md:mb-16">
          {/* Titre de la page */}
          <Title
            name="artists"
            dimension="min-h-[30px] md:min-h-[60px] w-[115px] md:w-[230px]"
            margin="mt-2 md:mt-5"
          />
          {/* Post-it : lien vers la carte du Monde */}
          <PaperWorldMap />
        </div>

        {/* Palette */}
        <div class={`relative w-60 sm:w-80 mx-auto mt-24 md:-mt-6 mb-24`}>
          <div class={`absolute w-full -top-16`}>
            <PaintPalette />
          </div>
          <button
            onClick={() => {nationalitySignal.value = "Monde"}}
            class={`absolute flex items-center -top-14 left-20 sm:-top-14 sm:left-24 focus:outline-none select-none`}
          >
            <img
              class={worldFlagClasses}
              src="/icons/Monde.png"
              alt="Monde"
              title="Monde"
              draggable={draggable}
            />
          </button>
          {flags === 1 &&
            (
              <Fragment>
                <button
                  onClick={() => {nationalitySignal.value = "France"}}
                  class={`absolute flex items-center -top-12 right-16 sm:-top-10 sm:right-20 focus:outline-none`}
                >
                  <img
                    class={flagClasses1}
                    src="/icons/France.png"
                    alt="France"
                    title="France"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {nationalitySignal.value = "Espagne"}}
                  class={`absolute flex items-center -top-8 right-8 sm:-top-4 sm:right-11 focus:outline-none`}
                >
                  <img
                    class={flagClasses1}
                    src="/icons/Espagne.png"
                    alt="Espagne"
                    title="Espagne"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {nationalitySignal.value = "Portugal"}}
                  class={`absolute flex items-center -top-2 right-3 sm:top-3 sm:right-5 focus:outline-none`}
                >
                  <img
                    class={flagClasses1}
                    src="/icons/Portugal.png"
                    alt="Portugal"
                    title="Portugal"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {nationalitySignal.value = "Italie"}}
                  class={`absolute flex items-center top-5 right-1 sm:top-11 sm:right-2 focus:outline-none`}
                >
                  <img
                    class={flagClasses1}
                    src="/icons/Italie.png"
                    alt="Italie"
                    title="Italie"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {nationalitySignal.value = "Pays-Bas"}}
                  class={`absolute flex items-center top-12 right-4 sm:top-20 sm:right-5 focus:outline-none`}
                >
                  <img
                    class={flagClasses1}
                    src="/icons/Pays-Bas.png"
                    alt="Pays-Bas"
                    title="Pays-Bas"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {nationalitySignal.value = "Belgique"}}
                  class={`absolute flex items-center -bottom-24 right-14 sm:top-32 sm:left-56 focus:outline-none`}
                >
                  <img
                    class={flagClasses1}
                    src="/icons/Belgique.png"
                    alt="Belgique"
                    title="Belgique"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {nationalitySignal.value = "Pologne"}}
                  class={`absolute flex items-center sm:left-44 focus:outline-none ${
                    css(
                      {
                        "bottom": "calc(-6.6rem)",
                        "right": "5.8rem",
                        "@media screen(sm)": {
                          "top": "9.2rem",
                        },
                      },
                    )
                  }`}
                >
                  <img
                    class={flagClasses1}
                    src="/icons/Pologne.png"
                    alt="Pologne"
                    title="Pologne"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {nationalitySignal.value = "Allemagne"}}
                  class={`absolute flex items-center right-32 sm:left-32 focus:outline-none ${
                    css(
                      {
                        "bottom": "calc(-6.6rem)",
                        "@media screen(sm)": {
                          "top": "9.6rem",
                        },
                      },
                    )
                  }`}
                >
                  <img
                    class={flagClasses1}
                    src="/icons/Allemagne.png"
                    alt="Allemagne"
                    title="Allemagne"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {nationalitySignal.value = "Autriche"}}
                  class={`absolute flex items-center -bottom-24 left-11 sm:-bottom-40 sm:left-20 focus:outline-none`}
                >
                  <img
                    class={flagClasses1}
                    src="/icons/Autriche.png"
                    alt="Autriche"
                    title="Autriche"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {nationalitySignal.value = "Hongrie"}}
                  class={`absolute flex items-center -bottom-20 left-3 sm:-bottom-36 sm:left-8 focus:outline-none`}
                >
                  <img
                    class={flagClasses1}
                    src="/icons/Hongrie.png"
                    alt="Hongrie"
                    title="Hongrie"
                    draggable={draggable}
                  />
                </button>
              </Fragment>
            )}
          {flags === 2 &&
            (
              <Fragment>
                <button
                  onClick={() => {nationalitySignal.value = "Suisse"}}
                  class={`absolute flex items-center -top-12 right-16 sm:-top-10 sm:right-20 focus:outline-none`}
                >
                  <img
                    class={flagClasses2}
                    src="/icons/Suisse.png"
                    alt="Suisse"
                    title="Suisse"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {nationalitySignal.value = "Finlande"}}
                  class={`absolute flex items-center -top-8 right-8 sm:-top-4 sm:right-11 focus:outline-none`}
                >
                  <img
                    class={flagClasses2}
                    src="/icons/Finlande.png"
                    alt="Finlande"
                    title="Finlande"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {nationalitySignal.value = "Norvège"}}
                  class={`absolute flex items-center -top-2 right-3 sm:top-3 sm:right-5 focus:outline-none`}
                >
                  <img
                    class={flagClasses2}
                    src="/icons/Norvège.png"
                    alt="Norvège"
                    title="Norvège"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {nationalitySignal.value = "Suède"}}
                  class={`absolute flex items-center top-5 right-1 sm:top-11 sm:right-2 focus:outline-none`}
                >
                  <img
                    class={flagClasses2}
                    src="/icons/Suède.png"
                    alt="Suède"
                    title="Suède"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {nationalitySignal.value = "Danemark"}}
                  class={`absolute flex items-center top-12 right-4 sm:top-20 sm:right-5 focus:outline-none`}
                >
                  <img
                    class={flagClasses2}
                    src="/icons/Danemark.png"
                    alt="Danemark"
                    title="Danemark"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {nationalitySignal.value = "Tchécoslovaquie"}}
                  class={`absolute flex items-center -bottom-24 right-14 sm:top-32 sm:left-56 focus:outline-none`}
                >
                  <img
                    class={flagClasses2}
                    src="/icons/Tchécoslovaquie.png"
                    alt="Tchécoslovaquie"
                    title="Tchécoslovaquie"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {nationalitySignal.value = "Ukraine"}}
                  class={`absolute flex items-center sm:left-44 focus:outline-none ${
                    css(
                      {
                        "bottom": "calc(-6.6rem)",
                        "right": "5.8rem",
                        "@media screen(sm)": {
                          "top": "9.2rem",
                        },
                      },
                    )
                  }`}
                >
                  <img
                    class={flagClasses2}
                    src="/icons/Ukraine.png"
                    alt="Ukraine"
                    title="Ukraine"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {nationalitySignal.value = "Arménie"}}
                  class={`absolute flex items-center right-32 sm:left-32 focus:outline-none ${
                    css(
                      {
                        "bottom": "calc(-6.6rem)",
                        "@media screen(sm)": {
                          "top": "9.6rem",
                        },
                      },
                    )
                  }`}
                >
                  <img
                    class={flagClasses2}
                    src="/icons/Arménie.png"
                    alt="Arménie"
                    title="Arménie"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {nationalitySignal.value = "Biélorussie"}}
                  class={`absolute flex items-center -bottom-24 left-11 sm:-bottom-40 sm:left-20 focus:outline-none`}
                >
                  <img
                    class={flagClasses2}
                    src="/icons/Biélorussie.png"
                    alt="Biélorussie"
                    title="Biélorussie"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {nationalitySignal.value = "Russie"}}
                  class={`absolute flex items-center -bottom-20 left-3 sm:-bottom-36 sm:left-8 focus:outline-none`}
                >
                  <img
                    class={flagClasses2}
                    src="/icons/Russie.png"
                    alt="Russie"
                    title="Russie"
                    draggable={draggable}
                  />
                </button>
              </Fragment>
            )}
          {flags === 3 &&
            (
              <Fragment>
                <button
                  onClick={() => {nationalitySignal.value = "Japon"}}
                  class={`absolute flex items-center -top-12 right-16 sm:-top-10 sm:right-20 focus:outline-none`}
                >
                  <img
                    class={flagClasses3}
                    src="/icons/Japon.png"
                    alt="Japon"
                    title="Japon"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {nationalitySignal.value = "Vietnam"}}
                  class={`absolute flex items-center -top-8 right-8 sm:-top-4 sm:right-11 focus:outline-none`}
                >
                  <img
                    class={flagClasses3}
                    src="/icons/Vietnam.png"
                    alt="Vietnam"
                    title="Vietnam"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {nationalitySignal.value = "Chine"}}
                  class={`absolute flex items-center -top-2 right-3 sm:top-3 sm:right-5 focus:outline-none`}
                >
                  <img
                    class={flagClasses3}
                    src="/icons/Chine.png"
                    alt="Chine"
                    title="Chine"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {nationalitySignal.value = "Grèce"}}
                  class={`absolute flex items-center top-12 right-4 sm:top-20 sm:right-5 focus:outline-none`}
                >
                  <img
                    class={flagClasses3}
                    src="/icons/Grèce.png"
                    alt="Grèce"
                    title="Grèce"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {nationalitySignal.value = "Royaume-Uni"}}
                  class={`absolute flex items-center -bottom-24 right-14 sm:top-32 sm:left-56 focus:outline-none`}
                >
                  <img
                    class={flagClasses3}
                    src="/icons/Royaume-Uni.png"
                    alt="Royaume-Uni"
                    title="Royaume-Uni"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {nationalitySignal.value = "Colombie"}}
                  class={`absolute flex items-center sm:left-44 focus:outline-none ${
                    css(
                      {
                        "bottom": "calc(-6.6rem)",
                        "right": "5.8rem",
                        "@media screen(sm)": {
                          "top": "9.2rem",
                        },
                      },
                    )
                  }`}
                >
                  <img
                    class={flagClasses3}
                    src="/icons/Colombie.png"
                    alt="Colombie"
                    title="Colombie"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {nationalitySignal.value = "Mexique"}}
                  class={`absolute flex items-center right-32 sm:left-32 focus:outline-none ${
                    css(
                      {
                        "bottom": "calc(-6.6rem)",
                        "@media screen(sm)": {
                          "top": "9.6rem",
                        },
                      },
                    )
                  }`}
                >
                  <img
                    class={flagClasses3}
                    src="/icons/Mexique.png"
                    alt="Mexique"
                    title="Mexique"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {nationalitySignal.value = "États-Unis d'Amérique"}}
                  class={`absolute flex items-center -bottom-24 left-11 sm:-bottom-40 sm:left-20 focus:outline-none`}
                >
                  <img
                    class={flagClasses3}
                    src="/icons/États-Unis d'Amérique.png"
                    alt="États-Unis d'Amérique"
                    title="États-Unis d'Amérique"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {nationalitySignal.value = "Canada"}}
                  class={`absolute flex items-center -bottom-20 left-3 sm:-bottom-36 sm:left-8 focus:outline-none`}
                >
                  <img
                    class={flagClasses3}
                    src="/icons/Canada.png"
                    alt="Canada"
                    title="Canada"
                    draggable={draggable}
                  />
                </button>
              </Fragment>
            )}
          <button
            onClick={handleMoreClick}
            class={`absolute flex items-center -top-4 right-28 sm:-top-4 sm:right-36 focus:outline-none`}
          >
            <img
              class={moreClasses}
              src="/symbols/add.png"
              alt="add-symbol"
              draggable={draggable}
            />
          </button>

          <div class="absolute w-[80px] top-32 sm:top-5 left-5 sm:left-16 right-0 z-10">
            <div class="paper max-w-[80px] min-w-[80px] max-h-[24px] mx-auto mb-2 sm:shadow-none">
              <div class="top-tape max-h-2.5"></div>
              <h2 class="text-lg font-medium text-lighterdark">
                {i18next.t("paper.name", { ns: "translation" })}
              </h2>
            </div>
          </div>

          <div class="brush-input-box absolute w-48 max-h-[68px] top-40 sm:top-12 left-0 right-0 mx-auto z-10">
            <SearchInput value={searchTerm} onInput={(e) => setSearchTerm((e.currentTarget as HTMLInputElement).value)} />
          </div>
        </div>
      </div>

      <div
        id="slider"
        class={`max-w-3xl mt-[290px] mb-[40px] sm:mt-[200px] sm:mb-[8px] mx-[15%] sm:mx-[20%] md:mx-[25%] lg:mx-[30%]`}
      >
      </div>

      <ArtistsLayout
        artists={searchResults}
        flag={nationalitySignal.value}
        grid={grid}
      />
    </>
  );
}
