import {
  artistsYearsSignal,
  histocharactersYearsSignal,
  languageSignal,
  nationalitySlugSignal,
} from "@utils/signals.ts";
import {
  DEFAULT_NAV_THEME,
  DELAY_LEONARDO_CALL,
  DELAY_LEONARDO_FACT_TRIGGER,
  DELAY_LEONARDO_FIRST_CALL,
  NAV_THEME_KEY,
  SECONDARY_NAV_THEME,
} from "@utils/constants.ts";
import i18next from "i18next";
import "@utils/i18n/config.ts";
import ky from "ky";
import { Language } from "@utils/i18n/i18next.d.ts";
import {
  skipNextLeonardoAnimation,
  waitForTransitionEnd,
} from "@utils/helpers.ts";
import tippy from "tippyjs";
import { UrlBasePath } from "@/env.ts";
import { useEffect, useLayoutEffect, useState } from "preact/hooks";

import {
  ApiIcon,
  ButtonLines,
  HeartIcon,
  HistoIcon,
  InterrogationIcon,
  StatIcon,
  WomanIcon,
} from "@components/Assets.tsx";

import type { Any } from "any";
import type { Instance } from "tippyjs";
import type { TargetedMouseEvent } from "preact";


type TippyButtonElement = HTMLButtonElement & {
  _tippy: Instance;
};


export interface Props {
  readonly url: URL;
}


