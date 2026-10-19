# İçerik taslağı konsolidasyonu · 2026-10-19

Hazırlayan: Claude (öneri ve ölçüm; onay vermez). Karar sahibi: Reyhan Açar.

## Kapsam

18 eski içerik PR'ının taslakları tek dalda toplandı: #102, #104, #105, #108–#117, #119–#122, #124. Bu PR'lar 29 Ağustos tabanlıydı (5f867b5). Her PR'dan yalnız eklediği taslak, test ve kalite raporu alındı. Üretilen `catalog-quality-audit.json` ve PR'ların audit betiği değişiklikleri bırakıldı; betikte yalnız eksik `"14-16"` yaş eşlemesi düzeltildi (bkz. "Betik düzeltmesi"). Taslaklar kataloğa bağlanmadı: `releaseReady=false` ve insan onayı alanları boş kaldı. Bağlama, K-2026-10-18-07 (prototip fazı AI kanıt onayı) sürecinden sonra ayrı PR'da yapılır.

## Güncel uzunluk politikasına göre durum

Ölçüm `src/content/lengthOptimizationPolicy.js` `auditStoryLength` ile, her taslağın kendi `readingPathId` değeri üzerinden yapıldı.

| Değiştireceği içerik | Kaynak PR | Okuma yolu | Dil | Kelime | Karar | Bulgu |
|---|---|---|---|---:|---|---|
| mino-nerede | #102 | ilk_harfler_6_7 | tr | 382 | uygun | |
| ela-el-ele | #104 | ilk_harfler_6_7 | tr | 329 | uygun | |
| oki-el-ele | #105 | ilk_harfler_6_7 | tr | 324 | uygun | |
| yagmur-tip-tip-siiri | #108 | ilk_cumleler_7_8 | tr | 360 | pasaj-düzeltme | Bölüm 1: 69 kelime, alt sınır 70 |
| oki-ayi-gordu | #109 | ilk_cumleler_7_8 | tr | 350 | pasaj-düzeltme | Bölüm 1–3: 61, 65, 65 kelime, alt sınır 70 |
| fox-and-grapes-en | #110 | okuma_guveni_8_10 | en | 571 | uygun | |
| lion-and-mouse-graded-en | #110 | okuma_guveni_8_10 | en | 635 | uygun | |
| yildiz-mi-gezegen-mi | #111 | okuma_guveni_8_10 | tr | 554 | uygun | |
| lili-ay-isigi | #112 | okumaya_hazirlik_5_6 | tr | 333 | uygun | Yol kararı aşağıda |
| oki-ay-siiri | #113 | ilk_harfler_6_7 | tr | 332 | uygun | |
| gokyuzu-siiri | #114 | okuma_guveni_8_10 | tr | 517 | pasaj-düzeltme | Bölüm 1: 89 kelime, alt sınır 90 |
| little-star-poem-en | #115 | ilk_cumleler_7_8 | en | 519 | uygun | |
| space-poem-en | #116 | akici_okuma_10_12 | en | 813 | uygun | |
| moon-poem-en | #117 | okuma_guveni_8_10 | en | 564 | uygun | |
| diyet | #119 | klasiklere_hazirlik_14_16 | tr | 1200 | uygun | Yol kararı aşağıda |
| oki-pegasus | #120 | okuma_guveni_8_10 | tr | 504 | uygun | |
| yuksek-okceler | #121 | akici_okuma_10_12 | tr | 700 | uygun | |
| alice-rabbit-hole-en | #122 | akici_okuma_10_12 | en | 826 | uygun | |
| la-fontaine-fugue | #124 | ilk_harfler_6_7 | tr | 348 | uygun | Katalog yaşı 4–9; taslak 6–7 bu aralıkta |

