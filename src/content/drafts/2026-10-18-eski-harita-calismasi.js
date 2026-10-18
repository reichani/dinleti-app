import { createPendingContentQualityReview } from "../contentQualityReview.js";

const sourceTruth = Object.freeze({
  work: "Eski Harita Çalışması",
  scope: "Okurio için özgün lise okuru hikâyesi; sınav stresi, dikkat, sabır ve uzun metinle ilişki",
  sourceType: "original",
  rightsHolder: "Okurio",
  adaptationStatus: "not-applicable",
  verificationStatus: "pending-human-review",
  references: [
    {
      label: "U.S. National Archives · General Considerations for Rehousing and Preservation",
      url: "https://www.archives.gov/preservation/holdings-maintenance/considerations",
      scope: "Eski kâğıt belgelerin temiz ve kuru ellerle, dikkatle ele alınması",
    },
  ],
});

export const ESKI_HARITA_CALISMASI_DRAFT = {
  id: "eski-harita-calismasi-draft",
  title: "Eski Harita Çalışması",
  language: "tr",
  ageBand: "16-18",
  readingPathId: "lise_okuma_16_18",
  contentTrack: "okurio-original-pilot",
  primaryTheme: "Dikkat ve sabır, acele içindeki zihne uzun metinle yeniden bağ kurmayı öğretir",
  contentStatus: "draft",
  structuralValid: true,
  releaseReady: false,
  estimatedWordsPerMinute: 155,
  sections: [
    {
      title: "Dağınık Bir Masa",
      paragraphs: [
        "Deniz, son sınıfın ilk ayında masasına bakarken nefesinin daraldığını hissetti. Deneme kitapları üst üste yığılmış, renkli kâğıtlar her yere yapışmıştı. Hangisinden başlayacağını bilemiyordu.",
        "Telefonunda sınava kalan günleri gösteren bir sayaç vardı. Her sabah sayının küçüldüğünü görmek ona güç değil, ağırlık veriyordu. Paragraf sorularında artık sık sık takılıyordu.",
        "Uzun bir metnin ilk satırlarını okuyor, sonra aklı başka yere kayıyordu. Aynı cümleye üçüncü kez döndüğünde süre çoktan bitmiş oluyordu. Bu durum onu her gün biraz daha yoruyordu.",
        "Gece yatağa uzandığında da zihni susmuyordu. Çözemediği sorular, kaçırdığı süreler ve arkadaşlarının puanları gözünün önünden geçiyordu. Sabahları yorgun kalkıyor, kahvaltıyı çoğu zaman atlıyordu.",
        "Bir gün sınıfta öğretmenin anlattığı konuyu hiç dinlemediğini fark etti. Defterine yalnız birkaç anlamsız çizgi çizmişti. Bu, onu en çok korkutan an oldu.",
        "Rehber öğretmeni Kerem Bey, bir görüşmede ona beklenmedik bir öneri yaptı. Şehir kütüphanesi, eski şehir haritalarını sayısallaştırmak için gönüllü öğrenci arıyordu. Haftada yalnız iki öğleden sonra çalışılacaktı.",
        "Deniz önce itiraz etti. Sınav yaklaşırken zamanını başka bir işe harcamak mantıksız görünüyordu. Kerem Bey sakin bir sesle ona bir soru sordu.",
        "\"Şu an çalıştığın saatlerin ne kadarında gerçekten oradasın?\" Deniz cevap veremedi. Masada geçirdiği saatlerin çoğunda zihni dağınıktı.",
        "Kerem Bey, bu çalışmanın ders yerine geçmeyeceğini açıkça söyledi. Ama dikkati yavaşça toparlamaya yardım edebilirdi. Deniz bir hafta denemeyi kabul etti.",
        "O akşam annesine kararını anlattı. Annesi biraz endişelendi ama sonunda başını salladı. Deniz, ilk kez uzun zamandır bir şeyi merakla beklediğini fark etti.",
      ],
    },
    {
      title: "Haritalar Odası",
      paragraphs: [
        "Şehir kütüphanesinin en üst katında, penceresiz ve serin bir oda vardı. Kapının üstünde küçük bir tabela asılıydı: Haritalar ve Planlar. İçerisi kâğıt, mürekkep ve tahta kokuyordu.",
        "Odanın sorumlusu Ayten Hanım, uzun yıllar arşivlerde çalışmış bir uzmandı. Deniz'e beyaz pamuklu eldivenler ve kurşun kalem verdi. Odada tükenmez kalem kullanmak yasaktı.",
        "\"Mürekkep bir kez değerse geri dönmez,\" dedi Ayten Hanım. \"Burada her hareketin bir sonucu var. Bu yüzden yavaş çalışırız.\"",
        "Büyük bir masanın üzerine kalın bir karton yerleştirdi. Kartonun üstünde, yüz yılı aşkın yaşta bir şehir haritası duruyordu. Kenarları sararmış, bazı yerleri hafifçe yıpranmıştı.",
        "Harita, şehrin eski mahallelerini tek tek gösteriyordu. Sokak adları ince ve eğik harflerle yazılmıştı. Bazı yapıların yanında küçük sayılar ve semboller vardı.",
        "Ayten Hanım haritanın neden bu kadar değerli olduğunu anlattı. Şehrin o dönemden kalan başka ayrıntılı planı yoktu. Pek çok sokak sonradan değişmiş, bazı mahalleler tamamen yeniden kurulmuştu.",
        "Deniz eldivenleri takarken parmaklarının hafifçe titrediğini gördü. Bu kadar eski bir şeye dokunmak ona tuhaf bir sorumluluk duygusu verdi. Telefonunu kapının yanındaki dolaba bıraktı.",
        "Deniz'in görevi basit görünüyordu. Haritayı parçalara bölünmüş bir ızgara üzerinde inceleyecek, her karedeki adları bir tabloya geçirecekti. Fotoğrafları başka bir ekip çekiyordu.",
        "İlk kareye baktığında harfleri okumakta zorlandı. Bazı adlar yarı silikti, bazıları birbirine karışmıştı. Hızlıca tahmin etmek istedi ama Ayten Hanım onu durdurdu.",
        "\"Bilmediğin yeri boş bırak ve bir soru işareti koy,\" dedi. \"Yanlış bir ad, boş bir kareden daha zararlıdır.\" Deniz bu cümleyi defterinin ilk sayfasına yazdı.",
        "İlk gün yalnız dört kare tamamlayabildi. Eve dönerken bu sayı ona çok az geldi. Ama yolda hiç telefonuna bakmadığını fark etti.",
      ],
    },
    {
      title: "Büyüteç ve Sabır",
      paragraphs: [
        "İkinci hafta, Ayten Hanım ona eski bir büyüteç verdi. Büyütecin sapı kemikten yapılmış gibiydi. Deniz onu ilk kez eline aldığında ağırlığına şaşırdı.",
        "Büyüteçle bakınca harita bambaşka bir yer gibi göründü. Çıplak gözle fark edilmeyen çizgiler ortaya çıktı. Bir sokak adının altında silinmiş başka bir ad duruyordu.",
        "Deniz bu keşfi heyecanla Ayten Hanım'a gösterdi. Uzman dikkatle baktı ve hafifçe gülümsedi. \"Haritacı adı düzeltmiş,\" dedi. \"Belki sokak yapım sırasında yeniden adlandırılmıştı.\"",
        "Deniz bu ayrıntıyı tabloya not etti. Yanına, iki adın da okunabildiğini gösteren kısa bir açıklama ekledi. Bu iş, sandığından çok daha fazla dikkat istiyordu.",
        "Ayten Hanım ona çalışma aralarını da öğretti. Her kırk beş dakikada bir eldivenleri çıkarıp pencere olan koridora gidiyorlardı. Gözlerini uzaktaki çatılara dikip birkaç dakika dinlendiriyorlardı.",
        "\"Göz de bir kas gibi yorulur,\" dedi uzman. \"Yorulduğunu fark etmeden çalışırsan hata yaparsın.\" Deniz bu molaların sınav çalışmasında da işe yarayabileceğini düşündü.",
        "O gün bir şey daha öğrendi. Büyüteçle çalışırken yalnız küçük bir alana bakabiliyordu. Bütün haritayı aynı anda görmek imkânsızdı.",
        "Bu sınırlama ilk başta canını sıktı. Sonra bunun aslında bir rahatlık olduğunu anladı. Yalnız önündeki kareyle ilgilenmek, zihnini sakinleştiriyordu.",
        "Saatin nasıl geçtiğini fark etmedi. Ayten Hanım kapanış için ışıkları kısınca başını kaldırdı. İki saat boyunca hiç ara vermeden, ama yorulmadan çalışmıştı.",
        "Eve dönünce deneme kitabından bir paragraf okudu. Bu kez her cümleyi büyüteç altındaymış gibi ele aldı. Paragrafı ilk okuyuşta anladığını görünce şaşırdı.",
      ],
    },
    {
      title: "Kayıp Çeşme",
      paragraphs: [
        "Bir öğleden sonra Deniz haritanın kuzey köşesinde garip bir sembol buldu. Küçük bir daire ve onu çevreleyen dört nokta vardı. Haritanın açıklama kutusunda bu sembol yer almıyordu.",
        "Deniz hemen bir sonuca varmak istedi. Belki bir kuyuydu, belki de bir kule. Ama Ayten Hanım'ın ilk gün söylediği cümleyi hatırladı ve kareye bir soru işareti koydu.",
        "Ertesi hafta kütüphanenin arşivinden aynı mahalleye ait eski bir kitapçık buldular. Kitapçık, mahallenin su yollarını anlatıyordu. Metin uzun, cümleleri ağır ve kelimeleri eskiydi.",
        "Deniz kitapçığı okumaya başladığında eski korkusu geri döndü. Sayfalar yoğun ve sıkıcı görünüyordu. Bir an kitapçığı bırakıp başka bir işe geçmek istedi.",
        "Sonra haritada çalıştığı yöntemi denedi. Metni ızgara gibi küçük parçalara böldü. Her paragrafın yanına, kenara tek bir anahtar kelime yazdı.",
        "Yedinci paragrafa geldiğinde aradığı bilgiyi buldu. Mahallede, dört küçük taş direkle çevrili bir çeşme bulunduğu yazıyordu. Çeşme, yıllar önce yeni bir yol için kaldırılmıştı.",
        "Kitapçığı bitirdiğinde kenardaki anahtar kelimelere baktı. Su yolu, kuyu, çeşme, taş direk ve yeni yol. Beş kelime, on sayfalık metnin iskeletini oluşturuyordu.",
        "Bu iskelete bakarak metnin ana düşüncesini tek cümleyle yazabildi. Mahalle büyüdükçe su kaynakları da yer değiştirmişti. Uzun metin, artık aklında düzenli bir harita gibi duruyordu.",
        "Deniz soru işaretini sildi ve yerine \"çeşme\" yazdı. Yanına kaynağın adını ve sayfa numarasını ekledi. Bu küçük not, iki belgeyi birbirine bağlıyordu.",
        "Ayten Hanım kaydı kontrol etti ve onayladı. \"Uzun metinden korkmadın,\" dedi. Deniz bunun tam olarak doğru olmadığını biliyordu; korkmuş ama yine de okumuştu.",
      ],
    },
    {
      title: "Kötü Bir Deneme",
      paragraphs: [
        "Ekim ayının sonunda okulda büyük bir deneme sınavı yapıldı. Deniz sınava güvenle girdi. Ama sonuçlar beklediği gibi çıkmadı.",
        "Paragraf bölümünde biraz ilerleme vardı. Fakat matematikte puanı düşmüştü. Arkadaşlarından biri, kütüphanede boşa zaman harcadığını ima etti.",
        "Bu söz Deniz'i derinden yaraladı. Eve dönerken otobüs camından dışarıyı izledi. Bütün çabasının boşa gitmiş olabileceği düşüncesi göğsüne oturdu.",
        "Deniz o akşam odasında uzun süre oturdu. Haritalar odasına gitmeyi bırakmayı düşündü. Belki herkes haklıydı ve yanlış bir karar vermişti.",
        "Ertesi gün Kerem Bey ile konuştu. Rehber öğretmen sonuçlara birlikte baktı. Matematikteki düşüşün nedeni, son iki haftada çözülmeyen bir konu tekrarıydı.",
        "\"Kütüphane bunun sebebi değil,\" dedi Kerem Bey. \"Ama planını gözden geçirmen gerekiyor. Hem dinlenmeye hem çalışmaya yer açmalısın.\"",
        "Birlikte yeni bir haftalık plan hazırladılar. Kütüphane günleri yerinde kaldı ama süreleri biraz kısaldı. Matematik için sabahları kısa ve düzenli tekrarlar eklendi.",
        "Planın en altına uyku saatini de yazdılar. Kerem Bey, yorgun bir zihnin hiçbir yöntemle iyi çalışamayacağını hatırlattı. Deniz ilk kez uykuyu bir ders gibi ciddiye aldı.",
        "Deniz plana bakınca bir şeyi fark etti. Haritadaki ızgarayı kendi haftasına uygulamışlardı. Her gün küçük, yönetilebilir karelerden oluşuyordu.",
        "O hafta Ayten Hanım'a durumu anlattı. Uzman onu dikkatle dinledi. \"Haritacılar da bazen yanlış ölçer,\" dedi. \"Sonra yeniden ölçer ve haritayı düzeltirler.\"",
        "Deniz bu cümleyi sevdi. Kötü bir deneme, bütün yolun yanlış olduğu anlamına gelmiyordu. Yalnız bir karenin yeniden ölçülmesi gerekiyordu.",
      ],
    },
    {
      title: "İki Harita Arasında",
      paragraphs: [
        "Kasım ayında ekip yeni bir göreve başladı. Aynı mahallenin elli yıl sonra çizilmiş ikinci bir haritası bulunmuştu. Deniz iki haritayı karşılaştıracaktı.",
        "İlk bakışta iki harita birbirine çok benziyordu. Ama dikkatle bakınca farklar ortaya çıkmaya başladı. Bazı sokaklar genişlemiş, bazı bahçeler kaybolmuştu.",
        "Deniz bir karşılaştırma tablosu hazırladı. Bir sütuna eski haritadaki yapıları, diğerine yeni haritadakileri yazdı. Üçüncü sütuna ise değişimin olası nedenini not etti.",
        "Bu iş, sınavdaki paragraf sorularına şaşırtıcı biçimde benziyordu. İki metin arasındaki farkı bulmak, ana düşünceyi kavramayı gerektiriyordu. Ayrıntılar ancak büyük resimle anlam kazanıyordu.",
        "Karşılaştırma sırasında ilk kez bir tartışmaya da tanık oldu. Ekipteki iki uzman, bir yapının adını farklı okuyordu. Biri ikinci haritaya, öteki eski bir tapu kaydına dayanıyordu.",
        "Ayten Hanım iki görüşü de tabloya ekledi ve kaynaklarını yanlarına yazdı. \"Karar veremiyorsak okura iki ihtimali de gösteririz,\" dedi. Deniz, dürüstlüğün bazen kesin cevaptan daha değerli olduğunu düşündü.",
        "Bir gün eski haritadaki küçük bir okulun yeni haritada daha büyük göründüğünü fark etti. Okulun yanındaki bahçe, yeni bir binaya dönüşmüştü. Mahalle büyüdükçe okul da büyümüştü.",
        "Deniz bu ayrıntıyı düşünürken kendini bir okur gibi hissetti. Haritalar da birer metindi. Her çizgi, bir zamanlar yaşanmış bir kararı anlatıyordu.",
        "Ayten Hanım onun karşılaştırma tablosunu ekiple paylaştı. Tablo, arşivin çevrimiçi sayfasında açıklama olarak kullanılacaktı. Deniz'in adı da katkı sağlayanlar arasına yazıldı.",
        "O akşam Deniz eski bir romanın ilk bölümünü okumaya karar verdi. Edebiyat öğretmeninin önerdiği kitap aylardır rafında duruyordu. Bu kez kitabı açarken eli titremedi.",
      ],
    },
    {
      title: "Uzun Metnin Ritmi",
      paragraphs: [
        "Romanın ilk sayfaları yavaş ilerliyordu. Bir kasabanın sokakları ve insanları uzun uzun anlatılıyordu. Deniz eskiden böyle sayfaları atlamak isterdi.",
        "Şimdi ise onları bir harita gibi okumayı denedi. Her bölümün başında karakterlerin nerede olduğunu not etti. Kenara küçük oklar çizerek kimin kimle bağlantılı olduğunu gösterdi.",
        "Okurken zaman zaman dikkati yine dağılıyordu. Böyle anlarda kendini suçlamadı. Kalemini bırakıp derin bir nefes aldı ve son okuduğu cümleye döndü.",
        "Bir hafta sonra romanın üçte birini bitirmişti. Hızlı değildi ama her sayfayı gerçekten hatırlıyordu. Karakterler, gerçek tanıdıkları gibi zihninde yer etmişti.",
        "Bazı akşamlar romanın bir bölümünü sesli okudu. Kendi sesini duymak, uzun cümlelerin nerede nefes aldığını gösteriyordu. Virgüller, haritadaki küçük işaretler gibi ona yol çiziyordu.",
        "Bir bölümün sonunda kısa bir özet yazmayı da alışkanlık hâline getirdi. Özet hiçbir zaman üç cümleyi geçmiyordu. Bu kural, onu gereksiz ayrıntılara boğulmaktan koruyordu.",
        "Deneme sınavlarındaki paragraf bölümünde de değişim başladı. Uzun metinler artık onu korkutmuyordu. Önce metnin haritasını çıkarıyor, sonra soruya dönüyordu.",
        "Bir gün sınıfta arkadaşı Selin ona nasıl çalıştığını sordu. Deniz yöntemini kısaca anlattı. Metni karelere bölmek, bilinmeyeni işaretlemek ve acele etmemek.",
        "Selin bunun çok zaman alacağını düşündü. Deniz gülümsedi. \"Başta öyle,\" dedi. \"Ama sonra aynı metne üç kez dönmediğin için zaman kazanıyorsun.\"",
        "O hafta sınav sayacına baktığında bir şey fark etti. Sayı hâlâ küçülüyordu ama artık ona baskı yapmıyordu. Her gün, önündeki tek kareyi doldurmaya odaklanıyordu.",
      ],
    },
    {
      title: "Son Kare",
      paragraphs: [
        "Aralık ayının ortasında haritanın son karesine ulaştı. Bu kare, şehrin eski limanını gösteriyordu. Kıyı çizgisinin yanında küçük gemi çizimleri vardı.",
        "Deniz son adları dikkatle tabloya geçirdi. İki tanesini okuyamadı ve yanlarına soru işareti koydu. Artık bunu bir başarısızlık olarak görmüyordu.",
        "Ayten Hanım tabloyu baştan sona inceledi. Ekranda yüzlerce satır ve birkaç küçük soru işareti vardı. \"Dürüst bir harita,\" dedi. \"Bilmediğini de gösteriyor.\"",
        "Kütüphane, sayısallaştırılmış haritayı yeni yıl başında herkese açacaktı. Öğrenciler ve araştırmacılar şehrin eski hâlini evlerinden görebilecekti. Deniz bu fikirden derin bir gurur duydu.",
        "Son günü Ayten Hanım ona küçük bir hediye verdi. Bu, ilk gün kullandığı eski büyüteçti. \"Sınavdan sonra geri getirirsin,\" dedi gülerek. \"Bahar arşivi seni bekliyor.\"",
        "Deniz büyüteci elinde çevirirken ilk günü hatırladı. Dört kare tamamlayıp hayal kırıklığıyla eve döndüğü akşam şimdi çok uzak görünüyordu. O günden bu yana yüzlerce kareyi sabırla doldurmuştu.",
        "Ayten Hanım'a teşekkür etmek için doğru kelimeleri aradı. Sonunda yalnız \"Bana yavaşlamayı öğrettiniz\" diyebildi. Uzman başını salladı ve kapıya kadar ona eşlik etti.",
        "Deniz kütüphaneden çıkarken şehrin sokaklarına farklı bir gözle baktı. Bazı köşelerde haritadaki eski adları hatırladı. Kaldırılmış çeşmenin yerinde şimdi küçük bir durak vardı.",
        "Eve dönünce masasını düzenledi. Deneme kitaplarını sıraya dizdi ve renkli kâğıtları tek bir panoya topladı. Masanın ortasına büyüteci koydu.",
        "Sınav hâlâ önündeydi ve hâlâ zordu. Ama artık uzun bir yolu nasıl yürüyeceğini biliyordu. Kare kare, sabırla ve bilmediğini dürüstçe işaretleyerek.",
      ],
    },
  ],
  glossary: [
    { word: "sayısallaştırmak", definition: "Kâğıt üzerindeki bir belgeyi bilgisayarda kullanılabilir hâle getirmektir." },
    { word: "ızgara", definition: "Bir yüzeyi eşit karelere bölen düzenli çizgilerdir." },
    { word: "büyüteç", definition: "Küçük ayrıntıları büyük gösteren mercekli araçtır." },
    { word: "sembol", definition: "Bir şeyi temsil eden küçük işaret ya da çizimdir." },
    { word: "kaynağın", definition: "Bir bilginin alındığı belge, kitap ya da kişiyle ilgilidir." },
    { word: "arşiv", definition: "Belgelerin düzenli biçimde korunduğu yer ya da bütündür." },
    { word: "karşılaştırma tablosu", definition: "İki şeyin benzerlik ve farklarını yan yana gösteren tablodur." },
  ],
  optionalReflectionPrompt:
    "Senin için uzun bir işi küçük karelere bölmek hangi alanda işe yarayabilir?",
  sourceTruth,
  contentQualityReview: createPendingContentQualityReview("lise_okuma_16_18"),
};

// Timing follows the actual reading body, excluding headings and glossary.
const body = ESKI_HARITA_CALISMASI_DRAFT.sections
  .flatMap((section) => section.paragraphs).join(" ");
ESKI_HARITA_CALISMASI_DRAFT.wordCount =
  body.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
ESKI_HARITA_CALISMASI_DRAFT.estimatedSeconds = Math.ceil(
  ESKI_HARITA_CALISMASI_DRAFT.wordCount * 60 / 155,
);
ESKI_HARITA_CALISMASI_DRAFT.declaredSeconds =
  ESKI_HARITA_CALISMASI_DRAFT.estimatedSeconds;
