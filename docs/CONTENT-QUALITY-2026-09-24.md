# Okurio İçerik Kalite Turu — 24 Eylül 2026

## Yönetici özeti

- Production `main`: `5f867b5c678ceee0d77dab0786e7bd61b26c21dc`; son 24 saatte yeni main commit'i yok.
- Dünkü PR #132 exact-head CI sonucu 2/2 PASS.
- Katalog değişmedi: 80 kayıt; 62 tam okuma, 18 mikro alıştırma.
- 20 tam okuma 20 saniye veya altında; tamamı için yayın dışı genişletilmiş taslak bulunuyor.
- 35 tam okuma yaş minimumunun altında; full-catalog audit güvenli biçimde FAIL-CLOSED — 62/62.
- Bugün `Mai ve Siyah` taslağının source-of-truth kaydı kalite revizyonundan geçirildi.
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

Ikarus production yaş eşlemesinde hâlâ `unmapped`. On bir tam okuma ve 18 mikro alıştırmada ilan edilen süre ile 155 kelime/dakika hesabı arasında %15'ten fazla fark bulunuyor.

## 20 saniyelik ve eksik içerik envanteri

Production'daki 20 çok kısa kayıt değişmedi. Hepsi için genişletilmiş taslak hazırlanmış olsa da insan onayı ve katalog bağlantısı bulunmadığından production'da düzeltilmiş sayılmıyor. Bugün production'da düzeltilen kayıt sayısı 0.

## Bugünün kalite revizyonu

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

Anlatı akışı değişmedi: `gece çalışması → mai gece → ekonomik baskı → matbaa planı → İkbal’in kaybı → Lamia’nın kararı → yanan sayfalar → siyah gece ve açık yol`.

Bugünkü revizyon anlatının kelimelerini değiştirmedi. Belirsiz Google Books arama bağlantısı kaldırıldı. Yerine HathiTrust'ın 1897 tarihli, Âlem Matbaası basımı, 231 sayfalık ve Harvard University kaynaklı ilk baskı kaydı eklendi. Kayıt eseri “Full view” gösteriyor.

## Source-of-truth ve insan kalite kapısı

Katalog kaydı ilk baskının kimliğini ve görüntülenebilirliğini doğruluyor; ancak otomasyon Osmanlı Türkçesi taramayı satır satır edebî kaynak karşılaştırması olarak onaylamadı.

- `verificationStatus=catalog-record-verified-full-view-text-comparison-pending`
- `contentQualityReview.status=pending`
- İncelemeci adı, tarihi, exact commit ve somut notları boş.
- Sekiz zorunlu checklist maddesi `false`.
- Factual, originality/rights ve safeguarding incelemeleri `pending-human-review`.
- Açık blocker: olay sırası ve kişi ilişkilerinin taramayla insan karşılaştırması; kamu malı/modernleştirme hak kapsamı; 14–16 yaş ve şiddet–yas dili.
- `releaseReady=false`.

## Doğrulama ve teslim

- PR #132 exact-head CI: 2/2 PASS.
- Yeni source-of-truth testi iki kapıyı doğrular: belirli ilk baskı kaydı ve insan incelemesine kadar fail-closed durum.
- Exact head `4c9823c94c543e9fce998d3104de50ece90fa897` için içerik testleri 130/130 PASS; production build ve iki zorunlu uzak CI hattı PASS.
- İlk CI turunda eski kaynak-açığı ifadesini bekleyen bir test kırmızı oldu; sözleşme yeni doğrulama durumuna uyarlanarak exact head üzerinde giderildi.
- Production kataloğu değişmediği için audit baseline'ı FAIL-CLOSED — 62/62 olarak kalıyor.

## Deploy sırası

Onaylı yeni hikâye bulunmadığından production deploy yapılmadı. Sıra değişmedi:

1. İsimli, tarihli, somut notlu ve exact commit'e bağlı insan onayı.
2. Tek hikâyenin production deploy'u.
3. Production smoke testi, süre ve okuma kontrolü.
4. Yalnız başarılı sonuçtan sonra sıradaki deploy.

## Sonraki öncelikler

1. `Mai ve Siyah` olay dizisini 1897 taramasıyla insan edebiyat editörüne karşılaştırmak.
2. Hazır taslakları exact commit'e bağlı insan kalite incelemesine almak.
3. Publication gate ile Ikarus yaş eşleme düzeltmesini tamamlamak.

## Branch ve PR

- Branch: `content/2026-09-24-quality-turn`
- Exact head: `4c9823c94c543e9fce998d3104de50ece90fa897`
- Draft PR: #133
- Merge/production deploy: yapılmadı
