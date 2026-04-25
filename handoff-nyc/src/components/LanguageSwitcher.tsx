"use client";

import { Globe } from "lucide-react";

export function LanguageSwitcher({ 
  currentLanguage, 
  onLanguageChange 
}: { 
  currentLanguage: string; 
  onLanguageChange: (lang: string) => void; 
}) {
  const languages = ["English", "Spanish", "Chinese", "Hindi", "Bengali", "Korean", "Russian"];

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-5 h-5 text-gray-500" />
      <select
        value={currentLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
      >
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
    </div>
  );
}
