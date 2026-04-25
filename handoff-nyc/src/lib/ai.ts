import type { CarePlan } from "./carePlanTypes";

const SYNTHETIC_DISCHARGE_TEXT = `
DISCHARGE SUMMARY — SYNTHETIC DEMO DOCUMENT (NOT REAL PATIENT DATA)
Patient: Maria Rivera
Diagnosis: Pneumonia recovery after hospital discharge; stable for home care.

Medications:
- Amoxicillin 500 mg orally twice daily for 7 days. Take with food.
- Acetaminophen 500 mg every 6 hours as needed for fever. Do not exceed 3000 mg in 24 hours.
- Albuterol inhaler 2 puffs every 4–6 hours as needed for shortness of breath. Rinse mouth after use.

Home care:
- Rest and drink plenty of fluids (water, broth).
- Use a cool mist humidifier in your room.
- Avoid exposure to second-hand smoke.

Warning signs — seek emergency care if:
- Difficulty breathing — go to Emergency Room immediately.
- Chest pain — call 911.
- Fever above 102°F despite medication — contact primary care or urgent care.
- Blue lips or severe confusion — call 911 immediately.
- Persistent dry cough developing — discuss at next follow-up (lower certainty on timing).

Follow-up:
- Primary care visit in 7 days — call NYC Community Health Clinic to schedule. Bring all medication bottles.
- Call clinic if symptoms worsen.

Contacts:
- NYC Community Health Clinic — Primary Care Office — 555-0100
- Hospital Discharge Coordinator — 555-0200

Reminders:
- Schedule primary care follow-up appointment.
- Pick up prescriptions from local pharmacy.

If any information is missing from this document, respond with "Not found in the document" for that field.
`;

export function getSyntheticDischargeText(): string {
  return SYNTHETIC_DISCHARGE_TEXT.trim();
}

export function hasOpenAI(): boolean {
  return Boolean(process.env.OPENAI_API_KEY?.trim());
}

export function hasGemini(): boolean {
  return Boolean(process.env.GEMINI_API_KEY?.trim());
}

async function openAIChat(
  system: string,
  user: string,
  options?: { jsonObject?: boolean }
): Promise<string | null> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      temperature: 0.2,
      ...(options?.jsonObject ? { response_format: { type: "json_object" } } : {}),
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  return data.choices?.[0]?.message?.content ?? null;
}

async function geminiGenerateJSON(prompt: string): Promise<string | null> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(key)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.2, responseMimeType: "application/json" },
    }),
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { candidates?: { content?: { parts?: { text?: string }[] } }[] };
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? null;
}

const CARE_PLAN_JSON_INSTRUCTION = `Return ONLY valid JSON matching this TypeScript shape (no markdown):
{
  "id": string,
  "patientName": string,
  "diagnosisSummary": string,
  "medications": { "name": string, "dosage": string, "frequency": string, "instructions": string, "confidence": "High"|"Medium"|"Low" }[],
  "careInstructions": { "instruction": string, "simplifiedExplanation"?: string, "confidence": "High"|"Medium"|"Low" }[],
  "redFlags": { "symptom": string, "action": string, "confidence": "High"|"Medium"|"Low" }[],
  "followUpAppointments": { "date": string, "provider": string, "location": string, "instructions": string, "confidence": "High"|"Medium"|"Low" }[],
  "contactInfo": { "name": string, "role": string, "phone": string, "confidence": "High"|"Medium"|"Low" }[],
  "reminders": string[],
  "language": "English",
  "createdAt": string (ISO-8601)
}
Rules: Only use facts present in the discharge text. If something is missing, use the exact string "Not found in the document" for that field. Never diagnose or add new treatments. Include at least one "Low" confidence item where the text is ambiguous.`;

export async function extractCarePlanWithAI(dischargeText: string): Promise<CarePlan | null> {
  const user = `Discharge text:\n"""${dischargeText}"""\n\n${CARE_PLAN_JSON_INSTRUCTION}`;
  let raw: string | null = null;
  if (hasOpenAI()) {
    raw = await openAIChat(
      "You extract structured discharge instructions for caregivers. Output JSON only.",
      user,
      { jsonObject: true }
    );
  }
  if (!raw && hasGemini()) {
    raw = await geminiGenerateJSON(
      `You extract structured discharge instructions for caregivers. ${CARE_PLAN_JSON_INSTRUCTION}\n\nDischarge text:\n"""${dischargeText}"""`
    );
  }
  if (!raw) return null;
  try {
    return JSON.parse(raw) as CarePlan;
  } catch {
    return null;
  }
}

export async function translateCarePlanWithAI(
  plan: CarePlan,
  targetLanguage: string
): Promise<CarePlan | null> {
  if (targetLanguage === "English") return plan;
  const system =
    "Translate all human-readable strings in the JSON to the target language. Keep JSON keys identical. Preserve confidence enums as High/Medium/Low. Output JSON only.";
  const user = `Target language: ${targetLanguage}\n\nCare plan JSON:\n${JSON.stringify(plan)}`;
  let raw: string | null = null;
  if (hasOpenAI()) {
    raw = await openAIChat(system, user, { jsonObject: true });
  }
  if (!raw && hasGemini()) {
    raw = await geminiGenerateJSON(`${system}\n\n${user}`);
  }
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as CarePlan;
    parsed.language = targetLanguage;
    return parsed;
  } catch {
    return null;
  }
}

export async function explainSectionWithAI(
  sectionText: string,
  targetLanguage: string
): Promise<string | null> {
  const prompt = `Explain the following discharge instruction in plain language for a non-medical caregiver. 
Do not give new medical advice or change the plan. If the text is empty, say "Not found in the document."
Keep the explanation under 120 words. Target language for the explanation: ${targetLanguage}.

Text:
"""${sectionText}"""`;
  let text: string | null = null;
  if (hasOpenAI()) {
    text = await openAIChat(
      "You help families understand discharge paperwork. No diagnosis. No new prescriptions. Reply with plain text only.",
      prompt
    );
  }
  if (!text && hasGemini()) {
    const key = process.env.GEMINI_API_KEY;
    if (key) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(key)}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.3 },
        }),
      });
      if (res.ok) {
        const data = (await res.json()) as {
          candidates?: { content?: { parts?: { text?: string }[] } }[];
        };
        text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? null;
      }
    }
  }
  if (!text) return null;
  return text.replace(/^["']|["']$/g, "").trim();
}
