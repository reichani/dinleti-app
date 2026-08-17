const SOURCE_TRUTH = Object.freeze({
  work: "Homeros, Odysseia",
  canonicalScope: "Odysseia'nın Truva sonrası dönüş yolculuğuna ilişkin genel çerçevesi",
  primaryText: {
    title: "Homer, Odyssey",
    edition: "A. T. Murray, Greek text and English translation, 1919",
    repository: "Perseus Digital Library",
    licenseNote: "Perseus üzerindeki açık lisanslı metin yalnızca olay ve karakter doğrulaması için kullanılır.",
  },
  turkishReference: {
    title: "Odysseia",
    translators: "Azra Erhat ve A. Kadir",
    useRestriction: "Modern Türkçe çeviri kopyalanmaz; yalnızca karşılaştırmalı doğrulamada kullanılır.",
  },
  adaptationPolicy: "Okurio metinleri özgün yeniden anlatımdır; hiçbir modern çeviriden cümle alınmaz.",
  verificationStatus: "source-reviewed",
});

const SHARED_REVIEW = Object.freeze({
  productOwnerApproved: false,
  accessibilityApproved: false,
  dyslexiaExperienceApproved: false,
  adhdExperienceApproved: false,
  socialEmotionalReviewStatus: "not-applicable",
  clinicalBoundaryChecked: true,
  copyrightChecked: true,
  sourceTruth: SOURCE_TRUTH,
  aiEditorialPreReviewStatus: "completed",
  lexiconExpertReviewStatus: "pending-human-review",
  literaryEditorReviewStatus: "pending-human-review",
  publicationGate: "expert-signoff-required",
});

