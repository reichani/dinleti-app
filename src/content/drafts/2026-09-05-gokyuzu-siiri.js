import { createPendingContentQualityReview } from '../contentQualityReview.js';

const sections = [
  { title: 'Boş Kalan Pano', paragraphs: [
    'Oki, cumartesi sabahı okulun bahçesine erken geldi. Duvarın yanında büyük, boş bir pano duruyordu. Öğretmeni panoya gökyüzü şiiri asmak istiyordu.',
    'Sınıftaki herkes tek bir dize önerecekti. Oki mavi kâğıdını açtı, fakat hiçbir şey yazamadı. Gökyüzü ona fazla geniş görünüyordu.',
    'Lili, önce küçük bir ayrıntı seçmesini önerdi. İkisi çınarın altındaki banka oturdu. Başlarını kaldırıp sessizce çevrelerine baktılar.',
    'İnce bir bulut, çatının üstünden ağır ağır geçti. Bir serçe rüzgârla yön değiştirip dala kondu. Oki ilk görüntüsünü sonunda bulmuştu.',
    'Defterine saati ve baktığı yönü de ekledi. Böylece aynı yeri sonra yeniden karşılaştırabilecekti.',
  ] },
  { title: 'Gündüzün Renkleri', paragraphs: [
    'Oki bulutu, denizde ilerleyen beyaz bir adaya benzetti. Lili serçenin gökte bıraktığı görünmez yolu düşündü. İki fikri küçük deftere birlikte kaydettiler.',
    'Bahçeye Toto gelince mavi göğün hep aynı olmadığını söyledi. Uzakta gri bir şerit belirmişti. Güneşin çevresindeki açık renk de değişiyordu.',
    'Arkadaşlar farklı yönlere bakıp gördüklerini sırayla anlattı. Biri rengi, biri hareketi, biri sesi seçti. Böylece tek görüntü üç ayrı ayrıntıya dönüştü.',
    'Oki, şiirin yalnız güzel sözcüklerden oluşmadığını anladı. Dikkatle bakmak da şiirin bir parçasıydı. Fakat panoya hangi dizeleri asacaklarını henüz bilmiyorlardı.',
    'Toto üç küçük renk kartı çıkardı. Her gözlem için ayrı kart kullanmayı önerdi.',
  ] },
  { title: 'Rüzgârın Kararı', paragraphs: [
    'Öğleden sonra rüzgâr hızlandı ve mavi kâğıt uçtu. Kâğıt çitin yanındaki ıslak toprağa düştü. Yazılan sözcüklerin bazıları hemen dağıldı.',
    'Oki bütün çalışmanın kaybolduğunu düşünüp bir süre sustu. Lili, defterdeki gözlem notlarının hâlâ durduğunu gösterdi. Toto da yeni bir kâğıt getirdi.',
    'Üç arkadaş kaybolan dizeleri ezberden kopyalamadı. Çünkü gökyüzü artık sabahki gibi görünmüyordu. Gri şerit büyümüş, serçe başka bir dala geçmişti.',
    'Oki değişen görüntüyü şiirin sorunu değil, dönüm noktası yaptı. Sabahın açık mavisini ve şimdiki griliği yan yana getirdi. Yeni şiir böylece harekete başladı.',
    'Mavi sayfa sabahın açık penceresiydi. Bulut geçti, pencere başka renge büründü.',
    'Islanan ilk kâğıdı da çöpe atmadılar. Kuruması için güvenli bir rafa bıraktılar.',
  ] },
  { title: 'Akşamı Beklemek', paragraphs: [
    'Arkadaşlar şiirin sonunu hemen yazmak istemedi. Öğretmenlerinden izin alıp verandada akşamı beklediler. Hava serinleyince ince ceketlerini giydiler.',
    'Güneş alçalırken çatıların kenarı turuncu göründü. Bir süre sonra ilk parlak nokta ortaya çıktı. Onun yıldız mı, gezegen mi olduğunu tahmin etmediler.',
    'Lili, bilmedikleri şeyi şiirde kesin bir adla kullanmamayı önerdi. Oki bu fikri sevdi. Parlak noktayı yalnız gördükleri biçimiyle anlattılar.',
    'Gökte tek bir ışık, uzak bir virgül gibi durdu. Gün bitmedi; yalnız yeni bir cümleye geçti.',
    'Şiirin gündüzden geceye uzanan yolu artık tamamlanmıştı. Yine de kapanış için panoyu düşünmeleri gerekiyordu. Okuyan kişi bu değişimi nasıl izleyecekti?',
    'Toto kartları zamana göre sıralamayı önerdi. Oki sıralamanın şiire açık bir yol vereceğini düşündü.',
  ] },
  { title: 'Değişen Gökyüzü', paragraphs: [
    'Ertesi sabah üç arkadaş panonun önünde yeniden buluştu. Dizeleri tek uzun blok yapmak yerine renkli kartlara ayırdılar. Her kart günün başka anını taşıdı.',
    'İlk kartta beyaz ada gibi ilerleyen bulut vardı. İkinci kartta rüzgârla değişen gri gök görünüyordu. Son kartta uzaktaki parlak nokta bekliyordu.',
    'Kartların arasına küçük oklar koydular. Böylece okuyanlar sabahı, öğleden sonrayı ve akşamı izleyebilecekti. Şiirin değişimi panoda da görünür oldu.',
    'Oki başlığı en üste dikkatle yerleştirdi. Altında kısa bir cümle vardı. Gökyüzünün her hâli okunabilirdi.',
    'Teneffüste çocuklar panonun önünde durup kartları inceledi. Bazıları kendi gördüğü renkleri anlattı. Oki şiirin tek cevap vermediğini fark etti.',
    'Boş başlayan pano artık ortak gözlemler taşıyordu. Oki göğe son kez bakıp gülümsedi. Yeni bir bulut, henüz yazılmamış başka bir dize getiriyordu.',
  ] },
];

