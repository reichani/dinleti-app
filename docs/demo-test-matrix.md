# Okurio Demo Test Matrisi

## Otomatik test sınıfları

| Sınıf | Risk | Otomatik kabul kriteri |
|---|---|---|
| Mod/state transition | Modlar arasında yanlış ses ve yardım durumu | Dinliyorum → Birlikte → Kendim zinciri doğru metin, ses ve yardım kontrolü üretir |
| Ses-zaman senkronu | Ses kapalıyken metnin kendiliğinden akması | Gerçek TTS çalışmıyorsa scroll sayısı sıfırdır |
| Uzun süre/mutation | Uzun kullanımda duplicate timer veya scroll fırtınası | 120 güncellemede ses kapalıyken sıfır scroll; hızlı geçişte tek okuma kartı |
| Görsel/geometrik stabilite | Kartın zıplaması, kırpılması, yatay kayması | Kart ölçüsü modlar arasında sabit; scrollLeft=0; viewport dışına taşma yok |
| Erişilebilirlik/dokunma | Küçük veya etiketsiz kontroller | Temel butonlar erişilebilir ada ve en az 40px hedefe sahip |
| Oturum/reload | Yenilemede kullanıcı durumunun kaybolması | Storage köprüsü değerleri reload sonrasında korunur |
| Hata toparlanma | Depolama hatasında siyah ekran | localStorage yazma hatasına rağmen uygulama görünür kalır |
| İçerik sınırları | URL, e-posta, uzun token ve Türkçe karakter taşması | Uzun tokenlar işaretlenir, kartın scrollWidth değeri clientWidth'i aşmaz |
| Deployment smoke | Production refresh sonrası boş ekran | Ana rota 200 döner ve reload sonrasında root dolu kalır |

## CI cihaz matrisi

- Desktop Chrome
- Pixel 7 emülasyonu
- Samsung S24 ölçüsü: 384 × 824, Android 16 user-agent
- Küçük mobil: 360 × 740

## Otomasyonun kapsamadığı manuel demo kontrolleri

Aşağıdaki kontroller gerçek cihazda sürdürülmelidir; tarayıcı emülasyonu cihaz TTS motorunu birebir temsil etmez:

1. Samsung Türkçe TTS sesinin vurgulanan kelimeyle algısal senkronu.
2. Bluetooth kulaklık bağlama/çıkarma ve telefon görüşmesiyle ses kesintisi.
3. Ekran kilidi, uygulamaya geri dönüş ve Android güç tasarrufu davranışı.
4. Gerçek 4G bağlantısında ilk açılış ve cache yenilenmesi.
5. 10 dakikalık kesintisiz okuma sırasında ısınma, pil ve gözle görülür takılma.

## Demo çıkış kapısı

Demo paylaşımı için:

- GitHub Actions build ve testleri yeşil olmalı.
- Cloudflare production deployment `main` commit'i göstermeli.
- Samsung gerçek cihaz smoke testi tamamlanmalı.
- Kritik hata bulunursa demo linki paylaşılmamalı.
