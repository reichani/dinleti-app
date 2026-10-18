import { createPendingContentQualityReview } from "../contentQualityReview.js";

const sourceTruth = Object.freeze({
  work: "Münazara Hazırlığı",
  scope: "Okurio için özgün lise okuru hikâyesi; kaynak değerlendirme, karşı görüşü dinleme ve dengeli tartışma",
  sourceType: "original",
  rightsHolder: "Okurio",
  adaptationStatus: "not-applicable",
  verificationStatus: "pending-human-review",
  references: [
    {
      label: "UNESCO · Guidance for generative AI in education and research",
      url: "https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research",
      scope: "Üretken yapay zekânın eğitimde kullanımına ilişkin genel ilkeler; insan denetimi, yaş uygunluğu ve doğrulama",
    },
  ],
});

export const MUNAZARA_HAZIRLIGI_DRAFT = {
  id: "munazara-hazirligi-draft",
  title: "Münazara Hazırlığı",
  language: "tr",
  ageBand: "16-18",
  readingPathId: "lise_okuma_16_18",
  contentTrack: "okurio-original-pilot",
  primaryTheme: "İyi bir tartışma, kaynağı sorgulamak ve karşı görüşü gerçekten dinlemekle başlar",
  contentStatus: "draft",
  structuralValid: true,
  releaseReady: false,
  estimatedWordsPerMinute: 155,
  sections: [
    {
      title: "Kura Çekilişi",
      paragraphs: [
        "Okulun münazara kulübü, her salı son dersten sonra kütüphanenin arka odasında toplanırdı. O gün odada her zamankinden fazla heyecan vardı. İl turnuvasının konusu sonunda açıklanmıştı.",
        "Kulüp danışmanı Elif Hanım, tahtaya büyük harflerle önergeyi yazdı: \"Yapay zekâ öğrencilerin ödevlerini yazmalıdır.\" Bir an kimse konuşmadı. Sonra herkes aynı anda fikir söylemeye başladı.",
        "Takımda dört öğrenci vardı. Kaan, hızlı konuşan ve her şeye hemen itiraz eden biriydi. Ada, sakin ve titiz bir okurdu. Berk teknolojiye meraklıydı, Nehir ise yazmayı çok seviyordu.",
        "Elif Hanım, turnuvada hangi tarafı savunacaklarını önceden bilmeyeceklerini hatırlattı. Taraf, yarışma sabahı kurayla belirlenecekti. Bu yüzden iki tarafı da eşit derinlikte hazırlamaları gerekiyordu.",
        "Kaan bu habere pek sevinmedi. \"Ben karşı tarafı savunamam,\" dedi. \"Yapay zekânın ödev yazması açıkça kopya çekmektir.\" Berk hemen başını iki yana salladı.",
        "\"Bu kadar basit değil,\" dedi Berk. \"Hesap makinesi de ilk çıktığında kopya sayılmıştı.\" İkisinin sesi giderek yükseldi. Elif Hanım elini kaldırarak onları durdurdu.",
        "\"İşte ilk dersimiz,\" dedi. \"Henüz hiçbir kaynak okumadan iki kesin görüş oluştu. Önümüzdeki üç hafta, bu görüşleri sınamakla geçecek.\"",
        "Ada bu sırada sessizce not alıyordu. İki arkadaşının da aslında aynı şeyden endişe ettiğini fark etti. İkisi de öğrencilerin gerçekten öğrenip öğrenmediğini önemsiyordu.",
        "Elif Hanım bu gözlemi duyunca başını salladı. \"Çoğu tartışmada taraflar aynı değeri farklı yollarla korumaya çalışır,\" dedi. \"Önce o ortak değeri bulmaya çalışın.\"",
        "Toplantının sonunda her öğrenciye bir görev verildi. Herkes en az üç kaynak bulacak ve her kaynağın güvenilirliğini değerlendirecekti. Ada, eve dönerken önergeyi defterine yeniden yazdı ve altını çizdi.",
      ],
    },
    {
      title: "Kaynak Masası",
      paragraphs: [
        "Bir sonraki toplantıda masanın üstü çıktılarla doluydu. Berk, bir teknoloji sitesinden yazdırdığı uzun bir makaleyi gururla gösterdi. Makale, yapay zekânın eğitimde devrim yapacağını iddia ediyordu.",
        "Ada makaleyi dikkatle inceledi. Yazarın adı yoktu, yalnız sitenin logosu vardı. Sayfanın kenarında aynı şirketin yapay zekâ ürününün reklamı duruyordu.",
        "\"Bu kaynak tarafsız olabilir mi?\" diye sordu Ada. Berk önce savunmaya geçti. Sonra reklama baktı ve sessizce omuz silkti.",
        "Elif Hanım tahtaya dört soru yazdı. Kim yazmış? Ne zaman yazmış? Hangi kanıtlara dayanıyor? Bu bilgiden kim yarar sağlıyor? Takım, her kaynağı bu dört soruyla incelemeye başladı.",
        "Kaan'ın getirdiği kaynak da sorunluydu. Sosyal medyada çok paylaşılmış bir öğretmen yazısıydı. Yazı içtendi ama tek bir sınıftaki deneyime dayanıyordu.",
        "\"Bu bir kişisel gözlem,\" dedi Nehir. \"Değerli olabilir ama genel bir sonuç için yeterli değil.\" Kaan itiraz etmek istedi ama haklı olduğunu kabul etti.",
        "Ada'nın kaynakları daha az heyecan vericiydi. Uluslararası bir eğitim kuruluşunun yönergesi ve bir üniversitenin araştırma özeti. Metinler uzun, dili ağır ve sonuçları temkinliydi.",
        "Berk, güvenilir kaynakların neden daha sıkıcı göründüğünü merak etti. Elif Hanım, dikkatli yazarların abartılı iddialardan kaçındığını açıkladı. \"Kesinlik vaat eden başlıklara her zaman bir soruyla yaklaşın,\" dedi.",
        "Ama iki kaynak da yazarlarını, yöntemlerini ve sınırlılıklarını açıkça belirtiyordu. Takım, bu kaynakları masanın ortasına koydu. Reklamlı makaleyi ise \"dikkatle kullan\" yazılı bir dosyaya kaldırdılar.",
      ],
    },
    {
      title: "Uzun Rapor",
      paragraphs: [
        "Ada, eğitim kuruluşunun raporunu okumayı üstlendi. Rapor kırk sayfaydı ve ilk bakışta çok yoğundu. Ada bir hafta sonunu bu işe ayırmaya karar verdi.",
        "İlk sayfalarda dikkatini toplamakta zorlandı. Teknik terimler art arda geliyordu. Bir paragrafı iki kez okuduğu hâlde ana noktayı yakalayamadı.",
        "Sonra kendine bir yöntem belirledi. Her bölümün sonunda yalnız iki şeyi yazacaktı: rapor ne söylüyor ve neye dayanarak söylüyor? Bu iki soru, yoğun metni sadeleştirdi.",
        "Raporun dengeli bir dili vardı. Yapay zekânın öğrencilere geri bildirim vermede ve fikir üretmede yardımcı olabileceğini kabul ediyordu. Aynı zamanda insan denetiminin şart olduğunu vurguluyordu.",
        "Rapor ayrıca yaş sınırları, kişisel verilerin korunması ve doğrulama gibi konulara dikkat çekiyordu. Yapay zekânın yanlış bilgi üretebileceği açıkça yazılmıştı. Ada bu bölümün altını kalın bir çizgiyle çizdi.",
        "Okumayı bitirdiğinde Ada şaşırtıcı bir şey fark etti. Rapor ne tamamen \"evet\" diyordu ne de tamamen \"hayır.\" Asıl soru, yapay zekânın nasıl ve hangi koşullarda kullanılacağıydı.",
        "Ada son olarak raporun kaynakçasına göz attı. Rapor, iddialarını onlarca başka çalışmaya dayandırıyordu. Bazılarının adını not etti; turnuvadan önce birkaçını da okumayı planladı.",
        "Gece yatarken gözleri yorgundu ama zihni berraktı. Kırk sayfalık metin, iki sütunlu bir sayfaya dönüşmüştü. Uzun okumanın ödülü, bu sadelikti.",
        "Pazartesi sabahı bu notları takıma okudu. Kaan kaşlarını çattı. \"O zaman önerge yanlış kurulmuş,\" dedi. \"Ne evet ne hayır diyen bir kaynakla nasıl tartışacağız?\"",
        "Elif Hanım gülümsedi. \"Gerçek dünyadaki soruların çoğu böyledir,\" dedi. \"Münazarada bir tarafı savunursun ama karşı tarafın en güçlü argümanını bilmek zorundasın.\"",
      ],
    },
    {
      title: "Taraf Değiştirme Oyunu",
      paragraphs: [
        "Elif Hanım bir hafta sonra yeni bir alıştırma önerdi. Her öğrenci, en az inandığı tarafı savunacaktı. Kaan, önergenin lehinde konuşmak zorundaydı.",
        "Kaan ilk başta direnç gösterdi. Ama hazırlanmaya başlayınca beklemediği şeyler buldu. Bazı öğrenciler yazarken başlamakta çok zorlanıyordu ve boş sayfa onları kaygılandırıyordu.",
        "Bir araştırma özetinde, yapay zekânın yazmaya başlamayı kolaylaştırabileceği belirtiliyordu. Öğrenci, aracın verdiği taslağı eleştirerek kendi metnini geliştirebilirdi. Kaan bunu hiç düşünmemişti.",
        "Konuşmasında bu noktayı öne çıkardı. Yapay zekânın ödevi tamamen yazmasını değil, bir başlangıç noktası sunmasını savundu. Sesinde ilk toplantıdaki öfke yoktu. Örneklerini dikkatle seçmiş, her birinin kaynağını da belirtmişti.",
        "Bu kez karşı tarafı Berk savundu. Teknolojiye ne kadar meraklı olsa da önemli bir riski dile getirdi. Yazmak, yalnız bir ürün değil, bir düşünme biçimiydi.",
        "\"Bir taslağı her zaman araca yazdırırsan,\" dedi Berk, \"cümle kurmayı ve fikrini düzenlemeyi öğrenmezsin. Kas çalıştırılmazsa zayıflar.\" Bu benzetme odada bir süre yankılandı.",
        "Ada da sırası geldiğinde lehte konuştu. Sözlerini yönergenin geri bildirim konusundaki bölümüne dayandırdı. Ama her cümlesinin ardından o iddianın sınırını da belirtmeyi ihmal etmedi.",
        "Alıştırmanın sonunda iki çocuk birbirine bakıp güldü. İkisi de karşı tarafın düşündüğünden daha güçlü olduğunu görmüştü. Ada, iki konuşmadan aldığı notları yan yana koydu.",
        "Elif Hanım alıştırmayı kısa bir yorumla bitirdi. \"Karşı görüşü dinlemek, ona teslim olmak değildir,\" dedi. \"Onu anladığında kendi görüşünü de daha net görürsün.\"",
      ],
    },
    {
      title: "Nehir'in İtirazı",
      paragraphs: [
        "Nehir hazırlıklar boyunca sessiz kalmıştı. Bir toplantıda nihayet söz istedi. Sesi biraz titriyordu ama kararlıydı.",
        "\"Hep öğretmenlerin ve araştırmacıların ne düşündüğünü konuşuyoruz,\" dedi. \"Peki biz öğrenciler ne düşünüyoruz? Bu ödevler bizim ödevlerimiz.\"",
        "Takım bu itirazı ciddiye aldı. Nehir'in önerisiyle okulda kısa ve isimsiz bir anket yapmaya karar verdiler. Anketi önce Elif Hanım'a ve okul idaresine onaylattılar.",
        "Anket, kırk öğrenciden oluşan küçük bir gruba uygulandı. Sorular yönlendirici olmasın diye birkaç kez yeniden yazıldı. \"Kopya çekiyor musun?\" yerine \"Ödev hazırlarken hangi araçları kullanıyorsun?\" gibi tarafsız ifadeler seçildi.",
        "Sonuçlar karışıktı. Bazı öğrenciler yapay zekâyı yalnız fikir bulmak için kullandığını yazdı. Bazıları ise hiç kullanmadığını, kendi sesini kaybetmekten korktuğunu belirtti.",
        "Birkaç öğrenci daha ilginç bir şey söylemişti. Araçların verdiği bilgilerin bazen yanlış çıktığını, bunu sonradan fark ettiklerini anlatmışlardı. Ada bu cevapları raporla karşılaştırdı ve örtüştüğünü gördü.",
        "Kaan anket sonuçlarını genellemek istedi. Ama Nehir onu nazikçe durdurdu. \"Kırk kişi bütün öğrencileri temsil etmez,\" dedi. \"Bunu konuşmamızda açıkça söylemeliyiz.\"",
        "Anketin son sorusu açık uçluydu ve en çok cevabı o almıştı. Öğrenciler, yapay zekânın nasıl kullanılması gerektiğine dair kendi kurallarını yazmışlardı. Kimi yalnız beyin fırtınası için izin verirdi, kimi hiç izin vermezdi.",
        "Nehir bu cevapları dikkatle sınıflandırdı. Gruplar arasında beklediğinden daha fazla ortak nokta buldu. Neredeyse herkes, ödevin son hâlinin öğrencinin kendi sesini taşıması gerektiğini düşünüyordu.",
        "Elif Hanım, Nehir'in bu dürüstlüğünü takıma örnek gösterdi. Kendi topladıkları veriyi bile sınırlarıyla sunmak, onları daha güvenilir kılacaktı.",
      ],
    },
    {
      title: "Bir Hata",
      paragraphs: [
        "Turnuvaya bir hafta kala Berk heyecanla bir istatistik buldu. Bir haber sitesine göre öğrencilerin büyük çoğunluğu ödevlerini yapay zekâya yazdırıyordu. Bu rakam, lehte konuşma için çok güçlü görünüyordu.",
        "Ada rakamın kaynağını sordu. Berk haberin bağlantısını açtı. Haberde araştırmanın adı geçiyordu ama bağlantı verilmemişti.",
        "Ada araştırmanın aslını aramaya başladı. Bir saatlik çalışmanın sonunda orijinal belgeyi buldu. Araştırma yalnız bir ülkedeki, tek bir yaş grubundaki küçük bir örneklemle yapılmıştı.",
        "Üstelik orijinal belgede \"yazdırıyor\" değil, \"en az bir kez denemiş\" ifadesi kullanılmıştı. Haber, sonucu çarpıtarak çok daha çarpıcı bir başlık atmıştı. Berk hayal kırıklığıyla sandalyesine yaslandı.",
        "\"Bunu turnuvada kullansaydım,\" dedi, \"karşı takım bizi yerle bir ederdi.\" Kaan ilk kez Berk'in omzuna dostça vurdu. \"Ama kullanmadın,\" dedi. \"Çünkü kontrol ettik.\"",
        "Takım bu deneyimi bir kural hâline getirdi. Hiçbir rakamı, kaynağına ulaşmadan kullanmayacaklardı. Haber metni değil, araştırmanın kendisi okunacaktı. Kaynağa ulaşılamayan bilgiler ise ayrı bir listede bekleyecekti.",
        "Elif Hanım o gün onlara bir kavram öğretti: ikincil kaynak. Haberler, araştırmaları anlatan ikincil kaynaklardı. Her aktarımda bilginin biraz değişebileceğini unutmamak gerekiyordu.",
        "Berk ertesi gün bu hatayı kulüpteki diğer takımlarla da paylaştı. Utanmak yerine öğrendiklerini anlatmayı seçti. Birkaç öğrenci, aynı haberi kendi notlarına aldığını söyleyip teşekkür etti.",
        "Ada o akşam bütün notlarını yeniden gözden geçirdi. Her iddianın yanına kaynağını ve kaynağın türünü yazdı. Defteri artık küçük bir kaynakça gibi görünüyordu.",
      ],
    },
    {
      title: "Turnuva Sabahı",
      paragraphs: [
        "Turnuva günü sabah erkenden il merkezindeki okulda toplandılar. Koridorlar, farklı okullardan gelen öğrencilerle doluydu. Herkesin elinde not kartları vardı.",
        "Kura çekildi ve takımları önergenin karşısında konuşacaktı. Kaan bunu duyunca kısa bir an rahatladı. Sonra karşı takımın lehte hazırladığı argümanları düşündü ve ciddileşti.",
        "İlk konuşmayı Ada yaptı. Yapay zekânın öğrenme sürecinde yardımcı olabileceğini kabul ederek başladı. Bu açılış, jüri üyelerinin dikkatini hemen çekti.",
        "\"Ama önerge yardım etmekten söz etmiyor,\" dedi Ada. \"Ödevi yazmaktan söz ediyor. Ödevin amacı bir metin üretmek değil, öğrencinin düşünmeyi öğrenmesidir.\"",
        "Karşı takımın konuşmacısı güçlü bir cevap verdi. Bazı öğrencilerin öğrenme güçlükleri yaşadığını, yapay zekânın onlara eşit fırsat sağlayabileceğini söyledi. Bu argüman salonda takdirle karşılandı.",
        "Nehir bu argümanı küçümsemedi. Söz sırası gelince onu açıkça kabul etti. Sonra destek ile yerine yapma arasındaki farka dikkat çekti ve anket verilerini sınırlarıyla birlikte sundu.",
        "Berk, istatistik hatası üzerinden bir örnek verdi. Yapay zekânın da bazen kaynağı belirsiz bilgi ürettiğini anlattı. Bu yüzden öğrencinin, metni kendisi doğrulayabilecek düzeyde düşünmesi gerektiğini söyledi.",
        "Karşı takım, kaynaklarının güvenilirliğini sorguladı. Ada sakin bir şekilde her kaynağın yazarını, tarihini ve yöntemini açıkladı. Jüri üyelerinden biri not kâğıdına bir şey yazdı.",
        "Bir sonraki turda karşı takım yeni bir örnek getirdi. Öğretmenlerin değerlendirme yükünün azalabileceğini söylediler. Nehir bu noktanın tartışmaya değer olduğunu kabul etti ama önergenin öğretmenleri değil, öğrencileri konu aldığını hatırlattı.",
        "Kaan kapanış konuşmasını yaptı. İlk toplantıdaki öfkeli sesi yoktu artık. Karşı tarafın en güçlü noktasını özetledi, sonra kendi takımının neden yine de karşı durduğunu sakince açıkladı.",
      ],
    },
    {
      title: "Jürinin Notu",
      paragraphs: [
        "Sonuçlar öğleden sonra açıklandı. Takım o turda kıl payı kaybetmişti. Jüri, karşı takımın erişilebilirlik argümanını daha güçlü bulmuştu.",
        "Kaan önce hayal kırıklığına uğradı. Ama jüri kâğıdındaki notu okuyunca yüzü değişti. Jüri üyelerinden biri, takımın kaynak kullanımını turnuvanın en titizi olarak değerlendirmişti.",
        "Notta ayrıca şu cümle yazıyordu: \"Karşı görüşü en adil biçimde aktaran takım sizdiniz.\" Ada notu iki kez okudu ve dikkatle katlayıp defterinin arasına koydu.",
        "Dönüş yolunda servis aracında sessizlik vardı. Sonra Berk konuşmaya başladı. \"Bence aslında iki taraf da biraz haklıydı,\" dedi. Bu kez kimse ona itiraz etmedi.",
        "Nehir pencereden dışarı bakarak düşündü. Yapay zekâ ödevi yazmalı mıydı? Hâlâ kesin bir cevabı yoktu. Ama soruyu artık çok daha iyi anlıyordu.",
        "Ertesi salı kulüp yeniden toplandı. Elif Hanım onlardan turnuva hakkında kısa birer değerlendirme yazmalarını istedi. Herkes kendi metnini, hiçbir araç kullanmadan elle yazmayı seçti.",
        "Kaan'ın değerlendirmesi tek bir paragraftı. \"Bu turnuvada en çok, haklı olmak ile haklı çıkmak arasındaki farkı öğrendim,\" diye yazmıştı. \"Önce dinlemek, sonra konuşmak gerekiyormuş.\"",
        "Ada'nın değerlendirmesi ise bir soruyla bitiyordu. \"Önerge değişseydi ve 'yapay zekâ ödevde yardımcı olabilir' deseydi, biz hangi tarafta olurduk?\" Takım bu soruyu bir sonraki toplantının konusu yaptı.",
        "Berk ve Nehir, karşı takımın erişilebilirlik argümanını yeniden incelemeye karar verdi. Kaybettikleri turdan bile öğrenecek bir şey çıkmıştı.",
        "Elif Hanım değerlendirmeleri topladı ve panoya astı. Panonun üstüne takımın dört sorusunu da yazdı: Kim yazmış, ne zaman yazmış, neye dayanıyor ve kim yarar sağlıyor?",
      ],
    },
  ],
  glossary: [
    { word: "önerge", definition: "Münazarada tartışılmak üzere öne sürülen görüş ya da cümledir." },
    { word: "güvenilirliğini", definition: "Bir bilginin ya da kaynağın ne kadar inanılır olduğunu anlatır." },
    { word: "tarafsız", definition: "Hiçbir tarafı kayırmayan, dengeli olan demektir." },
    { word: "argüman", definition: "Bir görüşü desteklemek için öne sürülen gerekçedir." },
    { word: "örneklem", definition: "Bir araştırmada incelenen, büyük bir topluluğu temsil eden küçük gruptur." },
    { word: "ikincil kaynak", definition: "Başka bir çalışmayı aktaran ya da yorumlayan kaynaktır." },
    { word: "kaynakça", definition: "Bir çalışmada kullanılan kaynakların düzenli listesidir." },
  ],
  optionalReflectionPrompt:
    "Katılmadığın bir görüşü en adil biçimde anlatmak sana ne kazandırabilir?",
  sourceTruth,
  contentQualityReview: createPendingContentQualityReview("lise_okuma_16_18"),
};

// Timing follows the actual reading body, excluding headings and glossary.
const body = MUNAZARA_HAZIRLIGI_DRAFT.sections
  .flatMap((section) => section.paragraphs).join(" ");
MUNAZARA_HAZIRLIGI_DRAFT.wordCount =
  body.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
MUNAZARA_HAZIRLIGI_DRAFT.estimatedSeconds = Math.ceil(
  MUNAZARA_HAZIRLIGI_DRAFT.wordCount * 60 / 155,
);
MUNAZARA_HAZIRLIGI_DRAFT.declaredSeconds =
  MUNAZARA_HAZIRLIGI_DRAFT.estimatedSeconds;
