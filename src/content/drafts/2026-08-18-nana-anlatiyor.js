import { createPendingContentQualityReview } from "../contentQualityReview.js";

const sourceTruth = Object.freeze({
  work: "Nana Anlatıyor",
  scope: "Okurio karakter evreninde özgün ilk okuma hikâyesi",
  sourceType: "original-okurio-ai-assisted",
  rightsHolder: "Okurio",
  adaptationStatus: "not-an-adaptation",
  thirdPartyRightsClearance: "not-required",
  verificationStatus: "pending-owner-confirmation",
});

export const NANA_ANLATIYOR_DRAFT = {
  id: "nana-anlatiyor-v2-draft",
  replacesIdAfterApproval: "nana-anlatiyor",
  title: "Nana Anlatıyor",
  ageBand: "6-7",
  readingPathId: "ilk_harfler_6_7",
  contentTrack: "ilk-okuma",
  primaryTheme: "Bir anlatının eksik parçasını dikkatle dinleyerek birlikte bulmak",
  contentStatus: "draft",
  structuralValid: true,
  releaseReady: false,
  estimatedWordsPerMinute: 155,
  wordCount: 324,
  estimatedSeconds: 126,
  sections: [
    {
      title: "Nana'nın Kartları",
      paragraphs: [
        "Nana, güneşli sabah küçük masaya sakin biçimde oturdu. Elinde dört küçük renkli resim kartı vardı. Oki ile Lili merakla yanına geldi.",
        "İlk kartta uzun mavi bir tren vardı. İkinci kartta ince karanlık bir tünel görünüyordu. Üçüncü kartta geniş yeşil bir alan vardı.",
        "Nana, bugün size uzun bir yol anlatacağım, dedi. Kartları sırayla masaya dikkatle dizdi. Ancak son yeri bilerek tamamen boş bıraktı.",
        "Oki boş yere hemen rastgele bir kart koymadı. Lili bütün resimlere yeniden dikkatle baktı. İkisi Nana'nın ilk cümlesini sessizce dinledi.",
      ],
    },
    {
      title: "Eksik Ses",
      paragraphs: [
        "Nana'nın öyküsünde tren yola çıktı. Tren önce uzun karanlık tünele yavaşça girdi. Sonra geniş açık alana doğru ilerledi.",
        "Tam o anda Nana anlatmayı birden durdurdu. Masadaki son resim hâlâ ortada yoktu. Oki merakla, tren nereye gitti, diye sordu.",
        "Lili tüneli gösterip önce burası, dedi. Oki yeşil alanı işaretleyip sonra burası, dedi. İki arkadaş sırayı birlikte yavaşça tekrar etti.",
        "Nana onlara çok önemli bir ipucu verdi. Son yerde minik bir ev olmalıydı. Evin önünde sarı bir lale vardı.",
      ],
    },
    {
      title: "Lale İzinin Peşinde",
      paragraphs: [
        "Oki masanın altına dikkatle baktı. Orada yalnız mavi bir kalem vardı. Lili ise pencere yanını inceledi.",
        "Sarı lale resmi perdenin yanında duruyordu. Kart hafif rüzgârla yere kaymıştı. Lili kartı nazikçe yerden aldı.",
        "Oki hemen son boşluğu gösterdi. Lili, kartı buraya koyayım mı, dedi. Nana gülerek önce öyküyü düşünmelerini istedi.",
        "Tren tünelden geçmiş, alana ulaşmıştı. Küçük ev alanın sonunda görünüyordu. Böylece lale kartı sıraya uyuyordu.",
        "Lili kartı son boşluğa özenle yerleştirdi. Dört resim artık bir yol oluşturdu. Nana anlatmaya yeniden hazırlandı.",
      ],
    },
    {
      title: "Öykünün Son Durağı",
      paragraphs: [
        "Nana öyküyü baştan sakin biçimde anlattı. Tren tünelden geçti, yeşil alana ulaştı. Sonunda sarı laleli evde durdu.",
        "Oki her resimde bir cümle okudu. Lili kartları aynı sırayla gösterdi. Nana yalnız gerektiğinde küçük yardım verdi.",
        "Öykü bitince Oki bir ayrıntı ekledi. Evin önünde minik bir kedi bekliyordu. Lili kedi için yeni kart çizdi.",
        "Nana yeni kartı öykünün sonuna koydu. Artık anlatı onların ortak öyküsü olmuştu. Eksik parça dikkatle bulunmuştu.",
        "Üçü kartları düzgünce küçük kutuya kaldırdı. Yarın öyküyü Ali ile Ela okuyacaktı. Masa yeni anlatıya hazır kaldı.",
      ],
    },
  ],
  glossary: [
    { word: "tünel", definition: "Bir yolun dağ veya toprak içinden geçen bölümüdür." },
    { word: "ipucu", definition: "Bir şeyi bulmaya yardım eden küçük bilgidir." },
    { word: "sıra", definition: "Şeylerin önce ve sonra gelen düzenidir." },
    { word: "ayrıntı", definition: "Bir bütünü tamamlayan küçük bilgidir." },
    { word: "anlatı", definition: "Birbirine bağlı olayların oluşturduğu öyküdür." },
  ],
  optionalReflectionPrompt: "Oki ile Lili eksik kartın yerini nasıl buldu?",
  sourceTruth,
  factualReview: {
    status: "not-applicable-fiction",
    notes: "Özgün gündelik kurmaca dış bilgi iddiası içermez.",
  },
  originalityRightsReview: {
    status: "pending-human-review",
    notes: "Metin Okurio için özgün üretildi; insan kaynak izi ve benzerlik incelemesi bekliyor.",
  },
  safeguardingLanguageReview: {
    status: "pending-human-review",
    notes: "Sakin yardım ve birlikte bulma dili insan erişilebilirlik ve çocuk onuru incelemesi bekliyor.",
  },
  contentQualityReview: createPendingContentQualityReview("ilk_harfler_6_7"),
};
