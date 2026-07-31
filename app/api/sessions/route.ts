import { NextRequest, NextResponse } from "next/server";
import { createSession, getRecentSessions } from "@/lib/db/sessions";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? Math.min(Math.max(parseInt(limitParam, 10) || 20, 1), 100) : 20;

    const sessions = await getRecentSessions(limit);
    return NextResponse.json({ sessions });
  } catch (error) {
    console.error("GET /api/sessions failed:", error);
    return NextResponse.json(
      { error: "Failed to load sessions." },
      { status: 500 },
    );
  }
}

interface CreateSessionBody {
  category?: unknown;
  questionIds?: unknown;
  playerName?: unknown;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json().catch(() => null)) as CreateSessionBody | null;

    if (!body || typeof body.category !== "string" || body.category.trim() === "") {
      return NextResponse.json(
        { error: "A non-empty string \"category\" is required." },
        { status: 400 },
      );
    }

    if (
      !Array.isArray(body.questionIds) ||
      body.questionIds.length === 0 ||
      !body.questionIds.every((id) => typeof id === "string")
    ) {
      return NextResponse.json(
        { error: "\"questionIds\" must be a non-empty array of strings." },
        { status: 400 },
      );
    }

    const playerName =
      typeof body.playerName === "string" && body.playerName.trim() !== ""
        ? body.playerName.trim().slice(0, 80)
        : null;

    const session = await createSession({
      category: body.category,
      questionIds: body.questionIds,
      playerName,
    } as unknown as Parameters<typeof createSession>[0]);
    return NextResponse.json({ session }, { status: 201 });
  } catch (error) {
    console.error("POST /api/sessions failed:", error);
    return NextResponse.json(
      { error: "Failed to create session." },
      { status: 500 },
    );
  }
}