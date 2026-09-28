# Okurio içerik kalite raporu — 12 Eylül 2026

## Yönetici özeti

- `main` değişmedi: `5f867b5`; son 24 saatte merge yok.
- PR #120 exact-head CI 2/2 geçti ve draft/mergeable durumda.
- 20 saniye altındaki 20 kayıt için taslak kapsamı 20/20 olarak korunuyor.
- Bugün 53 kelime/21 saniyelik **Yüksek Ökçeler**, 700 kelimelik kısa uyarlamaya dönüştürüldü.
- Production değişmedi: 80 kayıt, 62 tam okuma, 18 mikro alıştırma, 35 yaş minimumu altı, 62/62 blocker.

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

Ikarus yaş eşleme sorunu nedeniyle ayrıca `unmapped` kalıyor.

## Bugünün içeriği: Yüksek Ökçeler

| Ölçüt | Sonuç |
|---|---:|
| Production | 53 kelime / 21 saniye / 3 kısa bölüm |
| Taslak | 700 kelime / 271 saniye — 4:31 |
| Bölüm kelimeleri | 121 / 116 / 117 / 114 / 118 / 114 |
| Bölüm payları | %17,3 / %16,6 / %16,7 / %16,3 / %16,9 / %16,3 |
| Ortalama/maksimum cümle | 6,48 / 10 kelime |
| Sözlük | 6 |
| Structural-valid | true |
| Release-ready | false |

Akış: `sesli ökçeler ve görünür düzen → sessiz terlikler → saklanan sorunlar → güven denemesi → eski düzene dönüş → ironik sonuç`.

Uyarlama, çalışanların hatalarını anlatırken güç sahibi kişinin korkuya dayalı yönetimini de sorguluyor. Tarihsel sınıfsal dil modern bir norm gibi sunulmuyor.

## Kaynak, hak ve insan incelemesi

- Source-of-truth: Ömer Seyfettin, Yüksek Ökçeler; Vikikaynak tam metni.
- Kapsam: modern Türkçeli ve eleştirel çerçeveli kısa uyarlama; tam metin değildir.
- `contentQualityReview=pending`; reviewer kanıtları boş, checklist maddeleri false.
- Factual/tarihsel bağlam, hak ve safeguarding incelemeleri `pending-human-review`.
- Kamu malı ve baskı bağımsızlığı insan hak incelemesi bekliyor.
- `releaseReady=false`; aktif kataloğa bağlı değil.

## Test ve teslim

- Odak testleri: 2/2 PASS.
- Tüm içerik testleri: 128/128 PASS.
- AI kalite kapısı: 3/3 PASS.
- Build/paket: PASS.
- Full-catalog audit: beklenen FAIL-CLOSED — 62/62.
- Production validatorün yalnız üç Odysseia kaydını tarayan dar kapsamı sürüyor.
- Merge/deploy yapılmadı.

Sonraki işler: Alice Finds the Rabbit Hole taslağı; PR #97 ve #100–#121 toplu insan incelemesi; PR #106 publication gate ve yaş eşleme düzeltmesi.
