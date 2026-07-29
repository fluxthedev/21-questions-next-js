/**
 * Represents a single question in the pool.
 */
export interface Question {
  _id?: string;
  text: string;
  category: string;
}

/**
 * Represents a question category (e.g., Icebreakers, Deep Dives).
 */
export interface Category {
  _id?: string;
  slug: string;
  title: string;
  description: string;
  questionCount?: number;
}

/**
 * Represents a game session recorded in the database.
 * Includes optional properties for tracking active/in-progress sessions.
 */
export interface GameSession {
  _id?: string;
  categorySlug: string;
  categoryTitle: string;
  questionCount: number;
  completedAt: string;

  // Optional active session state properties
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