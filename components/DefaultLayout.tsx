import { asset, Head } from "$fresh/runtime.ts";
import { h } from "preact";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";

export default function DefaultLayout(props: {
  date?: string;
  desc?: string;
  tag?: string[];
  title: string;
  children: h.JSX.Element | h.JSX.Element[];
}) {
  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content={props.desc} />
        <meta key="words" name="keywords" content="arts" />
        <meta property="og:url" content="http://localhost:8000/" />
        <meta property="og:site_name" content={props.title} />
        <meta property="og:title" content={props.title} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={props.desc} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={props.title} />
        <meta name="twitter:description" content={props.desc} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="default"
        />
        <meta name="apple-mobile-web-app-title" content="Urarts" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="msapplication-TileColor"
          content={colorScheme[currentColorScheme].dark}
        />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta
          name="theme-color"
          content={colorScheme[currentColorScheme].dark}
        />
        <meta name="format-detection" content="telephone=no" />
        <title>{props.title}</title>
        <link rel="manifest" href="/manifest.json" />
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
      </Head>
      {props.children}
    </>
  );
}
