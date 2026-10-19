/**
 * Okurio AI kanıt onayı (prototip fazı) — K-2026-10-18-07.
 *
 * Prototip ve pilot fazında içerikler insan editör yerine, kaynakları açıkça
 * kaydedilen bir AI kanıt denetiminden geçer. Bu kayıt insan onayı DEĞİLDİR:
 * contentQualityReview (insan inceleme şeması 2.0), reviewerName, ownerApproval
 * ve releaseReady alanlarına dokunmaz ve publicationReady sonucunu değiştirmez.
 * Gelir modeli başladığında insan onayı bu kaydın üstüne eklenir.
 *
 * Kamuya açık ifade (sunum, arayüz): "AI destekli kanıt denetiminden geçti".
 * "Uzman onaylı", "insan onaylı" veya "bilimsel olarak kanıtlanmış" denmez.
 *
 * Kayıtlar: ontology/reviews/ai-kanit/<icerikId>.json
 *
 * Not: node:crypto kullandığı için yalnız Node betikleri ve testlerden içe
 * aktarılır; uygulama paketine (App.jsx) dahil edilmez.
 */
import { createHash } from "node:crypto";

export const AI_EVIDENCE_REVIEW_SCHEMA_VERSION = "1.0";

export const AI_EVIDENCE_STATUSES = Object.freeze(["ai-onayli", "ai-duzeltme-gerekli", "ai-durdur"]);

/** Gözetim ajanının beş denetimi ve kanıt denetimi. */
export const AI_EVIDENCE_CHECKS = Object.freeze([
  "dilSeviyesi",
  "guvenlik",
  "hakOzgunluk",
  "mufredat",
  "erisilebilirlik",
  "olgusalKanit",
]);

export const CHECK_RESULTS = Object.freeze(["gecti", "uygulanmaz", "bulgu"]);

export const CLAIM_TYPES = Object.freeze(["olgusal", "pedagojik", "destek-araci", "saglik-guvenlik"]);
export const CLAIM_RESULTS = Object.freeze(["destekleniyor", "kismen", "desteklenmiyor", "dogrulanamadi"]);
export const EVIDENCE_STRENGTH = Object.freeze(["guclu", "orta", "zayif"]);

/** Kabul edilen kaynak türleri; her biri tanımlayıcı ister. */
export const EVIDENCE_SOURCES = Object.freeze(["PubMed", "Consensus", "resmi-kurum", "birincil-metin"]);

export const PUBLIC_LABEL = "AI destekli kanıt denetiminden geçti";
export const FORBIDDEN_PUBLIC_CLAIMS = Object.freeze(["uzman onaylı", "insan onaylı", "bilimsel olarak kanıtlanmış", "editör onaylı"]);

const nonEmpty = (v) => typeof v === "string" && v.trim().length > 0;

/** İçerik metninin parmak izi; metin değişirse AI onayı geçersiz olur. */
export function contentFingerprint(bolumler = []) {
  const text = bolumler.map((b) => String(b?.metin ?? "")).join("\n").normalize("NFC");
  return `sha256:${createHash("sha256").update(text, "utf8").digest("hex")}`;
}

const evidenceHasIdentifier = (e) =>
  EVIDENCE_SOURCES.includes(e?.kaynak) &&
  (nonEmpty(e?.pmid) || nonEmpty(e?.doi) || nonEmpty(e?.url)) &&
  nonEmpty(e?.baslik);

/**
 * Bir AI kanıt kaydını doğrular.
 * @returns {{ valid: boolean, aiApproved: boolean, errors: string[], blockers: string[] }}
 */
export function evaluateAiEvidenceReview(record, { fingerprint } = {}) {
  const errors = [];
  const blockers = [];
  if (!record || typeof record !== "object") return { valid: false, aiApproved: false, errors: ["kayıt yok"], blockers: [] };

  if (record.schemaVersion !== AI_EVIDENCE_REVIEW_SCHEMA_VERSION) errors.push("schemaVersion 1.0 olmalı");
  if (record.reviewType !== "ai-evidence") errors.push("reviewType ai-evidence olmalı");
  if (!nonEmpty(record.icerikId)) errors.push("icerikId eksik");
  if (!AI_EVIDENCE_STATUSES.includes(record.status)) errors.push("status geçersiz");
  for (const f of ["model", "reviewedAt", "reviewedCommit", "contentFingerprint", "sinirlar"]) {
    if (!nonEmpty(record[f])) errors.push(`${f} eksik`);
  }
  // İnsan onayı alanları bu kayıtta bulunamaz (K-2026-10-18-07).
  for (const f of ["reviewerName", "ownerName", "ownerApproval", "releaseReady", "humanApproved"]) {
    if (Object.hasOwn(record, f)) errors.push(`${f} AI kaydında bulunamaz`);
  }
  if (record.insanOnayi !== "bekliyor") errors.push("insanOnayi 'bekliyor' olmalı");

  const checks = record.checks ?? {};
  for (const key of AI_EVIDENCE_CHECKS) {
    const c = checks[key];
    if (!c || !CHECK_RESULTS.includes(c.sonuc)) errors.push(`checks.${key} eksik veya geçersiz`);
    else if (c.sonuc === "bulgu") blockers.push(`${key}: ${c.not ?? "bulgu"}`);
    if (c && c.sonuc !== "uygulanmaz" && !nonEmpty(c.ajan)) errors.push(`checks.${key}.ajan eksik`);
  }

  const claims = Array.isArray(record.iddialar) ? record.iddialar : null;
  if (!claims) errors.push("iddialar listesi eksik (iddia yoksa boş liste)");
  for (const [i, claim] of (claims ?? []).entries()) {
    if (!nonEmpty(claim?.iddia)) errors.push(`iddialar[${i}].iddia eksik`);
    if (!CLAIM_TYPES.includes(claim?.tur)) errors.push(`iddialar[${i}].tur geçersiz`);
    if (!CLAIM_RESULTS.includes(claim?.sonuc)) errors.push(`iddialar[${i}].sonuc geçersiz`);
    const ev = Array.isArray(claim?.kanit) ? claim.kanit : [];
    if (claim?.sonuc === "destekleniyor" || claim?.sonuc === "kismen") {
      if (!ev.length) errors.push(`iddialar[${i}] destekleniyor diyor ama kanıt yok`);
      ev.forEach((e, j) => {
        if (!evidenceHasIdentifier(e)) errors.push(`iddialar[${i}].kanit[${j}] kaynak, başlık ve PMID/DOI/URL ister`);
        if (!EVIDENCE_STRENGTH.includes(e?.kanitGucu)) errors.push(`iddialar[${i}].kanit[${j}].kanitGucu geçersiz`);
      });
    }
    if (claim?.sonuc === "desteklenmiyor" || claim?.sonuc === "dogrulanamadi") {
      blockers.push(`iddia ${claim?.sonuc}: ${claim?.iddia}`);
    }
  }

  if (nonEmpty(fingerprint) && nonEmpty(record.contentFingerprint) && record.contentFingerprint !== fingerprint) {
    blockers.push("metin AI denetiminden sonra değişti; yeniden denetim gerekli");
  }

  const valid = errors.length === 0;
  const aiApproved = valid && record.status === "ai-onayli" && blockers.length === 0;
  if (valid && record.status === "ai-onayli" && blockers.length) errors.push("status ai-onayli ama engelleyici var");
  return { valid: errors.length === 0, aiApproved, errors, blockers };
}
