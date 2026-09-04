# Okurio içerik kalite raporu — 4 Eylül 2026

## Yönetici özeti ve delta

Temiz main: 5f867b5c678ceee0d77dab0786e7bd61b26c21dc. Son 24 saatte main commit: 0.
80 kayıt, 62 tam okuma, 18 mikro alıştırma; 27 rafın tüm kimlikleri denetlendi.
20 tam okuma 20 saniye veya altında; 35 yaş minimumu altında.
11 tam okumada ve 18 mikro alıştırmada yüzde 15 üzerinde süre farkı var.
Full audit exit 1: 62/62 blocker. Ikarus 1774 kelime ama yaş alias tablosunda unmapped;
bu insan onayının geri alınması değildir. Production değerleri dünküyle aynı.

Dünkü PR #112 exact head bf2d9ee: iki CI hattı success. PR #97 ve #100–112 açık draft
durumda; #106 yönetişim değişikliği, diğerleri içerik adayları. Yeni insan onayı işlenmedi.
Bugün Oki’nin Ay Şiiri için 26 kelimelik kaydın yerine 332 kelimelik yayın dışı aday yazıldı.

## Source of truth

Sırasıyla docs/OKURIO-MANIFESTO-v1.0.md, docs/OKURIO-PRD-v1.1.md,
docs/PILOT-CATALOG-PLAN-v1.0.md ve docs/RELEASE-CHECKLIST.md kontrol edildi.
PRD dosya adı v1.1, iç başlığı v1.2. Süre 155 kelime/dakika tahminidir;
yaşa göre bağımsız okuma hızı normu değildir. Tam katalog metni birleşik audit
üzerinden okundu; App içindeki eski özet tek başına doğru kaynak kabul edilmedi.
Örneğin Nana Anlatıyor App içinde kısa görünse de birleşik katalogda 324 kelimedir;
yeniden yazılmadı.

## Yaş grupları — main

|Yaş|Kelime hedefi|Adet|Ortalama|Medyan|Minimum altı|
|---|---|---:|---:|---:|---:|
|3-4|150–300|3|285.7|291|0|
|5-6|200–400|1|203|203|0|
|6-7|250–500|15|166.6|69|10|
|7-8|350–650|9|218.1|351|4|
|8-10|500–900|10|200.7|47|7|
|10-12|700–1200|14|304.7|56.5|9|
|12-14|900–1600|7|333.1|86|5|
|14-16|1200–2000|0|0|0|0|
|16-18|1500–2500|1|1502|1502|0|
|18+|1800–3500|1|1800|1800|0|
|unmapped Ikarus|—|1|1774|1774|—|

## Bugünün metni

Oki’nin Ay Şiiri — 6–7 yaş. 332 kelime, 129 saniye.
Bölüm kelimeleri 82/74/94/82; payları 24.7%/22.3%/28.3%/24.7%.
Cümle ortalaması 6,78; en uzun cümle 7 kelime. Görünür paragraf en fazla 3 cümle.
Sözlük 5 girdi; düşünme sorusu isteğe bağlı ve puansız.
StructuralValid test hesabı true; releaseReady false.

Tür açıkça şiirli hikâye olarak önerildi; eski şiir kaydının onaysız tür değişimi yapılmadı.
Dört özgün dize hikâyenin içinde bulunuyor. Akış: boş sayfa → benzetmelerle ilk dizeler →
bulutla değişen görüntü → şiire yeni dizeler ekleyerek tamamlamak.
Nana yazıyı üstleniyor; bağımsız yazma başarısı şartı veya puan yok.
Gerçek Ay ile düğme/yastık/perde/yüz benzetmeleri ayrılıyor.
Karakter, oda ve aynı akşam zaman akışı tutarlı. Bu editoryal ön inceleme
insan narrativeArc/ageFit onayı değildir.

## İnsan ve hak incelemesi

