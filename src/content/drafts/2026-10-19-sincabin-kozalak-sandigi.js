import { createPendingContentQualityReview } from "../contentQualityReview.js";

// Brif: docs/content-plans/2026-10-19.md, Brif 1 (okumaya_hazirlik_5_6, fabl).
// Brif onayı: Reyhan Açar, K-2026-10-19-01 (PR #157). Birincil kaynak yok; özgün kurgu.
const sourceTruth = Object.freeze({
  work: "Sincabın Kozalak Sandığı",
  scope: "Okurio karakterlerinin (Nana, Oki, Lili) çerçevelediği özgün hayvan fablı",
  sourceType: "original-okurio-ai-assisted",
  rightsStatus: "okurio-ozgun-ai-destekli",
  rightsHolder: "Okurio",
  adaptationStatus: "not-applicable",
  sourceUrl: null,
  verificationStatus: "pending-human-review",
});

// ICERIK_METADATA önerisi (kataloğa bağlanırken kullanılır; bu taslak App.jsx'i değiştirmez).
// "dinleme" bilerek eklenmedi: eklenirse ölçüm içeriği okul_oncesi_3_4 yoluna yazar (Brif 1).
export const SINCABIN_KOZALAK_SANDIGI_METADATA_PROPOSAL = Object.freeze({
  segmentler: Object.freeze(["okumaya_hazirlik", "ses_farkindaligi"]),
  icerikTuru: "fabl",
});

