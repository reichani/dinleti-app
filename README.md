# Okurio

Okurio, disleksi ve DEHB ihtiyaçlarını dikkate alan sesli ve takipli okuma uygulamasıdır.

## Yerel çalışma

```bash
npm install
npm run dev
```

## Test ve production build

```bash
npm test
npm run build
```

Production çıktısı `dist/` klasöründe oluşur. CI aşağıdaki dosyalar eksikse deploy paketini reddeder:

- `dist/index.html`
- `dist/assets/`
- `dist/_redirects`
- `dist/_headers`

## Cloudflare Pages standardı

Cloudflare Pages projesi GitHub deposuna bağlı olmalıdır.

- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: boş bırakılır
- Node.js: 22

Test grubuna yalnızca production alan adı gönderilir. Commit veya branch'e özel preview adresleri geçicidir ve kullanıcı paylaşımında kullanılmaz.

### Link standardı

Tek bir kalıcı URL belirlenir ve tüm test mesajlarında aynı URL kullanılır. Önerilen yapı:

```text
https://app.okurio.com
```

Özel alan adı henüz bağlı değilse geçici production Pages adresi kullanılabilir:

```text
https://<cloudflare-pages-project>.pages.dev
```

`*.workers.dev`, branch preview veya rastgele deployment URL'leri test grubuna gönderilmez.

## Yayın kontrol listesi

1. Değişiklik PR üzerinden `main` dalına alınır.
2. GitHub Actions test ve build kontrolleri yeşil olmalıdır.
3. Cloudflare Pages production deployment tamamlanmalıdır.
4. Kalıcı URL Android telefonda gizli sekmede açılmalıdır.
5. Onboarding, kendi metnini açma, okuma görünümü, oynat/duraklat ve sayfa yenileme kontrol edilir.
6. Test grubuna sadece kalıcı production URL gönderilir.

## SPA yönlendirme ve güvenlik

`public/_redirects`, doğrudan açılan uygulama rotalarının `index.html` üzerinden çalışmasını sağlar. `public/_headers`, temel güvenlik ve asset cache kurallarını Cloudflare Pages çıktısına ekler.
