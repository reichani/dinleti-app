# Okurio içerik üretim ve kalite turu — 17 Eylül 2026

## Yönetici özeti ve önceki güne göre delta

- Production `main` değişmedi: `5f867b5c678ceee0d77dab0786e7bd61b26c21dc`; son 24 saatte yeni commit yok.
- Dünkü draft PR #125 exact head `b9c1db881f993402ea257562372d0e5f1033705f` üzerinde iki zorunlu CI hattını geçti. Bu, insan içerik onayı değildir.
- Katalog yeniden tarandı: 80 kayıt, 62 tam okuma, 18 mikro alıştırma ve 27 raf.
- Production'da 20 tam okuma hâlâ 20 saniye veya altında; 20/20 kayıt için yayın dışı genişletilmiş taslak var.
- Bugün 6–7 yaş açığındaki 70 kelimelik `keloglan-masallari` kaydı için 276 kelimelik özgün halk-masal motifi taslağı üretildi.
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

Yaş minimumunun altında 35 tam okuma bulunuyor. Ikarus'un 1.774 kelimelik kaydı audit yaş eşlemesinde ayrıca `unmapped` kalıyor. Sayısal öncelik, 10 eksik kayıtla 6–7 yaş grubudur.

## Kısa ve süre uyumsuz içerik envanteri

20 saniye veya altındaki production okumaları:

- 6–7: Mino Nerede?, Ali ile Ela, Lili ile At, Oki El Ele, Oki’nin Ay Şiiri, Ela El Ele, Lili Ay Işığını Takip Ediyor.
- 7–8: Yağmur Tıp Tıp, Little Star Poem, Oki Ay'ı Gördü.
- 8–10: Gökyüzü Şiiri, Yıldız mı Gezegen mi?, Bir Tohumun Yolculuğu, The Lion and the Mouse, The Fox and the Grapes, Moon Poem.
- 10–12: Space Poem, Arılar Neden Dans Eder?, The Moon Is Not a Star, Diyet.

Toplam 20/20 kaydın genişletilmiş taslağı vardır; insan onayı olmadığı için production'da düzeltilen sayı 0'dır. Ayrıca 11 tam okuma ve 18 mikro alıştırmada ilan edilen süre ile 155 kelime/dakika hesabı arasındaki fark yüzde 15'i aşıyor.

Bugünkü kayıt sonraki eksik katmandadır: production `Keloğlan Masalları`, 70 kelime, 28 saniye ve birbirine bağlanmayan üç kısa özet bölüm.

## Bugünün içerik çıktısı

### Keloğlan ve Duran Değirmen — 6–7 yaş

| Ölçüt | Sonuç |
|---|---:|
| Production sürümü | 70 kelime / 28 saniye / 3 kısa özet |
| Yeni taslak | 276 kelime |
| 155 kelime/dakika süre | 107 saniye — 1:47 |
| Bölüm sayısı | 5 |
| Bölüm kelimeleri | 48 / 44 / 57 / 60 / 67 |
| Bölüm yüzdeleri | %17,4 / %15,9 / %20,7 / %21,7 / %24,3 |
| Cümle ortalaması / maksimum | 6,00 / 9 kelime |
| Görünür paragraf maksimumu | 3 cümle |
| Sözlük | 5 girdi |
| Structural-valid | true |
| Release-ready | false |

Anlatı akışı: `boş un kabı → yardımla taşınan çuval → güvenli değirmen incelemesi → paylaşma bilmecesi → ortak emekle dönen çark`.

Tek ana tema, sorunun dikkat ve yardımla birlikte çözülmesidir. Keloğlan çarkı tek başına onarmıyor; tehlikeyi fark edip yetişkine haber veriyor. Değirmenci suyu kesiyor, köylüler güvenli araçlarla çalışıyor. Her bölüm bir öncekinin sonucundan doğuyor; giriş, gelişme, dönüm noktası ve tamamlanmış sonuç var.

## Source-of-truth, factual ve hak durumu

Kaynak kapsamı 17 Eylül 2026 tarihinde Kültür ve Turizm Bakanlığı e-Kitap portalındaki [Masallar dizini](https://ekitap.ktb.gov.tr/TR-78473/masallar.html) ve [Keloğlan tipi incelemesi](https://ekitap.ktb.gov.tr/TR-79940/masallarin-sembolik-dili-baglaminda-keloglan-tipiuzerin-.html) üzerinden kontrol edildi.

Production kaydındaki “Sihirli Değirmen”, “Nardaniye Hanım” ve “Padişahın Kızı” özetlerinin tek bir doğrulanmış kanonik metnin ardışık bölümleri olduğu gösterilemedi. Bakanlık dizininde Nardaniye Hanım ayrı bir masal olarak yer alıyor. Bu nedenle taslak belirli bir masalın tam metni, çevirisi veya kısa uyarlaması olarak sunulmadı; Keloğlan halk anlatısı tipinden esinlenen özgün Okurio kurmacası olarak işaretlendi.

Bu seçim aynı zamanda başlık ve kapsam değişikliğidir: üç özetlik antoloji yerine tek olay örgülü hikâye önerir. Kültürel temsil, özgünlük iddiası, hak durumu, değirmen güvenliği ve kaynak kapsamı otomatik onaylanmadı.

## İnsan kalite kapısı

- `contentQualityReview.status=pending`
- `reviewerName`, `reviewedAt`, `reviewedCommit` ve `reviewNotes` boş.
- Sekiz evrensel checklist maddesi ve 6–7 okuma-yolu checklist'i `false`.
- Factual, originality/rights ve safeguarding/language review: `pending-human-review`.
- `releaseReady=false`; taslak aktif kataloğa bağlı değil.

İnsan incelemesinde özellikle 6–7 yaş harf-hece yükü, antolojiden tek hikâyeye geçiş, Keloğlan kültürel temsili, “padişahın kızı” başlığının kaldırılması, değirmen güvenliği ve kamu malı/hak çerçevesi değerlendirilmelidir.

## Validator, test ve build

- Yeni taslak odak testleri: 2/2 PASS.
- Tüm içerik testleri: 128/128 PASS.
- AI kalite kapısı: 3/3 PASS.
- Production build: PASS. Vite yalnız paket boyutu uyarısı verdi; build hatası yok.
- Full-catalog audit: beklenen FAIL-CLOSED çıkışı; 62/62 tam okuma blocker taşıyor.
- Audit doğrulanan sayıları: 80 kayıt, 62 tam okuma, 18 mikro alıştırma ve 20 adet 20 saniye veya altı tam okuma.

## Dal, teslim, riskler ve sonraki işler

- Dal: `content/2026-09-17-quality-turn`
- Kapsam: bir taslak, fail-closed test ve günlük kalite raporu.
- İnsan onayı gelmeden PR draft kalmalı; merge/deploy yapılmamalıdır.

Blocker'lar: insan içerik kalitecisi onayı; başlık ve antoloji kapsamı kararı; kültürel temsil/hak ve güvenlik incelemeleri; PR #106 publication gate; Ikarus yaş eşleme hatası.

Sonraki öncelikler:

1. Açık taslakları isim, tarih, exact commit ve somut not içeren insan kalite incelemesine almak.
2. PR #106'daki publication gate, mikro süre denetimi ve Ikarus yaş eşlemesini sonuçlandırmak.
3. 6–7 yaş açığında henüz taslağı olmayan en kısa, kaynak kapsamı doğrulanabilir kaydı tamamlamak.
