import Link from "next/link";
import { Stethoscope } from "lucide-react";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-950/95 dark:border-gray-800">
      <div className="container mx-auto flex h-16 items-center px-4">
        <div className="flex gap-2 items-center">
          <Stethoscope className="w-6 h-6 text-blue-600" />
          <Link href="/" className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
            Handoff NYC
          </Link>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <Link href="/upload" className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
            Upload Document
          </Link>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
}
