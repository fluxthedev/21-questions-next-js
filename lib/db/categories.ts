import { getDb } from "@/lib/mongodb";
import { COLLECTIONS } from "@/lib/db-constants";
import { getQuestionCountsByCategory } from "@/lib/db/questions";
import type { Category, CategoryDoc } from "@/lib/types";

/**
 * Returns every category, sorted by its display order, enriched with a live
 * count of how many active questions currently exist for it. The count is
 * computed with a separate aggregation rather than stored redundantly on
 * the category document, so it can never drift out of sync.
 */
export async function getCategories(): Promise<Category[]> {
  const db = await getDb();
  const collection = db.collection<CategoryDoc>(COLLECTIONS.CATEGORIES);

  const [docs, counts] = await Promise.all([
    collection.find({}).sort({ order: 1 }).toArray(),
    getQuestionCountsByCategory(),
  ]);

  return docs.map((doc) => ({
    slug: doc.slug,
    name: doc.name,
    description: doc.description,
    emoji: doc.emoji,
    tone: doc.tone,
    order: doc.order,
    questionCount: counts[doc.slug] ?? 0,
  }));
}

/** Fetches a single category by slug, or null if it doesn't exist. */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const db = await getDb();
  const collection = db.collection<CategoryDoc>(COLLECTIONS.CATEGORIES);

  const [doc, counts] = await Promise.all([
    collection.findOne({ slug }),
    getQuestionCountsByCategory(),
  ]);

  if (!doc) return null;

  return {
    slug: doc.slug,
    name: doc.name,
    description: doc.description,
    emoji: doc.emoji,
    tone: doc.tone,
    order: doc.order,
    questionCount: counts[doc.slug] ?? 0,
  };
}
