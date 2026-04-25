import { NextResponse } from "next/server";
import { mockCarePlan } from "@/lib/mockCarePlan";

export async function POST(req: Request) {
  try {
    // In a real app, we would parse process the PDF/Image with Gemini/OpenAI
    // For this MVP, we sleep briefly and return the mock deterministic data
    
    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In the future, check if process.env.OPENAI_API_KEY exists
    // and route to the real AI parse logic here
    
    return NextResponse.json({ carePlan: mockCarePlan });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to parse document" }, { status: 500 });
  }
}
