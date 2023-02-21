import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { css, tw } from "@twind";
import { UnknownPageProps } from "$fresh/server.ts";

import DefaultLayout from "@components/DefaultLayout.tsx";
import ErrorLayout from "@components/ErrorLayout.tsx";
import Footer from "@islands/Footer.tsx";
import Nav from "@islands/Nav.tsx";

export default function NotFoundPage({ url }: UnknownPageProps) {
  return (
    <DefaultLayout
      title={`404 Page introuvable : ${url.pathname}`}
      desc={`404 Page introuvable : ${url.pathname}`}
    >
      <div
        class={tw`flex flex-col min-h-screen ${
          css({
            background: `url(/bg)`,
            "background-color": `${colorScheme[currentColorScheme].white}`,
            "background-position": "center",
            "background-size": "4000px",
            "-webkit-tap-highlight-color": "transparent",
          })
        }`}
      >
        <Nav />
        <main
          class={tw`flex-grow`}
        >
          <ErrorLayout firstDigit="4" secondDigit="0" thirdDigit="4" />
          <div
            class={tw`font-brush mx-auto ${
              css(
                {
                  "color": `${colorScheme[currentColorScheme].lighterdark}`,
                },
              )
            }`}
          >
            <h2 class={tw`text-center text-4xl font-bold`}>Erreur 404 !</h2>
            <p class={tw`text-center text-xl font-bold`}>
              Page introuvable : {url.pathname}
            </p>
          </div>
        </main>
        <Footer color={colorScheme[currentColorScheme].lighterdark} />
      </div>
    </DefaultLayout>
  );
}
