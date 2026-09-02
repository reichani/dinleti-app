# İçerik kalite turu — 2 Eylül 2026

## Kaynak ve kapsam

Taban main: `5f867b5c678ceee0d77dab0786e7bd61b26c21dc`. Son 24 saat main commit sayısı: 0.
Manifesto, PRD, pilot katalog planı ve release checklist sırasıyla okundu.
PRD dosya adı v1.1, iç başlığı v1.2; sessizce yeniden adlandırılmadı.
Tüm katalog auditi 80 kaydı ve 31 kategori etiketini kapsadı; kategori raf sayısı değildir.
App raf bağlantıları incelendi. Bugünkü aday Gökyüzü ve Yıldızlar rafındaki mevcut kimliği hedefler.
Yaş hedefleri bu görevdeki içerik sözleşmesidir; 155 kelime/dakika ses tahminidir, çocuk okuma hızı normu değildir.

## Temiz main ölçümü

62 tam okuma, 18 mikro alıştırma. Tam okumaların 20'si en fazla 20 saniye,
35'i yaş minimumu altında, 11'i yüzde 15 üzerinde süre sapmalı.
18 mikro alıştırmanın tamamı süre sapmalı. Tam katalog audit exit code 1: 62/62 blocker.
Ikarus 1774 kelime ama yaş alias eksikliği nedeniyle unmapped; insan onayı geri alınmış değildir.

| Yaş | Hedef | Adet | Ortalama | Medyan | Minimum altı |
|---|---|---:|---:|---:|---:|
|3–4|150–300|3|285,7|291|0|
|5–6|200–400|1|203|203|0|
|6–7|250–500|15|166,6|69|10|
|7–8|350–650|9|218,1|351|4|
|8–10|500–900|10|200,7|47|7|
|10–12|700–1200|14|304,7|56,5|9|
|12–14|900–1600|7|333,1|86|5|
|14–16|1200–2000|0|—|—|—|
|16–18|1500–2500|1|1502|1502|0|
|18+|1800–3500|1|1800|1800|0|
|Eşlenemeyen Ikarus|—|1|1774|1774|—|

## Kısa kayıt envanteri (kelime)

- 6–7: Ela El Ele 29; Ali ile Ela 23; Lili ile At 25; Oki El Ele 25; Mino Nerede 22; Lili Ay Işığını Takip Ediyor 38; Oki’nin Ay Şiiri 26.
- 7–8: Oki Ay’ı Gördü 34; Yağmur Tıp Tıp 23; Little Star Poem 30.
- 8–10: The Fox and the Grapes 49; The Lion and the Mouse 45; Yıldız mı, Gezegen mi 37; Gökyüzü Şiiri 36; Bir Tohumun Yolculuğu 44; Moon Poem 36.
- 10–12: Diyet 49; The Moon Is Not a Star 44; Arılar Neden Dans Eder 43; Space Poem 39.

## Somut çıktı ve delta

Yıldız mı, Gezegen mi: 37 kelimelik kayıt için yayın dışı 554 kelimelik yeni tam hikâye adayı.
155 kelime/dakikadan türetilen ilan/tahmin: 215 saniye (3:35), sapma sıfır.
5 bölüm: 103 / 107 / 131 / 104 / 109 kelime.
Payları: %18,6 / %19,3 / %23,6 / %18,8 / %19,7.
Cümle ortalaması 7,10; maksimum 9. Her paragraf en fazla 3 cümle. Sözlük 5 girdi.
Yapısal doğrulama true, releaseReady false. Süre elle yazılmıyor, metinden hesaplanıyor.

Editoryal ön inceleme: yanlış etiketle başlayan amaç, kitapla araştırma, modelle gelişme,
kimliği belirsiz fotoğrafla dönüm ve tamamlanan panoyla sonuç var. Aynı okul/karakterler ve
ertesi sabaha uzanan tutarlı zaman çizgisi korunuyor. Bilmemek utandırılmıyor.
Anlatı kalitesi testle kanıtlanmış insan onayı olarak sunulamaz.

NASA yıldızlar, gezegen tanımı ve Venüs sayfaları 2 Eylül 2026'da kontrol edildi:
https://science.nasa.gov/universe/stars/
https://science.nasa.gov/solar-system/planets/what-is-a-planet/
https://science.nasa.gov/venus/
Bilimsel açıklamaların yaş uygunluğu ve fener modelinin sınırları insan incelemesine açık.
Özgün anlatı; kamu malı tam metin iddiası yok. Hak sahipliği otomatik onaylanmadı.

## İnsan kapısı ve testler

contentQualityReview pending; ad/tarih/not boş, checklist false.
Factual, özgünlük/hak ve safeguarding incelemeleri pending-human-review.
Aktif kataloğa bağlanmadı. Yerel içerik testleri 129/129; build başarılı.
Olumsuz test örnekleri yaş minimumu, bölüm sayısı, kısa bölüm, süre, kaynak, eksik review
ve sahte releaseReady durumlarının reddini kontrol ediyor. Bu testler bugünkü taslağa özeldir;
mevcut tüm katalog kapısının onarıldığı anlamına gelmez.
Dar production validator PASS yalnız üç Odysseia kaydına ilişkindir.

## PR kuyruğu ve riskler

Açık PR'lar güncel olarak listelendi. #97 ve #100–110 draft durumda.
#106 içerik yönetişim değişikliğidir, hikâye değildir; insan kapısı ve baseline açıkları çözülmüş sayılmadı.
#110 head 42b84db: iki CI hattı success. Bu iki İngilizce fabl yeniden yazılmadı.
Eski eş adaylar #47, #51–54 ve #59 ile birlikte inceleme kuyruğunda; otomatik kapatılmadı.
Bugünkü çıktı yeni bir adaydır; main değişmediği için katalog borcu azalmadı.
Merge ve production deploy yapılmadı. Yeni PR'nin remote CI sonucu ayrıca izlenmelidir.

## Sonraki üç öncelik

1. #106 gerçek yayın kapısı, mikro süre ve baseline denetim açıklarını gidermek.
2. #97 ve hazır hikâyelerin isim/tarih/somut not içeren insan incelemesini tamamlamak.
3. Kalan kısa kayıtların tam sürümlerini, eski taslaklarla çakışmadan tamamlamak.
