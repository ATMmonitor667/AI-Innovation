/** BCP-47 tags for SpeechSynthesis; fall back to en-US when voice missing. */
export const LANGUAGE_TO_SPEECH_TAG: Record<string, string> = {
  English: "en-US",
  Spanish: "es-ES",
  Chinese: "zh-CN",
  Hindi: "hi-IN",
  Bengali: "bn-IN",
  Korean: "ko-KR",
  Russian: "ru-RU",
};

export function pickVoiceForLang(lang: string): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const tag = LANGUAGE_TO_SPEECH_TAG[lang] ?? "en-US";
  const voices = window.speechSynthesis.getVoices();
  const primary = voices.find((v) => v.lang?.toLowerCase().startsWith(tag.slice(0, 2)));
  const exact = voices.find((v) => v.lang === tag);
  return exact ?? primary ?? null;
}

export function ensureVoicesLoaded(): Promise<SpeechSynthesisVoice[]> {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    return Promise.resolve([]);
  }
  const synth = window.speechSynthesis;
  const existing = synth.getVoices();
  if (existing.length) return Promise.resolve(existing);
  return new Promise((resolve) => {
    const onVoices = () => {
      synth.removeEventListener("voiceschanged", onVoices);
      resolve(synth.getVoices());
    };
    synth.addEventListener("voiceschanged", onVoices);
  });
}
