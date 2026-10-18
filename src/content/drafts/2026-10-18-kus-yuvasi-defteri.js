import { createPendingContentQualityReview } from "../contentQualityReview.js";

const sourceTruth = Object.freeze({
  work: "Kuş Yuvası Defteri",
  scope: "Okurio için özgün doğa ve bilim okuması; okul bahçesinde karatavuk yuvasını uzaktan gözlemlemek",
  sourceType: "original",
  rightsHolder: "Okurio",
  adaptationStatus: "not-applicable",
  sourceUrl: "https://www.rspb.org.uk/birds-and-wildlife/blackbird",
  verificationStatus: "pending-human-review",
  references: [
    {
      label: "RSPB · Blackbird",
      url: "https://www.rspb.org.uk/birds-and-wildlife/blackbird",
      scope: "Karatavuk yuvasını dişinin yapması, dal ve çamurdan yuva, üç-dört yumurta, erkek ve dişinin görünüşü, beslenme",
    },
    {
      label: "National Audubon Society · What Should I Do If I Find a Nest Where It Doesn't Belong?",
      url: "https://www.audubon.org/news/what-should-i-do-if-i-find-nest-where-it-doesnt-belong",
      scope: "Yuvaya dokunmamak, uzaktan izlemek, sık ziyaretten kaçınmak, uyarı levhası ve yetişkin/uzman desteği",
    },
    {
      label: "BTO · Planning your visits to the nest",
      url: "https://bto.org/node/83817",
      scope: "Karatavukta yaklaşık 10-15 günlük kuluçka süresi ve yuva ziyaretlerini seyrek tutmak",
    },
  ],
});

