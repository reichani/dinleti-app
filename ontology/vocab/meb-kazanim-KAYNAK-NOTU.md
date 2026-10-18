# Kaynak Notu: MEB Türkçe Dersi Öğretim Programı, Okuma Öğrenme Çıktıları

Hazırlanma ve erişim tarihi: 2026-10-18. Çıktı dosyası: `/home/claude/meb-work/meb-kazanim.json`.

## Kullanılan belge

Türkiye Yüzyılı Maarif Modeli (TYMM) Türkçe Dersi Öğretim Programı kullanıldı. MEB bu programı şu anda tymm.meb.gov.tr üzerinde iki ayrı PDF olarak yayımlıyor: İlkokul (1, 2, 3 ve 4. sınıflar) ve Ortaokul (5, 6, 7 ve 8. sınıflar). İki PDF'nin kapağında da yıl 2026 yazıyor. Dosya adlarındaki tarih 2026-09-02. Bu belge, 2024'te yürürlüğe giren TYMM programının güncellenmiş baskısı. 2019 programı kullanılmadı ve verilerle karıştırılmadı. 2024'teki ilk tek-PDF baskı (1-8 birleşik) resmî sitede artık listelenmiyor. Bu yüzden 2024 baskısıyla 2026 baskısı arasındaki olası kod veya ifade farkları bu çalışmada kontrol edilemedi.

| Belge | URL | Sayfa |
| --- | --- | --- |
| İlkokul Türkçe Dersi Öğretim Programı (1-4) | https://tymm.meb.gov.tr/assets/pdf/ilkokul-turkce-dersi_20260902_111433_940.pdf | 223 |
| Ortaokul Türkçe Dersi Öğretim Programı (5-8) | https://tymm.meb.gov.tr/assets/pdf/ortaokul-turkce-dersi_20260902_111157_977.pdf | 247 |
| İlkokul ders sayfası | https://tymm.meb.gov.tr/ogretim-programlari/ders/ilkokul-turkce-dersi | |
| Ortaokul ders sayfası | https://tymm.meb.gov.tr/ogretim-programlari/ders/ortaokul-turkce-dersi | |

