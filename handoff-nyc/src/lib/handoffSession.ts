import type { CarePlan } from "./carePlanTypes";

export const HANDOFF_SESSION_KEY = "handoff-nyc-session";

export type HandoffSession = {
  planEnglish: CarePlan;
  displayLanguage: string;
  currentPlan: CarePlan;
};

export function saveHandoffSession(session: HandoffSession): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(HANDOFF_SESSION_KEY, JSON.stringify(session));
  } catch {
    // ignore quota / private mode
  }
}

export function loadHandoffSession(): HandoffSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(HANDOFF_SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as HandoffSession;
  } catch {
    return null;
  }
}
