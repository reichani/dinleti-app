const normalize = (text) => text.replace(/\s+/gu, " ").trim();

const source = {
  ad: "Okurio Özgün Hikâye Serisi",
  tur: "özgün",
  hakSahibi: "Okurio",
  surum: "2.0-agent-reviewed",
};

const sharedReview = {
  editorialAgentReview: {
    status: "passed-with-revisions",
    reviewedAt: "2026-07-22",
    scope: [
      "anlatı bütünlüğü",
      "yaş uyumu",
      "erişilebilir ekran blokları",
      "ADHD için tek odaklı sahne akışı",
      "disleksi için cümle ve kavram yoğunluğu",
      "klinik iddia sınırı",
    ],
  },
  durationAgentReview: {
    status: "passed",
    calculation: "Gerçek gövde kelime adedi / 155 kelime-dakika",
    minimumSecondsForAgeBand: 180,
  },
  tdkAlignmentAgentReview: {
    status: "passed-with-notes",
    reviewedAt: "2026-07-22",
    source: "TDK Güncel Türkçe Sözlük, 12. baskının genel ağ sürümü",
    policy: "Madde başı, sözcük türü ve temel anlam paralelliği kontrol edilir; TDK tanımı kopyalanmaz.",
    limitation: "Bu kayıt insan sözlükbilimci imzası değildir.",
  },
  humanExpertSignoff: "pending",
};

