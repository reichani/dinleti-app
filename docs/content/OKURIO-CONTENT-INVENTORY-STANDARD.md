# Okurio İçerik Kütüphanesi Envanter Standardı

## Amaç

Bütün içerikleri tek envanterde görünür kılmak; hikâyeleri yalnız yaş etiketine göre değil, gerçek kelime adedi ve anlatı karmaşıklığına göre sınıflandırmak; okuma yolu ilerledikçe metinleri ölçülü biçimde zenginleştirmek.

## Zorunlu envanter alanları

Her içerik için aşağıdaki alanlar tutulur:

- İçerik kimliği ve başlık
- Dil
- Yaş rehberi
- Okuma seviyesi (L0-L5)
- Gerçek kelime adedi
- Tahmini okuma/dinleme süresi
- Bölüm ve cümle sayısı
- Ortalama ve en uzun cümle uzunluğu
- Yeni/zor kelime sayısı ve oranı
- Sözlük kartı sayısı
- Anlatı yapısı kontrolü
- İçerik türü: mikro alıştırma, tam hikâye, bilgilendirici metin
- Kaynak, hak durumu ve sürüm
- Editoryal, pedagojik ve dil kontrol durumu
- Yayına uygunluk ve engelleyici nedenler

## Kelime adedine dayalı seviyeler

| Seviye | Kelime adedi | Ana anlatı hedefi |
|---|---:|---|
| L0 | 0-120 | Ses, hece, kelime ve tek olaylı mikro içerik |
| L1 | 121-300 | Tek karakter, tek sorun, açık başlangıç-gelişme-sonuç |
| L2 | 301-600 | İki-üç sahne, neden-sonuç, sınırlı betimleme |
| L3 | 601-1000 | Yan karakter, duygu, ortam ve küçük sürpriz |
| L4 | 1001-1700 | Karakter motivasyonu, mecaz, çıkarım ve çoklu sahne |
| L5 | 1701+ | Tema, alt metin, bakış açısı ve geniş söz varlığı |

Yaş yalnızca rehberdir. Kullanıcının okuma yolu, tamamladığı içerikler ve anlama deneyimi esas alınır.

## Zenginleşen okuma yolu

Bir sonraki seviyeye geçişte yalnız metin uzamaz. Aşağıdaki boyutlar kademeli olarak artırılır:

1. Kelime adedi
2. Ortalama cümle uzunluğu
3. Sahne sayısı
4. Karakter sayısı ve motivasyon derinliği
5. Neden-sonuç ve çıkarım ihtiyacı
6. Betimleme ve duygu dili
7. Yeni kelime oranı
8. Sözlük desteğinin açıklama derinliği

Aynı anda en fazla iki boyut belirgin biçimde zorlaştırılır. Böylece kullanıcı hem ilerleme hisseder hem de ani bilişsel yük yaşamaz.

## Seviye geçiş kuralı

- Bir seviyede en az üç tam içerik tamamlanır.
- Son üç içeriğin en az ikisinde kullanıcı içeriği yarıda bırakmaz.
- Yardım ve sözlük kullanımı başarısızlık sayılmaz.
- Kullanıcı dilerse önceki seviyeye dönebilir.
- Sistem tanı koymaz; yalnız okuma deneyimini kişiselleştirir.

## Sözlük standardı

Okurio sözlüğü, TDK Güncel Türkçe Sözlük ile editoryal paralellik gözetir; ancak TDK veri tabanı kopyalanmaz.

Her sözlük girdisi:

- madde başı yazımı,
- sözcük türü,
- temel anlam eşleşmesi,
- yaşa uygun özgün açıklama,
- hikâyeden özgün örnek cümle,
- TDK kontrol tarihi ve kontrol durumu

alanlarını taşır.

Aynı sözcük için çocuk, genç ve yetişkin açıklamaları ayrı tutulur. Okurio açıklaması kısa, doğrudan ve bağlama uygun olmalıdır. Deyim, mecaz ve çok anlamlı sözcüklerde yalnız hikâyede kullanılan anlam gösterilir.

## Ekip çalışma sırası

1. Mevcut katalog otomatik kelime sayımından geçirilir.
2. Her içerik L0-L5 seviyesine atanır.
3. 120 saniyenin altında kalan normal hikâyeler tamamlanır veya mikro alıştırmaya ayrılır.
4. Her seviyedeki içerik sayısı ve konu dağılımı çıkarılır.
5. Eksik seviyeler için üretim backlog'u oluşturulur.
6. Zor sözcükler sözlük envanterine bağlanır.
7. Editoryal ve TDK paralellik kontrolü tamamlanır.
8. Test ve yayın kapısı yeşil olmadan içerik tamamlanmış sayılmaz.
