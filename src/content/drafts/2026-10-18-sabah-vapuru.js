import { createPendingContentQualityReview } from "../contentQualityReview.js";

const sourceTruth = Object.freeze({
  work: "Sabah Vapuru",
  scope: "Okurio için okumaya geri dönen yetişkin okura özgün kısa hikâye",
  sourceType: "original",
  rightsHolder: "Okurio",
  adaptationStatus: "not-applicable",
  verificationStatus: "pending-human-review",
  references: [],
});

export const SABAH_VAPURU_DRAFT = {
  id: "sabah-vapuru-draft",
  title: "Sabah Vapuru",
  language: "tr",
  ageBand: "18+",
  readingPathId: "yetiskin_odak_18",
  contentTrack: "okurio-original-pilot",
  primaryTheme: "Okuma alışkanlığı kusursuz günlerle değil, yeniden başlama cesaretiyle kurulur",
  contentStatus: "draft",
  structuralValid: true,
  releaseReady: false,
  estimatedWordsPerMinute: 155,
  sections: [
    {
      title: "Yedi Kırk Vapuru",
      paragraphs: [
        "Selin her sabah yedi kırk vapuruna yetişmek için evden koşarak çıkardı. Kadıköy iskelesine vardığında nefesi hızlanmış, saçı dağılmış olurdu. Vapura biner binmez cam kenarında boş bir yer arardı.",
        "Oturduğu anda elini çantasına atar ve telefonunu çıkarırdı. Önce iş e-postalarına bakar, sonra haberleri kaydırırdı. Ardından kısa videolar başlar, yolculuk bir göz kırpımında biterdi.",
        "Selin bir muhasebe bürosunda çalışıyordu. Gün boyu sayılar, tablolar ve faturalarla uğraşıyordu. İşini seviyordu, fakat akşamları zihni dağınık bir çekmece gibi hissediliyordu.",
        "Eskiden çok okurdu. Lisede bir hafta içinde iki roman bitirdiği olurdu. Şimdi bir sayfayı okurken üç kez başa dönüyor, cümlelerin arasında kayboluyordu.",
        "O sabah vapur Haydarpaşa açıklarından geçerken telefonunun şarjı bitti. Ekran karardı ve Selin bir an ne yapacağını bilemedi. Elleri boş kalmıştı, bakışları da ilk kez denize kaydı.",
        "Su gri ve sakindi. Martılar vapurun arkasından aynı mesafeyle uçuyordu. Karşı kıyıda Sarayburnu sabah ışığında yavaşça beliriyordu.",
        "Yanındaki kadın örgü örüyordu. Şişlerin tıkırtısı motor sesine karışıyor, düzenli bir ritim kuruyordu. Selin bu sesi yıllardır duyduğunu, ama hiç dinlemediğini düşündü.",
        "Biraz ileride bir çocuk, babasının omzuna yaslanmış uyukluyordu. Çay ocağından gelen bardak sesleri salonda dolaşıyordu. Her şey sanki her sabah oradaydı, yalnız Selin görmüyordu.",
        "Bir ara elini yine çantasına götürdü. Telefonun kapalı olduğunu hatırlayınca kendi hareketine şaşırdı. Bu alışkanlık ne kadar derine işlemişti?",
        "Selin yirmi dakika boyunca hiçbir şeye dokunmadan oturdu. Önce sıkıldı, sonra garip bir rahatlık hissetti. Karaköy'de inerken başının daha hafif olduğunu fark etti.",
        "İskeleden çıkınca kalabalığın arasında bir an durdu. Herkes telefonuna eğilmiş, hızla yürüyordu. Selin onlara bakarken kendini birkaç gün önceki hâliyle gördü.",
        "Büroya yürürken kendine bir soru sordu. Bu yirmi dakikayı her gün başka türlü geçirse ne olurdu? Cevabı bilmiyordu, ama sorunun aklında kalacağını hissediyordu.",
      ],
    },
    {
      title: "İnce Defter",
      paragraphs: [
        "Akşam eve dönerken Moda'daki küçük kırtasiyeye uğradı. Raflarda kalın ajandalar ve renkli kalemler vardı. Selin hepsine baktı, sonra en basit olanı seçti.",
        "Elinde ince, kahverengi kapaklı bir defter vardı. Sayfaları çizgisizdi ve çantasının ön gözüne rahatça sığıyordu. Kasadaki genç kadın defteri kâğıda sararken gülümsedi.",
        "Eve gelince kitaplığının önünde durdu. Yıllardır okumadığı kitaplar sırtlarını ona dönmüş gibiydi. Uzun romanlara bakınca içinden bir yorgunluk geçti.",
        "Sonunda kısa öykülerden oluşan ince bir kitap seçti. Her öykü yalnız birkaç sayfa sürüyordu. Bunun başlangıç için yeterli olduğunu düşündü.",
        "Defterin ilk sayfasına büyük harflerle bir başlık yazdı: Otuz Sabah. Altına bir kural ekledi. Vapurda telefonu çantada bırakacak, yalnız kitabı ve defteri çıkaracaktı.",
        "Bir kural daha yazdı, çünkü kendini tanıyordu. Her gün ne kadar okuduğunu değil, okurken aklında kalan tek bir cümleyi not edecekti. Sayfa sayısı onun için bir yarışa dönüşmemeliydi.",
        "Bir süre kalemi elinde tutup düşündü. Otuz gün ona hem kısa hem de çok uzun geliyordu. Bir ay boyunca her sabah aynı şeyi yapmayı en son ne zaman başarmıştı?",
        "Mutfaktan bir bardak ıhlamur alıp masaya döndü. Kitabın ilk sayfasını merakla açtı, sonra hemen kapattı. Başlangıcı vapura saklamak istiyordu.",
        "Telefonu birkaç kez titredi. Bir arkadaşı yeni bir dizi önermiş, kardeşi bir fotoğraf göndermişti. Selin mesajlara kısa yanıtlar verdi ve ekranı ters çevirdi.",
        "Defterin geri kalan sayfalarını otuz küçük kutuya böldü. Her kutunun köşesine bir tarih koydu. Boş kutulara bakınca hem heyecanlandı hem de biraz korktu.",
        "Yatmadan önce kitabı ve defteri çantasına yerleştirdi. Telefonu ise mutfaktaki prize taktı. Yarın sabah ilk kutuyu doldurabilecek miydi, emin değildi.",
      ],
    },
    {
      title: "İlk Hafta",
      paragraphs: [
        "İlk sabah vapura her zamanki gibi koşarak bindi. Oturduğunda eli alışkanlıkla telefona uzandı. Parmakları cebin fermuarına değince durdu ve kitabı çıkardı.",
        "İlk sayfayı okurken aklı sürekli başka yerlere kaçtı. Bir fatura, bir toplantı, akşam alınacak ekmek. Selin her kaçışta kendini nazikçe kitaba geri çağırdı.",
        "Sekiz dakikada yalnızca dört sayfa okuyabildi. Yine de öykünün ilk sahnesi aklında kalmıştı. Bir kadın, rüzgârda uçan çamaşırlarını toplamaya çalışıyordu.",
        "Defteri açtı ve ilk kutuya kısa bir cümle yazdı. Rüzgâr bazen insanı eve geri çağırır. Cümleyi okuyunca kendi kendine gülümsedi.",
        "İkinci ve üçüncü gün de benzer geçti. Dikkati hâlâ dağılıyordu, ama dönüşler biraz daha kolay oluyordu. Selin, aklının bir kas gibi çalıştığını düşünmeye başladı.",
        "Üçüncü gün küçük bir deney yaptı. Aklı kaçtığında sayfanın kenarına kurşun kalemle minik bir nokta koydu. Vapur Karaköy'e vardığında kenarda yedi nokta birikmişti.",
        "Bu noktalar onu üzmedi, aksine meraklandırdı. Her nokta, dikkatini fark edip geri çağırdığı bir andı. Belki de asıl çalışma tam olarak buydu.",
        "Öğle aralarında da kitabı düşünür olmuştu. Bir müşteri dosyasını incelerken öyküdeki bir cümle aklına geliyordu. Bu, uzun zamandır yaşamadığı bir duyguydu.",
        "Dördüncü gün yanına yaşlı bir adam oturdu. Adamın dizinde gazete vardı, ama hiç açmadı. Bir süre sonra Selin'in kitabına göz ucuyla baktı.",
        "Hafta sonuna geldiğinde defterde beş dolu kutu vardı. Her birinde küçük bir cümle, bir renk ya da bir duygu yazıyordu. Selin defteri kapatırken kendini başarılı hissetti.",
        "Cumartesi sabahı vapura binmedi, ama kitabı yine de açtı. Balkonda bir fincan kahveyle on sayfa okudu. Hafta sonu okumanın da vapurdaki kadar keyifli olabileceğini gördü.",
        "Pazar akşamı yeni haftanın planını yaptı. Her şey yolunda gidiyordu, en azından öyle sanıyordu. Pazartesi sabahı büroda büyük bir yıl sonu kapanışı başlayacaktı.",
      ],
    },
    {
      title: "Kaçırılan Günler",
      paragraphs: [
        "Pazartesi sabahı müdürü erkenden aradı. Bir müşterinin hesaplarında eksik çıkmıştı ve acele edilmesi gerekiyordu. Selin vapurda telefonu elinden hiç bırakamadı.",
        "Salı günü durum daha da karıştı. Vapurda dizüstü bilgisayarını açtı ve tabloları kontrol etti. Kitap çantanın dibinde, defter de onun altında kaldı.",
        "Çarşamba sabahı ise vapuru tamamen kaçırdı. İskeleye vardığında halatlar çözülmüş, vapur kıyıdan ayrılmıştı. Bir sonrakini beklerken yorgunluktan bankta gözlerini kapattı.",
        "Perşembe akşamı eve döndüğünde defteri açtı. Dört boş kutu ona bakıyordu. İçinde tanıdık bir ses yükseldi ve yine yapamadığını söyledi.",
        "Bu ses ona yabancı değildi. Spor salonu üyeliğinde, dil kursunda ve yarım kalan örgüde de aynı sesi duymuştu. Her seferinde ses kazanmış, Selin de vazgeçmişti.",
        "Defterin sayfalarını geriye doğru çevirdi. İlk hafta yazdığı cümleler şimdi ona çok uzakta gibi geliyordu. Rüzgâr, çamaşırlar, kahverengi bir kedi.",
        "O akşam okumak yerine yine telefonda video izledi. Saatler geçti ve yatağa yorgun ama huzursuz girdi. Uyumadan önce tavana bakarken ne kaybettiğini tam adlandıramadı.",
        "Cuma sabahı alarmı duymamış, aceleyle giyinmişti. Bütün hafta sanki elinden bir ip kayıp gitmişti. Selin bu ipi yeniden tutmak için gücü olup olmadığını bilmiyordu.",
        "Defteri kapatıp kitaplığın üstüne koydu. Belki okumak artık ona göre değildi. Belki hayatı bu tür küçük alışkanlıklar için fazla doluydu.",
        "Cuma sabahı çantasını hazırlarken defterin yerinde olmadığını fark etti. Bir an onu geride bırakmayı düşündü. Sonra omuz silkti ve kitapla birlikte yine çantasına attı.",
        "Neden böyle yaptığını kendisi de tam anlayamadı. Belki vazgeçmek için bile bir son vapur yolculuğu istiyordu. O sabah, dördüncü günde yanına oturan yaşlı adamı yeniden görecekti.",
      ],
    },
    {
      title: "Martılar ve Yaşlı Okur",
      paragraphs: [
        "Yaşlı adam yine aynı sırada oturuyordu. Bu kez elinde gazete değil, kenarları yıpranmış bir kitap vardı. Selin yanına oturunca adam başını kaldırıp selam verdi.",
        "Selin kitabını çıkardı, fakat açamadı. Kapağına bakarken içindeki sesi yeniden duydu. Adam bu duraksamayı fark etti ve kibarca ne okuduğunu sordu.",
        "Selin kısa öykülerden söz etti. Sonra kendini tutamadı ve dört gün boyunca okuyamadığını anlattı. Adam dikkatle dinledi, hiç sözünü kesmedi.",
        "Adının Nuri olduğunu söyledi. Kırk yıl boyunca bir matbaada çalışmıştı. Her sabah bu vapurla Karaköy'e geçer, yolda mutlaka birkaç sayfa okurmuş.",
        "Nuri Bey vapurun arkasındaki martıları gösterdi. Martıların her dalgada düşer gibi alçalıp yeniden yükseldiğini söyledi. Hiçbiri bir dalgada düştü diye uçmayı bırakmıyordu.",
        "Selin martılara uzun uzun baktı. Gerçekten de hiçbiri düz bir çizgide uçmuyordu. Her biri rüzgârla birlikte iniyor, yükseliyor ve yine vapurun peşine takılıyordu.",
        "Nuri Bey matbaadaki günlerinden de söz etti. Yeni başlayan çıraklar ilk haftalarda çok hata yaparmış. Ustası onlara her sabah aynı makineden yeniden başlamayı öğretirmiş.",
        "Hata yapan çırak kovulmazmış, yalnız temiz bir kâğıt alırmış. Nuri Bey bunu anlatırken gülümsedi. Selin ilk kez kendine o çıraklar kadar yumuşak davranabileceğini düşündü.",
        "Kendisinin de yıllar içinde aylarca okumadığı dönemler olduğunu anlattı. Eşini kaybettiği yıl tek bir sayfa bile okuyamamıştı. Sonra bir sabah, yalnız bir paragrafla yeniden başlamıştı.",
        "Selin defterini çıkarıp ona boş kutuları gösterdi. Nuri Bey kutulara uzun uzun baktı. Sonra kutuların boş değil, bekleyen kutular olduğunu söyledi.",
        "Bu cümle Selin'in içinde bir yere yerleşti. Vapur Karaköy'e yanaşırken Nuri Bey kalkıp ceketini düzeltti. Giderken Selin'e bir öneride bulundu ve o öneri ertesi günü değiştirecekti.",
      ],
    },
    {
      title: "Yeniden Başlamak",
      paragraphs: [
        "Nuri Bey'in önerisi basitti. Kaçırılan günleri doldurmaya çalışmamalıydı. Bunun yerine defterde yeni bir sayfa açmalı ve ona bir ad vermeliydi.",
        "Selin o akşam defterin ortasındaki bir sayfayı açtı. Üstüne küçük harflerle yeniden başlamak yazdı. Altına kaçırdığı dört günün tarihini, yanına da nedenlerini not etti.",
        "Nedenleri yazarken kendini suçlamadı. Yıl sonu kapanışı, yorgunluk ve kaçırılan bir vapur vardı. Bunlar hayatın bir parçasıydı, onun zayıflığı değildi.",
        "Sonra kurallarına bir madde ekledi. Kötü bir sabah gelirse kitaptan yalnızca tek bir paragraf okuyacaktı. Tek paragraf da kutuya yazılacak kadar değerliydi.",
        "Ertesi sabah vapurda yine aceleyle telefona bakması gereken bir mesaj geldi. Selin mesajı yanıtladı, ardından telefonu çantasına koydu. Kitabı açtı ve yalnız bir paragraf okudu.",
        "Paragrafta yaşlı bir terzi, bir düğmeyi sabırla iliğine geçiriyordu. Selin o küçük sahneyi gün boyu aklında taşıdı. Akşam deftere sadece bir düğme, bir sabır yazdı.",
        "Kutuya o günün tarihini yazarken bir şey dikkatini çekti. Yeni kutular eskilerin hemen yanına diziliyordu. Arada boşluk kalmış, ama yol kesilmemişti.",
        "Ertesi gün büroda bir iş arkadaşı masasındaki deftere baktı. Ne yazdığını sordu, Selin de kısaca anlattı. Arkadaşı kendisinin de yıllardır roman okumadığını itiraf etti.",
        "O hafta Nuri Bey'i iki kez daha gördü. Konuşmadan yan yana okudular, yalnız iskelede vedalaştılar. Bu sessiz arkadaşlık Selin'e iyi geliyordu.",
        "Bir akşam annesi telefonda sesinin daha sakin geldiğini söyledi. Selin buna güldü, ama içten içe sevindi. Değişimi başkalarının da duyması ona güç verdi.",
        "Sonraki günlerde kutular yeniden dolmaya başladı. Bazı sabahlar on sayfa okudu, bazı sabahlar tek paragraf. İkisini de aynı özenle not etti.",
        "Selin bir şeyi fark etmeye başlamıştı. Dikkati artık daha az kaçıyor, kaçtığında daha çabuk geri dönüyordu. Yine de yolculuğun en zor sabahı henüz gelmemişti.",
      ],
    },
    {
      title: "Fırtınalı Sabah",
      paragraphs: [
        "Yirmi ikinci günün sabahı rüzgâr lodostan esiyordu. İskelede insanlar paltolarına sarılmış, vapurun gelmesini bekliyordu. Deniz koyu yeşil ve dalgalıydı.",
        "Vapur hareket edince sarsıntı başladı. Kitabın satırları gözünün önünde kayıyordu. Selin birkaç kez denedi, ama bir cümleyi bile sonuna kadar okuyamadı.",
        "Salonda insanlar tutunacak yer arıyordu. Çay ocağındaki görevli bardakları dikkatle tepsiye diziyor, kimseye çay vermiyordu. Camlara vuran su damlaları dışarıyı bulanıklaştırmıştı.",
        "Yanındaki genç adam yüksek sesle oyun oynuyordu. Ekrandan gelen sesler dalgaların gürültüsüne karışıyordu. Selin bir an rahatsız oldu, sonra derin bir nefes aldı.",
        "Eski Selin bu noktada kitabı kapatır ve telefona dönerdi. Bu kez elini çantaya uzatmadı. Onun yerine kitabı dizine koyup gözlerini kısa bir süre kapattı.",
        "Sonra az önce okumaya çalıştığı sayfayı hatırlamaya çalıştı. Öyküde bir çocuk, yağmurda eski bir bisikleti tamir ediyordu. Selin sahneyi zihninde adım adım yeniden kurdu.",
        "Çocuğun ellerindeki yağı, zincirin sesini ve ıslak kaldırımı düşündü. Okumadan da bir metinle birlikte kalınabileceğini fark etti. Bu, sayfaları çevirmek kadar gerçek bir okumaydı.",
        "Karaköy'e vardıklarında rüzgâr biraz dinmişti. Selin iskeledeki bir bankta oturdu ve kalan iki sayfayı orada okudu. Büroya beş dakika geç kaldı, ama içi rahattı.",
        "Öğle arasında Nuri Bey'i düşündü. O da bu fırtınalı sabahta vapurda mıydı, merak etti. Belki o da bir yerde sayfalarını sabırla bekletiyordu.",
        "Akşam deftere o sabahı uzun uzun yazdı. Dalgaların arasında da bir öyküde kalınabilirdi. Bu cümlenin altını iki kez çizdi.",
        "Ertesi günler daha sakin geçti. Bir sabah kitabın son öykülerine başladığını fark etti. Kalan sayfaların inceliği ona hem sevinç hem de hafif bir hüzün verdi.",
        "Defteri kapatırken sayfaları saydı. Önünde sekiz kutu kalmıştı. Selin otuzuncu sabah için küçük bir plan yapmaya karar verdi.",
      ],
    },
    {
      title: "Otuzuncu Gün",
      paragraphs: [
        "Otuzuncu sabah Selin evden koşmadan çıktı. On dakika erken kalkmış, iskeleye yürüyerek gelmişti. Elinde iki simit, çantasında kitabı ve defteri vardı.",
        "Nuri Bey her zamanki yerinde oturuyordu. Selin simitlerden birini ona uzattı. Yaşlı adam gülümseyerek aldı ve defterin ne durumda olduğunu sordu.",
        "Selin defteri açtı ve ona gösterdi. Kutuların çoğu doluydu, aralarda yeniden başlamak sayfası duruyordu. Nuri Bey o sayfayı uzun süre inceledi.",
        "Defterin en değerli sayfasının bu olduğunu söyledi. Dolu kutular yolu gösteriyordu, ama bu sayfa yolun nasıl sürdüğünü anlatıyordu. Selin ilk kez buna hak verdi.",
        "Vapur kalktığında ikisi de bir süre konuşmadan simitlerini yedi. Deniz o sabah düz ve parlaktı. Kadıköy kıyısı arkalarında yavaşça küçülüyordu.",
        "Selin bu otuz günde neyin değiştiğini düşündü. Hâlâ dağınık sabahları vardı, hâlâ telefonu eline aldığı anlar oluyordu. Ama artık geri dönmenin yolunu biliyordu.",
        "Defterin kenarlarındaki minik noktalar bile azalmıştı. Bir sayfada artık yalnız iki ya da üç nokta oluyordu. Selin bunu bir puan gibi değil, bir iz gibi görüyordu.",
        "O sabah kısa öykü kitabının son öyküsünü bitirdi. Kitabı kapattığında vapur Sarayburnu'nun önünden geçiyordu. Martılar yine aynı mesafeyle arkalarından uçuyordu.",
        "Son kutuya bir cümle yazdı. Okumak, her gün geri dönmeyi seçmektir. Sonra kalemi defterin arasına bırakıp denize baktı.",
        "Karaköy'de inerken Nuri Bey çantasından bir kitap çıkardı. Kalınca bir romandı ve kapağı yıllanmıştı. Ödünç verdiğini, acele etmeden okumasını söyledi.",
        "Selin kitabı aldı ve ağırlığını avucunda hissetti. Bir ay önce bu kalınlık onu korkuturdu. Şimdi ise yeni bir defter almak için akşamı bekliyordu.",
      ],
    },
  ],
  glossary: [
    { word: "iskelesine", definition: "Vapurların yanaştığı, yolcuların inip bindiği kıyı yapısına." },
    { word: "lodostan", definition: "Güneybatıdan esen, denizi dalgalandıran ılık rüzgârdan." },
    { word: "matbaada", definition: "Kitap, gazete gibi basılı işlerin üretildiği iş yerinde." },
    { word: "kapanışı", definition: "Muhasebede bir dönemin hesaplarının kontrol edilip tamamlanması." },
    { word: "iliğine", definition: "Giysideki düğmenin geçirildiği küçük yarığa." },
  ],
  optionalReflectionPrompt:
    "Senin günlük hayatında, Selin'in vapur yolculuğu gibi okumaya ayırabileceğin kısa bir an var mı?",
  sourceTruth,
  originalityRightsReview: {
    status: "pending-human-review",
    notes: "Metin özgün Okurio taslağıdır; insan özgünlük ve hak kontrolü bekliyor.",
  },
  safeguardingLanguageReview: {
    status: "pending-human-review",
    notes: "Yetişkin okur tonu, suçlamayan dil ve kayıp anısının yumuşak anlatımı için insan incelemesi bekliyor.",
  },
  contentQualityReview: createPendingContentQualityReview("yetiskin_odak_18"),
};

// Timing follows the actual reading body, excluding headings and glossary.
const body = SABAH_VAPURU_DRAFT.sections
  .flatMap((section) => section.paragraphs).join(" ");
SABAH_VAPURU_DRAFT.wordCount =
  body.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
SABAH_VAPURU_DRAFT.estimatedSeconds = Math.ceil(
  SABAH_VAPURU_DRAFT.wordCount * 60 / 155,
);
SABAH_VAPURU_DRAFT.declaredSeconds = SABAH_VAPURU_DRAFT.estimatedSeconds;
