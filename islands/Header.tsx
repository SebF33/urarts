import { tw } from "@twind";

export default function Header() {
  return (
    <nav class={tw`wave-colors font-brush`}>
      <div class={tw`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
        <div class={tw`flex items-center justify-between h-16`}>
          <div class={tw`flex items-center`}>
            <div class={tw`flex-shrink-0`}>
              <img class={tw`h-8 w-8`} src="/logo.svg" alt="Fresh Deno" />
            </div>
            <div class={tw`hidden md:block`}>
              <div class={tw`ml-10 flex items-baseline space-x-4`}>
                <a
                  href="/"
                  class={tw`text-white hover:bg-green-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium`}
                >
                  Accueil
                </a>
                <a
                  href="/search"
                  class={tw`text-white hover:bg-green-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium`}
                >
                  Recherche
                </a>
                <a
                  href="/api/arts"
                  class={tw`text-white hover:bg-green-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium`}
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
