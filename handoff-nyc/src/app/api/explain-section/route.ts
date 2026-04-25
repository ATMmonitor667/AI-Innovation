import { NextResponse } from "next/server";
import { explainSectionWithAI, hasGemini, hasOpenAI } from "@/lib/ai";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { text?: string; targetLanguage?: string };
    const text = typeof body.text === "string" ? body.text : "";
    const targetLanguage = typeof body.targetLanguage === "string" ? body.targetLanguage : "English";

    await new Promise((r) => setTimeout(r, 350));

    if (hasOpenAI() || hasGemini()) {
      const ai = await explainSectionWithAI(text, targetLanguage);
      if (ai) return NextResponse.json({ explanation: ai });
    }

    let explanation =
      "This line is reminding you to follow the discharge instructions your care team already wrote. It does not add new treatment — when unsure, call your clinic.";

    const lower = text.toLowerCase();
    if (!text.trim()) {
      explanation = "Not found in the document.";
    } else if (lower.includes("amoxicillin") || lower.includes("amoxicilina") || lower.includes("阿莫西林")) {
      explanation =
        "This antibiotic helps clear bacterial infection. Finish all doses even if you feel better, unless your clinician tells you to stop.";
    } else if (lower.includes("albuterol") || lower.includes("albuterol") || lower.includes("吸入")) {
      explanation =
        "This rescue inhaler relaxes tight airways quickly. Use it for sudden shortness of breath, and seek help if symptoms keep coming back.";
    } else if (lower.includes("acetaminophen") || lower.includes("acetaminofén") || lower.includes("对乙酰氨基酚")) {
      explanation =
        "This medicine reduces fever and pain. Stay under the daily limit written on your discharge paperwork to protect your liver.";
    } else if (lower.includes("fever") || lower.includes("fiebre") || lower.includes("发烧") || lower.includes("ज्वर") || lower.includes("জ্বর")) {
      explanation =
        "A high fever can mean your body is fighting a serious infection. If it stays high after medication, contact your clinician or seek urgent care.";
    } else if (lower.includes("breathing") || lower.includes("respirar") || lower.includes("呼吸") || lower.includes("श्वास")) {
      explanation =
        "Breathing trouble can be an emergency. If it is sudden or severe, follow the red-flag steps on your discharge sheet and get help right away.";
    } else if (lower.includes("chest pain") || lower.includes("pecho") || lower.includes("胸痛")) {
      explanation =
        "New chest pain after hospital discharge should be taken seriously. If it feels severe or you also have breathing problems, call emergency services.";
    }

    if (targetLanguage !== "English" && explanation !== "Not found in the document.") {
      explanation = `[${targetLanguage} demo] ${explanation}`;
    }

    return NextResponse.json({ explanation });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch explanation" }, { status: 500 });
  }
}
