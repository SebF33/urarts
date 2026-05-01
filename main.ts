import { App, cors, csp, csrf, staticFiles } from "fresh";
import { type State } from "./utils.ts";
import {
  URL_GA,
  URL_GT,
  URL_RC,
  URL_URARTS_ART,
  URL_URARTS_DEV,
} from "@utils/constants.ts";

export const app = new App<State>();

const isDev = Deno.env.get("DENO_ENV") === "development";

const allowedOrigins = [
  URL_URARTS_ART,
  URL_URARTS_DEV,
  ...(isDev ? ["http://127.0.0.1:5173", "http://localhost:8000"] : []),
];

// Fichiers statiques
app.use(staticFiles());

// CORS
app.use(cors({
  origin: allowedOrigins,
  allowHeaders: [
    "Content-Type",
    "X-Requested-With",
    "Authorization",
  ],
  allowMethods: [
    "GET",
    "OPTIONS",
  ],
  maxAge: 600,
  credentials: true,
}));

// CSRF
app.use(csrf({
  origin: allowedOrigins,
}));

// CSP
app.use(csp({
  csp: [
    `default-src 'self'`,
    `script-src 'self' ${URL_GA} ${URL_GT} 'unsafe-inline' 'unsafe-eval' 'inline-speculation-rules'`,
    `object-src 'none'`,
    `base-uri 'none'`,
    `style-src 'self' 'unsafe-inline'`,
    `child-src 'self'`,
    `img-src 'self' ${URL_GA} data: blob: ${URL_URARTS_ART} ${URL_URARTS_DEV}`,
    `media-src 'self' data: blob: ${URL_URARTS_ART} ${URL_URARTS_DEV}`,
    `connect-src 'self' ${URL_URARTS_ART} ${URL_URARTS_DEV} ${URL_GA} ${URL_GT} ${URL_RC}`,
    `font-src 'self'`,
    `worker-src 'self'`,
    `frame-src 'self'`,
    `frame-ancestors 'self'`,
  ],
}));

// Garantir que les chemins d'URL se terminent toujours par un slash
//app.use(trailingSlashes("always"));

// Garantir que les chemins d'URL ne se terminent jamais par un slash
//app.use(trailingSlashes("never"));

// Routes
app.fsRoutes();
