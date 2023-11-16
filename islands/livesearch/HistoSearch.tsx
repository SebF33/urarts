import { ArtCollection } from "@utils/types.tsx";
import ky from "ky";
import { tw } from "twind";
import { UrlBasePath } from "../../env.ts";
import { useEffect, useState } from "preact/hooks";

import ArtsLayout from "@islands/layout/ArtsLayout.tsx";

type Arts = Array<ArtCollection>;

export default function HistoSearch() {
  const [searchResults, setSearchResults] = useState<Arts[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchYears, setSearchYears] = useState(["400", "2000"]);

  const type = "histocharacters";

  useEffect(() => {
    const slider: HTMLElement | null = document.getElementById("slider");
    const valuesForSlider = [
      400,
      600,
      800,
      1000,
      1200,
      1400,
      1600,
      1800,
      2000,
      2200,
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
      start: [400, 2000],
      step: 1,
      tooltips: true,
    });

    slider.noUiSlider.set(["400", "2000"]);
    slider.noUiSlider.on("update", function () {
      setSearchYears(slider.noUiSlider.get());
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      ky.get(
        `${UrlBasePath}/api/collection?type=${type}&name=${searchTerm}&years=${searchYears}`,
      )
        .json<Arts[]>()
        .then((response) => {
          setSearchResults(response);
        });
    }, 200);
  }, [searchTerm, searchYears]);

  return (
    <main class={tw`flex-grow font-brush`}>
      <div
        class={tw`p-4 max-w-7xl mx-auto mb-8 sm:mb-16 px-4 sm:px-6 lg:px-8`}
      >
        <div
          class={tw`paper max-w-[280px] mb-4`}
        >
          <div class="tape-section"></div>
          <h1 class={tw`text-5xl leading-none font-medium mx-auto mb-2`}>
            Personnages historiques
          </h1>
          <div class="tape-section"></div>
        </div>

        <h2 class={tw`text-lg font-medium mx-auto mb-1 w-48`}>
          Nom(s) :
        </h2>
        <div class={tw`brush-input-box relative w-48 mx-auto mb-4`}>
          <input
            type="text"
            value={searchTerm}
            onKeyPress={(e) => {
              e.key === "Enter" && e.preventDefault();
            }}
            onKeyUp={(e) => setSearchTerm(e.currentTarget.value)}
            class={tw`w-full rounded text-base outline-none py-1 px-3`}
          />
        </div>
      </div>

      <div
        id="slider"
        class={tw`max-w-3xl mb-[40px] sm:mb-[60px] mx-[15%] sm:mx-[20%] md:mx-[25%] lg:mx-[30%]`}
      >
      </div>

      <ArtsLayout
        arts={searchResults}
        type={type}
      />
    </main>
  );
}
