/**
 * Domain types shared between the database layer, API routes, and UI.
 *
 * `*Doc` types describe what's actually stored in MongoDB (using ObjectId).
 * Plain types (without the `Doc` suffix) describe the JSON-safe shape sent
 * to the client, where ObjectIds and Dates are serialized to strings.
 */
import type { ObjectId } from "mongodb";

export type CategoryTone = "light" | "deep";

export interface CategoryDoc {
  _id?: ObjectId;
  slug: string;
  name: string;
  description: string;
  emoji: string;
  tone: CategoryTone;
  order: number;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  emoji: string;
  tone: CategoryTone;
  order: number;
  questionCount: number;
}

export interface QuestionDoc {
  _id?: ObjectId;
  text: string;
  category: string;
  isActive: boolean;
  createdAt: Date;
}

export interface Question {
  id: string;
  text: string;
  category: string;
}

export interface GameSessionDoc {
  _id?: ObjectId;
  category: string;
  questionIds: string[];
  playerName: string | null;
  currentIndex: number;
  createdAt: Date;
  completedAt: Date | null;
}

export interface GameSession {
  _id?: string;
  categorySlug: string;
  categoryTitle: string;
  questionCount: number;
  completedAt: string;

  // Notice the '?' marks here — these make them optional!
  category?: string;
  questionIds?: string[];
  playerName?: string;
  currentIndex?: number;
  isCompleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Payload required to record a newly completed game session.
 */
export interface CreateSessionInput {
  categorySlug: string;
  categoryTitle: string;
  questionCount: number;
}

export interface ApiError {
  error: string;
}
