import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { css, tw } from "@twind";

export default function Header() {
  const fontColor: string = colorScheme[currentColorScheme].white;

  return (
    <nav
      class={tw`wave-colors font-brush ${
        css(
          {
            "color": fontColor,
            "text-shadow": "2px 4px 3px rgba(0,0,0,0.3)",
          },
        )
      }`}
    >
      <div class={tw`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
        <div class={tw`flex items-center justify-between h-16`}>
          <div class={tw`flex items-center`}>
            <div class={tw`flex-shrink-0`}>
              <img class={tw`h-10 w-10`} src="/icon_urarts.svg" alt="Urarts" />
            </div>
            <div class={tw`hidden md:block`}>
              <div class={tw`ml-10 flex items-baseline space-x-4`}>
                <a
                  href="/"
                  class={tw`hover:bg-green-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-lg font-medium`}
                >
                  Accueil
                </a>
                <a
                  href="/artists"
                  class={tw`hover:bg-green-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-lg font-medium`}
                >
                  Artistes
                </a>
                <a
                  href="/arts"
                  class={tw`hover:bg-green-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-lg font-medium`}
                >
                  Œuvres
                </a>
                <a
                  href="/mouvements"
                  class={tw`hover:bg-green-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-lg font-medium`}
                >
                  Mouvements
                </a>
                <a
                  href="/api/arts"
                  class={tw`hover:bg-green-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-lg font-medium`}
                  target="_blank"
                >
                  API
                </a>
              </div>
            </div>
          </div>
          <div class={tw`flex`}>
            <a
              href="/art/mimi"
              class={tw`hover:text-gray-500`}
            >
              <span class={tw`sr-only`}>Mimi</span>
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
        </div>
      </div>
    </nav>
  );
}
