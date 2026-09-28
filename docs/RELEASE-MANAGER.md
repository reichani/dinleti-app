# Okurio Release Manager

Bu sistem, bir build'in başarılı olmasını yayın kabulüyle karıştırmaz. İçerik ajanı ile otomatik testler deploy adayını oluşturur; Product Owner'ın kalıcı production adresindeki uçtan uca deneyim kontrolü yayın kararını verir.

## Zorunlu akış

1. Pull request açılır ve `Okurio Regression and Build Checks` tamamlanır.
2. İçerik doğrulaması, içerik testleri, production build ve dört viewport Playwright matrisi yeşil olmalıdır.
3. İçerik ajanı anlatı, yaş, süreklilik, dil, factual risk, hak riski ve erişilebilirlik tonu kontrolünü exact commit'e bağlar. Çözülemeyen factual veya hak riski deploy'u bloklar.
4. PR `main` dalına alınır ve yalnız bir hikâye içeren Cloudflare production build'i tamamlanır.
5. Production `/release.json` değeri aday commit SHA ile eşleştirilir; otomatik production smoke ve responsive-reader testleri çalıştırılır.
6. Product Owner production'da hikâyeyi açma, mobil okunabilirlik, TTS, vurgu, duraklat/devam ettir, ilerleme koruma, yaş deneyimi ve genel deneyimi uçtan uca kontrol eder. AI bu insan kabulünü kendisi vermiş gibi kaydedemez.
7. `Okurio Release Manager` workflow'u production commit SHA, Product Owner adı, somut notları ve sekiz UX kanıtıyla elle başlatılır.
8. Workflow ancak aynı production SHA için tüm otomatik ve insan kabul kanıtları tamamlandığında yeşil olur. Bundan önce içerik `DEPLOYED_AWAITING_PO` durumundadır; pilot/tester duyurusu yapılmaz ve sıradaki hikâye deploy edilmez.
9. Red durumunda akış durur; düzeltme yapılır veya son kabul edilmiş production SHA'ya rollback uygulanır.

## Repository ayarları

- `main` için doğrudan push kapatılmalı.
- `Okurio Regression and Build Checks` zorunlu status check olmalı.
- Dal güncel olmadan merge kapatılmalı.
- GitHub `production` environment oluşturulmalı ve Product Owner required reviewer olarak eklenmeli.
- Agent content review ve zorunlu CI kontrolleri branch protection içinde exact SHA'ya bağlanmalı.

Cloudflare şu anda `main` push'unda otomatik deploy ediyorsa bu sistem yayın kabulünü ve sonraki hikâyeyi kapılar; deploy öncesi gerçek artifact promotion sağlamaz. Tam promotion için sonraki adım, Cloudflare otomatik production deploy'unu kapatıp kalite kapısında üretilen aynı `dist/` artifact'ını protected `production` environment arkasından Direct Upload ile göndermektir.

## Samsung S24+ kanıtı

- Aday commit SHA
- Cihaz modeli (`SM-S926*`), Android ve One UI sürümü
- Chrome sürümü; P0'da Samsung Internet sürümü
- Gerçek yazı boyutu ve ekran yakınlaştırma ayarı
- Portre ekran görüntüsü veya kısa video
- Metin + oynat düğmesinin aynı ekranda görünmesi
- Kendi Metnim paneli, okuyucu, ikincil kontroller, TTS, yenileme ve geri dönüş sonucu
