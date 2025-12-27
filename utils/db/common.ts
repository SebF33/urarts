import { Any } from "any";
import { Db, DbSchema } from "@utils/db.ts";
import { Kysely } from "kysely";


// InnerHTML
export const pageInfoStyle = 'style="font-weight:600; text-decoration-line:underline"';



// Fonction utilitaire : insérer en base les tags d'une œuvre
export async function insertArtTags(
  artId: number,
  tagSlugs: string[],
): Promise<void> {
  // récupération des tags
  const db = Db.getInstance();
  const tagRows = await db.selectFrom("tag").select(["id", "slug"]).execute();
  const tagMap = new Map(tagRows.map((tag) => [tag.slug, tag.id]));

  // filtrer les tags vides
  const validTagSlugs = tagSlugs.filter(slug => slug.trim() !== "");

  // insertion des tags d'une œuvre
  for (const slug of validTagSlugs) {
    const tagId = tagMap.get(slug);
    if (!tagId) {
      throw new Error(`Tag non trouvé : ${slug}`);
    }
    await db.insertInto("art_tag").values({ art_id: artId, tag_id: tagId }).execute();
  }
}



// Fonction utilitaire : normaliser un texte
export function normalizeText(str: string): string {
  return str
    .normalize("NFD") // décompose les accents (é -> e + ́)
    .replace(/[\u0300-\u036f]/g, "") // supprime les diacritiques
    .toLowerCase(); // passe en minuscules
}



// Fonction utilitaire : insérer en base avec normalisation des champs dont le nom contient "name"
export function insertNormalized<T extends Record<string, Any>>(
  db: Kysely<DbSchema>,      // base à utiliser
  table: keyof DbSchema,     // table cible
  values: T,                 // valeurs à insérer
) {
  const normValues = { ...values };

  for (const key of Object.keys(values)) {
    if (key.toLowerCase().includes("name")) {
      const val = values[key];
      if (typeof val === "string") {
        normValues[`${key}_normalized`] = normalizeText(val);
      }
    }
  }

  // insertion des noms normalisés
  return db.insertInto(table).values(normValues);
}
