# Okurio İçerik Kalite Turu — 22 Eylül 2026

## Yönetici özeti

- İncelenen production tabanı: `main@5f867b5c678ceee0d77dab0786e7bd61b26c21dc`.
- Katalog değişmedi: 80 kayıt; 62 tam okuma, 18 mikro alıştırma.
- 20 tam okuma 20 saniye veya altında; 35 tam okuma yaş minimumunun altında.
- Full-catalog audit güvenli biçimde kırmızı: 62/62 tam okuma en az bir yayın engeli taşıyor.
- Bugün 57 kelimelik `Prometheus’un Seçimi` özeti için 907 kelimelik taslak hazırlandı.
- Production kataloğuna bağlantı, insan onayı, merge, release veya deploy yapılmadı.

## Yaş grubu görünümü

| Yaş | Hedef | Okuma | Ortalama | Medyan | Minimum altı |
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

Ikarus kaydı mevcut production yaş eşlemesinde `unmapped` kalıyor. Yirmi çok kısa kaydın tamamı için yayın dışı taslak hazırlanmıştır; onaylanmadıkları için production’da düzeltilmiş sayılmazlar.

## Bugünün taslağı

**Prometheus’un Seçimi — 12–14 yaş**

- Production: 57 kelime, 23 saniye, iki özet bölüm.
- Taslak: 907 kelime, 155 kelime/dakikada 352 saniye (5:52).
- Yedi bölüm: 123 / 122 / 125 / 119 / 122 / 120 / 176 kelime.
- Bölüm payları: %13,6 / %13,5 / %13,8 / %13,1 / %13,5 / %13,2 / %19,4.
- Cümle ortalaması 6,17; en uzun cümle 11 kelime.
- Altı sözlük girdisi ve isteğe bağlı, puansız soru.
- `structuralValid=true`; `releaseReady=false`.

Anlatı akışı: `farklı kaynak kartları → saklanan kıvılcım → bilgi simgesi → karar haritası → ceza ve adalet → ortak sorumluluk → kaynaklı sunum`.

Tema, neden-sonuç, karakter/mekân sürekliliği, bölüm geçişleri ve tamamlanmış sonuç yapısal kontrolden geçti. Hesiodos ve Aiskhylos gelenekleri tek kanonik sürüm gibi birleştirilmedi. Mitolojik ceza grafik olmayan dille ele alındı; acı çekmek cesaret veya doğruluk ölçüsü yapılmadı.

## Kaynak ve insan kalite kapısı

Taslak, Hesiodos’un ateşin rezene sapında taşınması motifini ve Aiskhylos geleneğindeki daha geniş öğretici rolü kaynak etiketiyle ayırır. Klasik eserler kamu malıdır; ancak bağlantılı modern çevirilerin ayrıca hak koşulları vardır ve çeviri metni kullanılmamıştır. Taslak tam metin veya kesin çeviri değildir; Oki, Lili, Toto ve Nana çerçevesi ile teknoloji etiği örnekleri özgün editoryal içeriktir.

- Kaynaklar: [Hesiodos, Theogonia](https://www.poetryintranslation.com/PITBR/Greek/HesiodTheogony.php) ve [Aiskhylos, Prometheus Bound](https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0010).
- `contentQualityReview.status=pending`.
- İncelemeci adı, tarihi, exact commit ve somut notları boş.
- Sekiz zorunlu checklist maddesi `false`.
- Mit varyantları, kaynak doğruluğu, hak, yaş uygunluğu ve erişilebilirlik insan incelemesi bekliyor.
- Factual, originality/rights ve safeguarding incelemeleri `pending-human-review`.

## Doğrulama

- Odak testleri: 2/2 PASS.
- Tüm içerik testleri: 128/128 PASS.
- AI kalite kapısı: 3/3 PASS.
- Production build: PASS; yalnız paket boyutu uyarısı var.
- Full-catalog audit: beklenen FAIL-CLOSED, 62/62 tam okuma bloke.

## Deploy sırası

Onaylı yeni hikâye bulunmadığından deploy başlatılmadı. Her hikâye için sıra değişmez: isimli ve somut notlu insan onayı; tek hikâye deploy’u; production smoke testi ve süre/okuma kontrolü; yalnız başarılı sonuçtan sonra sıradaki deploy.

## Sonraki öncelikler

1. Hazır taslakları exact commit’e bağlı insan kalite incelemesine almak.
2. Publication gate ve Ikarus yaş eşleme düzeltmesini tamamlamak.
3. 12–14 yaş grubundaki kaynak kapsamı doğrulanabilir sıradaki kısa kaydı genişletmek.
