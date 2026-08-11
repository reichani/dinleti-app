const pendingReview = () => ({ status: "pending", reviewerName: "", reviewedAt: "", reviewNotes: "" });

const contentQualityReview = {
  ...pendingReview(),
  checklist: {
    narrativeArc: false,
    ageFit: false,
    sectionContinuity: false,
    characterConsistency: false,
    languageQuality: false,
    factualAccuracy: false,
    originalityRights: false,
    accessibilityTone: false,
  },
};

export const UZAY_KULUBU_PIYESI_DRAFT = {
  legacy: {
    id: "uzay-kulubu-piyesi-v2-draft",
    replacesIdAfterApproval: "uzay-kulubu-piyesi",
    baslik: "Uzay Kulübü Sunumu",
    yazar: "Okurio Özgün Bilim Anlatısı",
    seslendiren: "Oki Anlatıcı",
    kategori: "Bilimsel Anlatı",
    yas: "10-12 yaş",
    sureDk: 4.57,
    ozet: "Dört arkadaş, uzay kulübü sunumundaki bir hatayı kanıtlarla birlikte düzeltir.",
    bolumler: [
      {
        ad: "Sunumdan Önce",
        estimatedSeconds: 45,
        metin: `Okulun uzay kulübü cuma günü toplanmıştı. Oki masaya büyük bir gökyüzü haritası serdi. Lili kartları tarih sırasına koydu.

Toto, sunumun ilk cümlesini yüksek sesle okudu. Kartta Güneş'in dev bir gezegen olduğu yazıyordu. Mino hemen kalemini kaldırdı.

Bu cümle ona hiç doğru gelmemişti. Ancak arkadaşını herkesin önünde hemen düzeltmek istemedi. Önce kaynağı birlikte kontrol etmeyi önerdi.

Oki bu sakin öneriyi kabul etti. Kulübün amacı hızlı cevap vermek değildi. Amaç, her iddiayı açık kanıtlarla sınamaktı.

Dört arkadaş görevleri paylaştı. Oki soruları yazacaktı. Lili güvenilir kaynakları bulacaktı.

Toto modeli kuracaktı.

Kaynak seçerken yazarı ve kurum adını dikkatle birlikte kontrol ettiler. Tarihi olmayan görselleri güvenilir kanıt listesine hemen eklemediler.

Mino ise bütün sonuçları prova defterine işleyecekti. Böylece yanlış cümle yeni bir araştırma başlattı.`,
      },
      {
        ad: "Yıldız mı, Gezegen mi?",
        estimatedSeconds: 48,
        metin: `Lili, NASA'nın Güneş sayfasını ekrana açtı. Kaynak, Güneş'i sarı cüce bir yıldız olarak tanımlıyordu. Güneş kendi ışığını ve enerjisini üretiyordu.

Gezegenler ise Güneş'in çevresinde dolanıyordu. Bu ayrım karttaki hatayı açıkça gösterdi. Toto kartı hemen çöpe atmak istedi.

Mino onu bir an durdurdu. Eski kart araştırmanın başlangıcını gösteriyordu. Yanlışın nasıl düzeldiğini saklamak daha anlamlıydı.

Oki iki sütun çizdi. Birine yıldız özelliklerini yazdı. Diğerine gezegen özelliklerini ekledi.

Her özellik için ayrı ve görünür bir kaynak satırı bıraktılar. Böylece benzer kelimeler yüzünden kavramlar yeniden kolayca karışmayacaktı.

Sonra arkadaşlarına önemli bir soru yöneltti. Gökyüzünde parlak görünmek tek başına yeterli miydi? Lili bunun yeterli olmadığını söyledi.

Ay da parlak görünüyordu. Fakat Ay kendi ışığını üretmiyordu. Kulübün ikinci araştırması böyle başladı.`,
      },
      {
        ad: "Ay Işığının Kaynağı",
        estimatedSeconds: 47,
        metin: `Toto bir masa lambası getirdi. Mino beyaz bir topu lambanın karşısında tuttu. Topun yalnız bir tarafı aydınlandı.

Lili farklı açılardan bakınca parlak bölüm değişiyordu. Top kendi ışığını üretmiyordu. Sadece lambadan gelen ışığı yansıtıyordu.

Oki modelin sınırını da deftere yazdı. Lamba gerçek Güneş değildi. Top da gerçek Ay değildi.

Model yalnızca belirli bir soruya cevap verebilirdi. Uzaklıkları ve gerçek boyutları göstermesi mümkün değildi.

Yine de model ışığın yönünü göstermeye yarıyordu. NASA kaynağı da ay ışığını yansımış güneş ışığı olarak açıklıyordu.

Mino ilk kartın yanına yeni not ekledi. Parlak görünen her gök cismi yıldız değildir. Bir cismin ışık kaynağı ayrıca incelenmelidir.

Toto bu kez kartı yırtmadı. Yanlış cümlenin altına kanıtı yazdı. Böylece sunum, yalnız sonuç değil süreç de gösterecekti.`,
      },
      {
        ad: "Sekiz Gezegenin Düzeni",
        estimatedSeconds: 47,
        metin: `Kulübün duvarında sekiz gezegen kartı vardı. Ancak kartlar karışık biçimde asılmıştı. Oki hepsini yere indirdi.

Arkadaşlar NASA'nın Güneş Sistemi sayfasını açtı. Kaynak, sistemde sekiz gezegen bulunduğunu belirtiyordu. Gezegenlerin tümü Güneş'in çevresinde dolanıyordu.

Lili kartları Güneş'e uzaklık sırasına dizdi. Merkür ilk sıraya geldi. Ardından Venüs, Dünya ve Mars yerleşti.

Jüpiter, Satürn, Uranüs ve Neptün dış sırayı tamamladı. Toto, büyük gezegenleri yakına koymanın doğru olmadığını fark etti.

Büyüklük ile uzaklık aynı bilgi değildi. Mino bu ayrımı sunum defterine ekledi. Her kartın altına kullanılan kaynağı yazdı.

Ölçekli olmayan kartları açıkça etiketlemeye karar verdiler. Seyirciler böylece çizimleri gerçek büyüklük sanmayacaktı.

Şimdi sahne düzeni daha anlaşılır görünüyordu. Fakat prova sırasında yeni bir anlaşmazlık çıktı. Herkes final cümlesini kendisi söylemek istiyordu.`,
      },
      {
        ad: "Prova Sırasındaki Düğüm",
        estimatedSeconds: 48,
        metin: `Toto finalin hızlı ve güçlü olması gerektiğini savundu. Lili, bütün kanıtların sakin anlatılmasını istedi. Oki iki fikri aynı anda dinledi.

Mino konuşma sırasının karıştığını fark etti. Kartların arkasına küçük sıra numaraları yazdı. Her rol önceki bulgunun sonucundan başlayacaktı.

Oki yanlış iddiayı okuyacaktı. Lili güvenilir kaynağı tanıtacaktı. Toto lamba modelini gösterecekti.

Mino ise modelin sınırlarını açıklayacaktı. Son bölümde herkes tek cümle söyleyecekti. Böylece bir kişi bütün sahneyi kaplamayacaktı.

İlk prova yine kusursuz değildi. Toto topu erken kaldırdı. Oki henüz soruyu tamamlamamıştı.

Lili geçiş için sessiz bir el işareti önerdi. İşaret konuşmayı bölmeden sıradaki oyuncuyu hazırlıyordu.

Arkadaşlar birbirini suçlamak yerine başlangıca döndü. İşaretleri yavaşlattılar ve geçişleri yeniden denediler. Üçüncü provada bütün roller doğal biçimde birleşti.`,
      },
      {
        ad: "Açık Kalan Gökyüzü",
        estimatedSeconds: 50,
        metin: `Sunum başladığında salondaki ışıklar azaldı. Oki eski kartı seyircilere gösterdi. Karttaki hatayı saklamadıklarını anlattı.

Lili, Güneş'in sistemimizdeki tek yıldız olduğunu söyledi. Toto, Ay modelini dikkatle çevirdi. Mino yansıyan ışığın nasıl göründüğünü açıkladı.

Sonra gezegen kartları doğru sırayla kaldırıldı. Her çocuk bir kartın kaynağını okudu. Seyirciler yalnız cevapları değil, araştırma yolunu da gördü.

Bir öğrenci Pluto'nun neden listede bulunmadığını sordu. Ekip bunu yeni araştırma sorusu olarak kaydetti.

Finalde arkadaşlar yan yana durdu. Oki, iyi bir sorunun araştırmayı başlattığını söyledi. Lili güvenilir kaynakların yön verdiğini ekledi.

Toto, yanlışın değiştirilebilir olduğunu anlattı. Mino ise bilinmeyenlerin dürüstçe açık bırakılmasını hatırlattı. Alkış başladığında hiçbiri tek kahraman değildi.

Kulüp ertesi hafta için yeni bir soru seçti. Kuyruklu yıldızların izleri neden uzundu? Gökyüzü haritasında yeni bir boşluk açıldı.`,
      },
    ],
  },
  metadata: {
    ageBand: "10-12",
    estimatedSeconds: 275,
    estimatedMinutes: 4.58,
    primaryTheme: "yanlış bir iddiayı kanıtlarla birlikte düzeltmek",
    contentTrack: "science-narrative",
    contentStatus: "draft",
    structuralValid: true,
    releaseReady: false,
    sourceType: "original-okurio-ai-assisted",
    originalityProvenanceStatus: "verified-ai-assisted-original",
    thirdPartyRightsClearance: "not-required",
    sourceScope: "Özgün Okurio olay örgüsü ve anlatımı; temel astronomi iddiaları NASA kaynaklarıyla sınırlandırılmıştır.",
    sourceUrls: [
      "https://science.nasa.gov/sun/facts/",
      "https://science.nasa.gov/moon/moon-phases/",
      "https://science.nasa.gov/solar-system/solar-system-facts/",
    ],
    factualReviewStatus: "pending-human-review",
    originalityRightsReviewStatus: "not-required-original-okurio-work",
    glossary: [
      { word: "yıldız", definition: "Kendi enerjisini ve ışığını üreten gök cismi." },
      { word: "gezegen", definition: "Güneş gibi bir yıldızın çevresinde dolanan, kendi ışığını üretmeyen ve yaklaşık küresel olan gök cismi." },
      { word: "yansıtmak", definition: "Gelen ışığı başka bir yöne göndermek." },
      { word: "yörünge", definition: "Bir cismin başka bir cismin çevresindeki yolu." },
      { word: "kanıt", definition: "Bir düşünceyi sınamaya yarayan bilgi." },
      { word: "model", definition: "Bir olayı anlamayı kolaylaştıran basit gösterim." },
    ],
    optionalReflectionPrompt: "Sence ekip yanlış kartı neden saklamadı?",
    reflectionIsOptional: true,
    reflectionIsScored: false,
    aiQualityReview: {
      status: "BLOCKED",
      reviewType: "independent-ai-quality-review",
      reviewerKind: "ai",
      agentName: "okurio-independent-ai-quality-auditor",
      reviewedAt: "2026-08-04T09:15:00Z",
      reviewedCommit: "9390d6599da34b11aa4716b69bcfe1ecd0a09e69",
      humanApproval: false,
      summary: "İçerik çekirdeği ve özgün üretim izi geçti; production okuyucuya bağlı ses, vurgu, kaydırma, mobil ve insan içerik onayı tamamlanmadı.",
      checks: {
        narrativeComplete: { status: "PASS", evidence: "Yanlış iddia, araştırma, sınama, anlaşmazlık, ortak çözüm ve tamamlanmış sunum mevcut." },
        ageFit: { status: "PASS", evidence: "709 kelime 10-12 hedefinde; ortalama cümle 6,01 ve en uzun cümle 10 kelime." },
        sectionContinuity: { status: "PASS", evidence: "Altı bölüm ilk hatadan ortak sunuma uzanan açık neden-sonuç zinciri kuruyor." },
        audioHighlightScroll: { status: "BLOCKED", evidence: "Taslak production okuyucuya bağlı değil; story-ID bazlı TTS, vurgu ve kaydırma testi NOT RUN." },
        factualAccuracy: { status: "PASS", evidence: "Güneş, Ay ışığı ve sekiz gezegen iddiaları kayıtlı NASA kaynaklarının kapsamıyla örtüşüyor." },
        originalityRights: { status: "PASS", evidence: "Okurio için sıfırdan üretilmiş AI destekli özgün anlatıdır; üçüncü taraf metin, karakter veya uyarlama içermez. NASA bağlantıları yalnız olgusal ana kaynaklardır." },
        safeLanguage: { status: "PASS", evidence: "Utandırıcı, klinik, tanılayıcı veya performans baskısı yaratan dil bulunmadı." },
        mobileUsability: { status: "BLOCKED", evidence: "Taslak aktif okuyucuya bağlı değil; Android/Samsung görünürlük ve son kelime kaydırma testi NOT RUN." },
      },
      requiredChanges: [
        "Release-candidate ortamında story-ID bazlı ses, vurgu ve kaydırma testlerini çalıştır.",
        "Android ve Samsung S24 üzerinde aktif kelime güvenli alanını son kelimeye kadar doğrula.",
        "İsimli insan içerik kalite incelemesini aynı commit için kaydet.",
      ],
    },
    ownerApproval: {
      status: "pending",
      ownerName: "",
      approvedAt: "",
      approvedCommit: "",
      approvalNotes: "",
    },
    contentQualityReview,
    experienceCouncilReview: {
      contentProductOwner: pendingReview(),
      accessibilityProductOwner: pendingReview(),
      dyslexiaExperienceLead: pendingReview(),
      adhdExperienceLead: pendingReview(),
      socialEmotionalReadingLead: pendingReview(),
    },
  },
};

export default UZAY_KULUBU_PIYESI_DRAFT;
