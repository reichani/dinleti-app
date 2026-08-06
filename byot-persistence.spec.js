/**
 * Türkiye okul sınıfı ⇄ yaş ⇄ okuma evresi ⇄ kullanıcı profili eşleştirme modeli.
 *
 * Kaynak: MEB standart okul başlangıç yaşı kuralı (bir çocuk, okul yılı başında
 * [Eylül] 6 yaşını doldurmuşsa 1. sınıfa başlar). Bu modül, App.jsx içindeki
 * mevcut 10 okuma yolunu (OKUMA_YOLLARI) MEB sınıf kademeleriyle eşler.
 * Okuma yolu yapısını veya onboarding akışını DEĞİŞTİRMEZ; sadece ek/okunabilir
 * bir sınıf etiketi ve yardımcı fonksiyonlar sağlar.
 *
 * Kullanıcı profili (Disleksi / DEHB / Görsel hassasiyet) bu modelden bağımsız,
 * ayrı bir eksendir: profil, yaş/sınıf ne olursa olsun DESTEK_SECENEKLERI
 * (hece_takibi, kelime_takibi, odak, buyuk_yazi, genis_aralik, yumusak_zemin)
 * setini belirler. Bir 3. sınıf öğrencisi ile bir 8. sınıf öğrencisi aynı
 * disleksi profiline sahip olabilir ama farklı okuma yollarında olur; bu
 * modül ikisini karıştırmaz, yalnızca profil → önerilen destek eşlemesini
 * ayrı bir tablo olarak sunar.
 */

/**
 * yolId → MEB sınıf kademesi eşlemesi.
 * `yasBaslangic`/`yasBitis`: okuma yolunun kapsadığı yaş aralığı (App.jsx OKUMA_YOLLARI.yas ile birebir).
 * `sinifKodu`: makine tarafından okunabilir kademe kodu.
 * `sinifEtiketi`: kullanıcıya gösterilecek kısa Türkçe etiket.
 * `mebKademe`: MEB kademe adı (okul öncesi / ilkokul / ortaokul / lise / yetişkin).
 * `okulSinifAraligi`: karşılık gelen resmi sınıf(lar) (yoksa null).
 */
export const TR_SCHOOL_GRADE_MAP = Object.freeze([
  {
    yolId: "okul_oncesi_3_4",
    yasBaslangic: 3,
    yasBitis: 4,
    sinifKodu: "okul_oncesi_erken",
    sinifEtiketi: "Okul Öncesi (Erken)",
    mebKademe: "okul_oncesi",
    okulSinifAraligi: null,
    okumaEvresi: "dinleme",
    aciklama: "Kreş / anaokulu başlangıç yaşı. Okuma yok; dinleme ve ses farkındalığı.",
  },
  {
    yolId: "okumaya_hazirlik_5_6",
    yasBaslangic: 5,
    yasBitis: 6,
    sinifKodu: "okul_oncesi_hazirlik",
    sinifEtiketi: "Okul Öncesi (Hazırlık / Ana Sınıfı)",
    mebKademe: "okul_oncesi",
    okulSinifAraligi: "Ana Sınıfı (isteğe bağlı '0. sınıf')",
    okumaEvresi: "dinleme",
    aciklama: "Anaokulu büyük grup / ilkokula hazırlık yılı. Ses ve ritim farkındalığı.",
  },
  {
    yolId: "ilk_harfler_6_7",
    yasBaslangic: 6,
    yasBitis: 7,
    sinifKodu: "ilkokul_1",
    sinifEtiketi: "İlkokul 1. Sınıf",
    mebKademe: "ilkokul",
    okulSinifAraligi: "1. Sınıf",
    okumaEvresi: "hece_kelime",
    aciklama: "MEB ses temelli cümle yöntemi: harf, hece, kelime tanıma.",
  },
  {
    yolId: "ilk_cumleler_7_8",
    yasBaslangic: 7,
    yasBitis: 8,
    sinifKodu: "ilkokul_2",
    sinifEtiketi: "İlkokul 2. Sınıf",
    mebKademe: "ilkokul",
    okulSinifAraligi: "2. Sınıf",
    okumaEvresi: "kisa_cumle",
    aciklama: "Kısa cümle okuma, tekrar ve okuma güveni inşası.",
  },
  {
    yolId: "okuma_guveni_8_10",
    yasBaslangic: 8,
    yasBitis: 10,
    sinifKodu: "ilkokul_3_4",
    sinifEtiketi: "İlkokul 3–4. Sınıf",
    mebKademe: "ilkokul",
    okulSinifAraligi: "3. ve 4. Sınıf",
    okumaEvresi: "paragraf",
    aciklama: "Paragraf düzeyinde akıcılık, satır takibi ve dikkat pratiği.",
  },
  {
    yolId: "akici_okuma_10_12",
    yasBaslangic: 10,
    yasBitis: 12,
    sinifKodu: "ortaokul_5_6",
    sinifEtiketi: "Ortaokul 5–6. Sınıf",
    mebKademe: "ortaokul",
    okulSinifAraligi: "5. ve 6. Sınıf",
    okumaEvresi: "paragraf",
    aciklama: "Daha uzun paragraflar, kısa özetleme ve akıcı okuma.",
  },
  {
    yolId: "genc_okurlar_12_14",
    yasBaslangic: 12,
    yasBitis: 14,
    sinifKodu: "ortaokul_7_8",
    sinifEtiketi: "Ortaokul 7–8. Sınıf",
    mebKademe: "ortaokul",
    okulSinifAraligi: "7. ve 8. Sınıf",
    okumaEvresi: "uzun_metin",
    aciklama: "Uzun metne geçiş; bilim, mitoloji ve macera türlerinde derinleşme.",
  },
  {
    yolId: "klasiklere_hazirlik_14_16",
    yasBaslangic: 14,
    yasBitis: 16,
    sinifKodu: "lise_9_10",
    sinifEtiketi: "Lise 9–10. Sınıf",
    mebKademe: "lise",
    okulSinifAraligi: "9. ve 10. Sınıf",
    okumaEvresi: "uzun_metin",
    aciklama: "Klasiklere giriş, ana fikir çıkarma ve odaklı okuma.",
  },
  {
    yolId: "lise_okuma_16_18",
    yasBaslangic: 16,
    yasBitis: 18,
    sinifKodu: "lise_11_12",
    sinifEtiketi: "Lise 11–12. Sınıf",
    mebKademe: "lise",
    okulSinifAraligi: "11. ve 12. Sınıf",
    okumaEvresi: "akademik_klasik",
    aciklama: "Akademik / klasik metinlere ve sınav yoğunluğuna dayanıklılık.",
  },
  {
    yolId: "yetiskin_odak_18",
    yasBaslangic: 18,
    yasBitis: 99,
    sinifKodu: "yetiskin",
    sinifEtiketi: "Mezun / Yetişkin",
    mebKademe: "yetiskin",
    okulSinifAraligi: null,
    okumaEvresi: "okumaya_donus",
    aciklama: "Okumaya geri dönüş; dikkat modu ve görsel konfor odaklı.",
  },
]);

