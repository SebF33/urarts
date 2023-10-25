import { DatabaseName } from "../env.ts";
import { SqliteDriver } from "@utils/sqlite_driver.ts";

import {
  ColumnType,
  Generated,
  Kysely,
  Selectable,
  SqliteAdapter,
  SqliteIntrospector,
  SqliteQueryCompiler,
} from "kysely";

interface ArtTable {
  id: Generated<number>;
  owner_id: number;
  name: string;
  movement_id: number;
  polyptych: number; // Nombre de panneaux
  frame: number; // Type d'encadrement (0: street |1: canvas |2: cadre sans passe-partout |3: cadre avec passe-partout |4: cadre avec passe-partout sur photo)
  url: string; // Panneau central
  url_2?: string; // Panneau à gauche du central
  url_3?: string; // Panneau à droite du central
  url_4?: string; // Panneau à l'extrême gauche du central
  url_5?: string; // Panneau à l'extrême droite du central
  info: string | null;
  histocharacter: number; // Personnage historique (0: non |1: oui)
  histocharactername: string | null;
  histocharacterbirthyear: number | null;
  histocharacterdeathyear: number | null;
  histocharacterinfo: string | null;
  modified_at: ColumnType<Date, string | undefined, never>;
}

interface ArtistTable {
  id: Generated<number>;
  first_name: string | null;
  last_name: string;
  gender: "Femme" | "Homme" | "Autre";
  nationality: string;
  birthyear: string;
  deathyear: string;
  avatar_url?: string;
  signature: string | null;
  quote: string | null;
  color: string;
  site_web: string | null;
  info: string | null;
  slug: string;
  copyright: number; // Droit d'auteur (0: domaine public |1: autorisation |2: protégé)
  modified_at: ColumnType<Date, string | undefined, never>;
}

interface MovementTable {
  id: Generated<number>;
  name: string;
  font: string;
  slug: string;
  modified_at: ColumnType<Date, string | undefined, never>;
}

export type Art = Selectable<ArtTable>;
export type Artist = Selectable<ArtistTable>;
export type Movement = Selectable<MovementTable>;

export interface DbSchema {
  art: ArtTable;
  artist: ArtistTable;
  movement: MovementTable;
}

export class Db {
  static #instance: Kysely<DbSchema>;

  public static getInstance(): Kysely<DbSchema> {
    if (!Db.#instance) {
      Db.#instance = Db.#initDb();
    }

    return Db.#instance;
  }

  static #initDb() {
    return new Kysely<DbSchema>({
      dialect: {
        createAdapter() {
          return new SqliteAdapter();
        },
        createDriver() {
          return new SqliteDriver("./data/" + DatabaseName);
        },
        createIntrospector(db: Kysely<unknown>) {
          return new SqliteIntrospector(db);
        },
        createQueryCompiler() {
          return new SqliteQueryCompiler();
        },
      },
    });
  }
}
