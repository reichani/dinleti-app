import { createPendingContentQualityReview } from "../contentQualityReview.js";

const sourceTruth = Object.freeze({
  work: "Oki El Ele",
  scope: "Okurio karakter evreninde özgün ilk okuma hikâyesi",
  sourceType: "original",
  rightsHolder: "Okurio",
  adaptationStatus: "not-applicable",
  sourceUrl: null,
  verificationStatus: "pending-human-review",
});

export const OKI_EL_ELE_DRAFT = {
  id: "oki-el-ele-v2-draft",
  replacesIdAfterApproval: "oki-el-ele",
  title: "Oki El Ele",
  ageBand: "6-7",
  readingPathId: "ilk_harfler_6_7",
  contentTrack: "ilk-okuma",
  primaryTheme: "Birlikte yürürken ortak bir hız seçmek",
  contentStatus: "draft",
  structuralValid: true,
  releaseReady: false,
  estimatedWordsPerMinute: 155,
  wordCount: 324,
  estimatedSeconds: 126,
  declaredSeconds: 126,
  sections: [
    {
      title: "Mavi İzler",
      paragraphs: [
        "Oki sabah bahçedeki parlak mavi izleri gördü. İzler küçük okuma evine kadar uzanıyordu. Lili kapının yanında onu bekliyordu.",
        "İkisi yeni kitabı orada açmak istedi. Yol kısa görünüyordu, fakat iki yana kıvrılıyordu. Her kıvrımda başka bir renk vardı.",
        "Oki ilk mavi izin üstüne yavaşça bastı. Lili de yanındaki ize dikkatle geçti. Sonra birlikte yürümek için el ele verdiler.",
        "Mino arkadan sevinçle el sallayıp onları izledi. Okuma evinde buluşacağını söyledi. Oki ile Lili neşeyle yola başladı.",
      ],
    },
    {
      title: "İki Ayrı Hız",
      paragraphs: [
        "Oki renkleri görünce adımlarını hızlandırdı. Bir sonraki izi hemen bulmak istiyordu. Lili ise her izi okuyarak ilerliyordu.",
        "İlk kıvrımda elleri hafifçe gerildi. Oki bunu fark edince durdu. Lili hızlı yürümekte biraz zorlandığını sakince söyledi.",
        "Oki, daha yavaş gidelim mi, diye sordu. Lili hemen evet deyip rahatça gülümsedi. İkisi yeniden aynı yürüme sırasına geçti.",
        "Bu kez her izde renk adını söylediler. Mavi, sarı ve yeşil izler sıralandı. Ortak ritimleri yolu daha anlaşılır yaptı.",
      ],
    },
    {
      title: "Silinen İşaret",
      paragraphs: [
        "Yolun ortasında bir iz silinmişti. Oki sağdaki sarı izi seçmek istedi. Lili soldaki yeşil okun devamını gördü.",
        "İkisi aynı anda farklı yönlere bakıyordu. Ellerini bıraktılar ve çevreyi dikkatle birlikte incelediler. Acele etmek yerine önce işaretleri saydılar.",
        "Sarı iz kum havuzuna doğru gidiyordu. Yeşil ok ise küçük okuma evini gösteriyordu. Oki, Lili'nin gördüğü oku fark etti.",
        "Doğru yönü bulunca yeni bir plan yaptılar. Her kıvrımda önce durup çevreye bakacaklardı. Sonra ikisi de hazırsa ilerleyecekti.",
        "Oki elini yeniden açıkça uzattı. Lili yeniden el ele yürümek istediğini söyledi. Aynı hızla yeşil oku takip ettiler.",
      ],
    },
    {
      title: "Aynı Sayfada",
      paragraphs: [
        "Okuma evinin yuvarlak kapısına birlikte ulaştılar. Mino içeride minderleri yan yana yerleştirmişti. Yeni kitap masanın üstünde duruyordu.",
        "Oki kitabı hemen açmak istediğini söyledi. Lili önce ellerini kurulamalarını hatırlattı. Bahçe yolundaki nem avuçlarında kalmıştı.",
        "Ellerini kurulayıp aynı mindere oturdular. Oki ilk cümleyi tane tane okudu. Lili ikinci cümleyi aynı hızla sürdürdü.",
        "Bir yerde Oki durup uzun kelimeye baktı. Lili bekledi ve sayfayı çevirmedi. Oki hazır olunca okumaya birlikte devam ettiler.",
        "Yol boyunca aynı hızda kalmayı öğrenmişlerdi. Kitapta da birbirlerinin sırasını gözettiler. Son sayfaya yan yana ve neşeyle ulaştılar.",
      ],
    },
  ],
  glossary: [
    { word: "kıvrım", definition: "Bir yolun yön değiştirdiği eğri bölümdür." },
    { word: "ritim", definition: "Hareketlerin düzenli biçimde sürmesidir." },
    { word: "işaret", definition: "Bir yönü veya yeri gösteren belirtidir." },
    { word: "incelemek", definition: "Bir şeye dikkatle bakmaktır." },
    { word: "gözetmek", definition: "Birinin durumuna dikkat etmektir." },
  ],
  optionalReflectionPrompt: "Oki ile Lili ortak hızlarını nasıl buldu?",
  sourceTruth,
  factualReview: {
    status: "pending-human-review",
    notes: "Bahçe yolu, el ele yürüme ve el kuruluğu anlatımı insan güvenlik incelemesi bekliyor.",
  },
  originalityRightsReview: {
    status: "pending-human-review",
    notes: "Metin özgün Okurio taslağıdır; insan özgünlük ve hak kontrolü bekliyor.",
  },
  safeguardingLanguageReview: {
    status: "pending-human-review",
    notes:
      "Ortak hız, el bırakma ve yeniden temas kurma dili çocuk onurunu koruyacak biçimde yazıldı; insan erişilebilirlik tonu incelemesi bekliyor.",
  },
  contentQualityReview: createPendingContentQualityReview("ilk_harfler_6_7"),
};
