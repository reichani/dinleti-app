import { createPendingContentQualityReview } from "../contentQualityReview.js";

const sourceTruth = Object.freeze({
  work: "Kenar Notları",
  scope: "Okurio için özgün genç okur hikâyesi; klasik okumaya giriş, ana fikir bulma ve okurun soruları",
  sourceType: "original",
  rightsHolder: "Okurio",
  adaptationStatus: "not-applicable",
  verificationStatus: "pending-human-review",
  references: [],
});

export const KENAR_NOTLARI_DRAFT = {
  id: "kenar-notlari-draft",
  title: "Kenar Notları",
  language: "tr",
  ageBand: "14-16",
  readingPathId: "klasiklere_hazirlik_14_16",
  contentTrack: "okurio-original-pilot",
  primaryTheme: "Okumak, yazarla ve önceki okurlarla soru sorarak kurulan bir sohbettir",
  contentStatus: "draft",
  structuralValid: true,
  releaseReady: false,
  estimatedWordsPerMinute: 155,
  sections: [
    {
      title: "Dükkândaki Toz Kokusu",
      paragraphs: [
        "Zeynep liseye başlayalı iki hafta olmuştu. Edebiyat öğretmeni, dönem sonuna kadar eski bir roman okumalarını istemişti. Zeynep listeye bakınca içini bir ağırlık kapladı.",
        "Cumartesi sabahı dedesinin sahaf dükkânına gitti. Dükkân, yokuşun ortasında, dar bir kapının ardındaydı. İçeri girince eski kâğıt ve toz kokusu yüzüne çarptı.",
        "Dedesi Halil Bey, tezgâhın arkasında kitap ciltliyordu. Torununu görünce gözlüğünü alnına kaldırdı. \"Hoş geldin, okur hanım,\" dedi gülümseyerek.",
        "Zeynep okul listesini tezgâha bıraktı. \"Bu kitaplar çok kalın, dede,\" dedi. \"Hem cümleleri uzun, hem de kelimeleri eski.\"",
        "Halil Bey listeyi sessizce okudu. Sonra raflardan birine yürüdü ve solmuş mavi kapaklı bir kitap çıkardı. Kitabın sırtındaki yazı neredeyse silinmişti.",
        "\"Bunu bir öğretmen bağışlamıştı,\" dedi. \"İçinde onun notları var. Belki sana yol gösterir.\"",
        "Zeynep kitabı açtı ve ilk sayfaya baktı. Kenarlarda kurşun kalemle yazılmış küçük, eğik harfler vardı. Bazı satırların altı çizilmiş, bazılarının yanına soru işareti konmuştu.",
        "İlk notta yalnız iki kelime yazıyordu: \"Kim anlatıyor?\" Zeynep bu soruya hemen bir cevap veremedi. Ama sorunun kendisi ona garip biçimde yakın geldi.",
        "Zeynep sayfaları çevirdikçe başka notlar da gördü. Bir yerde \"Burada dur ve düşün\" yazıyordu. Başka bir yerde yalnız küçük bir yıldız çizilmişti. Notlar, sanki biri kitabın içinden ona fısıldıyordu.",
        "Dedesi tezgâha döndü. \"Acele etme,\" dedi. \"Kitap seninle konuşmaya hazır. Sen de onunla konuşmaya hazır ol.\"",
        "Zeynep kitabı çantasına koydu. Dükkândan çıkarken yokuşun başındaki eski saate baktı. Bu hafta her gün yirmi dakika okumaya karar verdi.",
      ],
    },
    {
      title: "İlk Sayfanın Direnci",
      paragraphs: [
        "Pazartesi akşamı Zeynep masasına oturdu. Telefonunu başka odaya bıraktı ve bir zamanlayıcı kurdu. Kitabın ilk bölümünü yavaşça okumaya başladı.",
        "İlk paragraf tam bir sayfa sürüyordu. Bir kasabanın sokakları, evleri ve insanları uzun uzun anlatılıyordu. Zeynep üçüncü satırda başını kaldırıp pencereye baktı.",
        "Sonra kenardaki ilk nota döndü: \"Kim anlatıyor?\" Paragrafı bu soruyla yeniden okudu. Anlatıcının kasabayı yukarıdan, her şeyi bilen biri gibi gördüğünü fark etti.",
        "Bu küçük fark, metni biraz daha anlaşılır kıldı. Artık yalnız kelimeleri değil, bir sesi izliyordu. O ses, okuru kasabanın içine yavaşça çekiyordu.",
        "Birkaç sayfa sonra yeni bir not gördü: \"Bu cümleyi kendi kelimelerinle söyle.\" Altı çizili cümle, bir karakterin uzun bir iç düşüncesiydi.",
        "Zeynep defterine kısa bir cümle yazdı: \"Genç adam ailesinden uzaklaşmaktan korkuyor.\" Yazdıklarını okuyunca şaşırdı. Uzun cümlenin özü aslında oldukça sadeydi.",
        "Zamanlayıcı çaldığında yalnız on iki sayfa okumuştu. İlk başta bu sayı ona az geldi. Sonra defterindeki notlara baktı ve fikrini değiştirdi.",
        "Her sayfayı gerçekten anlamıştı. Hiçbir paragrafı gözleriyle geçip kafasında boş bırakmamıştı. Bu, hızlı okuduğu eski kitaplarda hiç yaşamadığı bir duyguydu.",
        "Defterini kapatmadan önce bir tablo çizdi. Sol sütuna zor kelimeleri, sağ sütuna tahmin ettiği anlamları yazdı. Ertesi gün sözlükle karşılaştırınca tahminlerinin yarısının doğru çıktığını gördü.",
        "Yatmadan önce kenar notlarını yazan kişiyi düşündü. Acaba o da bu sayfalarda zorlanmış mıydı? Belki notları, kendi zorluğunu aşmak için yazmıştı.",
      ],
    },
    {
      title: "Ana Fikrin İzi",
      paragraphs: [
        "Çarşamba günü edebiyat dersinde öğretmen Aslı Hanım bir soru sordu: \"Bir metnin ana fikrini nasıl buluruz?\" Sınıfta kısa bir sessizlik oldu.",
        "Bir öğrenci, son paragrafa bakmak gerektiğini söyledi. Bir başkası başlığın ipucu verdiğini düşündü. Aslı Hanım iki cevabı da tahtaya yazdı ama tamamlamadı.",
        "Akşam Zeynep kitabı yeniden açtı. Dördüncü bölümün başında, kenarda daha uzun bir not vardı. Not, ince bir okla bir paragrafa bağlanmıştı.",
        "\"Ana fikir bir cümlede saklanmaz,\" diye yazıyordu. \"Tekrar eden şeye bak. Yazar neyi dönüp dönüp anlatıyor?\"",
        "Zeynep önceki bölümleri hızla gözden geçirdi. Kasabadaki saat kulesi her bölümde bir kez anılıyordu. Karakterler zamanın geçtiğini hep o saate bakarak fark ediyordu.",
        "Defterine \"saat\" kelimesini yazdı ve yuvarlak içine aldı. Sonra yanına bir soru ekledi: \"Yazar zaman hakkında ne söylemek istiyor?\"",
        "Cevabı hemen bulamadı. Ama sorunun doğru yerde durduğunu hissetti. Belki ana fikir, değişimden korkan insanların hikâyesiydi.",
        "Ertesi gün bu fikri Aslı Hanım'a anlattı. Öğretmeni dikkatle dinledi ve başını salladı. \"Güzel bir iz bulmuşsun. Şimdi onu kanıtlarla destekle,\" dedi.",
        "Akşam defterine üç sahne not etti. Birinde yaşlı bir kadın saati durdurmak istiyordu. Diğer ikisinde gençler kasabadan ayrılmayı konuşuyor ama bir türlü yola çıkamıyordu.",
        "Zeynep o gün iki yeni şey öğrendi. Ana fikir bir tahmin olarak başlayabilirdi. Ama metinden örneklerle desteklenince gerçek bir yoruma dönüşüyordu.",
      ],
    },
    {
      title: "Soru İşaretli Sayfa",
      paragraphs: [
        "Hafta sonu Zeynep yeniden dükkâna gitti. Dedesi raflara yeni gelen kitapları yerleştiriyordu. Zeynep ona yardım ederken aklındaki soruyu sordu.",
        "\"Kenar notlarını yazan öğretmen kimdi, dede?\" Halil Bey biraz düşündü. \"Adı Nermin Hanım'dı. Yıllarca bu mahallenin lisesinde ders verdi.\"",
        "Zeynep kitabın ortasında garip bir sayfa bulmuştu. O sayfada hiç açıklama yoktu, yalnız üç büyük soru işareti vardı. Altı çizili satırlar da birbiriyle çelişiyor gibiydi.",
        "Bir karakter, aynı sayfada hem cesur hem de korkak davranıyordu. Zeynep önce bunun bir hata olduğunu düşündü. Sonra soru işaretlerine bakıp durdu.",
        "Belki Nermin Hanım da bu sayfada kararsız kalmıştı. Belki notlar, her sorunun cevabını bildiği için yazılmamıştı. Okur bazen soruyu açık bırakabilirdi.",
        "Halil Bey çay demledi ve iki bardak doldurdu. \"Ben de gençken her sayfanın tek bir doğru anlamı olduğunu sanırdım,\" dedi. \"Sonra iyi kitapların insanı tartışmaya çağırdığını gördüm.\"",
        "Zeynep bu fikri sevdi ama biraz da huzursuz oldu. Sınavda hangi cevabın doğru sayılacağını merak etti. Dedesi onun yüzündeki ifadeyi hemen okudu.",
        "\"Her yorum geçerli değildir,\" dedi. \"Ama metne dayanan yorum saygıyı hak eder. Önemli olan kanıtı sayfada gösterebilmen.\"",
        "Zeynep çayından bir yudum aldı ve sayfaya yeniden baktı. Karakterin korkusunu ve cesaretini ayrı renklerle işaretledi. İki duygu, aynı paragrafta yan yana durabiliyordu.",
        "Zeynep dedesinden izin aldı. Soru işaretli sayfanın yanına, Nermin Hanım'ın notlarından ayrı dursun diye küçük harflerle kendi notunu yazdı: \"İnsan aynı anda iki şeyi hissedebilir.\"",
      ],
    },
    {
      title: "Uzun Bölümün Haritası",
      paragraphs: [
        "Kitabın yedinci bölümü kırk sayfa sürüyordu. Zeynep sayfa sayısını görünce yine eski ağırlığı hissetti. Bu kez kenarda ona yardım edecek bir not bulamadı.",
        "Nermin Hanım bölümün başına yalnız küçük bir çizim bırakmıştı. Çizimde birbirine oklarla bağlanmış dört kutu vardı. Kutuların içi boştu.",
        "Zeynep çizimin ne anlama geldiğini düşündü. Sonra bunun bir okuma haritası olabileceğini fark etti. Uzun bölümü küçük parçalara ayırmak gerekiyordu.",
        "Bölümü önce baştan sona hızlıca karıştırdı. Boşluklarla ayrılmış dört ayrı sahne buldu. Her sahneyi bir kutu olarak kabul etti.",
        "Her gün yalnız bir sahne okudu. Sahne bitince kutunun içine tek bir cümle yazdı. Kim, nerede, ne yaptı ve bu neden önemliydi?",
        "İkinci gün okurken dikkatinin dağıldığını fark etti. Aynı paragrafı üç kez okumuş ama hiçbir şey hatırlamamıştı. Kalkıp bir bardak su içti ve pencereyi açtı.",
        "Sonra paragrafı yüksek sesle okudu. Kendi sesini duymak, cümleleri tek tek yakalamasına yardım etti. Bu yöntemi defterine bir ipucu olarak not etti.",
        "Dördüncü günün sonunda bütün kutular dolmuştu. Zeynep oklara bakınca bölümün tamamını bir bakışta gördü. Kırk sayfa artık korkutucu bir duvar değildi.",
        "Haritanın en altına kendi sorusunu da ekledi: \"Bu bölüm bütün kitapta neyi değiştiriyor?\" Cevap, saat kulesinin ilk kez durduğu sahnede saklıydı. Zeynep bu ayrıntıyı kırmızı kalemle işaretledi.",
        "Haritayı dedesine gösterdi. Halil Bey gözlüğünü takıp uzun süre inceledi. \"Nermin Hanım da tam böyle çalışırdı,\" dedi.",
      ],
    },
    {
      title: "Okurun Sesi",
      paragraphs: [
        "Aslı Hanım, sınıftan kısa bir okuma günlüğü istedi. Herkes okuduğu kitapla ilgili bir soruyu ve kendi cevabını yazacaktı. Zeynep bu kez ödevden korkmadı.",
        "Günlüğüne saat kulesi fikrini yazdı. Metinden üç ayrı sahne seçti ve her birini kısaca açıkladı. Her sahnede karakterlerin değişimden nasıl kaçtığını gösterdi.",
        "Sonra kendi sorusunu ekledi: \"Değişimden korkmak her zaman yanlış mıdır?\" Bu sorunun cevabını kitaptan değil, kendi hayatından düşündü.",
        "Liseye başlarken o da korkmuştu. Yeni okul, yeni arkadaşlar ve kalın kitaplar onu tedirgin etmişti. Ama bu korku, dikkatli olmasını da sağlamıştı.",
        "Ders günü sınıfta günlükler paylaşıldı. Arkadaşı Mert, aynı kitabı bambaşka okumuştu. Ona göre ana fikir zaman değil, aile bağlarıydı.",
        "Zeynep önce kendi yorumunu savunmak istedi. Sonra Mert'in gösterdiği sahnelere baktı. Onun kanıtları da metinde açıkça duruyordu.",
        "Aslı Hanım iki yorumu yan yana tahtaya yazdı. \"İkisi de metne dayanıyor,\" dedi. \"Güçlü bir kitap birden fazla okumayı taşıyabilir.\"",
        "O gün Zeynep okumanın birçok kişiyle yapılan bir sohbet olduğunu anladı. Yazar, Nermin Hanım, Mert ve kendisi aynı masadaydı. Her biri metne farklı bir pencereden bakıyordu.",
        "Mert de ondan bir şey öğrenmişti. Saat kulesinin aile evlerinin tam ortasında durduğunu fark etmemişti. Teneffüste iki yorumu birleştirmeye çalıştılar: Belki aileler, zamanın akışından birlikte korkuyordu.",
        "Okuldan çıkınca adımlarını hızlandırdı. Bunu dedesine anlatmak için sabırsızlanıyordu.",
      ],
    },
    {
      title: "Kenara Yazılan Son Not",
      paragraphs: [
        "Dönemin son haftasında Zeynep kitabı bitirdi. Son sayfayı çevirdiğinde bir süre kıpırdamadan oturdu. Kitabın sonu, beklediğinden daha sessizdi.",
        "Arka kapağın iç yüzünde Nermin Hanım'ın son notu vardı: \"Bu kitabı ilk okuyuşumda sevmedim. Üçüncü okuyuşumda benimle konuşmaya başladı.\"",
        "Zeynep bu cümleyi birkaç kez okudu. Nermin Hanım'ın da zorlandığını öğrenmek ona cesaret verdi. Klasik okumak, her şeyi bir kerede anlamak zorunda olmak demek değildi.",
        "Kitabı dükkâna geri götürdü. Halil Bey onu rafa koymak için uzandı. Zeynep, \"Bekle dede,\" dedi ve çantasından kurşun kalemini çıkardı.",
        "Nermin Hanım'ın notunun altına kendi notunu yazdı: \"İlk okuyuşum zordu ama yalnız değildim. Sorularınız bana yol gösterdi.\"",
        "Sonra bir şey daha ekledi: \"Sonraki okura: Kim anlatıyor diye sorarak başla. Gerisi kendiliğinden gelir.\"",
        "Halil Bey kitabı aldı ve dikkatle rafa yerleştirdi. Bu kez onu en önde, görünür bir yere koydu. \"Artık iki okurun sesi var içinde,\" dedi.",
        "Zeynep dükkândan çıkmadan raflara bir kez daha baktı. Listedeki ikinci kitap da buradaydı. Kalın sırtı artık ona bir duvar gibi değil, açılmayı bekleyen bir kapı gibi göründü.",
        "Dedesi ona yeni bir kurşun kalem ve ince bir defter uzattı. \"Kenar notlarını bundan sonra buraya da yazabilirsin,\" dedi. Zeynep defterin ilk sayfasına tarihi ve kitabın adını yazdı.",
        "Kitabı alıp tezgâha koydu. \"Bunu da okuyacağım,\" dedi. \"Ama bu kez kendi defterime ilk soruyu ben yazacağım.\"",
      ],
    },
  ],
  glossary: [
    { word: "sahaf", definition: "Eski ve kullanılmış kitap satan kişi ya da dükkândır." },
    { word: "anlatıcı", definition: "Bir hikâyeyi okura aktaran sestir." },
    { word: "ana fikir", definition: "Bir metnin okura vermek istediği temel düşüncedir." },
    { word: "yorum", definition: "Bir metne kanıta dayanarak anlam vermektir." },
    { word: "okuma haritası", definition: "Uzun bir metni parçalara ayıran küçük plandır." },
    { word: "okuma günlüğü", definition: "Düzenli tutulan kısa not ve düşünce kaydıdır." },
  ],
  optionalReflectionPrompt:
    "Zor bir metni okurken sen kendine hangi soruyu sorarak başlardın?",
  sourceTruth,
  contentQualityReview: createPendingContentQualityReview("klasiklere_hazirlik_14_16"),
};

// Timing follows the actual reading body, excluding headings and glossary.
const body = KENAR_NOTLARI_DRAFT.sections
  .flatMap((section) => section.paragraphs).join(" ");
KENAR_NOTLARI_DRAFT.wordCount =
  body.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
KENAR_NOTLARI_DRAFT.estimatedSeconds = Math.ceil(
  KENAR_NOTLARI_DRAFT.wordCount * 60 / 155,
);
KENAR_NOTLARI_DRAFT.declaredSeconds =
  KENAR_NOTLARI_DRAFT.estimatedSeconds;
