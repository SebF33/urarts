import { ArtCollection, ArtRow, MovementRow } from "@utils/types.d.ts";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { DELAY_API_CALL, DELAY_REACH_HREF } from "@utils/constants.ts";
import { h } from "preact";
import i18next from "i18next";
import "@utils/i18n/config.ts";
import ky from "ky";
import { languageSignal } from "@utils/signals.ts";
import { UrlBasePath } from "@/env.ts";
import { useEffect, useLayoutEffect, useState } from "preact/hooks";

import Preview from "@islands/Preview.tsx";
import Title from "@islands/paper/Title.tsx";


type Arts = Array<ArtCollection>;
type Movements = Array<MovementRow>;


export default function MovementsList(
  props: { readonly movements: Movements },
) {
  const [hoveredImageUrl, setHoveredImageUrl] = useState<object | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<number | null>(null);

  
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


  const handleMouseEnter = (slug: string) => {
    if (hoverTimeout !== null) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    
    setHoveredImageUrl(null);

    const timeoutId = setTimeout(() => {

      async function fetchPreview() {
        try {
          const response = await ky.get(`${UrlBasePath}/api/collection?type=movement&slug=${slug}`).json<Arts>();
  
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


  // Background pour la page des mouvements
  useLayoutEffect(() => {
    const body = document.querySelector("body");
    const main = document.querySelector<HTMLElement>('[data-name="movements"]');

    if (body) {
      body.style.backgroundColor = colorScheme[currentColorScheme].gray;
    }

    if (main) {
      main.style.background = `url(/background/gray)`;
      main.style.backgroundAttachment = "local";
      main.style.backgroundPosition = "center";
      main.style.backgroundSize = "3700px";
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
      <div class="flex justify-between items-start md:mb-6">
        {/* Titre de la page */}
        <Title
          name="movements"
          dimension="min-h-[30px] md:min-h-[60px] w-[115px] md:w-[230px]"
          margin="mt-2 mb-5 md:mt-5"
        />
      </div>

      <div class="flex flex-wrap">
        {/* Liste des mouvements */}
        {props.movements &&
          (
            <ul class={`text-lighterdark lg:w-1/3 sm:w-1/2 lg:mb-20 p-2`}>
              {props.movements.map((item, index) => (
                <li class={`mx-2 my-4`} key={index}>
                  <a
                    href={"/movement/" + item.slug}
                    class="cursor-pointer"
                    onClick={handleClick}
                    onMouseEnter={() => handleMouseEnter(item.slug)}
                    onPointerEnter={() => handleMouseEnter(item.slug)}
                  >
                    <p class={`relative group text-xl leading-none`}>
                      <span>{item.name}</span>
                      <span class={`italic text-[1.05rem]`}>
                        {" "}({item.art_count}{" "}{i18next.t("common.art", { ns: "translation" })}{item.art_count === "1" ? "" : "s"})
                      </span>
                      <span
                        class={`absolute -bottom-2 left-0 w-0 h-1 bg-cyan transition-all group-hover:w-full`}
                      >
                      </span>
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          )}

          <Preview image={hoveredImageUrl} />
      </div>
    </div>
  );
}
