import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { css, tw } from "@twind";
import { Db } from "@utils/db.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { MovementRow } from "@utils/types.tsx";

import DefaultLayout from "@components/DefaultLayout.tsx";
import Footer from "@islands/Footer.tsx";
import Header from "@islands/Header.tsx";
import WaterDrop from "@islands/WaterDrop.tsx";

type Movements = Array<MovementRow>;

export const handler: Handlers<{
  movements: Movements;
}> = {
  async GET(_, ctx) {
    const db = Db.getInstance();
    const results = await db.selectFrom("movement")
      .selectAll()
      .where("slug", "!=", "nonclasse")
      .orderBy("name")
      .execute();

    const movements = results.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
    }));

    return ctx.render({ movements });
  },
};

export default function Home(
  props: PageProps<{
    movements: Movements;
  }>,
) {
  const { movements } = props.data;

  return (
    <DefaultLayout
      title="Mouvements"
      desc="Les principaux mouvements artistiques."
    >
      <div
        class={tw`flex flex-col min-h-screen ${
          css({
            background: `url(/bg)`,
            "background-color": `${colorScheme[currentColorScheme].white}`,
            "background-position": "center",
            "background-size": "3200px",
            "-webkit-tap-highlight-color": "transparent",
          })
        }`}
      >
        <Header />
        <main class={tw`flex-grow font-brush`}>
          <div class={tw`p-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
            <h1 class={tw`text-5xl font-medium mx-auto mb-6`}>
              Mouvements
            </h1>
            <div class={tw`flex flex-wrap`}>
              {movements &&
                (
                  <ul class={tw`lg:w-1/3 sm:w-1/2 p-2`}>
                    {movements.map((item, index) => (
                      <a
                        href={"/mouvement/" + item.slug}
                        class={tw`cursor-pointer`}
                      >
                        <li class={tw`text-lg`} key={index}>
                          {item.name}
                        </li>
                      </a>
                    ))}
                  </ul>
                )}
            </div>
          </div>
        </main>
        <WaterDrop color={colorScheme[currentColorScheme].lighterdark} />
        <Footer color={colorScheme[currentColorScheme].lighterdark} />
      </div>
    </DefaultLayout>
  );
}
