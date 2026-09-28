import { createPendingContentQualityReview } from '../contentQualityReview.js';
const sections = [
  { title: 'Boş Sayfa', paragraphs: [
    'Oki, akşam masasına boş bir kâğıt koydu. Nana karşısındaki koltukta resimli bir kitap okuyordu. Pencerenin dışında Ay ve ince bulutlar görünüyordu.',
    'Oki, gördüğü manzara için şiir yazmak istedi. Önce kâğıdına küçük bir pencere resmi çizdi. Sonra pencerenin üstüne parlak bir Ay ekledi.',
    'Fakat resmin altına hangi sözcükleri koyacağını bilemedi. Kalemini bırakıp bir süre dışarıya baktı. Nana, isterse gördüklerini anlatabileceğini ona söyledi.',
    'Oki gökyüzündeki ince bulutu parmağıyla hemen gösterdi. Bulut ona yumuşak bir yastık gibi görünüyordu. Nana, bu benzetmeyi unutmamak için not aldı.',
  ] },
  { title: 'İlk Dizeler', paragraphs: [
    'Oki artık şiirine başlayacak bir görüntü bulmuştu. Ay için de başka bir benzetme düşündü. Onu gökte duran beyaz düğmeye benzetti.',
    'Nana, Oki’nin söylediği sözcükleri kâğıda dikkatle yazdı. Sonra yazdığı iki dizeyi ona okudu. Oki dinlerken kendi resmine tekrar baktı.',
    'İnce bulut gökte yumuşak bir yastık gibi. Beyaz Ay uzakta küçük bir düğme gibi.',
    'Oki bu dizelerin devamını da getirmek istedi. Ancak sırf benzesin diye sözcük seçmek istemiyordu. Pencerede gördüğü başka bir ayrıntıyı aramaya başladı.',
  ] },
  { title: 'Değişen Resim', paragraphs: [
    'O sırada bulut Ay’ın önünden geçmeye başladı. Oki resimdeki düğmeyi artık göremediğini fark etti. Yazdıkları şiirin yanlış olduğunu sanıp kâğıdı çevirdi.',
    'Nana eski resmi yeniden görmek istediğini söyledi. Resim biraz önce gördüklerini hâlâ anlatıyordu. Şimdiki görüntü için başka dizeler ekleyebilirlerdi.',
    'Oki kâğıdı geri çevirip yeni görüntüyü düşündü. Ay kaybolmamış, yalnızca bulutun arkasında kalmıştı. Oki bunu saklambaç oyunundaki perdeye benzetti.',
    'Nana bu kez kalemi kâğıdın altına götürdü. Oki yeni dizelerini söylemeden önce biraz bekledi. Bulutun kenarında beyaz bir parıltı yeniden belirdi.',
    'Bulut geçti önümden ince bir perde gibi. Ay göründü ardından tanıdık bir yüz gibi.',
  ] },
  { title: 'Oki’nin Şiiri', paragraphs: [
    'Nana dört dizeyi başından sonuna kadar okudu. Oki şiirde hem önceyi hem sonrayı duydu. Değişen görüntü artık şiirin bir parçası olmuştu.',
    'Kâğıdın üstüne birlikte şiirin adını koydular. Nana yazıyı yazdı, Oki küçük resimleri tamamladı. İlk resmin yanına bulutlu ikinci pencereyi çizdi.',
    'Oki şiirini ertesi gün Lili’ye göstermek istedi. Kâğıdı kıvrılmaması için resim dosyasına yerleştirdi. Sonra kalemlerini masanın üzerindeki kutuya geri koydu.',
    'Pencereye son kez baktığında bulut daha uzaktaydı. Oki yeni görüntüyü de bir süre izledi. Bu akşamın şiiri artık dosyasında onu bekliyordu.',
  ] },
];
const words = text => text.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
const wordCount = words(sections.flatMap(s => s.paragraphs).join(' '));
const estimatedSeconds = Math.ceil(wordCount * 60 / 155);
export const OKI_AY_SIIRI_DRAFT = {
  id: 'oki-ay-siiri-v2-draft', replacesIdAfterApproval: 'oki-ay-siiri', title: 'Oki’nin Ay Şiiri',
  ageBand: '6-7', readingPathId: 'ilk_harfler_6_7', contentTrack: 'siirli-hikaye',
  primaryTheme: 'Değişen bir görüntüyü kendi sözcükleriyle anlatmak',
  contentStatus: 'draft', releaseReady: false, wordCount, estimatedSeconds,
  declaredSeconds: estimatedSeconds, estimatedWordsPerMinute: 155, sections,
  editorialScope: 'Kısa şiir yerine dört özgün dize içeren tamamlanmış hikâye önerisi. Tür, raf ve ilk harf/hece uyumu insan incelemesi gerektirir; otomatik değiştirme yok.',
  glossary: [
    { word: 'dize', definition: 'Şiirin bir satırı.' },
    { word: 'benzetme', definition: 'Bir şeyi başka bir şeye benzer anlatma.' },
    { word: 'ayrıntı', definition: 'Bir bütündeki küçük özellik.' },
    { word: 'parıltı', definition: 'Göze çarpan küçük ışık.' },
    { word: 'manzara', definition: 'Baktığımız yerde gördüğümüz görünüş.' },
  ],
  optionalReflectionPrompt: 'İstersen anlat: Sen bulutu neye benzetirdin?', reflectionOptional: true, reflectionScored: false,
  sourceTruth: { sourceType: 'original', scope: 'Anlatı ve dört dize bu taslak için özgün yazıldı; dış şiir veya kamu malı uyarlaması değil.', adaptationStatus: 'not-applicable', verificationStatus: 'pending-human-review' },
  factualReview: { status: 'pending-human-review', notes: 'Bulutun görüşü kapatması ile Ayın kaybolması ayrılıyor; düğme, yastık, perde ve yüz ifadeleri benzetmedir.' },
  originalityRightsReview: { status: 'pending-human-review', notes: 'Dış metin kullanılmadı; özgünlük ve hak incelemesi insan tarafından tamamlanmalı.' },
  safeguardingLanguageReview: { status: 'pending-human-review', notes: 'İç mekân, Nana desteği; yazıyı yetişkin yazıyor. Harf sırası, çözümlenebilir sözcükler ve şiirli hikâye türü insan incelemesine açık.' },
  contentQualityReview: createPendingContentQualityReview('ilk_harfler_6_7'),
};
