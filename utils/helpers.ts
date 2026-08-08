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
 * Ajuste une couleur de premier plan (foreground) vers le noir ou le blanc
 * jusqu'à atteindre un ratio de contraste minimal par rapport au fond
 *
 * @param background Couleur de fond (HEX)
 * @param foreground Couleur souhaitée à l'origine (HEX)
 * @param minRatio   Ratio minimal exigé :
 *                   - 3:1 pour les éléments graphiques/composants d'interface (RGAA 3.2 / WCAG 1.4.11)
 *                   - 4.5:1 pour du texte normal (RGAA 3.3 / WCAG 1.4.3)
 * @param step       Granularité de l'ajustement (0-1, plus petit = plus précis)
 */
export function getAccessibleColor(
  background: string,
  foreground: string,
  minRatio = 3,
  step = 0.02,
): string {
  if (getContrastRatio(background, foreground) >= minRatio) {
    return foreground;
  }

  const bgLum = relativeLuminance(hexToRgb(background));
  // fond clair -> on assombrit le premier plan ; fond sombre -> on l'éclaircit
  const target: [number, number, number] = bgLum > 0.5
    ? [0, 0, 0]
    : [255, 255, 255];
  const [fr, fg, fb] = hexToRgb(foreground);
  const [tr, tg, tb] = target;

  let mixed = foreground;
  for (let t = step; t <= 1; t += step) {
    const r = fr + (tr - fr) * t;
    const g = fg + (tg - fg) * t;
    const b = fb + (tb - fb) * t;
    mixed = rgbToHex(r, g, b);
    if (getContrastRatio(background, mixed) >= minRatio) break;
  }

  return mixed;
}


/**
 * Ratio de contraste entre deux couleurs (1 à 21)
 */
export function getContrastRatio(color1: string, color2: string): number {
  const lum1 = relativeLuminance(hexToRgb(color1));
  const lum2 = relativeLuminance(hexToRgb(color2));
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}


/**
 * Convertit une couleur hexadécimale (#RRGGBB ou #RGB) en composantes RGB
 */
function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace("#", "");
  if (h.length === 3) {
    h = h.split("").map((c) => c + c).join("");
  }
  const num = Number.parseInt(h, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}


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
 * Luminance relative d'une couleur (WCAG 2.x)
 * https://www.w3.org/WAI/GL/wiki/Relative_luminance
 */
function relativeLuminance([r, g, b]: [number, number, number]): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const cs = c / 255;
    return cs <= 0.03928 ? cs / 12.92 : Math.pow((cs + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}


/**
 * Convertit des composantes RGB en couleur hexadécimale (#RRGGBB)
 */
function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((c) =>
        Math.max(0, Math.min(255, Math.round(c))).toString(16).padStart(2, "0")
      )
      .join("")
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
