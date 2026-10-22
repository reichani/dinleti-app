// Uygulama içi tarayıcı (in-app WebView) tespiti ve "tarayıcıda aç" yardımcıları.
// Instagram, Facebook, TikTok vb. bağlantıları kendi WebView'larında açar; Android WebView'da
// window.speechSynthesis yoktur, bu yüzden sesli okuma çalışmaz. Saf fonksiyonlar: DOM'a dokunmaz.

// Sıra önemli: Messenger, Facebook'tan önce; "ek" Türkçe tamlayan hâlidir.
const UYGULAMALAR = [
  { app: "Instagram", ek: "Instagram'ın", re: /Instagram/i },
  { app: "Messenger", ek: "Messenger'ın", re: /FB_IAB\/MESSENGER|FBAN\/Messenger|\bMessenger\b/i },
  { app: "Facebook", ek: "Facebook'un", re: /FBAN\/|FBAV\/|FB_IAB|FBIOS/i },
  { app: "TikTok", ek: "TikTok'un", re: /musical_ly|BytedanceWebview|TikTok/i },
  { app: "LinkedIn", ek: "LinkedIn'in", re: /LinkedInApp/i },
  { app: "X", ek: "X'in", re: /Twitter/i },
  { app: "LINE", ek: "LINE'ın", re: /\bLine\//i },
  { app: "Snapchat", ek: "Snapchat'in", re: /Snapchat/i },
];

export function uygulamaIciTarayiciyiTespitEt(ua) {
  const s = typeof ua === "string" ? ua : "";
  const android = /Android/i.test(s);
  const ios = /iPhone|iPad|iPod/i.test(s);
  const bulunan = UYGULAMALAR.find((u) => u.re.test(s));
  if (bulunan) return { inApp: true, app: bulunan.app, android, ios };
  // Android'in genel WebView işareti: "...; wv)" (ör. "Linux; Android 14; Pixel 7 Build/...; wv)").
  if (android && /;\s*wv\)/i.test(s)) return { inApp: true, app: null, android, ios };
  return { inApp: false, app: null, android, ios };
}

// Android'de Chrome'u açan intent bağlantısı; Chrome yoksa aynı adrese geri düşer.
export function chromedaAcBaglantisi(loc) {
  if (!loc || !loc.host) return null;
  const sema = String(loc.protocol || "https:").replace(/:$/, "") || "https";
  const yol = `${loc.pathname || "/"}${loc.search || ""}`;
  const geriDonus = encodeURIComponent(`${sema}://${loc.host}${yol}${loc.hash || ""}`);
  return `intent://${loc.host}${yol}#Intent;scheme=${sema};package=com.android.chrome;S.browser_fallback_url=${geriDonus};end`;
}

// Ses desteklenmediğinde gösterilecek uyarı. Uygulama içi tarayıcı değilse null döner (genel mesaj kullanılır).
export function uygulamaIciSesUyarisi(ua, loc) {
  const t = uygulamaIciTarayiciyiTespitEt(ua);
  if (!t.inApp) return null;
  const ek = UYGULAMALAR.find((u) => u.app === t.app)?.ek;
  const kaynak = ek ? `${ek} içindeki tarayıcı` : "Bu uygulamanın içindeki tarayıcı";
  if (t.android) {
    return {
      tur: "hata",
      metin: `${kaynak} sesli okumayı desteklemiyor. Sesli okuma için Okurio'yu Chrome'da aç. Metni Kendim Okuyorum modunda da okuyabilirsin.`,
      eylem: { href: chromedaAcBaglantisi(loc), etiket: "Chrome'da aç", ariaLabel: "Okurio'yu Chrome'da aç" },
    };
  }
  return {
    tur: "hata",
    metin: `${kaynak} sesli okumayı desteklemiyor. Sesli okuma için sağ üstteki üç nokta menüsünden 'Tarayıcıda aç' seçeneğine dokun. Metni Kendim Okuyorum modunda da okuyabilirsin.`,
  };
}
