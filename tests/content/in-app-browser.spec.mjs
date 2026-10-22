import test from "node:test";
import assert from "node:assert/strict";
import { uygulamaIciTarayiciyiTespitEt, chromedaAcBaglantisi, uygulamaIciSesUyarisi } from "../../src/inAppBrowser.js";

const ORNEKLER = [
  ["Mozilla/5.0 (Linux; Android 14; Pixel 7 Build/UQ1A; wv) AppleWebKit/537.36 Chrome/124 Mobile Safari/537.36 Instagram 330.0.0.40.92 Android", "Instagram", true, false],
  ["Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Instagram 330.0.2.29.92", "Instagram", false, true],
  ["Mozilla/5.0 (Linux; Android 14; SM-S921B; wv) AppleWebKit/537.36 Chrome/124 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/460.0.0.48.109;]", "Facebook", true, false],
  ["Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 [FBAN/FBIOS;FBAV/460.0;]", "Facebook", false, true],
  ["Mozilla/5.0 (Linux; Android 14; wv) AppleWebKit/537.36 Chrome/124 Mobile Safari/537.36 [FB_IAB/MESSENGER;FBAV/450.0;]", "Messenger", true, false],
  ["Mozilla/5.0 (Linux; Android 14; wv) AppleWebKit/537.36 Chrome/124 Mobile Safari/537.36 musical_ly_2023405010 BytedanceWebview/d8a21c6", "TikTok", true, false],
  ["Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 TikTok 34.1.0", "TikTok", false, true],
  ["Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 [LinkedInApp]/9.29", "LinkedIn", false, true],
  ["Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Twitter for iPhone/10.40", "X", false, true],
  ["Mozilla/5.0 (Linux; Android 14; wv) AppleWebKit/537.36 Chrome/124 Mobile Safari/537.36 Line/14.3.1", "LINE", true, false],
  ["Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Snapchat/12.80.0.44", "Snapchat", false, true],
  ["Mozilla/5.0 (Linux; Android 14; Pixel 7 Build/UQ1A; wv) AppleWebKit/537.36 Version/4.0 Chrome/124 Mobile Safari/537.36", null, true, false],
];

test("uygulama içi tarayıcılar tanınır", () => {
  for (const [ua, app, android, ios] of ORNEKLER) {
    assert.deepEqual(uygulamaIciTarayiciyiTespitEt(ua), { inApp: true, app, android, ios }, ua);
  }
});

test("normal tarayıcılar uygulama içi sayılmaz", () => {
  for (const ua of [
    "Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 Chrome/124 Mobile Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 Version/17.4 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36 Edg/124",
    "",
    undefined,
  ]) {
    assert.equal(uygulamaIciTarayiciyiTespitEt(ua).inApp, false, String(ua));
    assert.equal(uygulamaIciSesUyarisi(ua, { host: "okurio.net" }), null);
  }
});

test("Chrome intent bağlantısı yol, sorgu ve geri dönüş adresini taşır", () => {
  const href = chromedaAcBaglantisi({ protocol: "https:", host: "okurio.net", pathname: "/kitap", search: "?utm_source=instagram", hash: "#b2" });
  assert.equal(href, `intent://okurio.net/kitap?utm_source=instagram#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent("https://okurio.net/kitap?utm_source=instagram#b2")};end`);
  assert.equal(chromedaAcBaglantisi(null), null);
});

test("uyarı metinleri platforma göre seçilir", () => {
  const android = uygulamaIciSesUyarisi(ORNEKLER[0][0], { protocol: "https:", host: "okurio.net", pathname: "/" });
  assert.match(android.metin, /^Instagram'ın içindeki tarayıcı sesli okumayı desteklemiyor\. Sesli okuma için Okurio'yu Chrome'da aç\./);
  assert.equal(android.eylem.etiket, "Chrome'da aç");
  assert.ok(android.eylem.href.startsWith("intent://okurio.net/#Intent;"));
  const ios = uygulamaIciSesUyarisi(ORNEKLER[1][0], { host: "okurio.net" });
  assert.match(ios.metin, /üç nokta menüsünden 'Tarayıcıda aç' seçeneğine dokun\./);
  assert.equal(ios.eylem, undefined);
  const genel = uygulamaIciSesUyarisi(ORNEKLER[11][0], { protocol: "https:", host: "okurio.net", pathname: "/" });
  assert.match(genel.metin, /^Bu uygulamanın içindeki tarayıcı/);
  for (const u of [android, ios, genel]) assert.doesNotMatch(u.metin, /[\u{1F300}-\u{1FAFF}☀-➿⋯]/u);
});
