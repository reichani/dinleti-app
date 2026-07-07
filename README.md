# Dinleti - Cloudflare Pages Proje Paketi

Bu paket Vite + React ile hazırlanmıştır ve Cloudflare Pages'a doğrudan bağlanabilir.

## Cloudflare Pages ayarları

- Framework preset: Vite
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: boş bırakın veya repo kökünü seçin

## Lokal çalıştırma

```bash
npm install
npm run dev
```

## Yayına alma

1. Bu klasörü GitHub reposuna yükleyin.
2. Cloudflare Pages > Create a project > Connect to Git seçin.
3. Repo'yu seçin.
4. Ayarları yukarıdaki gibi girin.
5. Deploy'a basın.

## Notlar

- Uygulama tarayıcıda ilerleme, favoriler, okuma ayarları ve mod seçimini `localStorage` ile saklar.
- Web Speech API tarayıcı desteğine bağlıdır. Türkçe sesin bulunması kullanıcının cihazına/tarayıcısına göre değişebilir.
- İçerikler demo amaçlıdır. Ticari yayına geçmeden önce her metin ve seslendirme için telif kontrolü yapılmalıdır.
