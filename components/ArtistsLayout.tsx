import { tw } from "@twind";

import { ArtistRow } from "@utils/types.tsx";

type Artists = Array<ArtistRow>;

export default function ArtistsLayout({ artists }: { artists: Artists }) {
  return (
    <main class={tw`flex-grow`}>
      <div class={tw`max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12`}>
        {artists &&
          (
            <div
              class={tw`grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 pt-10 pb-10 lg:pt-20 lg:pb-20`}
            >
              {artists.map((p) => (
                <div class="artist-frame">
                  <p class={tw`artist-name font-brush z-10`}>
                    {p.firstName} {p.lastName}
                  </p>
                  {p.signature &&
                    (
                      <img
                        class={tw`artist-sign w-8 z-10`}
                        src={p.signature}
                        alt={p.signature}
                      />
                    )}
                  <div class="artist-mat">
                    <a
                      href={"/art/" + p.slug}
                      class={tw`artist-art group flex justify-center text-center relative overflow-hidden z-20 cursor-pointer`}
                    >
                      <img
                        class={tw`w-full object-cover ease-in-out duration-500 group-hover:rotate-6 group-hover:scale-125`}
                        src={p.avatar}
                        alt={p.lastName}
                      />
                      <div
                        class={tw`absolute bg-black w-full h-full opacity-0 transition-opacity duration-500 group-hover:opacity-60`}
                      />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
    </main>
  );
}
