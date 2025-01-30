import { asset, Partial } from "$fresh/runtime.ts";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { defineApp } from "$fresh/server.ts";
import { UrlBasePath } from "@/env.ts";

import Nav from "@islands/header/Nav.tsx";
import ToBottomButton from "@islands/ToBottomButton.tsx";
import ToTopButton from "@islands/ToTopButton.tsx";

export default defineApp((_, ctx) => {
  return (
    <html lang="en">
      <head>
        {/* Google tag */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-QCTN24H4SD"></script>
        <script src="/gtag.js"></script>

        {/* Meta */}
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta http-equiv="Content-Language" content="en" />
        <meta name="google" content="notranslate" />
        <meta key="words" name="keywords" content="arts" />
        <meta name="thumbnail" content={asset("/thumbnail.png")} />
        <meta property="og:image" content={asset("/thumbnail.png")} />
        <meta property="og:site_name" content="Urarts" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={UrlBasePath} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Urarts" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content={colorScheme[currentColorScheme].dark} />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content={colorScheme[currentColorScheme].dark} />
        <meta name="format-detection" content="telephone=no" />
        <link rel="manifest" href={asset("/manifest.json")} />

        {/* Favicon */}
        <link
          href={asset("/icons/favicon-16x16.png")}
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href={asset("/icons/favicon-32x32.png")}
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link
          href={asset("/icons/favicon-96x96.png")}
          rel="icon"
          type="image/png"
          sizes="96x96"
        />
        <link
          rel="icon"
          type="image/x-icon"
          href={asset("/icons/favicon.ico")}
        />
        <link
          rel="apple-touch-icon"
          href={asset("/icons/favicon-192x192.png")}
        />

        {/* Assets */}
        <link rel="preload" href="/brush-input-box.png" as="image" />
        <link rel="preload" href="/leonardo.png" as="image" />
        <link rel="preload" href="/liquid-mask-after.png" as="image" />
        <link rel="preload" href="/liquid-mask-before.png" as="image" />
        <link rel="preload" href="/monalisa.png" as="image" />
        <link rel="preload" href="/mural-mask.png" as="image" />
        <link rel="preload" href="/placeholder_150.png" as="image" />
        <link rel="preload" href="/wood-engraving.png" as="image" />
        <link rel="preload" href="/cursors/cursor-auto.png" as="image" />
        <link rel="preload" href="/cursors/cursor-grab.png" as="image" />
        <link rel="preload" href="/cursors/cursor-help.png" as="image" />
        <link rel="preload" href="/cursors/cursor-pointer.png" as="image" />
        <link rel="preload" href="/cursors/cursor-text.png" as="image" />
        <link rel="preload" href="/symbols/add.png" as="image" />
        <link rel="preload" href="/textures/abstractart.png" as="image" />
        <link rel="preload" href="/textures/artdeco.png" as="image" />
        <link rel="preload" href="/textures/artnouveau.png" as="image" />
        <link rel="preload" href="/textures/baroque.png" as="image" />
        <link rel="preload" href="/textures/classicism.png" as="image" />
        <link rel="preload" href="/textures/conceptualart.png" as="image" />
        <link rel="preload" href="/textures/cubism.png" as="image" />
        <link rel="preload" href="/textures/dadaism.png" as="image" />
        <link rel="preload" href="/textures/expressionnism.png" as="image" />
        <link rel="preload" href="/textures/fauvism.png" as="image" />
        <link rel="preload" href="/textures/futurism.png" as="image" />
        <link rel="preload" href="/textures/highrenaissance.png" as="image" />
        <link rel="preload" href="/textures/impressionnism.png" as="image" />
        <link rel="preload" href="/textures/japonism.png" as="image" />
        <link rel="preload" href="/textures/kitsch.png" as="image" />
        <link rel="preload" href="/textures/mannerism.png" as="image" />
        <link rel="preload" href="/textures/naiveart.png" as="image" />
        <link rel="preload" href="/textures/orientalism.png" as="image" />
        <link rel="preload" href="/textures/preraphaelitism.png" as="image" />
        <link rel="preload" href="/textures/qingdynasty.png" as="image" />
        <link rel="preload" href="/textures/regionalism.png" as="image" />
        <link rel="preload" href="/textures/rococo.png" as="image" />
        <link rel="preload" href="/textures/romanticism.png" as="image" />
        <link rel="preload" href="/textures/streetart.png" as="image" />
        <link rel="preload" href="/textures/surrealism.png" as="image" />
        <link rel="preload" href="/textures/symbolism.png" as="image" />
        <link rel="preload" href="/textures/ukiyoe.png" as="image" />
        <link rel="preload" href="/textures/unclassified.png" as="image" />

        {/* CSS & JS */}
        <script defer src={asset("/styles/lib/alpine-persist3.13.5.min.js")}></script>
        <script defer src={asset("/styles/lib/alpine3.13.5.min.js")}></script>
        <link href={asset("/styles/lib/tippy6.3.7.css")} rel="stylesheet" />
        <link href={asset("/styles/style.css")} rel="stylesheet" />
        <link href={asset("/styles/lib/nouislider.min.css")} rel="stylesheet" />
        <link href={asset("/styles/nouislider.css")} rel="stylesheet" />
        <script src={asset("/styles/lib/nouislider.min.js")}></script>
      </head>

      <body
        f-client-nav
        x-data="{
          navTheme: $persist(localStorage.getItem('navTheme')),
          openFamousArt: true,
          openTalentsArt: true,
          toggleNavTheme: function() { this.navTheme = (this.navTheme !== 'wave-colors') ? 'wave-colors' : 'header-paper'; }
        }"
        class={`flex flex-col min-h-screen font-brush`}
      >
        <Partial name="body">
          <Nav url={ctx.url} />
          <ctx.Component />
          <ToBottomButton />
          <ToTopButton />
        </Partial>
      </body>
    </html>
  );
});
