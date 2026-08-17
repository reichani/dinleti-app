export const CONTENT_QUALITY_REVIEW_SCHEMA_VERSION = "2.0";

export const CONTENT_QUALITY_REVIEW_STATUSES = Object.freeze([
  "pending",
  "approved",
  "changes_requested",
  "rejected",
]);

export const UNIVERSAL_REVIEW_CHECKS = Object.freeze([
  "narrativeArc",
  "ageFit",
  "sectionContinuity",
  "characterConsistency",
  "languageQuality",
  "factualAccuracy",
  "originalityRights",
  "accessibilityTone",
]);

export const READING_PATH_REVIEW_CRITERIA = Object.freeze({
  okul_oncesi_3_4: Object.freeze([
    "listeningComprehension",
    "soundClarity",
    "safeRepetition",
    "noReadingExpectation",
  ]),
  okumaya_hazirlik_5_6: Object.freeze([
    "phonologicalAwareness",
    "soundPatternClarity",
    "preReadingLoad",
    "guidedListeningFit",
  ]),
  ilk_harfler_6_7: Object.freeze([
    "graphemePhonemeFit",
    "approvedLetterSequence",
    "syllableLoad",
    "decodableVocabulary",
  ]),
  ilk_cumleler_7_8: Object.freeze([
    "independentSentenceFit",
    "punctuationClarity",
    "shortParagraphFlow",
    "repetitionPurpose",
  ]),
  okuma_guveni_8_10: Object.freeze([
    "sustainedReadingFit",
    "controlledVocabulary",
    "glossarySupport",
    "narrativeDepth",
  ]),
  akici_okuma_10_12: Object.freeze([
    "paragraphFluency",
    "inferenceLoad",
    "informationDensity",
    "glossarySupport",
  ]),
  genc_okurlar_12_14: Object.freeze([
    "longFormArc",
    "vocabularyMaturity",
    "sectionDepth",
    "nonChildishTone",
  ]),
  klasiklere_hazirlik_14_16: Object.freeze([
    "classicsBridge",
    "contextualComplexity",
    "interpretiveDepth",
    "genreLiteracy",
  ]),
  lise_okuma_16_18: Object.freeze([
    "advancedTheme",
    "academicReadingFit",
    "genreLiteracy",
    "syntaxAccessibility",
  ]),
  yetiskin_odak_18: Object.freeze([
    "adultTone",
    "nonInfantilizingLanguage",
    "returnToReadingFit",
    "sustainedFocusLoad",
  ]),
});

const READING_PATH_BY_AGE_LABEL = Object.freeze({
  "3-4": "okul_oncesi_3_4",
  "3-5": "okul_oncesi_3_4",
  "3-6": "okumaya_hazirlik_5_6",
  "4-6": "okumaya_hazirlik_5_6",
  "5-6": "okumaya_hazirlik_5_6",
  "5-7": "ilk_harfler_6_7",
  "5-8": "ilk_harfler_6_7",
  "6-7": "ilk_harfler_6_7",
  "6-8": "ilk_cumleler_7_8",
  "6-9": "ilk_cumleler_7_8",
  "7-8": "ilk_cumleler_7_8",
  "7-10": "okuma_guveni_8_10",
  "7-12": "akici_okuma_10_12",
  "8-10": "okuma_guveni_8_10",
  "10-12": "akici_okuma_10_12",
  "10+": "akici_okuma_10_12",
  "11-16": "genc_okurlar_12_14",
  "12-14": "genc_okurlar_12_14",
  "12+": "genc_okurlar_12_14",
  "13+": "genc_okurlar_12_14",
  "14-16": "klasiklere_hazirlik_14_16",
  "14-18": "lise_okuma_16_18",
  "16-18": "lise_okuma_16_18",
  "16+": "lise_okuma_16_18",
  "18+": "yetiskin_odak_18",
});

export function readingPathIdForAgeLabel(value) {
  const normalized = String(value ?? "")
    .toLocaleLowerCase("tr-TR")
    .replace(/[–—]/gu, "-")
    .replace(/\s+/gu, "")
    .replace(/yaş|yas/gu, "");
  return READING_PATH_BY_AGE_LABEL[normalized] ?? null;
}

