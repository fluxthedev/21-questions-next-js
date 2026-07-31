import { NextRequest, NextResponse } from "next/server";
import { getRandomQuestions } from "@/lib/db/questions";
import { getCategories } from "@/lib/db/categories";
import { parseQuestionCount, isValidCategorySlug } from "@/lib/game-logic";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryParam = searchParams.get("category");
    const category =
      categoryParam && categoryParam !== "all" ? categoryParam : null;
    const count = parseQuestionCount(searchParams.get("count"));

    if (category) {
      const categories = await getCategories();
      if (!isValidCategorySlug(category, categories)) {
        return NextResponse.json(
          { error: `Unknown category "${category}".` },
          { status: 404 },
        );
      }
    }

    const questions = await getRandomQuestions(category, count);

    if (questions.length === 0) {
      return NextResponse.json(
        { error: "No questions are available for that category yet." },
        { status: 404 },
      );
    }

    return NextResponse.json({ questions, count: questions.length });
  } catch (error) {
    console.error("GET /api/questions failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch questions." },
      { status: 500 },
    );
  }
}