export const ODYSSEY_STORIES = [
  {
    legacy: {
      id: "odysseia-01-cocuk-truvadan-ayrilis",
      baslik: "Odysseia: Eve Doğru İlk Rüzgâr",
      yazar: "Okurio Mitoloji Kütüphanesi",
      seslendiren: "Okurio Anlatıcı",
      kategori: "Mitoloji ve Keşif",
      yas: "7-10 yaş",
      renk: ["#274C77", "#A3CEF1"],
      puan: 5,
      sureDk: 3.3,
      ozet: "Odysseus, savaşın ardından eve dönmek için yola çıkarken hazırlığın, sabrın ve dayanışmanın değerini keşfeder.",
      bolumler: [
        {
          ad: "Sönen Ateşlerin Ardında",
          dk: 1,
          metin: "Truva'nın yüksek surları sabahın solgun ışığında sessiz görünüyordu. Kentin çevresindeki çadırlar on yıl sonra sökülmüştü. Savaş ateşleri de yavaş yavaş sönmüştü. Odysseus kıyıda durup denizi izledi. Önünde parlayan su ona hem eve dönüşü hem de bilinmeyen yolları hatırlatıyordu. İthaka uzaktaydı; orada eşi Penelope ve oğlu Telemakhos onu bekliyordu. Odysseus, ‘Zafer kazandık ama yolculuğumuz henüz bitmedi,’ dedi. Denizciler onun çevresinde toplandı. Hepsi evlerini özlemişti. Yine de acele etmenin tehlikeli olacağını biliyorlardı. Önce gemileri, yiyecekleri ve su kaplarını dikkatle kontrol etmeleri gerekiyordu.",
        },
        {
          ad: "İthaka'yı Hatırlamak",
          dk: 1,
          metin: "Odysseus gözlerini kapattığında İthaka'yı düşündü. Kayalık kıyıları, zeytin ağaçlarını ve evinin avlusunu hatırladı. Telemakhos'u en son küçük bir çocukken görmüştü. Şimdi ne kadar büyüdüğünü bilmiyordu. Penelope'nin sabırlı sesini anımsadı. Bu düşünceler ona güç verdi, fakat aynı zamanda sorumluluğunu da hatırlattı. Gemide yalnızca kendi hayatı yoktu. Yolculuk eden herkesin güvenliği de ona bağlıydı. Bu yüzden denizcilere görevlerini tek tek anlattı. Kimisi halatları kontrol edecekti. Kimisi kürekleri sayacaktı. Başkaları da su kaplarını sıkıca kapatacaktı. ‘Eve ulaşmak istiyorsak birbirimize dikkat etmeliyiz,’ dedi.",
        },
        {
          ad: "Küçük Çatlak",
          dk: 1,
          metin: "Genç bir denizci, yiyecek çuvallarından birinin ıslandığını fark etti. Çuvalın altındaki tahtadan ince bir su sızıntısı geliyordu. Bazıları, ‘Bir çatlaktan ne olur, hemen yola çıkalım,’ diye düşündü. Odysseus ise eğilip tahtayı inceledi. Küçük çatlak büyürse ambarı su basabilirdi. Yolculuk sırasında yiyecekler bozulur, gemi de ağırlaşırdı. Usta marangoz çağrıldı. Çatlak temizlendi, yeni bir tahta parçası yerleştirildi ve reçineyle kapatıldı. Bu iş biraz zaman aldı. Güneş yükselirken denizciler sabırsızlandı. Fakat onarım bittiğinde herkes küçük bir ayrıntının büyük bir sorunu önlediğini anladı. Odysseus, ‘Dikkat, korkmak değildir. Dikkat, yolculuğa saygı göstermektir,’ dedi.",
        },
        {
          ad: "Rüzgârı Dinlemek",
          dk: 1,
          metin: "Öğleye doğru hafif bir rüzgâr çıktı. Yelkenler hemen açılmadı. Odysseus önce gökyüzündeki bulutlara, sonra dalgaların yönüne baktı. Yaşlı dümenci de avucunu rüzgâra çevirdi. Rüzgâr kıyıdan denize doğru esiyor, fakat ara sıra yön değiştiriyordu. Bir süre beklediler. Denizciler bu sırada kürekleri yerlerine koydu ve gemiler arasındaki işaretleri tekrar etti. Tehlike gören gemi kırmızı bez kaldıracaktı. Su isteyen gemi iki kez boru çalacaktı. Herkes ne yapacağını bilince yolculuk daha güvenli olacaktı. Sonunda rüzgâr kararlı bir biçimde yelkenleri doldurdu. Odysseus başını salladı. Artık ayrılma vakti gelmişti.",
        },
        {
          ad: "İlk Yelken",
          dk: 1,
          metin: "Gemiler kıyıdan birer birer uzaklaştı. Kürekler suya aynı ritimle girip çıktı. Truva'nın kuleleri önce küçüldü, sonra sisin içinde soluk bir çizgiye dönüştü. Bazı denizciler geriye baktı; bazıları yalnızca önlerindeki ufka odaklandı. Odysseus iki duyguyu birden taşıyordu: Geride kalanların hüznü ve eve dönmenin umudu. Deniz ilk saatlerde sakindi. Martılar gemilerin çevresinde uçuyor, güneş suyun üzerinde parlak yollar çiziyordu. Genç denizci onarılan ambarı yeniden kontrol etti. İçerisi kuru kalmıştı. Gülümsedi ve arkadaşına, ‘İyi ki acele etmemişiz,’ dedi. Böylece hazırlığın değeri daha yolculuğun ilk gününde anlaşılmış oldu.",
        },
        {
          ad: "Mavi Bilmece",
          dk: 1,
          metin: "Akşam yaklaşırken kıyı gözden kayboldu. Her yönde yalnızca deniz vardı. Ufuk, gökyüzüyle suyun birleştiği ince bir çember gibi görünüyordu. Bazı denizciler bu sonsuzluk karşısında huzursuz oldu. Odysseus onların yanına gidip İthaka'yı anlattı. Küçük limanını, taş yollarını ve rüzgârlı ağaçlarını betimledi. Herkes kendi evini düşünmeye başladı. Korkuları tamamen kaybolmadı, ama ortak bir amaçları olduğunu yeniden hatırladılar. Odysseus, yolculuğun yalnızca güçlü olmakla tamamlanamayacağını biliyordu. Sabır, dikkat ve dayanışma da gerekliydi. İlk yıldız görünürken nöbetçiler yerlerini aldı. Gemiler karanlık denizde ilerledi. Eve giden yol daha yeni başlıyordu. Deniz, önlerinde çözülmeyi bekleyen mavi bir bilmeceydi.",
        },
      ],
    },
    metadata: {
      ...SHARED_REVIEW,
      ageBand: "7-10",
      estimatedMinutes: 3.3,
      pilotEligible: true,
      contentTrack: "mythology-vocabulary-growth",
      primaryDevelopmentTheme: "hopeful-beginnings-and-careful-preparation",
      contentStatus: "editorially-mature-expert-signoff-pending",
      characters: ["Odysseus", "Penelope", "Telemakhos", "Akha denizcileri"],
      glossary: [
        { word: "sur", definition: "Bir kenti korumak için çevresine yapılan yüksek ve sağlam duvardır." },
        { word: "ambar", definition: "Gemide yiyecek ve malzemelerin saklandığı bölümdür." },
        { word: "reçine", definition: "Bazı ağaçlardan çıkan ve yüzeyleri kapatmak için kullanılabilen yapışkan maddedir." },
        { word: "dümenci", definition: "Geminin yönünü dümenle belirleyen kişidir." },
        { word: "ufuk", definition: "Gökyüzüyle yerin birleşiyor gibi göründüğü uzak çizgidir." },
        { word: "dayanışma", definition: "İnsanların ortak bir amaç için birbirine destek olmasıdır." },
      ],
      optionalReflectionPrompt: "Odysseus küçük çatlağı neden önemsemiş olabilir?",
      vocabularyPlan: {
        targetLevel: "temel-zenginleşen",
        recurrence: ["ufuk", "hazırlık", "dayanışma"],
        reviewOwner: "Türkçe dil ve çocuk edebiyatı uzmanı",
      },
      reviewNotes: [
        "Olay örgüsü tek çizgide ve kısa bölümlerle sürdürüldü.",
        "Savaş ayrıntıları yaş grubuna uygun biçimde sınırlandırıldı.",
        "Her bölüm tek ana düşünce taşıyacak şekilde erişilebilirlik ön incelemesinden geçirildi.",
        "Nihai yayın, insan uzman imzasına bağlıdır.",
      ],
    },
  },
  {
    legacy: {
      id: "odysseia-01-genc-truvadan-ayrilis",
      baslik: "Odysseia: Zaferden Sonraki Belirsizlik",
      yazar: "Okurio Mitoloji Kütüphanesi",
      seslendiren: "Okurio Anlatıcı",
      kategori: "Mitoloji, Karakter ve Strateji",
      yas: "11-16 yaş",
      renk: ["#243B53", "#9FB3C8"],
      puan: 5,
      sureDk: 7,
      ozet: "Odysseus, zaferin dönüş anlamına gelmediğini fark eder; sorumluluk, hazırlık ve ortak kararlarla belirsiz denize açılır.",
      bolumler: [
        {
          ad: "Zaferin Sessizliği",
          dk: 1,
          metin: "Truva'nın düşmesinden sonraki sabah, kıyıda alışılmadık bir sessizlik vardı. Yıllarca savaşın gürültüsüne alışan askerler bu sessizlikte ne hissedeceklerini bilmiyordu. Bazıları zaferi kutluyor, bazıları kaybettikleri arkadaşlarını düşünüyordu. Odysseus, gemilerin bulunduğu koya doğru yürüdü. İthaka'ya dönme düşüncesi içini umutla doldursa da önündeki denizin zaferden daha farklı bir sınav olduğunu biliyordu. Karada düşman görünürdü; denizde ise tehlike çoğu zaman rüzgârın, akıntının ya da yanlış bir kararın içine saklanırdı. Bu yüzden dönüşü bir kaçış değil, yeni bir sorumluluk olarak gördü.",
        },
        {
          ad: "Komutanın Hesabı",
          dk: 1,
          metin: "Odysseus her geminin durumunu ayrı ayrı inceledi. Yelken bezleri güneşte açıldı, halatlar gerildi, küreklerin çatlakları arandı. Erzak listeleri yeniden sayıldı. Bazı denizciler bu denetimi gereksiz buldu; savaş bitmişti ve herkes bir an önce evine ulaşmak istiyordu. Odysseus ise acele ile cesaretin aynı şey olmadığını söyledi. Cesaret, tehlikeyi görmezden gelmek değil, onu doğru ölçmekti. Gemilerden birinde sızıntı, diğerinde eksik su kabı bulundu. Küçük kusurlar giderilirken gecikme arttı, fakat yolculuğun ilk günlerinde yaşanabilecek daha büyük sorunların önüne geçildi. Disiplin, belirsizlik karşısındaki ilk savunmalarıydı.",
        },
        {
          ad: "İthaka'nın Çağrısı",
          dk: 1,
          metin: "Hazırlık sürerken Odysseus kıyının daha sakin bir yerine çekildi. İthaka'yı yalnızca bir ada olarak düşünmüyordu. Orada ailesi, geçmişi, verdiği sözler ve yeniden üstlenmesi gereken görevler vardı. Telemakhos'u küçük yaşta bırakmıştı; şimdi karşısına nasıl bir genç çıkacağını bilmiyordu. Penelope'nin yıllar boyunca nasıl yaşadığını da ancak tahmin edebilirdi. Dönüş, kaldığı yerden devam etmek değildi. Uzun bir ayrılıktan sonra herkes değişmişti. Odysseus, eve varmanın önce bu değişimi kabul etmeyi gerektirdiğini sezdi. Bu düşünce onu hem güçlendirdi hem de huzursuz etti. Çünkü bazen insan en çok özlediği yere dönerken bile kendinden emin olamazdı.",
        },
        {
          ad: "Küçük İhmalin Bedeli",
          dk: 1,
          metin: "Öğleye doğru genç bir tayfa, erzak ambarındaki ıslaklığı fark etti. Alt tahtalardan biri çatlamıştı. Birkaç kişi, çatlağın küçük olduğunu ve ilk limanda onarılabileceğini savundu. Odysseus buna karşı çıktı. Uzun yolculuklarda sorunlar tek başına kalmaz, birbirini büyütürdü. Su yiyecekleri bozabilir, bozulan erzak denizcileri güçsüz bırakabilir, güçsüzlük de yanlış kararlara yol açabilirdi. Marangozlar tahtayı değiştirdi, reçineyle yalıttı ve ambarı yeniden düzenledi. Bu sırada Odysseus tayfalara neden beklediklerini açıkladı. Emir vermekle yetinmeyip kararının gerekçesini paylaşması, huzursuzluğu azalttı. Mürettebat, güvenin yalnızca komutana inanmak değil, kararın mantığını anlamakla da güçlendiğini gördü.",
        },
        {
          ad: "Ortak Karar",
          dk: 1,
          metin: "Akşamüstü rüzgâr kuvvetlendi. Bazı kaptanlar hemen açılmayı, bazıları ise sabahı beklemeyi önerdi. Odysseus görüşleri tek tek dinledi. Yaşlı dümenci, kıyıya yakın akıntının gece değişebileceğini söyledi. Başka bir kaptan, bulutların fırtına değil kısa süreli bir rüzgâr getirdiğini düşündü. Odysseus gökyüzünü, dalgaları ve gemilerin hazır oluşunu birlikte değerlendirdi. Sonunda gün batımından önce koydan çıkmaya, geceyi açık denize ulaşmadan korunaklı bir kıyı boyunca ilerleyerek geçirmeye karar verdi. Bu çözüm ne en hızlı ne de en yavaş seçenekti. Fakat farklı bilgileri ortak bir planda birleştiriyordu. Mürettebat kararın oluşumuna tanık olduğu için görevlerini daha dikkatli üstlendi.",
        },
        {
          ad: "Ayrılış",
          dk: 1,
          metin: "Yelkenler açıldığında kıyıda uzun gölgeler oluşmuştu. Gemiler birer birer hareket etti. Küreklerin düzenli sesi, geride kalan sessizliği böldü. Truva'nın surları uzaklaştıkça zaferin coşkusu da yerini daha karmaşık duygulara bıraktı. Denizcilerden biri geriye bakarak kaybettikleri arkadaşlarının adlarını fısıldadı. Bir başkası, evinde onu bekleyen çocuklarını anlattı. Odysseus kimseyi susturmadı. Yolculuğun yalnızca bedenleri değil, hatıraları da taşıdığını biliyordu. İnsanlar aynı gemide olsalar bile farklı yüklerle yol alıyordu. Ortak rota, bu farklılıkları yok etmiyor; onları aynı amaç çevresinde bir arada tutuyordu.",
        },
        {
          ad: "Ufukta İlk Gece",
          dk: 1,
          metin: "Gece çöktüğünde Truva artık görünmüyordu. Gökyüzündeki yıldızlar denizcilere yön gösterirken ufuk karanlık bir çember gibi gemileri çevreledi. Bazı tayfalar bilinmeyenden korktu. Odysseus nöbet düzenini yeniden kontrol etti ve herkesin dinlenebilmesi için görevleri eşit biçimde dağıttı. Sonra güvertede sessizce oturdu. Zafer, geçmişte kalan bir sonuçtu; dönüş ise her gün yeniden kurulacak bir süreçti. Bunun için yalnızca zekâ değil, sabır, dayanışma ve gerektiğinde fikrini değiştirebilme gücü gerekiyordu. İlk gecenin sonunda Odysseus şunu anladı: İthaka'ya giden yol haritada çizilebilir, fakat insanın eve gerçekten dönebilmesi için sorumluluğunu da yanında taşıması gerekirdi.",
        },
      ],
    },
    metadata: {
      ...SHARED_REVIEW,
      ageBand: "11-16",
      estimatedMinutes: 7,
      pilotEligible: false,
      contentTrack: "mythology-critical-reading",
      primaryDevelopmentTheme: "responsibility-under-uncertainty",
      contentStatus: "editorially-mature-expert-signoff-pending",
      characters: ["Odysseus", "Penelope", "Telemakhos", "Akha mürettebatı"],
      glossary: [
        { word: "ihmal", definition: "Gerekli ilgiyi veya özeni göstermeme durumudur." },
        { word: "sorumluluk", definition: "Bir görevin sonucunu üstlenme ve gereğini yapma durumudur." },
        { word: "akıntı", definition: "Deniz suyunun belirli bir yönde sürekli hareket etmesidir." },
        { word: "mürettebat", definition: "Bir gemide birlikte görev yapan insanların tümüdür." },
        { word: "gerekçe", definition: "Bir kararın veya düşüncenin dayandığı açıklanabilir nedendir." },
        { word: "dayanışma", definition: "İnsanların ortak amaç için birbirini desteklemesidir." },
      ],
      optionalReflectionPrompt: "Odysseus'un kararlarını açıklaması mürettebatın güvenini nasıl etkiledi?",
      vocabularyPlan: {
        targetLevel: "orta-ileri",
        recurrence: ["sorumluluk", "gerekçe", "dayanışma"],
        reviewOwner: "Türkçe eğitimi ve gençlik edebiyatı uzmanı",
      },
      reviewNotes: [
        "Her bölüm tek karar veya duygu ekseninde tutuldu.",
        "Soyut kavramlar somut olaylarla ilişkilendirildi.",
        "Strateji ve liderlik temaları didaktik bir tona dönüşmeden işlendi.",
        "Nihai yayın, insan uzman imzasına bağlıdır.",
      ],
    },
  },
  {
    legacy: {
      id: "odysseia-01-yetiskin-truvadan-ayrilis",
      baslik: "Odysseia: Dönüşün Başladığı Kıyı",
      yazar: "Okurio Mitoloji Kütüphanesi",
      seslendiren: "Okurio Anlatıcı",
      kategori: "Klasikler, Mitoloji ve Düşünce",
      yas: "16+ yaş",
      renk: ["#1B263B", "#778DA9"],
      puan: 5,
      sureDk: 8,
      ozet: "Zaferin küllerinden ayrılan Odysseus, eve dönüşün aidiyet, değişim, liderlik ve metanetle örülü yeni bir sınav olduğunu kavrar.",
      bolumler: [
        {
          ad: "Küllerin Ardından",
          dk: 1,
          metin: "Truva'nın üzerinde yükselen duman, şafakla birlikte ağır bir perdeye dönüşmüştü. Yıllarca erişilmez görünen surlar artık sessizdi. Zafer, uzaktan bakıldığında kesin bir sonuç gibi duruyordu; yakından ise yorgunluk, kayıp ve cevapsız sorular taşıyordu. Odysseus kıyıya inerken askerlerin yüzlerini inceledi. Bazılarında sevinç, bazılarında boşluk vardı. On yıl boyunca tek amaç etrafında yaşayan insanlar şimdi ne yapacaklarını yeniden öğrenmek zorundaydı. Savaş bitmişti, fakat savaşın insanlarda açtığı değişim sona ermemişti. Odysseus için eve dönüş, yalnızca gemileri İthaka yönüne çevirmek değildi. Önce zaferin geride bıraktığı ağırlığı tanımak gerekiyordu.",
        },
        {
          ad: "Aidiyetin Hafızası",
          dk: 1,
          metin: "Denizin karşısında durduğunda İthaka zihninde bir haritadan çok bir hafıza olarak belirdi. Kayalık kıyılar, zeytin ağaçları, sarayın avlusunda değişen ışık ve Penelope'nin sesi birbirine karıştı. Telemakhos'u küçük bir çocukken bırakmıştı. Şimdi babasını tanıyacak yaşa gelmiş olmalıydı. Odysseus, özlemin geçmişi olduğu gibi koruduğunu, hayatın ise insanları sessizce değiştirdiğini düşündü. Dönen kişi de bekleyenler de aynı kalmamıştı. Aidiyet bu nedenle yalnızca bir yere sahip olmak değil, değişmiş hâlinle o yere yeniden bağ kurabilmekti. İthaka'nın çağrısı güçlüydü; fakat bu çağrı ona aynı zamanda hesabı verilmemiş yılları ve yeniden kurulması gereken ilişkileri hatırlatıyordu.",
        },
        {
          ad: "Ferasetin Sınavı",
          dk: 1,
          metin: "Gemilerin denetimi başladığında Odysseus ayrıntılara olağanüstü bir dikkat gösterdi. Halatların liflerini, yelkenlerin dikişlerini, küreklerin dengesini ve ambarların kuruluğunu kontrol ettirdi. Mürettebatın bir bölümü bunu savaş sonrasındaki gereksiz bir titizlik sayıyordu. Oysa Odysseus, açık denizde büyük felaketlerin çoğu zaman küçük bir ihmalin çevresinde büyüdüğünü biliyordu. Feraset, yalnızca görünmeyeni sezmek değildi; sezgiyi kanıt, deneyim ve ölçüyle sınamaktı. Bir gemide bulunan ince çatlak, acele edilse fark edilmeyecekti. Tahta değiştirildiğinde yolculuk birkaç saat gecikti. Ancak bu gecikme, ileride yiyeceği, güvenliği ve insan gücünü koruyacak bir yatırıma dönüştü.",
        },
        {
          ad: "Emir ile Güven Arasında",
          dk: 1,
          metin: "Odysseus onarım kararını yalnızca buyurmadı; nedenini mürettebata açıkladı. Uzun savaş boyunca emirlerin çoğu tartışmaya kapalı olmuştu. Dönüş yolculuğu ise başka bir liderlik dili gerektiriyordu. İnsanlar yorgundu ve artık yalnızca zafer sözüyle harekete geçirilemezdi. Kararların anlamını bilmek, onlara yeniden özne olduklarını hatırlatıyordu. Odysseus farklı kaptanların görüşlerini dinledi, riskleri karşılaştırdı ve hangi belirsizliği neden kabul ettiğini anlattı. Bu yaklaşım otoritesini azaltmadı; aksine güveni kişisel bağlılıktan ortak kavrayışa taşıdı. Mürettebat, komutanın her şeyi bildiğine değil, bilmediğini de hesaba kattığına inanmaya başladı.",
        },
        {
          ad: "Rüzgârın Kararı",
          dk: 1,
          metin: "Akşamüstü rüzgâr sertleşirken gökyüzünde uzun bulut şeritleri oluştu. Kaptanlar ikiye ayrıldı. Bir kısmı uygun rüzgârı kaçırmadan açılmak istiyor, diğerleri geceyi kıyıda geçirmenin daha güvenli olduğunu savunuyordu. Odysseus tek bir işarete bakarak karar vermedi. Akıntıyı, gemilerin yükünü, mürettebatın yorgunluğunu ve korunaklı kıyıların konumunu birlikte değerlendirdi. Sonunda koydan çıkmaya, fakat açık denize yönelmeden kıyı boyunca ilerlemeye karar verdi. Bu karar kesinlik iddiası taşımıyordu; eldeki bilgilerle kurulmuş, gerektiğinde değiştirilebilecek bir plandı. Belirsizlik karşısında bilgelik, her zaman doğruyu bilmekten çok, yanılma payını yönetebilmekti.",
        },
        {
          ad: "Ayrılığın Ağırlığı",
          dk: 1,
          metin: "Gemiler hareket ettiğinde Truva kıyısında uzun gölgeler kaldı. Küreklerin düzenli sesi, savaşın düzensiz gürültüsünden bütünüyle farklıydı. Denizcilerden bazıları geriye bakıyor, bazıları bakmamayı seçiyordu. Her biri yanında görünmeyen bir yük taşıyordu: kaybettikleri insanlar, verdikleri kararlar, söyleyemedikleri sözler. Odysseus bu sessizliği bozmadı. Bir topluluğu yönetmenin her duyguyu çözmek anlamına gelmediğini biliyordu. Bazen yapılabilecek en doğru şey, insanların yüklerini inkâr etmeden ortak yönü korumaktı. İthaka onların aynı hedefiydi; fakat herkes o hedefe farklı bir geçmişten geliyordu. Ortak rota, kişisel acıları silmiyor, yalnızca onlara hareket edebilecekleri bir çerçeve veriyordu.",
        },
        {
          ad: "Dönüşün Çelişkisi",
          dk: 1,
          metin: "Kıyı küçüldükçe Odysseus, dönüş fikrinin içinde taşıdığı çelişkiyi daha açık gördü. İnsan eve dönmek ister, çünkü orada kendisine ait bir düzen bulunduğuna inanır. Fakat uzun ayrılıklar hem evi hem de insanı değiştirir. Bu yüzden dönüş, geçmişe geri gitmek değil, geçmişle bugünün arasında yeni bir ilişki kurmaktır. Odysseus İthaka'da kendisini nasıl bir düzenin beklediğini bilmiyordu. Kral olarak sorumlulukları, eş ve baba olarak eksikleri vardı. Zafer ona bu soruların hiçbirini cevaplamamıştı. Deniz yolculuğu, dışarıdaki engeller kadar içerideki belirsizliklerle de yüzleşeceği bir alan olacaktı.",
        },
        {
          ad: "İlk Gece ve Metanet",
          dk: 1,
          metin: "Gece çöktüğünde yıldızlar açık denizin üzerinde keskinleşti. Nöbetçiler yerlerini aldı, yorgun denizciler dar güvertelerde uyumaya çalıştı. Odysseus uyumadan önce gemilerin sırasını, rüzgârın değişimini ve ertesi günün rotasını yeniden düşündü. Akıl, olasılıkları tartmasına yardım ediyordu; fakat her şeyi kontrol edemeyeceğini de biliyordu. Metanet, kontrol edilemeyen karşısında katılaşmak değil, kırılmadan uyum sağlayabilmekti. İlk gece sakin geçti. Yine de Odysseus bunun geleceğe ilişkin bir güvence olmadığını biliyordu. Ufuk hem vaat hem tehdit taşıyordu. Eve dönüş başlamıştı; fakat yolun onu hangi kıyılara, hangi kayıplara ve hangi hakikatlere götüreceği henüz bilinmiyordu.",
        },
      ],
    },
    metadata: {
      ...SHARED_REVIEW,
      ageBand: "16+",
      estimatedMinutes: 8,
      pilotEligible: false,
      contentTrack: "classics-literary-development",
      primaryDevelopmentTheme: "identity-belonging-and-resilient-return",
      contentStatus: "editorially-mature-expert-signoff-pending",
      characters: ["Odysseus", "Penelope", "Telemakhos", "Akha mürettebatı"],
      glossary: [
        { word: "aidiyet", definition: "Bir yere, topluluğa veya ilişkiye bağlılık ve kendini onun parçası sayma durumudur." },
        { word: "feraset", definition: "Olayların görünmeyen yönlerini sezgi, deneyim ve değerlendirmeyle kavrama gücüdür." },
        { word: "otorite", definition: "Karar verme, yönlendirme veya yönetme yetkisidir." },
        { word: "özne", definition: "Kendi kararlarını verebilen ve eylemlerinin sorumluluğunu taşıyan kişidir." },
        { word: "çelişki", definition: "Birbirine karşıt görünen düşünce veya durumların aynı anda bulunmasıdır." },
        { word: "metanet", definition: "Zorluklar karşısında dayanıklı, dengeli ve sakin kalabilme gücüdür." },
      ],
      optionalReflectionPrompt: "Metin, eve dönüşü neden geçmişe geri dönmekten farklı görüyor?",
      vocabularyPlan: {
        targetLevel: "ileri-edebi",
        recurrence: ["aidiyet", "feraset", "metanet"],
        reviewOwner: "Türk dili, sözlükbilim ve edebiyat uzmanı",
      },
      reviewNotes: [
        "Edebî yoğunluk kısa ve odaklı ekran bölümleri içinde dengelendi.",
        "Soyut temalar somut liderlik ve yolculuk kararları üzerinden geliştirildi.",
        "Modern Türkçe çevirilere özgü cümle kuruluşları kullanılmadı.",
        "Nihai yayın, sözlükbilimci ve edebiyat editörü imzasına bağlıdır.",
      ],
    },
  },
];

