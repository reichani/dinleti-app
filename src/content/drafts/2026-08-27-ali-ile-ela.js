import { createPendingContentQualityReview } from "../contentQualityReview.js";

const sourceTruth = Object.freeze({
  work: "Ali ile Ela",
  scope: "Okurio karakter evreninde özgün ilk okuma hikâyesi",
  sourceType: "original",
  rightsHolder: "Okurio",
  adaptationStatus: "not-applicable",
  sourceUrl: null,
  verificationStatus: "pending-human-review",
});

export const ALI_ILE_ELA_DRAFT = {
  id: "ali-ile-ela-v2-draft",
  replacesIdAfterApproval: "ali-ile-ela",
  title: "Ali ile Ela",
  ageBand: "6-7",
  readingPathId: "ilk_harfler_6_7",
  contentTrack: "ilk-okuma",
  primaryTheme: "Bir işi küçük adımlarla birlikte tamamlamak",
  contentStatus: "draft",
  structuralValid: true,
  releaseReady: false,
  estimatedWordsPerMinute: 155,
  wordCount: 312,
  estimatedSeconds: 121,
  declaredSeconds: 121,
  sections: [
    {
      title: "Rüzgârdaki Kâğıt",
      paragraphs: [
        "Ali ile Ela okulun bahçesine çıktı. Ela elinde mavi bir kâğıt taşıyordu. Kâğıttan küçük bir uçurtma yapacaklardı.",
        "O sırada hafif bir bahar rüzgârı esti. Mavi kâğıt Ela'nın elinden kaydı. İkisi de uçan kâğıdın ardından dikkatle baktı.",
        "Kâğıt önce havada döndü, sonra alçak bir dala takıldı. Ela, ona hemen uzanmak istedi.",
        "Ali dalın biraz yüksekte olduğunu gördü. Önce sakin bir yol bulalım, dedi. Ela durdu ve çevresine baktı.",
        "Bahçede koşmak yerine görevliyi birlikte çağırmaya karar verdiler. Böylece hem kendilerini hem kâğıdı güvenle koruyabileceklerdi.",
      ],
    },
    {
      title: "Küçük Bir Plan",
      paragraphs: [
        "Bahçenin yanında uzun bir sopa vardı. Ali sopayı almak için görevliye sordu. Görevli sopayı dikkatle onlara verdi.",
        "Ela sopanın ucunu dala yaklaştırdı. Ali de kâğıdın düşeceği yeri tuttu. Fakat kâğıt dala daha çok dolandı.",
        "İkisi sopayı hemen bıraktı, çünkü zorlamak kâğıdı yırtabilirdi. Bu kez başka bir yol düşündüler.",
        "Yakında alçak ve sağlam bir bank vardı. Görevli bankı dalın yanına taşıdı. Çocuklar yine uzaktan bekledi.",
        "Yeni planın her adımını başlamadan önce birlikte konuştular. Kimin nerede duracağını açıkça belirlemek işlerini kolaylaştırdı.",
      ],
    },
    {
      title: "Birlikte Uzanmak",
      paragraphs: [
        "Görevli bankın üstüne çıktı. Ali sopayı ona dikkatle uzattı. Ela düşen parçaları toplamak için eğildi.",
        "Sopa dala hafifçe dokundu ve kâğıt bir kez daha havalandı. Sonra Ela'nın önüne yumuşakça indi.",
        "Ela kâğıdı iki eliyle tuttu, fakat köşesi biraz kıvrılmıştı. Yine de üzerinde hiçbir yırtık yoktu.",
        "Ali bankı eski yerine götürmeye yardım etti. Ela da sopayı görevliye verdi. Küçük planları sonunda işe yaramıştı.",
        "Kâğıdı kurtarmak tek bir kişinin başarısı değildi. Herkes sakin kalıp birlikte küçük bir görev üstlenmişti.",
      ],
    },
    {
      title: "Mavi Uçurtma",
      paragraphs: [
        "Sınıfta kâğıdı masaya serdiler. Kıvrılan köşeyi elleriyle düzelttiler. Sonra iki ince çıtayı birleştirdiler.",
        "Ela uzun ipi tuttu, Ali sağlam düğümü bağladı. Uçurtmanın kuyruğuna renkli parçalar eklediler. Mavi uçurtma artık uçmaya hazırdı.",
        "Bahçeye dönünce rüzgâr hâlâ esiyordu. Ali koştu, Ela ipi yavaşça bıraktı. Uçurtma gökyüzüne doğru yükseldi.",
        "İkisi başlarını gökyüzüne kaldırıp sevinçle gülümsedi. Uçurtmayı birlikte yapmışlardı. Birlikte düşünmek işi kolaylaştırmıştı.",
        "Mavi uçurtma bahçenin üstünde geniş bir halka çizdi. Ali ile Ela ipi sırayla dikkatle tuttular.",
      ],
    },
  ],
  glossary: [
    { word: "dal", definition: "Ağacın gövdeden ayrılan ince bölümüdür." },
    { word: "kıvrılmak", definition: "Bir kenarın bükülerek biçim değiştirmesidir." },
    { word: "çıta", definition: "İnce ve uzun tahta parçasıdır." },
    { word: "düğüm", definition: "İpin çözülmemesi için yapılan bağdır." },
    { word: "uçurtma", definition: "Rüzgârla gökyüzünde uçan, ipe bağlı oyuncaktır." },
  ],
  optionalReflectionPrompt: "Ali ile Ela kâğıdı kurtarırken neden planlarını değiştirdi?",
  sourceTruth,
  factualReview: {
    status: "pending-human-review",
    notes: "Bahçe güvenliği ve yetişkin desteği anlatımı insan incelemesi bekliyor.",
  },
  originalityRightsReview: {
    status: "pending-human-review",
    notes: "Metin özgün Okurio taslağıdır; insan özgünlük ve hak kontrolü bekliyor.",
  },
  safeguardingLanguageReview: {
    status: "pending-human-review",
    notes:
      "Metin klinik, tanılayıcı, utandırıcı veya performans baskısı kuran dil içermez; insan erişilebilirlik tonu incelemesi bekliyor.",
  },
  contentQualityReview: createPendingContentQualityReview("ilk_harfler_6_7"),
};
