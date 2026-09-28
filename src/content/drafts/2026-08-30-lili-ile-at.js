import { createPendingContentQualityReview } from "../contentQualityReview.js";

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
  readingPathId: "ilk_harfler_6_7",
  contentTrack: "ilk-okuma",
  primaryTheme: "Yeni bir canlıya yaklaşırken gözlemek ve izin beklemek",
  contentStatus: "draft",
  structuralValid: true,
  releaseReady: false,
  estimatedWordsPerMinute: 155,
  wordCount: 271,
  estimatedSeconds: 105,
  declaredSeconds: 105,
  sections: [
    {
      title: "Çitin Yanında",
      paragraphs: [
        "Lili sabah çiftliğin tahta çitine yaklaştı. Açık alanda küçük, doru bir at duruyordu. Atın alnında beyaz bir iz vardı.",
        "Lili hemen onun yanına gitmek istedi. Nana onunla birlikte kapıda bekledi. Önce atı uzaktan dikkatle gözlemlemeyi önerdi.",
        "At başını eğip taze otları kokladı. Sonra kulaklarını Lili'ye doğru çevirdi. Lili sessiz durunca at yeniden rahatladı.",
      ],
    },
    {
      title: "Yavaş Bir Adım",
      paragraphs: [
        "Bakıcı Ece kapıyı açıp yanlarına geldi. Atın adının Köpük olduğunu söyledi. Lili yaklaşmak için ondan izin istedi.",
        "Ece önce kendi yürüdü ve güvenli yolu gösterdi. Lili onun yanında küçük adımlar attı. Köpük başını kaldırıp ikisini sessizce izledi.",
        "Lili elini hemen uzatmadı. Atın da yaklaşmayı seçmesini bekledi. Köpük bir adım atıp havayı kokladı.",
        "Lili heyecanlandı, fakat yerinde sakin kaldı. Bu bekleyiş Köpük'e karar vermek için zaman verdi. At sonunda biraz daha yaklaştı.",
      ],
    },
    {
      title: "Uçan Şapka",
      paragraphs: [
        "Tam o sırada rüzgâr Lili'nin şapkasını uçurdu. Şapka çitin yanında hızla yuvarlandı. Köpük ürküp iki adım geriye çekildi.",
        "Lili korkan atın peşinden koşmadı. Ece'nin yanında durup şapkayı Nana'ya bıraktı. Nana şapkayı yavaşça yerden aldı.",
        "Köpük çevreyi yeniden koklayıp sakinleşti. Ece, geri çekilmenin ata alan verdiğini açıkladı. Lili beklemenin nedenini şimdi daha iyi anladı.",
        "Bir süre sonra Köpük yeniden onlara sakince baktı. Lili bu kez yana dönük biçimde durdu. At kendi isteğiyle aradaki yolu kapattı.",
      ],
    },
    {
      title: "Açık Bir Avuç",
      paragraphs: [
        "Ece, Lili'ye avucunu düz tutmayı gösterdi. Sonra küçük bir fırçayı birlikte taşıdılar. Köpük fırçayı görüp yerinde kaldı.",
        "Lili önce omzuna dokunmak için yeniden izin bekledi. Ece uygun olduğunu söyleyince tek yumuşak hareket yaptı. Köpük sakince nefes verdi.",
        "Lili atı uzun süre fırçalamaya çalışmadı. Birkaç hareketten sonra durup onu gözledi. Köpük başını Lili'nin yönüne çevirdi.",
        "Dönüş vakti gelince Lili kapıya doğru yürüdü. Köpük çitin yanında onu dikkatle izledi. Lili yeni dostluğun aceleyle başlamadığını öğrendi.",
      ],
    },
  ],
  glossary: [
    { word: "doru", definition: "Gövdesi kahverengi olan at rengidir." },
    { word: "gözlemek", definition: "Bir şeyi dikkatle izlemektir." },
    { word: "ürkmek", definition: "Ani bir olaydan korkup geri çekilmektir." },
    { word: "alan", definition: "Burada canlının rahatça durduğu boşluktur." },
    { word: "sakin", definition: "Telaşsız ve yumuşak davranma durumudur." },
  ],
  optionalReflectionPrompt: "Lili, Köpük yeniden yaklaşana kadar neden bekledi?",
  sourceTruth,
  factualReview: {
    status: "pending-human-review",
    notes: "Ata yaklaşma, ürkme ve fırçalama adımları insan hayvan güvenliği incelemesi bekliyor.",
  },
  originalityRightsReview: {
    status: "pending-human-review",
    notes: "Metin özgün Okurio taslağıdır; insan özgünlük ve hak kontrolü bekliyor.",
  },
  safeguardingLanguageReview: {
    status: "pending-human-review",
    notes: "İzin, bekleme ve geri çekilme dili baskısız yazıldı; insan erişilebilirlik tonu incelemesi bekliyor.",
  },
  contentQualityReview: createPendingContentQualityReview("ilk_harfler_6_7"),
};
