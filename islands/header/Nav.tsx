import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { css, tw } from "@twind";

import { HistoIcon, WomanIcon } from "@components/Assets.tsx";

export default function Nav(
  props: { pathname?: string },
) {
  if (typeof document !== "undefined") {
    const btn = document.querySelector("button.mobile-menu-button");
    const menu = document.querySelector(".mobile-menu");

    btn?.addEventListener("click", () => {
      menu?.classList.toggle("hidden");
    });
  }

  return (
    <nav
      class={tw`wave-colors font-brush shadow-lg text-white ${
        css(
          {
            "text-shadow": "2px 4px 3px rgba(0,0,0,0.3)",
          },
        )
      }`}
    >
      <div class={tw`max-w-7xl mx-auto px-4`}>
        <div class={tw`flex justify-between`}>
          <div class={tw`flex space-x-7`}>
            <div>
              <a href="/" class={tw`flex items-center py-3 px-2`}>
                <img
                  class={tw`h-10 w-10`}
                  src="/icon_urarts.svg"
                  alt="Urarts"
                />
              </a>
            </div>
            <div class={tw`hidden md:flex items-center space-x-4`}>
              <a
                href="/"
                class={tw`${
                  props.pathname === "/"
                    ? "text-lighterdark border-b-4 border-lighterdark"
                    : ""
                } py-4 px-2 text-lg font-medium hover:text-lighterdark transition duration-300`}
              >
                Accueil
              </a>
              <a
                href="/artists"
                class={tw`${
                  props.pathname === "/artists"
                    ? "text-lighterdark border-b-4 border-lighterdark"
                    : ""
                } py-4 px-2 text-lg font-medium hover:text-lighterdark transition duration-300`}
              >
                Artistes
              </a>
              <a
                href="/arts"
                class={tw`${
                  props.pathname === "/arts"
                    ? "text-lighterdark border-b-4 border-lighterdark"
                    : ""
                } py-4 px-2 text-lg font-medium hover:text-lighterdark transition duration-300`}
              >
                Œuvres
              </a>
              <a
                href="/movements"
                class={tw`${
                  props.pathname === "/movements"
                    ? "text-lighterdark border-b-4 border-lighterdark"
                    : ""
                } py-4 px-2 text-lg font-medium hover:text-lighterdark transition duration-300`}
              >
                Mouvements
              </a>
            </div>
          </div>
          <div class={tw`hidden md:flex items-center space-x-3`}>
            <a
              href="/histocharacters"
              class={tw`hover:text-lighterdark -mr-1`}
            >
              <HistoIcon />
            </a>
            <a
              href="/women"
              class={tw`hover:text-lighterdark`}
            >
              <WomanIcon />
            </a>
            <a
              href="/art/mimi"
              class={tw`hover:text-lighterdark`}
            >
              <svg
                class={tw`icon-svg h-6 w-6`}
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
              class={tw`hover:text-lighterdark`}
            >
              <svg
                class={tw`icon-svg h-6 w-6`}
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
              class={tw`hover:text-lighterdark`}
              target="_blank"
            >
              <svg
                class={tw`icon-svg h-7 w-7`}
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
          <div class={tw`md:hidden flex items-center`}>
            <button class={tw`mobile-menu-button focus:outline-none`}>
              <svg
                class={tw`w-6 h-6 text-white hover:text-lighterdark`}
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
      <div class={tw`hidden mobile-menu`}>
        <ul>
          <li
            class={tw`${
              props.pathname === "/"
                ? "active text-white bg-lighterdark font-semibold"
                : ""
            }`}
          >
            <a
              href="/"
              class={tw`block text-lg px-2 py-4 hover:bg-lighterdark transition duration-300`}
            >
              Accueil
            </a>
          </li>
          <li
            class={tw`${
              props.pathname === "/artists"
                ? "active text-white bg-lighterdark font-semibold"
                : ""
            }`}
          >
            <a
              href="/artists"
              class={tw`block text-lg px-2 py-4 hover:bg-lighterdark transition duration-300`}
            >
              Artistes
            </a>
          </li>
          <li
            class={tw`${
              props.pathname === "/arts"
                ? "active text-white bg-lighterdark font-semibold"
                : ""
            }`}
          >
            <a
              href="/arts"
              class={tw`block text-lg px-2 py-4 hover:bg-lighterdark transition duration-300`}
            >
              Œuvres
            </a>
          </li>
          <li
            class={tw`${
              props.pathname === "/movements"
                ? "active text-white bg-lighterdark font-semibold"
                : ""
            }`}
          >
            <a
              href="/movements"
              class={tw`block text-lg px-2 py-4 hover:bg-lighterdark transition duration-300`}
            >
              Mouvements
            </a>
          </li>
          <li
            class={tw`flex`}
          >
            <div
              class={tw`flex`}
            >
              <a
                href="/histocharacters"
                class={tw`flex flex-col items-center justify-center text-lg px-2 py-3 hover:bg-lighterdark transition duration-300`}
              >
                <HistoIcon />
              </a>
            </div>
            <div
              class={tw`flex`}
            >
              <a
                href="/women"
                class={tw`flex flex-col items-center justify-center text-lg px-2 py-3 hover:bg-lighterdark transition duration-300`}
              >
                <WomanIcon />
              </a>
            </div>
            <div
              class={tw`flex`}
            >
              <a
                href="/art/mimi"
                class={tw`flex flex-col items-center justify-center text-lg px-3 py-3 hover:bg-lighterdark transition duration-300`}
              >
                <svg
                  class={tw`icon-svg h-6 w-6`}
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
            <div
              class={tw`flex`}
            >
              <a
                href="/indicators"
                class={tw`flex flex-col items-center justify-center text-lg px-3 py-3 hover:bg-lighterdark transition duration-300`}
              >
                <svg
                  class={tw`icon-svg h-6 w-6`}
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
            <div
              class={tw`flex`}
            >
              <a
                href="/api/arts"
                class={tw`flex flex-col items-center justify-center text-lg px-2 py-3 hover:bg-lighterdark transition duration-300`}
                target="_blank"
              >
                <svg
                  class={tw`icon-svg h-7 w-7`}
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
