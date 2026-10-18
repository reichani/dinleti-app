/**
 * İçerik → MEB okuma kazanımı ADAY eşlemesi (kural tabanlı, v0.1).
 *
 * Girdi: ontology/vocab/meb-kazanim.json (TYMM Türkçe programı, okuma çıktıları) ve
 * ontology/snapshots altındaki en yeni catalog-metrics dosyası.
 * Çıktı: ontology/mappings/icerik-kazanim-aday.json
 *
 * Bu dosya bir ÖNERİDİR: durum "aday-kural-tabanli". Sonraki adımlar AI eşleme önerisi
 * (scripts/ai-batch-review.mjs --mode kazanim) ve insan doğrulamasıdır (Reyhan veya Türkçe öğretmeni).
 * Kurallar:
 *  - Sınıf, içeriğin ana okuma yolunun MEB sınıf aralığının alt sınırıdır. Ana sınıfı ve 9-12 kapsam dışıdır
 *    (program 1-8. sınıfları kapsar). İngilizce içerikler Türkçe programına eşlenmez.
 *  - Her tam okuma: o sınıfın "akıcı okuma" etiketli çıktısı ve ilk anlama çıktısı.
 *  - Sözlüğü olan veya yeni kök oranı ≥ 0,30 olan içerik: beceri etiketi "söz varlığı" olan çıktılar.
 *  - 5. sınıf ve üstü: öyküleyici türlerde hikâye unsurları, şiirde şiirin biçim özellikleri çıktısı.
 *  - Deyim/atasözü beyanlı ve 5. sınıf ve üstü: deyim, atasözü ve kalıp sözleri içeren çıktı.
 *  - İçerik türünün program metin türü listesinde olup olmadığı ayrıca işaretlenir.
 */
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";

const root = new URL("../", import.meta.url);
const vocab = JSON.parse(readFileSync(new URL("ontology/vocab/meb-kazanim.json", root), "utf8"));
const snapDir = new URL("ontology/snapshots/", root);
const snapFile = readdirSync(snapDir).filter((f) => f.startsWith("catalog-metrics-")).sort().at(-1);
const snap = JSON.parse(readFileSync(new URL(snapFile, snapDir), "utf8"));

const OYKU = ["Öykü", "Öykü (basılı veya dijital)"];
const TUR_ESLEME = {
  masal: ["Masal/Efsane/Destan", "Masal"], dunya_masali: ["Masal/Efsane/Destan", "Masal"],
  mitoloji_hikayesi: ["Masal/Efsane/Destan", "Efsane", "Destan"], fabl: ["Fabl"], siir: ["Şiir"],
  tekerleme: ["Tekerleme/Sayışmaca/Bilmece"], bilmece: ["Tekerleme/Sayışmaca/Bilmece"], piyes: ["Tiyatro"],
  kisa_hikaye: OYKU, mini_hikaye: OYKU, dinleme_hikayesi: OYKU, bilim_hikayesi: OYKU,
  klasik_roman: ["Roman"], doga_bilim: ["Bilimsel yazılar", "Makale"],
};
const OYKULEYICI = new Set(["masal", "dunya_masali", "mitoloji_hikayesi", "fabl", "kisa_hikaye", "mini_hikaye", "dinleme_hikayesi", "bilim_hikayesi", "klasik_roman", "piyes"]);

const sinifNo = (etiket) => {
  const m = String(etiket ?? "").match(/(\d+)\./);
  return m ? Number(m[1]) : null;
};
const etiketVar = (k, e) => k.beceri === e || (k.beceriEtiketleri ?? []).includes(e);
const kisa = (k, neden) => ({ kod: k.kod, metin: k.metin, neden });

