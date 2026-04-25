"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";

export function ProcessingSteps({ currentStep }: { currentStep: number }) {
  const steps = [
    "Reading discharge document...",
    "Extracting medications and instructions...",
    "Finding warning signs...",
    "Assessing confidence levels...",
    "Translating care plan...",
    "Preparing audio briefing..."
  ];

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Processing Document</h3>
      <div className="space-y-4">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const isPending = index > currentStep;

          return (
            <motion.div 
              key={step}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-3 ${
                isPending ? "text-gray-400 dark:text-gray-500" : "text-gray-900 dark:text-gray-100"
              }`}
            >
              {isCompleted ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : isActive ? (
                <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-gray-200 dark:border-gray-700" />
              )}
              <span className={`text-sm ${isActive ? "font-medium" : ""}`}>{step}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
