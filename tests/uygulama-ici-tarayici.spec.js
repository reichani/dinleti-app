import { test, expect } from "@playwright/test";

// Uygulama içi tarayıcı sözleşmesi:
//  - Instagram (Android) WebView'ında speechSynthesis yoksa genel uyarı yerine özel mesaj ve
//    "Chrome'da aç" intent bağlantısı gösterilir.
//  - Instagram (iOS) için programatik çıkış yok: üç nokta menüsü talimatı gösterilir.
//  - Normal tarayıcıda speechSynthesis yoksa eski genel mesaj korunur.
const BOOK_ID = "mino-nerede-sahnesi";
const READING_PATH = { secildi: true, yolId: "ilk_cumleler_7_8", evreId: "kisa_cumle", destekler: ["kelime_takibi", "odak"] };

const UA_INSTAGRAM_ANDROID = "Mozilla/5.0 (Linux; Android 14; Pixel 7 Build/UQ1A.240205.004; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/124.0.6367.82 Mobile Safari/537.36 Instagram 330.0.0.40.92 Android (34/14; 420dpi; 1080x2400; Google/google; Pixel 7; panther; panther; tr_TR; 598323397)";
const UA_INSTAGRAM_IOS = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 330.0.2.29.92 (iPhone14,5; iOS 17_4; tr_TR; tr; scale=3.00; 1170x2532; 598323397)";
const UA_CHROME = "Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36";

async function hazirla(page) {
  await page.addInitScript(({ readingPath, bookId }) => {
    try { delete window.speechSynthesis; } catch {}
    try { delete window.SpeechSynthesisUtterance; } catch {}
    if (sessionStorage.getItem("seeded")) return;
    sessionStorage.setItem("seeded", "1");
    localStorage.clear();
    localStorage.setItem("okurio-okuma-yolu-v1", JSON.stringify(readingPath));
    localStorage.setItem("dinleti-mod-v1", "cocuk");
    localStorage.setItem("dinleti-durum-v1", JSON.stringify({
      favoriler: [], hiz: 1, sonKitap: bookId,
      ilerlemeler: { [bookId]: { pos: 121, sectionIndex: 1, wordIndex: 0, storyId: bookId, ts: Date.now(), version: 2 } },
    }));
  }, { readingPath: READING_PATH, bookId: BOOK_ID });
}

async function oynatVeUyariyiAl(page, yol = "/") {
  await page.goto(yol);
  expect(await page.evaluate(() => "speechSynthesis" in window)).toBe(false);
  const resumeLabel = page.getByText("Kaldığın yerden devam et", { exact: true });
  await expect(resumeLabel).toBeVisible();
  await resumeLabel.locator("..").click();
  const player = page.locator("[data-mobile-stability]");
  await expect(player).toBeVisible();
  const uyari = player.locator('[data-ses-uyarisi="hata"]');
  if (!(await uyari.isVisible())) {
    await player.getByRole("button", { name: "Oynat" }).first().click();
  }
  await expect(uyari).toBeVisible();
  await expect(player).toHaveAttribute("data-playing", "0");
  return uyari;
}

test.describe("Instagram Android", () => {
  test.use({ userAgent: UA_INSTAGRAM_ANDROID });
  test("speechSynthesis yoksa özel mesaj ve Chrome'da aç bağlantısı gösterilir", async ({ page }) => {
    await hazirla(page);
    const uyari = await oynatVeUyariyiAl(page, "/?kaynak=instagram");
    await expect(uyari).toHaveAttribute("role", "alert");
    await expect(uyari).toContainText("Instagram'ın içindeki tarayıcı sesli okumayı desteklemiyor. Sesli okuma için Okurio'yu Chrome'da aç.");
    await expect(uyari).toContainText("Kendim Okuyorum");
    await expect(uyari).not.toContainText("Bu tarayıcı sesli okumayı desteklemiyor");
    const buton = uyari.getByRole("link", { name: "Okurio'yu Chrome'da aç" });
    await expect(buton).toBeVisible();
    await expect(buton).toHaveText("Chrome'da aç");
    const href = await buton.getAttribute("href");
    const { host, pathname } = new URL(page.url());
    expect(href.startsWith("intent://")).toBe(true);
    expect(href).toContain(`intent://${host}${pathname}?kaynak=instagram#Intent;`);
    expect(href).toContain("package=com.android.chrome");
    expect(href).toContain(`S.browser_fallback_url=${encodeURIComponent(page.url().split("#")[0])}`);
    expect(href.endsWith(";end")).toBe(true);
    await buton.focus();
    await expect(buton).toBeFocused();
    await uyari.getByRole("button", { name: "Ses uyarısını kapat" }).click();
    await expect(uyari).toHaveCount(0);
  });
});

test.describe("Instagram iOS", () => {
  test.use({ userAgent: UA_INSTAGRAM_IOS });
  test("speechSynthesis yoksa üç nokta menüsü talimatı gösterilir", async ({ page }) => {
    await hazirla(page);
    const uyari = await oynatVeUyariyiAl(page);
    await expect(uyari).toContainText("Instagram'ın içindeki tarayıcı sesli okumayı desteklemiyor.");
    await expect(uyari).toContainText("sağ üstteki üç nokta menüsünden 'Tarayıcıda aç' seçeneğine dokun.");
    await expect(uyari).toContainText("Kendim Okuyorum");
    await expect(uyari.locator("[data-ses-uyarisi-eylem]")).toHaveCount(0);
  });
});

test.describe("Normal Chrome", () => {
  test.use({ userAgent: UA_CHROME });
  test("speechSynthesis yoksa eski genel mesaj korunur", async ({ page }) => {
    await hazirla(page);
    const uyari = await oynatVeUyariyiAl(page);
    await expect(uyari).toContainText("Bu tarayıcı sesli okumayı desteklemiyor. Metni Kendim Okuyorum modunda okuyabilir ya da Chrome, Edge veya Safari ile açabilirsin.");
    await expect(uyari.locator("[data-ses-uyarisi-eylem]")).toHaveCount(0);
  });
});
