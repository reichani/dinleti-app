# Okurio İçerik Kalite Turu — 25 Eylül 2026

## Yönetici özeti

- Production `main`: `5f867b5c678ceee0d77dab0786e7bd61b26c21dc`; son 24 saatte yeni main commit'i yok.
- Dünkü PR #133 exact-head zorunlu CI sonucu 2/2 PASS.
- Katalog değişmedi: 80 kayıt; 62 tam okuma, 18 mikro alıştırma.
- 20 tam okuma 20 saniye veya altında; tamamı için yayın dışı taslak bulunuyor.
- 35 tam okuma yaş minimumunun altında; full-catalog audit baseline'ı FAIL-CLOSED — 62/62.
- 8–10 yaş yolundaki 44 kelimelik `Bir Tohumun Yolculuğu`, 564 kelimelik özgün bilim hikâyesine genişletildi.
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

Ikarus production yaş eşlemesinde hâlâ `unmapped`. On bir tam okuma ve 18 mikro alıştırmada süre farkı %15'i aşıyor.

## 20 saniyelik ve eksik içerik envanteri

Production'daki 20 çok kısa kaydın tamamının yayın dışı genişletilmiş taslağı bulunuyor. İnsan onayı ve katalog bağlantısı bulunmadığından production'da düzeltilen kayıt sayısı 0.

Bugün sonraki eksik katmandaki `Bir Tohumun Yolculuğu` ele alındı. Production metni 44 kelime, hesaplanan süre 17 saniye ve yalnız iki özet bölümden oluşuyor.

## Bugünün taslağı

**Bir Tohumun Yolculuğu — 8–10 yaş**

| Ölçüt | Sonuç |
|---|---:|
| Production | 44 kelime / hesaplanan 17 saniye / 2 özet bölüm |
| Yeni taslak | 564 kelime |
| Hesaplanan süre | 219 saniye — 3:39 |
| Bölüm kelimeleri | 111 / 109 / 111 / 108 / 125 |
| Bölüm payları | %19,7 / %19,3 / %19,7 / %19,1 / %22,2 |
| Cümle ortalaması / maksimum | 6,88 / 10 kelime |
| Paragraf başına maksimum cümle | 2 |
| Sözlük | 6 girdi |
| Structural-valid / release-ready | true / false |

Akış: `karşılaştırmalı deney → suyun etkisi → ilk kök → yaprak ve ışık → kaynaklı sonuç günlüğü`.

Tek tema bilimsel gözlem ve sabırdır. Her bölüm önceki gözlemin sonucundan doğar. Oki'nin ilk varsayımları ölçümle değişir; sonuçta bütün türlere genelleme yapılmaz. Deney performans yarışı veya başarı baskısı olarak sunulmaz.

## Source-of-truth ve insan kalite kapısı

Çimlenme için su, oksijen ve uygun sıcaklık koşulları West Virginia University Extension; su alımı, embriyo ve ilk kökün çıkışı Oregon State University kaynağıyla sınırlandırıldı. Hikâye ve karakter akışı özgündür; kaynak cümlesi aktarılmadı.

- `contentQualityReview.status=pending`
- İncelemeci adı, tarih, exact commit ve somut notlar boş.
- Sekiz zorunlu checklist maddesi `false`.
- Factual, originality/rights ve safeguarding incelemeleri `pending-human-review`.
- Açık insan incelemesi: 8–10 yaş terim yükü, fasulye deneyinin doğruluğu, yetişkin gözetimi ve özgünlük.
- `releaseReady=false`.

## Doğrulama ve teslim

- Odak testleri iki kapıyı doğrular: yaş/süre/bölüm/dil sözleşmesi ve fail-closed insan incelemesi.
- Yeni dalın uzak CI sonucu draft PR açıldıktan sonra izlenecek.
- Production kataloğu değişmediği için audit baseline'ı FAIL-CLOSED — 62/62 olarak kalıyor.

## Deploy sırası

Onaylı yeni hikâye bulunmadığından production deploy yapılmadı:

1. İsimli, tarihli, somut notlu ve exact commit'e bağlı insan onayı.
2. Tek hikâyenin production deploy'u.
3. Production smoke testi, süre ve okuma kontrolü.
4. Yalnız başarılı sonuçtan sonra sıradaki deploy.

## Sonraki öncelikler

1. Hazır taslakları exact commit'e bağlı insan kalite incelemesine almak.
2. Publication gate ve Ikarus yaş eşleme düzeltmesini tamamlamak.
3. 10–12 yaş açığındaki `Arılar Neden Dans Eder?` veya `Kutup Tilkisinin Yolculuğu` kaydını kaynak kapsamıyla genişletmek.
