import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryBySlug } from "@/lib/db/categories";
import { getRandomQuestions } from "@/lib/db/questions";
import { DEFAULT_GAME_LENGTH } from "@/lib/db-constants";
import { GameClient } from "@/components/GameClient";

interface GamePageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({
  params,
}: GamePageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = await getCategoryBySlug(slug);

  return {
    title: category
      ? `${category.name} — Twenty-One Questions`
      : "Twenty-One Questions",
  };
}

export default async function GamePage({ params }: GamePageProps) {
  const { category: slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const questions = await getRandomQuestions(slug, DEFAULT_GAME_LENGTH);

  if (questions.length === 0) {
    notFound();
  }

  return <GameClient category={category} initialQuestions={questions} />;
}
