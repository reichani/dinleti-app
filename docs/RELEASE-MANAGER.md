# Okurio Release Manager

Bu sistem, bir build'in başarılı olmasını release kararıyla karıştırmaz. Otomatik testler teknik kanıtı; Reyhan'ın Samsung S24+ kontrolü ve Release Manager kararı insan onayını oluşturur.

## Zorunlu akış

1. Pull request açılır ve `Okurio Regression and Build Checks` tamamlanır.
2. İçerik doğrulaması, içerik testleri, production build ve dört viewport Playwright matrisi yeşil olmalıdır.
3. P0 okuma değişiklikleri gerçek Samsung S24+ Chrome'da; ayrıca Samsung Internet'te kontrol edilir. AI gerçek cihaz doğrulaması yaptığını iddia etmez.
4. Release Manager PR kapsamını, risk sınıfını ve gerçek cihaz kanıtını onaylar.
5. PR `main` dalına alınır ve Cloudflare production build'i tamamlanır.
6. `Okurio Release Manager` workflow'u production commit SHA ile elle başlatılır. İki insan onayı da `true` olmalıdır.
7. Workflow production `/release.json` SHA'sını doğrular ve yalnız `https://dinleti-app.pages.dev` üzerinde kabul testlerini çalıştırır.
8. Kabul yeşil olmadan pilot/tester duyurusu yapılmaz.

## Repository ayarları

- `main` için doğrudan push kapatılmalı.
- `Okurio Regression and Build Checks` zorunlu status check olmalı.
- Dal güncel olmadan merge kapatılmalı.
- GitHub `production` environment oluşturulmalı ve Release Manager required reviewer olarak eklenmeli.
- İçerik değişikliklerinde Content Product Owner; P0 okuma değişikliklerinde erişilebilirlik ve ilgili deneyim onayları istenmeli.

Cloudflare şu anda `main` push'unda otomatik deploy ediyorsa bu sistem merge'i ve tester paylaşımını kapılar; deploy öncesi gerçek artifact promotion sağlamaz. Tam promotion için sonraki adım, Cloudflare otomatik production deploy'unu kapatıp kalite kapısında üretilen aynı `dist/` artifact'ını protected `production` environment arkasından Direct Upload ile göndermektir.

## Samsung S24+ kanıtı

- Aday commit SHA
- Cihaz modeli (`SM-S926*`), Android ve One UI sürümü
- Chrome sürümü; P0'da Samsung Internet sürümü
- Gerçek yazı boyutu ve ekran yakınlaştırma ayarı
- Portre ekran görüntüsü veya kısa video
- Metin + oynat düğmesinin aynı ekranda görünmesi
- Kendi Metnim paneli, okuyucu, ikincil kontroller, TTS, yenileme ve geri dönüş sonucu
