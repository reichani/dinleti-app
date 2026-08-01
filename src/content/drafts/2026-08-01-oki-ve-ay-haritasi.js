const sourceTruth = Object.freeze({
  work: "Oki ve Ay Haritası",
  scope: "Ay yüzeyinin fotoğraflar ve yörünge verileriyle nasıl haritalandığını anlatan özgün Okurio bilim hikâyesi",
  sourceType: "original-science-narrative",
  rightsHolder: "Okurio",
  adaptationStatus: "not-applicable",
  verificationStatus: "pending-human-review",
  references: [
    {
      title: "Moon Craters",
      publisher: "NASA Science",
      url: "https://science.nasa.gov/moon/lunar-craters/",
      scope: "Çarpma kraterlerinin oluşumu, fırlayan malzeme ve krater biçimlerinin farklılaşması",
    },
    {
      title: "Why Study Moon Craters?",
      publisher: "NASA Science",
      url: "https://science.nasa.gov/moon/lunar-craters/why-study-craters/",
      scope: "Sıvı su ve rüzgâr aşınmasının bulunmaması, izlerin korunması ve krater sayımı",
    },
    {
      title: "Moon Water and Ices",
      publisher: "NASA Science",
      url: "https://science.nasa.gov/moon/moon-water-and-ices/",
      scope: "Kutup gölgelerinde su buzu ve yüzey tanelerinde su molekülleri; açık sıvı deniz bulunmaması",
    },
    {
      title: "Visit the Moon Without Leaving Your Desk",
      publisher: "U.S. Geological Survey",
      url: "https://www.usgs.gov/news/featured-story/visit-moon-without-leaving-your-desk",
      scope: "Koyu düzlüklerin maria diye adlandırılması ve bunların eski bazalt ovaları olması",
    },
  ],
});

