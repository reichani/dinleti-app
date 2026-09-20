# Okurio İçerik Kalite Turu — 20 Eylül 2026

## Yönetici özeti

- `main` değişmedi: `5f867b5c678ceee0d77dab0786e7bd61b26c21dc`.
- 19 Eylül tarihli PR #128 exact-head CI sonucu 2/2 PASS.
- Production kataloğu 80 kayıt: 62 tam okuma, 18 mikro alıştırma.
- 20 saniye ve altındaki 20 kaydın tamamı için taslak hazır; production'da düzeltilen kayıt sayısı 0.
- Bugün 12–14 yaş için `The Happy Prince and the Swallow` 55 kelimelik özetten 911 kelimelik taslağa dönüştürüldü.
- İnsan onayı, katalog bağlantısı, merge, release veya deploy yapılmadı.

Kaynaklar manifesto, PRD, pilot katalog planı, release checklist, içerik kataloğu ve testler sırasıyla incelendi.

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

Toplam 35 tam okuma yaş minimumunun altındadır. On bir tam okuma ve 18 mikro alıştırmada süre farkı %15'i aşmaktadır. Ikarus yaş eşlemesi `unmapped` kalmaktadır. Tam katalog auditi 62/62 tam okumayı yayın engelli bulmaktadır.

## Bugünün taslağı

| Ölçüt | Sonuç |
|---|---:|
| Production sürümü | 55 kelime / 22 saniye / 2 bölüm |
| Yeni taslak | 911 kelime |
| 155 kelime/dakika süre | 353 saniye — 5:53 |
| Bölüm kelimeleri | 121 / 123 / 119 / 125 / 140 / 128 / 155 |
| Bölüm payları | %13,3 / %13,5 / %13,1 / %13,7 / %15,4 / %14,1 / %17,0 |
| Cümle ortalaması / maksimum | 8,21 / 12 kelime |
| Sözlük | 7 girdi |
| Structural-valid | true |
| Release-ready | false |

Akış: `yüksekten görülen eşitsizlik → kırlangıcın gelişi → ilk yardım → bedelli ikinci seçim → kalma kararı → altının dağıtılması → şehrin değer yargısı`.

Tema, olay sırası, karakter sürekliliği, neden-sonuç, geçişler ve tamamlanmış son ön kontrolden geçti. Metin bireysel yardımın değerini korurken yapısal sorunları tek bağışla çözülmüş göstermemektedir. Ölüm, yoksulluk ve korkulan aile içi şiddet unsurları grafik olmayan dille ele alınmıştır.

## Kaynak ve insan kalite kapısı

Kaynak kapsamı 20 Eylül 2026'da Project Gutenberg ve English Wikisource üzerindeki Oscar Wilde metniyle karşılaştırıldı. Taslak tam metin veya kesin çeviri değildir. Hristiyan alegorisi gizlenmemiş, açıklayıcı bağlama alınmıştır; sistemler çerçevesi Okurio editoryal ekidir.

- `contentQualityReview.status=pending`
- İncelemeci adı, tarihi, exact commit ve somut notları boş.
- Zorunlu checklist maddeleri `false`.
- Edebî sadakat, dinî/kültürel çerçeve, yaş uygunluğu, kamu malı/hak durumu ve safeguarding insan incelemesi bekliyor.
- `releaseReady=false`.

## Doğrulama ve teslim

- Odak testleri: 2/2 PASS
- Tüm içerik testleri: 128/128 PASS
- AI kalite kapısı: 3/3 PASS
- Production build: PASS
- Full-catalog audit: beklenen FAIL-CLOSED — 62/62
- Branch: `content/2026-09-20-quality-turn`
- Merge/deploy: yapılmadı

## Riskler ve sonraki işler

İnsan onayı olmayan içerik deploy edilmemiştir. Onay geldiğinde her hikâye tek başına deploy edilecek, production smoke testi geçmeden sıradaki deploy başlamayacaktır.

1. Hazır taslaklara isim, tarih, exact commit ve somut not içeren insan kalite incelemesi uygulamak.
2. PR #106 publication gate ile Ikarus yaş eşlemesini tamamlamak.
3. 12–14 veya 10–12 yaş grubundaki sıradaki kısa, kaynak kapsamı doğrulanabilir kaydı tamamlamak.
