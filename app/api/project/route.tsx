import { db } from "@/config/db";
import { ProjectTable,ScreenConfigTable } from "@/config/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const { userInput, device, projectId } = await req.json();

    const result = await db
      .insert(ProjectTable)
      .values({
        projectId,
        userInput,
        device,
        userId: null, // 👈 guest user allowed
      })
      .returning();

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("POST /api/project error:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const projectId = req.nextUrl.searchParams.get("projectId");

    if (!projectId) {
      return NextResponse.json(
        { error: "projectId is required" },
        { status: 400 }
      );
    }

    const result = await db
      .select()
      .from(ProjectTable)
      .where(eq(ProjectTable.projectId, projectId));

      const screenConfig = await db.select().from(ScreenConfigTable)
      .where(eq(ScreenConfigTable.projectId,projectId as string))

    return NextResponse.json({
      projectDetail:result[0],
      screenConfig:screenConfig
    });
  } catch (error) {
    console.error("GET /api/project error:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}