# Okurio içerik kalite turu — 3 Eylül 2026

## Yönetici özeti

Kaynak commit: 5f867b5c678ceee0d77dab0786e7bd61b26c21dc. Son 24 saatte main commit: 0.
80 katalog kaydı, 62 eski sınıflandırmalı tam okuma, 18 mikro alıştırma.
27 rafın tüm kimlikleri katalogda bulundu; raf görünürlüğünün bütün cihazlarda doğrulandığı anlamına gelmez.
20 tam okuma en fazla 20 saniye; 35 yaş minimumunun altında.
11 tam okumada ve 18 mikro alıştırmada süre sapması %15 üzerinde.
Temiz main full-catalog auditi exit 1, 62/62 blocker. Bunlar tek tip hata değildir.
Ikarus 1774 kelime; main audit yaş alias tablosu nedeniyle unmapped.

Kaynak sırası: manifesto, PRD, pilot plan, release checklist; ardından içerik/App/testler.
PRD dosya adı v1.1, belge iç başlığı v1.2; bu isim farkı değiştirilmedi.
155 kelime/dakika ses tahminidir, çocukların bağımsız okuma hızı standardı değildir.

## Önceki güne göre delta

Production değişmedi. #97'nin güncellenen 5ed9c84 başında iki CI hattı success;
#111'in d91f1eb başında da iki hat success. #97 içindeki 1256 kelimelik
revizyon ve review formu 2 Eylül işidir, bugünün üretimi sayılmadı.
Bugün Lili Ay Işığını Takip Ediyor için yeni yayın dışı tam metin üretildi.
#97 ve #100–111 draft; #106 hikâye değil yönetişim değişikliği.
Önceki deploy talimatları insan içerik onayına dönüştürülmedi.

## Yaş tablosu — main audit

|Yaş|Hedef kelime|Adet|Ortalama|Medyan|Minimum altı|
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

## Bugünün somut çıktısı

Lili Ay Işığını Takip Ediyor: 333 kelime, 129 saniye (2:09).
Bölümler: 79 / 81 / 97 / 76.
Paylar: 23.7% / 24.3% / 29.1% / 22.8%.
Ortalama cümle 6,53 kelime; maksimum 8; paragraf başına en fazla 3 cümle.
5 sözlük girdisi, isteğe bağlı puansız soru.
Hesaplanan structuralValid=true; releaseReady=false.

Eski kayıt 5–8 etiketli, audit tarafından 6–7'ye eşleniyor; Eski Zaman Masalları
rafı ise 3–4/5–6 yollarına açık. Taslak bu tanımların ortak aralığı 5–6'ya
daraltılmış hazırlık/dinleme adayıdır. Yaş minimumu 200, maksimum 400.
Bu, mevcut 6–7 istatistiğinin düzeltilmesi veya production yaşının değişmesi değildir.
İnsan incelemesinde hedef yaş, kayıt etiketi ve raf rotası birlikte onaylanmalıdır.

Anlatı ön incelemesi: salondaki ışık yolu → resimli kitap → ışık kaybolunca
yarım kalan masal → kâğıtta çizilen yol ve arkadaşına ulaşan tavşan.
Tek tema birlikte hayal ederek tamamlamak. Gerçek oda ve masal içindeki kayık
ayrılıyor; karakter/yer/zaman sürekliliği korunuyor. Nana yazıyı üstleniyor.
Bu editoryal ön inceleme insan kalite onayı yerine geçmez.

## İnsan, kaynak ve hak durumu

contentQualityReview.status=pending; reviewerName/reviewedAt/reviewedCommit/reviewNotes boş.
Sekiz evrensel ve okuma-yolu checklist maddesi false.
Factual, özgünlük/hak ve safeguarding review pending-human-review.
Özgün kurmaca, kamu malı veya tarihsel mitoloji uyarlaması değil.
Kaynak kitap anlatı içindeki kurgusal isimsiz nesnedir; dış metin alınmadı.
İnsan incelemesi: 5–6 yaş dinleme yükü, gerçek/hayal ayrımı, gece ve ışık betimi,
sözlük sözcükleri, kayık sahnesinin yalnız kurmaca olduğunun açıklığı.

