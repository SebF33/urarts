import {
  artistAvatarSignal,
  artistNameSignal,
  artistSlugSignal,
} from "@utils/signals.ts";
import { delayedClientNavigation } from "@utils/navigation.ts";
import i18next from "i18next";
import "@utils/i18n/config.ts";

import { PencilArrow } from "@components/Assets.tsx";


export default function BackToTheArtistPaper() {

  const draggable = false;


  return (
    <a
      href={`/art/${artistSlugSignal.value}`}
      onClick={delayedClientNavigation}
      title={`${i18next.t("common.back_to_the_artist", { ns: "translation" })} ${artistNameSignal.value}`}
      aria-label={`${i18next.t("common.back_to_the_artist", { ns: "translation" })} ${artistNameSignal.value}`}
      class="block"
      draggable={draggable}
    >
      <div class="relative paper max-h-12 min-h-12 min-w-[60px] md:min-w-[140px] max-w-[60px] md:max-w-[140px] transform -rotate-6 mt-6">
        <div class="top-tape h-4 max-h-4 min-h-4 max-w-[90%]"></div>
        <div class="relative flex items-center justify-center gap-x-4 px-4 py-2 select-none">
          <div class="absolute top-0 left-0 transform translate-x-8 translate-y-3 invisible md:visible z-10">
            <PencilArrow aria-hidden="true" />
          </div>
          <div class="shrink-0 ml-0 md:ml-20 z-10">
            <img
              src={artistAvatarSignal.value}
              alt={artistNameSignal.value}
              class="h-10 max-w-full object-cover flex-none"
              draggable={draggable}
            />
          </div>
        </div>
      </div>
    </a>
  );  
}