İkincil siteler veri kaynağı olarak kullanılmadı. Ortaokul tema sayfası (ör. https://tymm.meb.gov.tr/ortaokul-turkce-dersi/unite/54, güncelleme tarihi 27.08.2026) yalnızca kontrol için okundu. Bu sayfada öğrenme çıktısı başlıkları var, süreç bileşenleri yok.

## Kullanılan bölümler ve sayfa aralıkları

İlkokulda öğrenme çıktıları ve süreç bileşenleri "EK 1: Sınıf Düzeylerine Göre Öğrenme Çıktıları ve Süreç Bileşenleri" bölümünün OKUMA kısımlarından alındı (içindekilere göre s. 202-217). Tema bölümleri (s. 24-201) yalnızca tema eşlemesi ve karşılaştırma için kullanıldı. Metin özellikleri şu bölümlerden alındı: 1.2.1 İlk Okuma Yazma Öğretim Sürecinin Uygulanmasına İlişkin Esaslar (Şekil 1: harf grupları), 1.2.2 Türkçe Öğretim Sürecinin Uygulanmasına İlişkin Esaslar, Tablo 2 (Sınıf Düzeylerine Göre Kullanılabilecek Metin Türleri) ve Tablo 3 (tema adları), yaklaşık s. 7-21.

Ortaokulda öğrenme çıktısı ve süreç bileşeni metinleri Bölüm 2.1, 9. Tablo'dan (Öğrenme Çıktıları, Süreç Bileşenleri ve Açıklamalar) alındı. Bu bölüm basılı s. 31-56 arasında; okuma satırları yaklaşık s. 37-43'te. Hangi kodun hangi sınıfa ait olduğu Bölüm 2.2'deki tema listelerinden (s. 57-197) belirlendi. Metin özellikleri şu bölümlerden alındı: 1.2.2.2 Okuma Becerisi Uygulama Esasları (s. 7), 1.2.6 Okuma Atölyesi (s. 15), 1.2.8 Metin Yapılarının Temalara Göre Dağılımı (s. 18), 1.2.9 Metin Seçimine İlişkin Esaslar (s. 22), 1.2.10 ve 3. Tablo Metin Türleri (s. 23).

## Çıkarılanlar

Toplam 8 sınıf, 119 okuma öğrenme çıktısı ve 349 süreç bileşeni çıkarıldı. İlkokulda her sınıfta 5 okuma öğrenme çıktısı var (T.O.1.1-T.O.4.5). Süreç bileşeni sayıları sınıflara göre 19, 21, 29 ve 34. Ortaokulda öğrenme çıktısı sayıları 22 (5. sınıf), 25 (6.), 26 (7.) ve 26 (8.). Süreç bileşeni sayıları 49, 61, 68 ve 68. Kod biçimi kaynaktaki gibi korundu: T.O.<sınıf>.<sıra>. (sonda nokta ile).

## Doğrulama yöntemi

Bu ortamın komut satırı meb.gov.tr alan adına doğrudan erişemiyor (vekil sunucu 403 döndürdü). PDF'ler bu yüzden iki ayrı servisle metne çevrildi: Firecrawl PDF ayrıştırıcı ve Exa. İlkokul EK 1'deki 103 okuma süreç bileşeni iki çıkarımda birebir aynı çıktı. Ortaokul 9. Tablo'nun Firecrawl çıkarımında OCR bozulmaları vardı ("yönetim/yöntem", "Akcı" gibi). Bu yüzden metin Exa çıkarımından alındı. Sütun hizası ise iki çıkarım karşılaştırılarak belirlendi.

## Düzeltmeler ve kaynaktan ayrılan noktalar

Ortaokul tablosunda PDF satır bölünmesinden kalan boşluklar giderildi. Örnekler: "ipuç larını" yerine "ipuçlarını", "çalış ma" yerine "çalışma", "be lirler" yerine "belirler", "ya pabilme" yerine "yapabilme", "cüm leleriyle" yerine "cümleleriyle". Tabloda hücreye karışmış kodlar (T.O.8.22., T.O.8.25.) bileşen metninden çıkarıldı. Başka bir metin değişikliği yapılmadı. T.O.7.23 ve T.O.8.23'ün ç) bileşenindeki "bilgilden" sözcüğü iki çıkarımda da böyle geçiyor. Muhtemelen kaynaktaki bir yazım hatası, düzeltilmedi.

Süreç bileşenlerinin resmî kodu yok; programda yalnızca harfle (a, b, c, ç...) gösteriliyorlar. JSON'daki `altKodTuretilmis` alanı (ör. T.O.4.2.h)) tarafımızdan üretildi ve resmî kod sayılmamalı.

`beceri` ve `beceriEtiketleri` alanları Okurio ontolojisi için tarafımızdan verildi, MEB terimi değil. İlkokulda bileşen düzeyinde anahtar sözcük kurallarıyla atandı ve elle gözden geçirildi. Ortaokulda öğrenme çıktısı düzeyinde elle atandı.

## Emin olunamayan noktalar

9. Tablo çok sütunlu bir tablo ve sınıfa özgü açıklama hücreleri (`sinifDuzeyiAciklamasi`) iki çıkarımda farklı sütunlara düştü. Atamalar içerik mantığına ve iki çıkarımın karşılaştırmasına göre yapıldı. Şu hücrelerin PDF'ten gözle kontrol edilmesi önerilir. İkna teknikleri (T.O.7.19 / T.O.8.19): "Önceki sınıf seviyesinde işlenilen teknikleri..." cümlesi 8. sınıfa yerleştirildi. Okuduğunu değerlendirebilme (T.O.6.22-T.O.8.22): 6. sınıfa içerik, 7. sınıfa dil ve organizasyon, 8. sınıfa yazar atandı. Şiirin biçim özellikleri: 7 ve 8. sınıf açıklamaları iki çıkarımda da aynı metin ("ses tekrarları"), kaynakta da böyle görünüyor.

Ortaokulda "Akıcı okuyabilme" (T.O.5.2, T.O.6.2) için programda süreç bileşeni verilmemiş, yalnızca açıklama metni var. 7 ve 8. sınıfta bu öğrenme çıktısı yok.

Sayfa numaraları yaklaşık. İlkokulda değerler PDF sayfa sırasından hesaplandı ve içindekilerle ±1 sapma gösterebilir. Ortaokulda basılı sayfa aralığı verildi.

`temalar` eşlemesinde ilkokuldaki 3 bileşen boş kaldı. Bunun nedeni, bu bileşenlerin tema bölümündeki ifadesinin EK 1'dekinden küçük farklarla ayrılması.

## Eksik kalanlar

Programda sınıf düzeyine göre kelime sayısı veya metin uzunluğu önerisi bulunamadı. Bu nedenle `kelimeSayisiOnerisi` ve `metinUzunluguOnerisi` alanları null. Programda bunların yerine metin sayısı (tema başına 5 metin), tür dağılımı, kullanılabilecek metin türleri ve metin yapısı odakları var. Bunlar `metinOzellikleri` alanına eklendi.

İlkokul OKUMA alanında deyim veya atasözü içeren bir süreç bileşeni yok. Bunlar konuşma ve yazma alanında geçiyor: T.K.3.2.m, T.K.3.3.d, T.Y.3.3.c, T.K.4.2.o, T.K.4.2.ö, T.K.4.3.f, T.K.4.3.g, T.Y.4.3.c. Bu kodlar JSON'a kazanım olarak eklenmedi, yalnızca notlarda listelendi. Ortaokulda deyim, atasözü ve kalıp sözler T.O.5.20 kapsamında açıkça yer alıyor ve tema notlarıyla birlikte JSON'a eklendi.

Ortaokul Ek 1 "İşlev Temelli Dil Yapıları ve Söz Varlığı" (DYS.DO.* ve DYS.KY.* kodları, s. 198-202) alınmadı. Program bu yapıların ölçme-değerlendirmeye dâhil edilmeyeceğini söylüyor; ayrıca metin çıkarımında satır bölünmesi hataları fazlaydı. Söz varlığı eşlemesi için ileride ayrı bir dosya olarak çıkarılabilir.

Okuma dışındaki alanlar (Dinleme/İzleme T.D, Konuşma T.K, Yazma T.Y) kapsam dışında bırakıldı.
