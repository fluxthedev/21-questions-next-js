export const DB_NAME = process.env.MONGODB_DB || "twenty_one_questions";

export const COLLECTIONS = {
  QUESTIONS: "questions",
  CATEGORIES: "categories",
  SESSIONS: "sessions",
} as const;

/** Default number of questions drawn for a single game. */
export const DEFAULT_GAME_LENGTH = 21;

/** Hard ceiling on how many questions a single request can request at once. */
export const MAX_QUESTION_REQUEST = 50;
