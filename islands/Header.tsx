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
                  href="/api/arts"
                  class={tw`hover:bg-green-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-lg font-medium`}
                >
                  API
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
