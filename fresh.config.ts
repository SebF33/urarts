import twindPlugin from "$fresh/plugins/twindv1.ts";
import twindConfig from "./twind.config.ts";
import type { FreshConfig } from "$fresh/server.ts";

export default {
  plugins: [
    twindPlugin(twindConfig),
  ],
} as FreshConfig;
