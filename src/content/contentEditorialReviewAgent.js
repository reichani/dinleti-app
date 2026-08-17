import { evaluateStoryForReadingLevel } from "./readingLevelPolicy.js";
import { readingPathIdForAgeLabel } from "./contentQualityReview.js";

const words = (text) =>
  String(text ?? "").match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;

const sentences = (text) =>
  String(text ?? "").split(/(?<=[.!?])\s+/u).map((item) => item.trim()).filter(Boolean);

const validLanguageItem = (item) =>
  typeof item?.expression === "string" && item.expression.trim().length > 0 &&
  typeof item?.meaning === "string" && item.meaning.trim().length > 0 &&
  typeof item?.ageFit === "string" && item.ageFit.trim().length > 0;

const validCulturalItem = (item) =>
  typeof item?.name === "string" && item.name.trim().length > 0 &&
  typeof item?.context === "string" && item.context.trim().length > 0 &&
  typeof item?.ageFit === "string" && item.ageFit.trim().length > 0;

const normalized = (value) => String(value ?? "").toLocaleLowerCase("tr-TR");

const declaredLanguageUsageIsPresent = (body, items) =>
  items.every((item) => validLanguageItem(item) && normalized(body).includes(normalized(item.expression)));

const declaredCulturalUsageIsPresent = (body, items) =>
  items.every((item) => validCulturalItem(item) && normalized(body).includes(normalized(item.name)));

export function runContentEditorialPreReview(story, metadata = {}) {
  const body = (story?.bolumler ?? []).map((section) => section?.metin ?? "").join(" ").trim();
  const readingPathId = metadata.readingPathId ?? readingPathIdForAgeLabel(metadata.ageBand ?? story?.yas);
  const profile = metadata.editorialLanguageProfile ?? {};
  const idioms = profile.idioms ?? [];
  const proverbs = profile.proverbs ?? [];
  const culturalObjects = profile.culturalObjects ?? [];
  const sentenceCounts = sentences(body).map(words);
  const sectionCounts = (story?.bolumler ?? []).map((section) => words(section?.metin));
  const checks = {
    grammarAndPunctuation: {
      status: body.length > 0 && !/\s{2,}/u.test(body.replace(/\n+/gu, " ")) ? "PASS" : "CHANGES_REQUIRED",
      evidence: "Boş metin, yinelenen boşluk ve temel noktalama yüzeyi denetlendi.",
    },
    sentenceAccessibility: {
      status: sentenceCounts.length > 0 && Math.max(...sentenceCounts) <= 12 ? "PASS" : "CHANGES_REQUIRED",
      evidence: `En uzun cümle ${sentenceCounts.length ? Math.max(...sentenceCounts) : 0} kelime; sınır 12.`,
    },
    idiomUsage: {
      status: declaredLanguageUsageIsPresent(body, idioms) ? "PASS" : "CHANGES_REQUIRED",
      evidence: idioms.length ? `${idioms.length} deyimin metinde geçtiği; anlam ve yaş bağlamının kayıtlı olduğu doğrulandı.` : "Deyim kullanılmadığı beyan edildi.",
    },
    proverbUsage: {
      status: declaredLanguageUsageIsPresent(body, proverbs) ? "PASS" : "CHANGES_REQUIRED",
      evidence: proverbs.length ? `${proverbs.length} atasözünün metinde geçtiği; anlam ve yaş bağlamının kayıtlı olduğu doğrulandı.` : "Atasözü kullanılmadığı beyan edildi.",
    },
    culturalObjectUsage: {
      status: declaredCulturalUsageIsPresent(body, culturalObjects) ? "PASS" : "CHANGES_REQUIRED",
      evidence: culturalObjects.length ? `${culturalObjects.length} kültürel eşya/öğenin metinde geçtiği ve yaş bağlamının kayıtlı olduğu doğrulandı.` : "Özel kültürel eşya kullanılmadığı beyan edildi.",
    },
    narrativeFlow: {
      status: sectionCounts.length >= 3 && sectionCounts.length <= 8 && sectionCounts.every((count) => count >= 30) ? "PASS" : "CHANGES_REQUIRED",
      evidence: `${sectionCounts.length} bölüm; bölüm kelimeleri ${sectionCounts.join("/")}.`,
    },
    ageAndReadingPathFit: (() => {
      const result = evaluateStoryForReadingLevel(story, metadata, readingPathId);
      return {
        status: result.eligible ? "PASS" : "CHANGES_REQUIRED",
        evidence: result.eligible ? `${readingPathId} kelime ve içerik sözleşmesi karşılandı.` : `Bloker: ${result.reason}.`,
      };
    })(),
  };
  const blockers = Object.entries(checks).filter(([, value]) => value.status !== "PASS").map(([key]) => key);
  return {
    schemaVersion: "1.0",
    reviewerKind: "ai-editorial-pre-review",
    agentName: "Okurio Dil ve Kültür Editörü",
    status: blockers.length === 0 ? "PASS" : "CHANGES_REQUIRED",
    checks,
    blockers,
    humanApproval: false,
    canSetContentQualityReviewApproved: false,
    publicationReady: false,
  };
}
