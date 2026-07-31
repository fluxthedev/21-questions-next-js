import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { COLLECTIONS } from "@/lib/db-constants";
import type { GameSession, GameSessionDoc } from "@/lib/types";

function toGameSession(doc: GameSessionDoc & { _id: ObjectId }): GameSession {
  return {
    id: doc._id.toString(),
    category: doc.category,
    questionIds: doc.questionIds,
    playerName: doc.playerName,
    currentIndex: doc.currentIndex,
    totalQuestions: doc.questionIds.length,
    createdAt: doc.createdAt.toISOString(),
    completedAt: doc.completedAt ? doc.completedAt.toISOString() : null,
  };
}

/** Creates a new game session recording which questions were drawn for it. */
export async function createSession(
  category: string,
  questionIds: string[],
  playerName: string | null = null,
): Promise<GameSession> {
  const db = await getDb();
  const collection = db.collection<GameSessionDoc>(COLLECTIONS.SESSIONS);

  const doc: GameSessionDoc = {
    category,
    questionIds,
    playerName,
    currentIndex: 0,
    createdAt: new Date(),
    completedAt: null,
  };

  const result = await collection.insertOne(doc);
  return toGameSession({ ...doc, _id: result.insertedId });
}

/** Fetches a single session by id. Returns null if not found or the id is malformed. */
export async function getSessionById(id: string): Promise<GameSession | null> {
  if (!ObjectId.isValid(id)) return null;

  const db = await getDb();
  const collection = db.collection<GameSessionDoc>(COLLECTIONS.SESSIONS);
  const doc = await collection.findOne({ _id: new ObjectId(id) });
  return doc ? toGameSession(doc as GameSessionDoc & { _id: ObjectId }) : null;
}

export interface SessionUpdate {
  currentIndex?: number;
  completed?: boolean;
}

/**
 * Applies a partial update to a session — advancing `currentIndex` as the
 * player moves through the deck, and/or stamping `completedAt` once they
 * finish. Returns the updated session, or null if the id doesn't exist.
 */
export async function updateSession(
  id: string,
  update: SessionUpdate,
): Promise<GameSession | null> {
  if (!ObjectId.isValid(id)) return null;

  const setFields: Partial<Pick<GameSessionDoc, "currentIndex" | "completedAt">> = {};
  if (typeof update.currentIndex === "number") {
    setFields.currentIndex = update.currentIndex;
  }
  if (update.completed === true) {
    setFields.completedAt = new Date();
  }

  if (Object.keys(setFields).length === 0) {
    return getSessionById(id);
  }

  const db = await getDb();
  const collection = db.collection<GameSessionDoc>(COLLECTIONS.SESSIONS);

  const updated = await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: setFields },
    { returnDocument: "after", includeResultMetadata: false },
  );

  return updated ? toGameSession(updated as GameSessionDoc & { _id: ObjectId }) : null;
}

/** Most recent sessions first, for the history page. */
export async function getRecentSessions(limit = 20): Promise<GameSession[]> {
  const db = await getDb();
  const collection = db.collection<GameSessionDoc>(COLLECTIONS.SESSIONS);
  const docs = await collection
    .find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();
  return docs.map((doc) => toGameSession(doc as GameSessionDoc & { _id: ObjectId }));
}
