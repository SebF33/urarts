/**
 * Ajuste la luminosité d'une couleur HEX
 */
export function adjustColorBrightness(hex: string, amount: number): string {
  const color = hex.startsWith("#") ? hex.slice(1) : hex;
  const num = parseInt(color, 16);

  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));

  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, "0")}`;
}

/**
 * Formate des dimensions (FR en cm, EN en inches)
 */
const nfCM = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 1 });
const nfIN = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });

export const formatDimensions = (
  lng: string,
  w?: number | string,
  h?: number | string,
) => {
  const toNum = (v: unknown) =>
    (typeof v === "string" ? Number(v) : v) as number;
  const ww = toNum(w);
  const hh = toNum(h);

  if (!Number.isFinite(ww) || !Number.isFinite(hh)) {
    return `${h} × ${w} ${lng === "fr" ? "cm" : "in"}`; // fallback brut si invalide
  }

  if (lng === "fr") {
    // convention FR : hauteur × largeur en cm
    return `${nfCM.format(hh)} × ${nfCM.format(ww)} cm`;
  } else {
    // convention EN : width × height en inches (cm / 2.54)
    const wIn = ww / 2.54;
    const hIn = hh / 2.54;
    return `${nfIN.format(wIn)} × ${nfIN.format(hIn)} in`;
  }
};

/**
 * Donne les initiales à partir du prénom et du nom
 */
export function initials(first: string | undefined, last: string): string {
  return ((first?.[0] ?? "") + (last?.[0] ?? "")).toUpperCase();
}

/**
 * Détecte si l'appareil est tactile (mobile / tablette)
 * basé sur plusieurs heuristiques :
 * - présence de l'événement ontouchstart
 * - nombre de points de contact (navigator.maxTouchPoints)
 * - type de pointeur coarse (écran tactile)
 */
export function isTouchDevice(): boolean {
  return (
    "ontouchstart" in globalThis ||
    navigator.maxTouchPoints > 0 ||
    globalThis.matchMedia("(pointer: coarse)").matches
  );
}

/**
 * Mélange aléatoirement les éléments d'un tableau
 * en utilisant l'algorithme de Fisher-Yates :
 * - retourne une nouvelle copie sans modifier le tableau d'origine
 */
export function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

/**
 * Demande de sauter la prochaine animation du contenu Leonardo
 * (utilisé quand l'utilisateur ferme la popup pour éviter un flicker)
 */
export function skipNextLeonardoAnimation(selector = "#leonardoContent") {
  const el = document.querySelector<HTMLElement>(selector);
  if (!el) return;
  el.dataset.skipAnimation = "true";
}

/**
 * Convertit un slug (kebab-case) en camelCase
 * en supprimant les tirets et en mettant en majuscule la lettre suivante
 * (ex: "post-impressionism" → "postImpressionism")
 */
export function slugToCamelCase(slug: string): string {
  return slug.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}

/**
 * Attend la fin d'une transition CSS
 * (utilise "transitionend" + fallback timeout pour éviter les blocages)
 */
export function waitForTransitionEnd(
  el: HTMLElement,
  timeout = 700,
): Promise<void> {
  return new Promise<void>((resolve) => {
    let finished = false;

    const onEnd = () => {
      if (finished) return;
      finished = true;
      el.removeEventListener("transitionend", onEnd);
      resolve();
    };

    el.addEventListener("transitionend", onEnd);

    // fallback : au cas où "transitionend" ne se déclenche jamais
    setTimeout(onEnd, timeout);
  });
}
