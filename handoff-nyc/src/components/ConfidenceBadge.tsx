import { Confidence } from "@/lib/carePlanTypes";

export function ConfidenceBadge({ confidence }: { confidence: Confidence }) {
  if (confidence === "High") return null; // Don't clutter UI with high confidence
  
  const isMedium = confidence === "Medium";
  
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${
      isMedium 
        ? "bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-900/30 dark:text-blue-400" 
        : "bg-red-50 text-red-700 ring-red-600/10 dark:bg-red-900/30 dark:text-red-400"
    }`}>
      {confidence} Confidence - Review Needed
    </span>
  );
}
