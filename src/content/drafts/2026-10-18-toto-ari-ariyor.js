import { createPendingContentQualityReview } from "../contentQualityReview.js";

const sourceTruth = Object.freeze({
  work: "Toto'nun Arı Arayışı",
  scope: "Okurio karakter evreninde özgün dinleme ve ses farkındalığı hikâyesi (a sesi)",
  sourceType: "original",
  rightsHolder: "Okurio",
  adaptationStatus: "not-applicable",
  verificationStatus: "pending-human-review",
  references: [
    {
      label: "USDA Forest Service · Bee Pollination",
      url: "https://www.fs.usda.gov/wildflowers/pollinators/animals/bees.shtml",
      scope: "Arıların çiçeklerden nektar ve polen toplaması",
    },
  ],
});

export const TOTO_ARI_ARIYOR_DRAFT = {
  id: "toto-ari-ariyor-draft",
  title: "Toto'nun Arı Arayışı",
  language: "tr",
  ageBand: "5-6",
  readingPathId: "okumaya_hazirlik_5_6",
  contentTrack: "okurio-original-pilot",
  primaryTheme: "Bahçeyi sabırla gözlemek, hem doğayı hem a sesini keşfetmeyi sağlar",
  contentStatus: "draft",
  structuralValid: true,
  releaseReady: false,
  estimatedWordsPerMinute: 155,
  sections: [
    {
      title: "Bahçeye Çıkış",
      paragraphs: [
        "Toto sabah bahçeye çıktı. Hava ılık ve güzeldi. Çiçekler rengârenk açmıştı.",
        "Toto bugün bir arı görmek istiyordu. Nana ona bir büyüteç verdi. \"Arıları uzaktan izleyelim,\" dedi.",
        "Nana bir de oyun önerdi. \"Arı kelimesi aaa diye başlıyor. Sen de a ile başlayanları ara.\"",
        "Toto ağzını kocaman açtı. \"Aaaa!\" dedi. Bu ses bahçede yankılandı. Nana güldü ve Toto'nun elini tuttu.",
        "İkisi birlikte bahçede yürümeye başladılar. Toto gözlerini dört açtı. Her yere dikkatle baktı.",
      ],
    },
    {
      title: "Ağacın Altında",
      paragraphs: [
        "İlk önce büyük bir ağaca geldiler. \"Ağaç!\" dedi Toto. \"Aaa, ağaç!\" Nana başparmağını kaldırdı.",
        "Ağacın dallarında kırmızı elmalar vardı. Toto bir elmaya uzandı. \"Elma, eee ile başlıyor,\" dedi. \"Bu oyuna girmez.\"",
        "Sonra ağacın gövdesine baktı. Küçük bir karınca yukarı tırmanıyordu. Ama arı hiç yoktu. Toto ağacın etrafında bir tur attı. Yine de arı göremedi.",
        "Toto biraz üzüldü. Nana onu yanına çağırdı. \"Arılar çiçekleri sever,\" dedi. \"Çiçeklere bakalım.\" Toto yeniden heyecanlandı. \"Aaa, ne güzel fikir!\" dedi.",
      ],
    },
    {
      title: "Çiçeklerin Yanında",
      paragraphs: [
        "Bahçenin köşesinde mor çiçekler vardı. Toto oraya yavaşça yürüdü. Koşarsa arıların ürkeceğini biliyordu.",
        "Birden bir vızıltı duydu. Vızzz, vızzz. Toto büyütecini kaldırdı. Bir çiçeğin üstünde sarı bir arı vardı!",
        "\"Arı!\" diye fısıldadı Toto. \"Aaa, arı!\" Arı çiçeğin içine girdi. Sonra başka bir çiçeğe uçtu. Toto nefesini tuttu ve sessizce izledi.",
        "Nana alçak sesle anlattı. \"Arı çiçekten tatlı bir su toplar. Bu suya nektar denir.\" Toto arıyı uzaktan izlemeye devam etti. Ellerini hiç uzatmadı.",
      ],
    },
    {
      title: "A ile Dolu Bir Gün",
      paragraphs: [
        "Arı sonunda uçup gitti. Toto ona el salladı. \"Hoşça kal, arı!\" dedi. Arı bulutların altında küçük bir nokta oldu.",
        "Eve dönerken Toto kelimeleri saydı. Arı, ağaç. Sonra başka kelimeler de buldu. Akşam, ayakkabı, araba. Hepsi aaa diye başlıyordu.",
        "Akşam yemeğinde annesi ona ayran verdi. Toto kahkaha attı. \"Ayran da a ile başlıyor!\" dedi.",
        "Toto yatağına girince arıyı düşündü. Mor çiçekleri ve vızıltıyı hatırladı. Uykuya dalmadan önce yavaşça söyledi. \"Aaa, arı. Yarın yine gel.\"",
      ],
    },
  ],
  glossary: [
    { word: "büyüteç", definition: "Küçük şeyleri büyük gösteren camlı bir araçtır." },
    { word: "vızıltı", definition: "Arının uçarken çıkardığı vızz sesidir." },
    { word: "nektar", definition: "Çiçeklerin içindeki tatlı sudur." },
    { word: "ürkeceğini", definition: "Korkup kaçacağını." },
    { word: "rengârenk", definition: "Birçok farklı renkte." },
  ],
  optionalReflectionPrompt: "Sen a sesiyle başlayan hangi kelimeleri biliyorsun?",
  sourceTruth,
  contentQualityReview: createPendingContentQualityReview("okumaya_hazirlik_5_6"),
};

// Timing follows the actual reading body, excluding headings and glossary.
const body = TOTO_ARI_ARIYOR_DRAFT.sections
  .flatMap((section) => section.paragraphs).join(" ");
TOTO_ARI_ARIYOR_DRAFT.wordCount =
  body.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
TOTO_ARI_ARIYOR_DRAFT.estimatedSeconds = Math.ceil(
  TOTO_ARI_ARIYOR_DRAFT.wordCount * 60 / 155,
);
TOTO_ARI_ARIYOR_DRAFT.declaredSeconds =
  TOTO_ARI_ARIYOR_DRAFT.estimatedSeconds;
