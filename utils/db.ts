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

interface ArtistTable {
  id: Generated<number>;
  first_name: string;
  last_name: string | null;
  gender: "Femme" | "Homme" | "Autre";
  avatar_url: string;
  signature: string | null;
  slug: string;
  modified_at: ColumnType<Date, string | undefined, never>;
}

interface ArtTable {
  id: Generated<number>;
  owner_id: number;
  name: string;
  movement:
    | "Art déco"
    | "Art naïf"
    | "Art nouveau"
    | "Baroque"
    | "Cloisonnisme"
    | "Cubisme"
    | "Haute Renaissance"
    | "Impressionnisme"
    | "Période bleue"
    | "Période rose"
    | "Postimpressionnisme"
    | "Réalisme"
    | "Renaissance italienne"
    | "Romantisme"
    | "Surréalisme";
  url: string;
  modified_at: ColumnType<Date, string | undefined, never>;
}

export type Artist = Selectable<ArtistTable>;
export type Art = Selectable<ArtTable>;

export interface DbSchema {
  artist: ArtistTable;
  art: ArtTable;
}

export class Db {
  static #instance: Kysely<DbSchema>;

  private constructor() {
  }

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
          return new SqliteDriver("./data/urarts.db");
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
