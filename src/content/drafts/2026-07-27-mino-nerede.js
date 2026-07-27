const sourceTruth = Object.freeze({
  work: "Mino Nerede?",
  scope: "Okurio karakter evreninde özgün ilk okuma hikâyesi",
  sourceType: "original",
  rightsHolder: "Okurio",
  adaptationStatus: "not-applicable",
  sourceUrl: null,
  verificationStatus: "pending-human-review",
});

export const MINO_NEREDE_DRAFT = {
  id: "mino-nerede-v2-draft",
  replacesIdAfterApproval: "mino-nerede",
  title: "Mino Nerede?",
  ageBand: "6-7",
  contentTrack: "ilk-okuma",
  primaryTheme: "İpuçlarını sırayla izleyerek birlikte çözüm bulmak",
  contentStatus: "draft",
  releaseReady: false,
  estimatedWordsPerMinute: 155,
  wordCount: 382,
  estimatedSeconds: 148,
  sections: [
    {
      title: "Sessiz Minder",
      paragraphs: [
        "Oki sabah erkenden sessiz salona geldi. Mino'nun yumuşak sarı minderi tamamen boştu. Su kabı yerindeydi, fakat Mino görünmüyordu.",
        "Oki önce büyük masanın altına dikkatle baktı. Sonra uzun perdeyi iki eliyle usulca araladı. Orada yalnız sıcak ve güneşli bir köşe vardı.",
        "Lili açık kapıdan hızlıca içeri girdi. Oki ona yerdeki boş minderi gösterdi. İkisi Mino'yu sakin biçimde birlikte aramaya karar verdi.",
        "Her yere aynı anda koşmak hiç istemediler. Önce evdeki bütün odaları sırayla gezeceklerdi. Buldukları işaretleri küçük mavi deftere tek tek çizeceklerdi.",
      ],
    },
    {
      title: "Minik İzler",
      paragraphs: [
        "Mutfakta mama kabının yanında iki küçük kırıntı vardı. Islak bir pati izi açık kapıya uzanıyordu. Oki deftere hemen küçük bir pati çizdi.",
        "İz uzun koridorda birden kayboldu. Lili yerde ince ve mavi bir ip buldu. Bu ip Mino'nun sevdiği oyuncak faresindendi.",
        "İpin gevşek ucu merdivene doğru gidiyordu. İkisi ahşap basamakları sessizce çıktı. Yukarıda çok hafif bir çan sesi duydular.",
        "Ses yalnız bir kez geldi, sonra kesildi. Oki yakındaki dolabın kapısını dikkatle kontrol etti. Kapı açıktı, fakat içeride küçük Mino yoktu.",
        "Lili yerdeki mavi ipi yeniden gördü. İp doğrudan çalışma odasına uzanıyordu. Yeni ipucu onları başka bir yöne götürdü.",
      ],
    },
    {
      title: "Yanlış Köşe",
      paragraphs: [
        "Çalışma odasında kapalı ve büyük bir kutu duruyordu. Kutudan hafif hışırtı gelince ikisi çok heyecanlandı. Oki geniş kapağı iki eliyle yavaşça açtı.",
        "Kutunun içinde yalnız ince renkli kâğıtlar vardı. Açık pencereden gelen rüzgâr kâğıtları oynatıyordu. Mino bu köşede yine bulunamamıştı.",
        "Oki biraz daha düşünmek için olduğu yerde durdu. Çan sesi yukarıdan değil, yan taraftan gelmiş olabilirdi. Lili de bu fikri duyunca başını salladı.",
        "Tam bu sırada koridordan yumuşak bir miyav duyuldu. Ses yakındaki çamaşır odasına oldukça yakındı. İkisi açık kapıya doğru sessizce yürüdü.",
        "Kapı aralığından mavi ipin son parçası görünüyordu. İp büyük hasır sepetin altına doğru girmişti. Aradıkları gizli yer artık çok yakındı.",
      ],
    },
    {
      title: "Sepetteki Uyku",
      paragraphs: [
        "Lili büyük sepetin yanına yavaşça çömeldi. Oki üstteki temiz havluyu dikkatle kaldırdı. Mino sıcak havluların arasında kıvrılmış halde uyuyordu.",
        "Boynundaki küçük çan, dönerken hafifçe çınladı. Mino yeşil gözlerini yavaşça açıp uzun uzun esnedi. Sonra ikisine neşeli ve küçük bir miyav verdi.",
        "Oki ile Lili rahatlayıp sevinçle gülümsedi. Mino'yu uykuluyken hemen kaldırmadılar. Uyanıp sepetten kendi isteğiyle çıkmasını sabırla beklediler.",
        "Mino yere inince doğruca sarı minderine yürüdü. Oki boş su kabını taze suyla doldurdu. Lili mavi ipi oyuncak fareye yeniden bağladı.",
        "Defterdeki pati, ip ve çan çizimlerine birlikte baktılar. Her küçük ipucu bir sonrakini açıkça göstermişti. Birlikte ve sırayla aramak işi kolaylaştırmıştı.",
      ],
    },
  ],
  glossary: [
    { word: "işaret", definition: "Bir şeyi anlamaya yardım eden belirtidir." },
    { word: "ipucu", definition: "Bir sorunun çözümüne götüren küçük bilgidir." },
    { word: "hışırtı", definition: "Kâğıt veya yaprak hareket edince çıkan sestir." },
    { word: "hasır", definition: "İnce bitki saplarıyla örülen malzemedir." },
    { word: "çömelmek", definition: "Dizleri bükerek yere yaklaşmaktır." },
  ],
  optionalReflectionPrompt: "Oki ile Lili, Mino'yu bulmak için hangi ipuçlarını izledi?",
  sourceTruth,
  factualReview: {
    status: "pending-human-review",
    notes: "Evde kedi güvenliği ve bakım anlatımı insan incelemesi bekliyor.",
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
