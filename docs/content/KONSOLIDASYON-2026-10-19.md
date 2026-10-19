# İçerik taslağı konsolidasyonu · 2026-10-19

Hazırlayan: Claude (öneri ve ölçüm; onay vermez). Karar sahibi: Reyhan Açar.

## Kapsam

18 eski içerik PR'ının taslakları tek dalda toplandı: #102, #104, #105, #108–#117, #119–#122, #124. Bu PR'lar 29 Ağustos tabanlıydı (5f867b5). Her PR'dan yalnız eklediği taslak, test ve kalite raporu alındı. Üretilen `catalog-quality-audit.json` ve PR'ların audit betiği değişiklikleri bırakıldı; betikte yalnız eksik `"14-16"` yaş eşlemesi düzeltildi (bkz. "Betik düzeltmesi"). İlk adımda (PR #163) taslaklar kataloğa bağlanmadı. İkinci adımda, ürün sahibinin "kataloğa bağla" talimatıyla aday olarak bağlandılar (bkz. "Kataloğa bağlama"). `releaseReady=false` kaldı, insan onayı alanları boş.

## Güncel uzunluk politikasına göre durum

Ölçüm `src/content/lengthOptimizationPolicy.js` `auditStoryLength` ile, her taslağın kendi `readingPathId` değeri üzerinden yapıldı.

| Değiştireceği içerik | Kaynak PR | Okuma yolu | Dil | Kelime | Karar | Bulgu |
|---|---|---|---|---:|---|---|
| mino-nerede | #102 | ilk_harfler_6_7 | tr | 382 | uygun | |
| ela-el-ele | #104 | ilk_harfler_6_7 | tr | 329 | uygun | |
| oki-el-ele | #105 | ilk_harfler_6_7 | tr | 324 | uygun | |
| yagmur-tip-tip-siiri | #108 | ilk_cumleler_7_8 | tr | 360 | pasaj-düzeltme | Bölüm 1: 69 kelime, alt sınır 70 |
| oki-ayi-gordu | #109 | ilk_cumleler_7_8 | tr | 350 | pasaj-düzeltme | Bölüm 1–4: 61, 65, 65, 68 kelime, alt sınır 70 |
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

Bu tablo ilk ölçümdür: 19 taslaktan 16'sı uygundu, 3'ünde (#108, #109, #114) pasaj alt sınırı birkaç kelime kısaydı. İlk ölçüm bulguları içerik başına dörtle sınırlamıştı; Oki Ay'ı Gördü'nün 4. bölümü bu yüzden ilk raporda eksik kalmış, bağlama testi yakaladı. Bağlama adımında üçü de düzeltildi; sınırsız yeniden ölçümde 19 taslağın hepsi uygun.

## Yol kararları

### Diyet: klasiklere_hazirlik_14_16 öneriliyor

Bugün katalogda üç ayrı yaş sinyali var. KATALOG etiketi "10+ yaş". ICERIK_METADATA 10–18 yaş ve akici_okuma'dan yetiskin_odak'a beş segment. Raf "Kısa Dinletiler", yetişkin modunda. Ontoloji anlık görüntüsü okuma_guveni_8_10 diyor; bu bir ölçüm yapıtı. Betik, "en erken yol" kuralıyla akici_okuma segmentini okuma_guveni_8_10 grubunda da bulduğu için içeriği 8–10'a yazıyor (docs/content-plans/2026-10-19.md, "yol ataması ölçümü saptırıyor").

Belirleyici olan kaynak metin. Ömer Seyfettin'in hikâyesinde Koca Ali, sürekli başa kakılan borca karşı kendi kolunu satırla kesip alacaklıya bırakır. Bu, ölüm-şiddet ve kendine zarar verme sınıfında ağır bir sahne. K-2026-10-18-07 uyarınca bu tür konular AI kaydında kalmaz, ürün sahibine iletilir. 8–10 yaş yolu bu içerik için uygun değil. 10–12 de bu sahne için erken.

#119 taslağı sahneyi grafikleştirmiyor ve çözüm olarak sunmuyor (safeguardingLanguageReview notu). Ayrıca kaynak, hak ve tarihsel bağlam alanlarını dolduruyor. Hak durumu: yazar 1920'de öldü; aynı yazarın Kaşağı uyarlaması K-2026-10-18-03 ile kamu malı kabul edildi.

Öneri: Diyet'in ana yolu klasiklere_hazirlik_14_16 olsun. Mevcut 49 kelimelik özet, onaydan sonra bu taslakla değiştirilsin. Katalog yaş etiketi "14-16 yaş" yapılsın; uygulama yolu bu etiketten okur.

Uygulandı (bağlama adımı). Geri alma kararı Reyhan'da. Diyet için ayrıca bir AI kanıt kaydı gerekli; sahibi Claude.

### Lili Ay Işığını Takip Ediyor: okumaya_hazirlik_5_6 öneriliyor

Bu içeriğin de üç sinyali var. KATALOG etiketi "5-8 yaş". Metadata segmentleri okumaya_hazirlik, ilk_cumleler ve dinleme; evreleri dinleme ve kisa_cumle. Raf "Eski Zaman Masalları", okul_oncesi_3_4 ve okumaya_hazirlik_5_6 yollarında görünüyor.

Ontoloji okul_oncesi_3_4 diyor; bu da ölçüm yapıtı. "dinleme" segmenti okul_oncesi grubunda da olduğu için en erken yol seçiliyor; anlık görüntü bunu yasYolTutarsizliklari listesinde zaten işaretliyor. Uzunluk denetimi ise ilk_harfler_6_7 sınırıyla ölçüyor.

Metadata'daki ilk segment (okumaya_hazirlik), rafın gösterildiği en yüksek yol ve #112'nin hedefi (5–6) aynı yeri gösteriyor. İçerik Okurio'nun özgün metni; hak sorunu yok.

Öneri: ana yol okumaya_hazirlik_5_6 olsun, katalog yaş etiketi "5-6 yaş" yapılsın. Uygulandı (bağlama adımı); geri alma kararı Reyhan'da.

### Kök neden

İki uyuşmazlık da aynı açık sorudan geliyor: ICERIK_METADATA'da açık bir ana yol alanı yok (karar-kayitlari.json, acikSorular: B7 ve "sessiz-saatler içeriğinin yol ataması"). Bu PR karar vermiyor; yalnız iki içerik için öneri getiriyor. Kalıcı çözüm ICERIK_METADATA'ya `anaYol` alanı eklemek. Karar Reyhan'da, uygulaması Claude'da.

## Kataloğa bağlama (ikinci adım)

Kök neden: taslakların uygulamada görünmesi için `src/content/productionStoryUpgrades.js` içindeki `PREPARED_DRAFT_PRODUCTION_CANDIDATES` listesine eklenmeleri gerekir. Bu liste, mevcut kaydın yerine geçen taslaklar içindir; `pilotCatalogAdapter.js` aynı kimlikli katalog kaydını bununla değiştirir. Eski 18 PR bu adımı içermiyordu. O dönemki kural taslağı insan onayı olmadan bağlamamaktı. 18 Ekim'de ürün sahibi talimatı ve K-2026-10-18-07 ile kural değişti: yapısal olarak hazır taslaklar aday olarak bağlanır. Eski taslaklar bu listeye hiç alınmamıştı.

Yapılanlar:
- 19 taslak `PREPARED_DRAFT_PRODUCTION_CANDIDATES` listesine eklendi. Mevcut kaydın kategori, renk, yazar ve dil bilgisi korundu.
- Kamu malı uyarlamalara (Diyet, Yüksek Ökçeler, Alice, La Fontaine, Fox and Grapes, Lion and Mouse) `hakDurumu: "kamu-mali"` ve taslağın sourceTruth alanından kaynak bağlantısı eklendi.
- #108, #109 ve #114'teki kısa pasajlar birkaç cümleyle tamamlandı; kelime ve süre alanları güncellendi.
- Diyet ve Lili için ICERIK_METADATA ile katalog yaş etiketleri önerilen yollara çekildi.

Gösterim kuralı: `readingLevelPolicy.evaluateStoryForReadingLevel` içeriği yalnız yaş etiketinin gösterdiği okuma yolunda açar. `tests/content/catalog-bound-drafts-2026-10-19.spec.mjs` her içerik için üç şeyi doğrular: tek açık yolun önerilen yol olduğunu, politika uzunluğuna uyduğunu ve aday durumunda kaldığını. Diyet 14 yaş altı hiçbir yolda açılmaz.

Ölçüm notu: ontoloji anlık görüntüsü (`scripts/build-ontology-snapshot.mjs`) ana yolu hâlâ "en erken yol" kuralıyla hesaplıyor. Bu yüzden anlık görüntüde Diyet genc_okurlar_12_14, Lili okul_oncesi_3_4 görünür. Uygulamadaki gösterim bundan etkilenmez; fark, açık duran anaYol kararının ölçüm tarafıdır. Aynı nedenle MEB kazanım aday eşlemesi Diyet'i 7–8. sınıf çıktılarına bağlar. anaYol kararıyla birlikte düzelir.

Testlerin politikaya bağlanması: eski 18 testteki toplam kelime aralığı ve en uzun cümle sınırları artık `tests/content/helpers/draft-policy.mjs` üzerinden readingLevelPolicy ile lengthOptimizationPolicy'den okunuyor. Ortalama cümle (6–10) ve paragraf başına en fazla 3 cümle editoryal kontrol olarak kaldı; politikada karşılıkları yok. `production-story-upgrades.spec.mjs` hak durumunu ontolojinin kontrollü sözlüğünden okuyor; kamu malı içerikte kaynak bağlantısı zorunlu.

## Betik düzeltmesi

`scripts/audit-full-catalog.mjs` içinde 14–16 bandının hedefi (AGE_TARGETS) ve okuma yolu (READING_PATH_BY_AGE_BAND) tanımlıydı. Ancak "14-16" etiketi AGE_ALIASES'ta yoktu; bu etiketi taşıyan içerik eşlenmemiş kalıyordu. Eksik satır eklendi. #104 ve #105'in testleri bu eşlemeyi doğruluyor.

## Doğrulama

İlk adım: `npm run test:content` 288/288. Bağlama adımı: 310/310 geçti, `npm run build` başarılı.

## Sonraki adımlar

| Adım | Sahip |
|---|---|
| Diyet ve Lili yollarını önizlemede kontrol etmek; uygun değilse geri alma kararı | Reyhan |
| #108, #109, #114 pasaj düzeltmeleri | Claude, yapıldı |
| Kataloğa bağlama ve testlerin politikaya bağlanması | Claude, yapıldı |
| 19 taslak için AI kanıt kaydı (K-2026-10-18-07); Diyet'in kendine zarar sahnesi ürün sahibine not | Claude |
| PR'ları birleştirmek ve eski 18 PR'ı kapatmak | Reyhan |
| ICERIK_METADATA `anaYol` alanı kararı (ölçüm ve kazanım eşlemesi buna bağlı) | Reyhan |

## Kaynaklar

docs/content/LENGTH-AUDIT-2026-10-18.md; docs/content-plans/2026-10-19.md; ontology/karar-kayitlari.json (K-2026-10-18-03, K-2026-10-18-07, acikSorular); ontology/snapshots/catalog-metrics-2026-10-19.json; src/App.jsx (KATALOG, ICERIK_METADATA, RAFLAR, YOL_SEGMENT_GRUPLARI); Diyet olay özeti: Milli Gazete, "Diyet" (https://www.milligazete.com.tr/diyet); kaynak metin: Vikikaynak, Diyet (https://tr.wikisource.org/wiki/Diyet).
