import { ObjectId } from "mongodb";
import getClientPromise from "../mongodb";
import { COLLECTIONS, DB_NAME } from "../db-constants";
import type { GameSession, CreateSessionInput } from "../types";

/**
 * Internal helper to access the sessions collection in MongoDB.
 */
async function getSessionsCollection() {
  const client = await getClientPromise;
  return client.db(DB_NAME).collection<GameSession>(COLLECTIONS.SESSIONS);
}

/**
 * Records a newly completed game session in the database.
 */
export async function createSession(input: CreateSessionInput): Promise<GameSession> {
  const collection = await getSessionsCollection();

  const newSession = {
    categorySlug: input.categorySlug,
    categoryTitle: input.categoryTitle,
    questionCount: input.questionCount,
    completedAt: new Date().toISOString(),
  };

  const result = await collection.insertOne(newSession as any);

  return {
    _id: result.insertedId.toString(),
    ...newSession,
  };
}

/**
 * Fetches recent completed sessions, sorted newest-first.
 * Used for the /history page and history API endpoint.
 */
export async function getRecentSessions(limit = 20): Promise<GameSession[]> {
  const collection = await getSessionsCollection();

  const docs = await collection
    .find({})
    .sort({ completedAt: -1 })
    .limit(limit)
    .toArray();

  return docs.map((doc) => ({
    ...doc,
    _id: doc._id.toString(),
  }));
}

/**
 * Retrieves a single game session by its MongoDB ObjectId string.
 */
export async function getSessionById(id: string): Promise<GameSession | null> {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const collection = await getSessionsCollection();
  const doc = await collection.findOne({ _id: new ObjectId(id) as any });

  if (!doc) {
    return null;
  }

  return {
    ...doc,
    _id: doc._id.toString(),
  };
}