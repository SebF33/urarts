import { Db } from "@utils/db.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { tw } from "@twind";

import { ArtistRow } from "@utils/types.tsx";

import ArtistsLayout from "@components/ArtistsLayout.tsx";
import Footer from "@islands/Footer.tsx";
import Header from "@islands/Header.tsx";

type Artists = Array<ArtistRow>;

export const handler: Handlers<{
  artists: Artists;
}> = {
  async GET(_, ctx) {
    const db = Db.getInstance();

    const results = await db.selectFrom("artist").selectAll().orderBy(
      "last_name",
    ).execute();

    const artists = results.map((p) => ({
      id: p.id,
      firstName: p.first_name,
      lastName: p.last_name,
      avatar: p.avatar_url,
      signature: p.signature,
      slug: p.slug,
    }));

    return ctx.render({ artists });
  },
};

export default function Home(
  props: PageProps<{
    artists: Artists;
  }>,
) {
  const { artists } = props.data;

  return (
    <div class={tw`flex flex-col min-h-screen`}>
      <Header />
      <ArtistsLayout artists={artists} />
      <Footer />
    </div>
  );
}
