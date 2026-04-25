import { AlertTriangle } from "lucide-react";
import { RedFlag } from "@/lib/carePlanTypes";
import { ConfidenceBadge } from "./ConfidenceBadge";
import { ExplainButton } from "./ExplainButton";

export function RedFlagsCard({ flag, language }: { flag: RedFlag, language: string }) {
  const textContext = `Symptom: ${flag.symptom}. Action: ${flag.action}`;
  
  return (
    <div className="bg-red-50 dark:bg-red-950/20 p-5 rounded-xl border border-red-100 dark:border-red-900/50 relative">
      <div className="absolute top-4 right-4">
        <ConfidenceBadge confidence={flag.confidence} />
      </div>
      <div className="flex items-start gap-4">
        <div className="bg-red-100 dark:bg-red-900/50 p-2 rounded-lg shrink-0">
          <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
        </div>
        <div>
          <h4 className="text-base font-bold text-red-900 dark:text-red-100">{flag.symptom}</h4>
          <p className="mt-1 text-sm font-medium text-red-800 dark:text-red-200">
            Action: {flag.action}
          </p>
          <div className="mt-2">
            <ExplainButton text={textContext} targetLanguage={language} />
          </div>
        </div>
      </div>
    </div>
  );
}
