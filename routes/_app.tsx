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

        {/* CSS & JS */}
        <script defer src="/styles/lib/alpine-persist3.13.5.min.js"></script>
        <script defer src="/styles/lib/alpine3.13.5.min.js"></script>
        <link href={asset("/styles/lib/tippy6.3.7.css")} rel="stylesheet" />
        <link href={asset("/styles/style.css")} rel="stylesheet" />
        <link href={asset("/styles/lib/nouislider.min.css")} rel="stylesheet" />
        <link href={asset("/styles/nouislider.css")} rel="stylesheet" />
        <script src="/styles/lib/nouislider.min.js"></script>
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
