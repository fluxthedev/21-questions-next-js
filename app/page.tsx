import { getCategories } from "@/lib/db/categories";
import { CategoryGrid } from "@/components/CategoryGrid";

export default async function HomePage() {
  const categories = await getCategories();
  const totalQuestions = categories.reduce(
    (sum, category) => sum + category.questionCount,
    0,
  );

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      <div className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember">
          {totalQuestions > 0
            ? `${totalQuestions} questions, seven decks`
            : "A conversation game"}
        </p>
        <h1 className="text-balance mt-4 font-display text-4xl leading-[1.1] text-paper sm:text-5xl">
          Twenty-one questions. One real conversation.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-mist/70">
          Pick a deck below. Draw one question at a time, out loud, and
          actually listen to the answer. No timers, no scoring — just
          twenty-one honest questions.
        </p>
      </div>

      <div className="mt-14">
        <CategoryGrid categories={categories} />
      </div>
    </div>
  );
}
