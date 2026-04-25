import { NextResponse } from "next/server";
import type { CarePlan } from "@/lib/carePlanTypes";
import { mockLocalizeCarePlan } from "@/lib/translations";
import { hasGemini, hasOpenAI, translateCarePlanWithAI } from "@/lib/ai";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { carePlan, targetLanguage } = (await req.json()) as {
      carePlan?: CarePlan;
      targetLanguage?: string;
    };

    if (!carePlan || !targetLanguage) {
      return NextResponse.json({ error: "carePlan and targetLanguage are required" }, { status: 400 });
    }

    await new Promise((r) => setTimeout(r, 400));

    let translatedPlan: CarePlan | null = null;
    if (hasOpenAI() || hasGemini()) {
      translatedPlan = await translateCarePlanWithAI(carePlan, targetLanguage);
    }
    if (!translatedPlan) {
      translatedPlan = mockLocalizeCarePlan(carePlan, targetLanguage);
    }

    return NextResponse.json({ translatedPlan });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to translate care plan" }, { status: 500 });
  }
}
