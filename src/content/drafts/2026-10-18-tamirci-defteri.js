import { createPendingContentQualityReview } from "../contentQualityReview.js";

const sourceTruth = Object.freeze({
  work: "Tamirci Defteri",
  scope: "Okurio için özgün genç okur hikâyesi; mahalle dükkânını okul projesiyle belgelemek, dinlemek ve kanıta dayalı savunu",
  sourceType: "original",
  rightsHolder: "Okurio",
  adaptationStatus: "not-applicable",
  verificationStatus: "pending-human-review",
  references: [],
});

export const TAMIRCI_DEFTERI_DRAFT = {
  id: "tamirci-defteri-draft",
  title: "Tamirci Defteri",
  language: "tr",
  ageBand: "12-14",
  readingPathId: "genc_okurlar_12_14",
  contentTrack: "okurio-original-pilot",
  primaryTheme: "Bir topluluğu korumak, önce dinlemek ve fikri kanıtla savunmaktan geçer",
  contentStatus: "draft",
  structuralValid: true,
  releaseReady: false,
  estimatedWordsPerMinute: 155,
  sections: [
    {
      title: "Camdaki Kâğıt",
      paragraphs: [
        "Ece her sabah okula giderken aynı köşeden geçerdi. Köşede, tabelası solmuş küçük bir bisiklet tamirhanesi vardı. Kapının önünde her zaman birkaç tekerlek, bir pompa ve yağlı bir bez dururdu.",
        "Pazartesi sabahı camda yeni bir kâğıt gördü. Kâğıtta büyük harflerle \"Ay sonunda kapanıyoruz\" yazıyordu. Ece bir an durdu, sonra kâğıdı telefonuyla fotoğrafladı.",
        "Dükkânın sahibi Rıza Usta içeride bir zinciri temizliyordu. Ece'yi görünce başını kaldırdı ve yorgun bir gülümsemeyle selam verdi. Ece ne diyeceğini bilemedi, yalnızca başını salladı.",
        "Okulda sınıf arkadaşı Baran'a fotoğrafı gösterdi. Baran'ın ilk bisikleti de o dükkânda onarılmıştı. Bir süre ikisi de konuşmadı.",
        "Tam o gün sosyal bilgiler öğretmeni Selma Hanım yeni bir proje duyurdu. Her grup, mahallesinde önemli bulduğu bir yeri belgeleyecekti. Sunumlar üç hafta sonra okul salonunda yapılacaktı.",
        "Baran, Ece'ye baktı. Ece de aynı şeyi düşünüyordu. Proje konusu kendiliğinden ortaya çıkmıştı.",
        "Akşam yemeğinde Ece konuyu ailesine açtı. Annesi, çocukken o dükkândan zil aldığını hatırladı. Babası ise mahallede böyle yerlerin her yıl biraz daha azaldığını söyledi. Ece bu sözleri defterinin ilk sayfasına yazdı.",
        "Teneffüste Selma Hanım'a fikirlerini anlattılar. Öğretmen konuyu beğendi ama bir uyarı yaptı. \"Önce dinleyin,\" dedi, \"kendi cevabınızı hazırlamadan önce.\"",
      ],
    },
    {
      title: "Önce Dinlemek",
      paragraphs: [
        "Ertesi gün okul çıkışında dükkâna gittiler. Rıza Usta onları tezgâhın yanındaki iki eski tabureye oturttu. Ece defterini açtı, Baran da ses kaydı için izin istedi.",
        "Rıza Usta izin verdi ama önce kendisi bir soru sordu. \"Neden bu dükkânı seçtiniz?\" Baran, ilk bisikletinin hikâyesini anlattı. Usta o kırmızı bisikleti hemen hatırladı.",
        "Ece ilk sorusunu dikkatle seçmişti. \"Bu dükkân sizin için ne anlama geliyor?\" diye sordu. Rıza Usta cevap vermeden önce duvardaki eski fotoğraflara uzun uzun baktı.",
        "Sonra Rıza Usta konuşmaya başladı. Dükkânı otuz iki yıl önce babasından devralmıştı. Mahalledeki çocukların çoğuna bisiklete binmeyi bu kaldırımda öğretmişti.",
        "Kapanma nedenini de saklamadı. Kira son bir yılda neredeyse ikiye katlanmıştı. Üstelik müşteriler azalmış, insanlar bozulan bisikleti onarmak yerine yenisini almaya başlamıştı.",
        "Ece araya girip çözüm önermek istedi. Ama Selma Hanım'ın sözünü hatırladı ve kalemini bıraktı. Rıza Usta'nın sözünü kesmeden sonuna kadar dinledi.",
        "Konuşmanın sonunda usta bir şey daha söyledi. \"Kimse benim için üzülsün istemiyorum,\" dedi. Bu cümle Ece'nin aklında kaldı.",
        "Ece kaydı durdurmadan önce ustaya teşekkür etti. Bir sonraki hafta yeniden gelip gelemeyeceklerini sordu. Rıza Usta, \"Kapım açık olduğu sürece gelin,\" dedi.",
        "Dönüş yolunda Baran sessizdi. Sonunda düşüncesini açıkça söyledi. Belki de projenin amacı dükkânı kurtarmak değil, olanı doğru anlatmaktı.",
      ],
    },
    {
      title: "Kanıt Defteri",
      paragraphs: [
        "Akşam Ece yeni bir defter açtı. Kapağına \"Tamirci Defteri\" yazdı. İçini üç bölüme ayırdı: duyduklarımız, gördüklerimiz ve henüz bilmediklerimiz.",
        "İlk hafta boyunca dükkânın önünde gözlem yaptılar. Her gün aynı saatte yarım saat kaldılar ve gelen müşterileri saydılar. Kimseyi rahatsız etmemek için uzaktaki bankta oturdular.",
        "Bazı günler hava yağmurluydu ve neredeyse kimse gelmedi. Ece bu günleri listeden çıkarmak istedi, çünkü sayıları düşürüyordu. Baran itiraz etti ve her günün kayda geçmesi gerektiğini söyledi. Sonunda yağmurlu günleri ayrı bir sütunda gösterdiler.",
        "Sonuçlar onları şaşırttı. Günde ortalama dokuz kişi uğruyordu. Bunların çoğu yalnızca lastik şişirtiyor ya da küçük bir ayar yaptırıyordu.",
        "Baran bu bilginin önemli olduğunu düşündü. Usta bu küçük işlerin çoğu için para almıyordu. Yani dükkân, kazandığından daha fazla insana dokunuyordu.",
        "Bir de kısa bir anket hazırladılar. Soruları Selma Hanım'la birlikte gözden geçirdiler. Cevabı belli eden, yönlendirici sorular sormamaya; örneğin \"Dükkân kapanmasın, değil mi?\" dememeye dikkat ettiler.",
        "Anketi kırk iki kişi doldurdu. Bunların otuzu dükkânı en az bir kez kullanmıştı. Yirmi bir kişi, dükkân kapanırsa en yakın tamircinin otobüsle yirmi dakika uzakta olduğunu yazdı.",
        "Ece sayıları bir tabloya döktü. Baran ise ses kayıtlarından kısa alıntılar seçti. Her bilginin yanına nereden geldiğini ve hangi gün toplandığını yazdılar.",
      ],
    },
    {
      title: "Karşı Görüş",
      paragraphs: [
        "İkinci haftanın başında beklenmedik bir şey oldu. Dükkânın bulunduğu binanın sahibi Nurten Hanım onlarla konuşmak istedi. Baran biraz gerildi, çünkü onu kötü biri sanıyordu.",
        "Nurten Hanım çay ikram etti ve kendi durumunu anlattı. Binanın çatısı akıyordu ve onarım masrafı çok yüksekti. Kira artışı olmadan bu işi karşılayamayacağını söyledi.",
        "Ece yine dinledi ve not aldı. Nurten Hanım'ın da haklı olduğu noktalar vardı. Hikâyede kötü biri yoktu, yalnızca zor bir durum vardı.",
        "Eve dönünce Baran hayal kırıklığına uğradığını itiraf etti. \"Herkes haklıysa biz neyi savunacağız?\" diye sordu. Ece bu soruyu defterin \"henüz bilmediklerimiz\" bölümüne yazdı.",
        "Ertesi gün Selma Hanım'a danıştılar. Öğretmen, iyi bir savununun karşı görüşü gizlemediğini söyledi. Asıl güç, farklı ihtiyaçları aynı masada görünür kılmaktaydı.",
        "O akşam Ece ile Baran yeni bir soru yazdılar. Kira da çatı da gerçek sorunlardı. Peki mahalle, bu iki sorunu birlikte çözmenin bir yolunu bulabilir miydi?",
        "Bu soru projenin yönünü değiştirdi. Artık yalnızca bir dükkânı anlatmıyorlardı. Bir mahallenin ortak kararını nasıl verebileceğini araştırıyorlardı.",
        "Bu yeni soru için mahalle derneğinin başkanıyla da görüştüler. Başkan, benzer bir sorunun yıllar önce fırın için yaşandığını anlattı. O zaman komşular birlikte çözüm aramış, ama kimse süreci yazıya dökmemişti.",
      ],
    },
    {
      title: "Salondaki Sunum",
      paragraphs: [
        "Sunum günü salonda veliler, öğretmenler ve öğrenciler vardı. Ön sırada Rıza Usta ile Nurten Hanım yan yana oturuyordu. Ece'nin elleri hafifçe titriyordu.",
        "Önce Baran ses kayıtlarından kısa bölümler dinletti. Ardından Ece tabloyu perdeye yansıttı. Günde dokuz ziyaret ve yirmi dakikalık otobüs yolu herkesin dikkatini çekti.",
        "Sonra beklenmedik bir şey yaptılar. Nurten Hanım'ın çatı sorununu da açıkça anlattılar. Salonda kısa bir sessizlik oldu, birkaç veli başını salladı.",
        "Nurten Hanım ön sırada hafifçe gülümsedi. Kendi sorununun saklanmadığını görmek onu rahatlatmıştı. Rıza Usta da yanında sessizce başını eğdi.",
        "Ece son slaytta üç öneri sundu. Birincisi, okul kulübünün dükkânda haftalık bir bakım atölyesi düzenlemesiydi. İkincisi, velilerin bisiklet bakımı için düzenli abonelik başlatmasıydı.",
        "Üçüncü öneri Baran'ındı. Mahallede çatı onarımı bilen ustalar vardı ve bazıları anket kâğıtlarına yardım teklif etmişti. Belki onarımın bir kısmı imece usulüyle yapılabilirdi.",
        "Sunumdan sonra bir veli itiraz etti. Abonelik fikrinin herkes için uygun olmayabileceğini söyledi. Ece bu itirazı not aldı ve teşekkür etti.",
        "Ece, bu konuda daha fazla bilgi toplamaları gerektiğini dürüstçe kabul etti. Salon bu cevabı da alkışladı. Fikrini savunmak, her soruya hazır cevap vermek demek değildi.",
      ],
    },
    {
      title: "Yeni Kâğıt",
      paragraphs: [
        "Sunumdan iki gün sonra mahalle derneği bir toplantı düzenledi. Toplantıya Rıza Usta, Nurten Hanım ve otuzdan fazla komşu katıldı. Ece ile Baran da defterleriyle oradaydı.",
        "Toplantı kolay geçmedi. Bazı komşular dükkânın zaten eskidiğini düşünüyordu. Ama tablodaki sayılar ve kayıtlardaki sesler tartışmayı sakin bir zemine taşıdı.",
        "Sonunda birkaç somut karar çıktı. İki emekli usta, çatı onarımına gönüllü yardım edecekti. Nurten Hanım da onarım bitene kadar kira artışını yarıya indirmeyi kabul etti.",
        "Okulun bisiklet kulübü, her cumartesi dükkânda bakım atölyesi yapacaktı. Rıza Usta öğrencilere zincir ve fren ayarını öğretecekti. Atölye için küçük bir katılım ücreti belirlendi.",
        "Her şey çözülmüş değildi. Dükkânın uzun vadede ayakta kalması, gelen müşteri sayısına bağlıydı. Rıza Usta altı ay sonra durumu yeniden değerlendireceğini söyledi.",
        "Ece ile Baran, toplantının notlarını derneğe teslim ettiler. Kim neyi üstlendiyse adının yanına yazılmıştı. Böylece verilen sözler unutulmayacak, birkaç ay sonra yeniden kontrol edilebilecekti.",
        "Ay sonunda Ece yine o köşeden geçti. Camdaki eski kâğıt kaldırılmıştı. Yerinde yeni bir yazı vardı: \"Cumartesi atölyesi saat onda, herkes davetli.\"",
        "Ece kâğıdı fotoğrafladı ve defterine yapıştırdı. Altına tek bir cümle yazdı. Dinlemek, değişimin ilk adımıydı.",
      ],
    },
  ],
  glossary: [
    { word: "tamirhane", definition: "Bozulan araç ya da eşyaların onarıldığı iş yeridir." },
    { word: "anket", definition: "Birçok kişiye aynı soruların sorulduğu bilgi toplama yoludur." },
    { word: "yönlendirici", definition: "Cevabı önceden belli bir yöne iten soru ya da sözdür." },
    { word: "savunu", definition: "Bir fikri gerekçe ve kanıtla desteklemektir." },
    { word: "imece", definition: "Bir işin komşular tarafından birlikte ve karşılıksız yapılmasıdır." },
    { word: "abonelik", definition: "Bir hizmetten düzenli ödeme yaparak yararlanma anlaşmasıdır." },
    { word: "itiraz", definition: "Bir fikre katılmadığını gerekçesiyle söylemektir." },
  ],
  optionalReflectionPrompt:
    "Ece ve Baran sunumda Nurten Hanım'ın sorununu da anlatmayı neden seçti?",
  sourceTruth,
  contentQualityReview: createPendingContentQualityReview("genc_okurlar_12_14"),
};

// Timing follows the actual reading body, excluding headings and glossary.
const body = TAMIRCI_DEFTERI_DRAFT.sections
  .flatMap((section) => section.paragraphs).join(" ");
TAMIRCI_DEFTERI_DRAFT.wordCount =
  body.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
TAMIRCI_DEFTERI_DRAFT.estimatedSeconds = Math.ceil(
  TAMIRCI_DEFTERI_DRAFT.wordCount * 60 / 155,
);
TAMIRCI_DEFTERI_DRAFT.declaredSeconds =
  TAMIRCI_DEFTERI_DRAFT.estimatedSeconds;
