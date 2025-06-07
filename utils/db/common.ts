import { Db } from "@utils/db.ts";

// InnerHTML
export const pageInfoStyle =
  'style="font-weight:600; text-decoration-line:underline"';

// Fonction utilitaire pour insérer les tags d'une œuvre
export async function insertArtTags(
  artId: number,
  tagSlugs: string[],
): Promise<void> {
  // récupération des tags
  const db = Db.getInstance();
  const tagRows = await db.selectFrom("tag").select(["id", "slug"]).execute();
  const tagMap = new Map(tagRows.map((tag) => [tag.slug, tag.id]));

  // insertion des tags d'une œuvre
  for (const slug of tagSlugs) {
    const tagId = tagMap.get(slug);
    if (!tagId) {
      throw new Error(`Tag non trouvé : ${slug}`);
    }
    await db.insertInto("art_tag").values({ art_id: artId, tag_id: tagId })
      .execute();
  }
}
