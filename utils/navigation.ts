import { DELAY_REACH_HREF } from "@utils/constants.ts";

// Clic sur un lien
export function delayedClientNavigation(event: MouseEvent) {
  event.preventDefault();

  const target = event.currentTarget as HTMLAnchorElement | null;
  if (!target) return;

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
