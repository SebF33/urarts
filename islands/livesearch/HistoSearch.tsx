import { ArtCollection } from "@utils/types.d.ts";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { DELAY_API_CALL, DELAY_DEBOUNCE, DELAY_LEONARDO_REACH_ART } from "@utils/constants.ts";
import ky from "ky";
import { UrlBasePath } from "../../env.ts";
import { useDebounce } from "@utils/hooks/useDebounce.ts";
import { useEffect, useLayoutEffect, useState } from "preact/hooks";
import { yearsSignal } from "../../utils/signals.ts";

import ArtsLayout from "@islands/layout/ArtsLayout.tsx";
import { SearchInput } from "@components/SearchInput.tsx";

type Arts = Array<ArtCollection>;

export default function HistoSearch(
  props: { id?: string },
) {
  const [searchResults, setSearchResults] = useState<Arts[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedValue = useDebounce<string>(searchTerm, DELAY_DEBOUNCE)

  const type = "histocharacters";

  useEffect(() => {
    const slider: HTMLElement | null = document.getElementById("slider");
    const valuesForSlider = [
      300,
      500,
      700,
      900,
      1100,
      1300,
      1500,
      1700,
      1900,
      2100,
    ];
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
      start: [300, 2100],
      step: 1,
      tooltips: true,
    });

    slider.noUiSlider.set(["300", "2100"]);

    let debounceTimer;
    slider.noUiSlider.on("update", () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        yearsSignal.value = slider.noUiSlider.get();
      }, DELAY_DEBOUNCE);
    });

    return () => {
      slider.noUiSlider.destroy();
    };
  }, []);

  // Appel à l'API
  useEffect(() => {
    setTimeout(() => {
      ky.get(
        `${UrlBasePath}/api/collection?type=${type}&name=${debouncedValue}&years=${yearsSignal.value}`,
      )
        .json<Arts[]>()
        .then((response) => {
          setSearchResults(response);
        });
    }, DELAY_API_CALL);
  }, [debouncedValue, yearsSignal.value]);

  // Atteindre l'œuvre
  useLayoutEffect(() => {
    if (props.id !== "") {
      setTimeout(() => {
        const target: HTMLElement | null = document.getElementById(`${props.id}`);
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          });
        }
      }, DELAY_LEONARDO_REACH_ART);
    }
  }, [props.id]);

  // Background pour la page des personnages historiques
  useLayoutEffect(() => {
    const body = document.querySelector("body");
    const main = document.querySelector<HTMLElement>('[data-name="histocharacters"]');

    if (body) {
      body.style.backgroundColor = colorScheme[currentColorScheme].gray;
    }

    if (main) {
      main.style.background = `url(/background/white)`;
      main.style.backgroundAttachment = "local";
      main.style.backgroundPosition = "center";
      main.style.backgroundSize = "346px";
    }
  }, []);

  return (
    <>
      <div
        class={`p-4 max-w-7xl mx-auto mb-8 sm:mb-16 px-4 sm:px-6 lg:px-8`}
      >
        <div
          class={`paper min-h-[60px] max-w-[260px] my-5`}
        >
          <div class="tape-section"></div>
          <h1 class={`text-5xl leading-none font-medium mb-2 ml-2`}>
            Personnages historiques
          </h1>
          <div class="tape-section"></div>
        </div>

        <h2 class={`text-lg font-medium text-lighterdark mx-auto mb-1 w-48`}>
          Nom(s) :
        </h2>
        
        <div class={`brush-input-box relative w-48 max-h-[68px] mx-auto mb-4`}>
          <SearchInput value={searchTerm} onInput={(e) => setSearchTerm((e.currentTarget as HTMLInputElement).value)} />
        </div>
      </div>

      <div
        id="slider"
        class={`max-w-3xl mb-[40px] sm:mb-[60px] mx-[15%] sm:mx-[20%] md:mx-[25%] lg:mx-[30%]`}
      >
      </div>

      <ArtsLayout arts={searchResults} type={type} />
    </>
  );
}
