import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { css, tw } from "@twind";

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
                href="/mouvements"
                class={tw`${
                  props.pathname === "/mouvements"
                    ? "text-lighterdark border-b-4 border-lighterdark"
                    : ""
                } py-4 px-2 text-lg font-medium hover:text-lighterdark transition duration-300`}
              >
                Mouvements
              </a>
              <a
                href="/api/arts"
                class={tw`py-4 px-2 text-lg font-medium hover:text-lighterdark transition duration-300`}
                target="_blank"
              >
                API
              </a>
            </div>
          </div>
          <div class={tw`hidden md:flex items-center space-x-3 `}>
            <a
              href="/art/mimi"
              class={tw`hover:text-lighterdark`}
            >
              <svg
                class={tw`icon-svg h-5 w-5`}
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
              class={tw`block text-sm px-2 py-4 hover:bg-lighterdark transition duration-300`}
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
              class={tw`block text-sm px-2 py-4 hover:bg-lighterdark transition duration-300`}
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
              class={tw`block text-sm px-2 py-4 hover:bg-lighterdark transition duration-300`}
            >
              Œuvres
            </a>
          </li>
          <li
            class={tw`${
              props.pathname === "/mouvements"
                ? "active text-white bg-lighterdark font-semibold"
                : ""
            }`}
          >
            <a
              href="/mouvements"
              class={tw`block text-sm px-2 py-4 hover:bg-lighterdark transition duration-300`}
            >
              Mouvements
            </a>
          </li>
          <li>
            <a
              href="/api/arts"
              class={tw`block text-sm px-2 py-4 hover:bg-lighterdark transition duration-300`}
              target="_blank"
            >
              API
            </a>
          </li>
          <li>
            <a
              href="/art/mimi"
              class={tw`block text-sm px-2 py-4 hover:bg-lighterdark transition duration-300`}
            >
              <svg
                class={tw`icon-svg h-5 w-5`}
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
          </li>
        </ul>
      </div>
    </nav>
  );
}
