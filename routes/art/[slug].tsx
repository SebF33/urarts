import { Handlers, PageProps } from "$fresh/server.ts";
import { tw } from "@twind";
import { Db } from "@utils/db.ts";

import { BrushStroke } from "@components/Assets.tsx";
import Footer from "@islands/Footer.tsx";
import Header from "@islands/Header.tsx";

type ArtRow = {
  firstName: string;
  lastName: string;
  id: number;
  name: string;
  movement: string;
  url: string;
};

type Art = Array<ArtRow>;

export const handler: Handlers<Art | null> = {
  async GET(_, ctx) {
    const { slug } = ctx.params;

    const db = Db.getInstance();

    const results = await db.selectFrom("art")
      .innerJoin("person", "art.owner_id", "person.id").select([
        "first_name",
        "last_name",
        "art.id",
        "name",
        "movement",
        "url",
      ]).where("slug", "=", slug).execute();

    let art: Art | null = null;
    if (results) {
      art = results.map((p) => ({
        firstName: p.first_name,
        lastName: p.last_name,
        id: p.id,
        name: p.name,
        movement: p.movement,
        url: p.url,
      }));
    }

    return ctx.render(art);
  },
};

export default function Arts({ data }: PageProps<Art | null>) {
  return (
    <div class={tw`flex flex-col min-h-screen`}>
      <Header />

      <main class={tw`flex-grow`}>
        {data &&
          (
            <div
              class={tw`container flex flex-wrap mx-auto my-2`}
            >
              <div class="brush-wrap mx-auto">
                <p>Artiste</p>
              </div>
              <BrushStroke />

              {data.map((p) => (
                <div
                  class={tw`row mx-auto`}
                >
                  <div class="art-frame w-full p-2 lg:w-1/3 md:w-1/2">
                    <p class={tw`art-name font-brush z-10`}>
                      {p.name}
                    </p>
                    <img
                      src={p.url}
                      alt={p.name}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
      </main>

      <Footer />
    </div>
  );
}
