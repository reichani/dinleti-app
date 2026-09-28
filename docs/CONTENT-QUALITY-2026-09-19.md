# Okurio İçerik Kalite Turu — 19 Eylül 2026

## Yönetici özeti ve delta

- `main` değişmedi: `5f867b5c678ceee0d77dab0786e7bd61b26c21dc`; son 24 saatte yeni main commit'i yok.
- 18 Eylül tarihli PR #127 exact-head CI sonucu 2/2 PASS.
- 20 saniye veya altındaki 20 production kaydının tamamı için genişletilmiş taslak var; insan onayı olmadığı için production'da düzeltilen kayıt sayısı 0.
- Bugün 10–12 yaş grubundaki 56 kelimelik `The Selfish Giant` özeti için 710 kelimelik taslak hazırlandı.
- İnsan onayı, katalog bağlantısı, merge, release veya deploy yapılmadı.
- Kullanıcının sıralı deploy talebi kayda alındı: yalnız onaylanmış hikâye deploy edilir, smoke test geçmeden sıradakine başlanmaz.

Kaynak belgeler şu sırayla incelendi: `OKURIO-MANIFESTO-v1.0.md`, `OKURIO-PRD-v1.1.md`, `PILOT-CATALOG-PLAN-v1.0.md`, `RELEASE-CHECKLIST.md`, ardından katalog ve içerik testleri.

## Production katalog görünümü

| Yaş | Hedef | Okuma | Ortalama / medyan | Minimum altı |
|---|---:|---:|---:|---:|
| 3–4 | 150–300 | 3 | 285,7 / 291 | 0 |
| 5–6 | 200–400 | 1 | 203 / 203 | 0 |
| 6–7 | 250–500 | 15 | 166,6 / 69 | 10 |
| 7–8 | 350–650 | 9 | 218,1 / 351 | 4 |
| 8–10 | 500–900 | 10 | 200,7 / 47 | 7 |
| 10–12 | 700–1.200 | 14 | 304,7 / 56,5 | 9 |
| 12–14 | 900–1.600 | 7 | 333,1 / 86 | 5 |
| 14–16 | 1.200–2.000 | 0 | — | 0 kayıt |
| 16–18 | 1.500–2.500 | 1 | 1.502 / 1.502 | 0 |
| 18+ | 1.800–3.500 | 1 | 1.800 / 1.800 | 0 |

Toplam 80 kayıt vardır: 62 tam okuma ve 18 mikro alıştırma. 20 tam okuma 20 saniye veya altında, 35 tam okuma yaş minimumunun altında, 11 tam okuma ve 18 mikro alıştırmada süre farkı %15'i aşmaktadır. Ikarus yaş eşleme hatası nedeniyle `unmapped` görünmektedir. Tam katalog auditi 62/62 tam okumayı yayın engelli bulmaktadır.

## Bugünün taslağı: The Selfish Giant

Production sürümü 56 kelime, 22 saniye ve iki kısa özet bölümüdür.

| Ölçüt | Sonuç |
|---|---:|
| Yeni taslak | 710 kelime |
| 155 kelime/dakika süre | 275 saniye — 4:35 |
| Bölüm kelimeleri | 96 / 118 / 116 / 116 / 119 / 145 |
| Bölüm payları | %13,5 / %16,6 / %16,3 / %16,3 / %16,8 / %20,4 |
| Cümle ortalaması / maksimum | 7,89 / 11 kelime |
| Sözlük | 6 girdi |
| Structural-valid | true |
| Release-ready | false |

Anlatı akışı: `ortak kullanılan bahçe → duvar ve dışlama → uzayan kış → küçük çocuğun dönüm noktası → güvenli ortak kurallar → paylaşılan mevsimler`.

Tema, karakter ve mekân sürekliliği, neden-sonuç, bölüm geçişleri ve tamamlanmış sonuç ön kontrolden geçti. Paragraflar en fazla üç cümledir. Düşünme sorusu isteğe bağlı ve puansızdır. Taslak, sınırları tümden kötü göstermemekte; güvenlik sağlayan adil sınırlar ile dışlamayı ayırmaktadır.

## Source-of-truth, hak ve insan incelemesi

Kaynak kapsamı 19 Eylül 2026 tarihinde Project Gutenberg'deki `The Happy Prince and Other Tales` ile English Wikisource'daki `The Selfish Giant` üzerinden karşılaştırıldı. Taslak tam metin veya kesin çeviri değildir; seçilmiş olayların kontrollü İngilizce kısa uyarlamasıdır. Özgün metindeki son dinî alegori bu taslağın kapsamı dışındadır ve metadata'da açıkça belirtilmiştir.

- `contentQualityReview.status=pending`
- İncelemeci adı, tarihi, exact commit ve somut notları boş.
- Sekiz evrensel checklist ve okuma-yolu checklist maddeleri `false`.
- Olay sırası, dışarıda bırakılan son, kamu malı/ülkeye göre hak durumu, İngilizce yaş uygunluğu ve safeguarding tonu insan incelemesi bekliyor.
- `releaseReady=false`; otomasyon onay üretmedi.

## Doğrulama ve teslim

- Odak testleri: 2/2 PASS
- Tüm içerik testleri: 128/128 PASS
- AI kalite kapısı: 3/3 PASS
- Production build: PASS
- Full-catalog audit: beklenen FAIL-CLOSED — 62/62
- Branch: `content/2026-09-19-quality-turn`
- Merge/deploy: yapılmadı

## Riskler, blocker'lar ve sonraki işler

Yayın blocker'ları insan içerik kalite onayı, hak/orijinallik incelemesi, edebî kaynak sadakati ve safeguarding incelemesidir. PR #106 publication gate ve Ikarus yaş eşleme açığı sürmektedir. Onaylı içerik bulunmadığı için sıralı deploy kuyruğu bugün başlatılamadı.

Sonraki öncelikler:

1. Hazır taslaklara isim, tarih, exact commit ve somut not içeren insan kalite incelemesi uygulamak; onaylananları birer birer deploy edip smoke test etmek.
2. PR #106 publication gate ve Ikarus yaş eşlemesini sonuçlandırmak.
3. 12–14 yaş açığındaki 55 kelimelik `The Happy Prince and the Swallow` kaydını kaynak kapsamıyla tamamlamak.
