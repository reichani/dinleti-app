const sourceTruth = Object.freeze({
  work: "Oki Atı Tanıyor",
  scope: "Okurio karakter evreninde özgün ilk okuma hikâyesi",
  sourceType: "original",
  rightsHolder: "Okurio",
  adaptationStatus: "not-applicable",
  verificationStatus: "pending-human-review",
});

export const OKI_ATI_TANIYOR_DRAFT = {
  id: "oki-ati-taniyor-v2-draft",
  replacesIdAfterApproval: "oki-ati-taniyor",
  title: "Oki Atı Tanıyor",
  ageBand: "6-7",
  contentTrack: "ilk-okuma",
  primaryTheme: "Yeni bir canlıya sakin ve dikkatli yaklaşmak",
  contentStatus: "draft",
  releaseReady: false,
  estimatedWordsPerMinute: 155,
  sections: [
    {
      title: "Çitin Yanındaki At",
      paragraphs: [
        "Oki sabah Nana ile çiftliğe gitti. Çitin yanında kahverengi bir at duruyordu. Atın alnında küçük, beyaz bir iz vardı.",
        "Oki ata yaklaşmak istedi, fakat Nana uzaktan bakmasını söyledi. Oki durdu ve atın hareketlerini izledi.",
        "At kulaklarını öne çevirip başını yavaşça kaldırdı. Oki onun da kendisini gördüğünü anladı.",
        "Nana, atların kulaklarıyla da işaret verdiğini anlattı. Oki yeni işareti dikkatle aklında tuttu.",
      ],
    },
    {
      title: "Önce Sormak",
      paragraphs: [
        "Çiftliğin sahibi Ela yanlarına geldi. Oki, ata dokunabilir miyim, diye sordu. Ela önce atın sakinleşmesini bekledi.",
        "Atın adı Tane idi ve yeni sesleri merak ediyordu. Oki sesini alçalttı ve yerinde bekledi.",
        "Tane çite doğru iki adım attı. Oki hemen uzanmayıp Ela'nın işaretini dikkatle izledi.",
        "Beklemek Oki'ye önce biraz uzun geldi. Sonra Tane'nin rahatladığını açıkça fark etti.",
      ],
    },
    {
      title: "Yumuşak Bir Tanışma",
      paragraphs: [
        "Ela başını sallayınca Oki avucunu açık tuttu. Tane havayı koklayıp burnunu Oki'nin eline yaklaştırdı.",
        "Oki heyecanlandı, fakat hızlı davranmadı. Tane'nin yumuşak soluğunu avucunda hissetti. Bu küçük selam ona yetti.",
        "Bir kuş aniden çitin üstünden uçtu. Tane başını çevirince Oki bir adım geri çekildi.",
        "Ela, ikisinin de doğru davrandığını söyledi. Tane çevresini kontrol etmişti. Oki ise ona alan bırakmıştı.",
        "Kuş uzaklaşınca çiftliğe yeniden sessizlik geldi. Oki omuzlarının da gevşediğini hissetti.",
      ],
    },
    {
      title: "Tane Tane Öğrenmek",
      paragraphs: [
        "Bir süre sonra Tane yeniden yaklaştı. Oki alnındaki beyaz izi gördü. İz, küçük bir yaprağa benziyordu.",
        "Oki atların yalnız büyük hayvanlar olmadığını düşündü. Onların da sesleri ve hareketleri vardı. Bunları izlemek birçok şey anlatıyordu.",
        "Dönüş vakti gelince Oki el salladı. Tane kulaklarını yeniden öne çevirdi. Oki bunu sessiz bir vedaya benzetti.",
        "Nana, bugün ne öğrendin, diye sordu. Oki, önce bakmayı ve sormayı öğrendim, dedi. Yeni bir dostluk böyle başlamıştı.",
        "Eve giderken Tane'nin beyaz izini çizdi. Altına küçük harflerle yeni dostum yazdı.",
      ],
    },
  ],
  glossary: [
    { word: "çit", definition: "Bir alanın sınırını gösteren engeldir." },
    { word: "alın", definition: "Yüzün, kaşların üstünde kalan bölümüdür." },
    { word: "avuc", definition: "Elin iç tarafındaki yumuşak bölümdür." },
    { word: "soluk", definition: "Nefes alıp verirken çıkan havadır." },
    { word: "alan bırakmak", definition: "Birinin rahatça hareket etmesine yer vermektir." },
  ],
  optionalReflectionPrompt: "Oki, Tane'ye yaklaşmadan önce neden bekledi?",
  sourceTruth,
  factualReview: {
    status: "pending-human-review",
    notes: "At davranışı ve güvenli yaklaşım ayrıntıları uzman doğrulaması bekliyor.",
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
