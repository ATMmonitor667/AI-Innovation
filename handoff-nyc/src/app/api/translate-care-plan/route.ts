import { NextResponse } from "next/server";
import { CarePlan } from "@/lib/carePlanTypes";

export async function POST(req: Request) {
  try {
    const { carePlan, targetLanguage } = await req.json();

    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // For the MVP, if no API key is present, mock the translation 
    // by appending a language suffix or returning a hardcoded translation.
    
    // We create a deep copy to mock modifications
    const translatedPlan: CarePlan = JSON.parse(JSON.stringify(carePlan));
    
    translatedPlan.language = targetLanguage;
    
    if (targetLanguage !== "English") {
      translatedPlan.diagnosisSummary = `[Translated to ${targetLanguage}]: ${translatedPlan.diagnosisSummary}`;
      
      translatedPlan.medications = translatedPlan.medications.map((m: any) => ({
        ...m,
        instructions: `[${targetLanguage}] ${m.instructions}`
      }));

      translatedPlan.redFlags = translatedPlan.redFlags.map((r: any) => ({
        ...r,
        action: `[${targetLanguage}] ${r.action}`
      }));
    }

    return NextResponse.json({ translatedPlan });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to translate care plan" }, { status: 500 });
  }
}
