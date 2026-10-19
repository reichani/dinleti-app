import { createPendingContentQualityReview } from "../contentQualityReview.js";

// Brif: docs/content-plans/2026-10-18.md, Brif 2 (genc_okurlar_12_14, kisa_hikaye).
const sourceTruth = Object.freeze({
  work: "Kaşağı",
  author: "Ömer Seyfettin",
  authorDeathYear: 1920,
  firstPublication: "Kesin değil: Vikipedi (Türk Edebiyatı Ansiklopedisi c.4 s.961 atfıyla) 1926 ölüm sonrası derlemeyi verir; hakemli bir kaynak (Cansız Kundakçı 2020, Hars Akademi) öyküyü 1919 ile tarihlendirir. Yazar 1920'de öldüğü için kamu malı durumu bu tarihten bağımsızdır.",
  sourceType: "public-domain-graded-short-adaptation",
  rightsStatus: "kamu-mali",
  rightsBasis: "5846 sayılı FSEK md.27: yazarın ölümünü izleyen yıldan itibaren 70 yıl; 1920 ölümüyle süre 1990 sonunda doldu. Reyhan Açar kamu malı olarak teyit etti (K-2026-10-18-03, ontology/karar-kayitlari.json); bu teyit içerik veya yayın onayı değildir.",
  rightsHolder: "Kamu malı (kaynak metin); uyarlama dili Okurio",
  adaptationStatus: "graded-simplified-retelling",
  scope:
    "Ömer Seyfettin'in Kaşağı öyküsünün olay sırasına bağlı, kısa cümlelerle yeniden anlatılmış sadeleştirilmiş uyarlamasıdır. Tam metin değildir. Yalnız Vikikaynak'taki metinden uyarlanmıştır; modern yayınevi sadeleştirmeleri kullanılmamıştır. Okurio editoryal ekleri: (1) Uzun Bir Yıl bölümünde anlatıcının içindeki sızı ve doğruyu sürekli ertelemesi; (2) Ertelenen Söz bölümünde 'Söylemeyi ertelediğim söz, artık ona hiç ulaşamayacaktı' cümlesi ve yıllar sonrası anma paragrafı; (3) sahnelerdeki kısa açıklamalar (seyis, tımar, yalak tanımları) ve küçük betimleme ekleri ('Akşam karanlık çökene kadar', 'cesur görünmeye çalışırdım', ahırın saman ve arpa kokusu, Uzun Bir Yıl bölümündeki 'Hasan'ın boş yeri' paragrafı gibi); (4) Okur Notu bölümünün tamamı; (5) Babamın Sorusu ve Haksız Ceza ile Uzun Bir Yıl bölümlerinde anlatıcının suskunluğunu ve suçluluğunu veren iç ses cümleleri: 'Söylediklerimin hiçbiri doğru değildi, ama sesim titremedi.', 'Ben arkalarından baktım, ama tek kelime söylemedim. O günkü sessizliğim, yalanımı daha da büyüttü.' ve 'Ben yine susmayı seçtim ve konuşmayı değiştirdim.' Çıkarılan veya yumuşatılan kaynak öğeleri: kuşpalazı için kesilen kuşların boyna sarıldığı halk çaresi sahnesi; babanın 'Eğer yalan söylersen seni döverim!' tehdidi ve 'Utanmaz yalancı' sözü; Pervin'in 'Kardeşin ölecek!' diyaloğu (dolaylı anlatıma çevrildi); son sahnede sofada çiftlik imamıyla Dadaruh'un ağlaması. Ölüm ve tokat ayrıntısız verilmiştir.",
  sourceUrls: [
    "https://tr.wikisource.org/wiki/Ka%C5%9Fa%C4%9F%C4%B1",
    "https://tr.wikipedia.org/wiki/Ka%C5%9Fa%C4%9F%C4%B1_(hik%C3%A2ye)",
  ],
  checkedAt: "2026-10-18",
  verificationStatus: "pending-human-rights-review",
});

