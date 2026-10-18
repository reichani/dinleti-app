import { createPendingContentQualityReview } from "../contentQualityReview.js";

const sourceTruth = Object.freeze({
  work: "Oki'nin Kayıp Ayakkabı Teki",
  scope: "Okurio karakter evreninde özgün ilk cümleler hikâyesi (sınıfta iş birliği)",
  sourceType: "original",
  rightsHolder: "Okurio",
  adaptationStatus: "not-applicable",
  verificationStatus: "pending-human-review",
  references: [],
});

export const OKI_AYAKKABI_TEKI_DRAFT = {
  id: "oki-ayakkabi-teki-draft",
  title: "Oki'nin Kayıp Ayakkabı Teki",
  language: "tr",
  ageBand: "7-8",
  readingPathId: "ilk_cumleler_7_8",
  contentTrack: "okurio-original-pilot",
  primaryTheme: "Bir sorun, sınıfça sakin ve düzenli çalışınca çözülür",
  contentStatus: "draft",
  structuralValid: true,
  releaseReady: false,
  estimatedWordsPerMinute: 155,
  sections: [
    {
      title: "Bir Tek Ayakkabı",
      paragraphs: [
        "Oki sabah okula geldi. Sınıfın kapısında ayakkabılarını çıkardı. Okulda herkes içeride terlik giyerdi. Oki terliklerini giydi ve sınıfa girdi.",
        "Ayakkabılar rafa dizildi. Oki'nin ayakkabıları maviydi. Üstlerinde küçük sarı yıldızlar vardı. Oki bu ayakkabıları çok severdi. Onları dedesi almıştı.",
        "Ders bitti ve zil çaldı. Oki rafa koştu. Bir mavi ayakkabı oradaydı. Ama öteki ayakkabı yoktu!",
        "Oki rafın altına baktı. Orada da yoktu. Oki'nin gözleri doldu. \"Ayakkabım kayboldu,\" dedi.",
        "Lili onun yanına geldi. \"Üzülme Oki,\" dedi. \"Birlikte ararsak buluruz.\" Oki burnunu çekti ve başını salladı. Lili onun elini tuttu.",
      ],
    },
    {
      title: "Bir Plan Yapalım",
      paragraphs: [
        "Öğretmen Ece Hanım da yanlarına geldi. Sorunu dinledi. Sonra sınıfa döndü. \"Çocuklar, Oki'nin bir sorunu var,\" dedi. \"Bir plan yapalım.\"",
        "Ece Hanım tahtaya bir ayakkabı çizdi. Ayakkabıyı mavi boyadı. Üstüne sarı yıldızlar ekledi.",
        "\"Bu, Oki'nin ayakkabısı,\" dedi. \"Hepiniz iyi bakın. Sonra sınıfı ikişer ikişer arayalım.\"",
        "Mino ile Toto bir takım oldu. Lili ile Nana bir takım oldu. Oki de Ece Hanım ile birlikteydi.",
        "Her takıma bir köşe verildi. Mino ile Toto kitap köşesine baktı. Lili ile Nana oyun köşesine baktı. Oki ile Ece Hanım ise rafa baktı. Herkes sessiz ve dikkatliydi. Kimse koşmadı, kimse bağırmadı.",
      ],
    },
    {
      title: "Köşe Köşe Arama",
      paragraphs: [
        "Mino kitapların arkasına baktı. Bir kalem buldu. Ama ayakkabı yoktu. Toto minderin altına baktı. Bir silgi buldu. Ama ayakkabı yine yoktu.",
        "Lili oyun kutusunu açtı. İçinde bloklar vardı. Nana bebeğin yatağına baktı. Orada bir top buldu.",
        "Herkes bulduğu şeyleri masaya koydu. Bir kalem, bir silgi ve bir top. Ama mavi ayakkabı hâlâ yoktu.",
        "Oki biraz daha üzüldü. Ece Hanım onun omzuna dokundu. \"Bak Oki,\" dedi. \"Kayıp başka şeyler de bulduk. Bu da güzel bir iş.\"",
        "Oki etrafına baktı. Arkadaşları onun için çok uğraşıyordu. Bu onu biraz mutlu etti. Oki gözlerini sildi. \"Teşekkür ederim,\" dedi. \"Hadi bir kez daha bakalım.\"",
      ],
    },
    {
      title: "Toto'nun Ayakkabıları",
      paragraphs: [
        "Toto yere oturdu. Kendi ayakkabılarını giymek istedi. Toto'nun ayakkabıları da maviydi.",
        "Toto bir tekini giydi. Sonra öteki tekine baktı. Bu ayakkabının üstünde sarı yıldızlar vardı!",
        "\"Bir dakika!\" dedi Toto. \"Bu benim ayakkabım değil.\" Herkes Toto'ya döndü. Sınıf bir an sustu.",
        "Toto ayakkabıyı kaldırdı. Mavi bir ayakkabıydı. Üstünde küçük sarı yıldızlar vardı. Tam tahtadaki gibiydi!",
        "\"Bu Oki'nin ayakkabısı!\" dedi Lili. Toto'nun yanakları kızardı. \"Ben yanlışlıkla almışım,\" dedi. \"İkisi de mavi. Çok benziyorlar.\"",
        "Toto'nun öteki ayakkabısı rafın en üstündeydi. Mino onu getirdi. Toto onu giydi. Şimdi iki ayağında da kendi ayakkabısı vardı.",
      ],
    },
    {
      title: "Herkes Bir Yıldız",
      paragraphs: [
        "Oki ayakkabısını giydi. Çok mutlu oldu. Toto'ya sarıldı. \"Sorun yok Toto,\" dedi. \"Ayakkabılar çok benziyor.\"",
        "Ece Hanım güzel bir fikir buldu. \"Yarın herkes ayakkabısına bir işaret koysun,\" dedi.",
        "Ertesi gün herkes bir işaret getirdi. Oki ayakkabısına bir ay çizdi. Toto bir yıldız çizdi. Lili bir kalp çizdi. Mino bir kedi çizdi. Nana ise bir çiçek çizdi.",
        "Artık hiçbir ayakkabı karışmayacaktı. Bulunan kalem, silgi ve top da sahiplerine döndü. Kalem Nana'nındı. Silgi ile top ise Mino'nundu.",
        "Ece Hanım tahtaya büyük bir yıldız çizdi. Altına şunu yazdı: \"Birlikte çalışırsak buluruz.\" Oki yıldıza baktı ve gülümsedi. Bugün sınıfın her çocuğu bir yıldızdı.",
      ],
    },
  ],
  glossary: [
    { word: "terlik", definition: "Evde ya da sınıfta giyilen hafif ayakkabıdır." },
    { word: "raf", definition: "Eşyaların konduğu düz tahtadır." },
    { word: "takım", definition: "Birlikte çalışan küçük gruptur." },
    { word: "yanlışlıkla", definition: "İstemeden, bilmeden." },
    { word: "işaret", definition: "Bir şeyi tanımaya yarayan küçük çizim ya da iz." },
  ],
  optionalReflectionPrompt: "Sınıfta bir şey kaybolsa sen nasıl yardım edersin?",
  sourceTruth,
  contentQualityReview: createPendingContentQualityReview("ilk_cumleler_7_8"),
};

// Timing follows the actual reading body, excluding headings and glossary.
const body = OKI_AYAKKABI_TEKI_DRAFT.sections
  .flatMap((section) => section.paragraphs).join(" ");
OKI_AYAKKABI_TEKI_DRAFT.wordCount =
  body.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
OKI_AYAKKABI_TEKI_DRAFT.estimatedSeconds = Math.ceil(
  OKI_AYAKKABI_TEKI_DRAFT.wordCount * 60 / 155,
);
OKI_AYAKKABI_TEKI_DRAFT.declaredSeconds =
  OKI_AYAKKABI_TEKI_DRAFT.estimatedSeconds;
