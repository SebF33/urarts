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
    <div class="relative paper paper-shadow min-h-8 min-w-[180px] max-w-[180px] transform -rotate-6 mt-6">
      <div class="top-tape h-4 max-h-4 min-h-4 max-w-[90%]"></div>
      <div class="relative flex items-center justify-center gap-x-4 px-4 py-2 z-10 select-none">
        <div class="absolute top-0 left-0 transform translate-x-6 translate-y-4 sm:translate-y-6">
          <PencilArrow />
        </div>
        <a
          onClick={(e) => handleLinkClick(e, `/art/${artistSlugSignal.value}`)}
          class="shrink-0 ml-20"
          title={`${i18next.t("common.back_to_the_artist", { ns: "translation" })} ${artistNameSignal.value}`}
          aria-label={`${i18next.t("common.back_to_the_artist", { ns: "translation" })} ${artistNameSignal.value}`}
          draggable={draggable}
        >
          <img
            src={artistAvatarSignal.value}
            alt={artistNameSignal.value}
            class="h-14 sm:h-16 max-w-full object-cover flex-none"
            draggable={draggable}
          />
        </a>
      </div>
    </div>
  );
}
