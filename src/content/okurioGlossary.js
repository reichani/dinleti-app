export const GLOSSARY_SOURCE_POLICY = Object.freeze({
  referenceName: "TDK Güncel Türkçe Sözlük",
  referenceEdition: "2023, 12. baskının genel ağ sürümü",
  mode: "editorial-alignment",
  note:
    "TDK veri tabanı kopyalanmaz. Madde başı, yazım, sözcük türü ve temel anlam editör tarafından TDK üzerinden doğrulanır; Okurio açıklaması yaşa uygun ve özgün biçimde yeniden yazılır.",
});

export const OKURIO_GLOSSARY = Object.freeze([
  {
    word: "ipucu",
    partOfSpeech: "isim",
    readingLevel: "L1",
    childDefinition: "Bir şeyi bulmaya veya anlamaya yardım eden küçük işaret.",
    teenDefinition: "Bir sorunun çözümüne götüren belirti veya bilgi.",
    adultDefinition: "Bir sonuca ulaşmayı kolaylaştıran belirti, bilgi ya da işaret.",
    example: "Lili, taşın altındaki ipucunu dikkatle okudu.",
    tdkAlignment: { status: "to-review", headwordChecked: false, meaningChecked: false },
  },
  {
    word: "sabır",
    partOfSpeech: "isim",
    readingLevel: "L1",
    childDefinition: "Zor veya uzun bir işte sakin biçimde bekleyebilme gücü.",
    teenDefinition: "Gecikme ya da güçlük karşısında sakin kalabilme tutumu.",
    adultDefinition: "Güçlük, gecikme veya sıkıntı karşısında dayanıklı ve sakin kalma durumu.",
    example: "Oki, tohumların büyümesini sabırla bekledi.",
    tdkAlignment: { status: "to-review", headwordChecked: false, meaningChecked: false },
  },
  {
    word: "tahmin",
    partOfSpeech: "isim",
    readingLevel: "L2",
    childDefinition: "Bir şeyi tam bilmeden, eldeki işaretlere bakarak düşünme.",
    teenDefinition: "Kesin bilgi olmadan belirtilere dayanarak varılan düşünce.",
    adultDefinition: "Kesin veriye sahip olmadan işaret ve olasılıklardan hareketle ulaşılan yargı.",
    example: "Lili önce bir tahminde bulundu, sonra gerçeği sordu.",
    tdkAlignment: { status: "to-review", headwordChecked: false, meaningChecked: false },
  },
]);

export function normalizeGlossaryWord(value) {
  return String(value ?? "")
    .toLocaleLowerCase("tr-TR")
    .replace(/^[^\p{L}]+|[^\p{L}]+$/gu, "");
}

export function getGlossaryEntry(word, readingLevel = "L1") {
  const normalized = normalizeGlossaryWord(word);
  const entry = OKURIO_GLOSSARY.find((item) => item.word === normalized);
  if (!entry) return null;

  const levelNumber = Number(String(readingLevel).replace("L", "")) || 1;
  const definition =
    levelNumber <= 2
      ? entry.childDefinition
      : levelNumber <= 4
        ? entry.teenDefinition
        : entry.adultDefinition;

  return { ...entry, definition };
}

export function validateGlossaryEntry(entry) {
  const errors = [];
  if (!entry?.word) errors.push("word is required");
  if (!entry?.partOfSpeech) errors.push("partOfSpeech is required");
  if (!entry?.childDefinition) errors.push("childDefinition is required");
  if (!entry?.teenDefinition) errors.push("teenDefinition is required");
  if (!entry?.adultDefinition) errors.push("adultDefinition is required");
  if (!entry?.example) errors.push("example is required");
  if (!entry?.tdkAlignment) errors.push("tdkAlignment is required");
  return { valid: errors.length === 0, errors };
}