contentQualityReview.status=pending. Ad/tarih/commit/not boş;
8 evrensel checklist ve okuma-yolu checklist maddeleri false.
Factual, originalityRights ve safeguardingLanguage pending-human-review.
Anlatı ve dört dize özgün yazım; harici şiir veya kamu malı aktarımı yok.
Hak sahipliği/klinik/hukuki uygunluk otomatik onaylanmadı.
Açık incelemeler: ilk harf/hece yükü, benzetmelerin anlaşılması,
tür/raf değişikliği, erişilebilirlik tonu. Aktif kataloğa bağlantı yapılmadı.

## Test/build

Yerel 129/129 içerik testi PASS. Build PASS; AI kapısı build içinde geçti.
Olumsuz örnekler yaş minimumu, bölüm sayısı, kısa bölüm, eksik/yanlış süre,
eksik insan review, onaysız releaseReady, eksik kamu malı kaynak/kapsamı ve
paragraf ihlalini reddeder. Bunlar odak taslağı testleridir, tüm katalog kapısının
onarıldığını göstermez.
Dar production validator yalnız üç Odysseia kaydını tarar; PASS tüm katalog kanıtı değildir.
Yeni PR uzak CI bu rapor hazırlanırken henüz tamamlanmadı.
Main merge/production deploy NOT RUN. Branch: content/2026-09-04-quality-turn.

## Kısa tam okuma envanteri

|Başlık|Yaş|Kelime|Tahmini saniye|
|---|---|---:|---:|
|Ela El Ele|6-7|29|12|
|Ali ile Ela|6-7|23|9|
|Lili ile At|6-7|25|10|
|Oki El Ele|6-7|25|10|
|Mino Nerede?|6-7|22|9|
|Diyet|10-12|49|19|
|The Fox and the Grapes|8-10|49|19|
|The Lion and the Mouse|8-10|45|18|
|The Moon Is Not a Star|10-12|44|18|
|Oki Ay'ı Gördü|7-8|34|14|
|Yıldız mı, Gezegen mi?|8-10|37|15|
|Lili Ay Işığını Takip Ediyor|6-7|38|15|
|Oki’nin Ay Şiiri|6-7|26|11|
|Yağmur Tıp Tıp|7-8|23|9|
|Gökyüzü Şiiri|8-10|36|14|
|Bir Tohumun Yolculuğu|8-10|44|18|
|Arılar Neden Dans Eder?|10-12|43|17|
|Little Star Poem|7-8|30|12|
|Moon Poem|8-10|36|14|
|Space Poem|10-12|39|16|

Oki’nin Ay Şiiri düzeltmesi bugün hazırlandı; production eski kaydı değişmedi.

## Tüm rafların denetimi

Referanslar birden çok rafta yinelenebilir; satırlar tekil katalog toplamı değildir.

|Raf|Referans|Eksik kimlik|20sn altı (mikro dahil)|
|---|---:|---:|---:|
|Odysseia Yolculukları|3|0|0|
|Tam Okuma Oturumları|2|0|0|
|Tam Metin · Kamu Malı|1|0|0|
|Oki Minik Dinleyiciler|5|0|2|
|Mikro Alıştırmalar|9|0|9|
|Oki Mini Hikâyeler|7|0|5|
|Editörün Seçtikleri|3|0|0|
|Masal Saati|5|0|0|
|English Corner|4|0|2|
|English Word Cards|4|0|4|
|English Reading Club|8|0|5|
|Young English Readers|4|0|1|
|English Classics Bridge|2|0|0|
|Gökyüzü ve Yıldızlar|7|0|5|
|Şiir ve Ritim|5|0|5|
|Bilmeceler|3|0|3|
|Oki Doğa Kulübü|4|0|3|
|English Poems|3|0|3|
|Eski Zaman Masalları|2|0|1|
|Oki Mitolojiye Başlıyor|3|0|0|
|Mitoloji ve Kahramanlar|4|0|0|
|Mitolojiden Klasiklere|3|0|0|
|Mitolojiyle Okumaya Dönüş|2|0|0|
|Rol Seçerek Oku|4|0|0|
|Dünya Masalları|5|0|0|
|Kısa Dinletiler|4|0|1|
|Klasik Romanlar|3|0|0|