## Test ve yayın

Yerel içerik testleri 129/129 PASS; build PASS.
Olumsuz örnekler: yaş minimumu, bölüm sınırları, kısa bölüm, eksik/uyumsuz süre,
eksik review, onaysız releaseReady, kamu malında eksik kaynak ve paragraf ihlali reddediliyor.
Bu odak testleri tüm katalog validatorünün onarıldığı iddiası değildir.
Dar production validator yalnız üç Odysseia kaydı için PASS.
Full catalog FAIL-CLOSED: 62/62 blocker, beklenen mevcut borç.
Yeni PR uzak CI sonucu rapor hazırlanırken henüz yok; PASS denmiyor.
Runtime bağlantısı, merge ve production deploy NOT RUN.
Branch content/2026-09-03-quality-turn.

## 20 saniyelik envanter

|Kayıt|Yaş (audit)|Kelime|Saniye|
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

## Tüm raflar

Aşağıdaki blocker sayıları raftaki referanslar üzerinden hesaplanır; bir içerik birden
fazla rafta olabilir, satırlar toplanarak tekil katalog toplamı üretilmemelidir.
Kısa sütunu mikro alıştırmaları da içerir.

|Raf|Referans|Kısa|Blocker'lı|Eksik kimlik|
|---|---:|---:|---:|---:|
|Odysseia Yolculukları|3|0|3|0|
|Tam Okuma Oturumları|2|0|2|0|
|Tam Metin · Kamu Malı|1|0|1|0|
|Oki Minik Dinleyiciler|5|2|5|0|
|Mikro Alıştırmalar|9|9|9|0|
|Oki Mini Hikâyeler|7|5|7|0|
|Editörün Seçtikleri|3|0|3|0|
|Masal Saati|5|0|5|0|
|English Corner|4|2|4|0|
|English Word Cards|4|4|4|0|
|English Reading Club|8|5|8|0|
|Young English Readers|4|1|4|0|
|English Classics Bridge|2|0|2|0|
|Gökyüzü ve Yıldızlar|7|5|7|0|
|Şiir ve Ritim|5|5|5|0|
|Bilmeceler|3|3|3|0|
|Oki Doğa Kulübü|4|3|4|0|
|English Poems|3|3|3|0|
|Eski Zaman Masalları|2|1|2|0|
|Oki Mitolojiye Başlıyor|3|0|3|0|
|Mitoloji ve Kahramanlar|4|0|4|0|
|Mitolojiden Klasiklere|3|0|3|0|
|Mitolojiyle Okumaya Dönüş|2|0|2|0|
|Rol Seçerek Oku|4|0|4|0|
|Dünya Masalları|5|0|5|0|
|Kısa Dinletiler|4|1|4|0|
|Klasik Romanlar|3|0|3|0|

## Tüm kayıtların kelime ve bölüm dökümü

Kelime hesabına başlık, sözlük ve düşünme sorusu dahil değil.

