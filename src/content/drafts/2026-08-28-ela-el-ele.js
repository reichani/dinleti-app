import { createPendingContentQualityReview } from "../contentQualityReview.js";

const sourceTruth = Object.freeze({
  work: "Ela El Ele",
  scope: "Okurio karakter evreninde özgün ilk okuma hikâyesi",
  sourceType: "original",
  rightsHolder: "Okurio",
  adaptationStatus: "not-applicable",
  sourceUrl: null,
  verificationStatus: "pending-human-review",
});

export const ELA_EL_ELE_DRAFT = {
  id: "ela-el-ele-v2-draft",
  replacesIdAfterApproval: "ela-el-ele",
  title: "Ela El Ele",
  ageBand: "6-7",
  readingPathId: "ilk_harfler_6_7",
  contentTrack: "ilk-okuma",
  primaryTheme: "Birlikte ilerlemeden önce sormak ve güvenli yolu paylaşmak",
  contentStatus: "draft",
  structuralValid: true,
  releaseReady: false,
  estimatedWordsPerMinute: 155,
  wordCount: 329,
  estimatedSeconds: 128,
  declaredSeconds: 128,
  sections: [
    {
      title: "Sarı Yol",
      paragraphs: [
        "Ela sabah okulun küçük bahçesine çıktı. Sarı taşlı yol, okuma minderlerine gidiyordu. Gece yağan yağmur bazı taşları ıslatmıştı.",
        "Lili kapının yanında sessizce bekliyordu. Elinde kırmızı kapaklı yeni bir kitap vardı. Kitabı bahçede birlikte okumak istiyordu.",
        "Ela ona gülümsedi ve yolu gösterdi. Lili ilk ıslak taşa dikkatle baktı. Taşların arasında küçük su birikintileri vardı.",
        "Toto ilerideki kuru minderleri hemen gördü. Sevinçle iki adım öne doğru koştu. Sonra arkadaşlarının geride kaldığını fark etti.",
      ],
    },
    {
      title: "Önce Sormak",
      paragraphs: [
        "Lili, kitabı düşürmekten biraz çekiniyordu. Bir eli kitapla tamamen doluydu. Islak taşlarda tek elle dengede durmak zordu.",
        "Ela hemen Lili'nin elini tutmadı. Elimi tutmak ister misin, diye sordu. Lili düşünüp başıyla evet dedi.",
        "Ela elini yavaşça açık biçimde uzattı. Lili kitabı göğsüne yakın tuttu. Sonra iki arkadaş el ele yürümeye başladı.",
        "Toto da onların yanına geri döndü. O, kitabı taşımayı teklif etti. Lili teşekkür edip kitabı ona dikkatle verdi.",
      ],
    },
    {
      title: "Oynayan Taş",
      paragraphs: [
        "İlk iki taş sağlam ve kuru çıktı. Üçüncü taş ise ayak altında hafifçe oynadı. Ela ile Lili hemen birlikte durdu.",
        "Taşın üstüne yeniden basmak istemediler. Yan tarafta daha uzun, fakat kuru bir yol vardı. Bu yol çiçeklerin çevresinden geçiyordu.",
        "Toto kısa yolu kullanmak istediğini söyledi. Ela oynayan taşı ona gösterdi. Üçü yeni yolu birlikte seçmeye karar verdi.",
        "Lili artık kitabı taşımadığı için rahattı. Ela'nın elini bırakmak istediğini söyledi. Ela gülümseyip elini hemen serbest bıraktı.",
        "Bu kez yan yana ve yavaşça ilerlediler. Toto önden gitmek yerine onlarla aynı sırada yürüdü. Kuru yol minderlerin arkasına ulaşıyordu.",
      ],
    },
    {
      title: "Minderdeki Kitap",
      paragraphs: [
        "Üç arkadaş sonunda büyük mavi mindere ulaştı. Toto kırmızı kitabı dikkatle Lili'ye geri verdi. Kitabın kapağı hâlâ temiz ve kuruydu.",
        "Ela sarı yolun küçük resmini çizdi. Oynayan taşı resimde gri renkle işaretledi. Nana böylece taşı kontrol ettirebilecekti.",
        "Lili kitabı açtı ve ilk sayfayı gösterdi. Sayfada el ele yürüyen iki kuş vardı. Üçü bu resmi görünce birlikte güldü.",
        "Bahçeye gelirken tek bir yol seçmemişlerdi. Önce sormuş, sonra değişen duruma birlikte bakmışlardı. Her arkadaşın rahatlığına dikkat etmişlerdi.",
        "Okuma başlayınca hepsi minderde yan yana oturdu. Ela kelimeleri tane tane takip etti. Lili ile Toto da sırayla sayfaları çevirdi.",
      ],
    },
  ],
  glossary: [
    { word: "birikinti", definition: "Bir yerde toplanan az miktarda sudur." },
    { word: "denge", definition: "Düşmeden sağlam biçimde durma durumudur." },
    { word: "teklif", definition: "Yapılabilecek bir şeyi kibarca önermektir." },
    { word: "işaretlemek", definition: "Bir yeri kolay bulunacak biçimde göstermektir." },
    { word: "rahatlık", definition: "Kendini güvenli ve iyi hissetme durumudur." },
  ],
  optionalReflectionPrompt: "Ela, Lili'nin elini tutmadan önce neden sordu?",
  sourceTruth,
  factualReview: {
    status: "pending-human-review",
    notes: "Islak zemin ve okul bahçesi güvenliği anlatımı insan incelemesi bekliyor.",
  },
  originalityRightsReview: {
    status: "pending-human-review",
    notes: "Metin özgün Okurio taslağıdır; insan özgünlük ve hak kontrolü bekliyor.",
  },
  safeguardingLanguageReview: {
    status: "pending-human-review",
    notes:
      "Temas öncesi sorma ve el bırakma anlatımı çocuk onurunu koruyacak biçimde yazıldı; insan erişilebilirlik tonu incelemesi bekliyor.",
  },
  contentQualityReview: createPendingContentQualityReview("ilk_harfler_6_7"),
};
