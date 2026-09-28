export const OKURIO_POSITIONING = Object.freeze({
  category: "Kişiselleştirilmiş Okuma Platformu",
  categoryEn: "Adaptive Reading Platform for Schools",
  oneLiner:
    "Okurio, her öğrenciye yaşına ve okuma yoluna uygun metni ve desteği sunan; öğretmenlerin bireyselleştirilmiş okumayı sınıfta ölçeklemesini kolaylaştıran Türkçe dijital okuma platformudur.",
  consumerLine:
    "Yaşına, okuma yoluna ve seçtiğin desteklere göre uyarlanan Türkçe okuma deneyimi.",
  schoolPromise:
    "Doğru öğrenciye doğru metni ve doğru okuma desteğini tek bir uygulanabilir sistemde buluştur.",
});

export const OKURIO_VALUE_LAYERS = Object.freeze({
  commodity: Object.freeze([
    "font",
    "spacing",
    "theme",
    "reading-ruler",
    "text-to-speech",
    "browser-extension",
  ]),
  differentiation: Object.freeze([
    "age-based-reading-paths",
    "turkish-age-fit-word-support",
    "curated-content-library",
    "reading-level-policy",
    "adaptive-support-profile",
    "content-quality-governance",
  ]),
  monetization: Object.freeze([
    "student-groups",
    "teacher-workflow",
    "assignment",
    "progress-insights",
    "school-content",
    "usage-analytics",
    "onboarding",
    "support",
  ]),
});

export const OKURIO_SCHOOL_PRICING_ARCHITECTURE = Object.freeze({
  model: "platform-fee-plus-active-student-band",
  teacherAccounts: "included",
  browserExtension: "included",
  onboarding: "included-in-annual-license",
  pilot: "separate-paid-program",
  enterpriseAddOns: Object.freeze(["sso", "custom-integration", "custom-content-program"]),
});

export const OKURIO_STRATEGIC_GUARDRAILS = Object.freeze([
  "Do not position font, TTS, spacing or the browser extension as premium differentiation.",
  "Do not make diagnostic, therapeutic or clinical efficacy claims.",
  "Lead with reading-path fit, Turkish content, teacher workflow and actionable progress insight.",
  "Treat the browser extension as a distribution layer of the Okurio system, not a standalone moat.",
  "Build proprietary advantage around student × reading path × support × content × outcome signals.",
]);