export const SINCABIN_KOZALAK_SANDIGI_DRAFT = {
  id: "sincabin-kozalak-sandigi-draft",
  title: "Sincabın Kozalak Sandığı",
  language: "tr",
  ageBand: "5-6",
  readingPathId: "okumaya_hazirlik_5_6",
  icerikTuru: "fabl",
  mebKademe: "okul_oncesi",
  mebSinif: "Ana Sınıfı",
  mebKazanim: "B2 açık",
  pirlsSureci: "B2 açık",
  contentTrack: "okumaya-hazirlik",
  primaryTheme: "Zor bir işi birlikte yapmak ve emeğin ürününü paylaşmak",
  contentStatus: "draft",
  releaseReady: false,
  icerikMetadataOnerisi: SINCABIN_KOZALAK_SANDIGI_METADATA_PROPOSAL,
  estimatedWordsPerMinute: 155,
  wordCount: 282,
  estimatedSeconds: 110,
  sections: [
    {
      title: "Çam Ağacının Dibinde",
      paragraphs: [
        "Bir sonbahar sabahı Nana, Oki ve Lili çam ormanında yürüyordu. Yerde kahverengi kozalaklar vardı. Nana bir kütüğe oturdu ve onlara bir fabl anlattı.",
        "Ormanda küçük bir sincap yaşarmış. Çam ağacının dibinde eski, tahta bir sandık varmış. Sincap kozalakları bu sandıkta saklarmış.",
        "Küçük sincap bütün gün kozalak toplarmış. Onları sandığa tek tek koyarmış. Her kozalak içeri düşerken tık diye ses çıkarırmış.",
      ],
    },
    {
      title: "Rüzgâr Esince",
      paragraphs: [
        "Bir gece güçlü bir rüzgâr esmiş. Vuuu diye esen rüzgâr dalları sallamış, yaprakları uçurmuş. Eski sandık devrilip yan yatmış.",
        "Sabah sincap yuvasından başını uzatmış. Kozalaklar otların arasına dağılmış. Sincap sandığı itmiş ama sandık hiç kıpırdamamış.",
        "Küçük sincap bir taşın üstüne oturmuş. \"Bu sandık bana çok ağır,\" demiş. Sonra bütün sesiyle arkadaşlarını çağırmış.",
      ],
    },
    {
      title: "Tak Tak, Ben de Varım",
      paragraphs: [
        "Önce çalıların arasından küçük bir tarla faresi gelmiş. Ardından bir ağaçkakan yakındaki dala konmuş. Tak tak diye gagasını dala vurmuş.",
        "Fare, \"Ben de yardım ederim,\" demiş. Ağaçkakan, \"Tak tak, ben de varım!\" diye seslenmiş. Sincap buna çok sevinmiş.",
        "Üç arkadaş sandığın çevresinde toplanmış. Hep birlikte \"Bir, iki, üç!\" diye saymışlar. Sonra el ele verip sandığı itmişler.",
      ],
    },
    {
      title: "Sandık Yeniden Doluyor",
      paragraphs: [
        "Sandık yavaşça kalkıp yerine oturmuş. Fare otların arasından kozalak taşımış. Ağaçkakan yukarıdan bakıp en uzaktaki kozalakları göstermiş.",
        "Sincap kozalakları tek tek sandığa yeniden koymuş. Tık, tık, tık diye sesler gelmiş. Çok geçmeden sandık ağzına kadar dolmuş.",
        "Sincap arkadaşlarına teşekkür etmiş. \"Kozalakları sizinle paylaşmak istiyorum,\" demiş. Herkes birkaç kozalak alıp sevinçle evine dönmüş.",
      ],
    },
    {
      title: "Birlikten Kuvvet Doğar",
      paragraphs: [
        "Fabl bitince Lili, \"Sandık ağırdı ama birlikte kalktı,\" dedi. Nana gülümseyip başını salladı. \"El ele vermek, birlikte çalışmak demektir,\" dedi.",
        "Sonra Nana, \"Birlikten kuvvet doğar,\" diye ekledi. Bu söz, birlikte olunca daha güçlü olduğumuzu anlatır. Oki bu sözü yavaşça bir kez daha söyledi.",
        "Oki ve Lili yerdeki kozalakları bir sepete topladılar. Sepet ağırlaşınca onu birlikte taşıdılar. Çamların arasında hafif bir rüzgâr esti.",
      ],
    },
  ],
  glossary: [
    { word: "kozalak", definition: "Çam ağacının tohumlarını saklayan, pul pul, sert meyvesi." },
    { word: "sincap", definition: "Ağaçlarda yaşayan, kabarık kuyruklu küçük bir hayvan." },
    { word: "sandık", definition: "Eşya saklamak için kullanılan kapaklı, büyük kutu." },
    { word: "rüzgâr", definition: "Havanın hareket etmesiyle oluşan esinti." },
    { word: "paylaşmak", definition: "Bir şeyi başkalarıyla birlikte kullanmak ya da onlara da vermek." },
    { word: "ağaçkakan", definition: "Gagasını ağaca vurarak tak tak ses çıkaran bir kuş." },
  ],
  editorialLanguageProfile: {
    idioms: [
      {
        expression: "el ele vermek",
        lemma: "el ele vermek",
        meaning: "Bir işi birlikte, yardımlaşarak yapmak.",
        ageFit: "Önce olay içinde (\"el ele verip\") geçer, sonra Nana anlamını tek cümleyle açıklar; 5–6 yaş dinleyicisi için bağlamdan anlaşılır.",
      },
    ],
    proverbs: [
      {
        expression: "Birlikten kuvvet doğar",
        meaning: "Birlikte çalışanlar tek başına olandan daha güçlüdür.",
        ageFit: "Fablın dersi olarak sonda bir kez söylenir ve hemen ardından sade bir cümleyle açıklanır.",
      },
    ],
    culturalObjects: [],
  },
  phonologicalAwarenessNotes: {
    soundWords: ["tık", "vuuu", "tak tak"],
    note: "Yansıma sesler dinleme sırasında çocukla birlikte tekrarlanabilir; okuma beklentisi yoktur.",
  },
  optionalReflectionPrompt: "İstersen anlat: Sincap sandığı nasıl yeniden kaldırdı?",
  reflectionOptional: true,
  reflectionScored: false,
  sourceTruth,
  factualReview: {
    status: "pending-human-review",
    notes: "Fabl kurgusudur. Sincap, tarla faresi ve ağaçkakanın çam tohumu yemesi doğada görülür; insan doğa editörü doğrulaması bekliyor.",
  },
  originalityRightsReview: {
    status: "pending-human-review",
    notes: "Metin özgün Okurio taslağıdır (AI destekli). Ezop'un \"Ağustos Böceği ile Karınca\" olay dizisi (yazın çalışmayan, kışın geri çevrilen karakter) kullanılmadı. Sincaba ad verilmedi: ilk taslaktaki \"Kıtır\" adı yayımlanmış bir sincap hikâye setinde (\"Kıtır ile Pıtır\") geçtiği için çıkarıldı. İnsan özgünlük ve hak kontrolü bekliyor.",
  },
  safeguardingLanguageReview: {
    status: "pending-human-review",
    notes: "Rüzgârın sandığı devirmesi kısa ve aynı fablda çözülen bir sıkıntıdır; kimse zarar görmez. Yaş uygunluğu insan incelemesi bekliyor.",
  },
  ownerApproval: { status: "pending", ownerName: "" },
  contentQualityReview: createPendingContentQualityReview("okumaya_hazirlik_5_6"),
};
