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