|Kayıt|Kelime|Tahmini sn|Bölüm kelimeleri|Bölüm payları|
|---|---:|---:|---|---|
|Odysseia: Eve Doğru İlk Rüzgâr|505|196|80/79/88/83/84/91|15.8/15.6/17.4/16.4/16.6/18.0 %|
|Odysseia: Zaferden Sonraki Belirsizlik|900|349|124/124/136/134/133/124/125|13.8/13.8/15.1/14.9/14.8/13.8/13.9 %|
|Odysseia: Dönüşün Başladığı Kıyı|1502|582|198/187/192/184/186/187/181/187|13.2/12.5/12.8/12.3/12.4/12.5/12.1/12.5 %|
|Oki ile Ses Bahçesi|601|233|111/116/126/133/115|18.5/19.3/21.0/22.1/19.1 %|
|Lili'nin Kayıp Tohum Haritası|606|235|114/132/113/121/126|18.8/21.8/18.6/20.0/20.8 %|
|Oki Sesleri Dinliyor|294|114|78/72/67/77|26.5/24.5/22.8/26.2 %|
|Mino'nun Yumuşak Miyavı|291|113|73/64/76/78|25.1/22.0/26.1/26.8 %|
|Lili Yıldız Sayıyor|272|106|65/63/69/75|23.9/23.2/25.4/27.6 %|
|A Sesi|26|11|15/11|57.7/42.3 %|
|N Sesi|35|14|16/19|45.7/54.3 %|
|an en al el at et|30|12|15/15|50.0/50.0 %|
|İlk Kelimeler: ana, anne, Ali, Ela|23|9|13/10|56.5/43.5 %|
|Oki Atı Tanıyor|266|103|60/56/69/81|22.6/21.1/25.9/30.5 %|
|Ela El Ele|29|12|17/12|58.6/41.4 %|
|E Sesi|29|12|16/13|55.2/44.8 %|
|T Sesi|33|13|14/19|42.4/57.6 %|
|İ Sesi|27|11|14/13|51.9/48.1 %|
|L Sesi|35|14|14/21|40.0/60.0 %|
|al el il in it|25|10|12/13|48.0/52.0 %|
|Ali ile Ela|23|9|13/10|56.5/43.5 %|
|Lili ile At|25|10|13/12|52.0/48.0 %|
|Oki El Ele|25|10|13/12|52.0/48.0 %|
|Mino Nerede?|22|9|13/9|59.1/40.9 %|
|Nana Anlatıyor|324|126|82/77/80/85|25.3/23.8/24.7/26.2 %|
|Kürk Mantolu Madonna|124|48|23/18/14/18/18/17/16|18.5/14.5/11.3/14.5/14.5/13.7/12.9 %|
|Çalıkuşu|86|34|17/15/13/15/12/14|19.8/17.4/15.1/17.4/14.0/16.3 %|
|Yüksek Ökçeler|53|21|19/17/17|35.8/32.1/32.1 %|
|Pembe İncili Kaftan|57|23|18/18/21|31.6/31.6/36.8 %|
|Mai ve Siyah|67|26|14/11/11/10/11/10|20.9/16.4/16.4/14.9/16.4/14.9 %|
|Diyet|49|19|16/16/17|32.7/32.7/34.7 %|
|Sessiz Saatler|1043|404|163/145/137/138/129/115/108/108|15.6/13.9/13.1/13.2/12.4/11.0/10.4/10.4 %|
|Keloğlan Masalları|70|28|24/25/21|34.3/35.7/30.0 %|
|La Fontaine'den Fabllar|69|27|22/22/25|31.9/31.9/36.2 %|
|Andersen Masalları|689|267|196/232/261|28.4/33.7/37.9 %|
|Ezop Masalları|277|108|96/94/87|34.7/33.9/31.4 %|
|Grimm Kardeşler Masalları|351|136|113/97/141|32.2/27.6/40.2 %|
|Aesop's Fables|98|38|33/37/28|33.7/37.8/28.6 %|
|The Tale of Peter Rabbit|972|377|180/356/436|18.5/36.6/44.9 %|
|The Ugly Duckling|95|37|35/27/33|36.8/28.4/34.7 %|
|The Fox and the Grapes|49|19|25/24|51.0/49.0 %|
|The Lion and the Mouse|45|18|21/24|46.7/53.3 %|
|Alice Finds the Rabbit Hole|52|21|28/24|53.8/46.2 %|
|The Selfish Giant|56|22|29/27|51.8/48.2 %|
|The Happy Prince and the Swallow|55|22|26/29|47.3/52.7 %|
|The Moon Is Not a Star|44|18|23/21|52.3/47.7 %|
|Oki Ay'ı Gördü|34|14|19/15|55.9/44.1 %|
|Yıldız mı, Gezegen mi?|37|15|20/17|54.1/45.9 %|
|Oki ve Ay Haritası|726|282|117/126/120/124/117/122|16.1/17.4/16.5/17.1/16.1/16.8 %|
|Japon Masalları|353|137|109/114/130|30.9/32.3/36.8 %|
|Çin Masalları|351|136|108/112/131|30.8/31.9/37.3 %|
|Oki ve Güneşin Hikâyesi|203|79|56/48/47/52|27.6/23.6/23.2/25.6 %|
|Lili Ay Işığını Takip Ediyor|38|15|20/18|52.6/47.4 %|
|Oki ve Pegasus|54|21|27/27|50.0/50.0 %|
|Oki ve Labirentin İzi|61|24|32/29|52.5/47.5 %|
|Prometheus’un Seçimi|57|23|30/27|52.6/47.4 %|
|Ikarus Bugün Ne Anlatır?|1774|687|218/216/216/216/229/229/215/235|12.3/12.2/12.2/12.2/12.9/12.9/12.1/13.2 %|
|Ariadne’nin İpi: Yol Bulmak|1800|697|289/274/298/293/295/351|16.1/15.2/16.6/16.3/16.4/19.5 %|
|Oki ve Lili Sahnesi|362|141|50/48/42/45/78/99|13.8/13.3/11.6/12.4/21.5/27.3 %|
|Toto Acele Etme Piyesi|512|199|54/48/45/46/55/64/54/146|10.5/9.4/8.8/9.0/10.7/12.5/10.5/28.5 %|
|Uzay Kulübü Sunumu|700|271|119/115/117/115/113/121|17.0/16.4/16.7/16.4/16.1/17.3 %|
|English Words: Hello|18|7|9/9|50.0/50.0 %|
|English Words: Sky|26|11|12/14|46.2/53.8 %|
|English Words: Colors|25|10|13/12|52.0/48.0 %|
|Toto Tak Tak Dedi|24|10|13/11|54.2/45.8 %|
|Nana’nın Ritim Oyunu|25|10|16/9|64.0/36.0 %|
|Oki Hop Hop|18|7|10/8|55.6/44.4 %|
|Oki’nin Ay Şiiri|26|11|12/14|46.2/53.8 %|
|Yağmur Tıp Tıp|23|9|12/11|52.2/47.8 %|
|Gökyüzü Şiiri|36|14|18/18|50.0/50.0 %|
|Ay Bilmecesi|20|8|12/8|60.0/40.0 %|
|Yıldız Bilmecesi|22|9|11/11|50.0/50.0 %|
|Tohum Bilmecesi|27|11|15/12|55.6/44.4 %|
|Bir Tohumun Yolculuğu|44|18|22/22|50.0/50.0 %|
|Arılar Neden Dans Eder?|43|17|25/18|58.1/41.9 %|
|Kutup Tilkisinin Yolculuğu|712|276|116/113/123/124/116/120|16.3/15.9/17.3/17.4/16.3/16.9 %|
|Mino Nerede? Sahnesi|364|141|45/37/37/44/54/67/80|12.4/10.2/10.2/12.1/14.8/18.4/22.0 %|
|Labirentte Üç Ses|702|272|113/111/123/108/121/126|16.1/15.8/17.5/15.4/17.2/17.9 %|
|Little Star Poem|30|12|15/15|50.0/50.0 %|
|Moon Poem|36|14|22/14|61.1/38.9 %|
|Space Poem|39|16|25/14|64.1/35.9 %|

