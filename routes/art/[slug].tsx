import { ArtistQuote, TagCollection } from "@utils/types.d.ts";
import { Db } from "@utils/db.ts";
import { DisplayCopyrightedArtist } from "@/env.ts";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import i18next from "i18next";
import "@utils/i18n/config.ts";
import { sql } from "kysely";

import AnimBrushStroke from "@islands/AnimBrushStroke.tsx";
import Avatar from "@islands/Avatar.tsx";
import CollectionSearch from "@islands/livesearch/CollectionSearch.tsx";
import Copyright from "@islands/paper/Copyright.tsx";
import { FacebookIcon, InstagramIcon } from "@components/Assets.tsx";
import Footer from "@islands/footer/Footer.tsx";
import MovementsPapers from "@islands/paper/MovementsPapers.tsx";
import PersoFooter from "@islands/footer/PersoFooter.tsx";
import Quote from "@islands/paper/Quote.tsx";
import Signature from "@islands/paper/Signature.tsx";
import TagsPapers from "@/islands/paper/TagsPapers.tsx";
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
  facebook: string;
  info: string;
  instagram: string;
  movements: Movement[];
  nationality: string;
  queryParameters: QueryParameters;
  secondaryColor: string;
  signature: string | null;
  site: string;
  slug: string;
  tags: TagCollection[];
  title: string;
}


