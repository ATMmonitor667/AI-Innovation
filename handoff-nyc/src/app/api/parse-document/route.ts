import { NextResponse } from "next/server";
import { mockCarePlan } from "@/lib/mockCarePlan";
import { cloneCarePlan, mockLocalizeCarePlan } from "@/lib/translations";
import {
  extractCarePlanWithAI,
  getSyntheticDischargeText,
  hasGemini,
  hasOpenAI,
  translateCarePlanWithAI,
} from "@/lib/ai";
import type { CarePlan } from "@/lib/carePlanTypes";

export const runtime = "nodejs";

function normalizeEnglishPlan(plan: CarePlan): CarePlan {
  const p = cloneCarePlan(plan);
  p.language = "English";
  if (!p.createdAt) p.createdAt = new Date().toISOString();
  if (!p.id) p.id = "cp-demo";
  return p;
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let preferredLanguage = "English";
    let useSample = true;

    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      const lang = form.get("preferredLanguage");
      if (typeof lang === "string" && lang.trim()) preferredLanguage = lang.trim();
      const sample = form.get("useSample");
      useSample = sample === "true" || sample === "1";
      const file = form.get("file");
      if (file instanceof File && file.size > 0) {
        useSample = false;
      }
    } else {
      const body = (await req.json().catch(() => ({}))) as {
        preferredLanguage?: string;
        useSample?: boolean;
      };
      if (typeof body.preferredLanguage === "string" && body.preferredLanguage.trim()) {
        preferredLanguage = body.preferredLanguage.trim();
      }
      if (typeof body.useSample === "boolean") useSample = body.useSample;
    }

    await new Promise((r) => setTimeout(r, 600));

    let planEnglish: CarePlan;

    if (hasOpenAI() || hasGemini()) {
      const extracted = await extractCarePlanWithAI(getSyntheticDischargeText());
      planEnglish = normalizeEnglishPlan(extracted ?? cloneCarePlan(mockCarePlan));
    } else {
      planEnglish = normalizeEnglishPlan(cloneCarePlan(mockCarePlan));
    }

    if (!useSample) {
      planEnglish = {
        ...planEnglish,
        diagnosisSummary: `${planEnglish.diagnosisSummary} (Demo: uploaded file processed with synthetic discharge text only — not real OCR.)`,
      };
    }

    let carePlan = mockLocalizeCarePlan(planEnglish, preferredLanguage);
    if (hasOpenAI() || hasGemini()) {
      const aiTranslated = await translateCarePlanWithAI(planEnglish, preferredLanguage);
      if (aiTranslated) carePlan = aiTranslated;
    }

    return NextResponse.json({ carePlanEnglish: planEnglish, carePlan });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to parse document" }, { status: 500 });
  }
}
