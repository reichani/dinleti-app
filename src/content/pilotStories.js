export const REVIEW_STATUS = Object.freeze({
  DRAFT: "draft",
  APPROVED: "approved",
  APPROVED_WITH_CONDITIONS: "approved-with-conditions",
  CHANGES_REQUIRED: "changes-required",
  NOT_APPLICABLE: "not-applicable",
});

/**
 * Pilot story schema.
 *
 * `legacy` keeps compatibility with the current App.jsx catalog shape.
 * `metadata` carries the new manifesto and Experience Council controls.
 */
export const PILOT_STORIES = [
  {
    legacy: {
      id: "oe-01-mino-neden-uzuldu",
      baslik: "Mino Neden Üzüldü?",
      yazar: "Okurio Özgün Hikâyeler",
      seslendiren: "Okurio Anlatıcı",
      kategori: "Duygu Tanıma ve İfade",
      yas: "7-9 yaş",
      renk: ["#42566B", "#9AB2C8"],
      puan: 5,
      sureDk: 3,
      ozet:
        "Mino'nun duygusunu fark etme, ifade etme ve arkadaşının bakışını anlama hikâyesi.",
      bolumler: [
        {
          ad: "Sessiz Köşe",
          dk: 1,
          metin:
            "Mino bahçenin sessiz köşesinde tek başına oturdu. Oki, arkadaşının kuyruğunun yere indiğini fark etti. Mino bugün oyuna çağrılmadığını düşündü. İçinde ağır bir üzüntü vardı.",
        },
        {
          ad: "Önce Dinlemek",
          dk: 1,
          metin:
            "Oki hemen bir çözüm söylemedi. Mino'nun yanına sakin biçimde oturdu. Mino, kendisini dışarıda kalmış hissettiğini anlattı. Oki dikkatle dinledi ve sözünü kesmedi.",
        },
        {
          ad: "Birlikte Sormak",
          dk: 1,
          metin:
            "Birlikte diğer arkadaşların yanına gittiler. Arkadaşları oyunun henüz başlamadığını açıkladı. Mino'nun yüzü biraz rahatladı. Oki, sormanın yanlış anlamayı azalttığını fark etti.",
        },
      ],
    },
    metadata: {
      ageBand: "7-9",
      estimatedMinutes: 3,
      pilotEligible: true,
      contentTrack: "emotion-recognition-expression",
      primaryDevelopmentTheme: "recognising-and-expressing-sadness",
      contentStatus: "experience-review",
      productOwnerApproved: false,
      accessibilityApproved: false,
      dyslexiaExperienceApproved: false,
      adhdExperienceApproved: false,
      socialEmotionalReviewStatus: REVIEW_STATUS.APPROVED_WITH_CONDITIONS,
      characters: ["Mino", "Oki"],
      glossary: [
        {
          word: "üzüntü",
          definition: "İnsan kendini mutsuz hissettiğinde oluşan duygudur.",
        },
        {
          word: "fark etmek",
          definition: "Bir şeyi görerek veya düşünerek anlamaktır.",
        },
        {
          word: "dışarıda kalmak",
          definition: "Bir gruba katılamadığını düşünmektir.",
        },
        {
          word: "açıklamak",
          definition: "Bir durumu anlaşılır sözlerle anlatmaktır.",
        },
        {
          word: "yanlış anlamak",
          definition: "Bir durumu gerçekte olduğundan farklı düşünmektir.",
        },
      ],
      optionalReflectionPrompt: "Sence Mino ne hissetti?",
      clinicalBoundaryChecked: true,
      copyrightChecked: true,
      reviewNotes: [
        "Duygu isimlendirilir ancak okuyucuya veya karaktere tanı konmaz.",
        "Yetişkin yönlendirmesi yerine arkadaş dinleme ve bilgi sorma davranışı gösterilir.",
        "Reflection cevabı pilotta saklanmayacak veya puanlanmayacaktır.",
      ],
    },
  },
  {
    legacy: {
      id: "os-01-toto-bir-an-durdu",
      baslik: "Toto Bir An Durdu",
      yazar: "Okurio Özgün Hikâyeler",
      seslendiren: "Okurio Anlatıcı",
      kategori: "Öz Düzenleme ve Dürtü Farkındalığı",
      yas: "7-9 yaş",
      renk: ["#584B3E", "#C9A87D"],
      puan: 5,
      sureDk: 3,
      ozet:
        "Toto'nun hızlı tepkisini fark edip bilgi toplamak için kısa bir an durduğu hikâye.",
      bolumler: [
        {
          ad: "Devrilen Kule",
          dk: 1,
          metin:
            "Toto büyük blok kulesinin son parçasını yerleştirdi. O sırada Oki masanın yanından geçti. Masa hafifçe sallandı ve kule devrildi. Toto'nun elleri hemen yumruk oldu.",
        },
        {
          ad: "Kısa Bir An",
          dk: 1,
          metin:
            "Toto bağırmak üzereyken Lili'nin sesini hatırladı. Bir an durdu ve ellerini gevşetti. Sonra Oki'ye ne olduğunu sordu. Oki kuleyi bilerek devirmediğini anlattı.",
        },
        {
          ad: "Yeni Seçim",
          dk: 1,
          metin:
            "Toto hâlâ hayal kırıklığı hissediyordu. Yine de birlikte yeni kule yapmayı seçti. Bu kez masayı daha güvenli bir yere taşıdılar. Kule yavaşça yeniden yükseldi.",
        },
      ],
    },
    metadata: {
      ageBand: "7-9",
      estimatedMinutes: 3,
      pilotEligible: true,
      contentTrack: "self-regulation-impulse-awareness",
      primaryDevelopmentTheme: "pause-and-check-before-reacting",
      contentStatus: "experience-review",
      productOwnerApproved: false,
      accessibilityApproved: false,
      dyslexiaExperienceApproved: false,
      adhdExperienceApproved: false,
      socialEmotionalReviewStatus: REVIEW_STATUS.APPROVED_WITH_CONDITIONS,
      characters: ["Toto", "Oki", "Lili"],
      glossary: [
        {
          word: "yerleştirmek",
          definition: "Bir şeyi uygun gördüğün yere koymaktır.",
        },
        {
          word: "gevşetmek",
          definition: "Sıkı tuttuğun bir şeyi daha rahat bırakmaktır.",
        },
        {
          word: "bilerek",
          definition: "Ne yaptığını anlayarak ve isteyerek davranmaktır.",
        },
        {
          word: "hayal kırıklığı",
          definition: "Beklediğin şey olmayınca hissettiğin üzüntüdür.",
        },
        {
          word: "seçim",
          definition: "Birden fazla yol arasından birini belirlemektir.",
        },
      ],
      optionalReflectionPrompt: "Toto durunca ne değişti?",
      clinicalBoundaryChecked: true,
      copyrightChecked: true,
      reviewNotes: [
        "Durma davranışı tek ve kesin tedavi yöntemi olarak sunulmaz.",
        "Toto utandırılmaz, etiketlenmez veya cezalandırılmaz.",
        "Hikâye bilgi sorma ve yeni seçim yapma olasılığını gösterir.",
      ],
    },
  },
];

export const PILOT_STORIES_LEGACY = PILOT_STORIES.map(({ legacy }) => legacy);

export const PILOT_STORY_METADATA = Object.fromEntries(
  PILOT_STORIES.map(({ legacy, metadata }) => [legacy.id, metadata]),
);
