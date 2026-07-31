import { NextResponse } from "next/server";
import { getCategories } from "@/lib/db/categories";

// This list changes rarely, but the per-category question counts should
// always reflect the live database — never cache this route.
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json({ categories });
  } catch (error) {
    console.error("GET /api/categories failed:", error);
    return NextResponse.json(
      { error: "Failed to load categories." },
      { status: 500 },
    );
  }
}