const normalize = (text) => text.replace(/\s+/gu, " ").trim();

export const FIRST_GROUP_GUIDED_SESSION = {
  id: "okurio-1-grup-ses-bahcesi",
  baslik: "Oki ile Ses Bahçesi",
  yazar: "Okurio Özgün İçerik Ekibi",
  seslendiren: "Okurio Sakin Rehber",
  kategori: "1. Grup Rehberli Okuma Oturumu",
  yas: "6-7 yaş",
  renk: ["#315B52", "#8FC2A9"],
  puan: 5,
  sureDk: 4,
  icerikDurumu: "tam-oturum",
  hakDurumu: "okurio-ozgun",
  contentQualityReview: { status: "approved", note: "2026-08-07: İlk Harfler ve Heceler (6-7 yaş) okuma yolunda onaylı tam-okuma örneği eksikti; bu mevcut, önceden yazılmış oturum onay için işaretlendi. 2026-08-07: Reyhan Açar tarafından gözden geçirildi ve onaylandı." },
  kaynak: {
    ad: "Okurio Özgün Rehberli Okuma Serisi",
    tur: "özgün",
    hakSahibi: "Okurio",
    surum: "1.0",
  },
  ozet:
    "Oki ve Lili, ilk grup seslerini bulur. Çocuk ses, hece, kelime ve kısa cümle çalışmalarına katılır.",
  bolumler: [
    {
      ad: "Bahçeye Giriş",
      dk: 1,
      metin: normalize(`
        Oki sabah erkenden Ses Bahçesi'ne geldi ve Lili onu karşıladı.
        Bugün altı tanıdık sesi birlikte çalışacaklardı.
        Bu sesler a, n, e, t, i ve l idi.
        Oki omuzlarını gevşetti ve burnundan sakin bir nefes aldı.
        Lili aynı hareketi yaptı ve onlar hazır olunca kapı açıldı.
        Kapının üstünde büyük bir a vardı ve açık ağızla söyleniyordu.
        Oki sesi uzatarak söyledi ve Lili bahçede aynı sesi aradı.
        Ağacın altında kırmızı bir araba gördü.
        Araba sözcüğü a sesiyle başlıyordu.
        Oki, arı resmini de hemen buldu.
        Arı sözcüğü yine a sesiyle başlıyordu.
        Şimdi sen de a sesini söyle.
        Sesini kısa tutabilir veya uzatabilirsin.
        Her iki söyleyiş de çalışmaya uygundur.
        Oki gülümsedi ve sıradaki taşı çevirdi.
      `),
    },
    {
      ad: "Sesleri Bul",
      dk: 1,
      metin: normalize(`
        Taşın altında ince bir n çizgisi vardı.
        N sesi burundan gelen yumuşak bir sesti.
        Lili, nar resmini yeşil yaprağa koydu.
        Oki, n sesiyle başlayan başka sözcük düşündü.
        Aklına nazik sözcüğü geldi ve herkes daha rahat hissetti.
        Sonraki taşta yuvarlak bir e vardı.
        E sesi kısa ve temiz duyuluyordu.
        Ekin resmi taşın yanında parlarken Lili el sözcüğünü söyledi.
        El sözcüğünde iki ses vardı.
        Önce e, sonra l duyuluyordu.
        Oki iki kartı yan yana getirdi.
        Kartlar birleşince el sözcüğü oluştu.
        Şimdi sen de iki sesi birleştir.
        Önce e de, sonra l de.
        Ardından ikisini beklemeden birlikte söyle.
        Harika, artık bir sözcük okudun.
        Lili küçük zili bir kez çaldı.
        Bu zil yarış için çalmıyordu.
        Zil yalnızca emeği fark ediyordu.
      `),
    },
    {
      ad: "Heceler Köprüsü",
      dk: 1,
      metin: normalize(`
        Bahçenin ortasında renkli bir köprü uzanıyordu.
        Her köprü taşı küçük bir hece taşıyordu.
        İlk taşta an hecesi yazıyordu.
        Oki a sesini gösterip n sesini parmağıyla izledi.
        İki ses birleşince an hecesi duyuldu.
        İkinci taşta en hecesi vardı.
        Lili e ve n seslerini birleştirdi.
        Üçüncü taşta at sözcüğü duruyordu.
        Oki a ve t seslerini okudu.
        Sonra resimdeki beyaz ata baktı.
        At otlarda yürürken dördüncü taşta in hecesi vardı.
        Lili heceyi okuyunca küçük merdiven belirdi.
        Merdivenin yanında in sözcüğü yazıyordu.
        Oki merdivenden iki basamak indi.
        Sonra aynı sözcüğü yeniden okudu.
        Bir sözcük bazen bir hareket anlatıyordu.
        Bu bağlantı okumayı anlamlı yapıyordu.
        Köprünün sonunda altı kart bekliyordu.
        Kartlarda al, an, at, el, en, in yazıyordu.
        İstersen kartları sırayla veya önce bildiğin karttan okuyabilirsin.
        Her seçim seni köprünün sonuna götürür.
      `),
    },
    {
      ad: "Kısa Cümle Yolu",
      dk: 1,
      metin: normalize(`
        Köprünün ardından kısa cümle yolu başladı.
        İlk tabelada Ela ata el salla yazıyordu.
        Oki cümleyi küçük parçalara ayırdı.
        Önce Ela adını yavaşça okudu.
        Sonra ata bölümünü tek nefeste söyledi.
        En son el salla sözlerini okudu.
        Bütün parçalar birleşince cümle tamamlandı.
        Lili hayali ata gerçekten el salladı.
        İkinci tabelada Ali elma al yazıyordu.
        Ali önce sepete dikkatle baktı.
        Sepette iki tane taze elma vardı.
        Oki cümledeki al sözcüğünü gösterdi.
        Aynı sözcük köprüde de karşılarına çıkmıştı.
        Tanıdık sözcük şimdi daha kolay görünüyordu.
        Üçüncü tabelada Nine nane al yazıyordu.
        Lili nane yaprağını koklamayı düşündü.
        Yaprağın kokusu serin bir bahçeyi hatırlattı.
        Şimdi üç cümleden birini seç.
        Seçtiğin cümleyi kendi hızında oku.
        Takılırsan önce ilk sesi bul.
        Sonra sesleri sakince yan yana getir.
        Oki ve Lili seni bekliyor.
        Burada hızlı olmak hiç gerekmiyor.
        Anlamak ve denemek yeterli oluyor.
      `),
    },
    {
      ad: "Bahçe Rozeti",
      dk: 1,
      metin: normalize(`
        Yolun sonunda küçük bir sandık duruyordu.
        Sandığın kapağında altı ses yeniden parladı.
        Oki sesleri sırayla işaret etti.
        A, n, e, t, i ve l.
        Lili bugün öğrendiklerini birlikte hatırladı.
        Önce sesleri dinlediler ve söylediler.
        Sonra iki sesi birleştirip hece yaptılar.
        Heceler birleşince kısa sözcükler oluştu.
        Sözcükler de anlamlı cümlelere dönüştü.
        Sandığın içinden yaprak biçimli rozet çıktı.
        Rozetin üstünde Bugün denedim yazıyordu.
        Bu rozet kusursuz okuyanlara değil, çalışan herkese aitti.
        Oki rozeti çantasına dikkatle yerleştirdi.
        Lili en sevdiği sözcük olarak naneyi seçti.
        Oki ise elma sözcüğünü seçti.
        Sen de sevdiğin sözcüğü düşünebilirsin.
        İstersen sözcüğü bir kâğıda yazabilirsin.
        İstersen yalnızca sesli söyleyebilirsin.
        Bugünkü okuma yolculuğu burada tamamlandı.
        Gözlerin ve zihnin şimdi dinlenebilir.
        Hazır olduğunda bahçeye yeniden gelebilirsin.
      `),
    },
  ],
};

