// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/_404.tsx";
import * as $1 from "./routes/_app.tsx";
import * as $2 from "./routes/api/artists.ts";
import * as $3 from "./routes/api/arts.ts";
import * as $4 from "./routes/api/movements.ts";
import * as $5 from "./routes/art/[slug].tsx";
import * as $6 from "./routes/artists.tsx";
import * as $7 from "./routes/arts.tsx";
import * as $8 from "./routes/bg.tsx";
import * as $9 from "./routes/index.tsx";
import * as $10 from "./routes/mouvement/[slug].tsx";
import * as $11 from "./routes/mouvements.tsx";
import * as $$0 from "./islands/ArtistsSearch.tsx";
import * as $$1 from "./islands/ArtsSearch.tsx";
import * as $$2 from "./islands/Counter.tsx";
import * as $$3 from "./islands/Footer.tsx";
import * as $$4 from "./islands/Header.tsx";
import * as $$5 from "./islands/WaterDrop.tsx";

const manifest = {
  routes: {
    "./routes/_404.tsx": $0,
    "./routes/_app.tsx": $1,
    "./routes/api/artists.ts": $2,
    "./routes/api/arts.ts": $3,
    "./routes/api/movements.ts": $4,
    "./routes/art/[slug].tsx": $5,
    "./routes/artists.tsx": $6,
    "./routes/arts.tsx": $7,
    "./routes/bg.tsx": $8,
    "./routes/index.tsx": $9,
    "./routes/mouvement/[slug].tsx": $10,
    "./routes/mouvements.tsx": $11,
  },
  islands: {
    "./islands/ArtistsSearch.tsx": $$0,
    "./islands/ArtsSearch.tsx": $$1,
    "./islands/Counter.tsx": $$2,
    "./islands/Footer.tsx": $$3,
    "./islands/Header.tsx": $$4,
    "./islands/WaterDrop.tsx": $$5,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
