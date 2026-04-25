import { Pill } from "lucide-react";
import { Medication } from "@/lib/carePlanTypes";
import { ConfidenceBadge } from "./ConfidenceBadge";
import { ExplainButton } from "./ExplainButton";

export function MedicationCard({ medication, language }: { medication: Medication, language: string }) {
  const textContext = `${medication.name} ${medication.dosage}. ${medication.frequency}. ${medication.instructions}`;
  
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm relative">
      <div className="absolute top-4 right-4">
        <ConfidenceBadge confidence={medication.confidence} />
      </div>
      <div className="flex items-start gap-4">
        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
          <Pill className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h4 className="text-lg font-bold text-gray-900 dark:text-white">{medication.name}</h4>
          <p className="text-gray-700 dark:text-gray-300 font-medium">{medication.dosage}</p>
          <div className="mt-2 space-y-1">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">Frequency:</span> {medication.frequency}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">Instructions:</span> {medication.instructions}
            </p>
          </div>
          <div className="mt-3 text-sm">
            <ExplainButton text={textContext} targetLanguage={language} />
          </div>
        </div>
      </div>
    </div>
  );
}
