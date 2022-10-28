// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/_app.tsx";
import * as $1 from "./routes/api/artists.ts";
import * as $2 from "./routes/api/arts.ts";
import * as $3 from "./routes/art/[slug].tsx";
import * as $4 from "./routes/artists.tsx";
import * as $5 from "./routes/arts.tsx";
import * as $6 from "./routes/bg.tsx";
import * as $7 from "./routes/index.tsx";
import * as $$0 from "./islands/ArtistsSearch.tsx";
import * as $$1 from "./islands/ArtsSearch.tsx";
import * as $$2 from "./islands/Counter.tsx";
import * as $$3 from "./islands/Footer.tsx";
import * as $$4 from "./islands/Header.tsx";
import * as $$5 from "./islands/WaterDrop.tsx";

const manifest = {
  routes: {
    "./routes/_app.tsx": $0,
    "./routes/api/artists.ts": $1,
    "./routes/api/arts.ts": $2,
    "./routes/art/[slug].tsx": $3,
    "./routes/artists.tsx": $4,
    "./routes/arts.tsx": $5,
    "./routes/bg.tsx": $6,
    "./routes/index.tsx": $7,
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
