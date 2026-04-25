import type { CarePlan } from "./carePlanTypes";

export function cloneCarePlan(plan: CarePlan): CarePlan {
  return JSON.parse(JSON.stringify(plan)) as CarePlan;
}

/** Deterministic mock translations for hackathon demos when no AI key is configured. */
export function mockLocalizeCarePlan(english: CarePlan, lang: string): CarePlan {
  if (lang === "English") {
    const p = cloneCarePlan(english);
    p.language = "English";
    return p;
  }

  const p = cloneCarePlan(english);
  p.language = lang;
  const t = TABLE[lang];
  if (!t) {
    p.diagnosisSummary = `[${lang}] ${p.diagnosisSummary}`;
    p.reminders = p.reminders.map((r) => `[${lang}] ${r}`);
    return p;
  }

  p.patientName = t.patientName ?? p.patientName;
  p.diagnosisSummary = t.diagnosisSummary;
  p.medications = p.medications.map((m, i) => ({
    ...m,
    name: t.medications[i]?.name ?? m.name,
    dosage: t.medications[i]?.dosage ?? m.dosage,
    frequency: t.medications[i]?.frequency ?? m.frequency,
    instructions: t.medications[i]?.instructions ?? m.instructions,
  }));
  p.careInstructions = p.careInstructions.map((c, i) => ({
    ...c,
    instruction: t.careInstructions[i]?.instruction ?? c.instruction,
    simplifiedExplanation: t.careInstructions[i]?.simplifiedExplanation ?? c.simplifiedExplanation,
  }));
  p.redFlags = p.redFlags.map((r, i) => ({
    ...r,
    symptom: t.redFlags[i]?.symptom ?? r.symptom,
    action: t.redFlags[i]?.action ?? r.action,
  }));
  p.followUpAppointments = p.followUpAppointments.map((f, i) => ({
    ...f,
    date: t.followUp[i]?.date ?? f.date,
    provider: t.followUp[i]?.provider ?? f.provider,
    location: t.followUp[i]?.location ?? f.location,
    instructions: t.followUp[i]?.instructions ?? f.instructions,
  }));
  p.contactInfo = p.contactInfo.map((c, i) => ({
    ...c,
    name: t.contacts[i]?.name ?? c.name,
    role: t.contacts[i]?.role ?? c.role,
    phone: t.contacts[i]?.phone ?? c.phone,
  }));
  p.reminders = t.reminders ?? p.reminders;
  return p;
}

type LangTable = {
  patientName?: string;
  diagnosisSummary: string;
  medications: Partial<CarePlan["medications"][number]>[];
  careInstructions: Partial<CarePlan["careInstructions"][number]>[];
  redFlags: Partial<CarePlan["redFlags"][number]>[];
  followUp: Partial<CarePlan["followUpAppointments"][number]>[];
  contacts: Partial<CarePlan["contactInfo"][number]>[];
  reminders?: string[];
};

