# Okurio içerik üretim ve kalite turu — 18 Eylül 2026

## Yönetici özeti ve önceki güne göre delta

- Production `main` değişmedi: `5f867b5c678ceee0d77dab0786e7bd61b26c21dc`; son 24 saatte yeni commit yok.
- Dünkü draft PR #126 exact head `cc76d1ef524f93fa88e984a4e35960472c4b48f8` üzerinde iki zorunlu CI hattını geçti. Bu, insan içerik onayı değildir.
- Katalog yeniden tarandı: 80 kayıt, 62 tam okuma, 18 mikro alıştırma ve 27 raf.
- Production'da 20 tam okuma hâlâ 20 saniye veya altında; 20/20 kayıt için yayın dışı genişletilmiş taslak bulunuyor.
- 6–7 yaş minimum altındaki production kayıtlarının tümü taslak kapsamına alındığı için bugün 7–8 yaş açığındaki 95 kelimelik `ugly-duckling-en` kaydı ele alındı.
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

Yaş minimumunun altında 35 tam okuma bulunuyor. Ikarus'un 1.774 kelimelik kaydı audit yaş eşlemesinde ayrıca `unmapped` kalıyor. Bugünkü taslak production'a bağlanmadığı için tablo değerlerini değiştirmiyor.

## Kısa ve süre uyumsuz içerik envanteri

20 saniye veya altındaki production okumaları:

- 6–7: Mino Nerede?, Ali ile Ela, Lili ile At, Oki El Ele, Oki’nin Ay Şiiri, Ela El Ele, Lili Ay Işığını Takip Ediyor.
- 7–8: Yağmur Tıp Tıp, Little Star Poem, Oki Ay'ı Gördü.
- 8–10: Gökyüzü Şiiri, Yıldız mı Gezegen mi?, Bir Tohumun Yolculuğu, The Lion and the Mouse, The Fox and the Grapes, Moon Poem.
- 10–12: Space Poem, Arılar Neden Dans Eder?, The Moon Is Not a Star, Diyet.

Toplam 20/20 kaydın genişletilmiş taslağı vardır; insan onayı olmadığı için production'da düzeltilen sayı 0'dır. Ayrıca 11 tam okuma ve 18 mikro alıştırmada ilan edilen süre ile 155 kelime/dakika hesabı arasındaki fark yüzde 15'i aşıyor.

Bugünkü kayıt sonraki eksik katmandadır: production `The Ugly Duckling`, 95 kelime, 37 saniye ve üç özet bölüm.

## Bugünün içerik çıktısı

### The Ugly Duckling — 7–8 yaş, İngilizce

| Ölçüt | Sonuç |
|---|---:|
| Production sürümü | 95 kelime / 37 saniye / 3 kısa özet |
| Yeni taslak | 405 kelime |
| 155 kelime/dakika süre | 157 saniye — 2:37 |
| Bölüm sayısı | 5 |
| Bölüm kelimeleri | 67 / 89 / 85 / 81 / 83 |
| Bölüm yüzdeleri | %16,5 / %22,0 / %21,0 / %20,0 / %20,5 |
| Cümle ortalaması / maksimum | 7,36 / 11 kelime |
| Görünür paragraf maksimumu | 3 cümle |
| Sözlük | 5 girdi |
| Structural-valid | true |
| Release-ready | false |

Anlatı akışı: `son yumurta → çiftlikten ayrılış → beyaz kuşların görülmesi ve kış → ilkbaharda göle dönüş → etiketin değer belirlemediği sonuç`.

Olaylar tek bakış açısı ve doğrusal zamanla ilerliyor. Her bölüm önceki bölümün sonucundan doğuyor. Giriş, gelişme, kış dönüm noktası ve tamamlanmış sonuç var; tek cümlelik bölüm yok.

Uyarlama, görünüş nedeniyle dışlanmayı onaylayan bir “güzelleşince değer kazanma” mesajına dönüştürmüyor. Kuğu, dönüşmeden önce de güvenlik ve saygıyı hak ediyor. Bununla birlikte dışlama, avcı sesi, kış tehlikesi ve kimlik dili insan safeguarding incelemesi gerektiriyor.

## Source-of-truth, factual ve hak durumu

Kaynak kapsamı 18 Eylül 2026 tarihinde University of Southern Denmark bünyesindeki [H. C. Andersen Centre tam metni](https://andersen.sdu.dk/vaerk/hersholt/TheUglyDuckling_e.html) ve [Project Gutenberg Andersen dizini](https://www.gutenberg.org/ebooks/search/?query=Hans+Andersen%27s+Fairy+Tales) üzerinden kontrol edildi.

Taslak tam metin veya kesin çeviri değildir. Yumurtadan çıkış, çiftlikte dışlanma, bataklık ve kulübe, beyaz kuşların görülmesi, kış ve ilkbahardaki kuğu karşılaşması seçilerek hazırlanmış kontrollü İngilizce kısa uyarlamadır. Saygınlık ve güvenlik çerçevesi Okurio editoryal ekidir.

Kamu malı kaynak kapsamı, kullanılan İngilizce çevirilerin hak sınırı, ülkeye göre hak durumu, olay sadakati ve özgünlük otomatik onaylanmadı.

## İnsan kalite kapısı

- `contentQualityReview.status=pending`
- `reviewerName`, `reviewedAt`, `reviewedCommit` ve `reviewNotes` boş.
- Sekiz evrensel checklist maddesi ve 7–8 okuma-yolu checklist'i `false`.
- İngilizce/yaş uygunluğu, factual, originality/rights ve safeguarding/language review: `pending-human-review`.
- `releaseReady=false`; taslak aktif kataloğa bağlı değil.

İnsan incelemesinde özellikle `marsh`, `reflection`, `rejection` sözcük yükü; dışlanma ve görünüş dili; avcı ve kış sahneleri; kaynak/çeviri sınırı değerlendirilmelidir.

## Validator, test ve build

- Yeni taslak odak testleri: 2/2 PASS.
- Tüm içerik testleri: 128/128 PASS.
- AI kalite kapısı: 3/3 PASS.
- Production build: PASS. Vite yalnız paket boyutu uyarısı verdi; build hatası yok.
- Full-catalog audit: beklenen FAIL-CLOSED çıkışı; 62/62 tam okuma blocker taşıyor.
- Audit doğrulanan sayıları: 80 kayıt, 62 tam okuma, 18 mikro alıştırma ve 20 adet 20 saniye veya altı tam okuma.

## Dal, teslim, riskler ve sonraki işler

- Dal: `content/2026-09-18-quality-turn`
- Kapsam: bir taslak, fail-closed test ve günlük kalite raporu.
- İnsan onayı gelmeden PR draft kalmalı; merge/deploy yapılmamalıdır.

Blocker'lar: insan içerik kalitecisi onayı; İngilizce 7–8 yaş okuma-yolu kararı; kaynak/çeviri hakları ve safeguarding incelemeleri; PR #106 publication gate; Ikarus yaş eşleme hatası.

Sonraki öncelikler:

1. Açık taslakları isim, tarih, exact commit ve somut not içeren insan kalite incelemesine almak.
2. PR #106'daki publication gate, mikro süre denetimi ve Ikarus yaş eşlemesini sonuçlandırmak.
3. 12–14 yaş grubundaki 55 kelimelik `The Happy Prince and the Swallow` veya 10–12 yaş grubundaki 56 kelimelik `The Selfish Giant` kaydını kaynak çakışması kontrolünden sonra tamamlamak.
