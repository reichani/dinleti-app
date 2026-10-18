const sourceTruth = Object.freeze({
  work: "Oki ve Güneşin Hikâyesi",
  scope: "Okurio karakter evreninde özgün dinleme ve okumaya hazırlık hikâyesi",
  sourceType: "original",
  rightsHolder: "Okurio",
  adaptationStatus: "not-applicable",
  sourceUrl: null,
  verificationStatus: "pending-human-review",
});

export const OKI_GUNESIN_HIKAYESI_DRAFT = {
  id: "oki-gunesin-hikayesi-v2-draft",
  replacesIdAfterApproval: "oki-gunesin-hikayesi",
  title: "Oki ve Güneşin Hikâyesi",
  ageBand: "5-6",
  contentTrack: "okumaya-hazirlik",
  primaryTheme: "Işığın gün boyunca çevremizde küçük değişiklikler oluşturması",
  contentStatus: "draft",
  releaseReady: false,
  estimatedWordsPerMinute: 155,
  wordCount: 285,
  estimatedSeconds: 111,
  sections: [
    {
      title: "Penceredeki Işık",
      paragraphs: [
        "Oki sabah erkenden gözlerini açınca odası yumuşak bir ışıkla aydınlıktı. Perdenin arasından ince bir ışık geçiyordu. Işık, duvarda parlak sarı bir yol çizmişti.",
        "Oki elini ışığın önüne dikkatle tuttu. Duvarda küçük bir el gölgesi belirdi. Elini yavaşça oynatınca gölge de oynadı.",
        "Mino yatağa çıkıp gölgeyi merakla izledi. Oki, güneşin yeni ve sessiz bir oyun getirdiğini düşündü.",
        "Oki pencereye yaklaşıp perdeyi biraz araladı. Işık yolu genişledi ve halıya kadar uzandı. Oki, güneşin bahçede neler yapacağını merak etti.",
      ],
    },
    {
      title: "Bahçedeki Uzun Gölge",
      paragraphs: [
        "Kahvaltıdan sonra Oki sıcak bahçeye çıktı. Güneş gökyüzünde henüz alçaktı. Oki'nin gölgesi yerde çok uzun görünüyordu.",
        "Lili kendi gölgesinin yanına bir taş koydu. Oki de gölgesinin ucuna yaprak bıraktı. Sonra birlikte biraz beklediler.",
        "Mino yaprağın yanında oturdu. Gölge ona kadar uzanıyordu. Oki, işareti daha sonra yeniden görmek istedi.",
        "Lili yaprağın yerini parmağıyla gösterdi. Oki işaretleri sayarak bir, iki dedi. Sonra öğleye kadar bahçede başka oyunlar oynadılar.",
      ],
    },
    {
      title: "Yer Değiştiren İşaret",
      paragraphs: [
        "Öğleye doğru arkadaşlar aynı yere döndü. Güneş artık gökyüzünde daha yüksekti. Oki'nin gölgesi sabahkinden daha kısa oldu.",
        "Yaprak yerindeydi, fakat gölgenin ucu değişmişti. Oki önce yaprağın yürüdüğünü sandı. Lili gülümseyip gökyüzünü gösterdi.",
        "Güneşin yeri değişince gölgenin de değiştiğini fark ettiler. Taşı ve yaprağı küçük işaretler olarak kullandılar.",
        "Oki yeni gölge ucuna ikinci bir yaprak koydu. Böylece sabahki ve öğlenki işaretleri yan yana gördü. Mino serin bir gölge arayıp ağacın altına geçti.",
      ],
    },
    {
      title: "Akşamın Altın Rengi",
      paragraphs: [
        "Akşam yaklaşınca bahçe altın bir renge büründü. Gölgeler yeniden uzamaya başladı. Mino'nun gölgesi ince ve uzun bir kuyruk gibi görünüyordu.",
        "Oki sabahki duvarı ve öğlenki yaprağı hatırladı. Işık aynı gün içinde farklı yollar çizmişti.",
        "Oki akşam gölgesini sabahki gölgeye benzetti. İkisi de uzundu, çünkü güneş gökyüzünde alçaktaydı. Öğlen ise güneş yüksekteydi ve gölge kısalmıştı.",
        "Lili işaretleri küçük defterine çizdi. Oki ertesi gün yeniden bakmak istedi. Güneş batarken üç arkadaş sessizce gökyüzünü izledi.",
      ],
    },
  ],
  glossary: [
    { word: "ışık", definition: "Çevremizi görmemizi sağlayan aydınlıktır." },
    { word: "gölge", definition: "Işık bir şeyin arkasına geçemeyince oluşan karanlık biçimdir." },
    { word: "işaret", definition: "Bir şeyi bulmaya veya hatırlamaya yardım eden izdir." },
    { word: "altın", definition: "Hikâyede sıcak ve parlak sarı rengi anlatır." },
  ],
  optionalReflectionPrompt: "Oki'nin gölgesi gün içinde nasıl değişti?",
  sourceTruth,
  factualReview: {
    status: "pending-human-review",
    notes: "Güneşin görünür konumu ve gölge uzunluğu ilişkisi insan bilim editörü doğrulaması bekliyor.",
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
