import { AlertTriangle } from "lucide-react";

export function SafetyBanner() {
  return (
    <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-4 mb-8 rounded-r-md">
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-amber-500" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <strong>Important Safety Notice:</strong> Handoff NYC helps explain existing discharge instructions. It is not medical advice. Always verify medical questions with a doctor, nurse, pharmacist, or care coordinator. Please do not upload real patient data for this demo.
          </p>
        </div>
      </div>
    </div>
  );
}
