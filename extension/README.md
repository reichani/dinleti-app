# Okurio Okuma Katmanı — Chrome MVP 0.1

Bu klasör, Okurio'nun web sayfaları üzerinde çalışan ilk tarayıcı uzantısı prototipidir.

## MVP kapsamı

- Uzantıyı aç/kapat
- Sistem, Arial, Verdana ve Georgia yazı tipi seçenekleri
- Yazı boyutu, satır aralığı ve harf aralığı
- Kâğıt, krem, yumuşak ve koyu arka plan
- Fareyi izleyen okuma cetveli
- Reklam/yan alanları azaltan deneysel sadeleştirme
- Ayarları Chrome Sync Storage içinde saklama
- Ayarları sayfa yenilemeden uygulama

## Yerel kurulum

1. Chrome'da `chrome://extensions` adresini açın.
2. Sağ üstten **Geliştirici modu**nu etkinleştirin.
3. **Paketlenmemiş öğe yükle** seçeneğine basın.
4. Bu `extension` klasörünü seçin.
5. Bir haber veya uzun metin sayfasında Okurio simgesini açın.

## Pilot kabul kontrolleri

- Aç/kapat işlemi sayfayı yenilemeden çalışır.
- Font, yazı boyutu ve aralık değişiklikleri okunabilir metne uygulanır.
- Tema değişiminde metin/zemin kontrastı korunur.
- Okuma cetveli sayfa etkileşimini engellemez.
- Sadeleştirme kapatıldığında sayfa eski haline döner.
- Chrome iç sayfalarında hata kullanıcıya yansıtılmaz.
- Ayarlar yeni sekmede korunur.

## Bilinen sınırlar

- OpenDyslexic bu sürümde paketlenmemiştir. Lisans ve font dosyası dağıtım kararı tamamlandıktan sonra ayrı bir seçenek olarak eklenmelidir.
- Sadeleştirme genel CSS seçicileri kullanır; okul portalları ve haber siteleri için site bazlı doğrulama gerekir.
- PDF görüntüleyici, Google Docs canvas alanı ve kapalı iframe içerikleri bu sürümün dışında kalır.
- Türkçe kelime açıklaması, heceleme, sesli okuma ve öğretmen paneli sonraki fazdadır.

## Okul demosu için önerilen kullanım

Aynı haber veya okul metnini önce normal görünümde, sonra Okurio ile gösterin. Demo sırası: aç → krem tema → 20–22 px yazı → 1.8 satır aralığı → okuma cetveli → sadeleştirme.
