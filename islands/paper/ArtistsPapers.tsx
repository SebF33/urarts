import { DELAY_REACH_HREF } from "@utils/constants.ts";
import { isForAloneArtistSignal } from "@utils/signals.ts";

import BackToTheArtistPaper from "@islands/paper/BackToTheArtistPaper.tsx";

interface Artist {
  name: string;
  slug: string;
  position: string;
  avatar_url: string;
}

interface Props {
  artists: Artist[];
  draggable?: boolean;
}


export default function ArtistsPapers({ artists, draggable }: Props) {

  // Clic sur un lien "artiste"
  function handleLinkClick(event: MouseEvent) {
    event.preventDefault();

    const target = event.currentTarget as HTMLAnchorElement;
    const href = target.getAttribute("href");
    if (!href) return;

    // pour le délai au clic tout en préservant la navigation Fresh côté client
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = href;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, DELAY_REACH_HREF);
  }


  // Bouton "Retour à l'artiste" si on est sur du contenu concernant seulement un(e) artiste
  if (isForAloneArtistSignal.value) {
    return (
      <div class="invisible lg:visible absolute ml-8">
        <BackToTheArtistPaper />
      </div>
    );
  }


  return (
    <div class="invisible xl:visible absolute max-w-0 xl:max-w-full mt-12 ml-16 overflow-hidden xl:overflow-visible">
      {artists.map((artist) => (
        <div
          class={`paper appear-effect-fast-fadein max-w-[180px] min-w-[180px] min-h-8 ${artist.position}`}
        >
          <div class="top-tape max-h-3"></div>
          <a
            href={`/art/${artist.slug}`}
            onClick={handleLinkClick}
            class="z-10 text-center text-lighterdark text-xl italic leading-5 underline select-none"
            draggable={draggable}
          >
            {artist.name}
          </a>
          <img
            class="w-14 ml-3 p-1"
            src={artist.avatar_url}
            alt={artist.name}
          />
        </div>
      ))}
    </div>
  );
}
