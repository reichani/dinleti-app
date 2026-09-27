# Okurio içerik kalite raporu — 27 Eylül 2026

## Yönetici özeti ve delta

- `main` değişmedi: `eb388a7bf416289701fcc11d930672d0507ce4a6`; son 24 saatte yeni main commit'i yok.
- 26 Eylül tarihli PR #135 exact-head CI sonucu 2/2 PASS.
- Production kataloğu 80 kayıt: 62 tam okuma, 18 mikro alıştırma.
- 20 tam okuma 20 saniye veya altında; 20/20 için yayın dışı genişletilmiş taslak bulunuyor.
- 35 tam okuma yaş minimumunun altında. 11 tam okuma ve 18 mikro alıştırmada süre farkı %15'i aşıyor.
- Full-catalog audit fail-closed: 62/62. Ikarus yaş eşlemesi `unmapped`.
- Bugün 43 kelimelik “Kutup Tilkisinin Yolculuğu” özeti, 700 kelimelik bilim hikâyesi taslağına dönüştürüldü.
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

## Bugünün taslağı

Production sürümü 43 kelime, yaklaşık 17 saniye ve iki özet bölümdür. Yeni taslak 700 kelime ve 155 kelime/dakika hesabıyla 271 saniyedir (4:31).

| Bölüm | Kelime | Pay |
|---|---:|---:|
| Beyaz İz | 127 | %18,1 |
| Mevsim Değişince | 119 | %17,0 |
| Soğuğu Tutmayan Kulaklar | 113 | %16,1 |
| Karın Altındaki Ses | 112 | %16,0 |
| Haritadaki Açık Yol | 115 | %16,4 |
| Yolculuğu Doğru Anlatmak | 114 | %16,3 |

- Cümle ortalaması 6,31; maksimum 10 kelime.
- Görünür paragraf başına en fazla üç cümle.
- Altı sözlük girdisi ve isteğe bağlı, puansız düşünme sorusu var.
- Anlatı: kar izi → mevsimsel kürk → termal uyum → kar altı işitme → kanıtsız rota düzeltmesi → kaynaklı sergi.
- Tema, neden-sonuç, karakter/mekân tutarlılığı, bölüm geçişi ve tamamlanmış sonuç otomatik kontrolden geçti.
- `structuralValid=true`, `releaseReady=false`.

## Kaynak, hak ve insan kalite kapısı

Kapsam NPS Bering Land Bridge ve Smithsonian kaynaklarıyla sınırlandırıldı: kış/yaz kürkü, kamuflaj, küçük kulakların ısı kaybını sınırlaması, hassas işitme ve deniz buzu çevresinde görülme. Belirli bireyin rotası veya göç mesafesi iddia edilmedi.

- `contentQualityReview.status=pending`; incelemeci adı, tarih, exact commit ve somut not yok.
- Evrensel ve 10–12 yaş okuma yolu checklist maddeleri `false`.
- Mevsimsel kürk, termal uyum, işitme ve habitat kapsamı uzman factual incelemesi bekliyor.
- Özgünlük/hak ve safeguarding incelemeleri `pending-human-review`.
- Avlanma grafik olmayan dille sunuldu; canlı davranışı başarı yarışına dönüştürülmedi.

## Doğrulama, teslim ve deploy sırası

- Odak testleri: 2/2 PASS.
- Tüm içerik testleri, build ve uzak CI: PR açıldıktan sonra exact head üzerinde doğrulanacak.
- Full-catalog audit: FAIL-CLOSED — 62/62.
- Branch: `content/2026-09-27-quality-turn`.
- İnsan onayı olmadığı için deploy yapılmadı. Sıra: exact commit'e bağlı isimli ve somut notlu onay → tek hikâyenin deploy'u → production smoke testi → yalnız başarılıysa sonraki deploy.

## Sonraki öncelikler

1. Hazır taslakları isimli ve somut notlu insan kalite incelemesine almak.
2. PR #106 publication gate ve Ikarus yaş eşlemesini tamamlamak.
3. 10–12 veya 12–14 yaş grubundaki sıradaki kısa bilim kaydını kaynak kapsamıyla genişletmek.