export const OKI_VE_AY_HARITASI_DRAFT = {
  id: "oki-ay-haritasi-v2-draft",
  replacesIdAfterApproval: "oki-ay-haritasi",
  title: "Oki ve Ay Haritası",
  ageBand: "10-12",
  contentTrack: "bilim-hikayesi",
  primaryTheme: "Bir harita, görüntüleri kanıtlarla karşılaştırarak yüzeyin geçmişini okumamıza yardım eder",
  contentStatus: "draft",
  releaseReady: false,
  estimatedWordsPerMinute: 155,
  wordCount: 726,
  estimatedSeconds: 282,
  sections: [
    {
      title: "Fotoğraftaki Yuvarlak İzler",
      paragraphs: [
        "Oki bilgisayardaki Ay fotoğrafını dikkatle büyüttü. Gri yüzeyde iç içe yuvarlak izler görünüyordu. Bazılarının kenarı keskin, bazılarınınki daha yumuşaktı.",
        "Lili bunların kurumuş göller olabileceğini düşündü. Araştırmacı Ece hemen doğru ya da yanlış demedi. Önce şekilleri ve çevrelerindeki malzemeyi incelemelerini istedi.",
        "Yuvarlak çukurların çoğu çarpma krateriydi. Asteroit, meteoroit veya kuyruklu yıldız yüzeye çarpabilirdi. Büyük enerji kayayı ezip çevreye savururdu.",
        "Savrulan kırık malzemeye fırlatma örtüsü deniyordu. Bazı kraterlerin çevresinde parlak ışınlar görülüyordu. Bu izler çarpmanın yönünü tek başına göstermiyordu.",
        "Oki her yuvarlak şeklin aynı olmadığını fark etti. Küçük kraterler derin bir kâseye benzeyebilirdi. Büyük kraterlerde duvarlar çöker, merkez tepeleri oluşabilirdi.",
        "Ece ilk harita katmanını açtı. Fotoğraf, yükseklik ve ışık bilgileri ayrı renklerdeydi. Bir şeklin anlamı, birden fazla kanıtla güçleniyordu.",
      ],
    },
    {
      title: "Deniz Sanılan Koyu Düzlükler",
      paragraphs: [
        "Haritanın bazı bölümleri çevresinden daha koyuydu. Eski gökbilimciler bu alanları uzaktan denize benzetmişti. Bu yüzden onlara Latince maria adı verilmişti.",
        "Ancak bu bölgelerde açık sıvı deniz yoktu. Koyu düzlükler, çok eski lav akıntılarının oluşturduğu bazalt ovalarıydı. İsim kalmış, açıklama değişmişti.",
        "Toto haritada mavi renk görünce su bulunduğunu sandı. Ece harita renklerinin her zaman gerçek renk olmadığını açıkladı. Bilimsel haritalar ölçümleri ayırmak için renk kullanabilirdi.",
        "Mavi bir alan yükseklik, sıcaklık veya mineral gösterebilirdi. Renk anahtarı okunmadan sonuç çıkarılamazdı. Oki her katmanın açıklamasını yanına yazdı.",
        "Açık renkli yüksek bölgeler daha çok krater taşıyordu. Koyu düzlüklerin bazıları daha genç görünüyordu. Lav, önceden oluşmuş çukurları kısmen doldurmuş olabilirdi.",
        "Harita böylece yalnız yer göstermiyordu. Yüzeylerin göreli geçmişini karşılaştırmaya da yardım ediyordu. Fakat kesin yaş için kaya örnekleri gibi ek kanıtlar gerekiyordu.",
      ],
    },
    {
      title: "Rüzgârın Olmadığı Yüzey",
      paragraphs: [
        "Lili Dünya'daki eski izlerin neden daha az göründüğünü sordu. Yağmur, akarsular ve rüzgâr yüzeyleri sürekli değiştirebilirdi. Levha hareketleri de kayaları yenileyebilirdi.",
        "Ay'da Dünya'daki gibi yoğun bir atmosfer yoktu. Çevresindeki çok seyrek gaz tabakasına ekzosfer deniyordu. Bu ortam yüzeyde hava akımı oluşturamıyordu.",
        "Bu nedenle Ay'da rüzgâr aşınması gerçekleşmiyordu. Yüzeyde akan sıvı su da bulunmuyordu. Krater izleri milyarlarca yıl korunabiliyordu.",
        "Oki bunu Ay'da hiç su yok diye yazdı. Ece cümleyi hemen durdurdu. Yeni ölçümler daha dikkatli bir ifade gerektiriyordu.",
        "Kalıcı gölgeli kutup kraterlerinde su buzu doğrulanmıştı. Güneş gören bazı yüzey tanelerinde de su molekülleri bulunmuştu. Bunlar akan nehir veya açık göl değildi.",
        "Oki notunu yeniden düzenledi. Ay'da rüzgâr ve akan sıvı su aşınması yoktu. Ancak belirli ortamlarda buz ve su molekülleri bulunabiliyordu.",
      ],
    },
    {
      title: "Kraterleri Saymak",
      paragraphs: [
        "Ece iki küçük harita karesi seçti. Birinde çok sayıda krater vardı. Diğerinde koyu ve daha düzgün bir ova görünüyordu.",
        "Oki ilk alanın daha çok çarpma yaşadığını düşündü. Bu mümkün olsa da tek açıklama değildi. Eski yüzeyler yeni çarpmaları biriktirmek için daha uzun zaman geçirmişti.",
        "Bilim insanları belirli büyüklükteki kraterleri sayabiliyordu. Krater yoğunluğu yüzeylerin göreli yaşını karşılaştırmaya yardım ediyordu. Buna krater sayımı deniyordu.",
        "Fakat yöntem kusursuz bir takvim değildi. Sonraki lav akıntıları eski kraterleri örtebilirdi. Büyük bir çarpma da birçok ikincil krater oluşturabilirdi.",
        "Lili her iki kareyi aynı ölçekte karşılaştırdı. Farklı büyüklükte alanları doğrudan saymak yanıltıcı olurdu. Ölçek ve sayım kuralı baştan belirlenmeliydi.",
        "Ekip sonuçları kesin yıl yerine göreli yaş olarak yazdı. Açık bölge daha eski görünüyordu. Koyu ovanın bazı kısımları daha sonra yenilenmiş olabilirdi.",
      ],
    },
    {
      title: "Gölgeyi Yükseklik Sanmamak",
      paragraphs: [
        "Toto bir kraterin sol kenarını çok yüksek gördü. Fotoğraftaki parlak bölüm gerçekten yükselti olabilirdi. Fakat Güneş açısı gölgeyi değiştirebilirdi.",
        "Aynı yer başka saatte farklı görünebilirdi. Bu yüzden tek fotoğraf yeterli değildi. Yörüngedeki araçlar yüzeyi farklı açılardan tekrar görüntülüyordu.",
        "Lazer ölçümleri yüzeyin yüksekliğini hesaplamaya yardım edebilirdi. Görüntüler doku ve parlaklık bilgisi sağlardı. Mineral ölçümleri kayaların bileşimi hakkında ipucu verirdi.",
        "Oki üç veri katmanını üst üste getirdi. Derin görünen çukur yükseklik haritasında da doğrulandı. Parlak bir çizgi ise yalnız aydınlatma etkisi çıktı.",
        "Harita hatasını bulmak ekibi sevindirdi. Yanlış olasılık utanılacak bir şey değildi. Kanıt geldikçe yorumun değişmesi bilimsel çalışmanın parçasıydı.",
        "Lili haritanın kenarına bir uyarı ekledi. Gölge, renk ve parlaklık tek başına yükseklik değildir. Her gösterge uygun ölçümle sınanmalıdır.",
      ],
    },
    {
      title: "Açık Uçlu Keşif Defteri",
      paragraphs: [
        "Ekip son haritada üç krateri adlandırmadan işaretledi. İsimleri bilmeden önce biçimlerini tarif ettiler. Böylece gözlem ile ezber birbirinden ayrıldı.",
        "Birinci kraterin keskin kenarı ve parlak ışınları vardı. İkinci krater daha yumuşak görünüyordu. Üçüncünün tabanı koyu lavla kısmen dolmuştu.",
        "Oki her açıklamanın yanına kullanılan veri katmanını ekledi. Fotoğraf, yükseklik ve mineral bilgileri aynı sonuca katkı sağlıyordu. Belirsiz yerler soru işaretiyle kaldı.",
        "Toto bütün boşlukları tamamlamak istedi. Ece bilinmeyen alanların haritada kalabileceğini söyledi. Yeni görevler bazen tam bu boşluklardan doğuyordu.",
        "Lili defteri kapatmadan son düzeltmeyi okudu. Ay yüzeyi değişmez değildi; küçük çarpmalar sürüyordu. Ancak birçok büyük iz Dünya'dakinden çok daha uzun korunuyordu.",
        "Oki haritaya artık yalnız yol tarifi gibi bakmıyordu. Harita, geçmişe ait kanıtları düzenleyen bir araçtı. Doğru soru, yüzeyde yeni bir kapı açıyordu.",
      ],
    },
  ],
  glossary: [
    { word: "krater", definition: "Bir gök cisminin yüzeyindeki çarpma kaynaklı çukurdur." },
    { word: "bazalt", definition: "Soğuyan lavdan oluşan koyu renkli volkanik kayadır." },
    { word: "maria", definition: "Ay'daki koyu bazalt düzlüklerin Latince adıdır." },
    { word: "ekzosfer", definition: "Ay'ın çevresindeki son derece seyrek gaz tabakasıdır." },
    { word: "fırlatma örtüsü", definition: "Çarpma sırasında krater çevresine savrulan kırık malzemedir." },
    { word: "göreli yaş", definition: "Bir yüzeyin diğerinden daha eski veya genç olmasıdır." },
    { word: "veri katmanı", definition: "Haritada tek bir ölçüm türünü gösteren bilgi bölümüdür." },
  ],
  optionalReflectionPrompt:
    "Bir Ay fotoğrafında gördüğün koyu alanın ne olduğunu anlamak için hangi üç kanıtı karşılaştırırdın?",
  sourceTruth,
  factualReview: {
    status: "pending-human-review",
    notes:
      "Krater oluşumu, maria, bazalt, ekzosfer, su buzu, yüzey su molekülleri, krater sayımı ve haritalama anlatımı Ay bilimi uzmanı incelemesi bekliyor.",
  },
  originalityRightsReview: {
    status: "pending-human-review",
    notes:
      "Bilimsel olgular kaynaklandırıldı; karakterler, sınıf akışı ve anlatım özgün Okurio taslağıdır. İnsan özgünlük ve hak kontrolü bekliyor.",
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
