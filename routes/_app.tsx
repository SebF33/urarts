import { AppProps } from "$fresh/server.ts";
import { asset, Head } from "$fresh/runtime.ts";

export default function App({ Component }: AppProps) {
  return (
    <html lang="fr">
      <Head>
        <link
          href={asset("/styles/lib/nouislider.min.css")}
          rel="stylesheet"
        />
        <script src="/styles/lib/nouislider.min.js"></script>
        <link href={asset("/styles/lib/tippy6.3.7.css")} rel="stylesheet" />
        <link href={asset("/styles/style.css")} rel="stylesheet" />
      </Head>
      <body>
        <Component />
      </body>
    </html>
  );
}
