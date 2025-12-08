import { Any } from "any";
import { artistsYearsSignal, histocharactersYearsSignal, languageSignal, nationalitySignal } from "@utils/signals.ts";
import { css } from "@twind/core";
import {
  DEFAULT_NAV_THEME,
  DELAY_LEONARDO_CALL,
  DELAY_LEONARDO_FACT_TRIGGER,
  DELAY_LEONARDO_FIRST_CALL,
  NAV_THEME_KEY,
  SECONDARY_NAV_THEME,
} from "@utils/constants.ts";
import { h } from "preact";
import i18next from "i18next";
import "@utils/i18n/config.ts";
import ky from "ky";
import { Language } from "@utils/i18n/i18next.d.ts";
import tippy from "tippyjs";
import { UrlBasePath } from "@/env.ts";
import { useEffect, useLayoutEffect, useState } from "preact/hooks";

import { ApiIcon, ButtonLines, HeartIcon, HistoIcon, InterrogationIcon, StatIcon, WomanIcon } from "@components/Assets.tsx";

export interface Props {
  readonly url: URL;
}

export default function Nav(props: Props) {
  // CSS
  const draggable = false;
  const desktopCurrent = "data-[current]:text-lighterdark data-[current]:border-b-4 data-[current]:border-lighterdark";
  const desktopHover = "hover:text-lighterdark transition duration-300";
  const desktopPrimaryAnchor = `py-4 px-2 text-lg font-medium ${desktopHover} ${desktopCurrent}`;
  const desktopHistoAnchor = `py-3 -mr-1 ${desktopHover} ${desktopCurrent}`;
  const desktopWomanAnchor = `py-3 ${desktopHover} ${desktopCurrent}`;
  const desktopHeartAnchor = `py-4 mt-1 ${desktopHover} ${desktopCurrent}`;
  const desktopStatAnchor = desktopHeartAnchor;
  const desktopApiAnchor = desktopStatAnchor;
  const desktopInterrogationAnchor = `py-4 ${desktopHover} ${desktopCurrent}`;
  const mobileCurrent = "data-[current]:active data-[current]:text-white data-[current]:bg-lighterdark data-[current]:font-semibold";
  const mobileHover = "hover:bg-lighterdark transition duration-300";
  const mobilePrimaryAnchor = `h-[60px] flex flex-col justify-center text-lg ${mobileHover} ${mobileCurrent}`;
  const mobileSecondaryAnchor = `h-[60px] flex flex-col items-center justify-center px-1 py-3 text-lg ${mobileHover} ${mobileCurrent}`;


  // Leonardo
  const [leonardoActiveContent, setLeonardoActiveContent] = useState<boolean>();
  const leonardoStatus = localStorage.getItem('leonardo');

  // Activation/désactivation de Leonardo
  useEffect(() => {
    const ref = document.querySelector<HTMLAnchorElement>("#U-Icon");
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
        <div class="absolute top-[-0.6rem] left-[-2.0rem]"><div class="eye left-eye"><div class="eyeshut"><span></span></div><div class="eyeball left-eyeball"></div></div></div>
        <div class="absolute top-[-0.57rem] left-[-0.60rem]"><div class="eye right-eye"><div class="eyeshut"><span></span></div><div class="eyeball right-eyeball"></div></div></div>
        <div id="leonardoContent" class="flex-col pl-16 pb-1 text-xl leading-5 select-none">...</div>`,
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
        const eyes = Array.from(tooltipEl.querySelectorAll<HTMLElement>(".eye"));
        const maxShutDelay = 7000;
        const minShutDelay = 1000;

        // événements hover & click sur chaque œil
        eyes.forEach((eye) => {
          const eyeshut = eye.querySelector<HTMLElement>(".eyeshut span");
          if (!eyeshut) return;
          eye.addEventListener("mouseover", () => eyeshut.style.height = "100%");
          eye.addEventListener("mouseout",  () => eyeshut.style.height = "0%");
          eye.addEventListener("click",     () => {
            instance.hide();
            localStorage.setItem("leonardo", "inactive");
            setLeonardoActiveContent(false);
          });
        });

        // animation de clignement aléatoire
        function animateEyeShut() {
          const delay = Math.random() * (maxShutDelay - minShutDelay) + minShutDelay;
          eyes.forEach((eye) => {
            const eyeshut = eye.querySelector<HTMLElement>(".eyeshut span");
            if (!eyeshut) return;
            setTimeout(() => {
              eyeshut.style.height = "100%";
              setTimeout(() => { eyeshut.style.height = "0%"; }, 200);
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
            const cx = rect.left + rect.width  / 2;
            const cy = rect.top  + rect.height / 2;
            // delta vers le pointeur
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            // décalage horizontal
            const x = Math.max(-strengthX, Math.min(strengthX, dx / (globalThis.innerWidth  / 2) * strengthX));
            // décalage vertical, avec limite adaptée selon la direction
            const yRaw = dy / (globalThis.innerHeight / 2);
            let y: number;
            if (yRaw < 0) {
              y = Math.max(-strengthYUp, Math.min(0, yRaw * strengthYUp));
            } else {
              y = Math.max(0, Math.min(strengthYDown, yRaw * strengthYDown));
            }
            // centrage de base + offset
            eyeball.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
          });
        };
        document.addEventListener("mousemove", mousemoveHandler);
      },

      // à chaque fermeture
      onHide() {
        clearInterval(shutInterval);
        document.removeEventListener("mousemove", mousemoveHandler);
      }
    });

    // retarde l'apparition au chargement de la page
    const firstShowTimer = setTimeout(() => {
      if (localStorage.getItem('leonardo') !== 'inactive') {
        leonardoTooltip.show();
        setLeonardoActiveContent(true);
      }
    }, DELAY_LEONARDO_FIRST_CALL);

    if (leonardoStatus === 'inactive') { leonardoTooltip.hide(); }

    return () => {
      clearTimeout(firstShowTimer);
    };
  }, []);


  // Appel à l'API "Leonardo"
  const fetchLeonardoData = async (params: Record<string, Any>, signal: AbortSignal) => {
    const leonardoContent = document.querySelector("#leonardoContent") as HTMLElement | null;
    if (!leonardoContent) return;

    try {
      const response = await ky.get(`${UrlBasePath}/api/leonardo`, {
        searchParams: params,
        signal,
      });
      const leonardoResponse = await response.text();
  
      // Contenu
      if (leonardoContent && leonardoResponse !== "no_change") {
        // Nettoyage des images déjà présentes
        const images = leonardoContent.querySelectorAll("img");
        images.forEach((img) => img.remove());

        leonardoContent.innerHTML = leonardoResponse;
      }
    
    } catch (error: Any) {
      if (error.name !== 'AbortError' && leonardoContent)  leonardoContent.innerHTML = i18next.t("leonardo.error", { ns: "translation" });
      if (leonardoContent)  leonardoContent.textContent  = '...';
    }
  };


  useEffect(() => {
    if (leonardoActiveContent === false || leonardoStatus === 'inactive') return;
    
    // Paramètres pour la requête
    const url = new URL(props.url);
    const pageName = url.pathname.split("/")[1];
    const subpageSlug = url.pathname.split("/")[2];

    const ctxArray = (pageName !== "artists" && pageName !== "histocharacters" && url.searchParams.has("id"))
      ? [url.searchParams.get("id"), url.searchParams.has("alone") ? "alone" : ""]
      : (pageName === "artists") 
        ? [artistsYearsSignal.value[0], artistsYearsSignal.value[1], nationalitySignal.value] 
        : (pageName === "histocharacters") 
          ? [histocharactersYearsSignal.value[0], histocharactersYearsSignal.value[1], nationalitySignal.value] 
          : []; 
    
    const ctx = JSON.stringify(ctxArray.join("_"));
    
    // Gérer l'annulation des requêtes
    const controller = new AbortController();
  
    // Appel initial
    const firstTimer = setTimeout(() => {
      fetchLeonardoData({
        lng: languageSignal.value,
        welcome: url.searchParams.get("fresh-partial") !== "true" ? "true" : "false",
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

  }, [props.url, leonardoActiveContent, nationalitySignal.value, artistsYearsSignal.value, histocharactersYearsSignal.value]);
  

  // Visibilité Leonardo
  function handleUrartsClick(event: h.JSX.TargetedMouseEvent<HTMLAnchorElement>) {
    const ref = event.currentTarget as HTMLAnchorElement;
    const instance = ref._tippy;
    const isVisible = instance.state.isVisible;
    
    if (isVisible) {
      instance.hide();
      localStorage.setItem('leonardo', 'inactive');
      setLeonardoActiveContent(false);
    } else {
      setLeonardoActiveContent(true);
      localStorage.setItem('leonardo', 'active');
      setTimeout(() => {
        instance.show();
    }, DELAY_LEONARDO_CALL);
    }
  }


  // Infobulles
  useEffect(() => {
    const desktopHistoAnchor = document.querySelector<HTMLElement>("#desktopHistoAnchor");
    const desktopWomanAnchor = document.querySelector<HTMLElement>("#desktopWomanAnchor");
    const desktopHeartAnchor = document.querySelector<HTMLElement>("#desktopHeartAnchor");
    const desktopStatAnchor = document.querySelector<HTMLElement>("#desktopStatAnchor");
    const desktopApiAnchor = document.querySelector<HTMLElement>("#desktopApiAnchor");
    const desktopInterrogationAnchor = document.querySelector<HTMLElement>("#desktopInterrogationAnchor");

    if (desktopHistoAnchor) {
      tippy(desktopHistoAnchor, {
        allowHTML: true,
        content: `<p class="text-[1rem]">${i18next.t("nav.histocharacters", { ns: "translation" })}</p>`,
        interactive: true,
        placement: "bottom",
        theme: "urarts",
      });
    }
    if (desktopWomanAnchor) {
      tippy(desktopWomanAnchor, {
        allowHTML: true,
        content: `<p class="text-[1rem]">${i18next.t("nav.women", { ns: "translation" })}</p>`,
        interactive: true,
        placement: "bottom",
        theme: "urarts",
      });
    }
    if (desktopHeartAnchor) {
      tippy(desktopHeartAnchor, {
        allowHTML: true,
        content: `<p class="text-[1rem]">${i18next.t("nav.mimi", { ns: "translation" })}</p>`,
        interactive: true,
        placement: "bottom",
        theme: "urarts",
      });
    }
    if (desktopStatAnchor) {
      tippy(desktopStatAnchor, {
        allowHTML: true,
        content: `<p class="text-[1rem]">${i18next.t("nav.indicators", { ns: "translation" })}</p>`,
        interactive: true,
        placement: "bottom",
        theme: "urarts",
      });
    }
    if (desktopApiAnchor) {
      tippy(desktopApiAnchor, {
        allowHTML: true,
        content: `<p class="text-[1rem]">${i18next.t("nav.api", { ns: "translation" })}</p>`,
        interactive: true,
        placement: "bottom",
        theme: "urarts",
      });
    }
    if (desktopInterrogationAnchor) {
      tippy(desktopInterrogationAnchor, {
        allowHTML: true,
        content: `<p class="text-[1rem]">${i18next.t("nav.about", { ns: "translation" })}</p>`,
        interactive: true,
        placement: "bottom",
        theme: "urarts",
      });
    }
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
  (globalThis as Any).handleLanguage = function(lng: Language) {
    if (languageSignal.value !== lng) {
      i18next.changeLanguage(lng);
      languageSignal.value = lng;
      setTimeout(() => { globalThis.location.reload(); }, 100);
    }
  }


  return (
    <nav
      id="Urarts-Nav"
      class={`
        flex flex-wrap text-white z-50 shadow-lg
        nav-theme [body[data-nav-theme='header-paper']_&]:header-paper [body[data-nav-theme='wave-colors']_&]:wave-colors
        ${css({"text-shadow": "2px 4px 3px rgba(0,0,0,0.3)"})}
      `}
    >
      <div class={`max-w-7xl w-full mx-auto px-4 z-[60]`}>
        <div class={`flex justify-between`}>
          <div class={`flex space-x-7`}>
            <div class={`py-3 px-2 select-none`}>
              <a
                id="U-Icon"
                onClick={handleUrartsClick}
                class={`relative z-[60] flex items-center`}
                draggable={draggable}
              >
                <img
                  class={`block h-10 w-10`}
                  src="/icon_urarts.svg"
                  alt="U"
                  draggable={draggable}
                />
              </a>
            </div>
            <div class={`hidden md:flex items-center space-x-4 select-none`}>
              <a
                href="/"
                class={desktopPrimaryAnchor}
                draggable={draggable}
              >
                {i18next.t("nav.home", { ns: "translation" })}
              </a>
              <a
                href="/artists"
                class={desktopPrimaryAnchor}
                draggable={draggable}
              >
                {i18next.t("nav.artists", { ns: "translation" })}
              </a>
              <a
                href="/arts"
                class={desktopPrimaryAnchor}
                draggable={draggable}
              >
                {i18next.t("nav.arts", { ns: "translation" })}
              </a>
              <a
                href="/movements"
                class={desktopPrimaryAnchor}
                draggable={draggable}
              >
                {i18next.t("nav.movements", { ns: "translation" })}
              </a>
              <a
                href="/talents"
                class={desktopPrimaryAnchor}
                draggable={draggable}
              >
                {i18next.t("nav.talents", { ns: "translation" })}
              </a>
            </div>
          </div>
          <div class={`hidden md:flex items-center space-x-3`}>
            <a
              href="/histocharacters"
              id="desktopHistoAnchor"
              class={desktopHistoAnchor}
              draggable={draggable}
              aria-label={`${i18next.t("nav.histocharacters", { ns: "translation" })}`}
            >
              <HistoIcon aria-hidden="true" />
            </a>
            <a
              href="/women"
              id="desktopWomanAnchor"
              class={desktopWomanAnchor}
              draggable={draggable}
              aria-label={`${i18next.t("nav.women", { ns: "translation" })}`}
            >
              <WomanIcon aria-hidden="true" />
            </a>
            <a
              href="/art/mimi"
              id="desktopHeartAnchor"
              class={desktopHeartAnchor}
              draggable={draggable}
              aria-label={`${i18next.t("nav.mimi", { ns: "translation" })}`}
            >
              <HeartIcon aria-hidden="true" />
            </a>
            <a
              href="/indicators"
              id="desktopStatAnchor"
              class={desktopStatAnchor}
              draggable={draggable}
              aria-label={`${i18next.t("nav.indicators", { ns: "translation" })}`}
            >
              <StatIcon aria-hidden="true" />
            </a>
            <a
              href="/api/arts" f-client-nav={false}
              id="desktopApiAnchor"
              target="_blank"
              rel="noopener"
              class={desktopApiAnchor}
              draggable={draggable}
              aria-label={`${i18next.t("nav.api", { ns: "translation" })}`}
            >
              <ApiIcon aria-hidden="true" />
            </a>
            <a
              href="/about"
              id="desktopInterrogationAnchor"
              class={desktopInterrogationAnchor}
              draggable={draggable}
              aria-label={`${i18next.t("nav.about", { ns: "translation" })}`}
            >
              <InterrogationIcon aria-hidden="true" />
            </a>
          </div>
          <div class={`md:hidden flex items-center`}>
            <button class={`mobile-menu-button z-[60] text-white hover:text-lighterdark focus:outline-none`}>
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
            >
              <span class={`px-2`}>{i18next.t("nav.home", { ns: "translation" })}</span>
            </a>
          </li>
          <li>
            <a
              href="/artists"
              id="mobile-anchor"
              class={mobilePrimaryAnchor}
            >
              <span class={`px-2`}>{i18next.t("nav.artists", { ns: "translation" })}</span>
            </a>
          </li>
          <li>
            <a
              href="/arts"
              id="mobile-anchor"
              class={mobilePrimaryAnchor}
            >
              <span class={`px-2`}>{i18next.t("nav.arts", { ns: "translation" })}</span>
            </a>
          </li>
          <li>
            <a
              href="/movements"
              id="mobile-anchor"
              class={mobilePrimaryAnchor}
            >
              <span class={`px-2`}>{i18next.t("nav.movements", { ns: "translation" })}</span>
            </a>
          </li>
          <li>
            <a
              href="/talents"
              id="mobile-anchor"
              class={mobilePrimaryAnchor}
            >
              <span class={`px-2`}>{i18next.t("nav.talents", { ns: "translation" })}</span>
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
            <div class={`w-[50px]`}>
              <a
                href="/api/arts" f-client-nav={false}
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
