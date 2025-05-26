import { ArtistQuote } from "@utils/types.d.ts";
import { Db } from "@utils/db.ts";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Head, Partial } from "$fresh/runtime.ts";
import i18next from "i18next";
import "@utils/i18n/config.ts";

import AnimBrushStroke from "@islands/AnimBrushStroke.tsx";
import Avatar from "@islands/Avatar.tsx";
import CollectionSearch from "@islands/livesearch/CollectionSearch.tsx";
import Copyright from "@islands/Copyright.tsx";
import Footer from "@islands/footer/Footer.tsx";
import Quote from "@islands/Quote.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";

type Quote = Array<ArtistQuote>;

interface Movement {
  font: string;
  movementName: string;
  movementSlug: string;
  position: string;
}

interface QueryParameters {
  alone: boolean;
  fromLeonardo: boolean;
  id: string;
}

interface ArtistPageProps {
  artist: string;
  artistQuote: Quote | null;
  avatar: string;
  avatarInfo: string;
  birthyear: string;
  color: string;
  copyright: number;
  deathyear: string;
  description: string;
  info: string;
  movements: Movement[];
  nationality: string;
  queryParameters: QueryParameters;
  secondaryColor: string;
  site: string;
  slug: string;
  title: string;
}


export const handler: Handlers<ArtistPageProps> = {
  async GET(req: Request, ctx: FreshContext) {
    const lng = i18next.language;
    const { slug } = ctx.params;
    const url = new URL(req.url);

    const db = Db.getInstance();

    const artistDetails = await db
      .selectFrom("artist")
      .innerJoin("country", "artist.country_id", "country.id")
      .select([
        "first_name", "last_name",
        "avatar_url", "color", "secondary_color", "site_web",
        "birthyear", "deathyear", "signature", "quote", "copyright", "slug",
      ])
      .$if(lng === 'fr', (query) => query.select("avatar_info"))
      .$if(lng === 'en', (query) => query.select("avatar_info_en as avatar_info"))
      .$if(lng === 'fr', (query) => query.select("info"))
      .$if(lng === 'en', (query) => query.select("info_en as info"))
      .$if(lng === 'fr', (query) => query.select("country.name as nationality"))
      .$if(lng === 'en', (query) => query.select("country.name_en as nationality"))
      .where("slug", "=", slug)
      .executeTakeFirst();

    if (!artistDetails) {
      return ctx.renderNotFound();
    }

    const searchParams = url.searchParams;
    const queryParameters: QueryParameters = {
      alone: searchParams.has("alone"),
      fromLeonardo: searchParams.has("fromleonardo"),
      id: searchParams.get("id") || "",
    };

    const movementQuery = await db
      .selectFrom("art")
      .innerJoin("artist", "art.owner_id", "artist.id")
      .innerJoin("movement", "art.movement_id", "movement.id")
      .select(["movement.font", "movement.slug"])
      .$if(lng === 'fr', (query) => query.select("movement.name"))
      .$if(lng === 'en', (query) => query.select("movement.name_en as name"))
      .distinct()
      .where("artist.slug", "=", artistDetails.slug)
      .where("movement.slug", "!=", "unclassified")
      .$if(lng === 'fr', (query) => query.orderBy("movement.name"))
      .$if(lng === 'en', (query) => query.orderBy("movement.name_en"))
      .execute();

    const movementLabels: Movement[] = movementQuery.map((movement, index) => {
      const marginClasses = ["-ml-2", "ml-6", "-ml-1", "ml-12", "-ml-3", "ml-2"];
      const rotationClasses = ["-rotate-3", "rotate-3", "-rotate-1", "rotate-2", "-rotate-2", "rotate-6"];

      return {
        font: movement.font,
        movementName: movement.name ?? "",
        movementSlug: movement.slug,
        position: `${marginClasses[index % marginClasses.length]} ${rotationClasses[index % rotationClasses.length]}`,
      };
    });

    const artist = artistDetails.first_name ? `${artistDetails.first_name} ${artistDetails.last_name}` : artistDetails.last_name;
    const description = `${i18next.t("meta.collection.desc", { ns: "translation" })} ${artist}.`;

    return ctx.render({
      artist,
      artistQuote: artistDetails.quote ? {
        first_name: artistDetails.first_name,
        last_name: artistDetails.last_name,
        signature: artistDetails.signature,
        quote: artistDetails.quote,
      } : null,
      avatar: artistDetails.avatar_url,
      avatarInfo: artistDetails.avatar_info,
      birthyear: artistDetails.birthyear,
      color: artistDetails.color,
      copyright: artistDetails.copyright,
      deathyear: artistDetails.deathyear ? ` — ${artistDetails.deathyear}` : "",
      description,
      info: artistDetails.info,
      movements: movementLabels,
      nationality: artistDetails.nationality,
      queryParameters,
      secondaryColor: artistDetails.secondary_color,
      site: artistDetails.site_web,
      slug: artistDetails.slug,
      title: `${artist} ${i18next.t("meta.collection.title", { ns: "translation" })}`,
    });
  },
};


