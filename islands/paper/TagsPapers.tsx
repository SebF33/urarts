import {
  artistNameSignal,
  artistSlugSignal,
  isForAloneArtistSignal,
} from "@utils/signals.ts";
import { DELAY_REACH_HREF } from "@utils/constants.ts";
import { TagCollection } from "@utils/types.d.ts";


interface Props {
  artistName: string;
  artistSlug: string;
  draggable?: boolean;
  ispersogallery: boolean;
  tags: TagCollection[];
}


export default function TagsPapers(
  { artistName, artistSlug, draggable, ispersogallery, tags }: Props,
) {

  if (!tags?.length) return null;

  const isPersoGallery: boolean = !!ispersogallery;

  const nbTagsByRow = 6;
  const rows = Math.ceil(tags.length / nbTagsByRow);


  // Clic sur un lien "tag"
  function handleLinkClick(event: MouseEvent) {
    event.preventDefault();

    const target = event.currentTarget as HTMLAnchorElement;
    const href = target.getAttribute("href");
    if (!href) return;

    // on précise que c'est pour du contenu concernant seulement un(e) artiste
    isForAloneArtistSignal.value = true;
    artistNameSignal.value = artistName;
    artistSlugSignal.value = artistSlug;

    // pour le délai au clic tout en préservant la navigation Fresh côté client
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = href;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, DELAY_REACH_HREF);
  }


  return (
    <div class="absolute -top-4 left-1/2 -translate-x-1/2 w-full xl:max-w-[880px] z-20 pointer-events-none">
      <div class="flex flex-col gap-1 items-center">
        {Array.from({ length: rows }).map((_, rowIndex) => {
          const rowTags = tags.slice(rowIndex * nbTagsByRow, (rowIndex + 1) * nbTagsByRow);
          return (
            <div key={rowIndex} class="flex flex-wrap justify-center gap-2">
              {rowTags.map((tag, tagIndex) => {
                const delay = (rowIndex * nbTagsByRow + tagIndex) * 100;

                return (
                  <div
                    key={tag.slug}
                    class="appear-effect-fadeindrop pointer-events-auto"
                    style={{ animationDelay: `${delay}ms` }}
                  >
                    <div
                      class={`paper paper-shadow max-w-[44vw] sm:max-w-[220px] rounded-md ${tag.position ?? ""}`}
                      style={{ transform: `rotate(${tag.rotation}deg)` }}
                    >
                      <div class="top-tape h-4 min-h-4 max-h-4 max-w-[85%] -mb-2"></div>
                      <div class="flex flex-col items-center gap-1 px-2 py-1 z-10 select-none">
                        <a
                          href={`/tag/${tag.slug}${isPersoGallery ? "/gallery" : ""}`}
                          onClick={handleLinkClick}
                          class="text-xs sm:text-sm leading-4 underline select-none min-w-0 break-words whitespace-normal [hyphens:auto]"
                          draggable={draggable}
                        >
                          <img
                            src={`/icons/${tag.name}.png`}
                            alt={tag.name}
                            title={tag.name}
                            class="w-8"
                            draggable={draggable}
                          />
                        </a>
                        <span
                          class="block text-[11px] sm:text-xs leading-4 text-lighterdark text-center w-full truncate"
                          title={tag.name}
                        >
                          {tag.name}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
