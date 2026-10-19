import { createPendingContentQualityReview } from '../contentQualityReview.js';

const sections = [
  { title: 'Halının Üstündeki Yol', paragraphs: [
    'Lili, akşam Nana ile salonda kitap bakıyordu. Oki de yanlarında, yumuşak bir minderde oturuyordu. Açık perdeden içeri soluk Ay ışığı süzülüyordu.',
    'Işık, halının üzerinde uzun bir çizgi oluşturmuştu. Lili bunu küçük bir yola benzetti. Parmağıyla çizgiyi gösterip Oki’yi yanına çağırdı.',
    'Oki bu yolun nereye gittiğini merak etti. Çizgi, alçak masanın hemen yanında bitiyordu. Masanın üstünde henüz açmadıkları mavi kitap duruyordu.',
    'Nana onlara birlikte masala başlamayı teklif etti. Masaldaki yolu kendileri hayal edip çizebilirdi. Lili, önce mavi kitabı incelemek istedi.',
  ] },
  { title: 'Kitaptaki Küçük Kayık', paragraphs: [
    'Nana mavi kitabı alıp ortaya yerleştirdi. İlk sayfada küçük bir kayık resmi vardı. Kayığın yanında ise boş bir kıyı görünüyordu.',
    'Lili masaldaki yolun kıyıya vardığını hayal etti. Oki kayığın kimin olduğunu merakla sordu. Kitapta bu soruya verilmiş bir cevap yoktu.',
    'Nana, bu kitabın yalnız resimlerden oluştuğunu anlattı. İsterlerse resimlere kendi masallarını birlikte ekleyebilirlerdi. Lili hemen kayıkta küçük bir tavşan düşündü.',
    'Oki, tavşanın yanında bir çanta olmasını istedi. Çantada kıyıdaki arkadaşına götüreceği bir resim vardı. İkisi yeni sayfaya geçmeden önce halıya baktı.',
  ] },
  { title: 'Yol Gözden Kaybolunca', paragraphs: [
    'Halının üstündeki parlak çizgi artık görünmüyordu. Lili, pencerenin önünden geçen bulutu fark etti. Masallarının yolu da kaybolmuş gibi hissetti.',
    'Nana odadaki lambayı yakıp yanlarına tekrar oturdu. Lili masalı burada bitirmek istemediğini söyledi. Oki de tavşanın arkadaşına ulaşmasını bekliyordu.',
    'Bir süre kitaptaki boş kıyıya birlikte baktılar. Sonra Lili kendi çizdiği yolu hatırladı. Yol görünmese de masallarına devam edebilirlerdi.',
    'Nana masaya büyük bir kâğıt ve kalemler getirdi. Lili kâğıda kayıktan kıyıya uzanan yol çizdi. Oki yolun sonuna küçük bir ev ekledi.',
    'Evin penceresinde tavşanın arkadaşı onları bekliyordu. Lili resimdeki kapıyı açık bırakmayı önerdi. Böylece misafir, arkadaşının evini kolayca bulabilirdi.',
  ] },
  { title: 'Resmin Vardığı Ev', paragraphs: [
    'Masalda kayık kıyıya varınca tavşan karaya çıktı. Çantasındaki resmi iki eliyle özenle taşıdı. Arkadaşı kapıda onu görünce sevinçle el salladı.',
    'Lili, verilen resmin içinde başka kayık çizdi. Oki o kayığa iki arkadaş yerleştirdi. Artık masalın sonunda birlikte geziye çıkacaklardı.',
    'Nana, masalın adını kâğıdın arkasına kendisi yazdı. Sonra çizimi mavi kitabın yanına koydular. Lili yeni yolun kâğıtta durduğunu gördü.',
    'Halının üstündeki ışığın geri gelmesini beklemedi. Tavşan resmini ulaştırmış, arkadaşıyla yeniden buluşmuştu. Lili kitabı kapatıp Nana’nın yanına yerleşti.',
  ] },
];
const countWords = text => text.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
const wordCount = countWords(sections.flatMap(s => s.paragraphs).join(' '));
const estimatedSeconds = Math.ceil(wordCount * 60 / 155);
export const LILI_AY_ISIGI_DRAFT = {
  id: 'lili-ay-isigi-v2-draft', replacesIdAfterApproval: 'lili-ay-isigi',
  title: 'Lili Ay Işığını Takip Ediyor', ageBand: '5-6', readingPathId: 'okumaya_hazirlik_5_6',
  contentTrack: 'ozgun-masal', primaryTheme: 'Birlikte hayal ederek yarım kalan masalı tamamlamak',
  contentStatus: 'draft', releaseReady: false, estimatedWordsPerMinute: 155,
  wordCount, estimatedSeconds, declaredSeconds: estimatedSeconds, sections,
  ageScopeNote: 'Eski 5–8 etiketi 5–6 hazırlık/dinleme taslağına daraltıldı. Eski audit 6–7 alias kullanıyor; production etiketi ve raf eşlemesi insan kararıyla birlikte güncellenmeli.',
  glossary: [
    { word: 'süzülmek', definition: 'Yavaşça ve hafifçe ilerlemek.' },
    { word: 'kıyı', definition: 'Suyun karayla buluştuğu yer.' },
    { word: 'kayık', definition: 'Suda yol almak için kullanılan küçük tekne.' },
    { word: 'misafir', definition: 'Birini görmeye gelen kişi.' },
    { word: 'hayal', definition: 'Aklımızda canlandırdığımız görüntü veya düşünce.' },
  ],
  optionalReflectionPrompt: 'İstersen anlat: Sen masaldaki kayığa ne koyardın?',
  reflectionOptional: true, reflectionScored: false,
  sourceTruth: {
    sourceType: 'original', adaptationStatus: 'not-applicable',
    scope: 'Okurio için yeni yazılan çerçeve masal. Tarihsel, mitolojik veya kamu malı bir eserin aktarımı değildir.',
    verificationStatus: 'pending-human-review',
  },
  factualReview: { status: 'pending-human-review', notes: 'Oda içindeki olay ile hayal edilen kayık yolculuğunun ayrımı ve ışık/bulut betimi incelenmeli; öğretici astronomi iddiası yok.' },
  originalityRightsReview: { status: 'pending-human-review', notes: 'Dış metin kullanılmadı. Kaynak kitap hikâye içinde kurgusal ve isimsizdir. İnsan özgünlük ve hak değerlendirmesi bekliyor.' },
  safeguardingLanguageReview: { status: 'pending-human-review', notes: 'Gerçek olaylar Nana ile salonda geçer. Kayık yolculuğu masaldadır. Bağımsız okuma, yazma veya başarı beklentisi kurulmamalı.' },
  contentQualityReview: createPendingContentQualityReview('okumaya_hazirlik_5_6'),
};