export default function ArtistArtPage(props: PageProps<ArtistPageProps>) {
  const {
    artist,
    artistQuote,
    avatar,
    avatarInfo,
    birthyear,
    color,
    copyright,
    deathyear,
    description,
    info,
    movements,
    nationality,
    queryParameters,
    secondaryColor,
    site,
    slug,
    title,
  } = props.data;

  const draggable = false;


  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>

      <main
        id="page"
        data-name="collection"
        class="flex-grow xl:max-h-screen scrollable xl:overflow-y-scroll custom-scrollbar"
      >
        <div class="relative w-auto flex flex-col mx-auto">
          {/* Post-it : mouvements */}
          {movements.length > 0 && (
            <div class="invisible md:visible absolute mt-12 ml-16">
              {movements.map((movement) => (
                <div class={`paper appear-effect-fast-fadein min-w-[180px] min-h-8 mt-1 ${movement.position} font-${movement.font} shadow-none`}>
                  <div class="top-tape max-h-3"></div>
                  <a href={`/movement/${movement.movementSlug}`} class="z-10 px-6 text-lighterdark text-xl italic underline select-none" draggable={draggable}>
                    {movement.movementName}
                  </a>
                </div>
              ))}
            </div>
          )}

          <div class="mx-auto mt-8 z-10">
            <AnimBrushStroke color={color} font="brush" secondaryColor={secondaryColor} title={artist} />
          </div>

          <div class="-mt-44">
            <div class="h-[38rem] md:h-96 bg-lighterdark shadow-2xl"></div>
            <div class="-mt-[27rem] md:-mt-[13.5rem] text-white">
              <div class="w-11/12 xl:w-[38rem] mx-auto text-center">
                <p class="font-bold italic text-xl">{birthyear + deathyear}</p>
                <img class="appear-effect-very-fast-fadein inline-block w-12 mt-1" src={`/flags/${nationality}.png`} alt={nationality} draggable={draggable} />
                <p class="font-bold text-lg mb-2">
                  {i18next.t("artists.nationality", { ns: "translation" }) + " " + nationality}
                </p>
                <p
                  class="relative text-[1.1rem] text-justify leading-[1.12rem] select-none z-10"
                  dangerouslySetInnerHTML={{ __html: info }}
                ></p>
              </div>

              {site && (
                <div class="relative w-11/12 mt-3 sm:mt-2">
                  <div class="paper min-h-8 max-w-[230px] ml-auto z-10 shadow-none">
                    <div class="top-tape"></div>
                    <a href={site} class="text-lighterdark text-base italic underline z-10 select-none" target="_blank" rel="noopener" draggable={draggable}>
                      {site}
                    </a>
                  </div>
                </div>
              )}

              {avatar && (
                <div class="-mt-12 xl:-mt-40 grid grid-cols-1 xl:grid-cols-3">
                  <div class="pt-16 sm:pt-12 md:pt-10 sm:pl-12 sm:pr-12">
                    <Avatar copyright={copyright} info={avatarInfo} name={artist} url={avatar} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {artistQuote && !queryParameters.alone && (
            <div class="w-full mx-auto mt-8 2xl:-mt-8 mb-4">
              <Quote data={artistQuote} delay={10} />
            </div>
          )}

          {copyright !== 2 ? (
            <Partial name="artist-collection">
              <CollectionSearch query={queryParameters} myslug={slug} type="artist" />
            </Partial>
          ) : (
            <Copyright />
          )}
        </div>
      </main>

      <WaterDrop
        backgroundColor="gray"
        color={color}
        isDropy
        pencilColor={secondaryColor}
      />
      <Footer color={color} />
    </>
  );
}
