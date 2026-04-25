"use client";

import { useState } from "react";
import { HelpCircle, Loader2 } from "lucide-react";

export function ExplainButton({ text, targetLanguage }: { text: string; targetLanguage: string }) {
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleExplain = async () => {
    if (explanation) {
      setExplanation(null);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/explain-section", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, targetLanguage }),
      });
      const data = await res.json();
      setExplanation(data.explanation);
    } catch (err) {
      console.error(err);
      setExplanation("Could not load explanation. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-2">
      <button 
        onClick={handleExplain}
        className="flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
      >
        {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <HelpCircle className="w-3.5 h-3.5" />}
        {explanation ? "Hide simplified explanation" : "Explain simply"}
      </button>
      
      {explanation && (
        <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md text-sm text-gray-800 dark:text-gray-200 border border-blue-100 dark:border-blue-800/50">
          {explanation}
        </div>
      )}
    </div>
  );
}
