# Okurio günlük içerik kalite turu — 6 Eylül 2026

## Yönetici özeti

- `main`: `5f867b5c678ceee0d77dab0786e7bd61b26c21dc`; son 24 saatte yeni main commit'i yok.
- Katalog: 80 kayıt — 62 tam okuma, 18 mikro alıştırma.
- 20 tam okuma 20 saniye veya altında; 35 tam okuma yaş minimumunun altında.
- 11 tam okumada ve 18/18 mikro alıştırmada süre farkı yüzde 15'i aşıyor.
- Temiz main auditinde 62/62 tam okuma en az bir blocker taşıyor.
- Dünkü PR #114 exact-head üzerinde iki zorunlu CI hattını da geçti.
- Bugün `Little Star Poem` 30 kelimelik özetten 519 kelimelik tamamlanmış İngilizce şiirli hikâye adayına dönüştürüldü.
- Taslak runtime kataloğuna bağlanmadı; insan onayı, merge ve deploy yapılmadı.

## Yaş grubu görünümü

| Yaş | Hedef | Hikâye | Ortalama | Medyan | Minimum altı |
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

1.774 kelimelik Ikarus, main validatoründeki yaş/okuma-yolu eşleme hatası nedeniyle ayrıca `unmapped` kalıyor.

## 20 saniyelik içerikler

Dağılım: 6–7 yaşta 7, 7–8 yaşta 3, 8–10 yaşta 6, 10–12 yaşta 4.

Ela El Ele 29; Ali ile Ela 23; Lili ile At 25; Oki El Ele 25; Mino Nerede 22; Diyet 49; The Fox and the Grapes 49; The Lion and the Mouse 45; The Moon Is Not a Star 44; Oki Ay’ı Gördü 34; Yıldız mı, Gezegen mi 37; Lili Ay Işığını Takip Ediyor 38; Oki’nin Ay Şiiri 26; Yağmur Tıp Tıp 23; Gökyüzü Şiiri 36; Bir Tohumun Yolculuğu 44; Arılar Neden Dans Eder 43; Little Star Poem 30; Moon Poem 36; Space Poem 39 kelimedir.

Bugünkü Little Star düzeltmesi insan onayı beklediğinden production sayıları henüz değişmez.

## Bugünün içerik çıktısı

### Little Star Poem — 7–8 yaş, İngilizce

| Ölçüt | Sonuç |
|---|---:|
| Production sürümü | 30 kelime / 12 saniye |
| Yeni taslak | 519 kelime |
| 155 kelime/dk süre | 201 saniye — 3:21 |
| Bölüm sayısı | 5 |
| Bölüm kelimeleri | 85 / 98 / 96 / 113 / 127 |
| Bölüm payları | %16,4 / %18,9 / %18,5 / %21,8 / %24,5 |
| Ortalama cümle | 7,11 kelime |
| En uzun cümle | 10 kelime |
| Sözlük | 5 girdi |
| Structural-valid | true |
| Release-ready | false |

Anlatı akışı: `ilk parlak nokta → şiirin ilk dizeleri → bulutla kaybolan ışık → tarihli ikinci gözlem → tamamlanan şiir ve açık araştırma sorusu`.

Tema, giriş–gelişme–dönüm–sonuç, neden-sonuç, karakter/mekân/zaman tutarlılığı ve bölüm geçişleri otomatik kontrolden geçti. Her paragraf en fazla üç cümle; cümleler en fazla on kelime. Beş sözlük girdisi ve isteğe bağlı, puansız düşünme sorusu vardır.

Parlak nokta yıldız ya da gezegen olarak kesinleştirilmedi. Şiir başlığı duygusal dil, gözlem defterindeki `bright point` etiketi ise doğruluk dili olarak ayrıldı.

## Source-of-truth, hak ve insan incelemesi

Kaynak sırası Manifesto → PRD → Pilot Catalog Plan → Release Checklist → katalog/testler olarak uygulandı. PRD dosya adı `v1.1`, iç başlığı `v1.2`; sürüm uyuşmazlığı açık kalıyor.

Metin ve beş şiir dizesi özgün Okurio taslağıdır. Dış şiir, şarkı sözü, çeviri veya kamu malı metin kullanılmadı.

- `contentQualityReview.status=pending`
- Reviewer adı, tarih, commit ve somut notlar boş.
- Sekiz evrensel ve okuma-yolu checklist maddesi `false`.
- English/age-fit, factual, hak ve safeguarding incelemeleri `pending-human-review`.
- `releaseReady=false`.

İnsan incelemesinde A1 sözcük yükü, 7–8 yaş okuma yolu, şiirden şiirli hikâyeye geçiş ve İngilizce doğal kullanım doğrulanmalıdır.

## Katalog blocker kökleri

62/62 tek tür hata değildir; bir kayıt birden fazla blocker taşıyabilir:

- 61 kayıtta insan onayı eksik.
- 35 kayıtta yaş minimumu ve kısa bölüm sorunu var.
- 25 kayıtta yalnız iki bölüm var.
- 39 kayıtta paragraf başına üç cümle sınırı aşılıyor.
- 22 kayıtta ortalama, 16 kayıtta azami cümle sınırı bozuluyor.
- 11 tam okumada süre sapması yüzde 15'i aşıyor.
- Ikarus yaş eşlemesi main üzerinde hatalı.

## Doğrulama ve teslim

- Yeni taslak dahil içerik testleri: 129/129 PASS.
- Production build/paket: PASS.
- Full-catalog audit: FAIL-CLOSED — 62/62 blocker'lı.
- PR #114 exact-head uzak CI: 2/2 PASS.
- Bugünkü PR uzak CI: PR açıldıktan sonra exact-head üzerinde doğrulanacak.
- Main merge ve production deploy: yapılmadı.

## Sonraki öncelikler

1. PR #97 ve güncel taslaklar için gerçek insan içerik incelemesi toplamak.
2. PR #106'nın publication gate, mikro süre ve baseline açıklarını tamamlamak.
3. Kalan kısa kayıtlardan `Diyet`, `Moon Poem` veya `Space Poem` için kaynak ve tür kapsamı açık tam sürüm hazırlamak.