const TABLE: Record<string, LangTable> = {
  Spanish: {
    patientName: "María Rivera",
    diagnosisSummary:
      "Recuperación de neumonía tras el alta hospitalaria. La paciente está estable pero necesita manejo de medicamentos durante los próximos 7 días.",
    medications: [
      {
        name: "Amoxicilina",
        dosage: "500 mg",
        frequency: "dos veces al día durante 7 días",
        instructions: "Tomar con alimentos.",
      },
      {
        name: "Acetaminofén",
        dosage: "500 mg",
        frequency: "cada 6 horas según necesidad para la fiebre",
        instructions: "No superar 3000 mg en 24 horas.",
      },
      {
        name: "Inhalador de albuterol",
        dosage: "2 inhalaciones",
        frequency: "cada 4–6 horas según necesidad por falta de aire",
        instructions: "Enjuagar la boca después de usar.",
      },
    ],
    careInstructions: [
      {
        instruction: "Descansar y beber mucho líquido (agua, caldo).",
        simplifiedExplanation: "Duerma lo suficiente y beba mucha agua.",
      },
      { instruction: "Use un humidificador de vapor frío en su habitación." },
      { instruction: "Evite la exposición al humo de segunda mano." },
    ],
    redFlags: [
      { symptom: "Dificultad para respirar", action: "Vaya a la sala de emergencias de inmediato." },
      { symptom: "Dolor en el pecho", action: "Llame al 911." },
      {
        symptom: "Fiebre por encima de 102°F a pesar del medicamento",
        action: "Contacte a su médico de cabecera o vaya a atención urgente.",
      },
      { symptom: "Labios azules o confusión grave", action: "Llame al 911 de inmediato." },
      { symptom: "Tos seca persistente que empeora", action: "Coméntelo en la próxima cita de seguimiento." },
    ],
    followUp: [
      {
        date: "En 7 días (llame para programar)",
        provider: "Dra. Smith (Atención primaria)",
        location: "Clínica de Salud Comunitaria de NYC",
        instructions: "Traiga todos los frascos de medicamentos.",
      },
    ],
    contacts: [
      {
        name: "Clínica de Salud Comunitaria de NYC",
        role: "Consultorio de atención primaria",
        phone: "555-0100",
      },
      {
        name: "Coordinadora de egreso hospitalario",
        role: "Coordinación",
        phone: "555-0200",
      },
    ],
    reminders: [
      "Programe la cita de seguimiento con su médico de cabecera.",
      "Recoja las recetas en la farmacia local.",
    ],
  },
  Chinese: {
    patientName: "玛丽亚·里维拉",
    diagnosisSummary:
      "肺炎出院后恢复期。患者情况稳定，但未来7天需要按时用药并做好居家护理。",
    medications: [
      {
        name: "阿莫西林",
        dosage: "500 毫克",
        frequency: "每日两次，连续7天",
        instructions: "随餐服用。",
      },
      {
        name: "对乙酰氨基酚",
        dosage: "500 毫克",
        frequency: "每6小时按需服用以退烧",
        instructions: "24小时内不要超过3000毫克。",
      },
      {
        name: "沙丁胺醇吸入器",
        dosage: "2喷",
        frequency: "每4–6小时按需使用以缓解气短",
        instructions: "使用后漱口。",
      },
    ],
    careInstructions: [
      { instruction: "充分休息并多喝液体（水、清汤）。", simplifiedExplanation: "保证睡眠，多喝水。" },
      { instruction: "在房间里使用冷雾加湿器。" },
      { instruction: "避免接触二手烟。" },
    ],
    redFlags: [
      { symptom: "呼吸困难", action: "立即前往急诊。" },
      { symptom: "胸痛", action: "拨打911。" },
      { symptom: "用药后仍持续高烧超过102°F", action: "联系家庭医生或前往紧急护理。" },
      { symptom: "嘴唇发紫或严重意识混乱", action: "立即拨打911。" },
      { symptom: "持续加重的干咳", action: "在下次复诊时告知医生。" },
    ],
    followUp: [
      {
        date: "7天内（请致电预约）",
        provider: "史密斯医生（初级诊疗）",
        location: "纽约市社区健康诊所",
        instructions: "带上所有药瓶。",
      },
    ],
    contacts: [
      { name: "纽约市社区健康诊所", role: "初级诊疗门诊", phone: "555-0100" },
      { name: "医院出院协调员", role: "协调员", phone: "555-0200" },
    ],
    reminders: ["预约初级诊疗复诊。", "到当地药房取药。"],
  },
  Hindi: {
    diagnosisSummary:
      "अस्पताल से छुट्टी के बाद निमोनिया से रिकवरी। मरीज़ स्थिर है लेकिन अगले 7 दिनों तक दवाओं का सही प्रबंधन ज़रूरी है।",
    medications: [
      { instructions: "भोजन के साथ लें।" },
      { instructions: "24 घंटों में 3000 mg से अधिक न लें।" },
      { instructions: "उपयोग के बाद कुल्ला करें।" },
    ],
    careInstructions: [
      { instruction: "आराम करें और खूब पानी/तरल पदार्थ पिएं।" },
      { instruction: "कमरे में कूल-मिस्ट ह्यूमिडिफ़ायर उपयोग करें।" },
      { instruction: "पैसिव धूम्रपान से बचें।" },
    ],
    redFlags: [
      { symptom: "साँस लेने में कठिनाई", action: "तुरंत इमरजेंसी रूम जाएँ।" },
      { symptom: "छाती में दर्द", action: "911 कॉल करें।" },
      { symptom: "दवा के बावजूद 102°F से अधिक बुखार", action: "प्राइमरी केयर या अर्जेंट केयर से संपर्क करें।" },
      { symptom: "होंठ नीले पड़ना या गंभीर भ्रम", action: "तुरंत 911 कॉल करें।" },
      { symptom: "लगातार खाँसी बढ़ना", action: "अगली फॉलो-अप विज़िट में चर्चा करें।" },
    ],
    followUp: [
      {
        date: "7 दिनों में (शेड्यूल करने के लिए कॉल करें)",
        instructions: "सभी दवा की बोतलें साथ लाएँ।",
      },
    ],
    contacts: [{ name: "NYC सामुदायिक स्वास्थ्य क्लिनिक", role: "प्राथमिक देखभाल कार्यालय" }],
    reminders: ["फॉलो-अप अपॉइंटमेंट बुक करें।", "नज़दीकी फार्मेसी से दवाएँ लें।"],
  },
  Bengali: {
    diagnosisSummary:
      "হাসপাতাল থেকে ছাড়পত্রের পর নিউমোনিয়া থেকে সুস্থ হওয়ার সময়। রোগী স্থিতিশীল, তবে পরবর্তী ৭ দিন ওষুধ সঠিকভাবে নিতে হবে।",
    medications: [
      { instructions: "খাবারের সাথে খান।" },
      { instructions: "২৪ ঘণ্টায় ৩০০০ মিলিগ্রামের বেশি নয়।" },
      { instructions: "ব্যবহারের পর কুলকুচি করুন।" },
    ],
    careInstructions: [
      { instruction: "বিশ্রাম নিন এবং প্রচুর পানি/তরল খান।" },
      { instruction: "ঘরে কুল-মিস্ট হিউমিডিফায়ার ব্যবহার করুন।" },
      { instruction: "প্যাসিভ স্মোকিং এড়িয়ে চলুন।" },
    ],
    redFlags: [
      { symptom: "শ্বাস নিতে কষ্ট", action: "তৎক্ষণাৎ ইমার্জেন্সিতে যান।" },
      { symptom: "বুকে ব্যথা", action: "৯১১ কল করুন।" },
      { symptom: "ওষুধ সত্ত্বেও ১০২°F এর বেশি জ্বর", action: "প্রাথমিক সেবা বা আর্জেন্ট কেয়ারে যোগাযোগ করুন।" },
      { symptom: "ঠোঁট নীল বা গুরুতর বিভ্রান্তি", action: "অবিলম্বে ৯১১ কল করুন।" },
      { symptom: "স্থায়ী শুষ্ক কাশি বাড়ছে", action: "পরবর্তী ফলো-আপে আলোচনা করুন।" },
    ],
    followUp: [{ date: "৭ দিনের মধ্যে (সময় নির্ধারণে কল করুন)", instructions: "সব ওষুধের বোতল নিয়ে আসুন।" }],
    contacts: [{ name: "NYC কমিউনিটি হেলথ ক্লিনিক", role: "প্রাথমিক সেবা অফিস" }],
    reminders: ["ফলো-আপ অ্যাপয়েন্টমেন্ট নিন।", "স্থানীয় ফার্মেসি থেকে ওষুধ নিন।"],
  },
  Korean: {
    patientName: "마리아 리베라",
    diagnosisSummary:
      "폐렴 치료 후 퇴원 회복기입니다. 환자는 안정적이나 향후 7일간 약물 관리가 필요합니다.",
    medications: [
      { name: "아목시실린", dosage: "500 mg", frequency: "7일간 하루 2회", instructions: "식사와 함께 복용하세요." },
      {
        name: "아세트아미노펜",
        dosage: "500 mg",
        frequency: "발열 시 6시간마다 필요 시",
        instructions: "24시간에 3000mg를 초과하지 마세요.",
      },
      {
        name: "알부테롤 흡입기",
        dosage: "2회 흡입",
        frequency: "호흡곤란 시 4–6시간마다 필요 시",
        instructions: "사용 후 입을 헹구세요.",
      },
    ],
    careInstructions: [
      { instruction: "충분히 쉬고 수분(물, 육수)을 많이 섭취하세요.", simplifiedExplanation: "잠을 충분히 자고 물을 많이 드세요." },
      { instruction: "방에 쿨미스트 가습기를 사용하세요." },
      { instruction: "간접흡연을 피하세요." },
    ],
    redFlags: [
      { symptom: "호흡 곤란", action: "즉시 응급실로 가세요." },
      { symptom: "가슴 통증", action: "911에 전화하세요." },
      { symptom: "약을 복용해도 102°F 이상의 열", action: "주치의 또는 응급 진료에 연락하세요." },
      { symptom: "입술이 파래지거나 심한 혼란", action: "즉시 911에 전화하세요." },
      { symptom: "지속적인 마른 기침 악화", action: "다음 추적 방문에서 논의하세요." },
    ],
    followUp: [
      {
        date: "7일 이내 (예약을 위해 전화)",
        provider: "스미스 박사 (일차 진료)",
        location: "NYC 커뮤니티 헬스 클리닉",
        instructions: "모든 약 병을 가져오세요.",
      },
    ],
    contacts: [
      { name: "NYC 커뮤니티 헬스 클리닉", role: "일차 진료 클리닉", phone: "555-0100" },
      { name: "퇴원 코디네이터", role: "코디네이터", phone: "555-0200" },
    ],
    reminders: ["일차 진료 추적 방문을 예약하세요.", "근처 약국에서 처방전을 받으세요."],
  },
  Russian: {
    patientName: "Мария Ривера",
    diagnosisSummary:
      "Восстановление после пневмонии после выписки из больницы. Состояние стабильное, но 7 дней требуется контроль приёма лекарств.",
    medications: [
      { name: "Амоксициллин", dosage: "500 мг", frequency: "два раза в день 7 дней", instructions: "Принимать во время еды." },
      {
        name: "Ацетаминофен",
        dosage: "500 мг",
        frequency: "каждые 6 часов при необходимости от жара",
        instructions: "Не больше 3000 мг за 24 часа.",
      },
      {
        name: "Ингалятор альбутерола",
        dosage: "2 ингаляции",
        frequency: "каждые 4–6 часов при одышке",
        instructions: "Полоскать рот после использования.",
      },
    ],
    careInstructions: [
      { instruction: "Отдыхайте и пейте много жидкости (вода, бульон).", simplifiedExplanation: "Высыпайтесь и пейте больше воды." },
      { instruction: "Используйте прохладный увлажнитель воздуха в комнате." },
      { instruction: "Избегайте пассивного курения." },
    ],
    redFlags: [
      { symptom: "Затруднённое дыхание", action: "Немедленно в отделение неотложной помощи." },
      { symptom: "Боль в груди", action: "Звоните 911." },
      { symptom: "Температура выше 102°F несмотря на лекарства", action: "Свяжитесь с терапевтом или срочной помощью." },
      { symptom: "Синие губы или сильная спутанность сознания", action: "Немедленно звоните 911." },
      { symptom: "Нарастающий сухой кашель", action: "Обсудите на следующем приёме." },
    ],
    followUp: [
      {
        date: "Через 7 дней (запишитесь по телефону)",
        provider: "Доктор Смит (первичная помощь)",
        location: "Клиника общественного здоровья NYC",
        instructions: "Принесите все флаконы с лекарствами.",
      },
    ],
    contacts: [
      { name: "Клиника общественного здоровья NYC", role: "Кабинет первичной помощи", phone: "555-0100" },
      { name: "Координатор по выписке", role: "Координатор", phone: "555-0200" },
    ],
    reminders: [
      "Запланируйте последующий визит к терапевту.",
      "Заберите рецепты в местной аптеке.",
    ],
  },
};
