import { detectTextLanguage } from "./textLanguage.js";

/* v2.10 — Kendi metnim / Ders çalışıyorum.
 * Ders kitapları ve notlar çoğu zaman Türkçe yönergeyle İngilizce metni bir arada
 * içerir. Belgenin tamamı için tek dil seçmek, İngilizce paragrafların Türkçe sesle
 * okunmasına yol açıyordu. Dil paragraf düzeyinde algılanır; ardışık aynı dildeki
 * paragraflar yaklaşık 90 kelimelik bölümlerde toplanır. Algılama cihazda yapılır,
 * metin hiçbir sunucuya gönderilmez. */

const BOLUM_KELIME_HEDEFI = 90;
const DAKIKADA_KELIME = 130;

const kelimeSay = (metin) => (String(metin || "").trim().match(/\S+/g) || []).length;

export function splitParagraphs(text) {
  return String(text || "")
    .replace(/\r\n?/g, "\n")
    .split(/\n+/)
    .map((p) => p.replace(/[ \t]+/g, " ").trim())
    .filter(Boolean);
}

/** Her paragrafın dilini döndürür. Üç kelimeden kısa paragraflar (başlık, sayfa
 *  numarası, "Exercise 3" gibi) önceki paragrafın dilini alır; böylece tek bir
 *  kısa satır sesi değiştirmez. */
export function paragraphLanguages(text) {
  const paragraflar = splitParagraphs(text);
  let onceki = null;
  const sonuc = paragraflar.map((metin) => {
    const kisa = kelimeSay(metin) < 3;
    const dil = kisa && onceki ? onceki : detectTextLanguage(metin);
    if (!kisa) onceki = dil;
    return { metin, dil };
  });
  // Belge kısa bir İngilizce başlıkla başlıyorsa ilk uzun paragrafın dilini al.
  const ilkUzun = sonuc.find((p) => kelimeSay(p.metin) >= 3);
  if (ilkUzun) {
    for (const p of sonuc) {
      if (kelimeSay(p.metin) >= 3) break;
      p.dil = ilkUzun.dil;
    }
  }
  return sonuc;
}

export function summarizeLanguages(text) {
  const paragraflar = paragraphLanguages(text);
  const en = paragraflar.filter((p) => p.dil === "en").length;
  const tr = paragraflar.length - en;
  return { toplam: paragraflar.length, tr, en, karisik: en > 0 && tr > 0, tamamenIngilizce: en > 0 && tr === 0 };
}

/** Okuma bölümlerini üretir: { ad, dk, metin, dil }. `ingilizceSesli` false ise
 *  bütün bölümler Türkçe sesle okunur (kullanıcı tercihi). */
export function buildStudySections(text, { ingilizceSesli = true } = {}) {
  const paragraflar = paragraphLanguages(text).map((p) => ({ ...p, dil: ingilizceSesli ? p.dil : "tr" }));
  const bolumler = [];
  let buf = [];
  let bufDil = null;
  let bufKelime = 0;
  const kapat = () => {
    if (!buf.length) return;
    const metin = buf.join("\n");
    bolumler.push({ ad: "", dk: Math.max(1, Math.round(kelimeSay(metin) / DAKIKADA_KELIME)), metin, dil: bufDil });
    buf = []; bufKelime = 0;
  };
  for (const p of paragraflar) {
    if (bufDil !== null && p.dil !== bufDil) kapat();
    bufDil = p.dil;
    // Uzun paragraf cümle sınırlarından bölünür; bölüm 90 kelime civarında tutulur.
    const cumleler = p.metin.match(/[^.!?…]+[.!?…]*["'”’)]*\s*/g) || [p.metin];
    let satir = [];
    for (const c of cumleler) {
      satir.push(c);
      bufKelime += kelimeSay(c);
      // Önceki sürümle aynı kural: bölüm 90 kelimeye ulaştığı cümleyle kapanır.
      if (bufKelime >= BOLUM_KELIME_HEDEFI) {
        buf.push(satir.join("").trim());
        satir = [];
        kapat();
        bufDil = p.dil;
      }
    }
    if (satir.length) buf.push(satir.join("").trim());
  }
  kapat();
  bolumler.forEach((b, i) => { b.ad = `Bölüm ${i + 1}${b.dil === "en" ? " · İngilizce" : ""}`; });
  return bolumler;
}

/** Belgenin baskın dili: İngilizce kelime sayısı Türkçeden fazlaysa "en". */
export function dominantLanguage(bolumler) {
  let en = 0; let tr = 0;
  for (const b of bolumler) { const n = kelimeSay(b.metin); if (b.dil === "en") en += n; else tr += n; }
  return en > tr ? "en" : "tr";
}