export const handler: Handlers<ArtistPageProps> = {
  async GET(req: Request, ctx: FreshContext) {
    const lng = i18next.language;
    const { slug } = ctx.params;
    const url = new URL(req.url);

    const db = Db.getInstance();

    // Détails de l'artiste
    const artistDetails = await db
      .selectFrom("artist")
      .innerJoin("country", "artist.country_id", "country.id")
      .select([
        "first_name", "last_name",
        "avatar_url", "color", "secondary_color",
        "main_tags",
        "site_web", "facebook", "instagram",
        "birthyear", "deathyear",
        "signature", "copyright", "slug",
      ])
      .$if(lng === 'fr', (query) => query.select("avatar_info"))
      .$if(lng === 'en', (query) => query.select("avatar_info_en as avatar_info"))
      .$if(lng === 'fr', (query) => query.select("country.name as nationality"))
      .$if(lng === 'en', (query) => query.select("country.name_en as nationality"))
      .$if(lng === 'fr', (query) => query.select("info"))
      .$if(lng === 'en', (query) => query.select("info_en as info"))
      .$if(lng === 'fr', (query) => query.select("quote"))
      .$if(lng === 'en', (query) => query.select(sql<string>`CASE WHEN quote_en IS NOT NULL THEN quote_en ELSE quote END`.as("quote")))
      .where("slug", "=", slug)
      .executeTakeFirst();

    if (!artistDetails) {
      return ctx.renderNotFound();
    }

    // Pas de rendu si copyright
    if (!DisplayCopyrightedArtist && artistDetails.copyright === 2) {
      return ctx.renderNotFound();
    }

    // Paramètres de l'URL
    const searchParams = url.searchParams;
    const queryParameters: QueryParameters = {
      alone: searchParams.has("alone"),
      fromLeonardo: searchParams.has("fromleonardo"),
      id: searchParams.get("id") || "",
    };

    // Mouvements de l'artiste
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

    // Tags principaux des œuvres de l'artiste
    const artsTagsQuery = await db
      .selectFrom("tag")
      .innerJoin("art_tag", "tag.id", "art_tag.tag_id")
      .innerJoin("art", "art.id", "art_tag.art_id")
      .innerJoin("artist", "artist.id", "art.owner_id")
      .select(["tag.id", "tag.slug"])
      .$if(lng === 'fr', (query) => query.select("tag.name"))
      .$if(lng === 'en', (query) => query.select("tag.name_en as name"))
      .distinct()
      .where("artist.slug", "=", slug)
      .$if(lng === 'fr', (query) => query.orderBy("tag.name"))
      .$if(lng === 'en', (query) => query.orderBy("tag.name_en"))
      .execute();

    const mainTagsStr = artistDetails?.main_tags ?? "";
    const mainTagSlugs = mainTagsStr
      .split(",")
      .map(s => s.trim().toLowerCase())
      .filter(Boolean);

    let filteredTags = artsTagsQuery;
    if (mainTagSlugs.length > 0) {
      const wanted = new Set(mainTagSlugs);
      filteredTags = artsTagsQuery.filter(t =>
        t?.slug && wanted.has(t.slug.toLowerCase())
      );

      filteredTags.sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
      );
    }

    const artsTags = filteredTags.map((tag, index) => {
      const marginClasses = ["-ml-1", "ml-1", "-ml-1", "ml-1", "-ml-1", "ml-1"];
      const rotationDegrees = [-3, 3, -1, 2, -2, 6];
      const rotation = rotationDegrees[index % rotationDegrees.length];

      return {
        ...tag,
        position: marginClasses[index % marginClasses.length],
        rotation,
      };
    });

    // Nom et description de l'artiste
    const artist = artistDetails.first_name ? `${artistDetails.first_name} ${artistDetails.last_name}` : artistDetails.last_name;
    const description = `${i18next.t("meta.collection.desc", { ns: "translation" })} ${artist}.`;

    // Rendu
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
      facebook: artistDetails.facebook,
      info: artistDetails.info,
      instagram: artistDetails.instagram,
      movements: movementLabels,
      nationality: artistDetails.nationality,
      queryParameters,
      signature: artistDetails.signature ? artistDetails.signature : null,
      secondaryColor: artistDetails.secondary_color,
      site: artistDetails.site_web,
      slug: artistDetails.slug,
      tags: artsTags,
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
    facebook,
    info,
    instagram,
    movements,
    nationality,
    queryParameters,
    secondaryColor,
    signature,
    site,
    slug,
    tags,
    title,
  } = props.data;

  const draggable = false;
  const isPersoGallery = props.url.pathname.endsWith("/gallery");


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
        class="flex-grow max-h-screen scrollable overflow-y-scroll custom-scrollbar"
      >
        <div class="relative w-auto flex flex-col mx-auto">
          {/* Post-it : mouvements */}
          {movements.length > 0 && (
            <MovementsPapers
              artistAvatar={avatar}
              artistName={artist}
              artistSlug={slug}
              draggable={draggable}
              movements={movements}
            />
          )}

          <div class="mx-auto mt-8 z-10">
            {/* Coup de pinceau titré */}
            <AnimBrushStroke
              key={`brushstroke-artist-${slug}`}
              color={color}
              font="brush"
              secondaryColor={secondaryColor}
              title={artist}
              type="artist"
            />
          </div>

          <div class="-mt-44">
            <div class="h-[38rem] md:h-96 bg-lighterdark shadow-2xl"></div>
            <div class="-mt-[27rem] md:-mt-[13.5rem] text-white">
              {/* Description */}
              <div class="w-11/12 xl:w-[38rem] mx-auto text-center">
                <p class="font-bold italic text-xl">{birthyear + deathyear}</p>
                <img class="appear-effect-very-fast-fadein inline-block w-12 mt-1" src={`/icons/${nationality}.png`} alt={nationality} draggable={draggable} />
                <p class="font-bold text-lg mb-2">
                  {i18next.t("artists.nationality", { ns: "translation" }) + " " + nationality}
                </p>
                <p
                  class="relative text-white/90 text-[1.1rem] text-justify leading-[1.12rem] select-none z-10"
                  dangerouslySetInnerHTML={{ __html: info }}
                ></p>
              </div>

              <div class="md:min-h-[68px] relative w-11/12 mt-3 sm:mt-2 xl:-mt-2 mx-auto flex flex-col xl:flex-row xl:items-start xl:justify-between gap-4 xl:gap-6">
                {/* Post-it : site web */}
                {site && (
                  <div class="paper min-h-8 ml-auto z-10">
                    <div class="top-tape"></div>
                    <a
                      href={site}
                      class="text-lighterdark text-base italic underline z-10 select-none px-1 block"
                      target="_blank"
                      rel="noopener"
                      draggable={draggable}
                    >
                      {site}
                    </a>
                  </div>
                )}

                {/* Post-it : réseaux sociaux */}
                <div class="flex gap-2 mt-3 justify-end xl:justify-end">
                  {facebook && (
                    <a
                      href={facebook}
                      title="Facebook"
                      class="text-lighterdark"
                      target="_blank"
                      rel="noopener noreferrer"
                      draggable={draggable}
                      aria-label="Facebook"
                    >
                      <div class="paper w-9 h-9 flex items-center justify-center">
                        <div class="top-tape"></div>
                        <FacebookIcon aria-hidden="true" />
                      </div>
                    </a>
                  )}
                  {instagram && (
                    <a
                      href={instagram}
                      title="Instagram"
                      class="text-lighterdark"
                      target="_blank"
                      rel="noopener noreferrer"
                      draggable={draggable}
                      aria-label="Instagram"
                    >
                      <div class="paper w-9 h-9 flex items-center justify-center">
                        <div class="top-tape"></div>
                        <InstagramIcon aria-hidden="true" />
                      </div>
                    </a>
                  )}
                </div>
              </div>

              {/* Post-it : tags */}
              <div class="relative w-full xl:max-w-[880px] mx-auto z-10 hidden xl:block">
                {tags && tags.length > 0 && (
                  <TagsPapers
                    artistAvatar={avatar}
                    artistName={artist}
                    artistSlug={slug}
                    draggable={draggable}
                    ispersogallery={isPersoGallery}
                    tags={tags}
                  />
                )}
              </div>

              {/* Avatar */}
              {avatar && (
                <div class="-mt-12 md:-mt-24 xl:-mt-48 grid grid-cols-1 xl:grid-cols-3">
                  <div class="pt-16 sm:pt-12 md:pt-10 sm:pl-12 sm:pr-12">
                    <Avatar copyright={copyright} info={avatarInfo} name={artist} url={avatar} />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div class={`${artistQuote || signature ? 'min-h-[126px]' : ''} flex justify-end w-full mx-auto mt-8 xl:-mt-16 2xl:-mt-24 mb-4`}>
            {/* Post-it : citation avec signature */}
            {artistQuote && !queryParameters.alone && (
              <div class="inline-block mx-auto xl:mr-12">
                <Quote data={artistQuote} delay={10} small />
              </div>
            )}
            {/* Post-it : signature seule si pas de citation */}
            {!artistQuote && !queryParameters.alone && signature && (
              <div class="inline-block mx-auto xl:mr-32">
                <Signature data={signature} />
              </div>
            )}
          </div>

          {/* Œuvres sinon copyright */}
          {copyright !== 2 ? (
            <CollectionSearch
              key={`collection-artist-${slug}`}
              ispersogallery={isPersoGallery}
              query={queryParameters}
              myslug={slug}
              type="artist"
            />
          ) : (
            <Copyright />
          )}
        </div>
      </main>

      {!isPersoGallery ? (
        <>
          <WaterDrop
            backgroundColor="gray"
            color={color}
            isDropy
            pencilColor={secondaryColor}
          />
          <Footer color={color} />
        </>
      ) : (
        <PersoFooter
          artist={artist}
          birthyear={birthyear}
          color={color}
          facebook={facebook}
          instagram={instagram}
        />
      )}
    </>
  );
}
