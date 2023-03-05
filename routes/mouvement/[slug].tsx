import { ArtCollection } from "@utils/types.tsx";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { css, tw } from "@twind";
import { Db } from "@utils/db.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

import ArtsLayout from "@components/ArtsLayout.tsx";
import { BrushStroke } from "@components/Assets.tsx";
import DefaultLayout from "@components/DefaultLayout.tsx";
import Footer from "@islands/Footer.tsx";
import Nav from "@islands/Nav.tsx";
import WaterDrop from "@islands/WaterDrop.tsx";

export const handler: Handlers<{
  arts: Array<ArtCollection> | null;
  color: string | null;
  desc: string | null;
  font: string | null;
  movement: string | null;
  title: string | null;
}> = {
  async GET(_, ctx) {
    const { slug } = ctx.params;

    const db = Db.getInstance();

    const result = await db.selectFrom("movement")
      .select([
        "name",
        "font",
      ]).where("slug", "=", slug).executeTakeFirst();

    const results = await db.selectFrom("art")
      .innerJoin("artist", "art.owner_id", "artist.id")
      .innerJoin("movement", "art.movement_id", "movement.id")
      .select([
        "first_name",
        "last_name",
        "art.id",
        "art.name as name",
        "polyptych",
        "frame",
        "url",
        "url_2",
        "url_3",
        "url_4",
        "url_5",
      ])
      .where("movement.slug", "=", slug)
      .orderBy("art.name")
      .execute();

    const color = colorScheme[currentColorScheme].dark;

    let movement: string | null = null;
    let desc: string | null = null;
    let title: string | null = null;
    let font: string | null = null;

    if (result) {
      movement = result.name;
      desc = movement + ".";
      title = "Collection " + movement;
      font = result.font;
    } else return ctx.renderNotFound();

    let arts: Array<ArtCollection> | null = null;

    if (results) {
      arts = results.map((p) => ({
        first_name: p.first_name,
        last_name: p.last_name,
        id: String(p.id),
        name: p.name,
        polyptych: p.polyptych,
        frame: p.frame,
        url: p.url,
        url_2: p.url_2,
        url_3: p.url_3,
        url_4: p.url_4,
        url_5: p.url_5,
      }));
    }

    return ctx.render({ arts, color, desc, font, movement, title });
  },
};

export default function Arts(
  props: PageProps<{
    arts: Array<ArtCollection>;
    color: string;
    desc: string;
    font: string;
    movement: string;
    title: string;
  }>,
) {
  const { arts, color, desc, font, movement, title } = props.data;

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
        <Nav pathname="/mouvements" />
        <main
          class={tw`flex-grow`}
        >
          <div
            class={tw`w-auto flex flex-col mx-auto my-6`}
          >
            <BrushStroke color={color} font={font} title={movement} />
            <ArtsLayout arts={arts} font={font} />
          </div>
        </main>
        <WaterDrop color={colorScheme[currentColorScheme].lighterdark} />
        <Footer color={colorScheme[currentColorScheme].lighterdark} />
      </div>
    </DefaultLayout>
  );
}
