import { Any } from "any";
import { artistsYearsSignal, histocharactersYearsSignal, languageSignal, nationalitySignal } from "@utils/signals.ts";
import { css } from "@twind/core";
import { DELAY_LEONARDO_CALL, DELAY_LEONARDO_FACT_TRIGGER } from "@utils/constants.ts";
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
  useEffect(() => {
    const ref = document.querySelector<HTMLAnchorElement>("#U-Icon");

    if (ref) {
      const leonardoTooltip = tippy(ref, {
        allowHTML: true,
        appendTo: () => document.body,
        arrow: false,
        duration: [600, 300],
        content:
          `<img id="leonardoAvatar" class="absolute top-[-0.5rem] left-[-2rem] max-w-[95px] min-w-[95px]" src="/leonardo.png" alt="Leonardo" loading="lazy" draggable=${draggable}/>
          <div class="absolute top-[-0.6rem] left-[-1.4rem]"><div class="eye left-eye"><div class="eyeshut"><span></span></div><div class="eyeball left-eyeball"></div></div></div>
          <div class="absolute top-[-0.62rem] left-[-0.38rem]"><div class="eye right-eye"><div class="eyeshut"><span></span></div><div class="eyeball right-eyeball"></div></div></div>
          <div id="leonardoContent" class="flex-col pl-16 pb-1 text-xl leading-5 select-none">...</div>`,
        hideOnClick: "false",
        interactive: true,
        maxWidth: 900,
        offset: [-220, 12],
        placement: "bottom-start",
        role: "leonardo",
        theme: "leonardo",
        trigger: "manual",
      });

      leonardoTooltip.show();

      // Yeux Leonardo
      const eyes = document.querySelectorAll<HTMLElement>(".eye");
      const maxShutDelay = 7000;
      const minShutDelay = 1000;

      eyes.forEach((eye) => {
        const eyeshut = eye.querySelector<HTMLElement>(".eyeshut span");
        if (eyeshut) {
          eye.addEventListener("mouseover", () => {
            eyeshut.style.height = "100%";
          });
          eye.addEventListener("mouseout", () => {
            eyeshut.style.height = "0%";
          });
        }
      });

      function animateEyeShut() {
        const randomDelay = Math.floor(Math.random() * (maxShutDelay - minShutDelay + 1)) + minShutDelay;
        eyes.forEach((eye) => {
          const eyeshut = eye.querySelector<HTMLElement>(".eyeshut span");
          if (eyeshut) {
            const delayedFunction = () => {
              eyeshut.style.height = "100%";
              setTimeout(() => { eyeshut.style.height = "0%"; }, 200);
            };
            setTimeout(delayedFunction, randomDelay);
          }
        });
      }
      animateEyeShut();
      setInterval(() => { animateEyeShut(); }, maxShutDelay);

      eyes.forEach((eye) => {
        eye.onclick = () => {
          leonardoTooltip.hide();
          localStorage.setItem('leonardo', 'inactive');
          setLeonardoActiveContent(false);
        };
      });

      const leftEyeball = document.querySelector<HTMLElement>(".left-eyeball");
      const rightEyeball = document.querySelector<HTMLElement>(".right-eyeball");
      document.onmousemove = (event: MouseEvent) => {
        if (leftEyeball) {
          const x = Math.max(50, (event.clientX * 100) / window.innerWidth) + "%";
          const y = Math.max(5, (event.clientY * 100) / window.innerHeight) + "%";
          //console.log("leftEyeball : " + x, y);
          leftEyeball.style.left = x;
          leftEyeball.style.top = y;
        }
        if (rightEyeball) {
          const x = Math.max(50, (event.clientX * 100) / window.innerWidth) + "%";
          const y = Math.min(80, Math.max(20, (event.clientY * 100) / window.innerHeight)) + "%";
          //console.log("rightEyeball : " + x, y);
          rightEyeball.style.left = x;
          rightEyeball.style.top = y;
        }
      };

      if (leonardoStatus === 'inactive') { leonardoTooltip.hide(); }
    }
  }, []);


  // Appel à l'API "Leonardo"
  const fetchLeonardoData = async (params: Record<string, Any>, signal: AbortSignal) => {
    const leonardoContent = document.querySelector("#leonardoContent");
  
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
    
    } catch (error) {
      if (error.name !== 'AbortError' && leonardoContent)  leonardoContent.innerHTML = i18next.t("leonardo.error", { ns: "translation" });
      if (leonardoContent)  leonardoContent.innerHTML = '...';
    }
  };


  useEffect(() => {
    if (leonardoActiveContent === false || leonardoStatus === 'inactive') return;
    
    // Paramètres pour la requête
    const url = new URL(props.url);
    const pageName = url.pathname.split("/")[1];
    const subpageSlug = url.pathname.split("/")[2];
    const ctxArray = url.searchParams.get("id")
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
    const navTheme = localStorage.getItem("_x_navTheme");

    // Appliquer le thème à la 1ère génération de la page
    if (navTheme === '"wave-colors"') {
      nav?.classList.remove("header-paper");
      nav?.classList.add("wave-colors");
    } else {
      nav?.classList.remove("wave-colors");
      nav?.classList.add("header-paper");
      localStorage.setItem('_x_navTheme', '"header-paper"');
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
      x-bind:class="{ 'header-paper': navTheme === 'header-paper', 'wave-colors': navTheme === 'wave-colors' }"
      class={`flex flex-wrap text-white z-50 shadow-lg ${css({"text-shadow": "2px 4px 3px rgba(0,0,0,0.3)"})}`}
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
            >
              <HistoIcon />
            </a>
            <a
              href="/women"
              id="desktopWomanAnchor"
              class={desktopWomanAnchor}
              draggable={draggable}
            >
              <WomanIcon />
            </a>
            <a
              href="/art/mimi" f-client-nav={false}
              id="desktopHeartAnchor"
              class={desktopHeartAnchor}
              draggable={draggable}
            >
              <HeartIcon />
            </a>
            <a
              href="/indicators"
              id="desktopStatAnchor"
              class={desktopStatAnchor}
              draggable={draggable}
            >
              <StatIcon />
            </a>
            <a
              href="/api/arts" f-client-nav={false}
              id="desktopApiAnchor"
              target="_blank"
              rel="noopener"
              class={desktopApiAnchor}
              draggable={draggable}
            >
              <ApiIcon />
            </a>
            <a
              href="/about"
              id="desktopInterrogationAnchor"
              class={desktopInterrogationAnchor}
              draggable={draggable}
            >
              <InterrogationIcon />
            </a>
          </div>
          <div class={`md:hidden flex items-center`}>
            <button class={`mobile-menu-button z-[60] text-white hover:text-lighterdark focus:outline-none`}>
              <ButtonLines />
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
              >
                <HistoIcon />
              </a>
            </div>
            <div class={`w-[50px]`}>
              <a
                href="/women"
                id="mobile-anchor"
                class={mobileSecondaryAnchor}
              >
                <WomanIcon />
              </a>
            </div>
            <div class={`w-[50px]`}>
              <a
                href="/art/mimi" f-client-nav={false}
                id="mobile-anchor"
                class={mobileSecondaryAnchor}
              >
                <HeartIcon />
              </a>
            </div>
            <div class={`w-[50px]`}>
              <a
                href="/indicators"
                id="mobile-anchor"
                class={mobileSecondaryAnchor}
              >
                <StatIcon />
              </a>
            </div>
            <div class={`w-[50px]`}>
              <a
                href="/api/arts" f-client-nav={false}
                target="_blank"
                rel="noopener"
                class={mobileSecondaryAnchor}
              >
                <ApiIcon />
              </a>
            </div>
            <div class={`w-[50px]`}>
              <a
                href="/about"
                id="mobile-anchor"
                class={mobileSecondaryAnchor}
              >
                <InterrogationIcon />
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
