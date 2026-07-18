## Değişiklik

- Amaç:
- Kullanıcı etkisi:
- Risk sınıfı: `P0 okuma / içerik / hotfix / diğer`

## Otomatik kalite kapısı

- [ ] `npm run validate:content`
- [ ] `npm run test:content`
- [ ] `npm run build`
- [ ] Desktop, Pixel 7, Samsung S24 ve küçük mobil Playwright matrisi
- [ ] `dist/release.json` aday commit SHA'sını içeriyor

## UX ve gerçek cihaz

- [ ] Metin ve oynat düğmesi aynı mobil ekranda erişilebilir
- [ ] İkincil kontroller yalnız istenince açılıyor
- [ ] Yatay taşma veya iç içe dikey kaydırma yok
- [ ] Gerçek Samsung S24+ Chrome kontrolü — Reyhan
- [ ] P0 okuma değişikliğinde Samsung Internet kontrolü — Reyhan
- [ ] Ekran görüntüsü/video aday SHA ile ilişkilendirildi

## Release Manager

- [ ] Release Manager kapsamı ve riskleri onayladı
- [ ] Production environment onayı alındı
- [ ] Yalnız `https://dinleti-app.pages.dev` üzerinde production kabulü geçti
- [ ] Tester paylaşımı production kabulünden sonra yapılacak

> İnsan deneyim ve erişilebilirlik onayları otomasyon tarafından işaretlenemez.
