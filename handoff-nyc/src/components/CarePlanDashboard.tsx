import { CarePlan } from "@/lib/carePlanTypes";
import { MedicationCard } from "./MedicationCard";
import { RedFlagsCard } from "./RedFlagsCard";
import { FollowUpCard } from "./FollowUpCard";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { AudioBriefingButton } from "./AudioBriefingButton";
import { SafetyBanner } from "./SafetyBanner";
import { ConfidenceBadge } from "./ConfidenceBadge";
import { CheckCircle2, Phone } from "lucide-react";
import { ExplainButton } from "./ExplainButton";

export function CarePlanDashboard({ 
  carePlan, 
  onLanguageChange 
}: { 
  carePlan: CarePlan; 
  onLanguageChange: (lang: string) => void;
}) {
  return (
    <div className="max-w-4xl mx-auto pb-12">
      <SafetyBanner />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Care Plan for {carePlan.patientName}</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Generated on {new Date(carePlan.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <LanguageSwitcher currentLanguage={carePlan.language} onLanguageChange={onLanguageChange} />
          <AudioBriefingButton carePlan={carePlan} />
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            Diagnosis & Summary
          </h3>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <p className="text-gray-800 dark:text-gray-200">{carePlan.diagnosisSummary}</p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Medications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {carePlan.medications.map((med, idx) => (
              <MedicationCard key={idx} medication={med} language={carePlan.language} />
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Red Flags (When to get help)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {carePlan.redFlags.map((flag, idx) => (
              <RedFlagsCard key={idx} flag={flag} language={carePlan.language} />
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Care Instructions</h3>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
              {carePlan.careInstructions.map((instruction, idx) => (
                <div key={idx} className="flex gap-3 relative pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0">
                  <div className="shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 dark:text-gray-200 font-medium">{instruction.instruction}</p>
                    <ExplainButton text={instruction.instruction} targetLanguage={carePlan.language} />
                  </div>
                  <ConfidenceBadge confidence={instruction.confidence} />
                </div>
              ))}
            </div>
          </section>

          <div className="space-y-8">
            <section>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Follow-up Appointments</h3>
              <div className="space-y-4">
                {carePlan.followUpAppointments.map((apt, idx) => (
                  <FollowUpCard key={idx} appointment={apt} />
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Contact Information</h3>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
                {carePlan.contactInfo.map((contact, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">{contact.name}</p>
                      <p className="text-sm text-gray-500">{contact.role}</p>
                    </div>
                    <a href={`tel:${contact.phone}`} className="flex items-center gap-2 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors">
                      <Phone className="w-4 h-4" />
                      {contact.phone}
                    </a>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
