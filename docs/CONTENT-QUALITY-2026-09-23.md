# Okurio İçerik Kalite Turu — 23 Eylül 2026

## Yönetici özeti

- Production `main`: `5f867b5c678ceee0d77dab0786e7bd61b26c21dc`.
- Dünkü Prometheus taslağı uzak depoya aktarıldı; PR #131 exact-head CI 2/2 PASS.
- Katalog değişmedi: 80 kayıt; 62 tam okuma, 18 mikro alıştırma.
- 20 tam okuma 20 saniye veya altında; 35 tam okuma yaş minimumunun altında.
- Full-catalog audit güvenli biçimde kırmızı: 62/62 tam okuma en az bir blocker taşıyor.
- Production’da boş olan 14–16 yaş yolu için `Mai ve Siyah` taslağı hazırlandı.
- İnsan onayı, katalog bağlantısı, merge, release veya production deploy yapılmadı.

## Yaş grubu görünümü

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

Ikarus yaş eşlemesi hâlâ `unmapped`. Yirmi çok kısa kaydın tamamının yayın dışı taslağı bulunuyor; insan onayı ve katalog bağlantısı olmadan production iyileşmesi sayılmıyor.

## Bugünün taslağı

**Mai ve Siyah — 14–16 yaş**

| Ölçüt | Sonuç |
|---|---:|
| Production | 67 kelime / 26 saniye / özet |
| Taslak | 1.204 kelime |
| Hesaplanan süre | 467 saniye — 7:47 |
| Bölüm kelimeleri | 141 / 150 / 146 / 157 / 145 / 150 / 145 / 170 |
| Bölüm payları | %11,7 / %12,5 / %12,1 / %13,0 / %12,0 / %12,5 / %12,0 / %14,1 |
| Cümle ortalaması / maksimum | 6,17 / 10 kelime |
| Sözlük | 7 girdi |
| Structural-valid / release-ready | true / false |

Akış: `gece çalışması → mai gece ve sanat hayali → evde ekonomik baskı → matbaa planı → İkbal’in kaybı → Lamia’nın kararı → yanan sayfalar → siyah gece ve açık yol`.

Anlatı yayı, neden-sonuç, bakış açısı, kişi ve mekân sürekliliği ile tamamlanmış sonuç ön kontrolden geçti. Aile içi şiddetin sorumluluğu mağdura yüklenmedi. Yas sırasında üretkenlik baskısı kurulmadı; geri dönüşsüz kararlar romantikleştirilmedi. Lamia, Ahmet Cemil’in sessiz beklentisinin nesnesi olarak sunulmadı.

## Kaynak ve insan kalite kapısı

Taslak tam metin veya kesin aktarım değildir. 23 Eylül turunda erişilebilir, güvenilir tam metin kaynağı doğrulanamadı. Bu nedenle olay sırası ve kişi ilişkileri insan edebiyat editörü tarafından asıl metinle karşılaştırılmadan yayınlanamaz.

- `contentQualityReview.status=pending`.
- İncelemeci adı, tarihi, exact commit ve somut notları boş.
- Sekiz zorunlu checklist maddesi `false`.
- Factual, originality/rights ve safeguarding incelemeleri `pending-human-review`.
- Açık blocker: tam metin kaynak doğrulaması, kamu malı/hak kapsamı, 14–16 yaş uygunluğu ve şiddet/yas dili.
- `releaseReady=false`.

## Doğrulama ve teslim

- Odak testleri: 2/2 PASS.
- Tüm içerik testleri: 128/128 PASS.
- AI kalite kapısı: 3/3 PASS.
- Production build: PASS; yalnız paket boyutu uyarısı var.
- Full-catalog audit: beklenen FAIL-CLOSED — 62/62.

## Deploy sırası

Onaylı yeni hikâye bulunmadığı için production deploy başlatılmadı. Her hikâye için sıra: isimli ve somut notlu insan onayı; tek hikâye deploy’u; production smoke testi ve süre/okuma kontrolü; yalnız başarılı sonuçtan sonra sıradaki deploy.

## Sonraki öncelikler

1. Mai ve Siyah olay sırasını güvenilir tam metinle insan editörüne doğrulatmak.
2. Hazır taslakları exact commit’e bağlı insan kalite incelemesine almak.
3. Publication gate ile Ikarus yaş eşleme düzeltmesini tamamlamak.