const ODYSSEY_SECTION_EXPANSIONS = {
  "odysseia-01-genc-truvadan-ayrilis": [
    "Kıyıda kalan sessizlik herkesi aynı biçimde etkilemedi. Bir tayfa arkadaşının adını küçük defterine yazdı. Başka biri eve götüreceği kemeri avucunda tuttu. Odysseus bu farklı vedaları uzaktan izledi. Zaferin ortak, yasın ise kişisel olduğunu anladı. Yeni yolculuk iki gerçeği birlikte taşıyacaktı.",
    "Denetim sırasında görevler yalnız rütbeye göre dağıtılmadı. Deneyimli denizciler genç tayfalara yöntemlerini gösterdi. Her kontrol ikinci bir kişi tarafından tekrarlandı. Bu düzen hata aramayı suçlama olmaktan çıkardı. Amaç birini yakalamak değil, gemileri korumaktı. Hazırlık böylece ortak bir öğrenme sürecine dönüştü.",
    "Odysseus anılarının eksik olabileceğini de düşündü. Özlem, geçmişin sert kenarlarını zamanla yumuşatabiliyordu. İthaka zihnindeki kadar sakin olmayabilirdi. Telemakhos kendi kararlarını veren bir genç olmuştu. Penelope de yılların yükünü tek başına taşımıştı. Dönüş, onları yeniden dinlemeyi gerektirecekti.",
    "Onarım tamamlanınca genç tayfa çatlağın çevresini yeniden yokladı. Reçinenin kenarında küçük bir boşluk daha buldu. Marangoz bu dikkati açıkça takdir etti. Tayfa, ilk uyarısının önemsendiğini gördü. Böylece sonraki sorunları söylemekten çekinmeyecekti. Güven, duyulan küçük bir sesle büyümüştü.",
    "Plan bütün kaptanlara açık işaretlerle anlatıldı. Öndeki gemi hız değişimini bayrakla bildirecekti. Arkadaki gemiler belirlenen aralığı koruyacaktı. Rüzgâr sertleşirse filo korunaklı koya dönecekti. Herkes geri dönüş koşulunu önceden biliyordu. Bu açıklık, değişikliği başarısızlık gibi göstermeyecekti.",
    "İlk kürek ritmi kurulurken bir gemi geride kaldı. Odysseus öndekilere yavaşlama işareti verdi. Geciken geminin halatı yeniden bağlandı. Kimse onu geride bırakmayı önermedi. Filo ancak bütün gemiler hazır olunca hızlandı. Ortak amaç, en hızlı olanı izlemek değildi.",
    "Nöbetçiler yalnız yıldızlara güvenmedi. Rüzgârı, dalgayı ve diğer gemilerin ışıklarını izlediler. Gördüklerini kısa aralıklarla birbirlerine aktardılar. Bir işaret tek başına kesin sayılmadı. Gece, dikkatli karşılaştırmalarla daha anlaşılır oldu. Odysseus ortak bilginin korkuyu azalttığını gördü.",
  ],
  "odysseia-01-yetiskin-truvadan-ayrilis": [
    "Kıyıda sökülen çadırlar geçici bir düzenin bittiğini gösteriyordu. Fakat biten düzen hemen yeni bir anlam üretmiyordu. Askerler yıllarca düşmana göre tanımlanan roller taşımıştı. Şimdi kendilerini savaşın dışında yeniden düşünmeleri gerekiyordu. Bazıları bu boşluğu sevinçle karşıladı. Bazıları ise yönünü kaybetmiş gibi sessizleşti. Odysseus, zafer anlatısının bu ayrımları örtebileceğini fark etti. Bu nedenle konuşmalarında kolay bir coşku kurmadı. Kayıpları küçültmeden yolculuğa hazırlanmayı seçti. Yeni başlangıç, geçmişi inkâr ederek kurulamazdı.",
    "İthaka'ya ilişkin anıları birbirinden farklı zamanlara aitti. Bazı görüntüler savaş öncesinin güvenini taşıyordu. Bazıları ayrılık sabahının keskin hüznünü saklıyordu. Odysseus, hafızanın tarafsız bir kayıt olmadığını biliyordu. İnsan özlediği yeri yeniden kurarak hatırlardı. Bu kurgu bazen dayanma gücü verirdi. Bazen de dönüşte karşılaşılacak değişimi görünmez kılardı. Penelope'nin bekleyişini kendi özlemiyle ölçemezdi. Telemakhos'un büyümesini de uzaktan sahiplenemezdi. Aidiyet, başkalarının değişimine yer açmayı gerektiriyordu.",
    "Denetim listeleri deneyimli denizcilerin bilgisiyle yeniden düzenlendi. Her gemi aynı zayıflıkları taşımıyordu. Yaşı, yükü ve önceki hasarı farklıydı. Bu nedenle tek bir kontrol sırası yeterli değildi. Odysseus ortak ölçütlerle yerel bilgiyi birlikte kullandı. Marangozlar tahtaları seslerinden ayırt edebiliyordu. Dümenciler kürek dengesindeki küçük farkları hissediyordu. Kayıtlar bu deneyimi görünür hâle getirdi. Feraset böylece kişisel sezginin ötesine geçti. Paylaşılan yöntem, filonun ortak hafızasına dönüştü.",
    "Kararın gerekçesi açıklandığında herkes aynı fikirde olmadı. Yine de itirazlar düzensizlik sayılmadı. Bir kaptan gecikmenin hava riskini artıracağını söyledi. Başka biri eksik onarımın daha büyük risk taşıdığını savundu. Odysseus iki kaygıyı da kayda geçirdi. Son kararı verirken hangi riski seçtiğini belirtti. Bu açıklama kesinlik görüntüsü yaratmadı. Tersine, sorumluluğun nerede bulunduğunu görünür kıldı. Güven yalnız doğru sonuçtan doğmuyordu. Dürüst karar süreci de güven üretiyordu.",
    "Kıyı rotası seçilirken geri dönüş noktaları belirlendi. Her nokta rüzgâr ve görüş koşuluna bağlandı. Böylece plan değişikliği önceden düşünülmüş oldu. Odysseus, katı planların güven verdiğini biliyordu. Fakat değişen denizde katılık tehlike yaratabilirdi. Esneklik ise kuralsızlık anlamına gelmiyordu. Hangi koşulda neyin değişeceği açıkça yazılmıştı. Nöbetçiler bu sınırları birlikte takip edecekti. Bilgelik, belirsizliği ortadan kaldıramazdı. Ancak belirsizlik içinde daha iyi hareket sağlayabilirdi.",
    "Ayrılık sırasında bazı denizciler küçük törenler yaptı. Biri denize bir çiçek bıraktı. Bir başkası kaybettiği kardeşinin adını söyledi. Bu davranışlar resmi bir emirden doğmamıştı. Yine de ortak sessizlik içinde kendilerine yer buldu. Odysseus törenleri hızlandırmaya çalışmadı. Zaman kaybı gibi görünen dakikalar önemliydi. İnsanlar geride bıraktıklarıyla bağlarını tanıyordu. Ardından küreklerine daha sakin döndüler. Hareket etmek, unutmak zorunda olmak değildi.",
    "Odysseus dönüşteki otoritesini de sorguladı. On yıl önce bıraktığı unvan değişmemiş olabilirdi. Fakat unvan, ilişkilerin aynı kaldığını kanıtlamazdı. İthaka halkı onsuz karar vermeyi öğrenmişti. Penelope sarayın yükünü taşımıştı. Telemakhos kendi düşüncelerini geliştirmişti. Dönüş, eski düzeni zorla canlandırmak olmamalıydı. Önce yeni gerçekliği anlaması gerekecekti. Kral olmak, yalnız yerini geri almak değildi. Değişen topluma karşı yeniden sorumluluk üstlenmekti.",
    "Gece ilerledikçe gemilerin ışıkları karanlıkta sıralandı. Her ışık başka bir topluluğun varlığını gösteriyordu. Odysseus filoyu tek beden gibi düşünmedi. Gemilerin farklı ihtiyaçları ve sınırları vardı. Yine de ortak işaretler onları birbirine bağlıyordu. Metanet bu bağın içinde somutlaştı. Bir gemi yavaşladığında diğerleri hızını ayarladı. Bir nöbetçi kuşku duyduğunda işareti paylaştı. Dayanıklılık yalnız bireysel iradeden doğmuyordu. Uyum sağlayan ilişkiler de filoyu ayakta tutuyordu.",
  ],
};

