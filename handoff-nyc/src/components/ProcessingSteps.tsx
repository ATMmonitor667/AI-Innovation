"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";

export function ProcessingSteps({ currentStep }: { currentStep: number }) {
  const steps = [
    "Reading discharge document",
    "Extracting medications and instructions",
    "Finding warning signs",
    "Translating care plan",
    "Preparing audio briefing",
    "Checking confidence labels",
  ];

  return (
    <div
      className="w-full max-w-lg mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
      role="status"
      aria-live="polite"
      aria-label="Document processing progress"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Processing your document</h3>
      <ol className="space-y-4 list-none p-0 m-0">
        {steps.map((label, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const isPending = index > currentStep;

          return (
            <motion.li
              key={label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.06 }}
              className={`flex items-center gap-3 ${
                isPending ? "text-gray-400 dark:text-gray-500" : "text-gray-900 dark:text-gray-100"
              }`}
            >
              {isCompleted ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" aria-hidden />
              ) : isActive ? (
                <Loader2 className="w-5 h-5 text-sky-600 animate-spin shrink-0" aria-hidden />
              ) : (
                <span
                  className="w-5 h-5 rounded-full border-2 border-gray-200 dark:border-gray-700 shrink-0 inline-block"
                  aria-hidden
                />
              )}
              <span className={`text-sm ${isActive ? "font-semibold" : ""}`}>{label}</span>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
