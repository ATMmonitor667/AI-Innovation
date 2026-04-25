"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud, FileText } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { ProcessingSteps } from "@/components/ProcessingSteps";
import { SafetyBanner } from "@/components/SafetyBanner";

export default function UploadPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const startProcessing = () => {
    setIsProcessing(true);
    let step = 0;
    
    // Simulate processing steps for the demo
    const interval = setInterval(() => {
      step++;
      setCurrentStep(step);
      if (step >= 6) {
        clearInterval(interval);
        setTimeout(() => {
          router.push("/dashboard");
        }, 500);
      }
    }, 800);
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <AppHeader />
      
      <div className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <SafetyBanner />
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Upload Discharge Documents</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Upload hospital discharge papers to generate a clear, translated care plan.
          </p>
        </div>

        {!isProcessing ? (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-12 text-center bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors cursor-pointer">
              <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">Upload PDF or Image</h3>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">PNG, JPG, PDF up to 10MB</p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-gray-50 dark:bg-gray-900 px-2 text-sm text-gray-500">OR</span>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={startProcessing}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl font-medium shadow-sm transition-colors w-full sm:w-auto"
              >
                <FileText className="w-5 h-5" />
                Use Sample Discharge Document (Demo)
              </button>
            </div>
          </div>
        ) : (
          <ProcessingSteps currentStep={currentStep} />
        )}
      </div>
    </main>
  );
}