const ODYSSEY_DEPTH_EXPANSIONS = {
  "odysseia-01-genc-truvadan-ayrilis": [
    "Kimse tek bir duygu göstermeye zorlanmadı. Sessizlik de geçerli bir vedaydı. Herkes kendi vedisine yeterli zamanı ayırabildi.",
    "Genç tayfalar öğrendiklerini kendi sözcükleriyle tekrar anlattı. Böylece yöntem ortaklaştı.",
    "Odysseus, cevap vermeden önce ailesinin deneyimini dinlemeye karar verdi. Özlem yetmezdi.",
    "Küçük uyarıların erken paylaşılması artık geminin açık bir kuralıydı. Kimse küçümsenmeyecekti.",
    "Kaptanlar planı kendi ekiplerine yeniden anlattı. Anlaşılmayan noktalar kıyıda açıklığa kavuştu.",
    "Geciken geminin ekibi filoya ışıkla teşekkür etti. Karşılık olarak diğer ışıklar parladı.",
    "İlk gece böylece yalnız korkuyla tanımlanmadı. İşbirliği de karanlıkta görünür oldu.",
  ],
  "odysseia-01-yetiskin-truvadan-ayrilis": [
    "Odysseus askerlerin evlerine hangi hikâyeyi taşıyacağını düşündü. Zafer sözcüğü her deneyimi tek renge boyayabilirdi. Oysa geride kalan yıllar birçok anlam taşıyordu. Bazı kararlar hâlâ sorgulanmayı bekliyordu. Bazı kayıpların açıklaması hiç bulunamayacaktı. Dönüş yolunda bu belirsizliklere yer açmak istedi. Liderlik, ortak hafızayı tek başına yazma yetkisi değildi. Başkalarının anlatılarını da koruma sorumluluğuydu.",
    "Kendisi de anılarında seçici davranıyor olabilirdi. İthaka'nın güzel ayrıntıları zihninde daha parlak kalmıştı. Zor anlaşmazlıklar ise zamanla silikleşmişti. Bu farkındalık özlemini değersiz kılmadı. Yalnız ona daha ölçülü yaklaşmasını sağladı. Döneceği yer, hatırasının kusursuz kopyası olmayacaktı. Yeni bağlar ancak gerçek karşılaşmalarla kurulabilirdi. Bunun için sabır ve dinleme gerekecekti.",
    "Her geminin kontrol sonucu kil tabletlere işlendi. Onarımlar tamamlandıkça kayıtlar ikinci kez karşılaştırıldı. Böylece sözlü bilgi kaybolmadan sonraki nöbete aktarılabildi. Odysseus kayıtların kusursuz olmadığını özellikle belirtti. Bir işaret unutulabilir veya yanlış okunabilirdi. Bu yüzden kayıt ile gözlem birlikte kullanılacaktı. Sistem, insan dikkatinin yerine geçmeyecekti. Dikkati daha tutarlı hâle getirecekti.",
    "Mürettebat açıklama isteyebileceğini zamanla fark etti. Bu hak, komutanın sorumluluğunu daha görünür yaptı. Odysseus her soruya hemen cevap vermedi. Bilmediği noktaları açıkça ayırdı. Sonra deneyimli kişilerden görüş topladı. Bu tutum kararsızlık olarak görülmedi. Çünkü karar zamanı ve sınırı belliydi. Açıklık, otoriteyle düşünmeyi yan yana getirdi.",
    "Rüzgârın yönü gece içinde yeniden değişebilirdi. Bu nedenle nöbetçiler yalnız mevcut havayı kaydetmedi. Değişimin hızını da izledi. Dalgaların aralığı düzenli biçimde karşılaştırıldı. Uzak bulutlar her nöbette yeniden çizildi. Küçük değişimler üst üste gelirse rota gözden geçirilecekti. Plan, yaşayan bir belge gibi kullanılacaktı. Deniz sabit olmadığı için karar da donmayacaktı.",
    "Törenlerden sonra güvertede daha derin bir sessizlik oluştu. Bu sessizlik önceki boşluktan farklıydı. Söylenmesi gereken bazı adlar söylenmişti. Paylaşılan yas insanları aynılaştırmadı. Yalnız birbirlerinin yükünü görmelerini sağladı. Bir tayfa arkadaşının küreğini bir süre taşıdı. Başka biri nöbet sırasını gönüllü değiştirdi. Hatırlamak böylece küçük dayanışmalara dönüştü.",
    "Odysseus kendi yokluğunun sonuçlarını kabul etmek zorundaydı. İyi niyet, yılların açtığı mesafeyi kapatmayabilirdi. Döndüğünde hemen anlaşılmayı beklememeliydi. Önce başkalarının kurduğu düzeni görmeliydi. Sonra kendi yerini yeniden müzakere etmeliydi. Bu düşünce gururunu rahatsız etti. Yine de onu daha gerçekçi kıldı. Aidiyet, talep kadar karşılıklılık da gerektiriyordu.",
    "Gece nöbeti değişirken kısa bir toplantı yapıldı. İlk saatlerin gözlemleri yeni ekibe aktarıldı. Hiçbir olağandışı durum saklanmadı. Küçük tereddütler bile kayda geçirildi. Böylece yeni nöbet aynı soruları baştan kurmadı. Topluluk, birbirinin dikkatini devraldı. Metanet kesintisiz güç göstermek değildi. Yükü zamanında başkasına bırakabilmekti.",
  ],
};

