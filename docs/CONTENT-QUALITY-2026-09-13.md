# Okurio içerik kalite raporu — 13 Eylül 2026

## Yönetici özeti ve delta

`main` hâlâ `5f867b5c678ceee0d77dab0786e7bd61b26c21dc`; 12 Eylül 05:46 UTC sonrasındaki main commit sorgusu boş. Önceki günün draft PR #121 exact-head CI hatları 2/2 başarılı. Bugün 52 kelimelik Alice kaydına bir yeni, yayın dışı 826 kelimelik kısa uyarlama taslağı eklendi. Aktif katalog değişmedi; 20 saniye ve altındaki 20 kaydın 20/20 taslak kapsamı korunuyor. İki günde 20 saniye üstündeki iki ayrı kısa kayda taslak hazırlandı, ancak hiçbirisi production'da düzeltilmiş sayılmıyor.

## Yaş ve raf kapsamı

Ana katalog auditindeki 80 kayıt (62 tam okuma, 18 mikro alıştırma), raflar ve bütün yaş yolları dikkate alındı; önceki taramadaki 27 raf için yeni main değişikliği yok. Aşağıdaki istatistikler yalnız 62 tam okumaya aittir; Ikarus 1.774 kelimeyle `unmapped` olarak ayrıca durur.

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

20 saniye altındaki production envanteri (ad: kelime/saniye): Ela El Ele 29/12; Ali ile Ela 23/9; Lili ile At 25/10; Oki El Ele 25/10; Mino Nerede? 22/9; Diyet 49/19; The Fox and the Grapes 49/19; The Lion and the Mouse 45/18; The Moon Is Not a Star 44/18; Oki Ay'ı Gördü 34/14; Yıldız mı, Gezegen mi? 37/15; Lili Ay Işığını Takip Ediyor 38/15; Oki’nin Ay Şiiri 26/11; Yağmur Tıp Tıp 23/9; Gökyüzü Şiiri 36/14; Bir Tohumun Yolculuğu 44/18; Arılar Neden Dans Eder? 43/17; Little Star Poem 30/12; Moon Poem 36/14; Space Poem 39/16. Bunların aktif katalogda bugün düzeltileni **0**. 35 okuma yaş minimumu altında; 11 tam okuma ve 18 mikro alıştırma için >%15 süre sapması önceki tam tarama ile aynı kalıyor. 14–16 aktif hikâye sayısı sıfır.

## Bugünkü hikâye: Alice Finds the Rabbit Hole

- Production: 52 kelime, hesaplanan 21 saniye, ilan edilen 18 saniye, iki bölüm (28/24 kelime); yaş hedefi 700–1.200.
- Taslak: **826 kelime**, 155 kelime/dakika ile **320 saniye (5:20)**; ilan edilen 320 saniye, sapma %0.
- Altı bölüm: **140 / 143 / 128 / 139 / 137 / 139** kelime; paylar **%16,9 / %17,3 / %15,5 / %16,8 / %16,6 / %16,8**.
- Cümle ortalaması 6,88, en uzunu 9 kelime; görünür paragraflar iki cümle; altı kısa İngilizce sözlük girdisi.
- Structural-valid: **true** (yerel odak testinin sayısal kapsamı); release-ready: **false**.

Akış: `nehirde can sıkıntısı → saatli tavşan → açıkça fantastik iniş → kilitli salon → perdenin ardındaki küçük kapı → kapıyı bulma ve yeni hedef`. Birinci bölümden seçilen olaylar, küçük kapının keşfiyle yerel bir çözüm kazanır; bahçeye giriş ve kitabın geri kalanı bu uyarlamanın kapsamına alınmaz. Ana tema merak ve dikkatli gözlemdir. Karakter ve bakış açısı Alice çevresinde kalır. Gerçek hayatta deliğe girme davranışını özendirmemek için inişin fantastik olduğu metinde ve uyarıda belirtilir. İsteğe bağlı soru puansızdır.

## Source-of-truth ve insan kapısı

Kaynak sırası: manifesto → `OKURIO-PRD-v1.1.md` (iç başlık `v1.2`) → pilot katalog planı → release checklist → `src/content`, `src/App.jsx`, `tests/content`. Kaynak eser Lewis Carroll, *Alice's Adventures in Wonderland*, Chapter I; Project Gutenberg [eser sayfası](https://www.gutenberg.org/ebooks/11) ve [bölüm metni](https://www.gutenberg.org/files/11/11-h/11-h.htm) 13 Eylül 2026'da karşılaştırıldı. Bu **özgün cümlelerle yazılmış seçilmiş sahneler uyarlamasıdır**, kitabın veya birinci bölümün tam metni değildir. Gutenberg yalnız ABD kamu malı statüsünü belirtir; diğer bölgelerin hukuk kararı otomatik verilmez.

`contentQualityReview.status=pending`; reviewerName, reviewedAt, reviewedCommit ve somut insan notları yok; evrensel sekiz checklist ile okuma-yolu checklist'i onaysız. Factual/olay sırası, İngilizce A1–A2 doğal dil ve yaş uyumu, telif/özgünlük, fantastik güvenlik ve erişilebilir ton incelemesi insan kaliteci bekliyor. `releaseReady=false`; taslak aktif kataloğa bağlanmadı. İnsan onayı olmadan hiçbir hak, safeguarding veya klinik uygunluk kararı tamamlanmış sayılmaz.

## Doğrulama, risk ve takip

Odak testleri 2/2; bütün içerik testleri 128/128; AI kalite kapısı 3/3; build PASS. Tam katalog auditinde 62/62 tam okumada blocker kalması güvenli FAIL-CLOSED sonucudur. Production validator halen yalnız üç Odysseia girdisini `belirsiz` yaş ile tarar; tam katalog yerine geçmez. Önceki PR #121 uzak CI 2/2 başarılı. Bu dalda merge veya production deploy yapılmadı.

Öncelikler: (1) PR #97 ve mevcut taslakları kaynak, hak, yaş, güvenlik ve anlatı için insan kaliteciye topluca inceletmek; (2) PR #106'da tam katalog yayın kapısı ile Ikarus yaş eşlemesini tamamlamak; (3) hâlâ kısa ve yaş altı kalan, çakışmasız bir sonraki hikâyeye taslak hazırlamak.
