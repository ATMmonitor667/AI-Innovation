import { Confidence } from "@/lib/carePlanTypes";

const styles: Record<Confidence, string> = {
  High:
    "bg-emerald-50 text-emerald-800 ring-emerald-600/15 dark:bg-emerald-950/40 dark:text-emerald-200",
  Medium:
    "bg-amber-50 text-amber-900 ring-amber-600/20 dark:bg-amber-950/35 dark:text-amber-100",
  Low: "bg-red-50 text-red-800 ring-red-600/15 dark:bg-red-950/40 dark:text-red-100",
};

export function ConfidenceBadge({ confidence }: { confidence: Confidence }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${styles[confidence]}`}
      aria-label={`Confidence: ${confidence}`}
    >
      {confidence} confidence
    </span>
  );
}