## Tüm kayıtlar: gerçek kelime, süre ve bölümler

Başlık/sözlük/düşünme sorusu kelime hesabının dışında.

|Başlık|Kelime|Saniye|Bölüm kelimeleri|Bölüm yüzdeleri|
|---|---:|---:|---|---|
|Odysseia: Eve Doğru İlk Rüzgâr|505|196|80/79/88/83/84/91|15.8/15.6/17.4/16.4/16.6/18.0|
|Odysseia: Zaferden Sonraki Belirsizlik|900|349|124/124/136/134/133/124/125|13.8/13.8/15.1/14.9/14.8/13.8/13.9|
|Odysseia: Dönüşün Başladığı Kıyı|1502|582|198/187/192/184/186/187/181/187|13.2/12.5/12.8/12.3/12.4/12.5/12.1/12.5|
|Oki ile Ses Bahçesi|601|233|111/116/126/133/115|18.5/19.3/21.0/22.1/19.1|
|Lili'nin Kayıp Tohum Haritası|606|235|114/132/113/121/126|18.8/21.8/18.6/20.0/20.8|
|Oki Sesleri Dinliyor|294|114|78/72/67/77|26.5/24.5/22.8/26.2|
|Mino'nun Yumuşak Miyavı|291|113|73/64/76/78|25.1/22.0/26.1/26.8|
|Lili Yıldız Sayıyor|272|106|65/63/69/75|23.9/23.2/25.4/27.6|
|A Sesi|26|11|15/11|57.7/42.3|
|N Sesi|35|14|16/19|45.7/54.3|
|an en al el at et|30|12|15/15|50.0/50.0|
|İlk Kelimeler: ana, anne, Ali, Ela|23|9|13/10|56.5/43.5|
|Oki Atı Tanıyor|266|103|60/56/69/81|22.6/21.1/25.9/30.5|
|Ela El Ele|29|12|17/12|58.6/41.4|
|E Sesi|29|12|16/13|55.2/44.8|
|T Sesi|33|13|14/19|42.4/57.6|
|İ Sesi|27|11|14/13|51.9/48.1|
|L Sesi|35|14|14/21|40.0/60.0|
|al el il in it|25|10|12/13|48.0/52.0|
|Ali ile Ela|23|9|13/10|56.5/43.5|
|Lili ile At|25|10|13/12|52.0/48.0|
|Oki El Ele|25|10|13/12|52.0/48.0|
|Mino Nerede?|22|9|13/9|59.1/40.9|
|Nana Anlatıyor|324|126|82/77/80/85|25.3/23.8/24.7/26.2|
|Kürk Mantolu Madonna|124|48|23/18/14/18/18/17/16|18.5/14.5/11.3/14.5/14.5/13.7/12.9|
|Çalıkuşu|86|34|17/15/13/15/12/14|19.8/17.4/15.1/17.4/14.0/16.3|
|Yüksek Ökçeler|53|21|19/17/17|35.8/32.1/32.1|
|Pembe İncili Kaftan|57|23|18/18/21|31.6/31.6/36.8|
|Mai ve Siyah|67|26|14/11/11/10/11/10|20.9/16.4/16.4/14.9/16.4/14.9|
|Diyet|49|19|16/16/17|32.7/32.7/34.7|
|Sessiz Saatler|1043|404|163/145/137/138/129/115/108/108|15.6/13.9/13.1/13.2/12.4/11.0/10.4/10.4|
|Keloğlan Masalları|70|28|24/25/21|34.3/35.7/30.0|
|La Fontaine'den Fabllar|69|27|22/22/25|31.9/31.9/36.2|
|Andersen Masalları|689|267|196/232/261|28.4/33.7/37.9|
|Ezop Masalları|277|108|96/94/87|34.7/33.9/31.4|
|Grimm Kardeşler Masalları|351|136|113/97/141|32.2/27.6/40.2|
|Aesop's Fables|98|38|33/37/28|33.7/37.8/28.6|
|The Tale of Peter Rabbit|972|377|180/356/436|18.5/36.6/44.9|
|The Ugly Duckling|95|37|35/27/33|36.8/28.4/34.7|
|The Fox and the Grapes|49|19|25/24|51.0/49.0|
|The Lion and the Mouse|45|18|21/24|46.7/53.3|
|Alice Finds the Rabbit Hole|52|21|28/24|53.8/46.2|
|The Selfish Giant|56|22|29/27|51.8/48.2|
|The Happy Prince and the Swallow|55|22|26/29|47.3/52.7|
|The Moon Is Not a Star|44|18|23/21|52.3/47.7|
|Oki Ay'ı Gördü|34|14|19/15|55.9/44.1|
|Yıldız mı, Gezegen mi?|37|15|20/17|54.1/45.9|
|Oki ve Ay Haritası|726|282|117/126/120/124/117/122|16.1/17.4/16.5/17.1/16.1/16.8|
|Japon Masalları|353|137|109/114/130|30.9/32.3/36.8|
|Çin Masalları|351|136|108/112/131|30.8/31.9/37.3|
|Oki ve Güneşin Hikâyesi|203|79|56/48/47/52|27.6/23.6/23.2/25.6|
|Lili Ay Işığını Takip Ediyor|38|15|20/18|52.6/47.4|
|Oki ve Pegasus|54|21|27/27|50.0/50.0|
|Oki ve Labirentin İzi|61|24|32/29|52.5/47.5|
|Prometheus’un Seçimi|57|23|30/27|52.6/47.4|
|Ikarus Bugün Ne Anlatır?|1774|687|218/216/216/216/229/229/215/235|12.3/12.2/12.2/12.2/12.9/12.9/12.1/13.2|
|Ariadne’nin İpi: Yol Bulmak|1800|697|289/274/298/293/295/351|16.1/15.2/16.6/16.3/16.4/19.5|
|Oki ve Lili Sahnesi|362|141|50/48/42/45/78/99|13.8/13.3/11.6/12.4/21.5/27.3|
|Toto Acele Etme Piyesi|512|199|54/48/45/46/55/64/54/146|10.5/9.4/8.8/9.0/10.7/12.5/10.5/28.5|
|Uzay Kulübü Sunumu|700|271|119/115/117/115/113/121|17.0/16.4/16.7/16.4/16.1/17.3|
|English Words: Hello|18|7|9/9|50.0/50.0|
|English Words: Sky|26|11|12/14|46.2/53.8|
|English Words: Colors|25|10|13/12|52.0/48.0|
|Toto Tak Tak Dedi|24|10|13/11|54.2/45.8|
|Nana’nın Ritim Oyunu|25|10|16/9|64.0/36.0|
|Oki Hop Hop|18|7|10/8|55.6/44.4|
|Oki’nin Ay Şiiri|26|11|12/14|46.2/53.8|
|Yağmur Tıp Tıp|23|9|12/11|52.2/47.8|
|Gökyüzü Şiiri|36|14|18/18|50.0/50.0|
|Ay Bilmecesi|20|8|12/8|60.0/40.0|
|Yıldız Bilmecesi|22|9|11/11|50.0/50.0|
|Tohum Bilmecesi|27|11|15/12|55.6/44.4|
|Bir Tohumun Yolculuğu|44|18|22/22|50.0/50.0|
|Arılar Neden Dans Eder?|43|17|25/18|58.1/41.9|
|Kutup Tilkisinin Yolculuğu|712|276|116/113/123/124/116/120|16.3/15.9/17.3/17.4/16.3/16.9|
|Mino Nerede? Sahnesi|364|141|45/37/37/44/54/67/80|12.4/10.2/10.2/12.1/14.8/18.4/22.0|
|Labirentte Üç Ses|702|272|113/111/123/108/121/126|16.1/15.8/17.5/15.4/17.2/17.9|
|Little Star Poem|30|12|15/15|50.0/50.0|
|Moon Poem|36|14|22/14|61.1/38.9|
|Space Poem|39|16|25/14|64.1/35.9|

