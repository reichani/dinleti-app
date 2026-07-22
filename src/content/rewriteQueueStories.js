const normalize = (text) => text.replace(/\s+/gu, " ").trim();

const source = {
  ad: "Okurio Özgün Hikâye Serisi",
  tur: "özgün",
  hakSahibi: "Okurio",
  surum: "1.0-review",
};

export const REWRITE_QUEUE_STORIES = [
  {
    id: "mino-neden-uzuldu-v2",
    baslik: "Mino Neden Üzüldü?",
    yazar: "Okurio Özgün İçerik Ekibi",
    seslendiren: "Oki Anlatıcı",
    kategori: "Duygular ve Arkadaşlık",
    yas: "6-8 yaş",
    sureDk: 4,
    icerikDurumu: "editoryal-review",
    hakDurumu: "okurio-ozgun",
    kaynak: source,
    ozet: "Mino, oyunda unutulduğunu sanınca içine kapanır; arkadaşlarıyla konuşarak duygusunu adlandırmayı ve yanlış anlamayı çözmeyi öğrenir.",
    bolumler: [
      {
        ad: "Sessizleşen Mino",
        dk: 1,
        metin: normalize(`
          Oki, Lili ve Toto bahçede yeni bir yol oyunu kuruyordu. Taşları sıraya diziyor, her taşın yanına küçük bir işaret bırakıyorlardı.
          Mino da yanlarına geldi. Fakat arkadaşları oyunun nasıl ilerleyeceğini konuşurken onu fark etmedi.
          Mino önce bekledi. Sonra bir kez miyav dedi. Kimse dönmeyince kuyruğunu yere indirdi.
          İçinden, beni oyuna istemiyorlar, diye düşündü. Göğsünde ağır bir düğüm varmış gibi oldu.
          Bir şey söylemeden ağacın arkasına geçti. Oki kısa süre sonra Mino'nun olmadığını fark etti.
        `),
      },
      {
        ad: "Duygunun Adı",
        dk: 1,
        metin: normalize(`
          Oki ağacın arkasına gidince Mino'yu patilerine bakarken buldu. Hemen soru sormak yerine yanına oturdu.
          Bir süre birlikte sessiz kaldılar. Sonra Oki, yüzün biraz üzgün görünüyor, dedi.
          Mino önce başını çevirdi. Ardından, oyuna beni çağırmadınız, diye fısıldadı.
          Oki şaşırdı. Seni istemediğimiz için değil, oyunun kuralını tartıştığımız için görmedik, dedi.
          Mino'nun düğümü biraz gevşedi. Üzgünlüğünün yanında kırgınlık da olduğunu fark etti.
          Nana, duygunun adını bilmenin onu anlatmayı kolaylaştırdığını söyledi.
        `),
      },
      {
        ad: "Yanlış Anlama",
        dk: 1,
        metin: normalize(`
          Lili ve Toto da yanlarına geldi. Mino, beni bilerek dışarıda bıraktığınızı sandım, dedi.
          Lili, seni gördüğümüzde oyuna bir ses işareti ekleyecektik, diye açıkladı. Toto da özür diledi.
          Mino, kimse dönmeyince aklıma hemen kötü bir düşünce geldi, dedi.
          Nana buna yanlış anlama denebileceğini söyledi. Bazen gördüğümüz küçük bir olay hakkında büyük bir sonuç çıkarabiliriz.
          Oki, böyle zamanlarda durup sormanın işe yarayacağını önerdi: Beni duydunuz mu? Oyuna katılabilir miyim?
          Mino bu iki cümleyi yavaşça tekrar etti.
        `),
      },
      {
        ad: "Yeni İşaret",
        dk: 1,
        metin: normalize(`
          Arkadaşlar oyuna yeniden başladı. Bu kez ilk taşı Mino yerleştirdi.
          Herkes sırayla bir işaret seçti. Mino'nun işareti yumuşak bir miyavdı.
          Oyun sırasında biri duyulmadığında diğerleri durup ona baktı. Kimse geride kalmadı.
          Mino hâlâ biraz üzgündü ama artık ne hissettiğini ve nedenini biliyordu.
          Oki, üzülmek yanlış değildir, dedi. Önemli olan duygunun bize ne anlattığını dinlemektir.
          Mino gülümsedi. Son taşı yerine koydu ve bu kez sesi açıkça duyuldu.
        `),
      },
    ],
    glossary: [
      { word: "kırgın", definition: "Bir davranış yüzünden üzülmüş ve incinmiş olma durumudur.", tdkParallel: "pending-human-review" },
      { word: "yanlış anlama", definition: "Bir sözü veya olayı gerçekte olduğundan farklı yorumlamaktır.", tdkParallel: "pending-human-review" },
      { word: "dışarıda bırakmak", definition: "Birini bir işe veya gruba katmamak anlamına gelir.", tdkParallel: "pending-human-review" },
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
    sureDk: 4,
    icerikDurumu: "editoryal-review",
    hakDurumu: "okurio-ozgun",
    kaynak: source,
    ozet: "Toto aceleyle hareket ederken arkadaşlarının düzenini bozar; dur-nefes al-bak-seç adımlarını kullanarak kendini yeniden yönlendirmeyi öğrenir.",
    bolumler: [
      {
        ad: "Hızlı Başlangıç",
        dk: 1,
        metin: normalize(`
          Toto sabah bahçeye koşarak geldi. Oki ile Lili renkli kartları sıraya diziyordu.
          Toto ne yaptıklarını sormadan kartların arasına atladı. Rüzgâr gibi geçtiği için üç kart havalandı.
          Bir kart çitin yanına, biri taşın altına, biri de su kabının yanına düştü.
          Lili şaşırdı. Oki oyunun sırasının bozulduğunu söyledi.
          Toto hemen kartları toplamaya çalıştı ama bu kez su kabına çarptı.
          Nana elini kaldırdı ve sadece, bir an dur, dedi.
        `),
      },
      {
        ad: "Dur ve Nefes Al",
        dk: 1,
        metin: normalize(`
          Toto önce durmak istemedi. İçinde hâlâ koşma isteği vardı.
          Nana, ayaklarını yere bastığını hisset, dedi. Toto iki ayağını da toprağa yerleştirdi.
          Sonra birlikte yavaş bir nefes aldılar. Toto omuzlarının biraz gevşediğini fark etti.
          Oki, hızlı olmak kötü değil, fakat önce ne olduğunu görmek gerekebilir, dedi.
          Toto çevresine baktı. Kartların nerede olduğunu ve suyun hangi yöne aktığını gördü.
          Durunca bahçenin daha anlaşılır göründüğünü düşündü.
        `),
      },
      {
        ad: "Bak ve Seç",
        dk: 1,
        metin: normalize(`
          Nana dört küçük adım söyledi: Dur. Nefes al. Bak. Seç.
          Toto önce çitin yanındaki kartı aldı. Sonra taşın altındakini çıkardı.
          Su kabının yanındaki karta koşmak yerine yürüdü. Kabı düzeltip dökülen suyu bezle sildi.
          Lili, şimdi bize yardım ediyorsun, dedi.
          Toto oyuna nasıl katılacağını sordu. Oki kartların yalnızca kenarlarından taşınmasını istedi.
          Toto hızını azaltıp bir kart seçti. Bu kez sıra bozulmadı.
        `),
      },
      {
        ad: "Yeni Alışkanlık",
        dk: 1,
        metin: normalize(`
          Oyun ilerlerken Toto birkaç kez yeniden hızlandı. Her seferinde kendi kendine dört adımı hatırlattı.
          Dur. Nefes al. Bak. Seç.
          Bir keresinde yanlış kartı almak üzereyken durdu ve doğru rengi fark etti.
          Oki, durmak oyunu bırakmak değildir, dedi. Bazen doğru devam etmek için kısa bir hazırlıktır.
          Günün sonunda Toto en hızlı bitiren kişi olmadı. Fakat kartları en dikkatli taşıyanlardan biri oldu.
          Eve giderken küçük bir taş buldu. Onu cebine koydu; taş ona bir an durmayı hatırlatacaktı.
        `),
      },
    ],
    glossary: [
      { word: "öz düzenleme", definition: "Duygu ve hareketlerimizi duruma göre yönetebilme becerisidir.", tdkParallel: "pending-human-review" },
      { word: "alışkanlık", definition: "Sık tekrar edildiği için kolayca yapılan davranıştır.", tdkParallel: "pending-human-review" },
      { word: "yönlendirmek", definition: "Bir davranışın veya hareketin hangi yöne gideceğini belirlemektir.", tdkParallel: "pending-human-review" },
    ],
    reflectionPrompt: "Toto durduğunda çevresinde daha önce fark etmediği neleri gördü?",
  },
];
