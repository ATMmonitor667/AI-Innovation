import { CarePlan } from "./carePlanTypes";

export const mockCarePlan: CarePlan = {
  id: "cp-12345",
  patientName: "Maria Rivera",
  diagnosisSummary: "Pneumonia recovery after hospital discharge. Patient is stable but requires medication management for the next 7 days.",
  medications: [
    {
      name: "Amoxicillin",
      dosage: "500 mg",
      frequency: "twice daily for 7 days",
      instructions: "Take with food.",
      confidence: "High"
    },
    {
      name: "Acetaminophen",
      dosage: "500 mg",
      frequency: "every 6 hours as needed for fever",
      instructions: "Do not exceed 3000mg in 24 hours.",
      confidence: "High"
    },
    {
      name: "Albuterol inhaler",
      dosage: "2 puffs",
      frequency: "every 4–6 hours as needed for shortness of breath",
      instructions: "Rinse mouth after use.",
      confidence: "Medium"
    }
  ],
  careInstructions: [
    {
      instruction: "Rest and drink plenty of fluids (water, broth).",
      simplifiedExplanation: "Get plenty of sleep and drink lots of water.",
      confidence: "High"
    },
    {
      instruction: "Use a cool mist humidifier in your room.",
      confidence: "Medium"
    },
    {
      instruction: "Avoid exposure to second-hand smoke.",
      confidence: "High"
    }
  ],
  redFlags: [
    {
      symptom: "Difficulty breathing",
      action: "Go to Emergency Room immediately.",
      confidence: "High"
    },
    {
      symptom: "Chest pain",
      action: "Call 911.",
      confidence: "High"
    },
    {
      symptom: "Fever above 102°F despite medication",
      action: "Contact primary care or go to urgent care.",
      confidence: "Medium"
    },
    {
      symptom: "Blue lips or severe confusion",
      action: "Call 911 immediately.",
      confidence: "High"
    },
    {
      symptom: "Persistent dry cough developing",
      action: "Discuss at next follow-up.",
      confidence: "Low"
    }
  ],
  followUpAppointments: [
    {
      date: "In 7 days (Please call to schedule)",
      provider: "Dr. Smith (Primary Care)",
      location: "NYC Community Health Clinic",
      instructions: "Bring all medication bottles.",
      confidence: "High"
    }
  ],
  contactInfo: [
    {
      name: "NYC Community Health Clinic",
      role: "Primary Care Office",
      phone: "555-0100",
      confidence: "High"
    },
    {
      name: "Hospital Discharge Coordinator",
      role: "Coordinator",
      phone: "555-0200",
      confidence: "Medium"
    }
  ],
  reminders: [
    "Schedule primary care follow-up appointment.",
    "Pick up prescriptions from local pharmacy."
  ],
  language: "English",
  createdAt: new Date().toISOString()
};
