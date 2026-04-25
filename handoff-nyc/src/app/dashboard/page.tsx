"use client";

import { useState, useEffect } from "react";
import { AppHeader } from "@/components/AppHeader";
import { CarePlanDashboard } from "@/components/CarePlanDashboard";
import { CarePlan } from "@/lib/carePlanTypes";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const [carePlan, setCarePlan] = useState<CarePlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial care plan
    const fetchPlan = async () => {
      try {
        const res = await fetch("/api/parse-document", { method: "POST" });
        const data = await res.json();
        setCarePlan(data.carePlan);
      } catch (err) {
        console.error("Error fetching care plan:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlan();
  }, []);

  const handleLanguageChange = async (lang: string) => {
    if (!carePlan) return;
    setLoading(true);
    try {
      const res = await fetch("/api/translate-care-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ carePlan, targetLanguage: lang }),
      });
      const data = await res.json();
      setCarePlan(data.translatedPlan);
    } catch (err) {
      console.error("Translation error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-gray-900 flex flex-col">
      <AppHeader />
      <div className="flex-1 container mx-auto px-4 py-8">
        {loading && !carePlan ? (
          <div className="flex flex-col items-center justify-center pt-24 text-gray-500">
            <Loader2 className="w-10 h-10 animate-spin mb-4 text-blue-500" />
            <p>Loading your care plan...</p>
          </div>
        ) : carePlan ? (
          <CarePlanDashboard carePlan={carePlan} onLanguageChange={handleLanguageChange} />
        ) : (
          <div className="text-center py-20 text-red-500">
            Failed to load care plan. Please try uploading again.
          </div>
        )}
      </div>
    </main>
  );
}
