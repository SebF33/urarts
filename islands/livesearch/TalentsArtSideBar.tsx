import { Any } from "any";
import { ArtCollection } from "@utils/types.d.ts";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { DELAY_API_CALL, DELAY_DEBOUNCE, DELAY_DISPLAY, DELAY_REACH_HREF, DELAY_TOOLTIP_TRIGGER, FAMOUS_ART_IMG_WRAPPER } from "@utils/constants.ts";
import { h } from "preact";
import i18next from "i18next";
import "@utils/i18n/config.ts";
import ky from "ky";
import { languageSignal } from "@utils/signals.ts";
import tippy from "tippyjs";
import { UrlBasePath } from "@/env.ts";
import { useDebounce } from "@utils/hooks/useDebounce.ts";
import { useEffect, useState } from "preact/hooks";
import { useImageOnLoad } from "@utils/hooks/useImageOnLoad.ts";

import { SearchInput } from "@islands/input/SearchInput.tsx";

type Arts = Array<ArtCollection>;


export default function TalentsArtSideBar() {
  const [display, setDisplay] = useState<boolean>(false);
  const { handleImageOnLoad, imageOnLoadStyle } = useImageOnLoad()
  const [searchResults, setSearchResults] = useState<Arts[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [tippyInstances, setTippyInstances] = useState<Any[]>([]);
  const debouncedValue = useDebounce<string>(searchTerm, DELAY_DEBOUNCE)

  const draggable = false;
  const type = "talentsart";


  // Délai d'affichage initial
  useEffect(() => {
    const timeoutId = setTimeout(() => { setDisplay(true); }, DELAY_DISPLAY);
    return () => clearTimeout(timeoutId);
  }, []);


  // Appel à l'API "Collection"
  useEffect(() => {
    const timer = setTimeout(() => {
      ky.get(`${UrlBasePath}/api/collection?lng=${languageSignal.value}&type=${type}&name=${debouncedValue}`)
        .json<Arts[]>()
        .then((response) => {
          setSearchResults(response);
        });
    }, DELAY_API_CALL);

    return () => clearTimeout(timer);
  }, [debouncedValue]);


  // Infobulles
  useEffect(() => {
    tippyInstances.forEach((instance) => { instance.destroy(); });
    setTippyInstances([]);

    searchResults.forEach((p) => {
      const artElement: HTMLElement | null = document.querySelector(`[data-art-id="${p.id}"]`);

      if (artElement) {
        tippy(artElement, {
          allowHTML: true,
          content:
            `<p style="margin-top:2px;font-size:1.4em;line-height:1;color:${colorScheme[currentColorScheme].gray}"><strong>${p.name}</strong></p>
            <p style="line-height:1">${i18next.t("artists.artist", { ns: "translation" })} <strong style="color:${p.color}">${p.last_name}</strong></p>`,
          delay: DELAY_TOOLTIP_TRIGGER,
          interactive: true,
          placement: "bottom",
          theme: "urarts",
          onCreate(instance: Any) {
            setTippyInstances((prevInstances) => [...prevInstances, instance]);
          },
          onDestroy(instance: Any) {
            setTippyInstances((prevInstances) =>
              prevInstances.filter((i) => i !== instance)
            );
          },
        });
      }
    });

    return () => {
      // Nettoyer les listeners et instances pour éviter les fuites mémoire
      tippyInstances.forEach((instance) => instance.destroy());
    };
  }, [searchResults]);


  function handleClick(event: h.JSX.TargetedMouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const href = (event.currentTarget as HTMLAnchorElement).href;
    setTimeout(() => {
      window.location.href = href;
    }, DELAY_REACH_HREF);
  }


  return (
    <section
      data-section-panel="talents-art"
      data-open="true"
      data-transition="fade"
      class="absolute right-0 max-h-screen min-h-screen max-w-full hidden 2xl:flex bg-opacity-75 transition-opacity z-40 overflow-hidden mask-94-96"
    >
      <div
        data-section-panel="talents-art"
        data-open="true"
        data-transition="slide-x"
        class="max-w-md transform translate-x-0"
      >
        <div class="h-full flex flex-col text-lighterdark bg-gradient-to-r from-transparent via-black/30 to-transparent backdrop-blur-md shadow-2xl rounded-lg ring-1 ring-white/10">
          <div class="w-[282px] mt-16">
            <div
              role="button"
              data-open-section="talents-art"
              data-open-value="false"
              class="paper paper-shadow cursor-pointer">
              <span class="sr-only">Fermer</span>
              <h1 class="p-2 text-2xl font-semibold text-center leading-none z-10 select-none">{i18next.t("paper.talentsart", { ns: "translation" })}</h1>
            </div>
            <div class="mt-5 px-4">
              <div class="brush-input-box relative w-48 max-h-[68px] mx-auto mb-4">
                <SearchInput
                  type="talentsartsidebar"
                  value={searchTerm}
                  onInput={(e) => setSearchTerm((e.currentTarget as HTMLInputElement).value)}
                />
              </div>
            </div>
          </div>
          <div class="h-full px-4 overflow-auto custom-scrollbar mask-99">
            <div class="grid grid-cols-1 gap-4">
              {display && searchResults &&
                searchResults.map((p) => (
                  <div class="max-w-[220px] flex mx-auto p-1 first:mt-4">
                    <a
                      href={"/art/" + p.artist_slug + "?alone&id=" + p.id}
                      onClick={handleClick}
                      class="cursor-pointer group"
                      draggable={draggable}
                    >
                      <div
                        data-art-id={p.id}
                        class="famous-art-shadow transition-transform transform-gpu duration-100 group-hover:scale-[1.03]"
                        style={FAMOUS_ART_IMG_WRAPPER.wrap}
                      >
                        <img
                          style={{ ...FAMOUS_ART_IMG_WRAPPER.image, ...imageOnLoadStyle.thumbnail }}
                          src="/textures/placeholder_150.png"
                          alt="placeholder_150"
                        />
                        <img
                          onLoad={handleImageOnLoad}
                          style={{ ...imageOnLoadStyle.fullSize }}
                          src={p.url}
                          alt={p.name}
                          draggable={draggable}
                        />
                      </div>
                    </a>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