## Öncelikler

1. #97'nin güncellenmiş metni ve inceleme formu için gerçek insan içerik kararı.
2. #106'da baselinenın yeni hataları gizlememesi, mikro süre denetimi ve gerçek yayın kapısı.
3. Hazır taslakları tekil içerik kimliğine göre uzlaştırıp kalan kısa kayıtları tamamlamak.

## Lili — tam taslak

### Halının Üstündeki Yol

Lili, akşam Nana ile salonda kitap bakıyordu. Oki de yanlarında, yumuşak bir minderde oturuyordu. Açık perdeden içeri soluk Ay ışığı süzülüyordu.

Işık, halının üzerinde uzun bir çizgi oluşturmuştu. Lili bunu küçük bir yola benzetti. Parmağıyla çizgiyi gösterip Oki’yi yanına çağırdı.

Oki bu yolun nereye gittiğini merak etti. Çizgi, alçak masanın hemen yanında bitiyordu. Masanın üstünde henüz açmadıkları mavi kitap duruyordu.

Nana onlara birlikte masala başlamayı teklif etti. Masaldaki yolu kendileri hayal edip çizebilirdi. Lili, önce mavi kitabı incelemek istedi.

### Kitaptaki Küçük Kayık

Nana mavi kitabı alıp ortaya yerleştirdi. İlk sayfada küçük bir kayık resmi vardı. Kayığın yanında ise boş bir kıyı görünüyordu.

