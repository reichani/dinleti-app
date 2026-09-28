# Okurio içerik kalite raporu — 11 Eylül 2026

## Yönetici özeti ve delta

- `main` değişmedi: `5f867b5c678ceee0d77dab0786e7bd61b26c21dc`; son 24 saatte merge yok.
- PR #119 exact-head üzerinde iki zorunlu CI hattını geçti.
- 20 saniye veya altındaki 20 production kaydının tamamı için genişletilmiş taslak hazır; production bağlantısı insan onayı bekliyor.
- Bugün sonraki en kısa açık kayıt olan **Oki ve Pegasus**, 54 kelime/21 saniyelik iki bölümlü özetten 504 kelimelik özgün hikâyeye dönüştürüldü.
- Production katalog metrikleri değişmedi: 80 kayıt, 62 tam okuma, 18 mikro alıştırma, 35 yaş minimumu altı ve 62/62 blocker.

## Yaş grubu görünümü

| Yaş | Hedef | Adet | Ortalama | Medyan | Minimum altı |
|---|---:|---:|---:|---:|---:|
| 3–4 | 150–300 | 3 | 285,7 | 291 | 0 |
| 5–6 | 200–400 | 1 | 203 | 203 | 0 |
| 6–7 | 250–500 | 15 | 166,6 | 69 | 10 |
| 7–8 | 350–650 | 9 | 218,1 | 351 | 4 |
| 8–10 | 500–900 | 10 | 200,7 | 47 | 7 |
| 10–12 | 700–1.200 | 14 | 304,7 | 56,5 | 9 |
| 12–14 | 900–1.600 | 7 | 333,1 | 86 | 5 |
| 14–16 | 1.200–2.000 | 0 | — | — | — |
| 16–18 | 1.500–2.500 | 1 | 1.502 | 1.502 | 0 |
| 18+ | 1.800–3.500 | 1 | 1.800 | 1.800 | 0 |

1.774 kelimelik Ikarus, `main` validatoründeki yaş eşleme sorunu nedeniyle tabloda `unmapped` kalıyor.

## 20 saniyelik ve eksik içerik sırası

20 kısa kaydın taslak kapsamı 20/20 olarak korunuyor. Bunlar onaylanıp production'a bağlanmadığı için audit hâlâ 20 kısa kayıt gösteriyor.

20 saniye üstündeki en kısa açıklar: Alice Finds the Rabbit Hole 52 kelime/21 saniye, Yüksek Ökçeler 53/21, Oki ve Pegasus 54/21, The Happy Prince and the Swallow 55/22 ve The Selfish Giant 56/22. Bugün üçüncü kayıt için taslak tamamlandı.

## Bugünün içeriği

**Oki ve Pegasus — 8–10 yaş**

| Ölçüt | Sonuç |
|---|---:|
| Production sürümü | 54 kelime / 21 saniye / 2 bölüm |
| Yeni taslak | 504 kelime |
| Hesaplanan süre | 196 saniye — 3:16 |
| Bölüm kelimeleri | 96 / 99 / 108 / 96 / 105 |
| Bölüm payları | %19,0 / %19,6 / %21,4 / %19,0 / %20,8 |
| Cümle ortalaması | 6,55 kelime |
| En uzun cümle | 10 kelime |
| Sözlük | 5 girdi |
| Structural-valid | true |
| Release-ready | false |

Anlatı akışı: `fırtına sonrası iz → dolaşan sarmaşığın bulunması → yanlış ilk çözüm → güvenli bekleyiş → özgür uçuş`.

Tema, neden-sonuç, karakter ve mekân sürekliliği, tamamlanmış son, bölüm derinliği, cümle ve paragraf sınırları otomatik kontrolden geçti. Tanımadıkları hayvana güvenli mesafe korunuyor; hızlı müdahalenin riski anlatı içinde düzeltiliyor.

## Kaynak, hak ve insan kalite kapısı

- Metin `original-myth-inspired-fiction` olarak işaretlendi.
- Pegasus adı ve kanatlı at motifi kullanılıyor; belirli bir antik veya modern metnin uyarlaması olduğu iddia edilmiyor.
- `contentQualityReview.status=pending`; reviewer adı, tarihi, commit'i ve notları boş.
- Sekiz zorunlu kalite maddesi `false`.
- Factual/hayvan güvenliği, özgünlük-hak ve safeguarding incelemeleri `pending-human-review`.
- `releaseReady=false`; taslak kataloğa bağlı değil.

İnsan incelemesinde hayvana yaklaşma modeli, sarmaşığa müdahale, kurmaca-gerçek ayrımı ve Pegasus motifinin özgün kullanımı özellikle değerlendirilmelidir.

## Test ve teslim

- Odak testleri: 2/2 PASS.
- Tüm içerik testleri: 128/128 PASS.
- AI kalite kapısı: 3/3 PASS.
- Production validator: PASS; yalnız üç Odysseia kaydını tarayan dar kapsam sorunu sürüyor.
- Production build/paket: PASS.
- Full-catalog audit: FAIL-CLOSED — 62/62.
- Merge ve deploy yapılmadı.

Branch: `content/2026-09-11-quality-turn`.

## Sonraki öncelikler

1. PR #97, #100–#120 içerik adaylarını toplu insan kalite/hak/güvenlik incelemesine almak.
2. PR #106'daki tam katalog publication gate ve yaş eşleme düzeltmesini sonuçlandırmak.
3. Sıradaki açık olarak Alice Finds the Rabbit Hole veya Yüksek Ökçeler'i kaynak kapsamı açık tam sürüme dönüştürmek.
