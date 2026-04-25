# Handoff NYC

**Turning confusing discharge papers into clear care plans families can understand.**

## BMCC/CUNY AI Innovation Challenge
- **Track**: AI Software Track
- **Theme**: AI for Health & Public Good

## Problem
Patients and caregivers often leave hospitals with confusing discharge documents full of medical jargon. Multilingual families, elderly patients, immigrant communities, and caregivers struggle to understand what to do after discharge, leading to poor health outcomes or readmission.

## Solution
Handoff NYC is an AI-powered web app that transforms complex hospital discharge documents into clear, translated, and voice-enabled care plans for patients and caregivers. It prioritizes health equity by making critical medical instructions accessible.

## Features
- **Upload & Extract**: AI extracts medications, red flags, and follow-ups from unstructured discharge texts.
- **Multilingual Support**: Instantly translates care plans into 6+ languages.
- **Audio Briefings**: Text-to-speech reads out critical medications and warning signs.
- **Plain Language Explanations**: "Explain simply" buttons translate medical jargon into plain English.
- **Safety First**: AI Confidence Labels flag low/medium confidence data for human review.

## Tech Stack
- Frontend: Next.js (App Router), React, Tailwind CSS, Lucide React, Framer Motion
- Backend: Next.js Route Handlers
- Data: Deterministic Mock Data (MVP Fallback)
- Speech: Browser Web Speech API

## Responsible AI & Safety
Handoff NYC helps explain existing discharge instructions. **It is not medical advice.** The system never invents information not present in the document. All AI outputs carry confidence labels to keep humans in the loop.

## Setup & Run Locally
1. Navigate to the project folder:
   ```bash
   cd handoff-nyc
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000)

*(Note: The app contains deterministic mock data so that the demo flow works perfectly without API keys.)*

## Environment Variables (Optional)
If extending the project, add a `.env.local` file:
```env
OPENAI_API_KEY=your_key_here
GEMINI_API_KEY=your_key_here
```

## Demo Flow for Judging
1. Open the **Landing Page** and explain the problem.
2. Click **Start Demo** to navigate to the Upload Page.
3. Show the **Safety Disclaimer**.
4. Click **Use Sample Discharge Document**.
5. Emphasize the **Processing Steps** (extraction, translating, confidence checks).
6. Explore the **Dashboard**: Highlight medications and red flags.
7. Click the **Explain simply** button on a medication.
8. Switch the language to Spanish or Chinese.
9. Click **Play Audio Briefing**.
10. Point out the **Medium/Low Confidence Labels** requiring human review.

## Team
- **Pirtom Shil Supta** — UI Designer / UX Designer / Slides & Visual Design
- **Rahat Hossain** — Backend Developer / AI Integration / API Design
- **Israel Pina** — Frontend Developer / Frontend Designer