export const REWRITE_QUEUE_STORIES = [
  {
    id: "mino-neden-uzuldu-v2",
    baslik: "Mino Neden Üzüldü?",
    yazar: "Okurio Özgün İçerik Ekibi",
    seslendiren: "Oki Anlatıcı",
    kategori: "Duygular ve Arkadaşlık",
    yas: "6-8 yaş",
    sureDk: 3,
    kelimeAdedi: 475,
    hesaplananSureSaniye: 184,
    okumaSeviyesi: "L2",
    icerikDurumu: "agent-reviewed-production-candidate",
    hakDurumu: "okurio-ozgun",
    kaynak: source,
    review: sharedReview,
    ozet: "Mino, oyunda unutulduğunu sanınca içine kapanır; arkadaşlarıyla konuşarak duygusunu adlandırmayı ve yanlış anlamayı çözmeyi öğrenir.",
    bolumler: [
      {
        ad: "Sessizleşen Mino",
        dk: 1,
        metin: normalize(`
          Oki, Lili ve Toto bahçede yeni bir yol oyunu kuruyordu. Taşları sıraya diziyor, her taşın yanına küçük bir işaret bırakıyorlardı.
          Yolun başında mavi bir taş, ortasında sarı bir yaprak, sonunda da küçük bir çan olacaktı.
          Mino da yanlarına geldi. Fakat arkadaşları oyunun nasıl ilerleyeceğini konuşurken onu fark etmedi.
          Mino önce bekledi. Sonra bir kez miyav dedi. Oki o sırada Lili'ye hangi taşı kullanacaklarını soruyordu.
          Kimse dönmeyince Mino kuyruğunu yere indirdi. Bir kez daha seslenmek istedi ama sesi boğazında kaldı.
          İçinden, beni oyuna istemiyorlar, diye düşündü. Göğsünde ağır bir düğüm varmış gibi oldu.
          Arkadaşlarının gülmesi ona uzaktan gelen kapalı bir kapı sesi gibi duyuldu.
          Bir şey söylemeden ağacın arkasına geçti. Patilerini yan yana koyup toprağa baktı.
          Oki kısa süre sonra Mino'nun olmadığını fark etti. Oyunu durdurdu ve onu aramaya başladı.
        `),
      },
      {
        ad: "Duygunun Adı",
        dk: 1,
        metin: normalize(`
          Oki ağacın arkasına gidince Mino'yu patilerine bakarken buldu. Hemen soru sormak yerine yanına oturdu.
          Bir süre birlikte sessiz kaldılar. Oki, Mino'nun hazır olmasını bekledi.
          Sonra, yüzün biraz üzgün görünüyor, dedi. Mino önce başını çevirdi.
          Ardından, oyuna beni çağırmadınız, diye fısıldadı. Oki şaşırdı.
          Seni istemediğimiz için değil, oyunun kuralını tartıştığımız için görmedik, dedi.
          Mino'nun göğsündeki düğüm biraz gevşedi. Yine de içindeki rahatsızlık tamamen geçmedi.
          Nana da yanlarına geldi. Mino'ya aynı anda birden fazla duygu hissedebileceğini söyledi.
          Mino düşündü. Üzgündü, çünkü oyuna katılmadığını sanmıştı. Biraz da kırgındı, çünkü sesinin duyulmadığını düşünmüştü.
          Duygularının adını söyleyince ne anlatmak istediği daha açık oldu.
          Oki, seni duymadığımız için üzgünüm, dedi. Bu cümle Mino'ya iyi geldi.
        `),
      },
      {
        ad: "Sor ve Dinle",
        dk: 1,
        metin: normalize(`
          Lili ve Toto da yanlarına geldi. Mino, beni bilerek dışladığınızı sandım, dedi.
          Lili başını salladı. Seni gördüğümüzde oyuna bir ses işareti eklemeyi düşünüyorduk, diye açıkladı.
          Toto da konuşmaya dalıp çevrelerine bakmadıkları için özür diledi.
          Mino, kimse dönmeyince aklıma hemen kötü bir düşünce geldi, dedi.
          Nana bunun bir yanlış anlama olduğunu söyledi. Bazen küçük bir olayı görür, eksik kalan kısmı kendi düşüncemizle tamamlarız.
          Bu düşünce her zaman gerçeği göstermeyebilir.
          Oki böyle zamanlarda iki kısa soru sormayı önerdi: Beni duydunuz mu? Oyuna katılabilir miyim?
          Mino cümleleri yavaşça tekrar etti. Sonra arkadaşlarına bakarak gerçekten sordu.
          Lili, evet, seni duydum ve katılmanı istiyorum, dedi.
          Toto da ilk ses işaretini Mino'nun seçmesini önerdi.
          Mino, konuşunca durumun düşündüğünden farklı olduğunu gördü.
        `),
      },
      {
        ad: "Yeni İşaret",
        dk: 1,
        metin: normalize(`
          Arkadaşlar oyuna yeniden başladı. Bu kez ilk taşı Mino yerleştirdi.
          Herkes sırayla bir işaret seçti. Mino'nun işareti yumuşak bir miyavdı.
          Yolun bir bölümünde Lili'nin sesi duyulmadı. Mino hemen ilerlemek yerine durdu ve ona baktı.
          Lili işaretini yeniden söyledi. Böylece kimse geride kalmadı.
          Oyun sürerken Mino bazen önceki üzüntüsünü hatırladı. Fakat artık ne hissettiğini ve nedenini biliyordu.
          Gerektiğinde soru sorabileceğini de öğrenmişti.
          Oki, üzülmek yanlış değildir, dedi. Duygu bazen bize konuşmamız gereken bir şey olduğunu anlatır.
          Nana, arkadaşlığın hiç yanlış anlamamak değil, yanlış anlamayı birlikte düzeltebilmek olduğunu ekledi.
          Mino son taşı yerine koydu. Küçük çanı çaldı ve sesi bahçede açıkça duyuldu.
          Bu kez herkes ona döndü. Mino gülümsedi ve oyunun son adımını arkadaşlarıyla birlikte tamamladı.
        `),
      },
    ],
    glossary: [
      {
        word: "kırgın",
        partOfSpeech: "sıfat",
        definition: "Bir söz veya davranış yüzünden incinmiş ve üzülmüş hisseden kişiyi anlatır.",
        tdkParallel: "agent-checked",
        tdkNote: "Madde başı ve temel anlamla paralel; açıklama Okurio tarafından özgünleştirildi.",
      },
      {
        word: "yanlış anlamak",
        partOfSpeech: "birleşik fiil",
        definition: "Bir sözü, davranışı veya olayı gerçekte anlatılandan farklı yorumlamaktır.",
        tdkParallel: "agent-checked",
        tdkNote: "Sözlük kartı ad biçiminden fiil biçimine getirildi.",
      },
      {
        word: "dışlamak",
        partOfSpeech: "fiil",
        definition: "Birini bir grubun veya etkinliğin dışında tutmaktır.",
        tdkParallel: "agent-checked",
        tdkNote: "Önceki 'dışarıda bırakmak' ifadesi daha açık madde başıyla değiştirildi.",
      },
    ],
    reflectionPrompt: "Mino konuşmadan önce ne düşünüyordu, konuştuktan sonra ne değişti?",
  },
  {
    id: "toto-bir-an-durdu-v2",
    baslik: "Toto Bir An Durdu",
    yazar: "Okurio Özgün İçerik Ekibi",
    seslendiren: "Oki Anlatıcı",
    kategori: "Dikkat ve Öz Düzenleme",
    yas: "6-8 yaş",
    sureDk: 3,
    kelimeAdedi: 469,
    hesaplananSureSaniye: 182,
    okumaSeviyesi: "L2",
    icerikDurumu: "agent-reviewed-production-candidate",
    hakDurumu: "okurio-ozgun",
    kaynak: source,
    review: sharedReview,
    ozet: "Toto aceleyle hareket ederken arkadaşlarının düzenini bozar; dur-nefes al-bak-seç adımlarını kullanarak kendini yeniden yönlendirmeyi öğrenir.",
    bolumler: [
      {
        ad: "Hızlı Başlangıç",
        dk: 1,
        metin: normalize(`
          Toto sabah bahçeye koşarak geldi. Oki ile Lili renkli kartları sıraya diziyordu.
          Kartların üzerinde yaprak, yıldız, damla ve taş resimleri vardı. Her kart doğru yere konunca küçük bir yol oluşacaktı.
          Toto ne yaptıklarını sormadan kartların arasına atladı. Rüzgâr gibi geçtiği için üç kart havalandı.
          Bir kart çitin yanına, biri taşın altına, biri de su kabının yanına düştü.
          Lili şaşırdı. Oki oyunun sırasının bozulduğunu söyledi.
          Toto hemen kartları toplamaya çalıştı. Aceleyle dönerken bu kez su kabına çarptı.
          Su toprağa yayıldı. Toto bir yandan kartlara, bir yandan akan suya uzandı.
          Ne yapacağını seçemeyince daha hızlı hareket etmeye başladı.
          Nana elini kaldırdı ve yalnızca, bir an dur, dedi.
        `),
      },
      {
        ad: "Dur ve Nefes Al",
        dk: 1,
        metin: normalize(`
          Toto önce durmak istemedi. İçinde hâlâ koşma ve her şeyi hemen düzeltme isteği vardı.
          Nana, ayaklarını yere bastığını hisset, dedi. Toto iki ayağını da toprağa yerleştirdi.
          Bir ayağının yanında küçük bir taş, diğerinin yanında ıslak bir yaprak vardı.
          Sonra birlikte yavaş bir nefes aldılar. Toto nefes verirken omuzlarının biraz gevşediğini fark etti.
          Oki, hızlı olmak kötü değildir, dedi. Fakat önce ne olduğunu görmek gerekebilir.
          Toto çevresine baktı. Kartların nerede olduğunu, suyun hangi yöne aktığını ve Lili'nin elinde bez tuttuğunu gördü.
          Birkaç saniye önce bütün bahçe birbirine karışmış gibiydi.
          Durunca yapılacak işler ayrı ayrı görünmeye başladı.
          Toto, önce suyu durdurmanın, sonra kartları toplamanın daha doğru olacağını düşündü.
        `),
      },
      {
        ad: "Bak ve Seç",
        dk: 1,
        metin: normalize(`
          Nana dört küçük adım söyledi: Dur. Nefes al. Bak. Seç.
          Toto önce su kabını düzeltmeyi seçti. Lili'nin verdiği bezle dökülen suyu sildi.
          Sonra çitin yanındaki kartı aldı. Taşın altındaki kartı çıkarırken parmaklarını yavaş kullandı.
          Su kabının yanındaki karta koşmak yerine yürüdü.
          Lili, şimdi bize yardım ediyorsun, dedi. Toto oyuna nasıl katılacağını sordu.
          Oki kartların kenarlarından tutulmasını ve sıradaki boş yere taşınmasını istedi.
          Toto önce mavi damla kartını gördü ama sırada yeşil yaprak vardı.
          Elini uzatırken durdu, nefes aldı ve yeniden baktı.
          Doğru kartı seçip yerine koydu. Bu kez sıra bozulmadı.
          Toto dört adımın onu yavaşlatmak için değil, doğru hareketi seçmesine yardım etmek için olduğunu anladı.
        `),
      },
      {
        ad: "Yeni Alışkanlık",
        dk: 1,
        metin: normalize(`
          Oyun ilerlerken Toto birkaç kez yeniden hızlandı. Her seferinde kendi kendine dört adımı hatırlattı.
          Dur. Nefes al. Bak. Seç.
          Bir keresinde yanlış kartı almak üzereyken durdu ve doğru rengi fark etti.
          Başka bir seferde Lili konuşurken araya girmek istedi. Nefes alıp onun cümlesini bitirmesini bekledi.
          Oki, durmak oyunu bırakmak değildir, dedi. Bazen doğru devam etmek için kısa bir hazırlıktır.
          Günün sonunda Toto en hızlı bitiren kişi olmadı. Fakat kartları en dikkatli taşıyanlardan biri oldu.
          Nana, bu dört adımın her zaman kusursuz uygulanması gerekmediğini söyledi.
          Unutursa yeniden deneyebilirdi. Toto bunu duyunca rahatladı.
          Eve giderken küçük, düz bir taş buldu. Onu cebine koydu.
          Taş ona durmayı, nefes almayı, bakmayı ve sonra seçmeyi hatırlatacaktı.
        `),
      },
    ],
    glossary: [
      {
        word: "öz düzenleme",
        partOfSpeech: "isim, eğitim ve psikoloji terimi",
        definition: "Duygumuzu ve hareketimizi bulunduğumuz duruma göre ayarlayabilme becerisidir.",
        tdkParallel: "term-not-confirmed-as-gts-headword",
        tdkNote: "Güncel Türkçe Sözlük madde başı olarak kesinleştirilmedi; alan terimi şeklinde açıkça etiketlendi.",
      },
      {
        word: "alışkanlık",
        partOfSpeech: "isim",
        definition: "Sık sık tekrarlandığı için zamanla kolaylaşan davranış veya yapma biçimidir.",
        tdkParallel: "agent-checked",
        tdkNote: "Madde başı ve temel anlamla paralel; tanım özgün ve yaşa uygun yazıldı.",
      },
      {
        word: "yönlendirmek",
        partOfSpeech: "fiil",
        definition: "Bir hareketin, düşüncenin veya işin hangi yönde ilerleyeceğini belirlemeye yardım etmektir.",
        tdkParallel: "agent-checked",
        tdkNote: "Madde başı ve temel anlamla paralel; açıklama hikâye bağlamına uyarlandı.",
      },
    ],
    reflectionPrompt: "Toto durduğunda çevresinde daha önce fark etmediği neleri gördü?",
  },
];
