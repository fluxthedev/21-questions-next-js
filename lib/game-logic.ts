/**
 * Pure, dependency-free game logic.
 *
 * Nothing in this file touches MongoDB, Next.js, or the DOM — that's
 * deliberate. It's the part of the app that's cheapest to reason about and
 * cheapest to test, so business rules (bounds-checking a requested question
 * count, computing progress, validating the question bank) live here rather
 * than being scattered across route handlers and components.
 */
import { DEFAULT_GAME_LENGTH, MAX_QUESTION_REQUEST } from "./db-constants";

/**
 * Parses a `count` query-string value into a safe integer, falling back to
 * `DEFAULT_GAME_LENGTH` for anything missing or malformed, and clamping the
 * result to the [1, max] range so a request can't ask for 0 or 100000
 * questions.
 */
export function parseQuestionCount(
  raw: string | null | undefined,
  fallback: number = DEFAULT_GAME_LENGTH,
  max: number = MAX_QUESTION_REQUEST,
): number {
  if (raw === null || raw === undefined || raw.trim() === "") {
    return fallback;
  }
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || Number.isNaN(parsed)) {
    return fallback;
  }
  if (parsed < 1) return 1;
  if (parsed > max) return max;
  return parsed;
}