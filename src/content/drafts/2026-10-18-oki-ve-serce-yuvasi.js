import { createPendingContentQualityReview } from "../contentQualityReview.js";

// Brif: docs/content-plans/2026-10-18.md, Brif 3 (okumaya_hazirlik_5_6, dinleme_hikayesi).
const sourceTruth = Object.freeze({
  work: "Oki ve Serçe Yuvası",
  scope: "Okurio karakter evreninde özgün dinleme ve okumaya hazırlık hikâyesi",
  sourceType: "original-okurio-ai-assisted",
  rightsStatus: "okurio-ozgun-ai-destekli",
  rightsHolder: "Okurio",
  adaptationStatus: "not-applicable",
  sourceUrl: null,
  verificationStatus: "pending-human-review",
});

export const OKI_VE_SERCE_YUVASI_DRAFT = {
  id: "oki-ve-serce-yuvasi-draft",
  title: "Oki ve Serçe Yuvası",
  language: "tr",
  ageBand: "5-6",
  readingPathId: "okumaya_hazirlik_5_6",
  icerikTuru: "dinleme_hikayesi",
  mebKademe: "okul_oncesi",
  mebSinif: "Ana Sınıfı",
  mebKazanim: "B2 açık",
  contentTrack: "okumaya-hazirlik",
  primaryTheme: "Küçük bir canlıya uzaktan ve sessizce özen göstermek",
  contentStatus: "draft",
  releaseReady: false,
  estimatedWordsPerMinute: 155,
  wordCount: 287,
  estimatedSeconds: 112,
  sections: [
    {
      title: "Saçaktaki Ses",
      paragraphs: [
        "Sabah bahçe serin ve sessizdi. Oki sarı çiçekleri sularken ince, tiz bir ses duydu. Ses, evin saçağından geliyordu.",
        "Oki başını kaldırıp dikkatle baktı. Saçağın altında kuru otlardan küçük bir yuva vardı. Yuvanın kenarında kahverengi bir serçe duruyordu.",
        "Serçe gagasında ince bir ot taşıyordu. Otu yuvaya yerleştirip yeniden uçtu. Oki gördüklerini anlatmak için Lili'yi çağırdı.",
      ],
    },
    {
      title: "Fısıltıyla Konuşmak",
      paragraphs: [
        "Lili koşarak geldi ve yüksek sesle bağırdı. Serçe korkup hemen yuvadan uzaklaştı. Lili şaşırıp elini ağzına götürdü.",
        "Oki, kuşların yüksek sesten kolayca ürkebildiğini hatırladı. Lili'nin kulağına bir fısıltı ile konuştu. Artık ikisi de yavaş ve alçak sesle konuşacaktı.",
        "Biraz sonra serçe yuvaya geri döndü. Lili sevindi ve sesini hiç yükseltmedi. Mino da pencerenin önünden onları izledi.",
      ],
    },
    {
      title: "Uzaktan Yardım",
      paragraphs: [
        "Oki yuvaya dokunmak istemedi. Nana, yuvalara elle dokunmamamız gerektiğini anlattı. Serçeye en iyi yardım, uzak durmaktı.",
        "Oki ve Lili bir tabağa biraz su koydular. Tabağı çalılardan biraz uzağa, açık bir yere bıraktılar. Sonra bankta oturup beklediler.",
        "Beklemek için cesaret gerekiyordu, çünkü yaklaşmak çok istiyorlardı. Serçe aşağı inip sudan içti. İki arkadaş birbirine sessizce gülümsedi.",
      ],
    },
    {
      title: "Pencereden Yağmur",
      paragraphs: [
        "Öğleden sonra gökyüzünü gri bulutlar kapladı. İri damlalar camlara vurmaya başladı. Oki ve Lili içeri girip pencerenin önüne oturdular.",
        "Serçe, tüylerini kabartıp yuvanın içine sokuldu. Saçak onu yağmurdan koruyan küçük bir şemsiye gibiydi. Oki rahatladı ve derin bir nefes aldı.",
        "Lili camdaki damlaları parmağıyla saydı. Oki ise serçenin gagasını ve kanatlarını izledi. Yağmur dinince bahçe pırıl pırıl parladı.",
      ],
    },
    {
      title: "Bahçeyi Paylaşmak",
      paragraphs: [
        "Mino serçeyi ürkütmesin diye onu içeride tuttular. Oki, \"Bahçeyi serçeyle paylaşmak güzel,\" dedi. Nana da bu fikri çok beğendi.",
        "Lili, \"Yuvaya gözümüz gibi bakacağız,\" dedi. Bu sözün, bir şeye çok özen göstermek demek olduğunu Nana anlattı. Oki, özenin bazen uzaktan yapıldığını öğrendi.",
        "Birkaç hafta sonra saçaktan cıvıl cıvıl minik sesler geldi. Oki ve Lili yine uzaktan, merakla dinlediler. Bahçe artık herkes için sakin bir yerdi.",
      ],
    },
  ],
  glossary: [
    { word: "yuva", definition: "Kuşların yumurtalarını ve yavrularını koruduğu küçük ev." },
    { word: "fısıltı", definition: "Çok alçak, neredeyse duyulmayan sesle konuşma." },
    { word: "serin", definition: "Hafif soğuk ve ferah olan." },
    { word: "cesaret", definition: "Zor bir şeyi yapabilmek için içimizdeki güç." },
    { word: "paylaşmak", definition: "Bir şeyi başkalarıyla birlikte kullanmak." },
  ],
  editorialLanguageProfile: {
    idioms: [
      {
        expression: "gözümüz gibi bakacağız",
        lemma: "gözü gibi bakmak",
        meaning: "Bir şeye çok özen göstermek, onu korumak.",
        ageFit: "Anlamı hemen ardından Nana tarafından açıklanır; 5–6 yaş dinleyicisi için bağlamdan anlaşılır.",
      },
    ],
    proverbs: [],
    culturalObjects: [],
  },
  optionalReflectionPrompt: "İstersen anlat: Oki serçeye nasıl uzaktan yardım etti?",
  reflectionOptional: true,
  reflectionScored: false,
  sourceTruth,
  factualReview: {
    status: "pending-human-review",
    notes: "Serçenin saçak altına yuva yapması ve yuvaya dokunulmaması önerisi insan doğa editörü doğrulaması bekliyor.",
  },
  originalityRightsReview: {
    status: "pending-human-review",
    notes: "Metin özgün Okurio taslağıdır (AI destekli); insan özgünlük ve hak kontrolü bekliyor.",
  },
  safeguardingLanguageReview: {
    status: "pending-human-review",
    notes: "Kuşun ürkmesi kısa ve hemen çözülen bir andır; yaş uygunluğu insan incelemesi bekliyor.",
  },
  ownerApproval: { status: "pending", ownerName: "" },
  contentQualityReview: createPendingContentQualityReview("okumaya_hazirlik_5_6"),
};
