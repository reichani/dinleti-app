import { createPendingContentQualityReview } from "../contentQualityReview.js";

// Brif: docs/content-plans/2026-10-19.md, Brif 2 (genc_okurlar_12_14, bilim_hikayesi).
// Brif onayı: Reyhan Açar, K-2026-10-19-01 (ontology/karar-kayitlari.json, PR #157).
const sourceTruth = Object.freeze({
  work: "Üç Balonun Sırrı",
  scope:
    "Fen kulübünde mayayla deney yapan iki ortaokul öğrencisini anlatan özgün Okurio bilim hikâyesi. Karakterler ve olay örgüsü özgündür; birincil kaynak yoktur. Hikâyedeki bilimsel olgular factualReview.claims listesinde kaynaklarıyla verilmiştir.",
  sourceType: "original-okurio-ai-assisted",
  rightsStatus: "okurio-ozgun-ai-destekli",
  rightsHolder: "Okurio",
  adaptationStatus: "not-applicable",
  sourceUrl: null,
  verificationStatus: "pending-human-review",
});

export const UC_BALONUN_SIRRI_DRAFT = {
  id: "uc-balonun-sirri-draft",
  title: "Üç Balonun Sırrı",
  language: "tr",
  ageBand: "12-14",
  readingPathId: "genc_okurlar_12_14",
  icerikTuru: "bilim_hikayesi",
  mebKademe: "ortaokul",
  mebSinif: "7. ve 8. Sınıf",
  mebKazanim: "B2 açık",
  pirlsSureci: "B2 açık",
  contentTrack: "original-science-story",
  primaryTheme: "Bilim, gözlemden doğan bir soruyu sabırla ve dürüst veriyle sınamaktır; beklenmedik sonuç da bir şey öğretir.",
  contentStatus: "draft",
  structuralValid: true,
  releaseReady: false,
  estimatedWordsPerMinute: 155,
  wordCount: 1058,
  estimatedSeconds: 410,
  contentWarnings: [],
  sections: [
    {
      title: "Babaannenin Hamuru",
      paragraphs: [
        "Cumartesi sabahı mutfak un kokuyordu. Ece'nin babaannesi tezgâhın başında ekmek hamuru yoğuruyordu. Ece de yanında oturmuş, onu izliyordu.",
        "Babaannesi hamura biraz maya ekledi. Sonra hamuru bir kaba koydu ve üstünü temiz bir bezle örttü. Kabı da sobanın yakınına bıraktı.",
        "Ece bir saat sonra bezi kaldırdı. Hamur neredeyse iki katına çıkmıştı. Yüzeyinde küçük delikler vardı.",
        "\"Bu nasıl oldu?\" diye sordu Ece. Hamura sonradan hiçbir şey eklenmemişti. Babaannesi gülümsedi ve hamuru maya kabartır, dedi.",
        "Ama mayanın bunu nasıl yaptığını o da tam bilmiyordu. Ece hamuru parmağıyla hafifçe bastırdı. Hamur yumuşak bir yastık gibi yavaşça geri kalktı.",
        "Ece meraklanmıştı. Bir kabı daha pencerenin önüne koymak istedi. Pencere aralıktı ve oradan serin bir hava giriyordu.",
        "Öğleden sonra iki kabı yan yana getirdiler. Sobanın yanındaki hamur kocaman olmuştu. Penceredeki hamur ise az kabarmıştı.",
        "\"Bunu ne zaman anlayacağım?\" diye sordu Ece sabırsızca. Babaannesi hamuru eliyle bastırdı. \"Sabreden derviş muradına ermiş,\" dedi.",
        "Ece defterini açtı ve ilk notunu yazdı. Sıcak yerdeki hamur daha çok kabardı. Bu küçük not, onun ilk bilimsel gözlemi oldu.",
      ],
    },
    {
      title: "Fen Kulübünde Bir Soru",
      paragraphs: [
        "Pazartesi günü okulda fen kulübü toplandı. Ece, Selin Öğretmen'e defterini gösterdi. Yanında sınıf arkadaşı Baran da vardı.",
        "Selin Öğretmen notu dikkatle okudu. \"Güzel bir başlangıç,\" dedi. \"Bilim çoğu zaman böyle bir gözlemle başlar.\"",
        "Sonra tahtaya kocaman bir soru işareti çizdi. Maya nedir, diye sordu. Kimse emin değildi.",
        "Selin Öğretmen anlatmaya başladı. Maya, tek hücreli bir mantardır. Mutfakta kullandığımız maya da canlıdır.",
        "Maya şekerle beslenir. Şekeri kullanırken karbondioksit gazı çıkarır. Hamurdaki küçük delikler, bu gazın kabarcıklarıdır.",
        "Baran hemen elini kaldırdı. Şeker ne kadar çoksa gaz da o kadar çok olur, dedi. Selin Öğretmen gülümseyerek başını salladı.",
        "\"Baran, şimdi bir hipotez kurdun,\" dedi öğretmen. \"Hipotez, sınanabilen bir tahmindir. Ama onu doğru kabul etmek için önce sınamalıyız.\"",
        "Ece de babaannesinin iki kabını anlattı. Sıcak yerdeki hamur daha çok kabarmıştı. Belki sıcaklık da önemliydi, ama şimdilik tek bir soruya odaklanmaya karar verdiler.",
        "Ece defterindeki notu yeniden okudu. Gözlem, gördüğümüz şeydi. Hipotez ise gördüğümüzü açıklamaya çalışan tahmindi.",
        "Ece ile Baran birbirine baktı. Aynı şeyi düşünüyorlardı. Bu hipotezi bir deney ile sınayacaklardı.",
      ],
    },
    {
      title: "Üç Şişe, Üç Balon",
      paragraphs: [
        "Ertesi gün masada üç boş şişe duruyordu. Yanlarında üç balon, bir paket kuru maya ve bir kavanoz şeker vardı. Baran şişelere birer numara yazdı.",
        "Selin Öğretmen önemli bir kural söyledi. Bir deneyde aynı anda yalnız bir şeyi değiştiririz. Geri kalan her şey aynı kalmalıdır.",
        "Bu deneyde değişen şey şeker olacaktı. Birinci şişeye hiç şeker koymadılar. İkinciye bir, üçüncüye iki kaşık şeker koydular.",
        "Her şişeye aynı miktarda maya eklediler. Ilık suyu Selin Öğretmen kendisi hazırladı. Çocuklar suyu bir ölçü kabıyla şişelere paylaştırdı.",
        "Sonra her şişenin ağzına bir balon geçirdiler. Gaz çıkarsa balon şişecekti. Baran şişeleri dikkatle karıştırdı.",
        "Selin Öğretmen kuralları bir kez daha hatırlattı. Deney malzemeleri tadılmaz, şişeler ağza götürülmez. İş bitince herkes ellerini sabunla yıkar.",
        "Başlamadan önce ikisi de tahminini deftere yazdı. Baran, üçüncü balon en büyük olacak, diye yazdı. Ece de aynı tahmini yaptı, ama yanına küçük bir soru işareti koydu.",
        "Ece deftere bir tablo çizdi. Her on dakikada bir balonların çevresini ölçeceklerdi. Ölçüm için bir mezura kullandılar.",
        "Selin Öğretmen bir şey daha hatırlattı. \"Ne görürseniz onu yazın. Tahmininize uysun ya da uymasın.\" Ece bu cümleyi tablonun üstüne yazdı.",
      ],
    },
    {
      title: "Beklenmedik Veri",
      paragraphs: [
        "İlk on dakikada balonlarda pek bir değişiklik olmadı. Baran sabırsızca masanın etrafında dolaştı. Ece ise ilk ölçümleri tabloya geçirdi.",
        "Yarım saat sonra şişelerin içinde küçük kabarcıklar belirdi. Balonlar yavaş yavaş dikilmeye başladı. Çocuklar heyecanla mezurayı uzattı.",
        "Bir saatin sonunda tablo dolmuştu. Birinci balon neredeyse hiç şişmemişti. İkinci balon ise iyice büyümüştü.",
        "Asıl şaşırtıcı olan üçüncü balondu. İki kaşık şeker koydukları hâlde, ikinci balondan daha az şişmişti. Baran ölçümü üç kez tekrarladı.",
        "\"Hipotezimiz yanlışmış,\" dedi Baran. Sesinde bir hayal kırıklığı vardı. \"Belki bu sayıyı biraz düzeltsek?\"",
        "Ece hemen başını iki yana salladı. Olmaz, dedi, veriyi beğenmesek de değiştiremeyiz. Yoksa deneyin hiçbir anlamı kalmaz.",
        "Baran bir an sustu, sonra hak verdi. Sayıyı değiştirmek, aslında kendini kandırmak olurdu. Üstelik başka biri aynı deneyi yapsa, gerçek ortaya çıkardı.",
        "Kulüpteki diğer öğrenciler de masanın başına toplandı. Biri balonların delik olabileceğini söyledi. Ece balonları tek tek kontrol etti, ama hiçbirinde delik yoktu.",
        "Selin Öğretmen de yanlarına geldi. Tabloya uzun uzun baktı. \"Beklenmedik veri, bazen en çok şey öğreten veridir,\" dedi.",
        "\"Asıl soru şu,\" diye ekledi. \"Üçüncü şişede başka ne farklıydı?\" Çocuklar şişelerin başında düşünmeye başladı.",
      ],
    },
    {
      title: "Gözden Kaçan Ayrıntı",
      paragraphs: [
        "Ece deneyin başına döndü ve her adımı tek tek hatırladı. Şişeler aynıydı. Maya aynıydı, balonlar da aynıydı.",
        "Sonra Baran birden yerinden kalktı. \"Su!\" dedi. Üçüncü şişenin suyunu en son o doldurmuştu.",
        "O sırada ılık su bitmişti. Baran, pencerenin önünde bekleyen sürahiden su almıştı. O su çoktan soğumuştu.",
        "Selin Öğretmen başını salladı. \"İşte değişen ikinci şey,\" dedi. \"Soğuk ortamda maya daha yavaş çalışır.\"",
        "\"O hâlde suyu çok sıcak mı yapmalıyız?\" diye sordu Baran. Selin Öğretmen hayır anlamında başını salladı.",
        "Çok sıcak su mayayı öldürür, diye açıkladı. Bu yüzden ne soğuk ne de sıcak, ılık su kullanıyoruz. Suyu da her zaman bir yetişkin hazırlar.",
        "Ece babaannesinin iki hamurunu hatırladı. Penceredeki hamur da az kabarmıştı. Demek ki iki gözlem birbirini destekliyordu.",
        "Baran utanmıştı ve başını önüne eğdi. Ama Selin Öğretmen onu cesaretlendirdi. Böyle hatalar en deneyimli bilim insanlarının da başına gelir, dedi.",
        "\"Bir ayrıntıyı gözden kaçırmak bütün sonucu değiştirebilir,\" dedi. \"Önemli olan, hatayı saklamak değil, onu bulmaktır. Siz de tam olarak bunu yaptınız.\"",
        "Deneyi bir hafta sonra yeniden yapmaya karar verdiler. Bu kez üç şişenin suyunu da aynı kaptan alacaklardı. Ece tabloya yeni bir sütun ekledi: su sıcaklığı.",
      ],
    },
    {
      title: "Mikroskobun Altında",
      paragraphs: [
        "Bir hafta sonra deneyi tekrarladılar. Bu kez üç şişenin suyu da aynı sıcaklıktaydı. Bir saat sonra sonuç açıktı.",
        "Şekersiz şişenin balonu yine neredeyse hiç şişmedi. Bir kaşık şekerli balon şişti. İki kaşık şekerli balon ise en büyüğü oldu.",
        "Ölçümler bitince Selin Öğretmen dolaptan bir mikroskop çıkardı. Bir damla mayalı suyu ince bir camın üstüne koydu. Ece gözünü merceğe yaklaştırdı.",
        "Önce her şey bulanıktı. Ayar düğmesini yavaşça çevirince görüntü netleşti. Görüş alanını küçük, yuvarlak hücreler doldurmuştu.",
        "Bazı hücrelerin kenarında daha küçük bir çıkıntı göze çarpıyordu. Selin Öğretmen bunun bir tomurcuk olduğunu anlattı. Mayaların çoğu tomurcuklanarak çoğalır.",
        "\"Bu kadar küçük canlıları ilk kim görmüştü?\" diye sordu Baran. Selin Öğretmen, Hollandalı Antonie van Leeuwenhoek'tan söz etti. O, bakterileri ve tek hücreli canlıları ilk gözlemleyen kişiydi.",
        "Leeuwenhoek 1674'te bulanık bir göl suyunu incelemişti. Basit mikroskobunda minik canlılar görmüştü. O güne kadar kimse bu görünmez dünyayı bilmiyordu.",
        "Ece defterini kapatmadan önce son satırı yazdı. Sonuç: Bu deneyde şeker arttıkça balon daha çok şişti. Yeni soru: Şekeri daha da artırırsak ne olur?",
        "Akşam babaannesine her şeyi anlattı. Babaannesi gülerek hamuruna baktı. \"Gördün mü,\" dedi, \"sabreden derviş muradına ermiş.\"",
      ],
    },
  ],
  glossary: [
    { word: "gözlem", definition: "Bir olayı veya varlığı dikkatle izleyip gördüklerini not etme." },
    { word: "hipotez", definition: "Bir soruya verilen ve deneyle sınanabilen tahmin." },
    { word: "deney", definition: "Bir tahmini sınamak için koşulları planlayarak yapılan uygulama." },
    { word: "veri", definition: "Gözlem veya ölçümle toplanan bilgi; sayılar, notlar, ölçümler." },
    { word: "mikroskop", definition: "Gözle görülemeyecek kadar küçük şeyleri büyüterek gösteren araç." },
    { word: "sonuç", definition: "Toplanan verilere bakarak varılan yargı." },
    { word: "hücre", definition: "Canlıları oluşturan, çoğu yalnız mikroskopla görülebilen en küçük yapı birimi." },
    { word: "tomurcuk", definition: "Mayada ana hücrenin kenarında büyüyüp sonra ayrılan küçük yeni hücre." },
  ],
  editorialLanguageProfile: {
    idioms: [
      {
        expression: "gözden kaçırmak",
        meaning: "Bir şeyi fark etmemek, dikkatten kaçırmak.",
        ageFit: "Ortaokul düzeyinde yaygın bir deyimdir; deneydeki unutulan ayrıntıyla anlamı somut olarak gösterilir.",
      },
    ],
    proverbs: [
      {
        expression: "Sabreden derviş muradına ermiş",
        meaning: "Sabırla bekleyen ve çalışan kişi sonunda istediğine ulaşır.",
        ageFit: "Hamurun kabarmasını ve deneyin tekrarını beklemekle bağlantılıdır; hikâyenin başında ve sonunda yinelenir.",
      },
    ],
    culturalObjects: [],
  },
  optionalReflectionPrompt: "İstersen düşün: Sen olsan Ece'nin yeni sorusunu sınamak için deneyi nasıl planlardın?",
  reflectionOptional: true,
  reflectionScored: false,
  sourceTruth,
  factualReview: {
    status: "pending-human-review",
    notes:
      "Olgusal iddialar ajan tarafından aşağıdaki kaynaklarla karşılaştırıldı (2026-10-19). Bu bir AI ön kontrolüdür; fen bilimleri öğretmeni veya insan editör doğrulaması bekler. Deney sonuçları (balon ölçümleri) kurgudur ve genel bir doz-yanıt iddiası olarak sunulmaz ('Bu deneyde').",
    claims: [
      {
        claim: "Maya tek hücreli bir mantardır.",
        type: "olgusal",
        sources: ["https://www.britannica.com/science/yeast-fungus", "https://kids.britannica.com/students/article/yeast/277835"],
        result: "destekleniyor",
      },
      {
        claim: "Maya şekerle beslenir ve şekeri kullanırken karbondioksit gazı çıkarır.",
        type: "olgusal",
        sources: ["https://www.britannica.com/science/yeast-fungus", "https://www.britannica.com/science/brewers-yeast"],
        result: "destekleniyor",
      },
      {
        claim: "Hamuru maya kabartır; hamurdaki delikler karbondioksit kabarcıklarıdır.",
        type: "olgusal",
        sources: ["https://kids.britannica.com/students/article/yeast/277835"],
        result: "destekleniyor",
      },
      {
        claim: "Mutfakta kullanılan maya canlıdır (tek hücreli bir mantar; fırıncılıkta kullanılır).",
        type: "olgusal",
        sources: ["https://www.britannica.com/science/brewers-yeast", "https://www.britannica.com/science/yeast-fungus"],
        result: "destekleniyor",
      },
      {
        claim: "Bir deneyde aynı anda yalnız bir şey (bağımsız değişken) değiştirilir, diğerleri sabit tutulur.",
        type: "pedagojik",
        sources: ["https://static.nsta.org/ecybermission-files/helpdocs/Variables Constants and Controls.pdf"],
        result: "destekleniyor",
      },
      {
        claim: "Soğuk ortamda maya daha yavaş çalışır (kabarma uzar).",
        type: "olgusal",
        sources: ["https://ask.extension.org/kb/faq.php?id=681982"],
        result: "destekleniyor",
      },
      {
        claim: "Çok sıcak su mayayı öldürür.",
        type: "olgusal",
        sources: ["https://wayne.osu.edu/news/baking-bread-how-get-rise-out-dough", "https://ask.extension.org/kb/faq.php?id=681982"],
        result: "destekleniyor",
      },
      {
        claim: "Mikroskopta maya yuvarlak hücreler olarak görülür; bazıları tomurcuklanır. Mayaların çoğu tomurcuklanarak çoğalır.",
        type: "olgusal",
        sources: [
          "https://www.bioedonline.org/lessons-and-more/lessons-by-topic/microorganisms/microbes/observing-different-microbes/",
          "https://www.britannica.com/science/yeast-fungus",
        ],
        result: "destekleniyor",
      },
      {
        claim: "Hollandalı Antonie van Leeuwenhoek bakterileri ve tek hücreli canlıları (protozoa) ilk gözlemleyen kişidir.",
        type: "olgusal",
        sources: ["https://www.britannica.com/print/article/334699"],
        result: "destekleniyor",
      },
      {
        claim: "Leeuwenhoek 1674'te bulanık bir göl suyunu basit mikroskobuyla inceleyip minik canlılar gördü; o güne kadar bu görünmez dünya bilinmiyordu.",
        type: "olgusal",
        sources: ["https://tudelft.nl/en/antoni-van-leeuwenhoekjaar/antoni-van-leeuwenhoek/the-microorganisms"],
        result: "destekleniyor",
      },
    ],
  },
  originalityRightsReview: {
    status: "pending-human-review",
    notes: "Metin özgün Okurio taslağıdır (AI destekli); karakterler (Ece, Baran, Selin Öğretmen) ve olay örgüsü özgündür. Maya-balon deneyi okullarda yaygın bir etkinliktir; belirli bir yayından alınmamıştır. İnsan özgünlük ve hak kontrolü bekliyor.",
  },
  safeguardingLanguageReview: {
    status: "pending-human-review",
    notes: "Deneyde ılık suyu öğretmen hazırlar; çocuklar sıcak su kullanmaz, maya karışımını tatmaz. Veri değiştirme önerisi anlatı içinde reddedilir. İnsan incelemesi bekliyor.",
  },
  ownerApproval: { status: "pending", ownerName: "" },
  contentQualityReview: createPendingContentQualityReview("genc_okurlar_12_14"),
};

export default UC_BALONUN_SIRRI_DRAFT;
