import { ArtCollection } from "@utils/types.tsx";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import ky from "ky";
import { UrlBasePath } from "../../env.ts";
import { useEffect, useLayoutEffect, useState } from "preact/hooks";
import { yearsSignal } from "../../utils/signals.ts";

import ArtsLayout from "@islands/layout/ArtsLayout.tsx";
import { SearchInput } from "@components/SearchInput.tsx";

type Arts = Array<ArtCollection>;

export default function HistoSearch(
  props: { id?: string },
) {
  const [searchResults, setSearchResults] = useState<Arts[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

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
    slider.noUiSlider.on("update", function () {
      yearsSignal.value = slider.noUiSlider.get();
    });
  }, []);

  // Appel à l'API
  useEffect(() => {
    setTimeout(() => {
      ky.get(
        `${UrlBasePath}/api/collection?type=${type}&name=${searchTerm}&years=${yearsSignal.value}`,
      )
        .json<Arts[]>()
        .then((response) => {
          setSearchResults(response);
        });
    }, 200);
  }, [searchTerm, yearsSignal.value]);

  useLayoutEffect(() => {
    setTimeout(() => {
      const target: HTMLElement | null = document.getElementById(`${props.id}`);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }
    }, 600);
  }, [props.id]);

  // Background pour la page des personnages historiques
  useLayoutEffect(() => {
    const body = document.querySelector("body");

    if (body) {
      body.style.background = `url(/background/white)`;
      body.style.backgroundColor = colorScheme[currentColorScheme].gray;
      body.style.backgroundPosition = "center";
      body.style.backgroundSize = "346px";
    }
  }, []);

  return (
    <>
      <div
        class={`p-4 max-w-7xl mx-auto mb-8 sm:mb-16 px-4 sm:px-6 lg:px-8`}
      >
        <div
          class={`paper max-w-[260px] my-5`}
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
        
        <div class={`brush-input-box relative w-48 mx-auto mb-4`}>
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
