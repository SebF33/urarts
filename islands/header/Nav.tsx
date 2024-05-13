import { css } from "@twind/core";
import { DELAY_LEONARDO_CALL, DELAY_REACH_HREF } from "@utils/constants.ts";
import { h } from "preact";
import ky from "ky";
import { nationalitySignal, yearsSignal } from "../../utils/signals.ts";
import tippy from "tippyjs";
import { UrlBasePath } from "../../env.ts";
import { useEffect, useLayoutEffect, useState } from "preact/hooks";

import { ApiIcon, ButtonLines, HeartIcon, HistoIcon, InterrogationIcon, StatIcon, WomanIcon } from "@components/Assets.tsx";

export interface Props {
  url: URL;
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
    const ref = document.querySelector<HTMLElement>("#Icon");

    if (ref) {
      const leonardoTooltip = tippy(ref, {
        allowHTML: true,
        appendTo: () => document.body,
        arrow: false,
        duration: [1800, 300],
        content:
          `<img loading="lazy" class="absolute top-[-0.5rem] left-[-2rem] max-w-[95px] min-w-[95px]" src="/leonardo.png" alt="Leonardo" draggable=${draggable}/>
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

  // Appel à l'API Leonardo
  useEffect(() => {
    if (leonardoActiveContent === false || leonardoStatus === 'inactive') return;

    //console.log("url : " + props.url);
    const url = new URL(props.url);
    
    setTimeout(() => {
      // Paramètre 1
      let isWelcome = "false";
      const isPartial = url.searchParams.get("fresh-partial") || "";
      if (isPartial !== "true") isWelcome = "true";

      // Paramètre 2
      const pageName = url.pathname.split("/")[1];
      if ((pageName === "artists" || pageName === "histocharacters") && yearsSignal.value.length < 1) return;

      // Paramètre 3
      const subpageSlug = url.pathname.split("/")[2];

      // Paramètre 4
      let ctxArray:string[] = [];
      const idArtwork = url.searchParams.get("id") || false;
      if (idArtwork && pageName !== "histocharacters") {
        let alone;
        const isAlone = url.searchParams.has("alone");
        isAlone ? alone = "alone" : alone = "";
        ctxArray = [idArtwork, alone];
      }
      if (pageName === "artists" || pageName === "histocharacters") {
        const years = yearsSignal.value.toString().split(",", 2);
        ctxArray = [years[0], years[1], nationalitySignal.value];
      }
      const ctx = JSON.stringify(ctxArray.join("_"));

      // Paramètres
      const params = {
        welcome: isWelcome,
        page: pageName,
        subpage: subpageSlug,
        pagectx: ctx,
      };

      const queryString = new URLSearchParams(params).toString();
      //console.log(queryString);

      const fetchData = async () => {
        try {
          const response = await ky.get(`${UrlBasePath}/api/leonardo?${queryString}`);
          const leonardoResponse = await response.text();

          // Contenu
          const leonardoContent = document.querySelector("#leonardoContent");
          if (leonardoContent) {
            leonardoContent.innerHTML = leonardoResponse;
          }
        } catch (error) {
          console.error("Erreur de l'API Leonardo.", error);
          const leonardoContent = document.querySelector("#leonardoContent");
          if (leonardoContent) {
            leonardoContent.innerHTML = "Erreur de l'API Leonardo.";
          }
        }
      };
      fetchData();
    }, DELAY_LEONARDO_CALL);
  }, [props.url, leonardoActiveContent, nationalitySignal.value, yearsSignal.value]);

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
        content: '<p class="text-[1rem]">Les personnages historiques.</p>',
        interactive: true,
        placement: "bottom",
        theme: "urarts",
      });
    }
    if (desktopWomanAnchor) {
      tippy(desktopWomanAnchor, {
        allowHTML: true,
        content: '<p class="text-[1rem]">Les femmes artistes.</p>',
        interactive: true,
        placement: "bottom",
        theme: "urarts",
      });
    }
    if (desktopHeartAnchor) {
      tippy(desktopHeartAnchor, {
        allowHTML: true,
        content: '<p class="text-[1rem]">Un talent exceptionnel.</p>',
        interactive: true,
        placement: "bottom",
        theme: "urarts",
      });
    }
    if (desktopStatAnchor) {
      tippy(desktopStatAnchor, {
        allowHTML: true,
        content: '<p class="text-[1rem]">Les indicateurs pour Urarts.</p>',
        interactive: true,
        placement: "bottom",
        theme: "urarts",
      });
    }
    if (desktopApiAnchor) {
      tippy(desktopApiAnchor, {
        allowHTML: true,
        content: '<p class="text-[1rem]">Un échantillon de l’API.</p>',
        interactive: true,
        placement: "bottom",
        theme: "urarts",
      });
    }
    if (desktopInterrogationAnchor) {
      tippy(desktopInterrogationAnchor, {
        allowHTML: true,
        content: '<p class="text-[1rem]">À propos de Urarts...</p>',
        interactive: true,
        placement: "bottom",
        theme: "urarts",
      });
    }
  }, []);

  // Hooks menu mobile & thème
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

  function handleClick(event: h.JSX.TargetedMouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const href = (event.currentTarget as HTMLAnchorElement).href;
    setTimeout(() => {
      window.location.href = href;
    }, DELAY_REACH_HREF);
  }

  return (
    <nav
      x-bind:class="{ 'header-paper': navTheme === 'header-paper', 'wave-colors': navTheme === 'wave-colors' }"
      class={`flex flex-wrap text-white z-50 shadow-lg ${css({"text-shadow": "2px 4px 3px rgba(0,0,0,0.3)"})}`}
    >
      <div class={`max-w-7xl w-full mx-auto px-4 z-[60]`}>
        <div class={`flex justify-between`}>
          <div class={`flex space-x-7`}>
            <div class={`select-none`}>
              <a
                class={`relative z-[60] flex items-center py-3 px-2 cursor-zoom-in`}
                draggable={draggable}
              >
                <img
                  id="Icon"
                  onClick={handleUrartsClick}
                  class={`h-10 w-10`}
                  src="/icon_urarts.svg"
                  alt="Urarts"
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
                Accueil
              </a>
              <a
                href="/artists"
                class={desktopPrimaryAnchor}
                draggable={draggable}
              >
                Artistes
              </a>
              <a
                href="/arts"
                class={desktopPrimaryAnchor}
                draggable={draggable}
              >
                Œuvres
              </a>
              <a
                href="/movements"
                class={desktopPrimaryAnchor}
                draggable={draggable}
              >
                Mouvements
              </a>
              <a
                href="/talents"
                class={desktopPrimaryAnchor}
                draggable={draggable}
              >
                Talents
              </a>
            </div>
          </div>
          <div class={`hidden md:flex items-center space-x-3`}>
            <a
              href="/histocharacters"
              onClick={handleClick}
              id="desktopHistoAnchor"
              class={desktopHistoAnchor}
              draggable={draggable}
            >
              <HistoIcon />
            </a>
            <a
              href="/women"
              onClick={handleClick}
              id="desktopWomanAnchor"
              class={desktopWomanAnchor}
              draggable={draggable}
            >
              <WomanIcon />
            </a>
            <a
              href="/art/mimi"
              onClick={handleClick}
              id="desktopHeartAnchor"
              class={desktopHeartAnchor}
              draggable={draggable}
            >
              <HeartIcon />
            </a>
            <a
              href="/indicators"
              onClick={handleClick}
              id="desktopStatAnchor"
              class={desktopStatAnchor}
              draggable={draggable}
            >
              <StatIcon />
            </a>
            <a
              href="/api/arts"
              onClick={handleClick}
              id="desktopApiAnchor"
              class={desktopApiAnchor}
              draggable={draggable}
            >
              <ApiIcon />
            </a>
            <a
              href="/about"
              onClick={handleClick}
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
              id="mobile-anchor"
              href="/"
              class={mobilePrimaryAnchor}
            >
              <span class={`px-2`}>Accueil</span>
            </a>
          </li>
          <li>
            <a
              id="mobile-anchor"
              href="/artists"
              class={mobilePrimaryAnchor}
            >
              <span class={`px-2`}>Artistes</span>
            </a>
          </li>
          <li>
            <a
              id="mobile-anchor"
              href="/arts"
              class={mobilePrimaryAnchor}
            >
              <span class={`px-2`}>Œuvres</span>
            </a>
          </li>
          <li>
            <a
              id="mobile-anchor"
              href="/movements"
              class={mobilePrimaryAnchor}
            >
              <span class={`px-2`}>Mouvements</span>
            </a>
          </li>
          <li>
            <a
              id="mobile-anchor"
              href="/talents"
              class={mobilePrimaryAnchor}
            >
              <span class={`px-2`}>Talents</span>
            </a>
          </li>
          <li class={`flex`}>
            <div class={`w-[50px]`}>
              <a
                id="mobile-anchor"
                href="/histocharacters"
                onClick={handleClick}
                class={mobileSecondaryAnchor}
              >
                <HistoIcon />
              </a>
            </div>
            <div class={`w-[50px]`}>
              <a
                id="mobile-anchor"
                href="/women"
                onClick={handleClick}
                class={mobileSecondaryAnchor}
              >
                <WomanIcon />
              </a>
            </div>
            <div class={`w-[50px]`}>
              <a
                id="mobile-anchor"
                href="/art/mimi"
                onClick={handleClick}
                class={mobileSecondaryAnchor}
              >
                <HeartIcon />
              </a>
            </div>
            <div class={`w-[50px]`}>
              <a
                id="mobile-anchor"
                href="/indicators"
                onClick={handleClick}
                class={mobileSecondaryAnchor}
              >
                <StatIcon />
              </a>
            </div>
            <div class={`w-[50px]`}>
              <a
                href="/api/arts"
                onClick={handleClick}
                class={mobileSecondaryAnchor}
              >
                <ApiIcon />
              </a>
            </div>
            <div class={`w-[50px]`}>
              <a
                id="mobile-anchor"
                href="/about"
                onClick={handleClick}
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
