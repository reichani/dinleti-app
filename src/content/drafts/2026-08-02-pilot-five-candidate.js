export const REVIEW_STATUS = Object.freeze({
  PENDING: "pending",
  APPROVED: "approved",
  CHANGES_REQUESTED: "changes_requested",
  REJECTED: "rejected",
});

const pendingContentQualityReview = () => ({
  status: REVIEW_STATUS.PENDING,
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
});

const pendingRoleReview = () => ({
  status: REVIEW_STATUS.PENDING,
  reviewerName: "",
  reviewedAt: "",
  reviewNotes: "",
});

const pendingExperienceCouncilReview = () => ({
  contentProductOwner: pendingRoleReview(),
  accessibilityProductOwner: pendingRoleReview(),
  dyslexiaExperienceLead: pendingRoleReview(),
  adhdExperienceLead: pendingRoleReview(),
  socialEmotionalReadingLead: pendingRoleReview(),
});

const paragraphs = (parts, ...values) => {
  const text = String.raw({ raw: parts }, ...values).trim();
  const sourceSentences = (text.match(/[^.!?]+[.!?]+|[^.!?]+$/gu) ?? [])
    .map((sentence) => sentence.trim().replace(/[.!?]+$/u, ""));
  const sentences = sourceSentences.reduce((merged, sentence) => {
    const words = (value) => value.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
    const previous = merged.at(-1);
    merged.push(sentence);
    return merged;
  }, []).map((sentence) => `${sentence}.`);
  return sentences
    .reduce((groups, sentence, index) => {
      const groupIndex = Math.floor(index / 3);
      groups[groupIndex] = [...(groups[groupIndex] ?? []), sentence];
      return groups;
    }, [])
    .map((group) => group.join(" "))
    .join("\n\n");
};

