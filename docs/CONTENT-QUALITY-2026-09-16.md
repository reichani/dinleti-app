# Okurio içerik üretim ve kalite turu — 16 Eylül 2026

## Yönetici özeti ve önceki güne göre delta

- Production `main` değişmedi: `5f867b5c678ceee0d77dab0786e7bd61b26c21dc`; son 24 saatte yeni commit yok.
- Dünkü draft PR #124 exact head `3af62a5c2d5a3e4df2ee02bd597f11718b63edf1` üzerinde iki zorunlu CI hattını geçti. Bu sonuç insan içerik onayı değildir.
- Katalog yeniden tarandı: 80 kayıt, 62 tam okuma, 18 mikro alıştırma ve 27 raf.
- Production'da 20 tam okuma hâlâ 20 saniye veya altında; bu 20 kaydın tamamı için yayın dışı genişletilmiş taslak hazır.
- Bugün 6–7 yaş açığındaki 98 kelimelik `aesop-fables-en` kaydı için 467 kelimelik taslak üretildi.
- Production iyileşmesi: 0. Aktif katalog, merge, release ve deploy değiştirilmedi.

## Yaş grubu görünümü

| Yaş | Hedef kelime | Okuma | Ortalama | Medyan | Minimum altı |
|---|---:|---:|---:|---:|---:|
| 3–4 | 150–300 | 3 | 285,7 | 291 | 0 |
| 5–6 | 200–400 | 1 | 203 | 203 | 0 |
| 6–7 | 250–500 | 15 | 166,6 | 69 | 10 |
| 7–8 | 350–650 | 9 | 218,1 | 351 | 4 |
| 8–10 | 500–900 | 10 | 200,7 | 47 | 7 |
| 10–12 | 700–1.200 | 14 | 304,7 | 56,5 | 9 |
| 12–14 | 900–1.600 | 7 | 333,1 | 86 | 5 |
| 14–16 | 1.200–2.000 | 0 | — | — | 0 kayıt |
| 16–18 | 1.500–2.500 | 1 | 1.502 | 1.502 | 0 |
| 18+ | 1.800–3.500 | 1 | 1.800 | 1.800 | 0 |

Yaş minimumunun altında 35 tam okuma bulunuyor. Ikarus'un 1.774 kelimelik kaydı mevcut audit yaş eşlemesinde ayrıca `unmapped` kalıyor. Sayısal öncelik, 10 eksik kayıtla 6–7 yaş grubudur.

## Kısa ve süre uyumsuz içerik envanteri

20 saniye veya altındaki production okumaları:

- 6–7: Mino Nerede?, Ali ile Ela, Lili ile At, Oki El Ele, Oki’nin Ay Şiiri, Ela El Ele, Lili Ay Işığını Takip Ediyor.
- 7–8: Yağmur Tıp Tıp, Little Star Poem, Oki Ay'ı Gördü.
- 8–10: Gökyüzü Şiiri, Yıldız mı Gezegen mi?, Bir Tohumun Yolculuğu, The Lion and the Mouse, The Fox and the Grapes, Moon Poem.
- 10–12: Space Poem, Arılar Neden Dans Eder?, The Moon Is Not a Star, Diyet.

Toplam 20/20 kaydın genişletilmiş taslağı vardır; insan onayı olmadığı için production'da düzeltilen sayı 0'dır. Ayrıca 11 tam okuma ve 18 mikro alıştırmada ilan edilen süre ile 155 kelime/dakika hesabı arasındaki fark yüzde 15'i aşıyor.

Bugünkü kayıt 20 saniye sınırının hemen üzerindeki sonraki eksik katmandadır: production `Aesop's Fables`, 98 kelime, 38 saniye ve üç kısa özet bölüm.

## Bugünün içerik çıktısı

### Aesop's Fables — 6–7 yaş, İngilizce

| Ölçüt | Sonuç |
|---|---:|
| Production sürümü | 98 kelime / 38 saniye / 3 kısa bölüm |
| Yeni taslak | 467 kelime |
| 155 kelime/dakika süre | 181 saniye — 3:01 |
| Bölüm sayısı | 5 |
| Bölüm kelimeleri | 67 / 102 / 102 / 100 / 96 |
| Bölüm yüzdeleri | %14,3 / %21,8 / %21,8 / %21,4 / %20,6 |
| Cümle ortalaması / maksimum | 6,77 / 8 kelime |
| Görünür paragraf maksimumu | 3 cümle |
| Sözlük | 5 girdi |
| Structural-valid | true |
| Release-ready | false |

