import { ArtistRow } from "@utils/types.tsx";
import { css } from "twind/css";
import { Fragment, h } from "preact";
import ky from "ky";
import { tw } from "twind";
import { UrlBasePath } from "../../env.ts";
import { useEffect, useState } from "preact/hooks";

import ArtistsLayout from "@islands/layout/ArtistsLayout.tsx";
import { PaintPalette } from "@components/Assets.tsx";

export default function ArtistsSearch() {
  const [flags, setFlags] = useState(1);
  const [searchNationality, setSearchNationality] = useState("France");
  const [searchResults, setSearchResults] = useState<ArtistRow[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchYears, setSearchYears] = useState(["1700", "2000"]);
  const [showFlags1, setShowFlags1] = useState(true);
  const [showFlags2, setShowFlags2] = useState(true);
  const [showFlags3, setShowFlags3] = useState(true);

  const draggable = false;
  const grid = "grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 py-20";
  const scale105 = "transform-gpu transition-all duration-150 ease-in-out hover:(transform scale-105)";
  const scale110 = "transform-gpu transition-all duration-300 ease-in-out hover:(transform scale-110)";
  const shadow = "drop-shadow(0.01rem 0.01rem 0.04rem rgba(0, 0, 0, 0.5))";
  const width6 = "w-6 sm:w-8";
  const width8 = "w-8 sm:w-10";
  const width12 = "w-12 sm:w-16";

  const flagClasses1 = tw`${width8} ${css({"filter":shadow})} ${scale110} fade ${
    showFlags1 ? "fade-enter-active" : "fade-exit-active"
  }`;
  const flagClasses2 = tw`${width8} ${css({"filter":shadow})} ${scale110} fade ${
    showFlags2 ? "fade-enter-active" : "fade-exit-active"
  }`;
  const flagClasses3 = tw`${width8} ${css({"filter":shadow})} ${scale110} fade ${
    showFlags3 ? "fade-enter-active" : "fade-exit-active"
  }`;
  const moreClasses = tw`${width6} ${css({"filter":shadow})} ${scale105}`;
  const worldFlagClasses = tw`${width12} ${css({"filter":shadow})} ${scale105}`;

  const handleMoreClick = (
    event: h.JSX.TargetedMouseEvent<HTMLAnchorElement>,
  ) => {
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

  useEffect(() => {
    if (flags === 4) {
      setFlags(1);
    }
  }, [flags]);

  useEffect(() => {
    const slider: HTMLElement | null = document.getElementById("slider");
    const valuesForSlider = [
      1400,
      1500,
      1600,
      1700,
      1800,
      1900,
      2000,
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
      start: [1700, 2000],
      step: 1,
      tooltips: true,
    });

    slider.noUiSlider.set(["1700", "2000"]);
    slider.noUiSlider.on("update", function () {
      setSearchYears(slider.noUiSlider.get());
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      ky.get(
        `${UrlBasePath}/api/artists?nationality=${searchNationality}&name=${searchTerm}&years=${searchYears}`,
      )
        .json<ArtistRow[]>()
        .then((response) => {
          setSearchResults(response);
        });
    }, 150);
  }, [searchNationality, searchTerm, searchYears]);

  return (
    <main class={tw`flex-grow font-brush`}>
      <div
        class={tw`p-4 max-w-7xl mx-auto mb-44 sm:mb-28 px-4 sm:px-6 lg:px-8`}
      >
        <div
          class={tw`paper max-w-[230px] mb-16`}
        >
          <div class="top-tape"></div>
          <h1 class={tw`text-5xl font-medium mx-auto`}>
            Artistes
          </h1>
        </div>

        <div class={tw`relative w-60 sm:w-80 mx-auto mt-24 md:mt-6 mb-24`}>
          <div class={tw`absolute w-full -top-16`}>
            <PaintPalette />
          </div>
          <button
            onClick={() => setSearchNationality("")}
            class={tw`absolute flex items-center -top-16 left-20 sm:-top-14 sm:left-24 focus:outline-none`}
          >
            <img
              class={worldFlagClasses}
              src="/flags/Monde.png"
              alt="Monde"
              title="Monde"
              draggable={draggable}
            />
          </button>
          {flags === 1 &&
            (
              <Fragment>
                <button
                  onClick={() => {
                    setSearchNationality("France");
                  }}
                  class={tw`absolute flex items-center -top-12 right-16 sm:-top-10 sm:right-20 focus:outline-none`}
                >
                  <img
                    class={flagClasses1}
                    src="/flags/France.png"
                    alt="France"
                    title="France"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {
                    setSearchNationality("Espagne");
                  }}
                  class={tw`absolute flex items-center -top-8 right-8 sm:-top-4 sm:right-11 focus:outline-none`}
                >
                  <img
                    class={flagClasses1}
                    src="/flags/Espagne.png"
                    alt="Espagne"
                    title="Espagne"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {
                    setSearchNationality("Portugal");
                  }}
                  class={tw`absolute flex items-center -top-2 right-3 sm:top-3 sm:right-5 focus:outline-none`}
                >
                  <img
                    class={flagClasses1}
                    src="/flags/Portugal.png"
                    alt="Portugal"
                    title="Portugal"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {
                    setSearchNationality("Italie");
                  }}
                  class={tw`absolute flex items-center top-5 right-1 sm:top-11 sm:right-2 focus:outline-none`}
                >
                  <img
                    class={flagClasses1}
                    src="/flags/Italie.png"
                    alt="Italie"
                    title="Italie"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {
                    setSearchNationality("Pays-Bas");
                  }}
                  class={tw`absolute flex items-center top-12 right-4 sm:top-20 sm:right-5 focus:outline-none`}
                >
                  <img
                    class={flagClasses1}
                    src="/flags/Pays-Bas.png"
                    alt="Pays-Bas"
                    title="Pays-Bas"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {
                    setSearchNationality("Belgique");
                  }}
                  class={tw`absolute flex items-center -bottom-24 right-14 sm:top-32 sm:left-56 focus:outline-none`}
                >
                  <img
                    class={flagClasses1}
                    src="/flags/Belgique.png"
                    alt="Belgique"
                    title="Belgique"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {
                    setSearchNationality("Pologne");
                  }}
                  class={tw`absolute flex items-center sm:left-44 focus:outline-none ${
                    css(
                      {
                        "bottom": "calc(-6.6rem)",
                        "right": "5.8rem",
                        "@screen sm": {
                          "top": "9.2rem",
                        },
                      },
                    )
                  }`}
                >
                  <img
                    class={flagClasses1}
                    src="/flags/Pologne.png"
                    alt="Pologne"
                    title="Pologne"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {
                    setSearchNationality("Allemagne");
                  }}
                  class={tw`absolute flex items-center right-32 sm:left-32 focus:outline-none ${
                    css(
                      {
                        "bottom": "calc(-6.6rem)",
                        "@screen sm": {
                          "top": "9.6rem",
                        },
                      },
                    )
                  }`}
                >
                  <img
                    class={flagClasses1}
                    src="/flags/Allemagne.png"
                    alt="Allemagne"
                    title="Allemagne"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {
                    setSearchNationality("Autriche");
                  }}
                  class={tw`absolute flex items-center -bottom-24 left-11 sm:-bottom-40 sm:left-20 focus:outline-none`}
                >
                  <img
                    class={flagClasses1}
                    src="/flags/Autriche.png"
                    alt="Autriche"
                    title="Autriche"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {
                    setSearchNationality("Hongrie");
                  }}
                  class={tw`absolute flex items-center -bottom-20 left-3 sm:-bottom-36 sm:left-8 focus:outline-none`}
                >
                  <img
                    class={flagClasses1}
                    src="/flags/Hongrie.png"
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
                  onClick={() => {
                    setSearchNationality("Suisse");
                  }}
                  class={tw`absolute flex items-center -top-12 right-16 sm:-top-10 sm:right-20 focus:outline-none`}
                >
                  <img
                    class={flagClasses2}
                    src="/flags/Suisse.png"
                    alt="Suisse"
                    title="Suisse"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {
                    setSearchNationality("Finlande");
                  }}
                  class={tw`absolute flex items-center -top-8 right-8 sm:-top-4 sm:right-11 focus:outline-none`}
                >
                  <img
                    class={flagClasses2}
                    src="/flags/Finlande.png"
                    alt="Finlande"
                    title="Finlande"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {
                    setSearchNationality("Norvège");
                  }}
                  class={tw`absolute flex items-center -top-2 right-3 sm:top-3 sm:right-5 focus:outline-none`}
                >
                  <img
                    class={flagClasses2}
                    src="/flags/Norvège.png"
                    alt="Norvège"
                    title="Norvège"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {
                    setSearchNationality("Suède");
                  }}
                  class={tw`absolute flex items-center top-5 right-1 sm:top-11 sm:right-2 focus:outline-none`}
                >
                  <img
                    class={flagClasses2}
                    src="/flags/Suède.png"
                    alt="Suède"
                    title="Suède"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {
                    setSearchNationality("Danemark");
                  }}
                  class={tw`absolute flex items-center top-12 right-4 sm:top-20 sm:right-5 focus:outline-none`}
                >
                  <img
                    class={flagClasses2}
                    src="/flags/Danemark.png"
                    alt="Danemark"
                    title="Danemark"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {
                    setSearchNationality("Tchécoslovaquie");
                  }}
                  class={tw`absolute flex items-center -bottom-24 right-14 sm:top-32 sm:left-56 focus:outline-none`}
                >
                  <img
                    class={flagClasses2}
                    src="/flags/Tchécoslovaquie.png"
                    alt="Tchécoslovaquie"
                    title="Tchécoslovaquie"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {
                    setSearchNationality("Ukraine");
                  }}
                  class={tw`absolute flex items-center sm:left-44 focus:outline-none ${
                    css(
                      {
                        "bottom": "calc(-6.6rem)",
                        "right": "5.8rem",
                        "@screen sm": {
                          "top": "9.2rem",
                        },
                      },
                    )
                  }`}
                >
                  <img
                    class={flagClasses2}
                    src="/flags/Ukraine.png"
                    alt="Ukraine"
                    title="Ukraine"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {
                    setSearchNationality("Arménie");
                  }}
                  class={tw`absolute flex items-center right-32 sm:left-32 focus:outline-none ${
                    css(
                      {
                        "bottom": "calc(-6.6rem)",
                        "@screen sm": {
                          "top": "9.6rem",
                        },
                      },
                    )
                  }`}
                >
                  <img
                    class={flagClasses2}
                    src="/flags/Arménie.png"
                    alt="Arménie"
                    title="Arménie"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {
                    setSearchNationality("Biélorussie");
                  }}
                  class={tw`absolute flex items-center -bottom-24 left-11 sm:-bottom-40 sm:left-20 focus:outline-none`}
                >
                  <img
                    class={flagClasses2}
                    src="/flags/Biélorussie.png"
                    alt="Biélorussie"
                    title="Biélorussie"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {
                    setSearchNationality("Russie");
                  }}
                  class={tw`absolute flex items-center -bottom-20 left-3 sm:-bottom-36 sm:left-8 focus:outline-none`}
                >
                  <img
                    class={flagClasses2}
                    src="/flags/Russie.png"
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
                  onClick={() => {
                    setSearchNationality("Japon");
                  }}
                  class={tw`absolute flex items-center -top-12 right-16 sm:-top-10 sm:right-20 focus:outline-none`}
                >
                  <img
                    class={flagClasses3}
                    src="/flags/Japon.png"
                    alt="Japon"
                    title="Japon"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {
                    setSearchNationality("Vietnam");
                  }}
                  class={tw`absolute flex items-center -top-8 right-8 sm:-top-4 sm:right-11 focus:outline-none`}
                >
                  <img
                    class={flagClasses3}
                    src="/flags/Vietnam.png"
                    alt="Vietnam"
                    title="Vietnam"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {
                    setSearchNationality("Chine");
                  }}
                  class={tw`absolute flex items-center -top-2 right-3 sm:top-3 sm:right-5 focus:outline-none`}
                >
                  <img
                    class={flagClasses3}
                    src="/flags/Chine.png"
                    alt="Chine"
                    title="Chine"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {
                    setSearchNationality("Grèce");
                  }}
                  class={tw`absolute flex items-center top-12 right-4 sm:top-20 sm:right-5 focus:outline-none`}
                >
                  <img
                    class={flagClasses3}
                    src="/flags/Grèce.png"
                    alt="Grèce"
                    title="Grèce"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {
                    setSearchNationality("Royaume-Uni");
                  }}
                  class={tw`absolute flex items-center -bottom-24 right-14 sm:top-32 sm:left-56 focus:outline-none`}
                >
                  <img
                    class={flagClasses3}
                    src="/flags/Royaume-Uni.png"
                    alt="Royaume-Uni"
                    title="Royaume-Uni"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {
                    setSearchNationality("Colombie");
                  }}
                  class={tw`absolute flex items-center sm:left-44 focus:outline-none ${
                    css(
                      {
                        "bottom": "calc(-6.6rem)",
                        "right": "5.8rem",
                        "@screen sm": {
                          "top": "9.2rem",
                        },
                      },
                    )
                  }`}
                >
                  <img
                    class={flagClasses3}
                    src="/flags/Colombie.png"
                    alt="Colombie"
                    title="Colombie"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {
                    setSearchNationality("Mexique");
                  }}
                  class={tw`absolute flex items-center right-32 sm:left-32 focus:outline-none ${
                    css(
                      {
                        "bottom": "calc(-6.6rem)",
                        "@screen sm": {
                          "top": "9.6rem",
                        },
                      },
                    )
                  }`}
                >
                  <img
                    class={flagClasses3}
                    src="/flags/Mexique.png"
                    alt="Mexique"
                    title="Mexique"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {
                    setSearchNationality("États-Unis");
                  }}
                  class={tw`absolute flex items-center -bottom-24 left-11 sm:-bottom-40 sm:left-20 focus:outline-none`}
                >
                  <img
                    class={flagClasses3}
                    src="/flags/États-Unis.png"
                    alt="États-Unis"
                    title="États-Unis"
                    draggable={draggable}
                  />
                </button>
                <button
                  onClick={() => {
                    setSearchNationality("Canada");
                  }}
                  class={tw`absolute flex items-center -bottom-20 left-3 sm:-bottom-36 sm:left-8 focus:outline-none`}
                >
                  <img
                    class={flagClasses3}
                    src="/flags/Canada.png"
                    alt="Canada"
                    title="Canada"
                    draggable={draggable}
                  />
                </button>
              </Fragment>
            )}
          <button
            onClick={handleMoreClick}
            class={tw`absolute flex items-center -top-4 right-28 sm:-top-4 sm:right-36 focus:outline-none`}
          >
            <img
              class={moreClasses}
              src="/symbols/add.png"
              alt="add-symbol"
              draggable={draggable}
            />
          </button>
          <h2
            class={tw`absolute text-lg font-medium w-48 top-32 sm:top-5 left-0 right-0 mx-auto z-10`}
          >
            Prénom(s), nom(s) :
          </h2>
          <div
            class={tw`brush-input-box absolute w-48 top-40 sm:top-12 left-0 right-0 mx-auto z-10`}
          >
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
      </div>

      <div
        id="slider"
        class={tw`max-w-3xl mt-[290px] mb-[40px] sm:mt-[230px] sm:mb-[8px] mx-[15%] sm:mx-[20%] md:mx-[25%] lg:mx-[30%]`}
      >
      </div>

      <ArtistsLayout artists={searchResults} grid={grid} />
    </main>
  );
}