const isNonEmpty = (value) => typeof value === "string" && value.trim().length > 0;
const allTrue = (record, keys) => keys.every((key) => record?.[key] === true);

export function createPendingContentQualityReview(readingPathId) {
  const pathCriteria = READING_PATH_REVIEW_CRITERIA[readingPathId] ?? [];
  return {
    schemaVersion: CONTENT_QUALITY_REVIEW_SCHEMA_VERSION,
    status: "pending",
    reviewerName: "",
    reviewedAt: "",
    reviewedCommit: "",
    reviewNotes: "",
    readingPathId,
    checklist: Object.fromEntries(UNIVERSAL_REVIEW_CHECKS.map((key) => [key, false])),
    readingPathChecklist: Object.fromEntries(pathCriteria.map((key) => [key, false])),
  };
}

export function normalizeContentQualityReview(review, readingPathId) {
  const pending = createPendingContentQualityReview(readingPathId);
  const source = review && typeof review === "object" ? review : {};
  const hasCompleteHumanEvidence =
    source.status === "approved" &&
    isNonEmpty(source.reviewerName) &&
    isNonEmpty(source.reviewedAt) &&
    isNonEmpty(source.reviewedCommit) &&
    isNonEmpty(source.reviewNotes);

  return {
    ...pending,
    ...source,
    status: hasCompleteHumanEvidence
      ? "approved"
      : CONTENT_QUALITY_REVIEW_STATUSES.includes(source.status)
        ? source.status === "approved" ? "pending" : source.status
        : "pending",
    reviewNotes: source.reviewNotes ?? source.note ?? "",
    readingPathId,
    checklist: { ...pending.checklist, ...(source.checklist ?? {}) },
    readingPathChecklist: {
      ...pending.readingPathChecklist,
      ...(source.readingPathChecklist ?? {}),
    },
    legacyStatus: source.status && source.status !== "pending" ? source.status : undefined,
  };
}

export function evaluateContentQualityReview(review, {
  readingPathId,
  deployedCommit = "",
} = {}) {
  const normalized = normalizeContentQualityReview(review, readingPathId);
  const schemaBlockers = [];
  const approvalBlockers = [];
  const pathCriteria = READING_PATH_REVIEW_CRITERIA[readingPathId];

  if (!pathCriteria) schemaBlockers.push("readingPathId is unknown.");
  if (normalized.schemaVersion !== CONTENT_QUALITY_REVIEW_SCHEMA_VERSION) {
    schemaBlockers.push("contentQualityReview schemaVersion must be 2.0.");
  }
  if (!CONTENT_QUALITY_REVIEW_STATUSES.includes(normalized.status)) {
    schemaBlockers.push("contentQualityReview status is invalid.");
  }

  if (normalized.status !== "approved") approvalBlockers.push("Human review is not approved.");
  if (!isNonEmpty(normalized.reviewerName)) approvalBlockers.push("reviewerName is missing.");
  if (!isNonEmpty(normalized.reviewedAt)) approvalBlockers.push("reviewedAt is missing.");
  if (!isNonEmpty(normalized.reviewedCommit)) approvalBlockers.push("reviewedCommit is missing.");
  if (!isNonEmpty(normalized.reviewNotes)) approvalBlockers.push("reviewNotes is missing.");
  if (!allTrue(normalized.checklist, UNIVERSAL_REVIEW_CHECKS)) {
    approvalBlockers.push("Universal content checklist is incomplete.");
  }
  if (pathCriteria && !allTrue(normalized.readingPathChecklist, pathCriteria)) {
    approvalBlockers.push("Reading-path checklist is incomplete.");
  }
  if (
    isNonEmpty(deployedCommit) &&
    isNonEmpty(normalized.reviewedCommit) &&
    normalized.reviewedCommit !== deployedCommit
  ) {
    approvalBlockers.push("Human review does not cover the deployed commit.");
  }

  return {
    normalized,
    candidateDeployReady: schemaBlockers.length === 0,
    publicationReady: schemaBlockers.length === 0 && approvalBlockers.length === 0,
    schemaBlockers,
    approvalBlockers,
  };
}
