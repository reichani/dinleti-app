import { createPendingContentQualityReview } from "../contentQualityReview.js";

const sourceTruth = Object.freeze({
  work: "Mino'nun Mırıl Mırıl Sabahı",
  scope: "Okurio karakter evreninde özgün dinleme ve ses farkındalığı hikâyesi (m sesi)",
  sourceType: "original",
  rightsHolder: "Okurio",
  adaptationStatus: "not-applicable",
  verificationStatus: "pending-human-review",
  references: [],
});

export const MINO_MIRILDANIYOR_DRAFT = {
  id: "mino-mirildaniyor-draft",
  title: "Mino'nun Mırıl Mırıl Sabahı",
  language: "tr",
  ageBand: "5-6",
  readingPathId: "okumaya_hazirlik_5_6",
  contentTrack: "okurio-original-pilot",
  primaryTheme: "Günlük eşyalarda başlangıç sesini fark etmek, sesleri oyunla keşfetmektir",
  contentStatus: "draft",
  structuralValid: true,
  releaseReady: false,
  estimatedWordsPerMinute: 155,
  sections: [
    {
      title: "Mırıl Mırıl Uyanış",
      paragraphs: [
        "Sabah oldu. Mino gözlerini yavaşça açtı. Pencereden sarı bir ışık giriyordu. Kuşlar dışarıda cıvıldıyordu.",
        "Mino yataktan kalktı ve mırıldandı. Mmm, mmm, mmm. Bu ses dudaklarını gıdıkladı.",
        "Nana kapıda durdu ve gülümsedi. \"Bir ses oyunu oynayalım mı?\" dedi. Mino hemen başını salladı.",
        "Nana oyunu anlattı. Mino, m sesiyle başlayan şeyler bulacaktı. Her bulduğunda dudaklarını kapatacaktı. Sonra da mmm diyecekti.",
        "Mino önce kendi adını düşündü. Mino da mmm diye başlıyordu! İlk kelimeyi daha yataktan çıkmadan bulmuştu. Nana da \"Harika bir başlangıç!\" dedi.",
      ],
    },
    {
      title: "Mutfakta M Sesi",
      paragraphs: [
        "Mino mutfağa koştu. Kahvaltı masada hazırdı. \"Masa!\" dedi Mino. \"Mmm, masa!\"",
        "Masanın üstünde sarı bir muz vardı. Mino muzu eline aldı. \"Muz da mmm ile başlıyor,\" dedi.",
        "Nana bir kâse mısır gevreği getirdi. Mino kâseye baktı ve düşündü. \"Mısır! Mmm, mısır!\" diye sevindi.",
        "Sonra bir bardak süt geldi. Mino sütü dudaklarına yaklaştırdı. \"Süt, sss diye başlıyor,\" dedi. Nana ona alkış tuttu. Mino sesleri çok güzel ayırıyordu. Süt bu oyuna girmedi ama çok lezzetliydi. Mino sütünü bitirdi ve yeniden mırıldandı.",
      ],
    },
    {
      title: "Pencerede Masmavi Gökyüzü",
      paragraphs: [
        "Kahvaltıdan sonra Mino pencereye gitti. Gökyüzü masmaviydi. \"Mavi!\" dedi. \"Mmm, mavi!\"",
        "Bir kuş kanat çırparak geçti. Beyaz bir martıydı bu. Martı denize doğru süzüldü. \"Martı da mmm,\" dedi Mino.",
        "Pencerenin önünde bir saksı duruyordu. İçinde küçük mor çiçekler vardı. Mino çiçekleri kokladı. \"Mor da mmm ile başlıyor,\" diye fısıldadı.",
        "Nana yanına geldi. \"Kaç kelime buldun?\" diye sordu. Mino parmaklarıyla saydı. Mino, masa, muz, mısır, mavi, martı, mor. Tam yedi kelime! Nana onu sıkıca kucakladı.",
      ],
    },
    {
      title: "Mırıl Mırıl Şarkı",
      paragraphs: [
        "Mino çok mutluydu. Kelimelerle bir şarkı yapmak istedi. Yumuşak bir minder buldu ve üstüne oturdu.",
        "Mırıl mırıl söylemeye başladı. \"Masa, muz, mısır, mmm. Mavi, martı, mor, mmm.\" Şarkı kulağa çok tatlı geldi.",
        "Nana da şarkıya katıldı. İkisi birlikte mırıldandılar. Odada küçük bir müzik dolaştı. Mino her mmm deyince dudaklarını kapattı.",
        "Akşam olunca Mino yatağına girdi. Gözleri yavaş yavaş kapandı. Son bir kez mırıldandı. \"Mmm, iyi geceler.\" Yarın başka bir sesi arayacaktı.",
      ],
    },
  ],
  glossary: [
    { word: "mırıldandı", definition: "Ağzını kapalı tutarak alçak sesle ses çıkardı." },
    { word: "masmaviydi", definition: "Çok mavi, tertemiz mavi renkteydi." },
    { word: "martı", definition: "Deniz kıyısında yaşayan beyaz bir kuştur." },
    { word: "minder", definition: "Üstüne oturulan yumuşak, yastık gibi bir eşyadır." },
    { word: "süzüldü", definition: "Havada kanat çırpmadan yavaşça kaydı." },
  ],
  optionalReflectionPrompt: "Senin odanda m sesiyle başlayan ne var?",
  sourceTruth,
  contentQualityReview: createPendingContentQualityReview("okumaya_hazirlik_5_6"),
};

// Timing follows the actual reading body, excluding headings and glossary.
const body = MINO_MIRILDANIYOR_DRAFT.sections
  .flatMap((section) => section.paragraphs).join(" ");
MINO_MIRILDANIYOR_DRAFT.wordCount =
  body.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
MINO_MIRILDANIYOR_DRAFT.estimatedSeconds = Math.ceil(
  MINO_MIRILDANIYOR_DRAFT.wordCount * 60 / 155,
);
MINO_MIRILDANIYOR_DRAFT.declaredSeconds =
  MINO_MIRILDANIYOR_DRAFT.estimatedSeconds;
