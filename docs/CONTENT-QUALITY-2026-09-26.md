# Okurio içerik kalite raporu — 26 Eylül 2026

## Yönetici özeti ve delta

- `main`, son rapordan sonra `eb388a7bf416289701fcc11d930672d0507ce4a6` commit'ine ilerledi. Değişiklik okuyucu DOM kararlılığı, tablet ayar yerleşimi ve regresyon testleriyle sınırlı; katalog içeriği değişmedi.
- 25 Eylül tarihli PR #134 exact-head CI sonucu 2/2 PASS.
- Production kataloğu 80 kayıt: 62 tam okuma, 18 mikro alıştırma.
- 20 tam okuma 20 saniye veya altında; 20/20 için yayın dışı genişletilmiş taslak bulunuyor.
- 35 tam okuma yaş minimumunun altında. 11 tam okuma ve 18 mikro alıştırmada süre farkı %15'i aşıyor.
- Full-catalog audit fail-closed: 62/62. Ikarus yaş eşlemesi `unmapped`.
- Bugün 43 kelimelik “Arılar Neden Dans Eder?” özeti, 701 kelimelik bilim kurmacası taslağına dönüştürüldü.
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

“Arılar Neden Dans Eder?” production sürümü 43 kelime, yaklaşık 17 saniye ve iki özet bölümdür. Yeni taslak 701 kelime ve 155 kelime/dakika hesabıyla 272 saniyedir (4:32).

| Bölüm | Kelime | Pay |
|---|---:|---:|
| Sessiz Kovandaki Soru | 113 | %16,1 |
| Bir Dansın İki İpucu | 119 | %17,0 |
| Kâğıttaki Yanlış Harita | 110 | %15,7 |
| Koku, Dokunuş ve Yaklaşık Yol | 121 | %17,3 |
| Kaynakla Yapılan Deneme | 111 | %15,8 |
| Dans Eden Bilginin Sınırı | 127 | %18,1 |

- Cümle ortalaması 6,55; maksimum 12 kelime.
- Görünür paragraf başına en fazla üç cümle.
- Altı sözlük girdisi ve isteğe bağlı, puansız düşünme sorusu var.
- Anlatı: gözlem → yön/uzaklık ipuçları → hatalı model → çoklu duyusal sınırlar → kaynak kontrolü → sergi.
- Tema, neden-sonuç, karakter/mekân tutarlılığı, bölüm geçişi ve tamamlanmış sonuç otomatik kontrolden geçti.
- `structuralValid=true`, `releaseReady=false`.

## Kaynak, hak ve insan kalite kapısı

Kapsam Nobel Prize 1973 basın duyurusu, USDA ARS araştırma bildirisi ve USDA Forest Service eğitim materyaliyle sınırlandırıldı. Taslak kaynakların çevirisi değildir; olgularla sınırlandırılmış özgün Okurio kurmacasıdır.

- `contentQualityReview.status=pending`; incelemeci adı, tarih, exact commit ve somut not yok.
- Evrensel ve 10–12 yaş okuma yolu checklist maddeleri `false`.
- Yön kodu, süre-uzaklık ilişkisi ve koku/dokunma bağlamı uzman factual incelemesi bekliyor.
- Özgünlük/hak ve safeguarding incelemeleri `pending-human-review`.
- Kovan gözlemi güvenlik çizgisi ve yetişkin arıcı gözetimiyle anlatıldı; gerçek saha uygulaması insan editörce doğrulanmalı.

## Doğrulama, teslim ve deploy sırası

- Odak testleri: 2/2 PASS.
- Tüm içerik testleri, build ve uzak CI: PR açıldıktan sonra exact head üzerinde doğrulanacak.
- Full-catalog audit: FAIL-CLOSED — 62/62.
- Branch: `content/2026-09-26-quality-turn`.
- İnsan onayı olmadığı için deploy yapılmadı. Sıra: exact commit'e bağlı isimli ve somut notlu onay → tek hikâyenin deploy'u → production smoke testi → yalnız başarılıysa sonraki deploy.

## Sonraki öncelikler

1. Hazır taslakları isimli ve somut notlu insan kalite incelemesine almak.
2. PR #106 publication gate ve Ikarus yaş eşlemesini tamamlamak.
3. 10–12 yaş grubundaki sıradaki kısa bilim özetini kaynak kapsamıyla genişletmek.
