import { createPendingContentQualityReview } from '../contentQualityReview.js';

export const LA_FONTAINE_FABLES_DRAFT = {
  id: 'la-fontaine-fugue-v2-draft',
  replacesIdAfterApproval: 'la-fontaine-fugue',
  title: "La Fontaine'den Fabllar",
  language: 'tr',
  ageBand: '6-7',
  readingPathId: 'ilk_harfler_6_7',
  contentTrack: 'public-domain-short-adaptation',
  primaryTheme: 'Bir hikâyenin verdiği düşünceyi sorgulayarak seçebiliriz.',
  contentStatus: 'draft',
  structuralValid: true,
  releaseReady: false,
  estimatedWordsPerMinute: 155,
  declaredSeconds: 135,
  sections: [
    {
      title: 'Üç Kapalı Kart',
      paragraphs: [
        "Nana masaya üç resimli kart koydu. Oki ile Lili kartların adlarını merak etti. Her kartta kısa bir hayvan öyküsü bulunuyordu.",
        "Nana bu öykülere fabl dendiğini açıkladı. Kartlar eski La Fontaine fabllarından hazırlanmıştı. Çocuklar her öyküye ayrı bir soru bulacaktı.",
        "İlk kartta karınca ve ağustos böceği görünüyordu. Lili kartı açınca kış rüzgârı öyküye doldu.",
      ],
    },
    {
      title: 'Kış Gelince',
      paragraphs: [
        "Ağustos böceği yaz boyunca şarkı söylemişti. Karınca ise yiyecek toplamıştı. Kış gelince böceğin yiyeceği kalmadı.",
        "Böcek karıncadan biraz buğday istedi. Hasat gelince geri vereceğini söyledi. Karınca onun yaz boyunca ne yaptığını sordu.",
        "Eski öykü burada sert bir kapı kapatıyordu. Oki bu sona üzülürken Lili hazırlığın önemini söyledi.",
        "Nana başka bir son düşünmelerini istedi, karınca bir öğün paylaşabilirdi. Böcek de baharda ortak depoya yardım edebilirdi.",
        "Çocuklar karta iki düşünce yazdı. Hazırlık yap, ama ihtiyacı olanı utandırma. Sonra ikinci kartı çevirdiler.",
      ],
    },
    {
      title: 'Yavaş Yarış',
      paragraphs: [
        "Tavşan hızlı koştuğu için övünüyordu. Kaplumbağanın yavaşlığıyla da alay ediyordu. Kaplumbağa sakin bir yarış önerdi.",
        "Yarış başlayınca tavşan öne geçti, farkı görünce dinlendi. Bir ağacın altında uyuyakaldı.",
        "Kaplumbağa küçük adımlarla ilerledi. Hiç durmadı ve yoldan ayrılmadı. Tavşan uyanınca bitiş çok yakındı.",
        "Kaplumbağa çizgiyi önce geçti. Oki yalnız hızın yetmediğini anladı. Lili de alayın kimseyi büyütmediğini ekledi.",
        "İkinci karta düzenli adım yazdılar. Üçüncü kartta bir karga bekliyordu. Gagasında sarı bir peynir vardı.",
      ],
    },
    {
      title: 'Tilkinin Övgüsü',
      paragraphs: [
        "Tilki ağacın altından peyniri gördü. Karganın güzelliğini ve sesini uzun uzun övdü.",
        "Karga şarkı söylemek için gagasını açınca peynir düştü. Tilki peyniri alıp hızla uzaklaştı.",
        "Lili her övgünün yalan olmadığını söyledi. Oki de çıkar arayan övgünün farklı olabileceğini düşündü. Nana niyeti davranıştan anlamayı önerdi.",
        "Çocuklar üçüncü karta küçük bir not düştü. Güzel sözleri dinle, sonra amacı düşün. Kartların üçü de artık açıktı.",
      ],
    },
    {
      title: 'Tek Ders Yok',
      paragraphs: [
        "Oki kartları yan yana dizdi, ilk öykü paylaşmayı anlatıyordu. İkincisi düzenli adımı ve saygıyı gösteriyordu.",
        "Üçüncü öykü dikkatli dinlemeyi düşündürüyordu. Lili her fablın tek cevabı olmadığını fark etti. Eski sonlara yeni sorular da eklenebilirdi.",
        "Nana kartların arkasına kaynak bilgisini yazdı. Bunların kısa uyarlamalar olduğunu belirtti. Özgün şiirlerin tam metni değildi.",
        "Oki son bir kart hazırladı. Üzerine sen hangi düşünceyi seçerdin yazdı. Cevap için puan ya da süre koymadı.",
        "Üç kart yeniden kapandı, fakat sorular masada kaldı. Ertesi gün başka okurlar kendi düşüncelerini ekleyecekti.",
      ],
    },
  ],
  glossary: [
    { word: 'fabl', definition: 'Hayvanlarla bir düşünce anlatan kısa öykü.' },
    { word: 'hasat', definition: 'Ürünlerin tarladan toplandığı zaman.' },
    { word: 'ortak', definition: 'Birden çok kişinin birlikte kullandığı şey.' },
    { word: 'alay', definition: 'Birini küçümseyen kırıcı söz veya davranış.' },
    { word: 'niyet', definition: 'Bir davranışın ardındaki amaç.' },
  ],
  optionalReflectionPrompt: 'İstersen, üç fabldan hangisine başka bir son yazardın?',
  reflectionOptional: true,
  reflectionScored: false,
  sourceTruth: {
    sourceType: 'public-domain-short-adaptation',
    scope: "La Fontaine'in Ağustos Böceği ile Karınca, Tavşan ile Kaplumbağa ve Karga ile Tilki fabllarından seçilmiş olayların modern Türkçeli kısa uyarlamasıdır. Şiirlerin tam metni veya çevirisi değildir. Okuma kulübü çerçevesi özgündür.",
    sourceUrls: [
      'https://www.gutenberg.org/files/50316/50316-h/50316-h.htm',
      'https://fr.wikisource.org/wiki/Fables_de_La_Fontaine_(%C3%A9dition_originale)',
    ],
    checkedAt: '2026-09-15',
    verificationStatus: 'pending-human-review',
  },
  factualReview: {
    status: 'pending-human-review',
    notes: 'Üç fablın olay sırası, kaynak kapsamı ve eleştirel yeniden çerçeveleme insan incelemesi bekliyor.',
  },
  originalityRightsReview: {
    status: 'pending-human-review',
    notes: 'Kamu malı kaynak, kısa uyarlama kapsamı ve ülkeye göre hak durumu insan incelemesi bekliyor.',
  },
  safeguardingLanguageReview: {
    status: 'pending-human-review',
    notes: 'Açlık, dışlama, alay ve kandırma temalarının 6–7 yaş sunumu insan incelemesi bekliyor.',
  },
  contentQualityReview: createPendingContentQualityReview('ilk_harfler_6_7'),
};