export default function Nav(props: Props) {

  // CSS
  const draggable = false;
  const desktopCurrent = "aria-[current=page]:text-lighterdark aria-[current=page]:after:scale-x-100 after:absolute after:-bottom-1 after:left-1/2 after:h-1 after:w-full after:-translate-x-1/2 after:scale-x-0 after:bg-lighterdark after:transition-transform after:duration-200";
  const desktopIconBase = "relative h-16 w-12 shrink-0 items-center justify-center text-white";
  const desktopPrimaryAnchor = `relative py-4 px-2 text-lg font-medium text-white hover:text-lighterdark transition duration-300 ${desktopCurrent}`;
  const desktopHistoAnchor = `inline-flex ${desktopIconBase} ${desktopCurrent}`;
  const desktopWomanAnchor = `inline-flex ${desktopIconBase} ${desktopCurrent}`;
  const desktopHeartAnchor = `inline-flex ${desktopIconBase} ${desktopCurrent}`;
  const desktopStatAnchor = `inline-flex ${desktopIconBase} ${desktopCurrent}`;
  const desktopApiAnchor = `hidden lg:inline-flex ${desktopIconBase} ${desktopCurrent}`;
  const desktopInterrogationAnchor = `inline-flex ${desktopIconBase} ${desktopCurrent}`;
  const mobileCurrent = "aria-[current=page]:active aria-[current=page]:text-white aria-[current=page]:bg-lighterdark aria-[current=page]:font-semibold";
  const mobileHover = "hover:bg-lighterdark transition duration-300";
  const mobilePrimaryAnchor = `h-[60px] flex flex-col justify-center text-lg ${mobileHover} ${mobileCurrent}`;
  const mobileSecondaryAnchor = `h-[60px] flex flex-col items-center justify-center px-1 py-3 text-lg ${mobileHover} ${mobileCurrent}`;


  // Leonardo
  const [leonardoActiveContent, setLeonardoActiveContent] = useState<boolean>();
  const leonardoStatus = localStorage.getItem("leonardo");


  // Activation/désactivation de Leonardo
  useEffect(() => {
    const ref = document.querySelector<HTMLButtonElement>("#U-Icon");
    if (!ref) return;

    let shutInterval: number;
    let mousemoveHandler: (e: MouseEvent) => void;

    const leonardoTooltip = tippy(ref, {
      allowHTML: true,
      appendTo: () => document.body,
      arrow: false,
      duration: [600, 300],
      content:
        `<img id="leonardoAvatar" class="absolute top-[-0.5rem] left-[-2rem] max-w-[95px] min-w-[95px]" src="/textures/leonardo.png" alt="Leonardo" loading="lazy" draggable=${draggable}/>
        <div class="absolute top-[-0.6rem] left-[-2.0rem]"><div class="eye left-eye"><div class="eyeshut"><div></div></div><div class="eyeball left-eyeball"></div></div></div>
        <div class="absolute top-[-0.57rem] left-[-0.60rem]"><div class="eye right-eye"><div class="eyeshut"><div></div></div><div class="eyeball right-eyeball"></div></div></div>
        <div id="leonardoContent" class="flex-col pl-16 pb-1 text-xl leading-7 select-none">...</div>`,
      hideOnClick: "false",
      interactive: true,
      maxWidth: 900,
      offset: [-220, 12],
      placement: "bottom-start",
      role: "leonardo",
      theme: "leonardo",
      trigger: "manual",

      // à chaque ouverture
      onShow(instance) {
        const tooltipEl = instance.popper;

        // yeux de Leonardo
        const eyes = Array.from(
          tooltipEl.querySelectorAll<HTMLElement>(".eye"),
        );
        const maxShutDelay = 7000;
        const minShutDelay = 1000;

        // événements hover & click sur chaque œil
        eyes.forEach((eye) => {
          const eyeshut = eye.querySelector<HTMLElement>(".eyeshut div");
          if (!eyeshut) return;
          eye.addEventListener(
            "mouseover",
            () => eyeshut.style.height = "100%",
          );
          eye.addEventListener("mouseout", () => eyeshut.style.height = "0%");
          eye.addEventListener("click", () => {
            skipNextLeonardoAnimation("#leonardoContent"); // éviter flicker lors de la fermeture
            instance.hide();
            localStorage.setItem("leonardo", "inactive");
            setLeonardoActiveContent(false);
          });
        });

        // animation de clignement aléatoire
        function animateEyeShut() {
          const delay = Math.random() * (maxShutDelay - minShutDelay) +
            minShutDelay;
          eyes.forEach((eye) => {
            const eyeshut = eye.querySelector<HTMLElement>(".eyeshut div");
            if (!eyeshut) return;
            setTimeout(() => {
              eyeshut.style.height = "100%";
              setTimeout(() => {
                eyeshut.style.height = "0%";
              }, 200);
            }, delay);
          });
        }
        animateEyeShut();
        shutInterval = globalThis.setInterval(animateEyeShut, maxShutDelay);

        // suivi du regard précis
        mousemoveHandler = (e: MouseEvent) => {
          // intensité du suivi en px
          const strengthX = 2.5;
          const strengthYDown = 1.5; // vers le bas
          const strengthYUp = 2.0; // vers le haut
          eyes.forEach((eye) => {
            const eyeball = eye.querySelector<HTMLElement>(".eyeball");
            if (!eyeball) return;
            // centre de l'œil
            const rect = eye.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            // delta vers le pointeur
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            // décalage horizontal
            const x = Math.max(
              -strengthX,
              Math.min(strengthX, dx / (globalThis.innerWidth / 2) * strengthX),
            );
            // décalage vertical, avec limite adaptée selon la direction
            const yRaw = dy / (globalThis.innerHeight / 2);
            let y: number;
            if (yRaw < 0) {
              y = Math.max(-strengthYUp, Math.min(0, yRaw * strengthYUp));
            } else {
              y = Math.max(0, Math.min(strengthYDown, yRaw * strengthYDown));
            }
            // centrage de base + offset
            eyeball.style.transform =
              `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
          });
        };
        document.addEventListener("mousemove", mousemoveHandler);
      },

      // à chaque fermeture
      onHide() {
        clearInterval(shutInterval);
        document.removeEventListener("mousemove", mousemoveHandler);
      },
    });

    // retarde l'apparition au chargement de la page
    const firstShowTimer = setTimeout(() => {
      if (localStorage.getItem("leonardo") !== "inactive") {
        leonardoTooltip.show();
        setLeonardoActiveContent(true);
      }
    }, DELAY_LEONARDO_FIRST_CALL);

    if (leonardoStatus === "inactive") leonardoTooltip.hide();

    return () => {
      clearTimeout(firstShowTimer);
    };
  }, []);


  // Appel à l'API "Leonardo" avec effet de transition
  const fetchLeonardoData = async (
    params: Record<string, Any>,
    signal: AbortSignal,
  ) => {
    const leonardoContent = document.querySelector("#leonardoContent") as
      | HTMLElement
      | null;
    if (!leonardoContent) return;

    try {
      const response = await ky.get(`${UrlBasePath}/api/leonardo`, {
        searchParams: params,
        signal,
      });
      const leonardoResponse = await response.text();

      // si nouveau contenu pour Leonardo
      if (leonardoContent && leonardoResponse !== "no_change") {
        // nettoyage des images déjà présentes
        const imgs = leonardoContent.querySelectorAll("img");
        imgs.forEach((i) => i.remove());

        // première insertion directement et marquer comme initialisé
        const isInitialized = leonardoContent.dataset.initialized === "true";
        if (!isInitialized) {
          // injection directe du contenu sans animation
          leonardoContent.innerHTML = leonardoResponse;
          leonardoContent.dataset.initialized = "true";
          // nettoyage des styles d'animation
          leonardoContent.style.opacity = "";
          leonardoContent.style.transform = "";
          leonardoContent.style.filter = "";
          return;
        }

        // vérifier si on doit sauter l'animation
        const skipAnim = leonardoContent.dataset.skipAnimation === "true";
        if (skipAnim) {
          // nettoyage du flag pour les mises à jour suivantes
          delete leonardoContent.dataset.skipAnimation;
          // injection directe du contenu sans animation
          leonardoContent.innerHTML = leonardoResponse;
          // nettoyage des classes / styles d'animation
          leonardoContent.classList.remove(
            "leonardo--prepare",
            "leonardo--enter",
            "leonardo-pulse",
          );
          leonardoContent.style.opacity = "";
          leonardoContent.style.transform = "";
          leonardoContent.style.filter = "";
          return;
        }

        // cloner l'ancien contenu pour animer sa sortie
        const oldClone = leonardoContent.cloneNode(true) as HTMLElement;
        oldClone.id = "leonardoContentClone";
        const rect = leonardoContent.getBoundingClientRect();
        oldClone.style.position = "fixed";
        oldClone.style.left = `${rect.left}px`;
        oldClone.style.top = `${rect.top}px`;
        oldClone.style.width = `${rect.width}px`;
        oldClone.style.height = `${rect.height}px`;
        oldClone.style.margin = "0";
        oldClone.style.pointerEvents = "none";
        oldClone.style.boxSizing = "border-box";
        oldClone.style.zIndex = "9998";
        oldClone.classList.add("leonardo-clone--init");
        document.body.appendChild(oldClone);
        // état de départ
        leonardoContent.classList.add("leonardo--prepare");
        // forcer le reflow
        void leonardoContent.offsetHeight;
        // démarrer l'animation de sortie
        requestAnimationFrame(() => {
          oldClone.classList.add("leonardo-clone--exit");
        });
        // attendre la fin de la transition
        await waitForTransitionEnd(oldClone, 300);
        // fin de l'animation de sortie
        oldClone.remove();
        // injection du contenu
        leonardoContent.innerHTML = leonardoResponse;
        // forcer le reflow puis déclencher l'animation d'entrée
        void leonardoContent.offsetWidth;
        leonardoContent.classList.remove("leonardo--prepare");
        leonardoContent.classList.add("leonardo--enter");
        // attendre la fin de l'animation d'entrée
        await waitForTransitionEnd(leonardoContent, 800);
        // nettoyage des classes d'animation
        leonardoContent.classList.remove("leonardo--enter");
      }
    } catch (error: Any) {
      // gestion des erreurs
      if (error.name !== "AbortError" && leonardoContent) {
        leonardoContent.innerHTML = i18next.t("leonardo.error", {ns: "translation"});
      }
      if (leonardoContent) {
        leonardoContent.textContent = "...";
      }
    }
  };


  // Gestion des appels à l'API "Leonardo"
  useEffect(() => {
    if (leonardoActiveContent === false || leonardoStatus === "inactive") {
      return;
    }

    // Paramètres pour la requête
    const url = new URL(props.url);
    const pageName = url.pathname.split("/")[1];
    const subpageSlug = url.pathname.split("/")[2];

    const ctxArray =
      (pageName !== "artists" && pageName !== "histocharacters" &&
          url.searchParams.has("id"))
        ? [
          url.searchParams.get("id"),
          url.searchParams.has("alone") ? "alone" : "",
        ]
        : (pageName === "artists")
        ? [
          artistsYearsSignal.value[0],
          artistsYearsSignal.value[1],
          nationalitySlugSignal.value,
        ]
        : (pageName === "histocharacters")
        ? [
          histocharactersYearsSignal.value[0],
          histocharactersYearsSignal.value[1],
          nationalitySlugSignal.value,
        ]
        : [];

    const ctx = JSON.stringify(ctxArray.join("_"));

    // Gérer l'annulation des requêtes
    const controller = new AbortController();

    // Appel initial
    const firstTimer = setTimeout(() => {
      fetchLeonardoData({
        lng: languageSignal.value,
        welcome: url.searchParams.get("fresh-partial") !== "true"
          ? "true"
          : "false",
        page: pageName,
        subpage: subpageSlug,
        pagectx: ctx,
      }, controller.signal);
    }, DELAY_LEONARDO_CALL);

    // Deuxième appel (pour l'anecdote)
    const secondTimer = setTimeout(() => {
      fetchLeonardoData({
        lng: languageSignal.value,
        page: pageName,
        subpage: subpageSlug,
        pagectx: ctx,
        fact: "true",
      }, controller.signal);
    }, DELAY_LEONARDO_CALL + DELAY_LEONARDO_FACT_TRIGGER);

    // Nettoyer les délais et annuler les requêtes lorsque les dépendances changent ou le composant est démonté
    return () => {
      clearTimeout(firstTimer);
      clearTimeout(secondTimer);
      controller.abort();
    };
  }, [
    props.url,
    leonardoActiveContent,
    nationalitySlugSignal.value,
    artistsYearsSignal.value,
    histocharactersYearsSignal.value,
  ]);


  // Visibilité Leonardo
  function handleUrartsClick(
    event: TargetedMouseEvent<HTMLButtonElement>,
  ) {
    const ref = event.currentTarget as TippyButtonElement;
    const instance = ref._tippy;
    const isVisible = instance.state.isVisible;

    if (isVisible) {
      skipNextLeonardoAnimation("#leonardoContent"); // éviter flicker lors de la fermeture
      instance.hide();
      localStorage.setItem("leonardo", "inactive");
      setLeonardoActiveContent(false);
    } else {
      setLeonardoActiveContent(true);
      localStorage.setItem("leonardo", "active");
      setTimeout(() => {
        instance.show();
      }, DELAY_LEONARDO_CALL);
    }
  }


  // Infobulles
  useEffect(() => {
    const ids = [
      ["#desktopHistoAnchor", i18next.t("nav.histocharacters", { ns: "translation" })],
      ["#desktopWomanAnchor", i18next.t("nav.women", { ns: "translation" })],
      ["#desktopHeartAnchor", i18next.t("nav.mimi", { ns: "translation" })],
      ["#desktopStatAnchor", i18next.t("nav.indicators", { ns: "translation" })],
      ["#desktopApiAnchor", i18next.t("nav.api", { ns: "translation" })],
      ["#desktopInterrogationAnchor", i18next.t("nav.about", { ns: "translation" })],
    ] as const;

    const instances: Any[] = [];

    ids.forEach(([selector, label]) => {
      const el = document.querySelector<HTMLElement>(selector);
      if (!el) return;

      const instance = tippy(el, {
        allowHTML: true,
        content: `<p class="text-[1rem]">${label}</p>`,
        interactive: false,
        placement: "bottom",
        theme: "urarts",
      });

      instances.push(instance);
    });

    return () => {
      instances.forEach((instance) => instance.destroy());
    };
  }, []);


  // Menu mobile & thème
  useLayoutEffect(() => {
    const delay = 120;
    const anchor = document.querySelectorAll<HTMLElement>("#mobile-anchor");
    const btn = document.querySelector<HTMLElement>("button.mobile-menu-button");
    const menu = document.querySelector<HTMLElement>(".mobile-menu");
    const nav = document.querySelector<HTMLElement>("nav");
    const navTheme = localStorage.getItem(NAV_THEME_KEY);

    // Appliquer le thème à la 1ère génération de la page
    if (navTheme === SECONDARY_NAV_THEME) {
      nav?.classList.remove(DEFAULT_NAV_THEME);
      nav?.classList.add(SECONDARY_NAV_THEME);
    } else {
      nav?.classList.remove(SECONDARY_NAV_THEME);
      nav?.classList.add(DEFAULT_NAV_THEME);
      localStorage.setItem(NAV_THEME_KEY, DEFAULT_NAV_THEME);
    }

    // Boutons
    anchor.forEach(function (a) {
      a.addEventListener("click", function () {
        setTimeout(() => {
          menu?.classList.toggle("hidden");
        }, delay);
      });
    });
    btn?.addEventListener("click", () => {
      setTimeout(() => {
        menu?.classList.toggle("hidden");
      }, delay);
    });
  }, []);


  // Langue
  (globalThis as Any).handleLanguage = function (lng: Language) {
    if (languageSignal.value !== lng) {
      i18next.changeLanguage(lng);
      languageSignal.value = lng;
      setTimeout(() => {
        globalThis.location.reload();
      }, 100);
    }
  };


  return (
    <nav
      id="Urarts-Nav"
      class="
        flex flex-wrap text-white z-50 shadow-lg
        nav-theme [body[data-nav-theme='header-paper']_&]:header-paper [body[data-nav-theme='wave-colors']_&]:wave-colors
        [text-shadow:2px_4px_3px_rgba(0,0,0,0.3)]
     "
    >
      <div class={`max-w-7xl w-full mx-auto px-4 z-[60]`}>
        <div class={`flex justify-between`}>
          <div class={`flex space-x-7`}>
            <div class={`py-3 px-2 shrink-0 select-none`}>
              <button
                id="U-Icon"
                type="button"
                onClick={handleUrartsClick}
                class={`relative z-[60] flex items-center`}
                draggable={draggable}
                aria-label="Leonardo"
              >
                <img
                  class={`block h-10 w-10`}
                  src="/icon_urarts.svg"
                  alt="U"
                  draggable={draggable}
                />
              </button>
            </div>
            <div class={`hidden md:flex items-center space-x-4 select-none`}>
              <a
                href="/"
                id="home"
                class={desktopPrimaryAnchor}
                draggable={draggable}
                aria-label={`${i18next.t("nav.home", { ns: "translation" })}`}
              >
                {i18next.t("nav.home", { ns: "translation" })}
              </a>
              <a
                href="/artists"
                class={desktopPrimaryAnchor}
                draggable={draggable}
                aria-label={`${i18next.t("nav.artists", { ns: "translation" })}`}
              >
                {i18next.t("nav.artists", { ns: "translation" })}
              </a>
              <a
                href="/arts"
                class={desktopPrimaryAnchor}
                draggable={draggable}
                aria-label={`${i18next.t("nav.arts", { ns: "translation" })}`}
              >
                {i18next.t("nav.arts", { ns: "translation" })}
              </a>
              <a
                href="/movements"
                class={desktopPrimaryAnchor}
                draggable={draggable}
                aria-label={`${i18next.t("nav.movements", { ns: "translation" })}`}
              >
                {i18next.t("nav.movements", { ns: "translation" })}
              </a>
              <a
                href="/talents"
                class={desktopPrimaryAnchor}
                draggable={draggable}
                aria-label={`${i18next.t("nav.talents", { ns: "translation" })}`}
              >
                {i18next.t("nav.talents", { ns: "translation" })}
              </a>
            </div>
          </div>
          <div class={`hidden md:flex items-center`}>
            <a
              href="/histocharacters"
              id="desktopHistoAnchor"
              class={desktopHistoAnchor}
              draggable={draggable}
              aria-label={`${i18next.t("nav.histocharacters", { ns: "translation" })}`}
            >
              <span class="inline-flex items-center justify-center translate-y-[1px]">
                <HistoIcon aria-hidden="true" />
              </span>
            </a>
            <a
              href="/women"
              id="desktopWomanAnchor"
              class={desktopWomanAnchor}
              draggable={draggable}
              aria-label={`${i18next.t("nav.women", { ns: "translation" })}`}
            >
              <span class="inline-flex items-center justify-center">
                <WomanIcon aria-hidden="true" />
              </span>
            </a>
            <a
              href="/art/mimi"
              id="desktopHeartAnchor"
              class={desktopHeartAnchor}
              draggable={draggable}
              aria-label={`${i18next.t("nav.mimi", { ns: "translation" })}`}
            >
              <span class="inline-flex items-center justify-center">
                <HeartIcon aria-hidden="true" />
              </span>
            </a>
            <a
              href="/indicators"
              id="desktopStatAnchor"
              class={desktopStatAnchor}
              draggable={draggable}
              aria-label={`${i18next.t("nav.indicators", { ns: "translation" })}`}
            >
              <span class="inline-flex items-center justify-center">
                <StatIcon aria-hidden="true" />
              </span>
            </a>
            <a
              href="/api/arts"
              f-client-nav={false}
              id="desktopApiAnchor"
              target="_blank"
              rel="noopener"
              class={desktopApiAnchor}
              draggable={draggable}
              aria-label={`${i18next.t("nav.api", { ns: "translation" })}`}
            >
              <span class="inline-flex items-center justify-center translate-y-[1px]">
                <ApiIcon aria-hidden="true" />
              </span>
            </a>
            <a
              href="/about"
              id="desktopInterrogationAnchor"
              class={desktopInterrogationAnchor}
              draggable={draggable}
              aria-label={`${i18next.t("nav.about", { ns: "translation" })}`}
            >
              <span class="inline-flex items-center justify-center">
                <InterrogationIcon aria-hidden="true" />
              </span>
            </a>
          </div>
          <div class={`md:hidden flex items-center`}>
            <button
              class={`mobile-menu-button z-[60] text-white hover:text-lighterdark focus:outline-none`}
            >
              <ButtonLines aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <div class={`mobile-menu hidden w-full z-[60]`}>
        <ul>
          <li>
            <a
              href="/"
              id="mobile-anchor"
              class={mobilePrimaryAnchor}
              aria-label={`${i18next.t("nav.home", { ns: "translation" })}`}
            >
              <span class={`px-2`}>
                {i18next.t("nav.home", { ns: "translation" })}
              </span>
            </a>
          </li>
          <li>
            <a
              href="/artists"
              id="mobile-anchor"
              class={mobilePrimaryAnchor}
              aria-label={`${i18next.t("nav.artists", { ns: "translation" })}`}
            >
              <span class={`px-2`}>
                {i18next.t("nav.artists", { ns: "translation" })}
              </span>
            </a>
          </li>
          <li>
            <a
              href="/arts"
              id="mobile-anchor"
              class={mobilePrimaryAnchor}
              aria-label={`${i18next.t("nav.arts", { ns: "translation" })}`}
            >
              <span class={`px-2`}>
                {i18next.t("nav.arts", { ns: "translation" })}
              </span>
            </a>
          </li>
          <li>
            <a
              href="/movements"
              id="mobile-anchor"
              class={mobilePrimaryAnchor}
              aria-label={`${i18next.t("nav.movements", { ns: "translation" })}`}
            >
              <span class={`px-2`}>
                {i18next.t("nav.movements", { ns: "translation" })}
              </span>
            </a>
          </li>
          <li>
            <a
              href="/talents"
              id="mobile-anchor"
              class={mobilePrimaryAnchor}
              aria-label={`${i18next.t("nav.talents", { ns: "translation" })}`}
            >
              <span class={`px-2`}>
                {i18next.t("nav.talents", { ns: "translation" })}
              </span>
            </a>
          </li>
          <li class={`flex`}>
            <div class={`w-[50px]`}>
              <a
                href="/histocharacters"
                id="mobile-anchor"
                class={mobileSecondaryAnchor}
                aria-label={`${i18next.t("nav.histocharacters", { ns: "translation" })}`}
              >
                <HistoIcon aria-hidden="true" />
              </a>
            </div>
            <div class={`w-[50px]`}>
              <a
                href="/women"
                id="mobile-anchor"
                class={mobileSecondaryAnchor}
                aria-label={`${i18next.t("nav.women", { ns: "translation" })}`}
              >
                <WomanIcon aria-hidden="true" />
              </a>
            </div>
            <div class={`w-[50px]`}>
              <a
                href="/art/mimi"
                id="mobile-anchor"
                class={mobileSecondaryAnchor}
                aria-label={`${i18next.t("nav.mimi", { ns: "translation" })}`}
              >
                <HeartIcon aria-hidden="true" />
              </a>
            </div>
            <div class={`w-[50px]`}>
              <a
                href="/indicators"
                id="mobile-anchor"
                class={mobileSecondaryAnchor}
                aria-label={`${i18next.t("nav.indicators", { ns: "translation" })}`}
              >
                <StatIcon aria-hidden="true" />
              </a>
            </div>
            <div class={`hidden w-[50px]`}>
              <a
                href="/api/arts"
                f-client-nav={false}
                target="_blank"
                rel="noopener"
                class={mobileSecondaryAnchor}
                aria-label={`${i18next.t("nav.api", { ns: "translation" })}`}
              >
                <ApiIcon aria-hidden="true" />
              </a>
            </div>
            <div class={`w-[50px]`}>
              <a
                href="/about"
                id="mobile-anchor"
                class={mobileSecondaryAnchor}
                aria-label={`${i18next.t("nav.about", { ns: "translation" })}`}
              >
                <InterrogationIcon aria-hidden="true" />
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
