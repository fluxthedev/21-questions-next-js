import { NextRequest, NextResponse } from "next/server";
import { getSessionById, updateSession } from "@/lib/db/sessions";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const session = await getSessionById(id);

    if (!session) {
      return NextResponse.json({ error: "Session not found." }, { status: 404 });
    }

    return NextResponse.json({ session });
  } catch (error) {
    console.error("GET /api/sessions/[id] failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch session." },
      { status: 500 },
    );
  }
}

interface PatchSessionBody {
  currentIndex?: unknown;
  completed?: unknown;
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const body = (await request.json().catch(() => null)) as PatchSessionBody | null;

    if (!body) {
      return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }

    const update: { currentIndex?: number; completed?: boolean } = {};
    if (typeof body.currentIndex === "number" && Number.isFinite(body.currentIndex)) {
      update.currentIndex = Math.max(0, Math.floor(body.currentIndex));
    }
    if (body.completed === true) {
      update.completed = true;
    }

    if (Object.keys(update).length === 0) {
      return NextResponse.json(
        { error: "Provide \"currentIndex\" (number) and/or \"completed\" (true) to update." },
        { status: 400 },
      );
    }

    const session = await updateSession(id, update);

    if (!session) {
      return NextResponse.json({ error: "Session not found." }, { status: 404 });
    }

    return NextResponse.json({ session });
  } catch (error) {
    console.error("PATCH /api/sessions/[id] failed:", error);
    return NextResponse.json(
      { error: "Failed to update session." },
      { status: 500 },
    );
  }
}
