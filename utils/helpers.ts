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
 * Demande de sauter la prochaine animation du contenu Leonardo
 * (utilisé quand l'utilisateur ferme la popup pour éviter un flicker)
 */
export function skipNextLeonardoAnimation(selector = "#leonardoContent") {
  const el = document.querySelector<HTMLElement>(selector);
  if (!el) return;
  el.dataset.skipAnimation = "true";
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
