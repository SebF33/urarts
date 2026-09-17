import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { define } from "@/utils.ts";
import { Head } from "fresh/runtime";
import i18next from "i18next";
import "@utils/i18n/config.ts";
import { PageProps } from "fresh";

import ApiEndpointNotePaper from "@islands/paper/ApiEndpointNotePaper.tsx";
import Footer from "@islands/footer/Footer.tsx";
import Title from "@islands/paper/Title.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";
import { UrlBasePath } from "@/env.ts";


type Param = {
  name: string;
  key: string;
  example?: string;
};

type Endpoint = {
  path: string;
  key: string;
  params: Param[];
  example: string;
};


export const handler = define.handlers({
  GET(_ctx) {
    const lng = i18next.language;

    return {
      data: { lng },
    };
  },
});


const endpoints: Endpoint[] = [
  {
    path: "/api/arts",
    key: "arts",
    params: [
      { name: "lng", key: "lng", example: "fr" },
      { name: "offset", key: "offset", example: "20" },
      { name: "name", key: "name" },
      { name: "tag", key: "tag" },
      { name: "random", key: "random" },
      { name: "geolocation", key: "geolocation" },
    ],
    example: `${UrlBasePath}/api/arts?lng=fr&offset=20`,
  },
  {
    path: "/api/artists",
    key: "artists",
    params: [
      { name: "lng", key: "lng", example: "fr" },
      { name: "gender", key: "gender" },
      { name: "name", key: "name" },
      { name: "nationality", key: "nationality" },
      { name: "years", key: "years", example: "1800,1900" },
    ],
    example: `${UrlBasePath}/api/artists?lng=fr&gender=women`,
  },
  {
    path: "/api/collection",
    key: "collection",
    params: [
      { name: "lng", key: "lng", example: "fr" },
      { name: "type", key: "type", example: "artist" },
      { name: "slug", key: "slug" },
      { name: "name", key: "name" },
      { name: "alone", key: "alone" },
      { name: "id", key: "id" },
      { name: "aloneartistslug", key: "aloneartistslug" },
      { name: "years", key: "years" },
    ],
    example: `${UrlBasePath}/api/collection?lng=en&type=famousart`,
  },
];


