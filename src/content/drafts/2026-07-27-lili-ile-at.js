const sourceTruth = Object.freeze({
  work: "Lili ile At",
  scope: "Okurio karakter evreninde özgün ilk okuma hikâyesi",
  sourceType: "original",
  rightsHolder: "Okurio",
  adaptationStatus: "not-applicable",
  sourceUrl: null,
  verificationStatus: "pending-human-review",
});

export const LILI_ILE_AT_DRAFT = {
  id: "lili-ile-at-v2-draft",
  replacesIdAfterApproval: "lili-ile-at",
  title: "Lili ile At",
  ageBand: "6-7",
  contentTrack: "ilk-okuma",
  primaryTheme: "Bir hayvanın sınırlarını gözleyerek saygılı biçimde yaklaşmak",
  contentStatus: "draft",
  releaseReady: false,
  estimatedWordsPerMinute: 155,
  wordCount: 332,
  estimatedSeconds: 129,
  sections: [
    {
      title: "Çitin Ardındaki Kırçıl",
      paragraphs: [
        "Lili serin bir sabah dedesiyle küçük çiftliğe gitti. Çitin hemen ardında benekli bir at duruyordu. Atın adı Kırçıl'dı.",
        "Lili hemen atın yanına gitmek istedi. Dedesi önce uzaktan dikkatle bakmasını söyledi. Kırçıl kulaklarını çevredeki seslere doğru oynatıyordu.",
        "Lili atın yeşil otları ağır ağır çiğnediğini gördü. Uzun kuyruğu bazen sinekleri uzaklaştırıyordu. Büyük bedeni oldukça sakin görünüyordu.",
        "Dedesi, her hayvanın kendine ait alanı olduğunu anlattı. Lili ahşap çitin yanında sessizce bekledi. Kırçıl da başını yavaşça ona çevirdi.",
      ],
    },
    {
      title: "Önce İzin",
      paragraphs: [
        "Çiftliğin bakıcısı Ece de yanlarına geldi. Lili, Kırçıl'a yaklaşabilir miyim, diye açıkça sordu. Ece gülümseyip birlikte yavaşça yürümeyi önerdi.",
        "Üçü çitin geniş kapısından yavaşça geçti. Lili iki kolunu yanında tuttu. Hiç koşmadı ve yüksek sesle konuşmadı.",
        "Ece, Lili'nin açık ve boş avucunu gösterdi. Kırçıl isterse yaklaşıp onu koklayabilirdi. Lili olduğu yerde sessizce ve sakince durdu.",
        "At birkaç küçük adım attı, sonra durdu. Lili de ona doğru ilerlemedi. Kırçıl biraz sonra burnunu açık avuca yaklaştırdı.",
      ],
    },
    {
      title: "Tenekenin Sesi",
      paragraphs: [
        "Tam o sırada boş bir teneke hızla devrildi. Çınlayan güçlü ses Kırçıl'ı birden şaşırttı. At başını kaldırıp hemen yana çekildi.",
        "Lili atın arkasından gitmedi ve Ece'ye baktı. Ece birlikte iki adım geri çekilmelerini söyledi. Böylece Kırçıl için güvenli boşluk bıraktılar.",
        "Dedesi uzaktaki tenekeyi yerden kaldırdı. Küçük çiftlik yeniden sessizleşti. Kırçıl çevresine bakıp yavaşça nefes verdi.",
        "Lili beklemenin de önemli bir yardım olduğunu anladı. Atın yeniden yaklaşmasını hiç zorlamadı. Bir süre sonra Kırçıl onlara döndü.",
        "Ece, atın hareketli kulaklarını ve ayaklarını gösterdi. Bu işaretler onun hazır olup olmadığını anlamaya yardım ediyordu.",
      ],
    },
    {
      title: "Yan Yana Bir Tur",
      paragraphs: [
        "Ece yuların uzun ipini dikkatle tuttu. Lili onun sol yanında yürüdü. Kırçıl düzenli küçük adımlarla ikisini izledi.",
        "Bahçenin çevresinde birlikte kısa bir tur attılar. Lili bazen durdu, Kırçıl da sakince durdu. Aralarında sessiz ve rahat bir uyum oluştu.",
        "Tur bitince Lili atın boynuna dokunmak için yeniden sordu. Ece güvenli ve uygun yeri gösterdi. Lili yalnız bir kez yumuşakça dokundu.",
        "Kırçıl başını eğip yeniden yeşil otlara döndü. Lili bunun sakin bir veda olduğunu düşündü. Çitin dışına sevinçle gülümseyerek çıktı.",
        "Eve giderken küçük defterine üç önemli işaret çizdi. Bakmak, izin istemek ve beklemek; güzel tanışmanın adımlarıydı.",
      ],
    },
  ],
  glossary: [
    { word: "çiftlik", definition: "Hayvanların ve bitkilerin yetiştirildiği yerdir." },
    { word: "çit", definition: "Bir alanı çevreleyen engeldir." },
    { word: "yular", definition: "Atı güvenle yönlendirmeye yarayan başlıktır." },
    { word: "uyum", definition: "Birlikte düzenli ve rahat hareket etmektir." },
    { word: "işaret", definition: "Bir durumu anlamaya yardım eden belirtidir." },
  ],
  optionalReflectionPrompt: "Lili, Kırçıl teneke sesinden ürkünce neden geri çekildi?",
  sourceTruth,
  factualReview: {
    status: "pending-human-review",
    notes: "Atlara güvenli yaklaşma ve beden dili anlatımı uzman incelemesi bekliyor.",
  },
  originalityRightsReview: {
    status: "pending-human-review",
    notes: "Metin özgün Okurio taslağıdır; insan özgünlük ve hak kontrolü bekliyor.",
  },
  contentQualityReview: {
    status: "pending",
    reviewerName: "",
    reviewedAt: "",
    reviewNotes: "",
    checklist: {
      narrativeArc: false,
      ageFit: false,
      sectionContinuity: false,
      characterConsistency: false,
      languageQuality: false,
      factualAccuracy: false,
      originalityRights: false,
      accessibilityTone: false,
    },
  },
};
