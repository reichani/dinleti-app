import { createPendingContentQualityReview } from '../contentQualityReview.js';

export const KELOGLAN_MASALLARI_DRAFT = {
  id: 'keloglan-masallari-v2-draft',
  replacesIdAfterApproval: 'keloglan-masallari',
  title: 'Keloğlan ve Duran Değirmen',
  language: 'tr',
  ageBand: '6-7',
  readingPathId: 'ilk_harfler_6_7',
  contentTrack: 'original-folktale-motif-fiction',
  primaryTheme: 'Bir sorun, dikkat ve yardımla birlikte çözülür.',
  contentStatus: 'draft',
  structuralValid: true,
  releaseReady: false,
  estimatedWordsPerMinute: 155,
  declaredSeconds: 107,
  sections: [
    {
      title: 'Boş Un Kabı',
      paragraphs: [
        'Keloğlan sabah erkenden mutfağa girdi. Annesi boş un kabını gösterdi, çünkü köy değirmeni çalışmıyordu.',
        'Keloğlan çarşıdan un almak istedi. Annesi önce değirmene bakmasını önerdi, belki komşular yardım bekliyordu.',
        'Keloğlan küçük heybesini omzuna astı. Dere yoluna doğru sakin ve dikkatli adımlarla yürüdü. Uzakta duran sessiz çarkı hemen fark etti.',
      ],
    },
    {
      title: 'Ağır Çuval',
      paragraphs: [
        'Yol kıyısında yaşlı bir kadın bekliyordu. Küçük buğday çuvalını tek başına taşıyamıyordu.',
        'Keloğlan çuvalın bir ucunu sıkıca tuttu. İkisi değirmene kadar yavaşça birlikte yürüdü. Kadın ona içtenlikle teşekkür etti.',
        'Değirmenin önünde uzun bir sıra vardı. Çark durduğu için kimse un alamıyor, değirmenci suyu inceliyordu.',
      ],
    },
    {
      title: 'Suyun Önündeki Dal',
      paragraphs: [
        'Keloğlan derenin kıyısından dikkatle baktı. Kalın dallar su kapağını kapatmıştı. Su çarka ulaşmadan yana taşıyordu.',
        'Dalları hemen çekmeye kalkmadı, çünkü dönen çark tehlikeliydi. Önce değirmenciye gördüklerini anlattı.',
        'Değirmenci suyu güvenli yerden kesti. Köylüler uzun kancalar getirdi. Herkes sağlam zeminde sırayla çalıştı.',
        'Son dal çıkınca su yolu açıldı. Değirmenci çevreyi yeniden kontrol etti. Sonra suyu yavaşça serbest bıraktı.',
      ],
    },
    {
      title: 'Paylaşma Bilmecesi',
      paragraphs: [
        'Çark yeniden dönmeye başladı. Fakat sırada çok az buğday vardı. Her aile önce kendi ununu istiyordu.',
        'Köyün habercisi şu bilmeceyi sordu: Paylaştıkça ne çoğalır. Sıradakiler farklı cevaplar düşündü.',
        'Keloğlan, “Yardım çoğalır,” diye cevap verdi. Bir kişi çuval taşırsa diğeri sırayı düzenlerdi. Böylece iş daha hızlı ilerlerdi.',
        'Köylüler bu öneriyi denedi. Kimse sırasını kaybetmedi. Küçük çuvallar önce, büyük çuvallar sonra öğütüldü.',
      ],
    },
    {
      title: 'Dönen Çark',
      paragraphs: [
        'Akşama doğru yaşlı kadının unu hazırdı. Kadın ekmeğini paylaşmayı teklif etti. Keloğlan da annesine yetecek unu aldı.',
        'Değirmenci su yoluna sağlam bir ızgara koydu. Dallar kapağa ulaşmayacak, köylüler yolu haftalık kontrol edecekti.',
        'Keloğlan eve dönerken çarkın sesini dinledi. Sorunu tek başına çözmemiş, doğru ipucundan sonra yardım istemişti.',
        'Annesi unu büyük kaba boşalttı. O gece bütün komşular birlikte sıcak ekmek pişirdi. Paylaşılan ortak emek, bütün sofralara sıcaklık taşıdı.',
      ],
    },
  ],
  glossary: [
    { word: 'değirmen', definition: 'Tahılı un yapan düzenek.' },
    { word: 'çark', definition: 'Su ile dönen büyük teker.' },
    { word: 'ızgara', definition: 'Dalları tutan aralıklı engel.' },
    { word: 'ipucu', definition: 'Çözümü bulmaya yardım eden belirti.' },
    { word: 'emek', definition: 'Bir iş için verilen çaba.' },
  ],
  optionalReflectionPrompt: 'İstersen, köylüler başka hangi işi paylaşabilirdi?',
  reflectionOptional: true,
  reflectionScored: false,
  sourceTruth: {
    sourceType: 'original-folktale-motif-fiction',
    scope: 'Keloğlan halk anlatısı tipinden esinlenen özgün Okurio kurmacasıdır. Belirli bir Keloğlan masalının tam metni, çevirisi veya kısa uyarlaması değildir. Production kaydındaki üç ayrı özetin yerine tek olay örgüsü önerir.',
    sourceUrls: [
      'https://ekitap.ktb.gov.tr/TR-78473/masallar.html',
      'https://ekitap.ktb.gov.tr/TR-79940/masallarin-sembolik-dili-baglaminda-keloglan-tipiuzerin-.html',
    ],
    checkedAt: '2026-09-17',
    verificationStatus: 'pending-human-review',
  },
  factualReview: {
    status: 'pending-human-review',
    notes: 'Değirmen güvenliği, halk anlatısı bağlamı ve kapsam değişikliği insan incelemesi gerektirir.',
  },
  originalityRightsReview: {
    status: 'pending-human-review',
    notes: 'Özgün metin iddiası, Keloğlan kültürel motifi ve ülkeye göre hak durumu insan incelemesi gerektirir.',
  },
  safeguardingLanguageReview: {
    status: 'pending-human-review',
    notes: 'Su, çark ve dal temizleme sahnelerindeki yetişkin gözetimi ile erişilebilir ton insan incelemesi gerektirir.',
  },
  contentQualityReview: createPendingContentQualityReview('ilk_harfler_6_7'),
};
