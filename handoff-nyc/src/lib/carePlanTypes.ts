export type Confidence = "High" | "Medium" | "Low";

export type Medication = {
  name: string;
  dosage: string;
  frequency: string;
  instructions: string;
  confidence: Confidence;
};

export type CareInstruction = {
  instruction: string;
  simplifiedExplanation?: string;
  confidence: Confidence;
};

export type RedFlag = {
  symptom: string;
  action: string;
  confidence: Confidence;
};

export type FollowUpAppointment = {
  date: string;
  provider: string;
  location: string;
  instructions: string;
  confidence: Confidence;
};

export type ContactInfo = {
  name: string;
  role: string;
  phone: string;
  confidence: Confidence;
};

export type CarePlan = {
  id: string;
  patientName: string;
  diagnosisSummary: string;
  medications: Medication[];
  careInstructions: CareInstruction[];
  redFlags: RedFlag[];
  followUpAppointments: FollowUpAppointment[];
  contactInfo: ContactInfo[];
  reminders: string[];
  language: string;
  createdAt: string;
};
