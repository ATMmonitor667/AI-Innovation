import { LandingHero } from "@/components/LandingHero";
import { AppHeader } from "@/components/AppHeader";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <AppHeader />
      <LandingHero />
    </main>
  );
}
