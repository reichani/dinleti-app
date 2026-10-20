import { createPendingContentQualityReview } from "../contentQualityReview.js";

const sourceTruth = Object.freeze({
  work: "Doğu Ekspresi Defteri",
  scope: "Okurio için özgün lise okuru hikâyesi; bir tren yolculuğunda aile hafızası, dinlemek ve gözlem yaparak yazmak",
  sourceType: "original",
  rightsHolder: "Okurio",
  adaptationStatus: "not-applicable",
  verificationStatus: "pending-human-review",
  references: [],
});

export const DOGU_EKSPRESI_DEFTERI_DRAFT = {
  id: "dogu-ekspresi-defteri-draft",
  title: "Doğu Ekspresi Defteri",
  language: "tr",
  ageBand: "16-18",
  readingPathId: "lise_okuma_16_18",
  contentTrack: "okurio-original-pilot",
  primaryTheme: "Bir yolculuğu gerçekten görmek, yanındakileri dinlemek ve gördüğünü sabırla yazmakla başlar",
  contentStatus: "draft",
  structuralValid: true,
  releaseReady: false,
  estimatedWordsPerMinute: 155,
  sections: [
    {
      title: "Eski Bir Defter",
      paragraphs: [
        "Defne, anneannesinin evini toplarken çekmecenin en dibinde lacivert kaplı bir defter buldu. Kapağın köşeleri aşınmış, sırtındaki iplik gevşemişti. İlk sayfada eğik bir el yazısıyla tek bir satır vardı: \"Ankara'dan Kars'a, Şubat.\"",
        "Anneannesi Nermin Hanım geçen kış vefat etmişti. Defne onu en çok mutfak masasında, gözlüğünü burnunun ucuna indirmiş bulmaca çözerken hatırlıyordu. Bir defter tuttuğunu ise hiç bilmiyordu.",
        "Defterin sayfaları istasyon adlarıyla doluydu. Her istasyonun altına birkaç cümle yazılmıştı. Kayseri'de simit satan bir çocuk, Sivas'ta camı buğulanmış bir bekleme salonu, Erzincan'da bembeyaz bir ova.",
        "Bazı sayfalar ise yarım bırakılmıştı. Bir istasyon adı yazılmış, altı boş kalmıştı. En sondaki sayfada yalnız \"Kars'ta onu bekleyecektim\" yazıyordu. Kimi beklediği yazmıyordu.",
        "Defne defteri annesine gösterdi. Annesi sayfaları uzun uzun çevirdi, sonra başını iki yana salladı. \"Annem gençken bir kez doğuya gitmişti,\" dedi. \"Ama bunu hiç anlatmadı. Ben de sormadım.\"",
        "O gece Defne yatağında defteri yeniden okudu. Kelimeler sade ama canlıydı. Sanki biri yanında oturmuş, pencereden gördüklerini ona fısıldıyordu. Sabaha karşı bir karar verdi.",
        "Yarıyıl tatilinde aynı yolculuğu yapacaktı. Anneannesinin gördüğü istasyonları kendi gözüyle görecek, boş sayfaları kendi notlarıyla dolduracaktı. Annesi önce tereddüt etti, sonra bir şartla kabul etti: dayısı da gelecekti.",
      ],
    },
    {
      title: "Kalkış",
      paragraphs: [
        "Ankara Garı'nın büyük saati akşam altıyı gösterirken tren perona yanaştı. Peron soğuktu ama kalabalıktı. Sırt çantalı öğrenciler, sarılarak vedalaşan aileler ve termos taşıyan yaşlılar aynı kapılara yöneliyordu.",
        "Dayısı Murat, bavulları kompartımana yerleştirirken Defne pencerenin kenarına oturdu. Defterini dizlerinin üstüne koydu. Yanına bir de kendi defterini almıştı: beyaz kapaklı, henüz hiç açılmamış bir defter.",
        "Tren yavaşça hareket etti. Önce şehrin ışıkları geçti, sonra seyrekleşen evler, en sonunda karanlık bir bozkır. Pencerede yalnız kendi yüzünün yansıması kaldı.",
        "Defne anneannesinin ilk sayfasını açtı. \"Ankara'dan çıkınca her şey birden kararıyor,\" diye yazmıştı Nermin Hanım. \"Pencere ayna oluyor. İnsan ister istemez kendine bakıyor.\" Defne başını kaldırdı ve gülümsedi.",
        "Elli yıl sonra aynı karanlık, aynı ayna oradaydı. Bu küçük benzerlik ona tuhaf bir yakınlık hissettirdi. Kalemini çıkardı ve kendi defterinin ilk satırına tarihi yazdı.",
        "Ne yazacağını bilemedi. Gördüğü her şey sıradan görünüyordu. Dayısı onun kararsızlığını fark etti. \"Büyük cümleler arama,\" dedi. \"Sadece gördüğünü yaz. Anneannen de öyle yapmış.\"",
        "Defne bir süre düşündü. Sonra şöyle yazdı: \"Karşı koltukta bir termos var. Kapağı kırmızı. Sahibi henüz gelmedi.\" Cümleler küçüktü ama gerçekti. İlk sayfa böylece başlamış oldu.",
      ],
    },
    {
      title: "Kompartıman Komşuları",
      paragraphs: [
        "Kırmızı kapaklı termosun sahibi az sonra geldi. Beyaz bıyıklı, yaşlı bir adamdı. Kendini İlhan Bey diye tanıttı ve yıllarca bu hatta makinist olarak çalıştığını söyledi.",
        "\"Emekli olunca her kış bir kez binerim,\" dedi. \"Rayların sesini özlüyorum.\" Termosundan herkese çay koydu. Kompartıman bir anda bir mutfak kadar sıcak oldu.",
        "Yan kompartımanda genç bir anne ile yedi yaşlarında bir kız çocuğu vardı. Kızın adı Zeynep'ti. Koridorda koşturuyor, her durakta pencereye yapışıyordu. Annesi ise yorgun ama sabırlı görünüyordu.",
        "Defne başta kimseyle konuşmak istemedi. Kulaklığını takıp müziğe dalmayı düşündü. Ama İlhan Bey'in anlattığı bir cümle dikkatini çekti: \"Bu tren her istasyonda biraz insan bırakır, biraz insan alır.\"",
        "Kulaklığı çantasına geri koydu. Anneannesinin defterinde de buna benzer bir satır olduğunu hatırladı. Sayfaları çevirdi ve buldu: \"Trende herkes biraz misafir, biraz ev sahibi.\"",
        "İki cümleyi yan yana okudu. Biri elli yıl önce yazılmış, öteki az önce söylenmişti. Defne o an, yolculuğun yalnız istasyonlardan oluşmadığını anladı. İnsanlar da bu yolun bir parçasıydı.",
        "Gece ilerledikçe Zeynep annesinin kucağında uyudu. İlhan Bey gözlüğünü çıkarıp pencereden karanlığa baktı. Defne ise defterine üçüncü sayfayı yazdı. Bu kez yalnız eşyaları değil, insanların seslerini de not etti.",
      ],
    },
    {
      title: "Makinistin Hikâyesi",
      paragraphs: [
        "Gece yarısını geçerken tren Kayseri'de uzun bir mola verdi. Defne uyanık kalmıştı. İlhan Bey de uyumamıştı. Koridorun sonundaki pencerenin önünde yan yana durdular.",
        "\"İlk seferimi hiç unutmam,\" dedi İlhan Bey. \"Yirmi iki yaşındaydım. Kar o kadar yoğundu ki rayları göremiyordum. Ustam yanımdaydı. Bana sadece 'Acele etme, yolu dinle' dedi.\"",
        "Defne yolun nasıl dinlendiğini sordu. İlhan Bey gülümsedi. Tekerleklerin raylara çarpınca çıkardığı sesin, yol düzgünken başka, bozukken başka olduğunu anlattı. İyi bir makinist gözleri kadar kulaklarını da kullanırmış.",
        "\"Bazı geceler hiçbir şey görmezdim,\" dedi. \"Sadece ses vardı. O ses bana nerede yavaşlayacağımı, nerede dikkat edeceğimi söylerdi. Sabırsız olanlar o sesi duymazdı.\"",
        "Defne anneannesinin defterini açtı. Kayseri sayfasında şu satır vardı: \"Makinist trenin önünde dolaştı, rayları elleriyle yokladı.\" Satırı İlhan Bey'e okudu.",
        "Yaşlı adam bir süre sustu. Sonra yavaşça başını salladı. \"Biz öyle yapardık,\" dedi. \"Kar yağınca makas donar. Elinle dokunmadan anlayamazsın.\" Sesinde eski bir gurur vardı.",
        "Defne o gece defterine uzun bir paragraf yazdı. İlhan Bey'in sözlerini aynen aktarmaya çalıştı. Ama sonra durdu. Yazdıklarının bir kısmı kendi tahminiydi, İlhan Bey'in söyledikleri değildi.",
        "O kısımları dikkatle ayırdı. Duyduklarını tırnak içine aldı, kendi düşüncelerini ayrı satırlara yazdı. Başkasının hikâyesini anlatırken ona kendi sözlerini söyletmemek gerektiğini hissetti.",
      ],
    },
    {
      title: "Erzincan'da Kar",
      paragraphs: [
        "Öğleye doğru tren Erzincan ovasına girdi. Defne pencereden dışarı baktığında nefesini tuttu. Göz alabildiğine her yer beyazdı. Uzaktaki dağlar gökyüzüyle aynı rengi almıştı.",
        "Zeynep koşarak geldi ve burnunu cama dayadı. \"Bu kadar kar nereden geldi?\" diye sordu. Annesi gülerek \"Gökyüzünden,\" dedi. Zeynep bu cevabı yeterli bulmadı ve İlhan Bey'e döndü.",
        "İlhan Bey çocuğun sorusunu ciddiye aldı. Bulutlardaki su damlalarının soğukta donarak kar tanesine dönüştüğünü anlattı. Her kar tanesinin altı kollu olduğunu ama hiçbirinin diğerine tam benzemediğini söyledi.",
        "Zeynep şaşkınlıkla gözlerini açtı. Defne de bunu bilmiyordu. Anneannesinin Erzincan sayfasını açtı. Orada yalnız tek bir kelime vardı, büyük harflerle yazılmış: \"BEYAZ.\"",
        "Defne önce bunu tuhaf buldu. Sonra pencereye tekrar baktı. Gördüğü manzarayı anlatmaya yetecek başka bir kelime bulamadı. Anneannesi belki de aynı çaresizliği yaşamıştı.",
        "Kendi defterine bir şey yazmadan önce uzun süre dışarıyı izledi. Telgraf direklerinin üstündeki karı, ovanın ortasındaki tek bir ağacı, uzaktan geçen bir köpeği fark etti.",
        "Sonra yazmaya başladı. Beyazın içindeki küçük ayrıntıları tek tek sıraladı. Anneannesinin tek kelimesine kendi on cümlesini ekledi. İki sayfa yan yana okununca, aynı manzara iki farklı gözle görülmüş gibiydi.",
        "Dayısı omzunun üstünden okudu. \"Anneannen sana bir boşluk bırakmış,\" dedi. \"Sen de onu dolduruyorsun.\" Defne bunun bir ödev değil, bir sohbet gibi olduğunu düşündü.",
      ],
    },
    {
      title: "Defterdeki Boşluk",
      paragraphs: [
        "Öğleden sonra Defne defterin son sayfalarını yeniden okudu. \"Kars'ta onu bekleyecektim\" cümlesi aklından çıkmıyordu. Kimi bekleyecekti? Bekleyebilmiş miydi? Hiçbir cevap yoktu.",
        "Annesine bir mesaj yazdı. Anneannesinin gençliğinde Kars'ta tanıdığı biri olup olmadığını sordu. Annesinin cevabı bir saat sonra geldi: \"Bilmiyorum. Ama teyzene sordum, o bir isim hatırlıyor.\"",
        "Teyzesinin hatırladığı isim Selma'ydı. Nermin Hanım'ın öğretmen okulundan en yakın arkadaşı. Selma mezun olunca Kars'a atanmış, iki arkadaş yıllarca mektuplaşmıştı. Sonra mektuplar bir gün kesilmişti.",
        "Defne heyecanlandı. Belki de anneannesi Selma'yı görmek için yola çıkmıştı. Ama sonra kendini durdurdu. Bu da İlhan Bey'in hikâyesindeki gibi bir tahmindi. Elinde yalnız bir isim ve yarım bir cümle vardı.",
        "İlhan Bey'e durumu anlattı. Yaşlı adam dikkatle dinledi. \"Bir hikâyenin boşluğunu doldurmak istemek doğaldır,\" dedi. \"Ama boşluğu uydurmayla doldurursan, o artık onun hikâyesi olmaz.\"",
        "Defne bu sözleri defterine yazdı. Sonra yeni bir sayfa açtı ve iki sütun çizdi. Bir sütuna bildiklerini yazdı: Selma adı, mektuplar, Kars'a atanma. Öteki sütuna tahminlerini yazdı.",
        "Tahmin sütunu çok daha uzundu. Bu onu biraz şaşırttı. Bir hikâyeyi bilmek ile onu kurmak arasında ne kadar fark olduğunu ilk kez bu kadar açık gördü.",
        "Annesine yeniden yazdı ve Selma Hanım'ın ailesine ulaşmanın bir yolu olup olmadığını sordu. Annesi okulun eski mezunlar derneğini arayacağını söyledi. Defne telefonu kapattı ve pencereye döndü.",
      ],
    },
    {
      title: "Sarıkamış Ormanı",
      paragraphs: [
        "Güneş batmaya yakınken tren Sarıkamış'ın çam ormanlarından geçiyordu. Ağaçların dalları karın ağırlığıyla aşağı eğilmişti. Son ışıklar karın üstüne turuncu bir renk bırakıyordu ve Defne gözlerini pencereden ayıramadı.",
        "Anneannesinin bu sayfası diğerlerinden uzundu. Ormanı, karın sessizliğini ve bir istasyon görevlisinin el sallayışını anlatmıştı. Sayfanın sonunda şöyle yazıyordu: \"Az kaldı. Kalbim hızlı atıyor.\"",
        "Defne bu cümleyi okuyunca anneannesini ilk kez genç bir kız olarak hayal etti. Gözlüklü, bulmaca çözen kadın değil, heyecandan yerinde duramayan on dokuz yaşında biri. Aralarındaki yaş farkı birden küçüldü.",
        "O sırada telefonu titredi. Annesi yazmıştı: \"Dernek Selma Hanım'ın kızına ulaştı. Adı Leyla. Kars'ta yaşıyor. Seninle garda buluşmak istiyor.\" Defne mesajı üç kez okudu.",
        "Dayısına gösterdi. Murat da şaşırmıştı. İlhan Bey ise sadece gülümsedi. \"Tren her istasyonda biraz insan alır,\" dedi. \"Bazen de elli yıl önce bırakılmış birini.\"",
        "Defne'nin kalbi hızlı atmaya başladı. Anneannesinin cümlesini düşündü ve kendi defterine aynı cümleyi yazdı: \"Az kaldı. Kalbim hızlı atıyor.\" Bu kez tırnak işareti koymadı. Çünkü bu cümle artık ikisine de aitti.",
        "Zeynep, Defne'nin heyecanını fark etti ve ne olduğunu sordu. Defne ona kısaca anlattı. Küçük kız bir süre düşündü, sonra ciddi bir yüzle \"Belki de anneannen seni bu trene bindirmek için yazdı,\" dedi.",
        "Defne buna ne cevap vereceğini bilemedi. Ama cümleyi defterinin kenarına küçük harflerle not etti. Zeynep'in sözünü kendi tahmin sütununa değil, ayrı bir köşeye, \"Zeynep'in fikri\" başlığıyla yazdı.",
      ],
    },
    {
      title: "Kars Garı",
      paragraphs: [
        "Tren Kars Garı'na akşam karanlığında girdi. Peron karla kaplıydı, lambaların altında hava keskin bir soğuktu. Defne bavulunu dayısına bırakıp ilk inenler arasında yer aldı.",
        "Peronun ucunda kırmızı bereli, orta yaşlı bir kadın bekliyordu. Elinde eski bir zarf vardı. Defne'yi görünce tereddütle el salladı. \"Sen Nermin Hanım'ın torunu olmalısın,\" dedi. \"Gözlerin ona benziyor.\"",
        "Leyla Hanım zarfı uzattı. İçinde soluk mavi bir mektup vardı. Mektup Nermin Hanım'ın el yazısıyla yazılmıştı ve tarihi o şubat ayını gösteriyordu. Selma Hanım onu ömrü boyunca saklamıştı.",
        "Gar binasının içinde, sobanın yanında oturdular. Leyla Hanım hikâyenin kendi bildiği kısmını anlattı. Nermin Hanım gerçekten Kars'a gelmiş, iki arkadaş üç gün birlikte kalmıştı. Sonra hayat ikisini farklı şehirlere taşımıştı.",
        "Mektuplar neden kesilmişti? Leyla Hanım bunu bilmiyordu. Defne bu soruyu cevapsız bırakmaya karar verdi. Bazı boşlukların öyle kalması gerektiğini, yolculuk boyunca öğrenmişti.",
        "Vedalaşırken İlhan Bey yanlarına geldi. Termosundan son bir çay koydu. \"Yolu dinledin,\" dedi Defne'ye. \"Acele etmedin. Hikâye de sana kendini anlattı.\"",
        "Dönüş treninde Defne iki defteri yan yana açtı. Anneannesinin defterinde boş kalan son sayfaya kendi el yazısıyla bir satır ekledi: \"Kars'ta seni bekleyen birinin kızı, mektubunu hâlâ saklıyordu.\"",
        "Sonra kendi defterini kapattı. Kapağına kalın harflerle bir başlık yazdı: \"Doğu Ekspresi Defteri, ikinci cilt.\" Pencerede yine kendi yüzü yansıyordu. Ama bu kez yalnız değildi.",
      ],
    },
  ],
  glossary: [
    { word: "kompartıman", definition: "Trende birkaç yolcunun oturduğu, kapısı koridora açılan küçük bölümdür." },
    { word: "makinist", definition: "Treni süren ve yolculuk boyunca lokomotiften sorumlu olan kişidir." },
    { word: "peron", definition: "İstasyonda yolcuların trene binip indiği, rayların yanındaki yüksek yerdir." },
    { word: "makas", definition: "Demir yolunda trenin bir raydan başka bir raya geçmesini sağlayan düzenektir." },
    { word: "tereddüt", definition: "Bir şeyi yapıp yapmamakta kararsız kalmaktır." },
    { word: "tahmin", definition: "Kesin bilgiye dayanmadan, ipuçlarından yola çıkarak varılan düşüncedir." },
    { word: "cilt", definition: "Birbirini izleyen kitap ya da defterlerden her biridir." },
  ],
  optionalReflectionPrompt:
    "Bir hikâyede bildiklerinle tahmin ettiklerini ayırmak, onu anlatma biçimini nasıl değiştirir?",
  sourceTruth,
  contentQualityReview: createPendingContentQualityReview("lise_okuma_16_18"),
};

// Timing follows the actual reading body, excluding headings and glossary.
const body = DOGU_EKSPRESI_DEFTERI_DRAFT.sections
  .flatMap((section) => section.paragraphs).join(" ");
DOGU_EKSPRESI_DEFTERI_DRAFT.wordCount =
  body.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
DOGU_EKSPRESI_DEFTERI_DRAFT.estimatedSeconds = Math.ceil(
  DOGU_EKSPRESI_DEFTERI_DRAFT.wordCount * 60 / 155,
);
DOGU_EKSPRESI_DEFTERI_DRAFT.declaredSeconds =
  DOGU_EKSPRESI_DEFTERI_DRAFT.estimatedSeconds;
