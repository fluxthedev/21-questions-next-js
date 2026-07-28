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

export type QuestionBankIssueType =
  | "duplicate-text"
  | "unknown-category"
  | "empty-text"
  | "duplicate-category-slug"
  | "text-too-long";

export interface QuestionBankIssue {
  type: QuestionBankIssueType;
  detail: string;
}

export interface QuestionBankValidation {
  valid: boolean;
  issues: QuestionBankIssue[];
  countsByCategory: Record<string, number>;
  totalQuestions: number;
}

/**
 * Validates the raw question bank before it's ever written to MongoDB:
 * every question must reference a real category, have non-empty and
 * reasonably-sized text, and not duplicate another question's text within
 * the same category. Category slugs themselves must be unique.
 *
 * This is what `tests/unit/seed-questions.test.ts` runs against the actual
 * shipped dataset, so a typo'd category slug or an accidental copy-paste
 * duplicate fails the test suite instead of silently shipping.
 */
export function validateQuestionBank(
  questions: { text: string; category: string }[],
  categories: { slug: string }[],
  maxTextLength = 240,
): QuestionBankValidation {
  const issues: QuestionBankIssue[] = [];
  const categorySlugSet = new Set(categories.map((c) => c.slug));

  const seenSlugs = new Set<string>();
  for (const c of categories) {
    if (seenSlugs.has(c.slug)) {
      issues.push({ type: "duplicate-category-slug", detail: c.slug });
    }
    seenSlugs.add(c.slug);
  }

  const countsByCategory: Record<string, number> = {};
  const seenTextByCategory = new Map<string, Set<string>>();

  for (const q of questions) {
    const trimmed = q.text.trim();

    if (trimmed.length === 0) {
      issues.push({ type: "empty-text", detail: `(category: ${q.category})` });
    }
    if (trimmed.length > maxTextLength) {
      issues.push({
        type: "text-too-long",
        detail: `${trimmed.slice(0, 40)}… (${trimmed.length} chars)`,
      });
    }
    if (!categorySlugSet.has(q.category)) {
      issues.push({
        type: "unknown-category",
        detail: `"${trimmed.slice(0, 40)}" -> ${q.category}`,
      });
    }

    countsByCategory[q.category] = (countsByCategory[q.category] ?? 0) + 1;

    const normalized = trimmed.toLowerCase();
    const seenForCategory =
      seenTextByCategory.get(q.category) ?? new Set<string>();
    if (seenForCategory.has(normalized)) {
      issues.push({ type: "duplicate-text", detail: trimmed });
    }
    seenForCategory.add(normalized);
    seenTextByCategory.set(q.category, seenForCategory);
  }

  return {
    valid: issues.length === 0,
    issues,
    countsByCategory,
    totalQuestions: questions.length,
  };
}