const kayitlar = snap.icerikler.map((c) => {
  const temel = { id: c.id, baslik: c.baslik, anaOkumaYolu: c.anaOkumaYolu, sinifEtiketi: c.sinif };
  if (c.mikroAlistirma) return { ...temel, durum: "kapsam-disi", neden: "mikro alıştırma" };
  if (c.dil !== "tr") return { ...temel, durum: "kapsam-disi", neden: "İngilizce içerik; Türkçe programına eşlenmez" };
  const n = sinifNo(c.sinif);
  if (!n) return { ...temel, durum: "kapsam-disi", neden: "okul öncesi; program 1. sınıftan başlar" };
  if (n > 8) return { ...temel, durum: "kapsam-disi", neden: "lise; program 1-8. sınıfları kapsar" };
  const g = vocab.siniflar.find((s) => s.sinif === n);
  const aday = [];
  const ekle = (k, neden) => { if (k && !aday.some((a) => a.kod === k.kod)) aday.push(kisa(k, neden)); };
  ekle(g.kazanimlar.find((k) => etiketVar(k, "akıcı okuma")), "tam okuma: akıcı okuma");
  ekle(g.kazanimlar.find((k) => k.beceri === "anlam oluşturma" || k.beceri === "anlama"), "tam okuma: anlama");
  if (c.sozlukGirdisi > 0 || (c.yeniKokOrani ?? 0) >= 0.3) {
    const neden = c.sozlukGirdisi > 0 ? "sözlük girdisi var" : "yeni kök oranı ≥ 0,30";
    g.kazanimlar.filter((k) => k.beceri === "söz varlığı").forEach((k) => ekle(k, neden));
    // İlkokulda söz varlığı ayrı çıktı değil, süreç bileşenidir; türetilmiş alt kodla eklenir.
    if (n <= 4) {
      for (const k of g.kazanimlar) {
        for (const b of k.surecBilesenleri ?? []) {
          if ((b.etiketler ?? []).includes("söz varlığı") && !aday.some((a) => a.kod === b.altKodTuretilmis)) {
            aday.push({ kod: b.altKodTuretilmis, ustKod: k.kod, metin: b.metin, neden, turetilmisKod: true });
          }
        }
      }
    }
  }
  if (c.deyim + c.atasozu > 0 && n >= 5) {
    ekle(g.kazanimlar.find((k) => /deyim|atasöz/i.test(JSON.stringify(k))), "deyim/atasözü beyanlı");
  }
  if (n >= 5 && OYKULEYICI.has(c.icerikTuru)) ekle(g.kazanimlar.find((k) => k.beceri === "metin türü" && /Öyküleyici/u.test(k.metin)), "öyküleyici metin");
  if (n >= 5 && c.icerikTuru === "siir") ekle(g.kazanimlar.find((k) => k.beceri === "metin türü" && /Şiir/u.test(k.metin)), "şiir");
  const adaylarTur = TUR_ESLEME[c.icerikTuru] ?? null;
  const oz = vocab.metinOzellikleri.find((m) => m.sinif === n);
  const turler = Object.values(oz?.kullanilabilecekMetinTurleri ?? {}).flat();
  return {
    ...temel,
    sinif: n,
    durum: "aday-kural-tabanli",
    programMetinTuru: adaylarTur?.find((t) => turler.includes(t)) ?? adaylarTur?.[0] ?? null,
    metinTuruProgramda: adaylarTur ? adaylarTur.some((t) => turler.includes(t)) : null,
    adayKazanimlar: aday,
  };
});

const ozet = {
  toplam: kayitlar.length,
  adayli: kayitlar.filter((k) => k.durum === "aday-kural-tabanli").length,
  kapsamDisi: kayitlar.filter((k) => k.durum === "kapsam-disi").length,
  metinTuruProgramdaDegil: kayitlar.filter((k) => k.metinTuruProgramda === false).length,
};
const out = {
  surum: "0.1",
  durum: "aday-kural-tabanli",
  kaynak: { vocab: "ontology/vocab/meb-kazanim.json", program: vocab.program, snapshot: `ontology/snapshots/${snapFile}` },
  not: "Öneridir, onay değildir. Doğrulama: Reyhan veya bir Türkçe öğretmeni (ontoloji aksiyonu A5).",
  ozet,
  kayitlar,
};
mkdirSync(new URL("ontology/mappings/", root), { recursive: true });
writeFileSync(new URL("ontology/mappings/icerik-kazanim-aday.json", root), JSON.stringify(out, null, 2) + "\n");
console.log(JSON.stringify(ozet));
