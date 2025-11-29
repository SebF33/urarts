import {
  artistAvatarSignal,
  artistNameSignal,
  artistSlugSignal,
} from "@utils/signals.ts";
import { DELAY_REACH_HREF } from "@utils/constants.ts";
import i18next from "i18next";
import "@utils/i18n/config.ts";

import { PencilArrow } from "@components/Assets.tsx";


export default function BackToTheArtistPaper() {

  const draggable = false;


  // Clic sur le lien de retour à la page de l'artiste
  const handleLinkClick = (event: MouseEvent, href: string) => {
    event.preventDefault();

    // pour préserver la navigation Fresh côté client
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = href;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, DELAY_REACH_HREF);
  };


  return (
    <a
      onClick={(e) => handleLinkClick(e, `/art/${artistSlugSignal.value}`)}
      title={`${i18next.t("common.back_to_the_artist", { ns: "translation" })} ${artistNameSignal.value}`}
      aria-label={`${i18next.t("common.back_to_the_artist", { ns: "translation" })} ${artistNameSignal.value}`}
      draggable={draggable}
      class="block z-10"
    >
      <div class="relative paper paper-shadow max-h-12 min-h-12 min-w-[60px] md:min-w-[140px] max-w-[60px] md:max-w-[140px] transform -rotate-6 mt-6 z-10">
        <div class="top-tape h-4 max-h-4 min-h-4 max-w-[90%]"></div>
        <div class="relative flex items-center justify-center gap-x-4 px-4 py-2 select-none">
          <div class="absolute top-0 left-0 transform translate-x-8 translate-y-3 invisible md:visible">
            <PencilArrow />
          </div>
          <div class="shrink-0 ml-0 md:ml-20">
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