const words = text => text.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
const wordCount = words(sections.flatMap(section => section.paragraphs).join(' '));
const estimatedSeconds = Math.ceil(wordCount * 60 / 155);

export const GOKYUZU_SIIRI_DRAFT = {
  id: 'gokyuzu-siiri-v2-draft', replacesIdAfterApproval: 'gokyuzu-siiri', title: 'Gökyüzü Şiiri',
  ageBand: '8-10', readingPathId: 'okuma_guveni_8_10', contentTrack: 'siirli-hikaye',
  primaryTheme: 'Değişimi dikkatle gözleyip kendi sözcükleriyle anlatmak',
  contentStatus: 'draft', releaseReady: false, wordCount, estimatedSeconds,
  declaredSeconds: estimatedSeconds, estimatedWordsPerMinute: 155, sections,
  editorialScope: 'Kısa şiir yerine özgün dizeler içeren tamamlanmış şiirli hikâye önerisi. Tür ve raf kararı insan incelemesi gerektirir.',
  glossary: [
    { word: 'ayrıntı', definition: 'Bir bütündeki küçük özellik.' },
    { word: 'gözlem', definition: 'Bir şeyi dikkatle izleyip fark etme.' },
    { word: 'dize', definition: 'Şiirin bir satırı.' },
    { word: 'veranda', definition: 'Bir yapının önündeki üstü örtülü açık bölüm.' },
    { word: 'dönüm noktası', definition: 'Olayların yönünü değiştiren önemli an.' },
  ],
  optionalReflectionPrompt: 'İstersen anlat: Bugünkü gökyüzünden hangi ayrıntıyı seçerdin?',
  reflectionOptional: true, reflectionScored: false,
  sourceTruth: {
    sourceType: 'original',
    scope: 'Anlatı ve şiir dizeleri bu taslak için özgün yazıldı; dış şiir veya kamu malı uyarlaması değildir.',
    adaptationStatus: 'not-applicable', verificationStatus: 'pending-human-review',
  },
  factualReview: {
    status: 'pending-human-review',
    notes: 'Gökyüzü betimlemeleri gözleme dayalı kurmacadır. Parlak noktanın yıldız veya gezegen olduğu iddia edilmez.',
  },
  originalityRightsReview: {
    status: 'pending-human-review',
    notes: 'Dış metin kullanılmadı; özgünlük ve hak incelemesi insan tarafından tamamlanmalıdır.',
  },
  safeguardingLanguageReview: {
    status: 'pending-human-review',
    notes: 'Çocuklar okul bahçesinde ve veranda alanında öğretmen izniyle kalır. Hava ve mekân güvenliği insan incelemesine açıktır.',
  },
  contentQualityReview: createPendingContentQualityReview('okuma_guveni_8_10'),
};
