"use client";

import { Volume2, VolumeX, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { CarePlan } from "@/lib/carePlanTypes";

export function AudioBriefingButton({ carePlan }: { carePlan: CarePlan }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setIsSupported(false);
    }
  }, []);

  const handlePlay = () => {
    if (!isSupported) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const medsText = carePlan.medications.map(m => `${m.name}, ${m.dosage}, ${m.frequency}`).join(". ");
    const redFlagsText = carePlan.redFlags.map(r => r.symptom).join(". ");

    const textToSpeak = `Hello ${carePlan.patientName}. Here is a summary of your care plan. 
    You need to take the following medications: ${medsText}. 
    Please watch out for these red flags: ${redFlagsText}. If you experience any of these, ${carePlan.redFlags[0]?.action || "seek help"}.
    Your next follow up is ${carePlan.followUpAppointments[0]?.date || "not scheduled"}.`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    // Attempt to set language
    if (carePlan.language === "Spanish") utterance.lang = "es-ES";
    else if (carePlan.language === "Chinese") utterance.lang = "zh-CN";
    else utterance.lang = "en-US";

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  if (!isSupported) return null;

  return (
    <button
      onClick={handlePlay}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
        isPlaying 
          ? "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400" 
          : "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400"
      }`}
    >
      {isPlaying ? (
        <>
          <VolumeX className="w-5 h-5" /> Stop Briefing
        </>
      ) : (
        <>
          <Volume2 className="w-5 h-5" /> Play Audio Briefing
        </>
      )}
    </button>
  );
}
