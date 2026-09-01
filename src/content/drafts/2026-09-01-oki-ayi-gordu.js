import { createPendingContentQualityReview } from "../contentQualityReview.js";

const sourceTruth = Object.freeze({
  work: "Oki Ay'ı Gördü",
  scope: "Okurio karakter evreninde özgün ilk cümleler bilim hikâyesi",
  sourceType: "original",
  rightsHolder: "Okurio",
  adaptationStatus: "not-applicable",
  sourceUrl: "https://spaceplace.nasa.gov/moon-phases/",
  supportingSources: [
    "https://science.nasa.gov/moon/moon-phases/",
    "https://science.nasa.gov/moon/viewing-tips/",
  ],
  verificationStatus: "pending-human-review",
});

export const OKI_AYI_GORDU_DRAFT = {
  id: "oki-ayi-gordu-v2-draft",
  replacesIdAfterApproval: "oki-ayi-gordu",
  title: "Oki Ay'ı Gördü",
  ageBand: "7-8",
  readingPathId: "ilk_cumleler_7_8",
  contentTrack: "bilim-hikayesi",
  primaryTheme: "Dikkatli gözlemle Ay'ın değişen görünüşünü fark etmek",
  contentStatus: "draft",
  structuralValid: true,
  releaseReady: false,
  estimatedWordsPerMinute: 155,
  wordCount: 350,
  estimatedSeconds: 136,
  declaredSeconds: 136,
  sections: [
    {
      title: "İnce Ay",
      paragraphs: [
        "Oki sakin akşam odasındaki perdenin kenarını yavaşça açtı. Lacivert gökyüzünde ince, parlak bir yay gördü. Heyecanla Lili'yi geniş pencereye hemen çağırdı.",
        "Lili parlak yaya uzun süre dikkatle baktı. Bunun ince görünen Ay olduğunu sakince söyledi. Oki, Ay'ın görünmeyen kalanını merak etti.",
        "İkisi gözlem defterini çalışma masasına birlikte getirdi. Oki gördüğü yayı sarı kalemle dikkatle çizdi. Altına o günün tarihini özenle yazdı.",
      ],
    },
    {
      title: "Işığın Kaynağı",
      paragraphs: [
        "Oki, Ay'ın gökte duran küçük lamba olduğunu önce düşündü. Lili onun kendi ışığını yapmadığını dikkatle açıkladı. Ay, Güneş'ten gelen güçlü ışığı bize yansıtıyordu.",
        "Lili küçük el fenerini beyaz oyun topuna tuttu. Topun ışığa doğrudan bakan yanı hemen parladı. Öteki yanı ise daha karanlık kaldı.",
        "Bu düzenek yalnızca küçük ve basit modeldi. Yine de Oki temel fikri kolayca gördü. Işık, topun her yanını aynı anda göstermiyordu.",
      ],
    },
    {
      title: "Ertesi Akşam",
      paragraphs: [
        "Ertesi akşam Oki yine aynı pencereye erkenden geldi. Ay, önceki geceden biraz daha farklı görünüyordu. Parlak yay şimdi gözle görülür biçimde çok daha genişti.",
        "Oki eski çizimi yeni gökyüzü görüntüsüyle karşılaştırdı. Ay'ın gerçekten büyüyüp büyümediğini merakla sordu. Lili, değişenin Ay değil, görünüş olduğunu anlattı.",
        "Ay, Dünya çevresindeki uzun yolunda düzenli ilerliyordu. Biz aydınlık bölümün her gece farklı kısmını görüyorduk. Bu değişen görünüşlere Ay'ın evreleri deniyordu.",
      ],
    },
    {
      title: "Bulutun Oyunu",
      paragraphs: [
        "Üçüncü akşam ince gri bulutlar bütün gökyüzünü kapladı. Oki bir süre parlak Ay'ı hiçbir yerde bulamadı. Defterine hemen boş ve yuvarlak bir daire çizmek istedi.",
        "Lili önce pencere yanında biraz beklemeyi önerdi. Hafif rüzgâr bulutları yavaşça başka yöne taşıdı. Ay aynı yerde yeniden parlak biçimde göründü.",
        "Oki bulutun Ay'ı aslında değiştirmediğini hemen fark etti. Bulut yalnızca onların görüşünü kısa süre kapatmıştı. Oki yeni çizime küçük gri bulutlar ekledi.",
      ],
    },
    {
      title: "Gözlem Dizisi",
      paragraphs: [
        "Oki sonraki birkaç akşam daha düzenli gözlem yaptı. Her yeni çizimi dikkatle tarih sırasına yan yana koydu. İnce yay giderek daha geniş parlak şekle dönüştü.",
        "Lili bütün çizimlere birlikte yeniden bakmayı önerdi. Sıralı resimler küçük bir değişim dizisi oluşturuyordu. Oki sabırlı gözlemin gerçekten işe yaradığını anladı.",
        "Son çizimin altına açıklayıcı kısa bir not yazdı. Ay ışık üretmiyor, Güneş ışığını bize yansıtıyordu. Görünüşü Dünya çevresindeki yolculuğu boyunca değişiyordu.",
        "Oki perdeyi yavaşça kapatmadan önce açık gökyüzüne yeniden baktı. Artık yalnız parlak ve uzak bir şekil görmüyordu. Takip edebileceği düzenli bir gökyüzü değişimi görüyordu.",
      ],
    },
  ],
  glossary: [
    { word: "yansıtmak", definition: "Gelen ışığı başka bir yöne geri göndermektir." },
    { word: "gözlem", definition: "Bir şeyi dikkatle izleyip bilgi toplamaktır." },
    { word: "evre", definition: "Bir değişimin belirli görünüş veya aşamasıdır." },
    { word: "model", definition: "Bir şeyi anlamaya yardım eden basit örnektir." },
    { word: "dizi", definition: "Belirli sırayla art arda gelen şeylerdir." },
  ],
  optionalReflectionPrompt: "Oki, Ay'ın değişimini anlamak için ne yaptı?",
  sourceTruth,
  factualReview: {
    status: "pending-human-review",
    notes: "Yansıyan güneş ışığı, Ay evreleri ve model anlatımı NASA kaynaklarıyla ön doğrulandı; insan bilim editörü incelemesi bekliyor.",
  },
  originalityRightsReview: {
    status: "pending-human-review",
    notes: "Metin özgün Okurio taslağıdır; insan özgünlük ve hak kontrolü bekliyor.",
  },
  safeguardingLanguageReview: {
    status: "pending-human-review",
    notes: "Gece gözlemi güvenli iç mekânda ve baskısız anlatıldı; insan erişilebilirlik tonu incelemesi bekliyor.",
  },
  contentQualityReview: createPendingContentQualityReview("ilk_cumleler_7_8"),
};
