import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text, targetLanguage } = await req.json();

    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock explanation logic for MVP
    let explanation = `This simply means: Make sure to follow the instructions carefully to stay safe and recover quickly.`;
    
    if (text.toLowerCase().includes("amoxicillin")) {
      explanation = "Amoxicillin is an antibiotic. It kills the bacteria causing your infection. Always finish the entire bottle, even if you feel better.";
    } else if (text.toLowerCase().includes("albuterol")) {
      explanation = "Albuterol opens up your airways quickly. Use it only when you feel like you can't breathe.";
    } else if (text.toLowerCase().includes("acetaminophen")) {
      explanation = "This is a fever reducer and painkiller (like Tylenol). Taking too much can hurt your liver, so count how many you take in a day.";
    } else if (text.toLowerCase().includes("fever")) {
      explanation = "A high fever means your body is fighting a strong infection. If it doesn't go down, you might need stronger help from a doctor.";
    }

    if (targetLanguage !== "English") {
      explanation = `[In ${targetLanguage}]: ${explanation}`;
    }

    return NextResponse.json({ explanation });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch explanation" }, { status: 500 });
  }
}
