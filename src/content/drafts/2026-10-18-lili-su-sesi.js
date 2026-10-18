import { createPendingContentQualityReview } from "../contentQualityReview.js";

const sourceTruth = Object.freeze({
  work: "Lili ile Sessiz Su Sesi",
  scope: "Okurio karakter evreninde özgün dinleme ve ses farkındalığı hikâyesi (s sesi)",
  sourceType: "original",
  rightsHolder: "Okurio",
  adaptationStatus: "not-applicable",
  verificationStatus: "pending-human-review",
  references: [],
});

export const LILI_SU_SESI_DRAFT = {
  id: "lili-su-sesi-draft",
  title: "Lili ile Sessiz Su Sesi",
  language: "tr",
  ageBand: "5-6",
  readingPathId: "okumaya_hazirlik_5_6",
  contentTrack: "okurio-original-pilot",
  primaryTheme: "Sessizce dinlemek, doğadaki küçük sesleri ve s sesini fark etmeyi sağlar",
  contentStatus: "draft",
  structuralValid: true,
  releaseReady: false,
  estimatedWordsPerMinute: 155,
  sections: [
    {
      title: "Dere Kenarında",
      paragraphs: [
        "Lili ile Oki parka gittiler. Parkın ucunda küçük bir dere vardı. Su taşların arasından akıyordu.",
        "Lili derenin yanına oturdu. Gözlerini kapattı ve dinledi. Su çok yumuşak bir ses çıkarıyordu.",
        "\"Sssss,\" dedi Lili. \"Su böyle konuşuyor.\" Oki de gözlerini kapattı. O da suyun sesini duydu.",
        "Lili bir oyun önerdi. Önce iki dakika sessiz duracaklardı. Sonra s sesiyle başlayan şeyleri arayacaklardı.",
        "Oki parmağını dudağına koydu. İkisi de kıpırdamadan oturdu. Etraf çok sakindi. Uzakta bir kuş öttü.",
      ],
    },
    {
      title: "Rüzgârın Fısıltısı",
      paragraphs: [
        "Birden hafif bir rüzgâr esti. Ağaçların yaprakları sallandı. Yapraklar da sss diye fısıldadı.",
        "\"Rüzgâr da s sesi çıkarıyor,\" dedi Oki. Lili başını salladı. \"Ama rüzgâr kelimesi rrr ile başlıyor,\" dedi.",
        "Oki biraz düşündü ve güldü. \"Haklısın! Ses başka, kelime başka.\" Lili de güldü. Oyun gittikçe eğlenceli oluyordu.",
        "Rüzgâr bir kez daha esti. Bu kez Lili'nin saçları uçuştu. Lili ellerini havaya kaldırdı. Rüzgârı parmaklarında hissetti.",
        "Sonra rüzgâr durdu. Dere yine tek başına sss dedi. Lili kulağını suya doğru eğdi.",
      ],
    },
    {
      title: "S ile Başlayanlar",
      paragraphs: [
        "Lili etrafına baktı. Derenin kenarında büyük bir söğüt ağacı vardı. \"Söğüt!\" dedi. \"Sss, söğüt!\"",
        "Oki çimenlerde bir şey gördü. Küçük, yeşil bir sinekti bu. Sinek bir yaprağa kondu. \"Sinek de sss,\" dedi Oki.",
        "Lili sudaki taşları gösterdi. Taşlar ıslak ve parlaktı. \"Taş, ttt ile başlıyor,\" dedi. \"Ama su sss ile başlıyor.\"",
        "Oki çantasından bir simit çıkardı. Simidi ikiye böldü. \"Simit de s ile başlıyor!\" dedi. İkisi simitlerini keyifle yediler. Sonra kırıntıları çantaya koydular.",
      ],
    },
    {
      title: "Sessiz Eve Dönüş",
      paragraphs: [
        "Güneş yavaş yavaş batıyordu. Gökyüzü pembe ve turuncu oldu. Eve dönme zamanı gelmişti.",
        "Lili kelimeleri saydı. Su, söğüt, sinek, simit. Oki de bir kelime ekledi. \"Sessiz! O da s ile başlıyor.\"",
        "Yolda ikisi de sessizce yürüdü. Ayak sesleri hışır hışır yaprakları ezdi. Uzaktan dere hâlâ duyuluyordu. Lili ona içinden teşekkür etti.",
        "Eve gelince Lili annesine sarıldı. \"Bugün suyun sesini dinledim,\" dedi. Annesi gülümsedi. Lili yatağında bir kez daha fısıldadı. \"Sssss.\"",
      ],
    },
  ],
  glossary: [
    { word: "dere", definition: "Küçük ve dar akan sudur." },
    { word: "fısıldadı", definition: "Çok alçak sesle konuştu." },
    { word: "söğüt", definition: "Dalları suya doğru sarkan bir ağaçtır." },
    { word: "sakindi", definition: "Gürültüsüz ve huzurluydu." },
    { word: "uçuştu", definition: "Havada oraya buraya hareket etti." },
  ],
  optionalReflectionPrompt: "Gözlerini kapatınca hangi sesleri duyuyorsun?",
  sourceTruth,
  contentQualityReview: createPendingContentQualityReview("okumaya_hazirlik_5_6"),
};

// Timing follows the actual reading body, excluding headings and glossary.
const body = LILI_SU_SESI_DRAFT.sections
  .flatMap((section) => section.paragraphs).join(" ");
LILI_SU_SESI_DRAFT.wordCount =
  body.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
LILI_SU_SESI_DRAFT.estimatedSeconds = Math.ceil(
  LILI_SU_SESI_DRAFT.wordCount * 60 / 155,
);
LILI_SU_SESI_DRAFT.declaredSeconds =
  LILI_SU_SESI_DRAFT.estimatedSeconds;
