import { artistNameSignal, isForAloneArtistSignal } from "@utils/signals.ts";
import i18next from "i18next";
import "@utils/i18n/config.ts";

import BackToTheArtistPaper from "@islands/paper/BackToTheArtistPaper.tsx";

interface Props {
  info: string;
  myslug: string;
  tag: string;
}


export default function TagHero({ info, myslug, tag }: Props) {
  const draggable = false;

  return (
    <div class="relative bg-lighterdark shadow-2xl">
      {/* Bouton "Retour à l'artiste" si on est sur du contenu concernant seulement un(e) artiste */}
      {isForAloneArtistSignal.value && (
        <div class="absolute z-20 ml-4 md:ml-7">
          <BackToTheArtistPaper />
        </div>
      )}
      <div class="relative max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div class="p-4 sm:p-6">
          <div class="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
            {/* Image du tag */}
            <div class="shrink-0 mx-auto md:mx-0">
              <img
                src={`/tags/${myslug}.png`}
                alt={tag}
                class="block w-24 h-24 md:w-32 md:h-32 object-contain select-none"
                draggable={draggable}
                loading="lazy"
              />
            </div>
            <div class="grow">
              {/* Titre du tag */}
              <div class="inline-block">
                <h1 class="text-white text-3xl md:text-5xl font-bold leading-tight flex items-center flex-wrap gap-2">
                  {tag}
                  {isForAloneArtistSignal.value && (
                    <span class="text-[1rem] sm:text-[1.2rem] italic text-white/80">
                      {`${i18next.t("common.according_to", { ns: "translation" })} ${artistNameSignal.value}`}
                    </span>
                  )}
                </h1>
                <div class="mt-2 h-1 bg-white rounded-full w-full"></div>
              </div>
              {/* Description du tag */}
              <p
                class="mt-4 text-white/90 text-lg md:text-xl leading-relaxed"
                dangerouslySetInnerHTML={{ __html: info }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