export const KASAGI_UYARLAMA_DRAFT = {
  id: "kasagi-genc-draft",
  title: "Kaşağı",
  language: "tr",
  ageBand: "12-14",
  readingPathId: "genc_okurlar_12_14",
  icerikTuru: "kisa_hikaye",
  mebKademe: "ortaokul",
  mebSinif: "7. ve 8. Sınıf",
  mebKazanim: "B2 açık",
  contentTrack: "public-domain-graded-short-adaptation",
  primaryTheme: "Küçük bir yalan, başkasına haksızlık olarak büyüyebilir; doğruyu söylemeyi ertelemek bedel doğurabilir.",
  contentStatus: "draft",
  structuralValid: true,
  releaseReady: false,
  estimatedWordsPerMinute: 155,
  wordCount: 1098,
  estimatedSeconds: 426,
  contentWarnings: ["kardeşin hastalık sonucu ölümü (ayrıntısız)", "çocuğa tokat (ayrıntısız)", "iftira ve suçluluk duygusu"],
  sections: [
    {
      title: "Ahırın Avlusu",
      paragraphs: [
        "Çiftliğimizdeki ev, iri kestane ağaçlarının arkasında kaybolmuş gibiydi. Aşağıda, gümüş renkli söğütlerin altında görünmeyen bir dere akardı. Ahırın avlusunda oynarken onun hüzünlü şırıltısını duyardık.",
        "O yaz annem İstanbul'a gitmişti. Ben ve benden bir yaş küçük kardeşim Hasan, bütün günümüzü ahırda geçiriyorduk. Yanından hiç ayrılmadığımız kişi Dadaruh'tu.",
        "Dadaruh babamın seyisiydi, yani atlarına bakan yaşlı bir adamdı. Sabah erkenden kalkar, kahvaltıyı bitirir bitirmez ona koşardık. Akşam karanlık çökene kadar da peşinden ayrılmazdık.",
        "En çok sevdiğimiz şey atlardı. Onları Dadaruh'la birlikte dereye suya götürmek büyük bir sevinçti. Eyersiz, çıplak sırtlarına binmek ise doyulmaz bir zevkti.",
        "Hasan atlardan biraz korkardı ve yalnız binemezdi. Dadaruh onu kendi önüne oturtur, sıkıca tutardı. Ben ise yanlarında elimden geldiğince cesur görünmeye çalışırdım.",
        "Ahır, taze saman ve arpa kokardı. Atlar bizi görünce başlarını yemlikten kaldırır, burunlarından ılık bir soluk verirlerdi.",
      ],
    },
    {
      title: "Tımar Hevesi",
      paragraphs: [
        "Ahırdaki her işi oyun gibi görürdük. Torbalara arpa koyar, yemlikleri taze otla doldururduk. Gübreyi kaldırmak bile o günlerde bize eğlenceli gelirdi.",
        "Ama benim için en güzel iş tımardı. Tımar, atın tüylerini tarayıp temizleyerek bakımını yapmaktı. Bu iş için kaşağı denen dişli bir demir tarak kullanılırdı.",
        "Dadaruh kaşağıyı eline aldı mı, iş bir anda düzene girerdi. Alet atın üstünde tık, tık, tık diye bir saat gibi ses çıkarırdı. Bu düzenli tıkırtı beni yerimde durduramazdı.",
        "Ben de yapacağım, diye tuttururdum. Dadaruh da beni Tosun'un sırtına oturtur, elime kaşağıyı verirdi. Fakat ne kadar uğraşsam da o güzel sesi çıkaramazdım.",
        "Kuyruğunu sallıyor mu, diye sorardım heyecanla. Sallıyor, derdi Dadaruh gülümseyerek. Eğilip bakmak isterdim, ama atın sağrısından kuyruğu hiç görünmezdi.",
        "Her sabah ahıra girer girmez aynı isteği tekrarlardım. Dadaruh ise hep aynı cevabı verirdi. Henüz çok küçüktüm, boyum atın karnına bile yetişmiyordu.",
        "Ne zaman yapabilirim, diye üstelediğimde, boyun at kadar olunca, derdi. Bu cevap beni her seferinde biraz daha kızdırırdı. Çünkü tımar, ahırdaki en keyifli işti.",
      ],
    },
    {
      title: "Parlak Kaşağı",
      paragraphs: [
        "Bir sabah ahırda yalnız kaldım. Hasan ile Dadaruh dere kenarına inmişlerdi. İçimde birden, kimseye sormadan tımar yapma hırsı uyandı.",
        "Kaşağıyı her yerde aradım, ama bir türlü bulamadım. Ahırın köşesinde Dadaruh'un penceresiz küçük bir odası vardı. Oraya girip rafları ve eyerlerin arasını karıştırdım.",
        "Yatağın altında yeşil tahtadan bir sandık gördüm. Kapağını açınca sevinçten az kalsın bağıracaktım. İçinde gümüş gibi parlayan, yepyeni bir kaşağı duruyordu.",
        "Bu kaşağıyı annem bir hafta önce İstanbul'dan hediye göndermişti. Dadaruh herhalde onu kullanmaya kıyamamış, sandığına saklamıştı. Ben ise hiç düşünmeden kaptım ve dışarı koştum.",
        "Tosun'un yanına gidip kaşağıyı karnına sürtmek istedim. Fakat Tosun bir türlü yerinde durmuyordu. Galiba acıtıyor, diye kendi kendime söylendim.",
        "Kaşağının dişlerine dikkatle baktım, çok sivri ve keskindi. Onları biraz köreltmek için duvarın taşlarına sürttüm. Sonra yeniden denedim, ama atların hiçbiri durmadı.",
        "Çok kızdım ve öfkemi sanki kaşağıdan çıkarmak istedim. On adım ilerideki çeşmeye koştum. Kaşağıyı yalağın kenarındaki taşın üstüne koydum.",
        "Yalak, çeşmenin önünde hayvanların su içtiği taş bir tekneydi. Yerden kaldırabildiğim en ağır taşı bulup iki elimle tuttum. Kaşağı ezilip parçalanana kadar taşı üstüne indirdim.",
        "Sonra kırık parçaları yalağın suyuna attım. Annemin gönderdiği güzel hediyeyi bozduğumu o an hiç düşünmedim. Yalnız içimdeki öfke biraz dinmişti.",
      ],
    },
    {
      title: "Babamın Sorusu ve Haksız Ceza",
      paragraphs: [
        "Babam her sabah dışarı çıkmadan önce ahıra uğrardı. O gün de çeşmenin başında durup etrafa baktı. Yalağın içindeki kırık kaşağıyı hemen gördü.",
        "Gel buraya, diye Dadaruh'a seslendi. Dadaruh şaşkın şaşkın geldi, kaşağıyı kimin kırdığını bilmiyordu. Ben ise nedenini anlamadan çok korkmuştum, nefesim kesilecek gibiydi.",
        "Babamın gözleri bana döndü. O daha bir şey sormadan ağzımdan bir isim çıktı. Hasan, dedim.",
        "Dün Dadaruh uyurken odaya girdiğini anlattım. Kaşağıyı sandıktan alıp yalağın taşında ezdiğini söyledim. Söylediklerimin hiçbiri doğru değildi, ama sesim titremedi.",
        "Babam, neden Dadaruh'a haber vermedin, diye sordu. Uyuyordu, dedim. Babam Hasan'ı çağırmamı istedi.",
        "Gölgeli yoldan eve doğru koştum ve kardeşimi buldum. Zavallının hiçbir şeyden haberi yoktu. Koşarak, neşeyle arkamdan geldi.",
        "Babam çok sert bir adamdı, bir bakışı bile ikimizi korkuturdu. Hasan'a yalan söylememesini sıkıca tembihledi. Sonra kaşağıyı neden kırdığını sordu.",
        "Hasan, Dadaruh'un elindeki kırık alete şaşkınlıkla baktı. Sarı saçlı başını iki yana salladı. Ben kırmadım, dedi.",
        "Babam, doğruyu söylersen darılmayacağım, yalan çok fenadır, dedi. Hasan inkârında inat etti ve kırmadığını sakin sakin tekrarladı. Çünkü gerçekten kırmamıştı.",
        "Babam bu ısrarı inatçı bir yalan sandı ve öfkelendi. Hasan'ın yüzüne bir tokat attı. Onu bir daha ahıra sokmamasını Dadaruh'a sert bir sesle emretti.",
        "Dadaruh ağlayan kardeşimi kucağına alıp çitin kapısına doğru yürüdü. Ben arkalarından baktım, ama tek kelime söylemedim. O günkü sessizliğim, yalanımı daha da büyüttü.",
      ],
    },
    {
      title: "Uzun Bir Yıl",
      paragraphs: [
        "O günden sonra ahırda hep yalnız oynadım. Hasan evde, hizmetçimiz Pervin'in yanında, adeta bir mahpus gibi kalıyordu. Annem döndükten sonra bile babam onu affetmedi.",
        "Babam fırsat buldukça ondan, o yalancı, diye söz ederdi. Hasan o tokadı hatırladıkça ağlamaya başlar, güçlükle susardı. Annem ise benim iftira atabileceğime hiç ihtimal vermiyordu.",
        "Annem kaşağının hikâyesini duyunca başka bir şeyden şüphelendi. Dadaruh dikkatsiz davranıp atlara ezdirmiş olmasın, dedi. Ben yine susmayı seçtim ve konuşmayı değiştirdim.",
        "Ertesi yaz annem yine İstanbul'a gitti. Hasan'a ahıra girmek hâlâ yasaktı. Geceleri yatakta bana atların ne yaptığını, tayların büyüyüp büyümediğini sorardı.",
        "Ben ona tayların ne kadar büyüdüğünü anlatırdım. Her sorusunda içimde küçük bir sızı duyardım. Yine de doğruyu söylemeyi hep bir sonraki güne bırakıyordum.",
        "Ahırda tek başıma oynarken bazen Hasan'ın boş yerine bakardım. O yer bana her seferinde sessiz bir soru soruyor gibiydi.",
      ],
    },
    {
      title: "Ertelenen Söz",
      paragraphs: [
        "Bir gün Hasan birdenbire hastalandı. Kasabaya atlı biri gönderildi ve doktor getirildi. Doktor, kuşpalazı denen ağır bir boğaz hastalığı olduğunu söyledi.",
        "Babam yatağın başucundan hiç ayrılmadı. Dadaruh çok durgundu, Pervin ise durmadan ağlıyordu. Kardeşimin iyileşmeyebileceğini ilk kez ondan duydum.",
        "O gece Pervin'in yanında yattım, ama hiç uyuyamadım. Gözümü kapar kapamaz Hasan karşımda beliriyordu. İftiracı, iftiracı, diyerek ağlıyordu.",
        "Pervin'i uyandırıp hemen babama gitmek istediğimi söyledim. Kaşağıyı aslında benim kırdığımı anlatacaktım. Hıçkırıklarım yüzünden sözlerimi bitiremedim.",
        "Pervin, şimdi herkes uyuyor, sabah söylersin, dedi. Sabah Hasan'ı öpeceğimi, onun da beni affedeceğini düşündüm. Bu düşünceyle biraz sakinleştim.",
        "Yine de sabaha kadar gözümü kırpmadım. Zehir gibi bir vicdan azabı çektim. Hava ağarırken Pervin'i yeniden uyandırdım.",
        "Fakat çok geç kalmıştım. Masum kardeşim o gece hayatını kaybetmişti. Söylemeyi ertelediğim söz, artık ona hiç ulaşamayacaktı.",
        "Yıllar geçti, ama o sabahın pişmanlık duygusu içimden hiç çıkmadı. Kaşağının tıkırtısını ne zaman duysam, Hasan'ı hatırlarım.",
      ],
    },
    {
      title: "Okur Notu",
      editorial: true,
      paragraphs: [
        "Bu son bölüm Ömer Seyfettin'e ait değildir, Okurio tarafından eklenmiştir. Öykü, küçük bir yalanın nasıl büyük bir haksızlığa dönüştüğünü gösterir. Okurken anlatıcının neden bu kadar uzun süre sustuğunu da düşünebilirsin.",
        "Halk arasında yalancının mumu yatsıya kadar yanar, denir. Yani yalan uzun sürmez, gerçek er geç ortaya çıkar. Öyküde anlatıcı gerçeği söylemeye karar verdiğinde ise çok geç kalmıştır.",
        "Bugün kuşpalazına difteri denir ve aşıyla önlenebilir. Bugün çocuk hakları ilkeleri ve araştırmalar, çocuklara fiziksel ceza verilmemesi gerektiğini söyler. Bir hata yaptığında bunu güvendiğin bir yetişkine söylemek her zaman mümkündür.",
        "Öykü bir soru daha bırakır: Baba, Hasan'ı dinlemeden cezalandırdığında o da haksızlık etmiş olmaz mı? Doğruyu bulmak için herkesi sakin bir şekilde dinlemek gerekir.",
        "Bu öykü sana üzüntü verdiyse, bunu güvendiğin biriyle konuşabilirsin. Duyguların hakkında konuşmak iyi gelebilir.",
      ],
    },
  ],
  glossary: [
    { word: "kaşağı", definition: "Atların tüylerini taramak ve temizlemek için kullanılan dişli demir tarak." },
    { word: "tımar", definition: "Atın tüylerini tarayıp bakımını yapma işi." },
    { word: "ahır", definition: "Atların ve büyükbaş hayvanların barındığı kapalı yer." },
    { word: "iftira", definition: "Birini yapmadığı bir şeyle suçlamak." },
    { word: "vicdan", definition: "İnsanın kendi davranışının doğru olup olmadığını içinden yargılaması." },
    { word: "sağrı", definition: "Atın sırtının kalçaya yakın arka kısmı." },
    { word: "pişmanlık", definition: "Yapılan bir hatadan sonra duyulan derin üzüntü." },
  ],
  editorialLanguageProfile: {
    idioms: [
      {
        expression: "vicdan azabı çektim",
        lemma: "vicdan azabı çekmek",
        meaning: "Yapılan bir haksızlıktan dolayı insanın içinde duyduğu sürekli acı.",
        ageFit: "Öykünün ana duygusudur; 12–14 yaş okuru bağlamdan ve sözlükteki vicdan girdisinden anlamı kurar.",
      },
    ],
    proverbs: [
      {
        expression: "yalancının mumu yatsıya kadar yanar",
        meaning: "Yalan uzun süre saklanamaz, gerçek eninde sonunda ortaya çıkar.",
        ageFit: "Okur notunda açıklamasıyla birlikte verilir; ortaokul düzeyinde tanıdık bir atasözüdür.",
      },
    ],
    culturalObjects: [
      {
        name: "yalak",
        context: "Çeşme başındaki taş su teknesi; kaşağının kırıldığı ve bulunduğu yerdir.",
        ageFit: "Metin içinde yalağın ne olduğu açıklanır.",
      },
    ],
  },
  optionalReflectionPrompt: "İstersen düşün: Anlatıcı doğruyu hangi anda söyleyebilirdi?",
  reflectionOptional: true,
  reflectionScored: false,
  sourceTruth,
  factualReview: {
    status: "pending-human-review",
    notes: "Olay sırası Vikikaynak metniyle karşılaştırılmalı; kuşpalazı ile difteri eşlemesi insan editör doğrulaması bekliyor.",
  },
  originalityRightsReview: {
    status: "pending-human-review",
    notes: "Kamu malı dayanağı Reyhan tarafından teyit edildi (K-2026-10-18-03). Uyarlamanın modern sadeleştirmelerden bağımsızlığı insan incelemesi bekliyor.",
  },
  safeguardingLanguageReview: {
    status: "pending-human-review",
    notes: "Kardeş ölümü, tokat ve suçluluk teması 12–14 yaş için insan kararı gerektirir; okur notu ve içerik uyarıları eklendi.",
  },
  ownerApproval: { status: "pending", ownerName: "" },
  contentQualityReview: createPendingContentQualityReview("genc_okurlar_12_14"),
};