## Sonraki öncelikler

1. PR #97 ve hazır adaylarda gerçek kişi/tarih/somut not içeren içerik incelemesi.
2. PR #106: mikro süre denetimi, yeni borcu kaçırmayan baseline, gerçek publication gate.
3. Kalan kısa şiirler ve Diyet için tür/kaynak kapsamı korunarak tam sürüm.

## Tam taslak

### Boş Sayfa

Oki, akşam masasına boş bir kâğıt koydu. Nana karşısındaki koltukta resimli bir kitap okuyordu. Pencerenin dışında Ay ve ince bulutlar görünüyordu.

Oki, gördüğü manzara için şiir yazmak istedi. Önce kâğıdına küçük bir pencere resmi çizdi. Sonra pencerenin üstüne parlak bir Ay ekledi.

Fakat resmin altına hangi sözcükleri koyacağını bilemedi. Kalemini bırakıp bir süre dışarıya baktı. Nana, isterse gördüklerini anlatabileceğini ona söyledi.

Oki gökyüzündeki ince bulutu parmağıyla hemen gösterdi. Bulut ona yumuşak bir yastık gibi görünüyordu. Nana, bu benzetmeyi unutmamak için not aldı.

### İlk Dizeler

Oki artık şiirine başlayacak bir görüntü bulmuştu. Ay için de başka bir benzetme düşündü. Onu gökte duran beyaz düğmeye benzetti.

