export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { APP_LAYOUT_CONFIG_PROMPT } from "@/data/Prompt";
import {db} from '@/config/db'
import {ScreenConfigTable} from '@/config/schema'

// import your db if needed
// import { db } from "@/lib/db";
// import { ScreenConfigTable } from "@/db/schema";

export async function POST(req: NextRequest) {
  try {
    const { userInput, deviceType, projectId } = await req.json();

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "My App",
        },
        body: JSON.stringify({
          model: "anthropic/claude-3-haiku-20240307",
          messages: [
            {
              role: "system",
              content: APP_LAYOUT_CONFIG_PROMPT(deviceType, userInput),
            },
            {
              role: "user",
              content: userInput,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!data?.choices?.length) {
      return NextResponse.json(
        { error: "No response from AI", raw: data },
        { status: 500 }
      );
    }

    let content = data.choices[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: "Empty AI response" },
        { status: 500 }
      );
    }

    // -----------------------------
    // OPTIONAL: parse JSON safely
    // -----------------------------
    let parsed;
    try {
      parsed = typeof content === "string" ? JSON.parse(content) : content;
    } catch (e) {
      parsed = null;
    }

    // -----------------------------
    // OPTIONAL DB INSERT (FIXED)
    // -----------------------------
    
    if (parsed?.screens?.length) {
      await Promise.all(
        parsed.screens.map(async (screen: any) => {
          await db.insert(ScreenConfigTable).values({
            projectId,
            purpose: screen?.purpose,
            screenDescription: screen?.layoutDescription,
            screenId: screen?.id,
            screenName: screen?.name,
          });
        })
      );
    }
    

    return NextResponse.json({
      success: true,
      content: parsed ?? content,
    });
  } catch (error: any) {
    console.error("OPENROUTER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}