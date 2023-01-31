import { ArtCollection } from "@utils/types.tsx";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { css, tw } from "@twind";
import { Db } from "@utils/db.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

import { BrushStroke } from "@components/Assets.tsx";
import DefaultLayout from "@components/DefaultLayout.tsx";
import Header from "@islands/Header.tsx";

export const handler: Handlers<{
  art: Array<ArtCollection> | null;
  movement: string | null;
  desc: string | null;
  title: string | null;
}> = {
  async GET(_, ctx) {
    const { slug } = ctx.params;

    const db = Db.getInstance();

    const result = await db.selectFrom("movement").select([
      "name",
    ]).where("slug", "=", slug).executeTakeFirst();

    const results = await db.selectFrom("art")
      .innerJoin("artist", "art.owner_id", "artist.id")
      .innerJoin("movement", "art.movement_id", "movement.id")
      .select([
        "first_name",
        "last_name",
        "art.id",
        "art.name as name",
        "movement.name as movement",
        "url",
      ])
      .where("movement.slug", "=", slug)
      .orderBy("art.name")
      .execute();

    let movement: string | null = null;
    let desc: string | null = null;
    let title: string | null = null;
    if (result) {
      movement = result.name;
      desc = movement + ".";
      title = "Collection " + movement;
    }

    let art: Array<ArtCollection> | null = null;
    if (results) {
      art = results.map((p) => ({
        first_name: p.first_name,
        last_name: p.last_name,
        id: String(p.id),
        name: p.name,
        movement: p.movement,
        url: p.url,
      }));
    }

    if (!result) return ctx.renderNotFound();
    return ctx.render({ art, movement, desc, title });
  },
};

export default function Arts(
  props: PageProps<{
    art: Array<ArtCollection> | null;
    movement: string | null;
    desc: string;
    title: string;
  }>,
) {
  const { art, movement, desc, title } = props.data;

  return (
    <DefaultLayout
      title={title}
      desc={desc}
    >
      <div
        class={tw`flex flex-col min-h-screen ${
          css({
            background: `url(/bg)`,
            "background-color": `${colorScheme[currentColorScheme].white}`,
            "background-position": "center",
            "background-size": "540px",
            "-webkit-tap-highlight-color": "transparent",
          })
        }`}
      >
        <Header />
        <main
          class={tw`flex-grow`}
        >
          <div
            class={tw`w-auto flex flex-col mx-auto my-6`}
          >
            <BrushStroke title={movement} />
            {art &&
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
    </DefaultLayout>
  );
}