const ODYSSEY_EDITORIAL_LANGUAGE_PROFILES = {
  "odysseia-01-cocuk-truvadan-ayrilis": {
    idioms: [],
    proverbs: [],
    culturalObjects: [
      { name: "ambar", context: "Gemide yiyeceklerin korunduğu bölüm olarak olayın neden-sonuç zincirini kurar.", ageFit: "Somut işlevi metin içinde açıklanır ve 8–10 yaş okuruna uygundur." },
      { name: "reçine", context: "Ahşap çatlağın onarımında kullanılan doğal malzemedir.", ageFit: "Nesne, eylem ve sonuç birlikte verildiği için bağlamdan anlaşılır." },
    ],
  },
  "odysseia-01-genc-truvadan-ayrilis": {
    idioms: [
      { expression: "farklı yüklerle", meaning: "Kişilerin görünmeyen duygu ve anılarla yol aldığını anlatan mecazdır.", ageFit: "Soyut anlam, hemen ardından kayıplar ve sözlerle somutlaştırılır." },
    ],
    proverbs: [],
    culturalObjects: [
      { name: "reçine", context: "Gemi ambarındaki çatlağın yalıtılmasında kullanılır.", ageFit: "Teknik kullanım olay örgüsüne bağlı ve anlaşılırdır." },
    ],
  },
  "odysseia-01-yetiskin-truvadan-ayrilis": {
    idioms: [
      { expression: "yük taşıyordu", meaning: "Savaşın bıraktığı kişisel ve toplumsal sonuçları anlatan mecazdır.", ageFit: "Soyut etik değerlendirme 16–18 yaş okuma düzeyine uygundur." },
    ],
    proverbs: [],
    culturalObjects: [
      { name: "kil tabletlere", context: "Gemi denetimlerinin aktarılabilir kayda dönüşmesini gösterir.", ageFit: "Tarihsel unsur, bilgi sürekliliği ve sorumluluk temasıyla ilişkilidir." },
      { name: "zeytin ağaçları", context: "İthaka'nın coğrafi ve kültürel belleğini somutlaştırır.", ageFit: "Mekân ve aidiyet temasına doğal biçimde bağlanır." },
    ],
  },
};

