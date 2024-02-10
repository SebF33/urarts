import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

import Footer from "@islands/footer/Footer.tsx";
import Mona from "@islands/Mona.tsx";
import WaterDrop from "@islands/footer/WaterDrop.tsx";

export const handler: Handlers = {
  async GET(_, ctx) {
    // Couleurs Mona Lisa
    const randomColorsIndex = Math.floor(Math.random() * 7);
    const colors = [
      "#c89b7c",
      "#5e3519",
      "#483316",
      "#667362",
      "#6a3726",
      "#413b25",
      "#2e2a1f",
    ];
    const color = colors[randomColorsIndex];

    return ctx.render({ color });
  },
};

export default function AboutPage(
  props: PageProps<{
    color: string;
  }>,
) {
  const { color } = props.data;
  const desc = "À propos de Urarts...";
  const title = "Urarts - À propos";
  const draggable = false;

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

      <main id="page" data-name="about" class="mona-page flex-grow">
        <div class="p-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="paper min-h-[60px] max-w-[230px] mt-5 mb-6">
            <div class="top-tape"></div>
            <h1 class="text-5xl font-medium mx-auto">
              À propos
            </h1>
          </div>

          <div class="paper max-w-[700px] mx-auto mt-12 md:mt-2 mb-2">
            <div class="tape-section"></div>
            <div class="flex flex-col m-4 font-medium">
              <p class="mb-4 text-2xl leading-6">
                Le site <strong>Urarts</strong>{" "}
                est réalisé avec passion pour l’<strong>Art</strong> et le{" "}
                <strong>Dév</strong>.
              </p>
              <p class="mb-4 text-xl leading-6">
                <span class="font-bold underline">Moyens utilisés</span>{" "}
                : TypeScript, Deno, Fresh, Kysely, Ky, Twind, Everblush,
                Alpine.js, Tippy.js, Chart.js, noUiSlider, Fly.io, Illustrator, Photoshop.
              </p>
              <p class="text-xl leading-6">
                <span class="font-bold underline">Politique de droit d’auteur</span>{" "}
                : Urarts montre des œuvres d’art du domaine public et tente d’obtenir l’autorisation pour celles protégées par le droit d’auteur.
                Le but de ce site est d’utiliser ces œuvres historiques à des fins d’information et d’éducation.
                Les visuels sont des images à faible résolution non adaptées à un usage commercial.
                Veuillez vous adresser au créateur du site via son adresse email{" "}
                <a href="mailto:sebastien.flouriot@urarts.art" class="relative underline z-10">sebastien.flouriot@urarts.art</a>{" "}
                en cas de demande ou de litige liés à l’exploitation de ces visuels.
              </p>
              <a
                href="https://fresh.deno.dev"
                class="inline-block ml-auto z-10"
                draggable={draggable}
                target="_blank"
              >
                <img
                  class="w-32"
                  src="/deno-plush.svg"
                  alt="deno-plush"
                  draggable={draggable}
                />
              </a>
            </div>
            <div class="tape-section"></div>
          </div>

          <Mona />
        </div>
      </main>

      <WaterDrop
        color={color}
        isDropy
        pencilColor={color}
      />
      <Footer color={color} />
    </>
  );
}