Lili masaldaki yolun kıyıya vardığını hayal etti. Oki kayığın kimin olduğunu merakla sordu. Kitapta bu soruya verilmiş bir cevap yoktu.

Nana, bu kitabın yalnız resimlerden oluştuğunu anlattı. İsterlerse resimlere kendi masallarını birlikte ekleyebilirlerdi. Lili hemen kayıkta küçük bir tavşan düşündü.

Oki, tavşanın yanında bir çanta olmasını istedi. Çantada kıyıdaki arkadaşına götüreceği bir resim vardı. İkisi yeni sayfaya geçmeden önce halıya baktı.

### Yol Gözden Kaybolunca

Halının üstündeki parlak çizgi artık görünmüyordu. Lili, pencerenin önünden geçen bulutu fark etti. Masallarının yolu da kaybolmuş gibi hissetti.

Nana odadaki lambayı yakıp yanlarına tekrar oturdu. Lili masalı burada bitirmek istemediğini söyledi. Oki de tavşanın arkadaşına ulaşmasını bekliyordu.

Bir süre kitaptaki boş kıyıya birlikte baktılar. Sonra Lili kendi çizdiği yolu hatırladı. Yol görünmese de masallarına devam edebilirlerdi.

Nana masaya büyük bir kâğıt ve kalemler getirdi. Lili kâğıda kayıktan kıyıya uzanan yol çizdi. Oki yolun sonuna küçük bir ev ekledi.

Evin penceresinde tavşanın arkadaşı onları bekliyordu. Lili resimdeki kapıyı açık bırakmayı önerdi. Böylece misafir, arkadaşının evini kolayca bulabilirdi.

### Resmin Vardığı Ev

Masalda kayık kıyıya varınca tavşan karaya çıktı. Çantasındaki resmi iki eliyle özenle taşıdı. Arkadaşı kapıda onu görünce sevinçle el salladı.

Lili, verilen resmin içinde başka kayık çizdi. Oki o kayığa iki arkadaş yerleştirdi. Artık masalın sonunda birlikte geziye çıkacaklardı.

Nana, masalın adını kâğıdın arkasına kendisi yazdı. Sonra çizimi mavi kitabın yanına koydular. Lili yeni yolun kâğıtta durduğunu gördü.

Halının üstündeki ışığın geri gelmesini beklemedi. Tavşan resmini ulaştırmış, arkadaşıyla yeniden buluşmuştu. Lili kitabı kapatıp Nana’nın yanına yerleşti.

### Sözlük

- süzülmek: Yavaşça ve hafifçe ilerlemek.
- kıyı: Suyun karayla buluştuğu yer.
- kayık: Suda yol almak için kullanılan küçük tekne.
- misafir: Birini görmeye gelen kişi.
- hayal: Aklımızda canlandırdığımız görüntü veya düşünce.

İstersen anlat: Sen masaldaki kayığa ne koyardın?

