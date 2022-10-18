import { Handlers, PageProps } from "$fresh/server.ts";
import { tw } from "@twind";
import { Db } from "@utils/db.ts";
import { ArtCollection } from "@utils/types.tsx";

import { BrushStroke } from "@components/Assets.tsx";
import Header from "@islands/Header.tsx";

export const handler: Handlers<{
  art: Array<ArtCollection> | null;
  artist: string | null;
}> = {
  async GET(_, ctx) {
    const { slug } = ctx.params;

    const db = Db.getInstance();

    const result = await db.selectFrom("artist").select([
      "first_name",
      "last_name",
    ]).where("slug", "=", slug).executeTakeFirst();

    const results = await db.selectFrom("art")
      .innerJoin("artist", "art.owner_id", "artist.id").select([
        "first_name",
        "last_name",
        "art.id",
        "name",
        "movement",
        "url",
      ]).where("slug", "=", slug).execute();

    let artist: string | null = null;
    if (result) {
      artist = result.first_name + " " + result.last_name;
    }

    let art: Array<ArtCollection> | null = null;
    if (results) {
      art = results.map((p) => ({
        firstName: p.first_name,
        lastName: p.last_name,
        id: String(p.id),
        name: p.name,
        movement: p.movement,
        url: p.url,
      }));
    }

    return ctx.render({ art, artist });
  },
};

export default function Arts(
  props: PageProps<{
    art: Array<ArtCollection> | null;
    artist: string | null;
  }>,
) {
  const { art, artist } = props.data;

  return (
    <div class={tw`flex flex-col min-h-screen`}>
      <Header />

      <main class={tw`flex-grow`}>
        <div
          class={tw`w-screen flex flex-col mx-auto my-2`}
        >
          <div class="brush-wrap mx-auto mt-2">
            <p>{artist}</p>
          </div>
          <BrushStroke /> {art &&
            (
              <div
                class={tw`flex flex-wrap mx-auto`}
              >
                {art.map((art) => (
                  <div
                    class={tw`row mx-auto`}
                  >
                    <div
                      id={art.id}
                      class="art-frame w-full p-2 lg:w-1/3 md:w-1/2"
                    >
                      <p class={tw`art-name font-brush z-10`}>
                        {art.name}
                      </p>
                      <img
                        src={art.url}
                        alt={art.name}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>
      </main>
    </div>
  );
}
