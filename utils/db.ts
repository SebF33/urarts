import { DatabaseName } from "@/env.ts";
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
  first_name: string | null; // Prénom de l'artiste
  last_name: string; // Nom ou surnom de l'artiste
  gender: "Femme" | "Homme" | "Autre"; // Genre de l'artiste
  nationality: string; // Pays d'origine de l'artiste
  birthyear: string; // Année de naissance de l'artiste
  deathyear: string; // Année de décès de l'artiste ("": non renseignée)
  avatar_url: string; // Avatar de l'artiste
  avatar_info: string; // Informations sur l'avatar de l'artiste (fr)
  avatar_info_en: string; // Informations sur l'avatar de l'artiste (en)
  signature: string | null; // Signature
  quote: string | null; // Citation de l'artiste (fr)
  quote_en: string | null; // Citation de l'artiste (en)
  color: string; // Couleur primaire de l'artiste
  secondary_color: string; // Couleur secondaire de l'artiste
  site_web: string | null; // Lien vers le site internet de l'artiste
  info: string | null; // Informations sur l'artiste (fr)
  info_en: string | null; // Informations sur l'artiste (en)
  copyright: number; // Droit d'auteur (0: domaine public |1: autorisation |2: protégé)
  slug: string;
  modified_at: ColumnType<Date, string | undefined, never>;
}

interface MovementTable {
  id: Generated<number>;
  name: string; // Nom du mouvement artistique (fr)
  name_en: string; // Nom du mouvement artistique (en)
  font: string; // Police associée au mouvement artistique
  info: string; // Informations sur le mouvement artistique (fr)
  info_en: string; // Informations sur le mouvement artistique (en)
  slug: string;
  modified_at: ColumnType<Date, string | undefined, never>;
}

interface ArtTable {
  id: Generated<number>;
  owner_id: number;
  movement_id: number;
  name: string; // Nom de l'œuvre d'art (fr)
  polyptych: number; // Nombre de panneaux
  frame: number; // Type d'encadrement (-1: atypique |0: street |1: canvas |2: cadre sans passe-partout |3: cadre avec passe-partout |4: cadre avec passe-partout sur photo)
  url: string; // Panneau central
  url_2: string | null; // Panneau à gauche du central
  url_3: string | null; // Panneau à droite du central
  url_4: string | null; // Panneau à l'extrême gauche du central
  url_5: string | null; // Panneau à l'extrême droite du central
  gap_1: string | null; // Décalage du panneau central
  gap_2: string | null; // Décalage du panneau à gauche du central
  gap_3: string | null; // Décalage du panneau à droite du central
  gap_4: string | null; // Décalage du panneau à l'extrême gauche du central
  gap_5: string | null; // Décalage du panneau à l'extrême droite du central
  info: string; // Informations sur l'œuvre d'art (fr)
  info_en: string; // Informations sur l'œuvre d'art (en)
  famous_order: number | null; // Numéro d'ordre de célébrité
  histocharacter: number; // Personnage historique (0: non |1: oui)
  histocharactername: string | null; // Nom du personnage historique
  histocharacterbirthyear: number | null; // Année de naissance du personnage historique
  histocharacterdeathyear: number | null; // Année de décès du personnage historique
  histocharacterinfo: string | null; // Informations sur le personnage historique (fr)
  histocharacterinfo_en: string | null; // Informations sur le personnage historique (en)
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