const CONTENT = {
  fr: {
    meta: {
      title: "API Urarts",
      desc:
        "Documentation des API de Urarts : œuvres, artistes et collections, avec leurs paramètres et des exemples d'appel.",
    },
    tableHeaders: {
      param: "Paramètre",
      description: "Description",
    },
    exampleLabel: "ex :",
    openInNewTab: "Ouvrir dans un nouvel onglet",
    endpoints: {
      arts: {
        title: "Œuvres d'art",
        description:
          "Liste paginée des œuvres d'art (20 par page), avec filtres sur le nom, un tag ou une sélection géolocalisée. Peut aussi renvoyer une sélection aléatoire.",
        params: {
          lng: 'Langue des résultats ("fr" ou "en")',
          offset: "Décalage pour la pagination (20 résultats par page)",
          name: "Filtre sur le nom de l'œuvre ou de l'artiste",
          tag: "Filtre sur le slug d'un tag",
          random: "Présence du paramètre = tri aléatoire",
          geolocation:
            "Présence du paramètre = ne renvoie que les œuvres géolocalisées",
        },
      },
      artists: {
        title: "Artistes",
        description:
          "Liste des artistes, avec filtres sur le nom, le genre, la nationalité ou une période (années de naissance/décès).",
        params: {
          lng: 'Langue des résultats ("fr" ou "en")',
          gender: "Filtre sur le genre de l'artiste",
          name: "Filtre sur le nom ou le prénom",
          nationality: 'Slug du pays, ou "world" pour tous les pays',
          years: 'Période au format "début,fin"',
        },
      },
      collection: {
        title: "Collection",
        description:
          "Point d'entrée principal pour récupérer des œuvres selon un contexte précis : la collection complète d'un artiste ou d'un mouvement, les œuvres célèbres, un personnage historique, un tag, ou les œuvres des talents mis en avant.",
        params: {
          lng: 'Langue des résultats ("fr" ou "en")',
          type:
            'Type de collection : "artist", "movement", "famousart", "histocharacters", "tag" ou "talentsart"',
          slug: "Slug de l'artiste, du mouvement ou du tag (selon le type)",
          name: "Filtre sur le nom (œuvres ou personnages historiques)",
          alone: "Présence du paramètre = ne renvoie qu'une seule œuvre",
          id: 'Identifiant de l\'œuvre (utilisé avec "alone")',
          aloneartistslug: "Restreint un mouvement ou un tag à un seul artiste",
          years:
            'Période historique, format "début,fin" (personnages historiques)',
        },
      },
    },
  },
  en: {
    meta: {
      title: "Urarts API",
      desc:
        "Urarts API documentation: artworks, artists and collections, with their parameters and call examples.",
    },
    tableHeaders: {
      param: "Parameter",
      description: "Description",
    },
    exampleLabel: "e.g.:",
    openInNewTab: "Open in new tab",
    endpoints: {
      arts: {
        title: "Artworks",
        description:
          "Paginated list of artworks (20 per page), with filters on name, a tag, or a geolocated selection. Can also return a random selection.",
        params: {
          lng: 'Result language ("fr" or "en")',
          offset: "Pagination offset (20 results per page)",
          name: "Filter on the artwork's or artist's name",
          tag: "Filter on a tag slug",
          random: "Presence of the parameter = random order",
          geolocation:
            "Presence of the parameter = only return geolocated artworks",
        },
      },
      artists: {
        title: "Artists",
        description:
          "List of artists, with filters on name, gender, nationality, or a period (birth/death years).",
        params: {
          lng: 'Result language ("fr" or "en")',
          gender: "Filter on the artist's gender",
          name: "Filter on first or last name",
          nationality: 'Country slug, or "world" for all countries',
          years: 'Period, formatted "start,end"',
        },
      },
      collection: {
        title: "Collection",
        description:
          "Main entry point for retrieving artworks in a specific context: an artist's or movement's full collection, famous artworks, a historical figure, a tag, or the featured talents' artworks.",
        params: {
          lng: 'Result language ("fr" or "en")',
          type:
            'Collection type: "artist", "movement", "famousart", "histocharacters", "tag" or "talentsart"',
          slug: "Artist, movement, or tag slug (depending on type)",
          name: "Filter on name (artworks or historical figures)",
          alone: "Presence of the parameter = return a single artwork only",
          id: 'Artwork id (used with "alone")',
          aloneartistslug: "Restricts a movement or tag to a single artist",
          years:
            'Historical period, formatted "start,end" (historical figures)',
        },
      },
    },
  },
} as const;


export default function ApiPage(
  props: PageProps<{
    lng: "fr" | "en";
  }>,
) {
  const { lng } = props.data;
  const content = CONTENT[lng];
  const { title, desc } = content.meta;

  const cards = endpoints.map((endpoint) => {
    const endpointContent = content.endpoints[
      endpoint.key as keyof typeof content.endpoints
    ];

    return {
      path: endpoint.path,
      title: endpointContent.title,
      description: endpointContent.description,
      example: endpoint.example,
      params: endpoint.params.map((param) => ({
        name: param.name,
        description: endpointContent.params[
          param.key as keyof typeof endpointContent.params
        ],
        example: param.example,
      })),
    };
  });


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

      <main
        id="page"
        data-name="api"
        class="flex-grow"
      >
        <div class={`p-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
          {/* Titre de la page */}
          <Title
            name="api"
            dimension="min-h-[30px] max-w-[122px] md:min-h-[60px] md:max-w-[230px]"
            margin="mt-2 md:mt-5"
          />
          {/* Documentation des API */}
          <div class="max-w-4xl mx-auto mt-12 mb-24 px-4 sm:px-6 lg:px-8 pb-24 text-sm md:text-base">
            {cards.map((card) => (
              <ApiEndpointNotePaper
                key={card.path}
                card={card}
                tableHeaders={content.tableHeaders}
                exampleLabel={content.exampleLabel}
                openInNewTab={content.openInNewTab}
              />
            ))}
          </div>
        </div>
      </main>

      <WaterDrop
        backgroundColor="gray"
        color={colorScheme[currentColorScheme].dark}
        isDropy
        pencilColor={colorScheme[currentColorScheme].dark}
      />
      <Footer color={colorScheme[currentColorScheme].dark} />
    </>
  );
}
