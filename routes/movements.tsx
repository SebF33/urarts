import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { css } from "twind/css";
import { Db } from "@utils/db.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { MovementRow } from "@utils/types.tsx";
import { tw } from "twind";

import Footer from "@islands/footer/Footer.tsx";
import Nav from "@islands/header/Nav.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";

type Movements = Array<MovementRow>;

export const handler: Handlers<{}> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const pathname = url.pathname;

    const db = Db.getInstance();
    const { count } = db.fn;

    const results = await db
      .selectFrom("movement")
      .innerJoin("art", "art.movement_id", "movement.id")
      .innerJoin("artist", "art.owner_id", "artist.id")
      .select([
        "movement.id",
        "movement.name",
        "movement.slug",
        count("art.id").as("art_count"),
      ])
      .where("movement.slug", "!=", "nonclasse")
      .where("copyright", "!=", 2)
      .groupBy("movement.id")
      .orderBy("movement.name")
      .execute();

    const movements = results.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      art_count: String(p.art_count),
    }));

    return ctx.render({ movements, pathname });
  },
};

export default function MovementsPage(
  props: PageProps<{
    movements: Movements;
    pathname: string;
  }>,
) {
  const { movements, pathname } = props.data;
  const desc = "Les principaux mouvements artistiques.";
  const title = "Urarts - Mouvements";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
      </Head>

      <div
        class={tw`flex flex-col min-h-screen ${
          css({
            background: `url(/background/gray)`,
            "background-color": `${colorScheme[currentColorScheme].white}`,
            "background-position": "center",
            "background-size": "3200px",
            "-webkit-tap-highlight-color": "transparent",
          })
        }`}
      >
        <Nav pathname={pathname} />

        <main class={tw`flex-grow font-brush`}>
          <div class={tw`p-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
            <div
              class={tw`paper max-w-[230px] mb-6`}
            >
              <div class="top-tape"></div>
              <h1 class={tw`text-5xl font-medium mx-auto`}>
                Mouvements
              </h1>
            </div>

            <div class={tw`flex flex-wrap`}>
              {movements &&
                (
                  <ul class={tw`lg:w-1/3 sm:w-1/2 p-2`}>
                    {movements.map((item, index) => (
                      <li class={tw`m-2`} key={index}>
                        <a
                          href={"/movement/" + item.slug}
                          class={tw`cursor-pointer`}
                        >
                          <p class={tw`relative group text-xl`}>
                            <span>{item.name}</span>
                            <span class={tw`text-lg italic`}>
                              {" "}({item.art_count}{" "}
                              œuvre{item.art_count === "1" ? "" : "s"})
                            </span>
                            <span
                              class={tw`absolute -bottom-1 left-0 w-0 h-1 bg-cyan transition-all group-hover:w-full`}
                            >
                            </span>
                          </p>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
            </div>
          </div>
        </main>

        <WaterDrop color={colorScheme[currentColorScheme].cyan} />
        <Footer color={colorScheme[currentColorScheme].cyan} />
      </div>
    </>
  );
}
