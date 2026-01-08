import {
  artistAvatarSignal,
  artistNameSignal,
  artistSlugSignal,
  isForAloneArtistSignal,
} from "@utils/signals.ts";
import { DELAY_REACH_HREF } from "@utils/constants.ts";

interface Movement {
  movementSlug: string;
  movementName: string;
  position: string;
  font: string;
};

interface Props {
  artistAvatar: string;
  artistName: string;
  artistSlug: string;
  draggable?: boolean;
  movements: Movement[];
}


export default function MovementsPapers(
  { artistAvatar, artistName, artistSlug, draggable, movements }: Props,
) {

  // Clic sur un lien "mouvement"
  function handleLinkClick(event: MouseEvent) {
    event.preventDefault();

    const target = event.currentTarget as HTMLAnchorElement;
    const href = target.getAttribute("href");
    if (!href) return;

    // on précise que c'est pour du contenu concernant seulement un(e) artiste
    isForAloneArtistSignal.value = true;
    artistAvatarSignal.value = artistAvatar;
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
    <div class="invisible md:visible absolute mt-12 ml-16">
      {movements.map((movement) => (
        <a
          key={movement.movementSlug}
          href={`/movement/${movement.movementSlug}`}
          onClick={handleLinkClick}
          class={`paper appear-effect-fast-fadein min-w-[180px] min-h-8 mt-1 ${movement.position} font-${movement.font}`}
          draggable={draggable}
          aria-label={movement.movementName}
        >
          <div class="top-tape max-h-3"></div>
          <div
            id={`movement-name-${movement.movementSlug}`}
            class="px-6 text-lighterdark text-xl italic select-none z-10"
          >
            {movement.movementName}
          </div>
        </a>
      ))}
    </div>
  );
}
