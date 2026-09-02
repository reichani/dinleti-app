import { createPendingContentQualityReview } from '../contentQualityReview.js';

const sections = [
  { title: 'Yanlış Etiket', paragraphs: [
    'Oki, okulun gökyüzü panosu için resimler hazırlıyordu. Lili masaya büyük bir Güneş resmi koydu. Toto da Dünya resmini onun yanına bıraktı.',
    'Oki iki resmin altına aynı etiketi yazdı. İkisinde de iri harflerle gezegen sözcüğü duruyordu. Lili kendi kartını yapıştırmadan önce biraz durdu.',
    'Güneş de Dünya gibi bir gezegen miydi? Oki, ikisinin de yuvarlak göründüğünü hemen söyledi. Yine de bu cevap Lili’ye yeterli gelmedi.',
    'Pano ertesi gün okul girişinde sergilenecekti. Yanlış bir etiket herkesin aklını karıştırabilirdi. Üç arkadaş yapıştırıcıyı kapatıp sorularını deftere yazdı.',
    'Önce görünüşe değil, özelliklere bakmaya karar verdiler. Öğretmenleri onlara resimli bir gökbilim kitabı getirdi. Kitabın ilgili sayfasını masanın ortasında birlikte açtılar.',
  ] },
  { title: 'Resimlerin Söylemediği', paragraphs: [
    'Kitapta Güneş’in bir yıldız olduğu açıkça yazıyordu. Yıldızlar kendi içlerinde enerji üretir ve ışık yayar. Dünya ise Güneş çevresinde dolanan bir gezegendi.',
    'Oki eski etiketine baktı ve kalemini kaldırdı. Yuvarlak olmak tek başına cevap vermiyordu. Resimdeki renk de aradıkları ayrımı anlatmıyordu.',
    'Toto, gece gördüğü parlak noktaları hemen hatırladı. Parlayan her noktanın yıldız olduğunu önceden sanmıştı. Lili kitaptaki Venüs resmini ona doğru çevirdi.',
    'Venüs de gökyüzünde oldukça parlak görünebilen bir gezegendi. Gördüğümüz parlaklığında Güneş’ten gelen ışığın yansıması vardı. Bir cismin parlak görünmesi, yıldız olduğunu kanıtlamıyordu.',
    'Bu yeni bilgi panodaki soruyu daha ilginç yaptı. Oki yanlış etiketi atmak yerine kenara ayırdı. Önce neden yanıldığını anlatan bir örnek hazırlamak istedi.',
  ] },
  { title: 'Masanın Üzerindeki Işık', paragraphs: [
    'Öğretmen masaya küçük bir fener ve top koydu. Feneri topun üzerine tutup ne gördüklerini sordu. Toto, topun bir yanının aydınlandığını hemen fark etti.',
    'Lili fener kapandığında topun ışık saçmadığını gösterdi. Top, üzerine gelen ışığın bir kısmını yansıtıyordu. Böylece ışık üretmeden de aydınlık görünebiliyordu.',
    'Oki bu deneyi panoya çizmek için heyecanlandı. Fakat fenerin gerçekten yıldız olmadığını da biliyordu. Öğretmen, yaptıklarının yalnız bir model olduğunu hatırlattı.',
    'Gerçek gökcisimleri arasındaki uzaklıklar masaya sığacak kadar küçük değildi. Top ile fener bunların büyüklüklerini de göstermiyordu. Model yalnızca yansıyan ışığı düşünmelerine yardım ediyordu.',
    'Toto çizimin altına bu sınırı açıklayan not ekledi. Lili, fenerden topa doğru sarı oklar çizdi. Oki ise topun yanına yansıma sözcüğünü yazdı.',
    'Artık panoda yalnız bir doğru cevap bulunmayacaktı. Cevaba nasıl ulaştıklarını gösteren bir yol da olacaktı. Üç arkadaş yeniden resimli kitabın başına döndü.',
  ] },
  { title: 'Parlak Noktanın Sorusu', paragraphs: [
    'Kitaptaki gece fotoğrafında küçük bir ışık noktası vardı. Oki bu kez hemen yıldız etiketi hazırlamadı. Fotoğrafın altında cismin adı yazmıyordu.',
    'Toto, noktayı yalnız parlaklığından tanımayı yeniden denedi. Sonra Venüs sayfasını hatırlayıp önerisini kendisi değiştirdi. Bir fotoğraf, ihtiyaç duydukları bütün bilgileri vermeyebilirdi.',
    'Lili eksik bilgileri defterde ayrı ayrı sıraladı. Fotoğraf nerede ve hangi saatte çekilmişti? Tarihini bilmek de gökyüzü haritasıyla karşılaştırmayı kolaylaştırabilirdi.',
    'Bu bilgiler olmayınca noktaya kesin ad koymadılar. Panoda onu merak sorusu olarak bırakmayı seçtiler. Yanına, tanımak için daha çok bilgi gerektiğini yazdılar.',
    'Oki boş kalan etiketten artık rahatsız olmuyordu. Bilmedikleri yeri göstermek, panoyu eksik bırakmak değildi. Böylece bir tahmini kesin bilgi gibi sunmayacaklardı.',
  ] },
  { title: 'Tamamlanan Pano', paragraphs: [
    'Ertesi sabah arkadaşlar panoyu öğretmenleriyle birlikte astı. Güneş resminin altında artık yıldız etiketi vardı. Dünya ve Venüs ise gezegenler bölümünde duruyordu.',
    'Oki ilk yazdığı etiketi küçük bir zarfa koydu. Zarfın üzerine ilk tahminimiz diye not düştü. Yanına da kitapla düzelttikleri yeni açıklamayı ekledi.',
    'Panoya bakan bir arkadaş parlak noktayı hemen sordu. Toto ona kesin bir isim söylemedi. Bunun yerine hangi bilgilerin eksik olduğunu gösterdi.',
    'Lili de masa modelinin çizimini arkadaşına anlattı. Oki konuşmayı dinlerken panonun artık tamamlandığını hissetti. Sorular kaybolmamıştı, ama cevap arama yolları görünür olmuştu.',
    'Üçü ertesi gözlem için defterde yeni sayfa açtı. Sayfanın başına tarih ve yer için boşluk bıraktılar. Bu kez önce gözlemlerini, sonra tahminlerini yazacaklardı.',
  ] },
];
const countWords = text => text.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
const wordCount = countWords(sections.flatMap(s => s.paragraphs).join(' '));
const estimatedSeconds = Math.ceil(wordCount * 60 / 155);
export const YILDIZ_GEZEGEN_DRAFT = {
  id: 'yildiz-mi-gezegen-mi-v2-draft', replacesIdAfterApproval: 'yildiz-mi-gezegen-mi',
  title: 'Yıldız mı, Gezegen mi?', ageBand: '8-10', readingPathId: 'okuma_guveni_8_10',
  contentTrack: 'bilim-hikayesi', primaryTheme: 'Görünüş yerine kanıtlara bakarak bir ayrımı anlamak',
  contentStatus: 'draft', releaseReady: false, estimatedWordsPerMinute: 155,
  wordCount, estimatedSeconds, declaredSeconds: estimatedSeconds, sections,
  glossary: [
    { word: 'yıldız', definition: 'Kendi içinde enerji üreterek ışık yayan gökcismi.' },
    { word: 'yansıma', definition: 'Gelen ışığın bir yüzeyden geri dönmesi.' },
    { word: 'model', definition: 'Bir özelliği anlamaya yarayan basitleştirilmiş örnek.' },
    { word: 'gözlem', definition: 'Bir şeyi dikkatle inceleyerek bilgi toplama.' },
    { word: 'kanıt', definition: 'Bir düşünceyi destekleyen bilgi veya bulgu.' },
  ],
  optionalReflectionPrompt: 'İstersen düşün: Parlak noktayı tanımak için hangi bilgiyi arardın?',
  reflectionOptional: true, reflectionScored: false,
  sourceTruth: {
    sourceType: 'original', scope: 'Özgün bilim hikâyesi; NASA metninin çevirisi veya tam aktarımı değildir.',
    sourceUrl: 'https://science.nasa.gov/universe/stars/',
    supportingSources: ['https://science.nasa.gov/solar-system/planets/what-is-a-planet/', 'https://science.nasa.gov/venus/'],
    checkedAt: '2026-09-02', verificationStatus: 'pending-human-review',
  },
  factualReview: { status: 'pending-human-review', notes: 'Yıldız enerjisi, Venüsün yansıyan ışığı ve model sınırları bilim editörüne açık. Parlaklıktan tek başına sınıflandırma yapılmaz.' },
  originalityRightsReview: { status: 'pending-human-review', notes: 'Özgün yazım; hak sahipliği ve özgünlük insan tarafından henüz onaylanmadı.' },
  safeguardingLanguageReview: { status: 'pending-human-review', notes: 'Sınıf içi model; Güneşe bakma önerisi yok. Bilmemek utandırılmıyor; insan tonu incelemesi bekliyor.' },
  contentQualityReview: createPendingContentQualityReview('okuma_guveni_8_10'),
};