Nana, Oki’nin söylediği sözcükleri kâğıda dikkatle yazdı. Sonra yazdığı iki dizeyi ona okudu. Oki dinlerken kendi resmine tekrar baktı.

İnce bulut gökte yumuşak bir yastık gibi. Beyaz Ay uzakta küçük bir düğme gibi.

Oki bu dizelerin devamını da getirmek istedi. Ancak sırf benzesin diye sözcük seçmek istemiyordu. Pencerede gördüğü başka bir ayrıntıyı aramaya başladı.

### Değişen Resim

O sırada bulut Ay’ın önünden geçmeye başladı. Oki resimdeki düğmeyi artık göremediğini fark etti. Yazdıkları şiirin yanlış olduğunu sanıp kâğıdı çevirdi.

Nana eski resmi yeniden görmek istediğini söyledi. Resim biraz önce gördüklerini hâlâ anlatıyordu. Şimdiki görüntü için başka dizeler ekleyebilirlerdi.

Oki kâğıdı geri çevirip yeni görüntüyü düşündü. Ay kaybolmamış, yalnızca bulutun arkasında kalmıştı. Oki bunu saklambaç oyunundaki perdeye benzetti.

Nana bu kez kalemi kâğıdın altına götürdü. Oki yeni dizelerini söylemeden önce biraz bekledi. Bulutun kenarında beyaz bir parıltı yeniden belirdi.

Bulut geçti önümden ince bir perde gibi. Ay göründü ardından tanıdık bir yüz gibi.

### Oki’nin Şiiri

Nana dört dizeyi başından sonuna kadar okudu. Oki şiirde hem önceyi hem sonrayı duydu. Değişen görüntü artık şiirin bir parçası olmuştu.

Kâğıdın üstüne birlikte şiirin adını koydular. Nana yazıyı yazdı, Oki küçük resimleri tamamladı. İlk resmin yanına bulutlu ikinci pencereyi çizdi.

Oki şiirini ertesi gün Lili’ye göstermek istedi. Kâğıdı kıvrılmaması için resim dosyasına yerleştirdi. Sonra kalemlerini masanın üzerindeki kutuya geri koydu.

Pencereye son kez baktığında bulut daha uzaktaydı. Oki yeni görüntüyü de bir süre izledi. Bu akşamın şiiri artık dosyasında onu bekliyordu.

### Sözlük

- dize: Şiirin bir satırı.
- benzetme: Bir şeyi başka bir şeye benzer anlatma.
- ayrıntı: Bir bütündeki küçük özellik.
- parıltı: Göze çarpan küçük ışık.
- manzara: Baktığımız yerde gördüğümüz görünüş.

İstersen anlat: Sen bulutu neye benzetirdin?

