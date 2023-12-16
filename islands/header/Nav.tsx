import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { css } from "@twind/core";
import { h } from "preact";
import ky from "ky";
import tippy from "tippyjs";
import { UrlBasePath } from "../../env.ts";
import { useEffect, useState } from "preact/hooks";

import { HistoIcon, WomanIcon } from "@components/Assets.tsx";

export interface Props {
  url: URL;
}

export default function Nav(props: Props) {
  // CSS
  const draggable = false;
  const desktopCurrent =
    "data-[current]:text-lighterdark data-[current]:border-b-4 data-[current]:border-lighterdark";
  const desktopHover = "hover:text-lighterdark transition duration-300";
  const desktopPrimaryAnchor =
    `py-4 px-2 text-lg font-medium ${desktopHover} ${desktopCurrent}`;
  const desktopHistoAnchor = `py-3 -mr-1 ${desktopHover} ${desktopCurrent}`;
  const desktopWomanAnchor = `py-3 ${desktopHover} ${desktopCurrent}`;
  const desktopHeartAnchor = `py-4 mt-1 ${desktopHover} ${desktopCurrent}`;
  const desktopStatAnchor = desktopHeartAnchor;
  const mobileCurrent =
    "data-[current]:active data-[current]:text-white data-[current]:bg-lighterdark data-[current]:font-semibold";
  const mobileHover = "hover:bg-lighterdark transition duration-300";
  const mobilePrimaryAnchor =
    `h-[60px] flex flex-col justify-center text-lg ${mobileHover} ${mobileCurrent}`;
  const mobileSecondaryAnchor =
    `h-[60px] flex flex-col items-center justify-center px-1 py-3 text-lg ${mobileHover} ${mobileCurrent}`;

  // Leonardo
  const [leonardoActive, setLeonardoActive] = useState(false);
  useEffect(() => {
    const ref = document.querySelector("#Icon");

    if (ref) {
      const leonardoTooltip = tippy(ref, {
        allowHTML: true,
        appendTo: () => document.body,
        arrow: false,
        duration: [1800, 0],
        content:
          `<img class="absolute top-[-0.5rem] left-[-2rem] max-w-[95px] min-w-[95px]" src="/leonardo.png" alt="Leonardo" draggable=${draggable}/>
          <div class="absolute top-[-0.6rem] left-[-1.4rem]"><div class="eye left-eye"><div class="eyeshut"><span></span></div><div class="eyeball left-eyeball"></div></div></div>
          <div class="absolute top-[-0.62rem] left-[-0.38rem]"><div class="eye right-eye"><div class="eyeshut"><span></span></div><div class="eyeball right-eyeball"></div></div></div>
          <div id="leonardoContent" class="flex-col pl-16 pb-1 text-xl leading-5">...</div>`,
        hideOnClick: "false",
        interactive: true,
        maxWidth: 900,
        offset: [-220, 16],
        placement: "bottom-start",
        role: "leonardo",
        theme: "leonardo",
        trigger: "manual",
      });

      leonardoTooltip.show();

      // Yeux Leonardo
      const eyes = document.querySelectorAll<HTMLElement>(".eye");
      eyes.forEach((eye) => {
        eye.onclick = () => {
          leonardoTooltip.hide();
          setLeonardoActive(false);
        };
      });
      const leftEyeball = document.querySelector<HTMLElement>(".left-eyeball");
      const rightEyeball = document.querySelector<HTMLElement>(".right-eyeball");
      document.onmousemove = (event: MouseEvent) => {
        if (leftEyeball) {
          const x = Math.max(50, (event.clientX * 100) / window.innerWidth) + "%";
          const y = Math.max(5, (event.clientY * 100) / window.innerHeight) + "%";
          leftEyeball.style.left = x;
          leftEyeball.style.top = y;
        }
        if (rightEyeball) {
          const x = Math.max(50, (event.clientX * 100) / window.innerWidth) + "%";
          const y = Math.min(50, Math.max(20, (event.clientY * 100) / window.innerHeight)) + "%";
          rightEyeball.style.left = x;
          rightEyeball.style.top = y;
        }
      };
    }
  }, []);

  // Appel à l'API Leonardo
  useEffect(() => {
    const delay = 150;
    //console.log("url : " + props.url);
    const url = new URL(props.url);

    setTimeout(() => {
      // Paramètre 1
      let isWelcome = "false";
      const isPartial = url.searchParams.get("fresh-partial") || "";
      if (isPartial !== "true") isWelcome = "true";
      // Paramètre 2
      const pageName = url.pathname.split("/")[1];
      // Paramètre 3
      const subpageSlug = url.pathname.split("/")[2];

      const params = {
        welcome: isWelcome,
        page: pageName,
        subpage: subpageSlug,
      };

      const queryString = new URLSearchParams(params).toString();
      //console.log(queryString);

      const fetchData = async () => {
        try {
          const response = await ky.get(
            `${UrlBasePath}/api/leonardo?${queryString}`,
          );
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
    }, delay);
  }, [props.url, leonardoActive]);

  // Visibilité Leonardo
  function handleClick(event: h.JSX.TargetedMouseEvent<HTMLAnchorElement>) {
    const ref = event.currentTarget as HTMLAnchorElement;
    const instance = ref._tippy;
    const isVisible = instance.state.isVisible;

    if (isVisible) {
      instance.hide();
      setLeonardoActive(false);
    } else {
      instance.show();
      setLeonardoActive(true);
    }
  }

  // Menu mobile
  useEffect(() => {
    const delay = 120;
    const anchor = document.querySelectorAll("#mobile-anchor");
    const btn = document.querySelector("button.mobile-menu-button");
    const menu = document.querySelector(".mobile-menu");

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

  return (
    <nav
      class={`wave-colors shadow-lg text-white z-10 ${
        css(
          {
            "text-shadow": "2px 4px 3px rgba(0,0,0,0.3)",
          },
        )
      }`}
    >
      <div class={`max-w-7xl mx-auto px-4`}>
        <div class={`flex justify-between`}>
          <div class={`flex space-x-7`}>
            <div class={`select-none`}>
              <a
                class={`flex items-center py-3 px-2 cursor-zoom-in`}
                draggable={draggable}
              >
                <img
                  id="Icon"
                  onClick={handleClick}
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
              class={desktopHistoAnchor}
              draggable={draggable}
            >
              <HistoIcon />
            </a>
            <a
              href="/women"
              class={desktopWomanAnchor}
              draggable={draggable}
            >
              <WomanIcon />
            </a>
            <a
              href="/art/mimi"
              class={desktopHeartAnchor}
              draggable={draggable}
            >
              <svg
                class={`icon-svg h-6 w-6`}
                fill={colorScheme[currentColorScheme].white}
                viewBox="0 0 16 16"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                />
              </svg>
            </a>
            <a
              href="/indicators"
              class={desktopStatAnchor}
              draggable={draggable}
            >
              <svg
                class={`icon-svg h-6 w-6`}
                fill={colorScheme[currentColorScheme].white}
                viewBox="0 0 16 16"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2z"
                />
              </svg>
            </a>
            <a
              href="/api/arts"
              class="mt-1"
              draggable={draggable}
              target="_blank"
            >
              <svg
                class={`icon-svg h-7 w-7`}
                fill={colorScheme[currentColorScheme].white}
                viewBox="0 0 576 448"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M208,0h-48c-53,0-96,43-96,96v37.5c0,8.5-3.4,16.6-9.4,22.6L9.4,201.4c-12.5,12.5-12.5,32.8,0,45.3c0,0,0,0,0,0l45.2,45.2
                  c6,6,9.4,14.1,9.4,22.6V352c0,53,43,96,96,96h48c8.8,0,16-7.2,16-16v-32c0-8.8-7.2-16-16-16h-48c-17.7,0-32-14.3-32-32v-37.5
                  c0-25.5-10.1-49.9-28.1-67.9L77.3,224l22.6-22.6c18-18,28.1-42.4,28.1-67.9V96c0-17.7,14.3-32,32-32h48c8.8,0,16-7.2,16-16V16
                  C224,7.2,216.8,0,208,0z M566.6,201.4l-45.2-45.2c-6-6-9.4-14.2-9.4-22.6V96c0-53-43-96-96-96h-48c-8.8,0-16,7.2-16,16v32
                  c0,8.8,7.2,16,16,16h48c17.7,0,32,14.3,32,32v37.5c0,25.5,10.1,49.9,28.1,67.9l22.6,22.6l-22.6,22.6c-18,18-28.1,42.4-28.1,67.9V352
                  c0,17.7-14.3,32-32,32h-48c-8.8,0-16,7.2-16,16v32c0,8.8,7.2,16,16,16h48c53,0,96-43,96-96v-37.5c0-8.5,3.4-16.6,9.4-22.6l45.2-45.2
                  C579.1,234.1,579.1,213.9,566.6,201.4C566.6,201.4,566.6,201.4,566.6,201.4L566.6,201.4z"
                />
              </svg>
            </a>
          </div>
          <div class={`md:hidden flex items-center`}>
            <button class={`mobile-menu-button focus:outline-none`}>
              <svg
                class={`w-6 h-6 text-white hover:text-lighterdark`}
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class={`hidden mobile-menu`}>
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
                class={mobileSecondaryAnchor}
              >
                <HistoIcon />
              </a>
            </div>
            <div class={`w-[50px]`}>
              <a
                id="mobile-anchor"
                href="/women"
                class={mobileSecondaryAnchor}
              >
                <WomanIcon />
              </a>
            </div>
            <div class={`w-[50px]`}>
              <a
                id="mobile-anchor"
                href="/art/mimi"
                class={mobileSecondaryAnchor}
              >
                <svg
                  class={`icon-svg h-6 w-6`}
                  fill={colorScheme[currentColorScheme].white}
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                  />
                </svg>
              </a>
            </div>
            <div class={`w-[50px]`}>
              <a
                id="mobile-anchor"
                href="/indicators"
                class={mobileSecondaryAnchor}
              >
                <svg
                  class={`icon-svg h-6 w-6`}
                  fill={colorScheme[currentColorScheme].white}
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2z"
                  />
                </svg>
              </a>
            </div>
            <div class={`w-[50px]`}>
              <a
                href="/api/arts"
                class={mobileSecondaryAnchor}
                target="_blank"
              >
                <svg
                  class={`icon-svg h-7 w-7`}
                  fill={colorScheme[currentColorScheme].white}
                  viewBox="0 0 576 448"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M208,0h-48c-53,0-96,43-96,96v37.5c0,8.5-3.4,16.6-9.4,22.6L9.4,201.4c-12.5,12.5-12.5,32.8,0,45.3c0,0,0,0,0,0l45.2,45.2
                  c6,6,9.4,14.1,9.4,22.6V352c0,53,43,96,96,96h48c8.8,0,16-7.2,16-16v-32c0-8.8-7.2-16-16-16h-48c-17.7,0-32-14.3-32-32v-37.5
                  c0-25.5-10.1-49.9-28.1-67.9L77.3,224l22.6-22.6c18-18,28.1-42.4,28.1-67.9V96c0-17.7,14.3-32,32-32h48c8.8,0,16-7.2,16-16V16
                  C224,7.2,216.8,0,208,0z M566.6,201.4l-45.2-45.2c-6-6-9.4-14.2-9.4-22.6V96c0-53-43-96-96-96h-48c-8.8,0-16,7.2-16,16v32
                  c0,8.8,7.2,16,16,16h48c17.7,0,32,14.3,32,32v37.5c0,25.5,10.1,49.9,28.1,67.9l22.6,22.6l-22.6,22.6c-18,18-28.1,42.4-28.1,67.9V352
                  c0,17.7-14.3,32-32,32h-48c-8.8,0-16,7.2-16,16v32c0,8.8,7.2,16,16,16h48c53,0,96-43,96-96v-37.5c0-8.5,3.4-16.6,9.4-22.6l45.2-45.2
                  C579.1,234.1,579.1,213.9,566.6,201.4C566.6,201.4,566.6,201.4,566.6,201.4L566.6,201.4z"
                  />
                </svg>
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
