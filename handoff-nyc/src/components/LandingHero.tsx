import Link from "next/link";
import { ArrowRight, HeartPulse, ShieldCheck, Languages } from "lucide-react";

export function LandingHero() {
  return (
    <div className="relative isolate pt-14 dark:bg-gray-900 bg-blue-50/50 min-h-screen">
      <div className="py-24 sm:py-32 lg:pb-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Handoff NYC
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Turning confusing hospital discharge papers into clear, translated, voice-enabled care plans that families can understand.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/upload"
                className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors duration-200 flex items-center gap-2"
              >
                Start Demo <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          
          <div className="mt-16 flow-root sm:mt-24">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 text-center">
              <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Languages className="text-blue-600 w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Multilingual Care Plans</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Instantly translate medical instructions into your preferred language to support diverse families.</p>
              </div>
              <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <HeartPulse className="text-green-600 w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Clear & Accessible</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Audio summaries and simple explanations help elderly and caregivers understand exactly what to do.</p>
              </div>
              <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition">
                <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                  <ShieldCheck className="text-amber-600 w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Built for Safety</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">AI confidence labels flag uncertainties for human review, always keeping patient safety first.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