export const KUS_YUVASI_DEFTERI_DRAFT = {
  id: "kus-yuvasi-defteri-draft",
  title: "Kuş Yuvası Defteri",
  language: "tr",
  ageBand: "8-10",
  readingPathId: "okuma_guveni_8_10",
  contentTrack: "okurio-original-pilot",
  primaryTheme: "Doğayı sevmek, ona dokunmadan dikkatle bakmak ve gerektiğinde yardım istemektir",
  contentStatus: "draft",
  structuralValid: true,
  releaseReady: false,
  estimatedWordsPerMinute: 155,
  sections: [
    {
      title: "Çalının Arasındaki Sepet",
      paragraphs: [
        "Bahar gelmişti ve okul bahçesi yeşillenmişti. Oki teneffüste topunu kovalıyordu. Top, duvarın dibindeki sık çalıya yuvarlandı.",
        "Oki topu almak için eğildi. Birden durdu ve gözlerini kırpıştırdı. Dalların arasında küçük, yuvarlak bir sepet vardı.",
        "Lili de koşarak yanına geldi. \"Bu bir kuş yuvası!\" diye fısıldadı.",
        "Yuva ince dallardan örülmüştü. Kenarları kurumuş çamurla sıvanmıştı. İçi yumuşak otlarla kaplıydı.",
        "Oki elini uzatmak istedi. İçinde ne olduğunu çok merak ediyordu. Lili onun kolunu nazikçe tuttu.",
        "\"Dur, dokunmayalım,\" dedi Lili. \"Belki annesi yakındadır. Bizi görürse korkabilir.\" Oki elini hemen geri çekti.",
        "İkisi birkaç adım geri çekildi. Topu çalının kenarından dikkatle aldılar. Sonra bankın yanına oturup yuvaya uzaktan baktılar.",
        "Biraz sonra kahverengi bir kuş geldi. Gagasında kuru bir ot vardı. Kuş otu yuvaya bıraktı ve yeniden uçtu.",
        "\"Yuvasını hâlâ yapıyor,\" dedi Oki. Sesi heyecandan titriyordu. Zil çaldı ama ikisi de bu sırrı unutmadı.",
      ],
    },
    {
      title: "Nana'nın Sorusu",
      paragraphs: [
        "Akşam Oki ile Lili, Nana'ya her şeyi anlattı. Nana onları dikkatle dinledi. Sonra gülümseyerek bir soru sordu.",
        "\"Yuvaya dokunmadınız, değil mi?\" İkisi birden başını salladı. Nana bu cevaptan çok memnun oldu.",
        "Nana, kuşların yuvalarını kendi başlarına seçtiğini anlattı. İnsanlar çok yaklaşırsa kuşlar telaşlanabilirdi. Bazen yuvayı bırakıp gidebilirlerdi.",
        "\"Peki nasıl izleyeceğiz?\" diye sordu Oki. Nana rafından eski bir dürbün çıkardı. \"Uzaktan bakarak ve not alarak,\" dedi.",
        "Lili'nin aklına bir fikir geldi. Boş bir defteri masaya koydu. Kapağına büyük harflerle \"Kuş Yuvası Defteri\" yazdı.",
        "Nana defterin ilk sayfasına üç kural yazdırdı. Birinci kural, yuvaya asla dokunmamaktı. İkinci kural, uzaktan ve kısa süre bakmaktı.",
        "Üçüncü kural en önemlisiydi. Bir sorun görürlerse hemen bir yetişkine söyleyeceklerdi. Oki kuralları yüksek sesle iki kez okudu.",
        "Gece yatağında Oki kahverengi kuşu düşündü. Acaba yuvası bitince ne yapacaktı? Yarın bunu öğrenmek için sabırsızlanıyordu.",
      ],
    },
    {
      title: "Deftere İlk Notlar",
      paragraphs: [
        "Ertesi gün Oki ile Lili bankın yanında buluştu. Dürbün Lili'nin boynunda asılıydı. Defter ve kalem de Oki'nin elindeydi.",
        "Önce bahçe görevlisi Hasan Bey'e haber verdiler. Hasan Bey yuvayı görünce çok sevindi. \"Bu bir karatavuk yuvası,\" dedi.",
        "Hasan Bey kahverengi kuşun dişi olduğunu söyledi. Karatavuklarda yuvayı çoğunlukla dişi kuş yapardı. Erkek kuş ise simsiyahtı ve gagası turuncuydu.",
        "Tam o sırada çatıdan bir ses yükseldi. Siyah bir kuş öterek oraya konmuştu. Gagası güneşte turuncu turuncu parlıyordu.",
        "Lili hemen deftere ilk notu yazdı. Pazartesi günü dişi kuş yuvaya ot taşımıştı. Erkek kuş da çatıda ötmüştü. Oki notun yanına küçük bir resim çizdi.",
        "Hasan Bey çalının önüne bir levha koydu. Levhada \"Lütfen yaklaşmayın, kuşlar yuva yapıyor\" yazıyordu. Böylece başka çocuklar da dikkatli olacaktı.",
        "Oki defteri kapatmadan önce bir şey ekledi. \"Bugün yuvayı sadece beş dakika izledik.\" Lili bu notu çok beğendi.",
      ],
    },
    {
      title: "Dört Mavi Yumurta",
      paragraphs: [
        "Birkaç gün boyunca dişi kuş yuvada uzun uzun oturdu. Lili bunu dürbünle uzaktan gördü. \"Neden hiç kalkmıyor?\" diye sordu.",
        "Hasan Bey merdivenle yaklaşmadı. Onun yerine telefonunu uzun bir çubuğa bağladı. Kuş beslenmeye gittiğinde tek bir fotoğraf çekti.",
        "Fotoğrafta dört küçük yumurta vardı. Yumurtalar mavimsi yeşildi ve üstlerinde kahverengi benekler vardı. Oki ile Lili sevinçten zıpladı.",
        "Hasan Bey, anne kuşun yumurtaları ısıttığını anlattı. Buna kuluçka denirdi. Karatavuklarda kuluçka yaklaşık iki hafta sürerdi.",
        "Lili deftere bir takvim çizdi. Her gün bir kutuyu boyayacaktı. Oki de kutuların altına günün havasını yazdı.",
        "Bir öğle arası bahçeye bir kedi girdi. Kedi çalıya doğru yavaşça yürüyordu. Oki onu kovalamak için koşmak istedi.",
        "Ama Oki üçüncü kuralı hatırladı. Koşmak yerine hemen nöbetçi öğretmene gitti. Öğretmen kediyi sakin bir şekilde bahçeden çıkardı.",
        "O akşam Lili deftere yeni bir not yazdı. \"Bugün bir sorun gördük ve yardım istedik.\" Oki bu cümlenin altını iki kez çizdi.",
      ],
    },
    {
      title: "Yuvadan İlk Adımlar",
      paragraphs: [
        "Takvimde on dördüncü kutu boyandı. O sabah çalıdan ince sesler geliyordu. Yumurtalar çatlamış, yavrular çıkmıştı.",
        "Yavrular çok küçüktü ve gözleri kapalıydı. Anne ve baba kuş durmadan gidip geliyordu. Gagalarında solucanlar ve küçük böcekler vardı.",
        "Oki ile Lili artık daha da uzak durdu. Yavruları ürkütmek istemiyorlardı. Her gün yalnızca birkaç dakika dürbünle baktılar.",
        "Günler geçtikçe yavruların tüyleri çıktı. Yuva onlara dar gelmeye başladı. Bir sabah yavrulardan biri çalının dalına atladı.",
        "Yavru kuş yerde biraz zıpladı. Lili endişeyle Hasan Bey'e baktı. Hasan Bey onu sakinleştirdi. \"Anne ve babası yakında, onu besliyorlar,\" dedi.",
        "Birkaç gün içinde bütün yavrular yuvadan ayrıldı. Çalının içi sessizleşti. Oki önce biraz hüzünlendi.",
        "Sonra defterin sayfalarını tek tek çevirdi. Her sayfada bir gün, bir resim ve bir not vardı. Hiçbir sayfada yuvaya dokunmamışlardı.",
        "Lili defterin son sayfasına bir cümle yazdı. \"Sevdiğimiz şeyi korumak için bazen sadece bakmak yeter.\" Oki bu sayfayı sınıfta herkese gösterdi.",
      ],
    },
  ],
  glossary: [
    { word: "yuva", definition: "Kuşların yumurtlayıp yavrularını büyüttüğü yerdir." },
    { word: "dürbün", definition: "Uzaktaki şeyleri yakındaymış gibi gösteren alettir." },
    { word: "karatavuk", definition: "Erkeği siyah, gagası turuncu, dişisi kahverengi olan bir kuştur." },
    { word: "kuluçka", definition: "Kuşun yumurtaların üstünde oturup onları ısıtmasıdır." },
    { word: "yavrular", definition: "Bir hayvanın yeni doğmuş, küçük çocuklarıdır." },
    { word: "levha", definition: "Üzerinde yazı ya da işaret bulunan tabeladır." },
  ],
  optionalReflectionPrompt:
    "Oki kediyi görünce koşmak yerine neden öğretmene gitti?",
  sourceTruth,
  contentQualityReview: createPendingContentQualityReview("okuma_guveni_8_10"),
};

// Timing follows the actual reading body, excluding headings and glossary.
const body = KUS_YUVASI_DEFTERI_DRAFT.sections
  .flatMap((section) => section.paragraphs).join(" ");
KUS_YUVASI_DEFTERI_DRAFT.wordCount =
  body.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
KUS_YUVASI_DEFTERI_DRAFT.estimatedSeconds = Math.ceil(
  KUS_YUVASI_DEFTERI_DRAFT.wordCount * 60 / 155,
);
KUS_YUVASI_DEFTERI_DRAFT.declaredSeconds =
  KUS_YUVASI_DEFTERI_DRAFT.estimatedSeconds;