export const LILI_SEED_MAP_STORY = {
  id: "okurio-lili-kayip-tohum-haritasi",
  baslik: "Lili'nin Kayıp Tohum Haritası",
  yazar: "Okurio Özgün Hikâyeler",
  seslendiren: "Okurio Anlatıcı",
  kategori: "Okurio Tam Hikâyeleri",
  yas: "6-7 yaş",
  renk: ["#6A4C78", "#C89FC9"],
  puan: 5,
  sureDk: 4,
  icerikDurumu: "tam-metin",
  hakDurumu: "okurio-ozgun",
  contentQualityReview: { status: "approved", note: "2026-08-07: İlk Harfler ve Heceler (6-7 yaş) okuma yolunda onaylı tam-okuma örneği eksikti; bu mevcut, önceden yazılmış hikâye onay için işaretlendi. 2026-08-07: Reyhan Açar tarafından gözden geçirildi ve onaylandı." },
  kaynak: {
    ad: "Okurio Özgün Hikâye Serisi",
    tur: "özgün",
    hakSahibi: "Okurio",
    surum: "1.0",
  },
  ozet:
    "Lili, kaybolan ayçiçeği tohumlarını sakin bir planla arar. Arkadaşları ipuçlarını okuyup ona yardım eder.",
  bolumler: [
    {
      ad: "Boş Kese",
      dk: 1,
      metin: normalize(`
        Lili bahçe kulübesine koştu, çünkü bugün ayçiçeği tohumlarını ekecekti.
        Küçük keseyi raftan aldı, fakat kese çok hafifti.
        Lili keseyi açınca içeride tek tohum bile bulamadı.
        Kalbi hızlı çarptı ve keseyi dün buraya koyduğunu hatırladı.
        Belki rüzgâr keseyi yere düşürmüştü.
        Belki Toto yanlışlıkla başka yere taşımıştı.
        Lili bağırmadan önce çevresine dikkatle bakmaya karar verdi.
        Rafın altında küçük bir kâğıt gördü.
        Kâğıtta yeşil bir yaprak çizilmişti.
        Yaprağın yanında kısa bir not vardı.
        İlk iz, suyun şarkısını dinler yazıyordu.
        Lili notu iki kez yavaşça okudu.
        Suyun şarkısı çeşmeden geliyor olabilirdi.
        Kesesini cebine koyup dışarı çıktı.
        Tam o sırada Oki kapıda belirdi.
        Lili ona boş keseyi gösterdi.
        Oki yardım etmeyi hemen kabul etti.
        İkisi çeşmeye doğru birlikte yürüdü.
      `),
    },
    {
      ad: "Çeşmedeki İz",
      dk: 1,
      metin: normalize(`
        Çeşmenin suyu taşlara ince ince akıyordu.
        Lili suyun sesini bir süre dinledi.
        Oki çevredeki yaprakları tek tek inceledi.
        Mavi taşın altında sarı ip gördü.
        İpin ucunda ikinci bir not bağlıydı.
        Notta uzun kulaklı dostu bul yazıyordu.
        Bahçede uzun kulaklı tek dost Mino'ydu.
        Mino havuç tarlasının yanında çalışıyordu.
        Lili ve Oki ona doğru yürüdü.
        Mino gelen arkadaşlarına sevinçle el salladı.
        Lili boş keseyi ve notları anlattı.
        Mino sabah yerde tohumlar gördüğünü söyledi.
        Tohumlar küçük bir çizgi oluşturmuştu.
        Çizgi eski köprüye doğru uzanıyordu.
        Mino katıldı ve üç arkadaş köprüye doğru yürüdü.
        Yürürken yerdeki izleri dikkatle aradılar.
        Bir taşın yanında iki tohum buldular.
        Lili tohumları kesesine özenle koydu.
        Bu küçük buluş ona umut verdi.
        Yol doğru görünüyordu, fakat henüz bitmemişti.
        Köprünün girişinde çamurlu ayak izleri vardı.
        İzler küçük ve yuvarlaktı, Oki onları daha önce görmüştü.
      `),
    },
    {
      ad: "Köprüdeki Karışıklık",
      dk: 1,
      metin: normalize(`
        Yuvarlak izler Toto'nun ayakkabılarına benziyordu.
        Lili bir an onun aldığını düşündü.
        Önce Toto'ya sormanın daha doğru olduğuna karar verdi.
        Arkadaşlar köprüyü geçince çiçek sulayan Toto'yu gördü.
        Lili ona boş keseyi sakince gösterdi.
        Tohumları görüp görmediğini açıkça sordu.
        Toto sabah keseyi yerde bulmuştu.
        Kese yırtılmış, tohumlar yola saçılmıştı.
        Toto kalan tohumları toplamaya çalışmıştı.
        Sonra onları güvenli bir kutuya koymuştu.
        Bu yüzden yerleri gösteren küçük notlar bırakmıştı.
        Lili gerçeği duyunca derin nefes aldı.
        Toto'yu suçlamadığı için sevindi.
        Toto kutuyu söğüt ağacına saklamıştı.
        Son ipucu ağacın yakınında olmalıydı.
        Arkadaşlar ağaca yürürken dallar rüzgârla yavaşça sallanıyordu.
        Gövdenin yanında tahta bir ok vardı.
        Ok, büyük taşın arkasını gösteriyordu.
        Mino taşı tek başına kaldıramadı.
        Arkadaşlar birlikte itmeye karar verdi.
      `),
    },
    {
      ad: "Bulunan Tohumlar",
      dk: 1,
      metin: normalize(`
        Oki önce herkes için güvenli yer seçti.
        Sonra dördü taşı yavaşça itti.
        Taşın arkasında mor bir kutu belirdi.
        Lili kutunun kapağını heyecanla açtı.
        Tohumların çoğu kutunun içinde duruyordu.
        Toto onları kuru yapraklarla korumuş, Lili de içtenlikle teşekkür etmişti.
        Toto da durumu geç anlattığı için üzüldü.
        Birlikte, bulunan eşyalar için daha açık bir plan yaptılar.
        Notta eşyanın yerini de yazacaklardı.
        Lili sayınca yalnızca üç tohumun hâlâ kayıp olduğunu gördü.
        Mino köprü yolundaki iki tohumu getirdi.
        Oki son tohumu Toto'nun kovasında gördü.
        Son tohum kovaya yapışmıştı, böylece tümü tamamlandı.
        Lili boş kesenin yırtığını da buldu.
        Deliği mor bir kumaşla kapattı.
        Artık tohumlar saçılmayacaktı ve arkadaşlar bahçeye dönmeye hazırlandı.
        Herkes küçük bir görev seçti.
        Oki toprağı, Mino suyu hazırladı.
        Toto da tahta işaretleri getirdi.
      `),
    },
    {
      ad: "Sarı Çiçek Sözü",
      dk: 1,
      metin: normalize(`
        Bahçede dört küçük çukur açtılar.
        Lili her çukura birkaç tohum bıraktı.
        Mino tohumların üstünü toprakla örttü.
        Oki toprağı avucuyla hafifçe düzeltti.
        Toto sulama kabını dikkatle eğdi.
        Su, toprağın üstünde minik halkalar yaptı.
        Lili düşündü, çünkü boş keseyi görünce önce korkmuştu.
        Sonra ipuçlarını sırayla takip etmişti.
        Arkadaşlarına soru sormak işini kolaylaştırmıştı.
        Tahmin ile gerçeği ayırmayı da öğrenmişti.
        Toto iyi bir çözüm bulmuştu.
        Fakat açık bir haber daha faydalı olurdu.
        Hepsi birbirini dikkatle dinlemişti.
        Bu yüzden sorun birlikte çözülmüştü.
        Lili tahta işarete kısa bir söz yazdı.
        Burada sabırla bulunan tohumlar büyüyor.
        İşareti yeni ekilen toprağa yerleştirdi.
        Oki sarı çiçekleri hayal etti ve Mino gökyüzünü düşündü.
        Toto ilk çiçeği birlikte izleyeceklerini söyledi.
        Lili boş keseyi cebine koydu.
        Artık kese ona güzel bir günü hatırlatıyordu.
        Dört arkadaş kulübeye gülerek döndü.
      `),
    },
  ],
};

export const COMPLETE_OKURIO_SESSIONS = [
  FIRST_GROUP_GUIDED_SESSION,
  LILI_SEED_MAP_STORY,
];

export function okurioSessionIntegrity(session, wordsPerMinute = 155) {
  const text = session.bolumler.map((section) => section.metin).join(" ").trim();
  const words = text.split(/\s+/u).filter(Boolean);
  const sentences = text
    .split(/[.!?]+/u)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
  const sentenceWordCounts = sentences.map(
    (sentence) => sentence.split(/\s+/u).filter(Boolean).length,
  );

  return {
    wordCount: words.length,
    actualMinutes: words.length / wordsPerMinute,
    sentenceCount: sentences.length,
    averageSentenceWords:
      sentenceWordCounts.reduce((total, count) => total + count, 0) /
      sentenceWordCounts.length,
    longestSentenceWords: Math.max(...sentenceWordCounts),
    isOriginal: session.hakDurumu === "okurio-ozgun" && session.kaynak?.tur === "özgün",
  };
}
