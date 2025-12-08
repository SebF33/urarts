const NAV_THEME_KEY = "navTheme";
const DEFAULT_NAV_THEME = "header-paper";
const SECONDARY_NAV_THEME = "wave-colors";
const TRANSITION_DURATION = 300;



function animateFade(panel, isOpen) {
  if (panel._hideTimeout) {
    clearTimeout(panel._hideTimeout);
    panel._hideTimeout = null;
  }

  panel.style.removeProperty("display");

  if (isOpen) {
    // enter
    panel.classList.add("transition-opacity", "ease-out", "duration-300");
    panel.classList.remove("ease-in");

    panel.classList.add("opacity-0");
    panel.classList.remove("opacity-100");

    void panel.offsetWidth; // reflow

    panel.classList.remove("opacity-0");
    panel.classList.add("opacity-100");

    panel.dataset.open = "true";
    panel.setAttribute("aria-hidden", "false");
  } else {
    // leave
    panel.classList.add("transition-opacity", "ease-in", "duration-300");
    panel.classList.remove("ease-out");

    panel.classList.add("opacity-100");
    panel.classList.remove("opacity-0");

    void panel.offsetWidth; // reflow

    panel.classList.remove("opacity-100");
    panel.classList.add("opacity-0");

    panel.dataset.open = "false";
    panel.setAttribute("aria-hidden", "true");

    panel._hideTimeout = setTimeout(() => {
      panel.style.display = "none";
      panel._hideTimeout = null;
    }, TRANSITION_DURATION);
  }
}


function animateSlideX(panel, isOpen) {
  if (panel._hideTimeout) {
    clearTimeout(panel._hideTimeout);
    panel._hideTimeout = null;
  }

  panel.style.removeProperty("display");

  if (isOpen) {
    // enter
    panel.classList.add("transition-transform", "ease-out", "duration-300");
    panel.classList.remove("ease-in");

    panel.classList.add("translate-x-full");
    panel.classList.remove("translate-x-0");

    void panel.offsetWidth; // reflow

    panel.classList.remove("translate-x-full");
    panel.classList.add("translate-x-0");

    panel.dataset.open = "true";
    panel.setAttribute("aria-hidden", "false");
  } else {
    // leave
    panel.classList.add("transition-transform", "ease-in", "duration-300");
    panel.classList.remove("ease-out");

    panel.classList.add("translate-x-0");
    panel.classList.remove("translate-x-full");

    void panel.offsetWidth; // reflow

    panel.classList.remove("translate-x-0");
    panel.classList.add("translate-x-full");

    panel.dataset.open = "false";
    panel.setAttribute("aria-hidden", "true");

    panel._hideTimeout = setTimeout(() => {
      panel.style.display = "none";
      panel._hideTimeout = null;
    }, TRANSITION_DURATION);
  }
}


function applyNavTheme(theme) {
  const body = document.body;
  if (!body) return;

  body.dataset.navTheme = theme;

  const nav = document.getElementById("Urarts-Nav");
  if (nav) {
    nav.classList.remove(DEFAULT_NAV_THEME, SECONDARY_NAV_THEME);
    nav.classList.add(theme === SECONDARY_NAV_THEME ? SECONDARY_NAV_THEME : DEFAULT_NAV_THEME);
  }
}


function applyPanelTransition(panel, isOpen) {
  const transitionType = panel.dataset.transition || "fade";

  if (transitionType === "slide-x") {
    animateSlideX(panel, isOpen);
  } else {
    animateFade(panel, isOpen);
  }
}


function initNavTheme() {
  const stored = localStorage.getItem(NAV_THEME_KEY);
  let theme = stored || DEFAULT_NAV_THEME;

  applyNavTheme(theme);

  document.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-toggle-nav-theme]");
    if (!btn) return;

    theme = theme !== SECONDARY_NAV_THEME ? SECONDARY_NAV_THEME : DEFAULT_NAV_THEME;
    localStorage.setItem(NAV_THEME_KEY, theme);
    applyNavTheme(theme);
  });
}


function initSections() {
  setSectionOpen("famous-art", true);
  setSectionOpen("talents-art", true);

  document.addEventListener("click", (event) => {
    const toggle = event.target.closest("[data-toggle-section]");
    if (!toggle) return;

    const id = toggle.dataset.toggleSection;
    if (!id) return;

    const anyPanel = document.querySelector(
      `[data-section-panel="${id}"]`,
    );
    const isOpen = anyPanel && anyPanel.dataset.open === "true";

    setSectionOpen(id, !isOpen);
  });

  document.addEventListener("click", (event) => {
    const openBtn = event.target.closest("[data-open-section]");
    if (!openBtn) return;

    const id = openBtn.dataset.openSection;
    const val = openBtn.dataset.openValue === "true";

    setSectionOpen(id, val);
  });
}


function setSectionOpen(id, isOpen) {
  const body = document.body;
  if (!body) return;

  if (id === "famous-art") {
    body.dataset.openFamousArt = isOpen ? "true" : "false";
  } else if (id === "talents-art") {
    body.dataset.openTalentsArt = isOpen ? "true" : "false";
  }

  document
    .querySelectorAll(`[data-section-panel="${id}"]`)
    .forEach((panel) => {
      applyPanelTransition(panel, isOpen);
    });
}



// Init
function initAppState() {
  initNavTheme();
  initSections();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAppState);
} else {
  initAppState();
}