import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { css, tw } from "@twind";
import { Db } from "@utils/db.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

import { BrushStroke } from "@components/Assets.tsx";
import CollectionSearch from "@islands/CollectionSearch.tsx";
import DefaultLayout from "@components/DefaultLayout.tsx";
import Footer from "@islands/Footer.tsx";
import Nav from "@islands/Nav.tsx";
import WaterDrop from "@islands/WaterDrop.tsx";

export const handler: Handlers<{
  color: string | null;
  desc: string | null;
  font: string | null;
  movement: string | null;
  mySlug: string | null;
  title: string | null;
}> = {
  async GET(_, ctx) {
    const { slug } = ctx.params;

    const db = Db.getInstance();

    const result = await db.selectFrom("movement")
      .select([
        "name",
        "font",
        "slug",
      ]).where("slug", "=", slug).executeTakeFirst();

    const color = colorScheme[currentColorScheme].dark;

    let desc: string | null = null;
    let font: string | null = null;
    let movement: string | null = null;
    let mySlug: string | null = null;
    let title: string | null = null;

    if (result) {
      movement = result.name;
      desc = movement + ".";
      font = result.font;
      mySlug = result.slug;
      title = movement + " - Collection";
    } else return ctx.renderNotFound();

    return ctx.render({ color, desc, font, movement, mySlug, title });
  },
};

export default function Arts(
  props: PageProps<{
    color: string;
    desc: string;
    font: string;
    movement: string;
    mySlug: string;
    title: string;
  }>,
) {
  const { color, desc, mySlug, font, movement, title } = props.data;

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
            <CollectionSearch font={font} myslug={mySlug} type="movement" />
          </div>
        </main>
        <WaterDrop color={colorScheme[currentColorScheme].lighterdark} />
        <Footer color={colorScheme[currentColorScheme].lighterdark} />
      </div>
    </DefaultLayout>
  );
}
