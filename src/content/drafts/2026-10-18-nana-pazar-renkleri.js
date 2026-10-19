import { createPendingContentQualityReview } from "../contentQualityReview.js";

const sourceTruth = Object.freeze({
  work: "Nana ile Pazar Yerinde Renkler",
  scope: "Okurio karakter evreninde özgün ilk cümleler hikâyesi (sayma ve renkler)",
  sourceType: "original",
  rightsHolder: "Okurio",
  adaptationStatus: "not-applicable",
  verificationStatus: "pending-human-review",
  references: [],
});

export const NANA_PAZAR_RENKLERI_DRAFT = {
  id: "nana-pazar-renkleri-draft",
  title: "Nana ile Pazar Yerinde Renkler",
  language: "tr",
  ageBand: "7-8",
  readingPathId: "ilk_cumleler_7_8",
  contentTrack: "okurio-original-pilot",
  primaryTheme: "Pazarda renkleri ve sayıları fark etmek, alışverişi bir öğrenme oyununa çevirir",
  contentStatus: "draft",
  structuralValid: true,
  releaseReady: false,
  estimatedWordsPerMinute: 155,
  sections: [
    {
      title: "Pazara Gidiyoruz",
      paragraphs: [
        "Bugün pazar günüydü. Nana ile Lili pazar yerine gidecekti. Nana bir liste yazdı. Lili de yanında oturup izledi.",
        "Listede beş şey vardı. Domates, muz, havuç, üzüm ve elma. Lili listeyi yüksek sesle okudu.",
        "Nana bir de oyun önerdi. \"Her şeyin rengini bulalım,\" dedi. \"Sonra da tek tek sayalım.\"",
        "Lili oyunu çok sevdi. Sepetini aldı. Nana da cüzdanını aldı. İkisi el ele yola çıktılar.",
        "Pazar yeri çok kalabalıktı. Tezgâhlar yan yana diziliydi. Her yer renk renkti. Satıcılar neşeyle bağırıyordu. Lili Nana'nın elini sıkıca tuttu.",
      ],
    },
    {
      title: "Kırmızı ve Sarı",
      paragraphs: [
        "İlk tezgâhta domatesler vardı. Domatesler kıpkırmızıydı. \"Kırmızı!\" dedi Lili.",
        "Tezgâhtaki satıcı Ali Bey gülümsedi. \"Kaç tane istersiniz?\" diye sordu. Nana listeye baktı. \"Dört tane,\" dedi.",
        "Lili domatesleri tek tek saydı. Bir, iki, üç, dört. Dört kırmızı domates sepete girdi. Nana parayı Ali Bey'e verdi.",
        "Sonraki tezgâhta muzlar vardı. Muzlar sapsarıydı. \"Sarı!\" dedi Lili. Bu kez üç muz aldılar. Lili yine saydı. Bir, iki, üç.",
        "Sepette artık yedi şey vardı. Dört domates ve üç muz. Lili parmaklarıyla hesap yaptı. \"Dört ve üç, yedi eder,\" dedi. Nana onu kutladı. \"Sen çok iyi sayıyorsun,\" dedi.",
      ],
    },
    {
      title: "Turuncu ve Mor",
      paragraphs: [
        "Üçüncü tezgâhta havuçlar vardı. Havuçlar turuncuydu. Uçlarında yeşil yapraklar vardı.",
        "\"Turuncu!\" dedi Lili. \"Ama yaprakları yeşil.\" Nana başını salladı. \"Bir şeyin iki rengi olabilir,\" dedi.",
        "Beş havuç aldılar. Lili saydı. Bir, iki, üç, dört, beş. Havuçlar sepete girdi. Sepet biraz ağırlaştı.",
        "Sonra üzümlere geldiler. Üzümler mordu. Küçük toplar gibi yan yana duruyordu. \"Mor!\" dedi Lili.",
        "Nana bir salkım üzüm aldı. Lili taneleri saymak istedi. Parmağını bir taneye koydu. Bir, iki, üç, dört, beş, altı. Sonra güldü. \"Çok fazla tane var!\" dedi. Nana da güldü. \"Onları evde sayarız,\" dedi.",
      ],
    },
    {
      title: "Yeşil mi Kırmızı mı?",
      paragraphs: [
        "Listede bir şey kalmıştı. Elma! Elma tezgâhında iki renk elma vardı. Bazıları yeşil, bazıları kırmızıydı.",
        "Lili düşündü. \"Hangisini alalım?\" diye sordu. Nana ona sordu. \"Sen hangisini istersin?\"",
        "Lili iki rengi de çok sevdi. \"İkisinden de alalım,\" dedi. Nana kabul etti. \"Güzel bir fikir,\" dedi.",
        "Üç yeşil elma aldılar. Üç de kırmızı elma aldılar. Lili saydı. \"Üç ve üç, altı elma!\" dedi.",
        "Satıcı Ayşe Hanım ona bir de küçük elma verdi. \"Bu da senin için,\" dedi. Lili teşekkür etti. Şimdi yedi elma vardı. Listedeki her şey sepete girmişti. Lili listeye baktı ve gülümsedi.",
      ],
    },
    {
      title: "Renkli Sepet",
      paragraphs: [
        "Eve dönme zamanı gelmişti. Sepet çok ağırdı. Nana ile Lili sepeti birlikte taşıdı.",
        "Evde sepeti masaya boşalttılar. Masa bir gökkuşağı gibi oldu. Kırmızı, sarı, turuncu, mor ve yeşil. Lili renkleri tek tek saydı. Tam beş renk vardı.",
        "Sonra üzüm tanelerini saydılar. Tam yirmi tane çıktı. Lili çok şaşırdı. \"Yirmi tane!\" dedi. \"Bu çok fazla!\"",
        "Nana meyveleri yıkadı. Lili de onları bir tabağa dizdi. Her rengi yan yana koydu. Önce kırmızı, sonra sarı, sonra turuncu.",
        "Akşam Oki ile Toto geldi. Lili onlara renkli tabağı gösterdi. \"Bugün pazarda renkleri saydık,\" dedi. Herkes bir meyve aldı. Renkli tabak çabucak boşaldı.",
      ],
    },
  ],
  glossary: [
    { word: "pazar yeri", definition: "Açık havada meyve, sebze ve başka şeylerin satıldığı yerdir." },
    { word: "tezgâh", definition: "Satıcının malını koyduğu masadır." },
    { word: "satıcı", definition: "Bir şey satan kişidir." },
    { word: "salkım", definition: "Bir sapa bağlı üzüm taneleridir." },
    { word: "gökkuşağı", definition: "Yağmurdan sonra gökte görülen renkli yaydır." },
  ],
  optionalReflectionPrompt: "Senin en sevdiğin meyve hangi renk?",
  sourceTruth,
  contentQualityReview: createPendingContentQualityReview("ilk_cumleler_7_8"),
};

// Timing follows the actual reading body, excluding headings and glossary.
const body = NANA_PAZAR_RENKLERI_DRAFT.sections
  .flatMap((section) => section.paragraphs).join(" ");
NANA_PAZAR_RENKLERI_DRAFT.wordCount =
  body.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
NANA_PAZAR_RENKLERI_DRAFT.estimatedSeconds = Math.ceil(
  NANA_PAZAR_RENKLERI_DRAFT.wordCount * 60 / 155,
);
NANA_PAZAR_RENKLERI_DRAFT.declaredSeconds =
  NANA_PAZAR_RENKLERI_DRAFT.estimatedSeconds;