Anlatı akışı: `üç hikâye kartı → saygılı yarış → küçük yardımcının dönüşü → boş alarmın güvene etkisi → dersleri sorularla değerlendirme`.

Okuma kartı çerçevesi üç fablı tek bir oturumda birbirine bağlıyor. Her bölüm önceki kartın sonucundan doğuyor ve yeni bir düşünce taşıyor. Karakterler, masa mekânı, zaman ve bakış açısı tutarlı. Giriş, gelişme, dönüm noktaları ve tamamlanmış sonuç mevcut; tek cümlelik bölüm yok.

“The Shepherd Boy and the Wolf” bölümü doğruluk ile güven ilişkisini koruyor. Bununla birlikte yardım istemek güvensiz veya utandırıcı bir davranış gibi sunulmuyor. `tortoise`, `shepherd`, `unexpectedly` ve `adaptation` gibi sözcüklerin 6–7 yaş İngilizce/hece yükü insan editör incelemesi bekliyor.

## Source-of-truth, factual ve hak durumu

Kaynak kapsamı 16 Eylül 2026 tarihinde Project Gutenberg'deki [The Æsop for Children](https://www.gutenberg.org/files/19994/19994-h/19994-h.htm) üzerinden kontrol edildi. Kaynak dizini üç seçili anlatıyı da içeriyor: The Hare and the Tortoise, The Lion and the Mouse ve The Shepherd Boy and the Wolf.

Taslak tam metin, tam bölüm aktarımı veya kesin çeviri değildir. Seçilmiş olayların kontrollü İngilizce kısa uyarlamasıdır; okuma kartı çerçevesi özgündür. Olay sırası, Ezop atfının sınırları, kamu malı statüsü, ülkeye göre hak durumu ve özgünlük otomatik onaylanmadı.

## İnsan kalite kapısı

- `contentQualityReview.status=pending`
- `reviewerName`, `reviewedAt`, `reviewedCommit` ve `reviewNotes` boş.
- Sekiz evrensel checklist maddesi ve 6–7 okuma-yolu checklist'i `false`.
- İngilizce/yaş uygunluğu, factual, originality/rights ve safeguarding/language review: `pending-human-review`.
- `releaseReady=false`; taslak aktif kataloğa bağlı değil.

İnsan incelemesinde özellikle A1/A2 dil seviyesi, harf-hece dizisi, üç fablın çerçeve bütünlüğü, avcı/ağ/kurt korkusu, yardım isteme tonu ve hak kapsamı değerlendirilmelidir.

## Validator, test ve build

- Yeni taslak odak testleri: 2/2 PASS.
- Tüm içerik testleri: 128/128 PASS.
- AI kalite kapısı: 3/3 PASS.
- Production build: PASS.
- Full-catalog audit: beklenen FAIL-CLOSED çıkışı; 62/62 tam okuma blocker taşıyor.
- Audit doğrulanan sayıları: 80 kayıt, 62 tam okuma, 18 mikro alıştırma ve 20 adet 20 saniye veya altı tam okuma.

## Dal, teslim, riskler ve sonraki işler

- Dal: `content/2026-09-16-quality-turn`
- Kapsam: bir taslak, fail-closed test ve günlük kalite raporu.
- İnsan onayı gelmeden PR draft kalmalı; merge/deploy yapılmamalıdır.

Blocker'lar: insan içerik kalitecisi onayı; İngilizce 6–7 yaş okuma-yolu kararı; kaynak/hak ve güvenlik incelemeleri; PR #106 publication gate; Ikarus yaş eşleme hatası.

Sonraki öncelikler:

1. Açık taslakları isim, tarih, exact commit ve somut not içeren insan kalite incelemesine almak.
2. PR #106'daki publication gate, mikro süre denetimi ve Ikarus yaş eşlemesini sonuçlandırmak.
3. 6–7 yaşta kalan 70 kelimelik `Keloğlan Masalları` kaydını kaynak kapsamı ve derleme bütünlüğü güvenle kurulabilirse tamamlamak.