19 taslaktan 16'sı uygun. Kalan 3'ünde (#108, #109, #114) yalnız pasaj alt sınırı birkaç kelime kısa. Bunlar bağlamadan önce gözetim ajanı turunda komşu bölümle birleştirme veya kısa genişletmeyle düzeltilecek. Sahibi: Claude (taslak), Reyhan (onay). Toplam uzunluk hepsinde yol hedefi içinde.

## Yol kararları

### Diyet: klasiklere_hazirlik_14_16 öneriliyor

Bugün katalogda üç ayrı yaş sinyali var. KATALOG etiketi "10+ yaş". ICERIK_METADATA 10–18 yaş ve akici_okuma'dan yetiskin_odak'a beş segment. Raf "Kısa Dinletiler", yetişkin modunda. Ontoloji anlık görüntüsü okuma_guveni_8_10 diyor; bu bir ölçüm yapıtı. Betik, "en erken yol" kuralıyla akici_okuma segmentini okuma_guveni_8_10 grubunda da bulduğu için içeriği 8–10'a yazıyor (docs/content-plans/2026-10-19.md, "yol ataması ölçümü saptırıyor").

Belirleyici olan kaynak metin. Ömer Seyfettin'in hikâyesinde Koca Ali, sürekli başa kakılan borca karşı kendi kolunu satırla kesip alacaklıya bırakır. Bu, ölüm-şiddet ve kendine zarar verme sınıfında ağır bir sahne. K-2026-10-18-07 uyarınca bu tür konular AI kaydında kalmaz, ürün sahibine iletilir. 8–10 yaş yolu bu içerik için uygun değil. 10–12 de bu sahne için erken.

#119 taslağı sahneyi grafikleştirmiyor ve çözüm olarak sunmuyor (safeguardingLanguageReview notu). Ayrıca kaynak, hak ve tarihsel bağlam alanlarını dolduruyor. Hak durumu: yazar 1920'de öldü; aynı yazarın Kaşağı uyarlaması K-2026-10-18-03 ile kamu malı kabul edildi.

Öneri: Diyet'in ana yolu klasiklere_hazirlik_14_16 olsun. Mevcut 49 kelimelik özet, onaydan sonra bu taslakla değiştirilsin. Katalog yaş etiketi "14+ yaş" yapılsın.

Karar: Reyhan. Diyet için ayrıca bir AI kanıt kaydı gerekli; sahibi Claude.

### Lili Ay Işığını Takip Ediyor: okumaya_hazirlik_5_6 öneriliyor

Bu içeriğin de üç sinyali var. KATALOG etiketi "5-8 yaş". Metadata segmentleri okumaya_hazirlik, ilk_cumleler ve dinleme; evreleri dinleme ve kisa_cumle. Raf "Eski Zaman Masalları", okul_oncesi_3_4 ve okumaya_hazirlik_5_6 yollarında görünüyor.

Ontoloji okul_oncesi_3_4 diyor; bu da ölçüm yapıtı. "dinleme" segmenti okul_oncesi grubunda da olduğu için en erken yol seçiliyor; anlık görüntü bunu yasYolTutarsizliklari listesinde zaten işaretliyor. Uzunluk denetimi ise ilk_harfler_6_7 sınırıyla ölçüyor.

Metadata'daki ilk segment (okumaya_hazirlik), rafın gösterildiği en yüksek yol ve #112'nin hedefi (5–6) aynı yeri gösteriyor. İçerik Okurio'nun özgün metni; hak sorunu yok.

Öneri: ana yol okumaya_hazirlik_5_6 olsun, katalog yaş etiketi "5-6 yaş" yapılsın. Karar: Reyhan.

### Kök neden

İki uyuşmazlık da aynı açık sorudan geliyor: ICERIK_METADATA'da açık bir ana yol alanı yok (karar-kayitlari.json, acikSorular: B7 ve "sessiz-saatler içeriğinin yol ataması"). Bu PR karar vermiyor; yalnız iki içerik için öneri getiriyor. Kalıcı çözüm ICERIK_METADATA'ya `anaYol` alanı eklemek. Karar Reyhan'da, uygulaması Claude'da.

## Betik düzeltmesi

`scripts/audit-full-catalog.mjs` içinde 14–16 bandının hedefi (AGE_TARGETS) ve okuma yolu (READING_PATH_BY_AGE_BAND) tanımlıydı. Ancak "14-16" etiketi AGE_ALIASES'ta yoktu; bu etiketi taşıyan içerik eşlenmemiş kalıyordu. Eksik satır eklendi. #104 ve #105'in testleri bu eşlemeyi doğruluyor.

## Doğrulama

`npm run test:content` 288/288 geçti; 18 PR'ın testleri dahil.

## Sonraki adımlar

| Adım | Sahip |
|---|---|
| Diyet ve Lili yol önerilerini onaylamak veya değiştirmek | Reyhan |
| #108, #109, #114 pasaj düzeltmeleri | Claude |
| 19 taslak için AI kanıt kaydı (K-2026-10-18-07) | Claude |
| Kataloğa bağlama PR'ı | Claude |
| Bu PR'ı birleştirmek ve eski 18 PR'ı kapatmak | Reyhan |
| ICERIK_METADATA `anaYol` alanı kararı | Reyhan |

## Kaynaklar

docs/content/LENGTH-AUDIT-2026-10-18.md; docs/content-plans/2026-10-19.md; ontology/karar-kayitlari.json (K-2026-10-18-03, K-2026-10-18-07, acikSorular); ontology/snapshots/catalog-metrics-2026-10-19.json; src/App.jsx (KATALOG, ICERIK_METADATA, RAFLAR, YOL_SEGMENT_GRUPLARI); Diyet olay özeti: Milli Gazete, "Diyet" (https://www.milligazete.com.tr/diyet); kaynak metin: Vikikaynak, Diyet (https://tr.wikisource.org/wiki/Diyet).