export const PILOT_STORIES = [
  {
    legacy: {
      id: "or-01-oki-a-sesini-buluyor",
      baslik: "Oki A Sesini Buluyor",
      yazar: "Okurio Özgün Hikâyeler",
      seslendiren: "Okurio Anlatıcı",
      kategori: "İlk Okuma",
      yas: "6-7 yaş",
      renk: ["#6A4A1F", "#E0A64B"],
      puan: 5,
      sureDk: 2.03,
      ozet: "Oki, bahçedeki ipuçlarını izleyerek a sesini sözcüklerde bulur.",
      bolumler: [
        {
          ad: "Açılan Bahçe Kapısı",
          dk: 1,
          metin: paragraphs`Oki sabah Ses Bahçesi'ne geldiğinde kapıda büyük bir a vardı. Parlayan altın yaprağa dikkatle baktı. Nana, bugünün sesini bulacaklarını söyledi.

Oki ağzını rahatça açarak A sesini yavaşça söyledi. Ses kısa başlayıp sonra uzadı. Bahçedeki küçük çan hafifçe sallandı. Oki ilk ipucunu böyle aldı. Bu başlangıç Oki'nin merakını daha güçlü ve canlı tuttu.`,
        },
        {
          ad: "Ağacın Altındaki Kartlar",
          dk: 1,
          metin: paragraphs`İlk yol, altında üç kart duran büyük ağaca gidiyordu. Kartlarda arı, elma ve top vardı. Oki her resmi sırayla adlandırdı. Arı sözcüğü a sesiyle başladı.

Elma sözcüğünde a sesi sondayken top sözcüğünde yoktu. Oki kartları iki ayrı sıraya koydu. Lili seçimin nedenini dikkatle dinledi. Sonra arı kartını birlikte gösterdiler. İki arkadaş her kartın sesini yeniden dikkatle karşılaştırdı.`,
        },
        {
          ad: "Rüzgârın Getirdiği Sözcükler",
          dk: 1,
          metin: paragraphs`Hafif rüzgâr kartları uçurunca Oki onları çitin yanında yakaladı. Birinde at, birinde ay yazıyordu. Son kartta ev sözcüğü vardı. Oki harfleri parmağıyla izleyerek sesleri aradı.

At ve ay aynı sesle başlıyordu. Ev başka bir sesle başlıyordu. Oki iki doğru kartı sepete bıraktı. Fakat ay kartı yeniden uçtu. Lili kartı taşın yanında buldu. Buldukları her sözcük sonraki ipucunu biraz daha kolaylaştırdı.`,
        },
        {
          ad: "Eksik Harfin Yeri",
          dk: 1,
          metin: paragraphs`Taşın altında yarım bir sözcük vardı. Kartta yalnızca _raba yazıyordu. Oki boşluğu incelerken araba resminde cevabı buldu. Baştaki boşluğa a harfi gelmeliydi.

Oki harfi yerine koyup sözcüğü önce parçalara ayırdı. Sonra bütün sözcüğü yeniden okudu. Araba sözcüğündeki iki a sesini duydu. Bu buluş onu çok sevindirdi. Artık boşlukların da önemli bir ipucu taşıdığını biliyordu.`,
        },
        {
          ad: "Ses Sepetinin Sonu",
          dk: 1,
          metin: paragraphs`Bahçenin sonunda boş bir sepet bekliyordu. Oki bulduğu kartları sırayla içine dikkatle yerleştirdi. Arı, at, ay ve araba oradaydı. Her sözcükte a sesini yeniden aradı. Ses bazen başta duyuluyordu.

Bazen sözcüğün ortasında veya sonunda kalıyordu. Oki artık yalnız ilk harfe bakmıyordu. Sözcüğü dikkatle dinliyor, sonra kendi kararını veriyordu. Nana bütün kartları masaya yaydı. Oki sevdiği kart olarak arabayı seçti.

Lili de ay kartını seçti. İkisi a sesini birlikte söyledi. Bahçe kapısı yeniden parladı. Oki aradığı sesi sonunda bulmuştu. Yeni sözcüklerde aynı sesi aramaya devam etmek istiyordu.`,
        },
      ],
    },
    metadata: {
      ageBand: "6-7",
      estimatedMinutes: 2.03,
      pilotEligible: true,
      contentTrack: "early-reading",
      primaryDevelopmentTheme: "sound-awareness",
      contentStatus: "content-quality-review",
      characters: ["Oki", "Lili", "Nana"],
      glossary: [
        { word: "ipucu", definition: "Bir şeyi bulmaya yardım eden işarettir." },
        { word: "adlandırmak", definition: "Bir şeyin adını söylemektir." },
        { word: "sıra", definition: "Şeylerin yan yana dizilişidir." },
        { word: "boşluk", definition: "Bir şeyin eksik bırakıldığı yerdir." },
      ],
      optionalReflectionPrompt: "Sen a sesini hangi sözcükte duydun?",
      reflectionIsOptional: true,
      reflectionIsScored: false,
      sourceType: "original",
      factualReviewStatus: "pending-human-review",
      originalityRightsReviewStatus: "pending-human-review",
      contentQualityReview: pendingContentQualityReview(),
      experienceCouncilReview: pendingExperienceCouncilReview(),
      structuralValid: true,
      releaseReady: false,
    },
  },
  {
    legacy: {
      id: "of-01-sessiz-ormandaki-ses",
      baslik: "Sessiz Ormandaki Ses",
      yazar: "Okurio Özgün Hikâyeler",
      seslendiren: "Okurio Anlatıcı",
      kategori: "Dikkat ve Odak",
      yas: "8-10 yaş",
      renk: ["#294D3A", "#8EBB8A"],
      puan: 5,
      sureDk: 3.67,
      ozet: "Oki ve Mino, ormandaki bilinmeyen sesi dikkatli gözlemlerle araştırır.",
      bolumler: [
        {
          ad: "Duyulan İnce Tıkırtı",
          dk: 1,
          metin: paragraphs`Oki ile Mino sabah ormana girdiler. Patika gece yağmuruyla koyulaşmıştı. Yapraklardan küçük damlalar hâlâ düşüyordu. Kuşlar henüz yüksek sesle ötmüyordu. Bu yüzden orman oldukça sessizdi.

Tam köprüye yaklaşırken ince bir tıkırtı duydular. Ses üç kez geldi, sonra kesildi. Mino bunun uzaktan geldiğini düşündü. Oki ise köprünün altını işaret etti. İkisi hemen tahmin seçmek istemedi.

Önce sesi yeniden dinlemeye karar verdiler. Oki gözlerini kapatmadan sessizce bekledi. Mino da çevredeki hareketleri izledi. Tıkırtı bu kez sağ taraftan geldi. Ardından kuru bir yaprak hafifçe kıpırdadı. İki arkadaş duydukları yönü küçük oklarla deftere dikkatle kaydetti. Beklerken konuşmamak daha ince sesleri ayırt etmelerini oldukça kolaylaştırdı. İlk gözlem kesin cevap vermedi, fakat araştırmayı doğru yere yöneltti.`,
        },
        {
          ad: "Üç Olası Kaynak",
          dk: 1,
          metin: paragraphs`Patikanın sağında eski bir ceviz ağacı vardı. Ağacın yanında küçük bir dere akıyordu. Biraz ileride tahta yön levhası duruyordu. Rüzgâr levhayı oynatıyor olabilirdi. Dere de taşları birbirine vurabilirdi.

Mino üçüncü bir olasılık düşündü. Cevizler dallardan düşüyor olabilirdi. Oki üç olasılığı defterine yazdı. Her olasılık için ayrı bir işaret çizdi. Sonra sesin zamanını not etmeye başladılar.

Tıkırtı düzenli aralıklarla gelmiyordu. Rüzgâr estiğinde levha hafifçe gıcırdıyordu. Fakat bu ses duydukları tıkırtı değildi. Dere taşları da daha yumuşak ses çıkarıyordu. Böylece iki olasılık zayıfladı. Oki elenen seçeneklerin yanına nedenlerini açıklayan kısa notlar yazdı. Böylece düşüncelerinin yeni bilgilerle nasıl değiştiğini daha sonra görebilecekti. Mino aynı yöntemi kendi küçük haritasında dikkatle uyguladı.`,
        },
        {
          ad: "Yerdeki Küçük İzler",
          dk: 1,
          metin: paragraphs`Ceviz ağacına yaklaşınca yerde kabuklar gördüler. Bazı kabuklar eski ve koyuydu. Bir kabuk ise yeni kırılmış görünüyordu. Mino kabuğa dokunmadan yakından baktı. Yanında minik ayak izleri seçiliyordu.

Oki izlerin yönünü takip etti. İzler ağacın köklerine doğru gidiyordu. Köklerin arasında küçük bir boşluk vardı. İçerisi karanlık olduğu için canlı görünmüyordu. İkisi güvenli uzaklıkta beklemeyi seçti.

Bir süre sonra tıkırtı yeniden duyuldu. Boşluktan küçük bir sincap çıktı. Ağzında sert bir ceviz taşıyordu. Cevizi köke vurunca aynı ses oluştu. Mino sesin kaynağını sonunda görmüştü. Sincabın rahatça uzaklaşabilmesi için oldukları yerde sessizce beklediler. Hayvana yaklaşmadan gözlem yapmak ikisine daha güvenli ve doğru göründü. Yeni bulgu önceki izlerle açık biçimde uyuşuyordu.`,
        },
        {
          ad: "İlk Cevabın Sınırı",
          dk: 1,
          metin: paragraphs`Oki hemen bütün sesleri açıklamadıklarını söyledi. İlk tıkırtı sağ taraftan gelmişti. Sincap da ağacın sağ kökünde duruyordu. Bu bilgi tahminlerini destekliyordu. Yine de tek gözlem yeterli olmayabilirdi.

Sincap ikinci cevizi köke vurdu. Ses yine aynı incelikte duyuldu. Sonra hayvan cevizi alıp uzaklaştı. Oki saati ve yeri deftere yazdı. Mino kırık kabuğun resmini çizdi.

İkisi bir başka ses daha duydu. Bu kez ses köprünün altından geliyordu. Küçük bir dal suya çarpıyordu. Demek ormanda benzer seslerin farklı kaynakları olabilirdi. Dikkatli dinlemek bu ayrımı kolaylaştırmıştı. Aynı sözcükle anlattıkları seslerin aslında farklı olduğunu şimdi açıkça gördüler. Süre, yön ve tekrar sayısı onlara ayırt edici bilgiler sağlıyordu. Bu bilgiler ses haritalarına yeni semboller olarak eklendi.`,
        },
        {
          ad: "Ses Haritasının Dönüşü",
          dk: 1,
          metin: paragraphs`Dönüş yolunda üç noktayı haritada işaretlediler. Levhanın gıcırtısı uzun ve sürtünmeliydi. Derenin sesi sürekli ve yumuşaktı. Cevizin sesi kısa bir tıkırtıydı. Her sesin kendine özgü ipucu vardı.

Mino ilk tahmininin uzaklık olduğunu hatırladı. Oki de köprünün altını düşündüğünü söyledi. İkisinin de ilk tahmini eksik kalmıştı. Fakat tahmin etmek yanlış bir davranış değildi. Yeni kanıt geldikçe tahmin değişebilirdi.

Orman çıkışında Nana onları bekliyordu. Çocuklar ses haritasını masaya açtılar. Gördükleri ile düşündüklerini ayrı ayrı anlattılar. Nana en önemli bulguyu sordu. Oki, önce dinleyip sonra karşılaştırdıklarını söyledi.

Mino haritanın boş kalan köşesini gösterdi. Orada henüz tanımadıkları sesler olabilirdi. Bu boşluk onları rahatsız etmedi. Çünkü yeni bir araştırma için yer bırakıyordu. Nana haritayı saklayıp ertesi gün yeniden kullanmalarını önerdi. Mino bilinmeyen sesler için küçük ve anlaşılır bir işaret tasarladı. Oki de her yeni gözleme tarih eklemeye karar verdi.`,
        },
      ],
    },
    metadata: {
      ageBand: "8-10",
      estimatedMinutes: 3.67,
      pilotEligible: true,
      contentTrack: "attention-focus",
      primaryDevelopmentTheme: "selective-attention-and-evidence",
      contentStatus: "content-quality-review",
      characters: ["Oki", "Mino", "Nana"],
      glossary: [
        { word: "tıkırtı", definition: "Kısa ve hafif vuruşlarla oluşan sestir." },
        { word: "olasılık", definition: "Gerçekleşmesi mümkün olan seçenektir." },
        { word: "kaynak", definition: "Bir sesin veya bilginin çıktığı yerdir." },
        { word: "kanıt", definition: "Bir düşünceyi destekleyen bilgi veya izdir." },
        { word: "karşılaştırmak", definition: "Benzerlikleri ve farkları birlikte incelemektir." },
      ],
      optionalReflectionPrompt: "Sen olsaydın sesi araştırırken önce neyi dinlerdin?",
      reflectionIsOptional: true,
      reflectionIsScored: false,
      sourceType: "original",
      factualReviewStatus: "pending-human-review",
      originalityRightsReviewStatus: "pending-human-review",
      contentQualityReview: pendingContentQualityReview(),
      experienceCouncilReview: pendingExperienceCouncilReview(),
      structuralValid: true,
      releaseReady: false,
    },
  },
  {
    legacy: {
      id: "oe-01-mino-neden-uzuldu",
      baslik: "Mino Neden Üzüldü?",
      yazar: "Okurio Özgün Hikâyeler",
      seslendiren: "Okurio Anlatıcı",
      kategori: "Duygu Tanıma ve İfade",
      yas: "7-8 yaş",
      renk: ["#42566B", "#9AB2C8"],
      puan: 5,
      sureDk: 2.35,
      ozet: "Mino, eksik bilgi yüzünden üzülür; arkadaşlarıyla konuşunca durumu anlar.",
      bolumler: [
        {
          ad: "Bahçedeki Boş Yer",
          dk: 1,
          metin: paragraphs`Mino öğleden sonra çıkınca arkadaşlarını büyük masanın çevresinde gördü. Masada renkli kâğıtlar ve kalemler vardı. Mino için ayrılan sandalye boş görünüyordu. Fakat kimse ona seslenmedi.

Mino çağrılmadığını düşününce göğsünde ağır bir üzüntü hissetti. Kuyruğu yavaşça yere doğru indi. Sessiz köşedeki mindere oturdu. Masaya yeniden bakmak istemedi.`,
        },
        {
          ad: "Oki'nin Fark Ettiği İşaret",
          dk: 1,
          metin: paragraphs`Oki kalem almaya kalkınca Mino'nun tek başına oturduğunu gördü. Hemen neşelenmesini söylemedi. Yanındaki mindere izin isteyerek oturdu. Bir süre sessizce bekledi.

Sonra Mino'nun nasıl olduğunu sordu. Mino, unutulduğunu düşündüğünü kısık sesle açıkladı. Oki sözünü bölmeden dinledi. Mino anlatınca biraz rahatladı.`,
        },
        {
          ad: "Masadaki Eksik Bilgi",
          dk: 1,
          metin: paragraphs`Oki masadaki durumu bilmediği için birlikte sormayı önerdi. Mino önce yerinde kalmak istedi. Sonra cevabı öğrenmenin yardımcı olabileceğini düşündü. İkisi masaya doğru yürüdü.

Lili onları görünce boş sandalyeyi gösterdi. Sandalyenin önünde Mino'nun adı yazıyordu. Toto davet kartını götürmek için ayrılmıştı. Fakat yanlış patikaya gitmişti. Kimse Mino'yu dışarıda bırakmak istememişti.`,
        },
        {
          ad: "Dönen Davet Kartı",
          dk: 1,
          metin: paragraphs`Tam o sırada Toto, Mino'nun kartıyla koşmadan bahçeye döndü. Yanlış köşede beklediğini anlattı. Mino hâlâ biraz üzgün olduğunu söyledi. Çünkü beklerken gerçekten yalnız hissetmişti.

Toto onu dinledi ve özür diledi. Sonra kartı Mino'ya uzattı. Lili masadaki görevi açıkladı. Herkes ortak bir gökyüzü resmi yapacaktı. Mino isterse bulutları çizebilirdi.`,
        },
        {
          ad: "Resimde Açılan Gökyüzü",
          dk: 1,
          metin: paragraphs`Mino hemen mutlu olmak zorunda değildi. Önce mavi kalemleri dikkatle seçti. Sonra büyük bir bulut çizdi. Oki bulutun yanına küçük yıldızlar ekledi. Toto davet yolunu yeniden kontrol etti.

Resim tamamlanınca Mino gününü düşündü. Üzüntüsü ona önemli bir şey anlatmıştı. Kendini dışarıda kalmış gibi hissetmişti. Konuşunca eksik bilgiyi öğrenmişti. Arkadaşları da onu daha iyi anlamıştı.

Mino resmi duvara birlikte asmayı önerdi. Boş sandalye artık masanın yanındaydı. Davet kartı da resmin köşesine eklendi. Böylece yanlış yol unutulmadı. Yeni davetler için küçük bir işaret oldu.`,
        },
        {
          ad: "Yeni Davet Yolu",
          dk: 1,
          metin: paragraphs`Arkadaşlar davetin ulaştığını birlikte kontrol etmeye açıkça karar verdi. Mino da konuşabileceği güvenli bir yol bulunduğunu o gün hatırladı. Ertesi etkinlik için kartları herkes beraber ve dikkatle hazırladı. Toto doğru patikayı göstermek için renkli bir ok çizdi. Lili masadaki isimleri bir kez daha yüksek sesle okudu.

Oki her sandalyenin önünde doğru kart bulunduğunu kontrol etti. Mino kendi kartını görünce sakin bir sevinç hissetti. Bu kez beklemek yerine merak ettiği şeyi doğrudan sordu. Arkadaşları sorusunu dinleyip bildikleri ayrıntıları onunla açıkça paylaştı. Gökyüzü resmi böylece yeni bir ortak alışkanlığı da başlattı.`,
        },
      ],
    },
    metadata: {
      ageBand: "7-8",
      estimatedMinutes: 2.35,
      pilotEligible: true,
      contentTrack: "emotion-recognition-expression",
      primaryDevelopmentTheme: "recognising-and-expressing-sadness",
      contentStatus: "content-quality-review",
      characters: ["Mino", "Oki", "Lili", "Toto"],
      glossary: [
        { word: "üzüntü", definition: "İnsan kendini mutsuz hissettiğinde oluşan duygudur." },
        { word: "fark etmek", definition: "Bir şeyi görerek veya düşünerek anlamaktır." },
        { word: "davet", definition: "Birini bir etkinliğe çağırmaktır." },
        { word: "açıklamak", definition: "Bir durumu anlaşılır sözlerle anlatmaktır." },
        { word: "işaret", definition: "Bir şeyi anlatan veya gösteren belirtidir." },
      ],
      optionalReflectionPrompt: "Sence Mino konuşunca ne değişti?",
      reflectionIsOptional: true,
      reflectionIsScored: false,
      sourceType: "original",
      factualReviewStatus: "pending-human-review",
      originalityRightsReviewStatus: "pending-human-review",
      contentQualityReview: pendingContentQualityReview(),
      experienceCouncilReview: pendingExperienceCouncilReview(),
      structuralValid: true,
      releaseReady: false,
    },
  },
  {
    legacy: {
      id: "op-01-oki-yanlis-anladi",
      baslik: "Oki Yanlış Anladı",
      yazar: "Okurio Özgün Hikâyeler",
      seslendiren: "Okurio Anlatıcı",
      kategori: "Empati ve Perspektif Alma",
      yas: "7-8 yaş",
      renk: ["#4E456B", "#A89ACD"],
      puan: 5,
      sureDk: 2.32,
      ozet: "Oki, eksik gördüğü bir olay hakkında soru sorarak ilk düşüncesini düzeltir.",
      bolumler: [
        {
          ad: "Yarım Kalan Uçurtma",
          dk: 1,
          metin: paragraphs`Oki kulübeye erken gelip mor uçurtmasını masaya bıraktı. Kuyruğuna üç sarı kurdele bağlayacaktı. Sonra yapıştırıcı almak için dışarı çıktı. Döndüğünde bir kurdele yerdeydi.

Toto masanın yanında küçük bir makas tutuyordu. Oki, kurdeleyi onun kestiğini düşündü. İçinde kızgın bir sıcaklık yükseldi. Fakat olayın yalnız sonunu görmüştü.`,
        },
        {
          ad: "İlk Düşüncenin Hızı",
          dk: 1,
          metin: paragraphs`Oki kurdeleyi sorarken sesi düşündüğünden daha sert çıktı. Toto şaşırıp elindeki küçük makası hemen masaya bıraktı. Kurdeleyi kesmediğini söyledi. Oki yerdeki kısa parçayı gösterdi.

Toto hemen cevap vermek yerine açık pencereye dikkatle baktı. Açık pencereden güçlü sabah rüzgârı giriyordu. Masadaki kâğıtlar da kıpırdıyordu. Toto kurdeleyi yerde bulmuştu. Makasla uçurtmanın kopan ipini düzeltiyordu.`,
        },
        {
          ad: "İki Ayrı Görüntü",
          dk: 1,
          metin: paragraphs`Oki yalnız makası görürken Toto kurdelenin uçtuğunu görmüştü. İkisinin bildiği parçalar farklıydı. Oki ilk düşüncesini yeniden inceledi. Kurdelede düzgün bir kesik yoktu.

Kumaşın ucu ince ince sökülmüştü. Bu iz güçlü rüzgârla kopmuş olabilirdi. Oki, Toto'nun anlattığını şimdi daha iyi anladı. Yine de açık pencerenin etkisini birlikte sınamak istediler.`,
        },
        {
          ad: "Rüzgârın Küçük Deneyi",
          dk: 1,
          metin: paragraphs`Yedek kurdeleyi koyup pencereyi önce kapalı tuttular. Kurdele yerinde kaldı. Sonra pencereyi biraz açtılar. Gelen hava kurdeleyi kenara sürükledi.

Deney bütün ayrıntıları değil, rüzgârın gücünü gösteriyordu. Oki, Toto'ya hızlı karar verdiğini söyledi. Sert konuştuğu için özür diledi. Toto da şaşırdığını açıkça anlattı.`,
        },
        {
          ad: "Yeni Kuyruktaki Düğüm",
          dk: 1,
          metin: paragraphs`İkisi uçurtmanın kuyruğunu birlikte onardı. Toto kopan ipi sağlam bir düğümle bağladı. Oki kurdeleleri sıkıca yerleştirip pencereyi güvenle kapattı. Mor uçurtma yeniden hazırdı.

Bahçeye çıkınca uçurtma hızla yükseldi. Sarı kurdeleler gökyüzünde kıvrılıyordu. Oki sabah gördüğü yarım görüntüyü düşündü. Bir davranışın nedeni her zaman görünmeyebilirdi. Soru sormak yeni parçaları ortaya çıkarabilirdi.

Toto uçurtmanın ipini Oki'ye uzattı. Oki bu kez önce hazır olup olmadığını sordu. Toto gülerek başını salladı. İpi birlikte tuttular. Uçurtma rüzgârla daha da yükseldi.`,
        },
        {
          ad: "Bütün Hikâyeyi Sormak",
          dk: 1,
          metin: paragraphs`Oki ilk görüntünün bütün hikâye olmayabileceğini artık daha iyi biliyordu. Toto da onarım yaparken amacını önceden söylemeyi yararlı buldu. İkisi gördükleri bütün ayrıntıları sırayla ve açıkça anlatmayı denedi. Aynı olayın farklı yerlerden başka türlü görünebildiğini fark ettiler. Bahçedeki rüzgâr sarı kurdeleleri yeniden güçlü biçimde savurdu.

Bu kez Oki kurdelelerin bağlantısını önceden dikkatle kontrol etti. Toto da pencereyi kapatıp malzemeleri güvenli kutuya yerleştirdi. Küçük yanlış anlama açık bir konuşmayla tamamen onarılmıştı. Uçurtmanın ipini dönüşümlü tutarak uzun süre birlikte koştular. Gün sonunda ikisi de merak ettiklerini açıkça sormayı yeniden hatırladı.`,
        },
      ],
    },
    metadata: {
      ageBand: "7-8",
      estimatedMinutes: 2.32,
      pilotEligible: true,
      contentTrack: "empathy-perspective-taking",
      primaryDevelopmentTheme: "checking-intent-before-concluding",
      contentStatus: "content-quality-review",
      characters: ["Oki", "Toto"],
      glossary: [
        { word: "kurdele", definition: "Süslemek veya bağlamak için kullanılan ince şerittir." },
        { word: "ayrıntı", definition: "Bir olayın küçük ama önemli parçasıdır." },
        { word: "incelemek", definition: "Bir şeyi dikkatle araştırmaktır." },
        { word: "deney", definition: "Bir düşünceyi sınamak için yapılan çalışmadır." },
        { word: "özür dilemek", definition: "Verdiğin üzüntüyü fark edip bunu söylemektir." },
      ],
      optionalReflectionPrompt: "Oki karar vermeden önce başka ne sorabilirdi?",
      reflectionIsOptional: true,
      reflectionIsScored: false,
      sourceType: "original",
      factualReviewStatus: "pending-human-review",
      originalityRightsReviewStatus: "pending-human-review",
      contentQualityReview: pendingContentQualityReview(),
      experienceCouncilReview: pendingExperienceCouncilReview(),
      structuralValid: true,
      releaseReady: false,
    },
  },
  {
    legacy: {
      id: "os-01-toto-bir-an-durdu",
      baslik: "Toto Bir An Durdu",
      yazar: "Okurio Özgün Hikâyeler",
      seslendiren: "Okurio Anlatıcı",
      kategori: "Öz Düzenleme ve Dürtü Farkındalığı",
      yas: "7-8 yaş",
      renk: ["#584B3E", "#C9A87D"],
      puan: 5,
      sureDk: 2.35,
      ozet: "Toto, devrilen kulesi hakkında tepki vermeden önce eksik bilgiyi araştırır.",
      bolumler: [
        {
          ad: "Kulenin Son Parçası",
          dk: 1,
          metin: paragraphs`Toto renkli bloklarla yaptığı kulenin son parçasını kaldırdı. Lili masanın öbür yanında resim çiziyordu. Oki de kutuları rafa taşıyordu. Oda sakin ve aydınlıktı.

Toto kırmızı parçayı en üste yerleştirirken masa birden sallandı. Kule büyük bir gürültüyle devrildi. Renkli bloklar sert zemine doğru dağıldı. Toto'nun elleri hemen sıkıldı.`,
        },
        {
          ad: "Cevaptan Önceki An",
          dk: 1,
          metin: paragraphs`Toto masadaki Oki'nin kuleyi devirdiğini düşündü. Bağırmak için ağzını açtı. Sonra yerdeki bir ayrıntıyı fark etti. Rafın altından küçük top çıkmıştı.

Toto bir an konuşmadan dikkatle bekledi. Ellerini yavaşça yeniden açtı. Kızgınlığı hâlâ oradaydı. Fakat ne olduğunu tam bilmiyordu. Önce Oki'ye masanın neden sallandığını sordu.`,
        },
        {
          ad: "Topun İzlediği Yol",
          dk: 1,
          metin: paragraphs`Oki kutuyu taşırken görmediği topa hafifçe dokunmuştu. Top yuvarlanıp masanın ayağına çarpmıştı. Masa bu yüzden sallanmıştı. Oki kuleyi bilerek devirmemişti.

Lili gördüğü top yolunu parmağıyla gösterdi. Toto parçaları sırayla düşündü. Oki'nin geçişi, top ve masa birbirine bağlanıyordu. Olay ilk göründüğünden farklıydı.`,
        },
        {
          ad: "Dağılan Blokların Kararı",
          dk: 1,
          metin: paragraphs`Toto, uzun çalıştığı kulesi için hayal kırıklığı hissediyordu. Bunu sakin sözlerle arkadaşlarına anlattı. Oki onu dinledi ve üzgün olduğunu söyledi. Sonra yardım etmeyi önerdi.

Toto hemen yeni kule yapmak istemedi. Önce blokları renklerine göre topladılar. Bu sırada daha sağlam masayı aradılar. Sallanmayan kısa masayı yeni yer olarak seçtiler.`,
        },
        {
          ad: "Daha Sağlam Yeni Kule",
          dk: 1,
          metin: paragraphs`Üç arkadaş yeni kuleyi birlikte kurdu. Lili geniş bir taban yapmayı önerdi. Oki ağır blokları alta yerleştirdi. Toto hafif parçaları yukarı koydu. Kule önceki kadar yüksek olmadı.

Fakat bu kez daha sağlam duruyordu. Toto kırmızı parçayı yine en üste koydu. Arkadaşları kuleyi uzaktan dikkatle izledi. Küçük topu da kapalı sepete bıraktılar. Oda yeniden sessizleşti.

Toto o kısa anı düşündü. Durmak kızgınlığını hemen yok etmemişti. Yalnızca yeni bilgiyi duymasına zaman vermişti. Sonra ne yapacağına kendisi karar vermişti. Bu seçim yeni kuleyi mümkün kılmıştı.`,
        },
        {
          ad: "Kırmızı Parçanın Hatırlattığı",
          dk: 1,
          metin: paragraphs`Yeni kuleyi odanın öbür ucundan yeniden dikkatle incelediler. Geniş taban gerçekten daha dengeli bir yapı sağlamıştı. Toto önceki kulesinin de değerli bir deneme olduğunu düşündü. Devrilen bloklar ona yeni bir düzen kurma fırsatı vermişti. Oki küçük top için kapağı sağlam bir sepet seçti.

Lili iki kulenin resmini büyük kâğıtta dikkatle yan yana çizdi. Toto iki yapının farklarını kendi sözleriyle açıkça anlattı. Hiçbiri onu hızlı davranmakla suçlamadı veya utandırmadı. Arkadaşları yalnız o gün öğrendikleri yeni bilgileri birlikte paylaştı. Toto kırmızı parçaya bakıp yaptığı yeni seçimi sessizce yeniden hatırladı.`,
        },
      ],
    },
    metadata: {
      ageBand: "7-8",
      estimatedMinutes: 2.35,
      pilotEligible: true,
      contentTrack: "self-regulation-impulse-awareness",
      primaryDevelopmentTheme: "pause-and-check-before-reacting",
      contentStatus: "content-quality-review",
      characters: ["Toto", "Oki", "Lili"],
      glossary: [
        { word: "ayrıntı", definition: "Bir olayın küçük ama önemli parçasıdır." },
        { word: "hayal kırıklığı", definition: "Beklediğin şey olmayınca oluşan üzüntüdür." },
        { word: "taban", definition: "Bir yapının altında duran destek bölümüdür." },
        { word: "sağlam", definition: "Kolayca bozulmayan veya yıkılmayan şeydir." },
        { word: "seçim", definition: "Birden fazla yol arasından birini belirlemektir." },
      ],
      optionalReflectionPrompt: "Toto durunca hangi yeni bilgiyi öğrendi?",
      reflectionIsOptional: true,
      reflectionIsScored: false,
      sourceType: "original",
      factualReviewStatus: "pending-human-review",
      originalityRightsReviewStatus: "pending-human-review",
      contentQualityReview: pendingContentQualityReview(),
      experienceCouncilReview: pendingExperienceCouncilReview(),
      structuralValid: true,
      releaseReady: false,
    },
  },
];

const WORDS_PER_MINUTE = 155;
const countWords = (text = "") =>
  String(text).match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;

for (const story of PILOT_STORIES) {
  for (const section of story.legacy.bolumler) {
    section.wordCount = countWords(section.metin);
    section.estimatedSeconds = Math.ceil((section.wordCount * 60) / WORDS_PER_MINUTE);
    section.dk = Number((section.estimatedSeconds / 60).toFixed(2));
  }
  const totalWords = story.legacy.bolumler.reduce(
    (sum, section) => sum + section.wordCount,
    0,
  );
  const totalSeconds = Math.ceil((totalWords * 60) / WORDS_PER_MINUTE);
  story.legacy.sureDk = Number((totalSeconds / 60).toFixed(2));
  story.metadata.estimatedMinutes = story.legacy.sureDk;
}

export const PILOT_STORIES_LEGACY = PILOT_STORIES.map(({ legacy }) => legacy);

export const PILOT_STORY_METADATA = Object.fromEntries(
  PILOT_STORIES.map(({ legacy, metadata }) => [legacy.id, metadata]),
);
