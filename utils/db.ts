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

interface PersonTable {
  id: Generated<number>;
  first_name: string;
  last_name: string;
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
  movement: "Art déco" | "Impressionnisme";
  url: string;
  modified_at: ColumnType<Date, string | undefined, never>;
}

export type Person = Selectable<PersonTable>;
export type Art = Selectable<ArtTable>;

export interface DbSchema {
  person: PersonTable;
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