export const gradeMapByYolId = Object.fromEntries(
  TR_SCHOOL_GRADE_MAP.map((entry) => [entry.yolId, entry]),
);

export function getGradeLabelForYolId(yolId) {
  return gradeMapByYolId[yolId]?.sinifEtiketi ?? null;
}

/** Yaşa göre en uygun okuma yolu / sınıf kaydını döndürür (basit sınır kontrolü). */
export function resolveGradeForAge(age) {
  if (!Number.isFinite(age)) return null;
  return (
    TR_SCHOOL_GRADE_MAP.find((entry) => age >= entry.yasBaslangic && age <= entry.yasBitis) ??
    (age > 99 ? TR_SCHOOL_GRADE_MAP[TR_SCHOOL_GRADE_MAP.length - 1] : null)
  );
}

export function resolveYolIdForGrade(sinifKodu) {
  return TR_SCHOOL_GRADE_MAP.find((entry) => entry.sinifKodu === sinifKodu)?.yolId ?? null;
}

/**
 * Kullanıcı profili → önerilen destek seçenekleri (App.jsx DESTEK_SECENEKLERI id'leri).
 * Bu, yaş/sınıftan bağımsızdır: aynı profil her sınıf kademesinde geçerlidir.
 * Sadece "önerilen varsayılan" listesidir; kullanıcı istediği desteği açıp kapatabilir.
 */
export const PROFIL_DESTEK_ONERI = Object.freeze({
  disleksi: ["hece_takibi", "kelime_takibi", "buyuk_yazi", "genis_aralik", "yumusak_zemin"],
  dehb: ["odak", "kisa_hedef", "yumusak_zemin"],
  gorsel_hassasiyet: ["buyuk_yazi", "genis_aralik", "yumusak_zemin"],
});

/**
 * Yaş bandına göre "tam okuma" için makul asgari süre (saniye).
 *
 * contentIntegrity.js'teki DEFAULT_MINIMUM_FULL_READING_SECONDS (120s) tüm yaşlara
 * düz uygulanıyordu; bu, 3-4 yaş "Minik Dinleme" içerikleri için gerçekçi değil
 * (yayınlanmış okul-öncesi dinleme içerikleri genelde 1-2 dakikadır). Model, MEB
 * kademesine göre kademeli bir asgari sunar; App.jsx icerikSunumu() bunu
 * classifyContent()'e metadata.minimumFullReadingSeconds olarak geçirir.
 */
const AGE_MINIMUM_FULL_READING_SECONDS = Object.freeze([
  { maxYas: 4, minimumSeconds: 90 }, // okul_oncesi_3_4
  { maxYas: 6, minimumSeconds: 100 }, // okumaya_hazirlik_5_6
  { maxYas: 99, minimumSeconds: 120 }, // 1. sınıf ve üzeri: mevcut varsayılan
]);

export function minimumFullReadingSecondsForAge(yasMin) {
  if (!Number.isFinite(yasMin)) return 120;
  const band = AGE_MINIMUM_FULL_READING_SECONDS.find((entry) => yasMin <= entry.maxYas);
  return band?.minimumSeconds ?? 120;
}
