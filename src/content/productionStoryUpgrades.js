const normalize = (text) => text.replace(/\s+/gu, " ").trim();

const originalSource = {
  ad: "Okurio Özgün Hikâye Serisi",
  tur: "özgün",
  hakSahibi: "Okurio",
  surum: "2.0",
};

export const PRODUCTION_STORY_UPGRADES = [
  {
    id: "oki-sesleri-dinliyor",
    baslik: "Oki Sesleri Dinliyor",
    yazar: "Okurio Özgün İçerik Ekibi",
    seslendiren: "Oki Anlatıcı",
    kategori: "Minik Dinleme",
    yas: "3-4 yaş",
    renk: ["#5A4B28", "#D7B45E"],
    puan: 4.9,
    sureDk: 3,
    icerikDurumu: "tam-metin",
    hakDurumu: "okurio-ozgun",
    kaynak: originalSource,
    ozet: "Oki, bahçedeki sesleri sırayla dinler; sesleri ayırt etmeyi, beklemeyi ve sakinleşmeyi öğrenir.",
    bolumler: [
      {
        ad: "Sabahın İlk Sesi",
        dk: 1,
        metin: normalize(`
          Oki sabah bahçeye çıktı. Hava serindi. Yaprakların üstünde küçük damlalar vardı.
          Oki önce hiçbir şey söylemedi. Nana, önce kulaklarını dinlenmeye bırak, dedi.
          Oki durdu ve nefes aldı. Uzakta pıt pıt diye bir ses duyuldu.
          Ses, taşa düşen su damlalarından geliyordu. Oki sesi yeniden bekledi.
          Pıt pıt. Bu kez sesi daha açık duydu. Mino da yanına oturdu.
          İkisi konuşmadan suyu dinledi. Oki, sesin hızlı olmadığını fark etti.
          Her damla kendi zamanında düşüyordu. Oki de acele etmeden dinlemeye karar verdi.
        `),
      },
      {
        ad: "Yakındaki ve Uzaktaki",
        dk: 1,
        metin: normalize(`
          Çitin arkasından ince bir cik cik sesi geldi. Oki başını çevirdi.
          Küçük bir kuş dala konmuştu. Kuşun sesi su damlasından daha uzaktaydı.
          Mino ise hemen yanlarında miyav dedi. Bu ses çok yakındı.
          Nana, hangisi yakın, hangisi uzak, diye sordu. Oki önce Mino'yu gösterdi.
          Sonra uzaktaki kuşu işaret etti. Birden rüzgâr yaprakları hışırdattı.
          Üç ses birbirine karıştı. Oki şaşırdı ama gözlerini kapatınca sesleri ayırabildi.
          Önce miyav, sonra cik cik, sonra hışır hışır duydu.
        `),
      },
      {
        ad: "Kaybolan Çıngırak",
        dk: 1,
        metin: normalize(`
          Lili bahçeye küçük çıngırağını getirdi. Fakat oynarken çıngırak çimenlerin arasına düştü.
          Herkes gözleriyle aradı ama bulamadı. Oki bu kez kulaklarını kullanmayı önerdi.
          Lili yavaşça yürüdü. Mino patileriyle çimenleri ayırdı. Toto uzaktan sessizce bekledi.
          Bir adım sonra çok hafif bir şıkır sesi duyuldu. Oki elini kaldırdı.
          Herkes durunca ses yeniden geldi. Şıkır şıkır. Çıngırak, yuvarlak taşın yanındaydı.
          Lili onu bulunca sevindi. Oki, sessizlik bazen önemli bir ipucudur, dedi.
        `),
      },
      {
        ad: "Seslerden Bir Sıra",
        dk: 1,
        metin: normalize(`
          Nana günün sonunda duydukları sesleri hatırlamalarını istedi.
          Oki önce su damlasını söyledi: pıt pıt. Mino kendi sesini ekledi: miyav.
          Lili kuşu taklit etti: cik cik. Toto yaprakları gösterdi: hışır hışır.
          Sonra hepsi sesleri aynı sırayla yeniden söyledi.
          Pıt pıt, miyav, cik cik, hışır hışır. Oki sırayı karıştırınca kimse gülmedi.
          Birlikte baştan başladılar. Bu kez sıra tamamlandı.
          Oki kulaklarının yalnızca ses duymadığını, beklemeye de yardım ettiğini anladı.
          Bahçeden ayrılırken en sevdiği sesi seçti. Onun seçimi, sakin su damlalarıydı.
        `),
      },
    ],
  },
  {
    id: "mino-miyav-dedi",
    baslik: "Mino'nun Yumuşak Miyavı",
    yazar: "Okurio Özgün İçerik Ekibi",
    seslendiren: "Oki Anlatıcı",
    kategori: "Minik Dinleme",
    yas: "3-4 yaş",
    renk: ["#3F5A45", "#8EBD7C"],
    puan: 4.9,
    sureDk: 3,
    icerikDurumu: "tam-metin",
    hakDurumu: "okurio-ozgun",
    kaynak: originalSource,
    ozet: "Mino sesini kaybettiğini sanır; arkadaşlarının yardımıyla farklı duyguların farklı sesleri olduğunu keşfeder.",
    bolumler: [
      {
        ad: "Sessiz Sabah",
        dk: 1,
        metin: normalize(`
          Mino her sabah kapının önünde miyav derdi. O sabah ağzını açtı ama sesi çok küçük çıktı.
          Mino yeniden denedi. Minik bir mii sesi duyuldu. Kendi sesini kaybettiğini sandı.
          Oki yanına gelip telaşlanmamasını söyledi. Nana, bazen sesler uykulu olur, dedi.
          Mino biraz su içti ve boğazını dinlendirdi. Sonra güneşli mindere uzandı.
          Oki onun yanında sessizce oturdu. Bir süre sonra Mino derin bir nefes aldı.
          Bu kez yumuşak bir miyav duyuldu. Ses küçüktü ama oradaydı.
        `),
      },
      {
        ad: "Sesin Duygusu",
        dk: 1,
        metin: normalize(`
          Lili, Mino'nun sesini duyunca sevindi. Mino bir kez daha miyav dedi.
          Bu miyav, sabahkinden daha parlaktı. Toto da farklı sesler denemek istedi.
          Mutlu olduğunda hızlı, üzgün olduğunda yavaş konuştu.
          Nana, sesimizin duygumuzu taşıyabileceğini anlattı. Mino meraklı bir miyav çıkardı.
          Sonra uykulu bir miyav söyledi. Arkadaşları hangisinin hangisi olduğunu buldu.
          Mino sesinin tek biçimi olmadığını anladı. Bazen ince, bazen kalın, bazen de çok yumuşak olabiliyordu.
        `),
      },
      {
        ad: "Korkmuş Yavru",
        dk: 1,
        metin: normalize(`
          Çalılıkların ardından titrek bir ses geldi. Küçük bir kedi yavrusu annesini arıyordu.
          Mino hemen yüksek sesle çağırmak istedi ama yavru daha çok korktu.
          Oki, daha yumuşak denemesini söyledi. Mino yere çömeldi ve sakin bir miyav çıkardı.
          Yavru başını kaldırdı. Mino bir kez daha aynı sesi verdi.
          Bu kez yavru çalıdan çıktı ve yanına yaklaştı. Biraz sonra annesi bahçe kapısında göründü.
          Yavru annesine koştu. Mino, doğru sesin yalnız duyulmak için değil, güven vermek için de kullanılabildiğini gördü.
        `),
      },
      {
        ad: "Miyav Korosu",
        dk: 1,
        metin: normalize(`
          Akşam olunca arkadaşlar küçük bir ses oyunu oynadı.
          Mino bir duygu seçti ve miyavıyla anlattı. Oki bunun sevinç olduğunu bildi.
          Lili sakinliği, Toto şaşkınlığı seçti. Herkes sırayla dinledi ve tahmin etti.
          Son turda Mino sabahki küçük sesini yeniden çıkardı. Arkadaşları bunun uykulu miyav olduğunu hemen anladı.
          Mino artık küçük sesinden utanmıyordu. Çünkü her sesin bir zamanı ve anlamı vardı.
          Nana, en güzel sesin en yüksek ses olmadığını söyledi.
          Mino yumuşakça miyav dedi ve herkes gülümseyerek ona karşılık verdi.
        `),
      },
    ],
  },
  {
    id: "lili-yildiz-sayiyor",
    baslik: "Lili Yıldız Sayıyor",
    yazar: "Okurio Özgün İçerik Ekibi",
    seslendiren: "Oki Anlatıcı",
    kategori: "Minik Dinleme",
    yas: "3-4 yaş",
    renk: ["#283F63", "#7CA0D8"],
    puan: 4.9,
    sureDk: 3,
    icerikDurumu: "tam-metin",
    hakDurumu: "okurio-ozgun",
    kaynak: originalSource,
    ozet: "Lili yıldızları sayarken bulutlar gökyüzünü kaplar; beklemeyi ve yeniden başlamayı öğrenir.",
    bolumler: [
      {
        ad: "İlk Yıldız",
        dk: 1,
        metin: normalize(`
          Akşam gökyüzü koyu mavi oldu. Lili pencerenin yanına küçük minderini koydu.
          İlk yıldız görünür görünmez parmağını kaldırdı. Bir, dedi.
          Biraz sonra ikinci yıldız parladı. İki, dedi. Oki de yanına oturdu.
          Üçüncü yıldız daha soluktu. Lili dikkatle bakınca onu da gördü.
          Üç, dedi ve sevindi. Mino sessizce kuyruğunu minderin çevresine doladı.
          Nana, yıldızların hepsinin aynı parlaklıkta görünmediğini anlattı.
          Lili acele etmeden bakarsa daha fazlasını seçebileceğini öğrendi.
        `),
      },
      {
        ad: "Bulut Geliyor",
        dk: 1,
        metin: normalize(`
          Lili dörde ulaşmak üzereyken büyük bir bulut gökyüzüne geldi.
          Yıldızlar bir anda kayboldu. Lili sayısının bozulduğunu düşündü.
          Oki, yıldızların gitmediğini, yalnızca bulutun arkasında kaldığını söyledi.
          Lili yine de biraz üzüldü. Nana beklerken başka şeyleri fark etmelerini önerdi.
          Bahçedeki ay ışığını, ağacın gölgesini ve gece böceklerinin sesini dinlediler.
          Lili gökyüzüne tekrar baktığında bulut yavaşça ilerliyordu.
          Beklemek uzun gelmişti ama gece hâlâ güzel şeylerle doluydu.
        `),
      },
      {
        ad: "Yeniden Başlamak",
        dk: 1,
        metin: normalize(`
          Bulut çekilince iki yıldız yeniden göründü. Lili önce kaldığı sayıyı hatırlayamadı.
          Dört mü demişti, üç mü? Kaşlarını çattı. Oki saymayı baştan önermedi.
          Önce bildiklerini hatırladılar: bir parlak yıldız, bir küçük yıldız ve bir soluk yıldız.
          Lili üçe kadar geldiğini anladı. Sonra yeni görünen yıldızı gösterdi ve dört dedi.
          Bir yıldız daha belirdi. Beş. Mino beş kez kuyruğunu yere vurdu.
          Lili, karışınca durup düşünmenin ve yeniden düzenlemenin mümkün olduğunu gördü.
        `),
      },
      {
        ad: "Gece Defteri",
        dk: 1,
        metin: normalize(`
          Lili yatmadan önce gece defterini açtı. Beş küçük yıldız çizdi.
          İlk üç yıldızı yan yana, buluttan sonra gördüğü iki yıldızı biraz uzağa koydu.
          Aralarına yumuşak bir bulut resmi ekledi. Oki, resmin bütün geceyi anlattığını söyledi.
          Lili yalnızca sayıları değil, beklediği zamanı da hatırladı.
          Nana, bazen bir işin ortasında durmanın onu bitiremediğimiz anlamına gelmediğini söyledi.
          Lili defterini kapattı ve pencereden son kez baktı.
          Gökyüzünde altıncı yıldız parlıyordu. Lili onu saymadı; sadece gülümsedi ve iyi geceler dedi.
        `),
      },
    ],
  },
];

export const PRODUCTION_STORY_UPGRADES_BY_ID = Object.fromEntries(
  PRODUCTION_STORY_UPGRADES.map((story) => [story.id, story]),
);
