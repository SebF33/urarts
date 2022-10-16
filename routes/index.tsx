import { Db } from "@utils/db.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { tw } from "@twind";
import { ArtistRow } from "@utils/types.tsx";

import Footer from "@islands/Footer.tsx";
import Header from "@islands/Header.tsx";

type Artists = Array<ArtistRow>;

export const handler: Handlers<Artists | null> = {
  async GET(_, ctx) {
    const db = Db.getInstance();
    const results = await db.selectFrom("artist").selectAll()
      .limit(8).orderBy("last_name").execute();

    let artists: Artists | null = null;
    if (results) {
      artists = results.map((p) => ({
        id: p.id,
        firstName: p.first_name,
        lastName: p.last_name,
        avatar: p.avatar_url,
        signature: p.signature,
        slug: p.slug,
      }));
    }

    return ctx.render(artists);
  },
};

export default function Home({ data }: PageProps<Artists | null>) {
  return (
    <div class={tw`flex flex-col min-h-screen`}>
      <Header />

      <main class={tw`flex-grow`}>
        <div class={tw`p-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
          {data &&
            (
              <div
                class={tw`grid grid-cols-2 gap-5 md:grid-cols-2 xl:grid-cols-4 pt-10 pb-10 lg:pt-20 lg:pb-20`}
              >
                {data.map((p) => (
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

      <Footer />
    </div>
  );
}
