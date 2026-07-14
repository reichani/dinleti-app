# Okurio

Okurio, disleksi ve DEHB dahil farklı okuma ihtiyaçları için sesli ve takipli okuma deneyimi sunan React/Vite uygulamasıdır.

## Yerel çalışma

```bash
npm install
npm run dev
```

## Kalite kontrolü

```bash
npm run build
npm test
```

Pull request'ler `main` dalına alınmadan önce masaüstü ve mobil Playwright regresyon testleri ile production build kontrolünden geçer.

## Deployment standardı

- **Production:** Cloudflare Pages projesinin `main` dalına bağlı kalıcı URL'si.
- **Preview:** Pull request veya feature branch için üretilen geçici Cloudflare preview URL'si.
- Dış test grubuna yalnızca production URL gönderilir.
- Commit, branch veya rastgele preview URL'leri kullanıcılarla paylaşılmaz.
- Cloudflare Pages build komutu: `npm run build`
- Build output directory: `dist`
- Production branch: `main`

Kalıcı production adresi kesinleştiğinde Cloudflare Pages içindeki `Production deployment` alanından alınmalı ve proje ayarlarında tek kaynak olarak tutulmalıdır.

## Sürüm akışı

1. Feature branch açılır.
2. Pull request oluşturulur.
3. Build ve Playwright testleri geçer.
4. PR `main` dalına merge edilir.
5. Cloudflare Pages production deployment tamamlanır.
6. Production URL üzerinden açılış, onboarding, mobil okuma ve link kontrolleri yapılır.
