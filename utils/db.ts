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
  url: string;
  modified_at: ColumnType<Date, string | undefined, never>;
}

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

interface MovementTable {
  id: Generated<number>;
  name: string;
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
          return new SqliteDriver("./data/urarts_data.db");
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