for (const story of ODYSSEY_STORIES) {
  story.metadata.editorialLanguageProfile = ODYSSEY_EDITORIAL_LANGUAGE_PROFILES[story.legacy.id];
  const expansions = ODYSSEY_SECTION_EXPANSIONS[story.legacy.id];
  if (!expansions) continue;
  story.legacy.bolumler.forEach((section, index) => {
    const depth = ODYSSEY_DEPTH_EXPANSIONS[story.legacy.id]?.[index] ?? "";
    section.metin = `${section.metin}\n\n${expansions[index]}${depth ? `\n\n${depth}` : ""}`;
  });
  const totalWords = story.legacy.bolumler.reduce((sum, section) => {
    const words = section.metin.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
    return sum + words;
  }, 0);
  const estimatedMinutes = Number((totalWords / 155).toFixed(1));
  story.legacy.sureDk = estimatedMinutes;
  story.metadata.estimatedMinutes = estimatedMinutes;
}

const ODYSSEY_READABILITY_REVISIONS = new Map([
  ["İthaka'ya dönme düşüncesi içini umutla doldursa da önündeki denizin zaferden daha farklı bir sınav olduğunu biliyordu.", "İthaka'ya dönme düşüncesi içini umutla dolduruyordu. Fakat denizin farklı bir sınav olduğunu biliyordu."],
  ["Karada düşman görünürdü; denizde ise tehlike çoğu zaman rüzgârın, akıntının ya da yanlış bir kararın içine saklanırdı.", "Karada düşman görünürdü. Denizdeki tehlike ise rüzgâra, akıntıya veya kararlara saklanırdı."],
  ["Bazı denizciler bu denetimi gereksiz buldu; savaş bitmişti ve herkes bir an önce evine ulaşmak istiyordu.", "Bazı denizciler bu denetimi gereksiz buldu. Savaş bitmişti ve herkes evine ulaşmak istiyordu."],
  ["Küçük kusurlar giderilirken gecikme arttı, fakat yolculuğun ilk günlerinde yaşanabilecek daha büyük sorunların önüne geçildi.", "Küçük kusurlar giderilirken gecikme arttı. Fakat daha büyük sorunların önüne geçildi."],
  ["Su yiyecekleri bozabilir, bozulan erzak denizcileri güçsüz bırakabilir, güçsüzlük de yanlış kararlara yol açabilirdi.", "Su yiyecekleri bozabilirdi. Bozulan erzak denizcileri güçsüz bırakabilirdi. Güçsüzlük de yanlış kararlara yol açabilirdi."],
  ["Sonunda gün batımından önce koydan çıkmaya, geceyi açık denize ulaşmadan korunaklı bir kıyı boyunca ilerleyerek geçirmeye karar verdi.", "Sonunda gün batımından önce koydan çıkmaya karar verdi. Geceyi korunaklı kıyı boyunca ilerleyerek geçireceklerdi."],
  ["Ortak rota, bu farklılıkları yok etmiyor; onları aynı amaç çevresinde bir arada tutuyordu.", "Ortak rota bu farklılıkları yok etmiyordu. Onları aynı amaç çevresinde tutuyordu."],
  ["Odysseus nöbet düzenini yeniden kontrol etti ve herkesin dinlenebilmesi için görevleri eşit biçimde dağıttı.", "Odysseus nöbet düzenini yeniden kontrol etti. Görevleri herkes dinlenebilsin diye eşit dağıttı."],
  ["Zafer, geçmişte kalan bir sonuçtu; dönüş ise her gün yeniden kurulacak bir süreçti.", "Zafer geçmişte kalan bir sonuçtu. Dönüş ise her gün yeniden kurulacaktı."],
  ["Bunun için yalnızca zekâ değil, sabır, dayanışma ve gerektiğinde fikrini değiştirebilme gücü gerekiyordu.", "Bunun için zekâ, sabır ve dayanışma gerekiyordu. Gerektiğinde fikir değiştirmek de önemliydi."],
  ["İlk gecenin sonunda Odysseus şunu anladı: İthaka'ya giden yol haritada çizilebilir, fakat insanın eve gerçekten dönebilmesi için sorumluluğunu da yanında taşıması gerekirdi.", "İlk gecenin sonunda Odysseus önemli bir şey anladı. İthaka'ya giden yol haritada çizilebilirdi. Gerçek dönüş ise sorumluluğu yanında taşımayı gerektiriyordu."],
  ["Zafer, uzaktan bakıldığında kesin bir sonuç gibi duruyordu; yakından ise yorgunluk, kayıp ve cevapsız sorular taşıyordu.", "Zafer uzaktan kesin bir sonuç gibi duruyordu. Yakından yorgunluk, kayıp ve cevapsız sorular taşıyordu."],
  ["On yıl boyunca tek amaç etrafında yaşayan insanlar şimdi ne yapacaklarını yeniden öğrenmek zorundaydı.", "İnsanlar on yıl boyunca tek bir amaçla yaşamıştı. Şimdi yönlerini yeniden öğrenmeleri gerekiyordu."],
  ["Kayalık kıyılar, zeytin ağaçları, sarayın avlusunda değişen ışık ve Penelope'nin sesi birbirine karıştı.", "Kayalık kıyılar ve zeytin ağaçları zihninde canlandı. Avlunun ışığı Penelope'nin sesine karıştı."],
  ["Aidiyet bu nedenle yalnızca bir yere sahip olmak değil, değişmiş hâlinle o yere yeniden bağ kurabilmekti.", "Aidiyet yalnızca bir yere sahip olmak değildi. Değişmiş hâlinle yeniden bağ kurabilmekti."],
  ["İthaka'nın çağrısı güçlüydü; fakat bu çağrı ona aynı zamanda hesabı verilmemiş yılları ve yeniden kurulması gereken ilişkileri hatırlatıyordu.", "İthaka'nın çağrısı güçlüydü. Fakat geçen yıllar henüz açıklanmamıştı. İlişkilerin de yeniden kurulması gerekiyordu."],
  ["Oysa Odysseus, açık denizde büyük felaketlerin çoğu zaman küçük bir ihmalin çevresinde büyüdüğünü biliyordu.", "Odysseus açık denizdeki riskleri biliyordu. Büyük felaketler küçük bir ihmalin çevresinde büyüyebilirdi."],
  ["Ancak bu gecikme, ileride yiyeceği, güvenliği ve insan gücünü koruyacak bir yatırıma dönüştü.", "Ancak bu gecikme önemli bir yatırıma dönüştü. Yiyeceği, güvenliği ve insan gücünü koruyacaktı."],
  ["Odysseus farklı kaptanların görüşlerini dinledi, riskleri karşılaştırdı ve hangi belirsizliği neden kabul ettiğini anlattı.", "Odysseus farklı kaptanların görüşlerini dinledi. Riskleri karşılaştırdı ve kabul ettiği belirsizliği açıkladı."],
  ["Bir kısmı uygun rüzgârı kaçırmadan açılmak istiyor, diğerleri geceyi kıyıda geçirmenin daha güvenli olduğunu savunuyordu.", "Bazıları uygun rüzgârla hemen açılmak istiyordu. Diğerleri geceyi kıyıda geçirmeyi daha güvenli buluyordu."],
  ["Her biri yanında görünmeyen bir yük taşıyordu: kaybettikleri insanlar, verdikleri kararlar, söyleyemedikleri sözler.", "Her biri görünmeyen bir yük taşıyordu. Kayıpları, kararları ve söylenmemiş sözleri vardı."],
  ["Bu yüzden dönüş, geçmişe geri gitmek değil, geçmişle bugünün arasında yeni bir ilişki kurmaktır.", "Bu yüzden dönüş geçmişe geri gitmek değildi. Geçmişle bugün arasında yeni ilişki kurmaktı."],
  ["Odysseus uyumadan önce gemilerin sırasını, rüzgârın değişimini ve ertesi günün rotasını yeniden düşündü.", "Odysseus uyumadan önce gemilerin sırasını düşündü. Rüzgârı ve ertesi günün rotasını yeniden değerlendirdi."],
  ["Eve dönüş başlamıştı; fakat yolun onu hangi kıyılara, hangi kayıplara ve hangi hakikatlere götüreceği henüz bilinmiyordu.", "Eve dönüş başlamıştı. Fakat yolun getireceği kıyılar ve kayıplar bilinmiyordu. Hakikatler de henüz uzaktaydı."],
]);

for (const story of ODYSSEY_STORIES) {
  story.legacy.bolumler.forEach((section) => {
    for (const [before, after] of ODYSSEY_READABILITY_REVISIONS) {
      section.metin = section.metin.replace(before, after);
    }
  });
  const revisedWordCount = story.legacy.bolumler.reduce((sum, section) =>
    sum + (section.metin.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0), 0);
  const revisedMinutes = Number((revisedWordCount / 155).toFixed(1));
  story.legacy.sureDk = revisedMinutes;
  story.metadata.estimatedMinutes = revisedMinutes;
}
