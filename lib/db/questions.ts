import type { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { COLLECTIONS } from "@/lib/db-constants";
import type { Question, QuestionDoc } from "@/lib/types";

function toQuestion(doc: QuestionDoc & { _id: ObjectId }): Question {
  return {
    id: doc._id.toString(),
    text: doc.text,
    category: doc.category,
  };
}

/**
 * Draws `count` random, active questions from MongoDB using the `$sample`
 * aggregation stage, optionally restricted to one category. `$sample`
 * performs a true random selection at the database level (no fetch-all,
 * shuffle-in-memory step) and returns each document at most once. If fewer
 * than `count` questions are available, it simply returns all of them —
 * no error, just a shorter deck.
 */
export async function getRandomQuestions(
  category: string | null,
  count: number,
): Promise<Question[]> {
  const db = await getDb();
  const collection = db.collection<QuestionDoc>(COLLECTIONS.QUESTIONS);

  const match: Record<string, unknown> = { isActive: true };
  if (category) {
    match.category = category;
  }

  const docs = await collection
    .aggregate<QuestionDoc & { _id: ObjectId }>([
      { $match: match },
      { $sample: { size: count } },
    ])
    .toArray();

  return docs.map(toQuestion);
}

/** Fetches a single question by its id. Returns null if not found. */
export async function getQuestionById(id: string): Promise<Question | null> {
  const { ObjectId } = await import("mongodb");
  if (!ObjectId.isValid(id)) return null;

  const db = await getDb();
  const collection = db.collection<QuestionDoc>(COLLECTIONS.QUESTIONS);
  const doc = await collection.findOne({ _id: new ObjectId(id) });
  return doc ? toQuestion(doc as QuestionDoc & { _id: ObjectId }) : null;
}

/** Returns `{ categorySlug: activeQuestionCount }` for every category that has at least one active question. */
export async function getQuestionCountsByCategory(): Promise<Record<string, number>> {
  const db = await getDb();
  const collection = db.collection<QuestionDoc>(COLLECTIONS.QUESTIONS);

  const results = await collection
    .aggregate<{ _id: string; count: number }>([
      { $match: { isActive: true } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ])
    .toArray();

  const counts: Record<string, number> = {};
  for (const row of results) {
    counts[row._id] = row.count;
  }
  return counts;
}

/** Total number of active questions across every category. */
export async function getTotalQuestionCount(): Promise<number> {
  const db = await getDb();
  const collection = db.collection<QuestionDoc>(COLLECTIONS.QUESTIONS);
  return collection.countDocuments({ isActive: true });
}
