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

/**
 * Progress through the deck as a 0-100 percentage, based on the displayed
 * (1-indexed) card position — card index 0 of 21 renders as ~5%, not 0%, so
 * the progress bar always shows a visible sliver once the game has started.
 */
export function calculateProgress(currentIndex: number, total: number): number {
  if (total <= 0) return 0;
  const displayed = Math.min(Math.max(currentIndex, 0), total - 1) + 1;
  return Math.round((displayed / total) * 100);
}

/** Formats a zero-padded "07 / 21" counter for the currently displayed card. */
export function formatCounter(currentIndex: number, total: number): string {
  const safeTotal = Math.max(total, 0);
  const displayed =
    Math.min(Math.max(currentIndex, 0), Math.max(safeTotal - 1, 0)) + 1;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(displayed)} / ${pad(safeTotal)}`;
}

/** Next card index, clamped so it never runs past the last card. */
export function getNextIndex(currentIndex: number, total: number): number {
  if (total <= 0) return 0;
  return Math.min(currentIndex + 1, total - 1);
}

/** Previous card index, clamped so it never goes below the first card. */
export function getPreviousIndex(currentIndex: number): number {
  return Math.max(currentIndex - 1, 0);
}

/** Whether the currently displayed card is the last one in the deck. */
export function isLastQuestion(currentIndex: number, total: number): boolean {
  if (total <= 0) return true;
  return currentIndex >= total - 1;
}

/** Whether a category slug exists in a given list of categories. */
export function isValidCategorySlug(
  slug: string,
  categories: { slug: string }[],
): boolean {
  return categories.some((c) => c.slug === slug);
}