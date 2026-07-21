# Okurio içerik çalışma grubu — haftalık durum ve v2.7.5 release kapsamı

Tarih: 2026-07-21

## Bu hafta ilerleyen gerçek içerik işleri

### 1. Odysseia 01 — Truva’dan Ayrılış
Durum: Hazır içerik paketi / insan onayı bekliyor.

Kapsam:
- Çocuk, genç ve yetişkin için üç ayrı Okurio anlatımı
- Yaşa uygun sözlük kartları
- Birlikte Düşünelim soruları
- Kelime tekrar planı
- Perseus ana metni ve Türkçe kaynak kaydı
- Katalog ve glossary adaptörü entegrasyonu

Release blokajı:
- lexiconExpertReviewStatus=pending-human-review
- literaryEditorReviewStatus=pending-human-review
- publicationGate=expert-signoff-required

v2.7.5 kararı:
- Kod ve içerik paketi release branch'ine doğrudan cherry-pick edilmez.
- Uzman onayı gelirse ayrı içerik PR'ı olarak merge edilir.
- Onay gelmeden production kataloğunda görünmez.

### 2. Oki ve Ay Haritası — uzun okuma revizyonu
Durum: Yapısal olarak hazırlanmış kalite taslağı / yayın dışı.

Kapsam:
- 756 kelime
- 5 bölüm
- NASA kaynak bağlantıları
- Yaş bandı kelime hedefleri
- Bölüm, cümle ve paragraf kalite kapıları
- contentQualityReview kaydı

Release blokajı:
- Anlatı yayı ve yaş uygunluğu insan kontrolü
- NASA olgularının editoryal doğruluğu
- Özgünlük/telif ve erişilebilirlik tonu
- releaseReady=false

v2.7.5 kararı:
- Kalite politikası ve test altyapısı release'e dahil edilebilir.
- Hikâye aktif kataloğa bağlanmaz.
- İnsan onayı olmadan kullanıcıya gösterilmez.

### 3. Beş hikâyelik okul/pilot kataloğu
Durum: Planlanmış ve içerik hattı tanımlanmış; tam onaylı üretim tamamlanmadı.

Öncelikli beşli:
1. OE-01 — Mino Neden Üzüldü?
2. OS-01 — Toto Bir An Durdu
3. OR-01 — Oki A Sesini Buluyor
4. OF-01 — Sessiz Ormandaki Ses
5. OP-01 — Oki Yanlış Anladı

Gerekli onaylar:
- Product Owner
- Accessibility
- Dyslexia
- ADHD
- Gerekli içeriklerde Social-Emotional review
- Kaynak/özgünlük ve telif kaydı
- TTS, aktif kelime vurgusu ve mobil okuyucu kabulü

v2.7.5 kararı:
- Release notlarına ve pilot hazırlık kapsamına eklenir.
- releaseReady=true olmayan hikâyeler aktif raflarda görünmez.

### 4. İçerik kalite ve katalog denetim hattı
Durum: Aktif geliştirme / bu release'e alınabilir altyapı.

Kapsam:
- Yaş bandı kelime hedefleri
- 3–8 bölüm kuralı
- Cümle/paragraf sınırları
- structuralValid ve releaseReady ayrımı
- İnsan onayı gerektiren contentQualityReview şeması
- Katalog denetim script'i
- Otomatik içerik testleri

v2.7.5 kararı:
- Kullanıcı içeriğini değiştirmeyen kalite altyapısı olarak release kapsamına alınabilir.
- Kalite denetiminde kırmızı çıkan mevcut katalog otomatik olarak production-ready sayılmaz.

### 5. İçerik üretim operasyonu
Durum: P0 yönetim aksiyonu açıldı; uygulama altyapısı henüz tamamlanmadı.

Planlanan teknik bileşenler:
- content/queue/
- content/review/
- scripts/create-content-package.mjs
- scripts/validate-content-package.mjs
- tests/content/content-package.spec.mjs
- drafted / reviewed / blocked / release-ready / merged durum raporu

v2.7.5 kararı:
- Operasyon planı release dokümantasyonuna eklenir.
- Bu bileşenler yazılıp test edilmeden tamamlanmış kabul edilmez.

## v2.7.5 release'e alınacak içerik kapsamı

### Dahil
- İçerik çalışma grubu haftalık durum kaydı
- İçerik kalite politikası ve release kapıları
- structuralValid / releaseReady ayrımı
- İçerik validator ve test altyapısı, CI kapıları yeşilse
- Hazırlanmakta olan Odysseia, Ay Haritası ve beşli pilot katalog için görünür durum ve blocker kaydı
- Sesli okumada aktif kelime görünürlüğü hotfix'i

### Dahil değil
- İnsan uzman onayı tamamlanmamış Odysseia hikâyelerinin production görünürlüğü
- releaseReady=false Oki ve Ay Haritası taslağının kataloğa bağlanması
- Onaysız beş pilot hikâyenin genel raflarda gösterilmesi
- Sağlık/teşhis etiketi içeren persona metadata'sı
- Sadece taslak olup owner veya blocker kaydı bulunmayan içerikler

## Release kapısı

Bir içerik ancak aşağıdaki koşulların tümünü sağlarsa bu release'te kullanıcıya açılır:
1. Yaş bandı ve okuma evresi tanımlı.
2. Hedef ve gerçek kelime sayısı doğrulanmış.
3. 3–8 bölüm yapısı tamam.
4. Sözlük ve düşünme sorusu ekli.
5. Kaynak, özgünlük ve telif kaydı mevcut.
6. Zorunlu insan review kayıtları approved.
7. releaseReady=true.
8. İçerik validator ve testleri yeşil.
9. TTS, aktif kelime vurgusu ve mobil okuyucu testi geçti.

## Haftalık yönetim görünümü

- Hazırlanan: Odysseia 01 üç seviye; Oki ve Ay Haritası uzun taslak
- Kalite kontrolünde: Odysseia sözlük/edebiyat review; Ay Haritası editoryal ve kaynak review
- Planlanan: Beş tam onaylı okul/pilot hikâyesi
- Altyapıda: Katalog kalite denetimi ve içerik üretim pipeline'ı
- Production-ready: Şu an insan onayı tamamlanmış yeni içerik kanıtlanmadı
