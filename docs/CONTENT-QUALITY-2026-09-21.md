# Okurio İçerik Kalite Turu — 21 Eylül 2026

## Yönetici özeti

- `main`: `5f867b5c678ceee0d77dab0786e7bd61b26c21dc`; son 24 saatte değişmedi.
- PR #129 exact-head CI: 2/2 PASS.
- Katalog: 80 kayıt; 62 tam okuma, 18 mikro alıştırma.
- 20 saniye ve altındaki 20 kaydın taslak kapsamı 20/20; production düzeltmesi 0.
- `Pembe İncili Kaftan` 57 kelimelik özetten 712 kelimelik, altı bölümlü taslağa dönüştürüldü.
- İnsan onayı, katalog bağlantısı, merge, release veya deploy yapılmadı.

Kaynaklar manifesto, PRD, pilot katalog planı, release checklist, içerik kataloğu ve testler sırasıyla incelendi.

## Yaş grupları

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

Toplam 35 tam okuma yaş minimumunun altında. On bir tam okuma ve 18 mikro alıştırmada süre farkı %15'i aşıyor. Ikarus eşlemesi `unmapped`; full-catalog audit 62/62 yayın engeliyle kapalı.

## Bugünün taslağı

| Ölçüt | Sonuç |
|---|---:|
| Production | 57 kelime / 23 saniye / 2 özet bölüm |
| Taslak | 712 kelime |
| Hesaplanan süre | 276 saniye — 4:36 |
| Bölüm kelimeleri | 121 / 116 / 114 / 117 / 109 / 135 |
| Bölüm payları | %17,0 / %16,3 / %16,0 / %16,4 / %15,3 / %19,0 |
| Cümle ortalaması / maksimum | 6,41 / 10 kelime |
| Sözlük | 6 girdi |
| Structural-valid / release-ready | true / false |

Akış: `zor elçilik görevi → bağımsızlık şartı → kaftanın mali bedeli → sembolik saray cevabı → kaftanın bırakılması → dönüş ve eleştirel soru`.

Anlatı yayı, neden-sonuç, kişi ve mekân sürekliliği ile sonuç ön kontrolden geçti. Milliyetçi/tarihsel söylem güncel topluluklara taşınmadı. Mali fedakârlık ve aile etkisi sorgusuz kahramanlık olarak sunulmadı. Fiziksel çatışma yerine sembolik cevap vurgulandı.

## Kaynak ve insan kalite kapısı

21 Eylül 2026'da Vikikaynak'taki Ömer Seyfettin metniyle karşılaştırıldı. Taslak tam metin veya kesin aktarım değil; modern Türkçeli kısa uyarlamadır. Tarihsel eleştiri, kamu sorumluluğu ve güvenlik çerçevesi Okurio editoryal ekidir.

- `contentQualityReview.status=pending`
- İncelemeci adı, tarihi, exact commit ve somut notları boş.
- Zorunlu checklist maddeleri `false`.
- Tarihsel doğruluk, kültürel/milliyetçi dil, kamu malı/hak durumu, aile etkisi ve yaş uygunluğu insan incelemesi bekliyor.
- `releaseReady=false`.

## Doğrulama ve teslim

- Odak testleri: 2/2 PASS
- Tüm içerik testleri: 128/128 PASS
- AI kalite kapısı: 3/3 PASS
- Production build: PASS
- Full-catalog audit: beklenen FAIL-CLOSED — 62/62
- Branch: `content/2026-09-21-quality-turn`
- Merge/deploy: yapılmadı

## Riskler ve sonraki işler

Onaysız içerik deploy edilmedi. İnsan onayından sonra içerikler tek tek deploy edilecek; production smoke testi geçmeden sıradaki başlamayacak.

1. Hazır taslakları isimli ve somut notlu insan incelemesine almak.
2. PR #106 publication gate ile Ikarus yaş eşlemesini tamamlamak.
3. 12–14 yaş grubundaki 57 kelimelik `Prometheus’un Seçimi` veya 67 kelimelik `Mai ve Siyah` için kaynak kapsamını doğrulamak.
