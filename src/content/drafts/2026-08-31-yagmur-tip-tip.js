import { createPendingContentQualityReview } from "../contentQualityReview.js";

const sourceTruth = Object.freeze({
  work: "Yağmur Tıp Tıp",
  scope: "Okurio karakter evreninde özgün ilk cümleler hikâyesi",
  sourceType: "original",
  rightsHolder: "Okurio",
  adaptationStatus: "not-applicable",
  sourceUrl: null,
  verificationStatus: "pending-human-review",
});

export const YAGMUR_TIP_TIP_DRAFT = {
  id: "yagmur-tip-tip-v2-draft",
  replacesIdAfterApproval: "yagmur-tip-tip-siiri",
  title: "Yağmur Tıp Tıp",
  ageBand: "7-8",
  readingPathId: "ilk_cumleler_7_8",
  contentTrack: "ilk-cumleler",
  primaryTheme: "Değişen bir planı birlikte yeni bir oyuna dönüştürmek",
  contentStatus: "draft",
  structuralValid: true,
  releaseReady: false,
  estimatedWordsPerMinute: 155,
  wordCount: 360,
  estimatedSeconds: 140,
  declaredSeconds: 140,
  sections: [
    {
      title: "Bahçedeki Plan",
      paragraphs: [
        "Oki ile Lili serin sabah bahçede buluştu. Renkli tebeşirlerle uzun bir yol çizeceklerdi. Mino da küçük taşları sıraya koyacaktı.",
        "Oki ilk mavi çizgiyi dikkatle çekti. Lili parlak sarı bir güneş ekledi. Gökyüzü o sırada yavaşça koyulaştı.",
        "İlk soğuk damla Oki'nin eline düştü. İkinci damla sarı güneşe kondu. Sonra çatıda tıp tıp sesleri başladı.",
        "Çocuklar malzemeleri kutuya birlikte hızla yerleştirdi. Nana onları kapalı verandaya çağırdı. Bahçedeki plan şimdilik yarıda kalmıştı.",
      ],
    },
    {
      title: "Sesleri Saymak",
      paragraphs: [
        "Lili yağmurun güzel oyunu bozduğunu düşündü. Oki de silinen çizgilere üzgünce baktı. Mino kuru minderine kıvrıldı.",
        "Nana önce penceredeki farklı sesleri dinlemeyi önerdi. İnce damlalar cama hafifçe vuruyordu. Oluktaki su daha kalın bir ses çıkarıyordu.",
        "Oki art arda üç yavaş vuruş duydu. Lili ardından dört hızlı damla saydı. İkisi sesleri elleriyle masaya taşıdı.",
        "Tıp, tıp, sonra tıpır tıpır geldi. Mino kuyruğunu aynı ritimde salladı. Yarım kalan plan yeni bir oyuna dönüşüyordu.",
      ],
    },
    {
      title: "Kâğıttaki Yağmur",
      paragraphs: [
        "Lili büyük beyaz bir kâğıdı masaya serdi. Oki mavi kalemleri kutudan çıkardı. Her yağmur sesi için bir işaret çizeceklerdi.",
        "Yavaş damlalara tek mavi nokta koydular. Hızlı damlalara yan yana kısa çizgiler eklediler. Güçlü sesler büyük halkalar oldu.",
        "Bir süre sonra kâğıtta renkli ses haritası oluştu. Noktalar verandadan pencereye doğru ilerliyordu. Halkalar çatının altına toplanıyordu.",
        "Oki haritanın sonuna sarı bir kapı çizdi. Lili kapının ardına kuru bir minder ekledi. Böylece çizim küçük bir hikâye kazandı.",
      ],
    },
    {
      title: "Kaybolan Halka",
      paragraphs: [
        "Ansızın yağmur iyice hafifledi ve büyük halkalar durdu. Oki hikâyenin tamamlanmadığını söyledi. Lili eksik sesi yeniden düşünmek istedi.",
        "İkisi eski halkayı hemen uydurmaya çalışmadı. Pencereyi kapalı tutup yeni sesleri dinlediler. Şimdi yapraklardan tek tek damlalar düşüyordu.",
        "Lili son halkayı küçük yeşil bir yaprağa çevirdi. Oki yanına bekleyen bir salyangoz çizdi. Değişen ses, hikâyenin yönünü de değiştirmişti.",
        "Mino pencereye yaklaşıp dışarıyı sessizce izledi. Çocuklar onun ıslak zemine çıkmamasına dikkat etti. Harita artık bitmeye hazırdı.",
      ],
    },
    {
      title: "Yağmurdan Sonra",
      paragraphs: [
        "Bulutlar yavaşça açılınca Nana bahçeyi birlikte kontrol etti. Zemin hâlâ kaygan görünüyordu. Bu yüzden çocuklar verandada kalmayı seçti.",
        "Bahçedeki tebeşir yolu büyük ölçüde silinmişti. Fakat canlı renkler küçük su birikintilerine karışmıştı. Her birikinti farklı bir şekil taşıyordu.",
        "Oki ile Lili ses haritasını cama tuttular. Çizdikleri mavi noktaları dışarıdaki damlalarla eşleştirdiler. Yarım kalan oyun artık tamamlanmıştı.",
        "Ertesi güneşli gün yeni yolu yeniden çizeceklerdi. Yağmur eski planı değiştirmişti. Yine de birlikte başka bir hikâye bulmuşlardı.",
      ],
    },
  ],
  glossary: [
    { word: "veranda", definition: "Bir yapının üstü kapalı açık bölümüdür." },
    { word: "oluk", definition: "Çatıdaki yağmur suyunu taşıyan kanaldır." },
    { word: "ritim", definition: "Seslerin düzenli biçimde sıralanmasıdır." },
    { word: "harita", definition: "Bir yerin veya düzenin çizimle gösterimidir." },
    { word: "kaygan", definition: "Üzerinde kolayca ayağın kayabileceği yüzeydir." },
  ],
  optionalReflectionPrompt: "Oki ile Lili yarım kalan planı nasıl değiştirdi?",
  sourceTruth,
  factualReview: {
    status: "pending-human-review",
    notes: "Yağmur, oluk, ıslak zemin ve veranda güvenliği anlatımı insan incelemesi bekliyor.",
  },
  originalityRightsReview: {
    status: "pending-human-review",
    notes: "Metin özgün Okurio taslağıdır; insan özgünlük ve hak kontrolü bekliyor.",
  },
  safeguardingLanguageReview: {
    status: "pending-human-review",
    notes: "Plan değişikliği baskısız ve utandırmayan dille anlatıldı; insan erişilebilirlik tonu incelemesi bekliyor.",
  },
  contentQualityReview: createPendingContentQualityReview("ilk_cumleler_7_8"),
};
