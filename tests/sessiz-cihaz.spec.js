import { test, expect } from "@playwright/test";
import { installSpeechSynthesisMock } from "./fixtures/speech-synthesis.js";

// C3 "sessiz cihaz" sözleşmesi (W3C COGA iç denetimi, 21.10.2026; Engelsiz Bilişim jürisi
// uygulamayı Türkçe sesi olmayan kendi cihazında deneyebilir):
//  - Ses kullanılamıyorsa uyarı başlığı örtmez; metnin üstünde satır içi (role=status) durur.
//  - Uyarı metni gerçek nedeni söyler (tarayıcı desteği / Türkçe ses / internet).
//  - Uyarıda "Kendim Okuyorum'a geç" düğmesi vardır; mod hiçbir zaman kendiliğinden değişmez.
//  - Okur kapattığı uyarıyı aynı oturumda Oynat'a basınca yeniden görmez (kısa hatırlatma yeter).
//  - "Birlikte düşünelim" kartı kendiliğinden açılmaz; düğmeyle açılır.
//  - "Kaldığın yerden devam et" kartı klavyeyle açılır.
//  - Onboarding'de "Okuma yolumu başlat" kaydırmadan görünür ve içeriği örtmez.
const BOOK_ID = "mino-nerede-sahnesi";
const READING_PATH = { secildi: true, yolId: "ilk_cumleler_7_8", evreId: "kisa_cumle", destekler: ["kelime_takibi", "odak"] };

async function seed(page, { sectionIndex = 1, wordIndex = 0, pos = 121 } = {}) {
  await page.addInitScript(({ readingPath, bookId, sectionIndex, wordIndex, pos }) => {
    if (sessionStorage.getItem("seeded")) return;
    sessionStorage.setItem("seeded", "1");
    localStorage.clear();
    localStorage.setItem("okurio-okuma-yolu-v1", JSON.stringify(readingPath));
    localStorage.setItem("dinleti-mod-v1", "cocuk");
    localStorage.setItem("dinleti-durum-v1", JSON.stringify({
      favoriler: [], hiz: 1, sonKitap: bookId,
      ilerlemeler: { [bookId]: { pos, sectionIndex, wordIndex, storyId: bookId, ts: Date.now(), version: 2 } },
    }));
  }, { readingPath: READING_PATH, bookId: BOOK_ID, sectionIndex, wordIndex, pos });
}

function sesMotorunuKaldir(page) {
  return page.addInitScript(() => {
    Object.defineProperty(window, "speechSynthesis", { configurable: true, value: undefined });
    Object.defineProperty(window, "SpeechSynthesisUtterance", { configurable: true, value: undefined });
  });
}

// Ses listesi ve hata kodu verilebilen motor taklidi.
function sesSenaryosu(page, { voices, errorCode = null }) {
  return page.addInitScript(({ voices, errorCode }) => {
    let timer = null; let current = null; let index = 0;
    class MockUtterance { constructor(text) { this.text = text; this.voice = null; } }
    const stop = () => { if (timer) clearInterval(timer); timer = null; };
    window.SpeechSynthesisUtterance = MockUtterance;
    Object.defineProperty(window, "speechSynthesis", { configurable: true, value: {
      speak(u) {
        stop(); current = u; index = 0;
        if (errorCode) { setTimeout(() => u.onerror?.({ error: errorCode }), 30); return; }
        timer = setInterval(() => {
          if (!current) return;
          current.onboundary?.({ name: "word", charIndex: index, charLength: 1, elapsedTime: index * 50 });
          index += 1;
          if (index >= current.text.length) { stop(); current.onend?.(); }
        }, 50);
      },
      cancel() { stop(); current = null; },
      pause() {}, resume() {},
      getVoices() { return voices; },
      addEventListener() {}, removeEventListener() {},
      get paused() { return false; },
      get speaking() { return Boolean(current && timer); },
    }});
  }, { voices, errorCode });
}

async function devamKartiniAc(page) {
  await page.goto("/");
  const kart = page.locator("[data-devam-karti]");
  await expect(kart).toBeVisible();
  await kart.click();
  const player = page.locator("[data-mobile-stability]");
  await expect(player).toBeVisible();
  return player;
}

const kesisir = (a, b) => a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;

test.describe("C3 sessiz cihaz", () => {
  test("ses motoru yoksa uyarı başlığı örtmez, nedeni doğru söyler ve kapatılınca yeniden açılmaz", async ({ page }) => {
    await sesMotorunuKaldir(page);
    await seed(page);
    const player = await devamKartiniAc(page);
    const uyari = player.locator("[data-ses-uyarisi]");
    await expect(uyari).toBeVisible();
    await expect(uyari).toHaveAttribute("data-ses-nedeni", "destek-yok");
    await expect(uyari).toContainText("Bu tarayıcı sesli okumayı desteklemiyor");
    await expect(uyari).not.toContainText(/internet/i);
    // Kibar canlı bölge: okuru bölmez.
    await expect(player.locator("[data-ses-uyari-alani]")).toHaveAttribute("role", "status");
    await expect(player.locator('[role="alert"]')).toHaveCount(0);
    // Mod otomatik değişmez; yalnız önerilir.
    await expect(player).toHaveAttribute("data-okuma-modu-aktif", "dinliyorum");
    await expect(uyari.getByRole("button", { name: "Kendim Okuyorum'a geç" })).toBeVisible();

    // Başlığı ve üst çubuğu örtmez; metnin üstünde durur.
    const u = await uyari.boundingBox();
    const baslik = await player.locator("[data-kompakt-baslik]").boundingBox();
    const ust = await player.locator("[data-reader-topbar]").boundingBox();
    const metin = await player.locator("[data-okuma-metin]").boundingBox();
    expect(kesisir(u, baslik), `uyarı ${JSON.stringify(u)} başlık ${JSON.stringify(baslik)}`).toBe(false);
    expect(kesisir(u, ust), `uyarı ${JSON.stringify(u)} üst çubuk ${JSON.stringify(ust)}`).toBe(false);
    expect(u.y).toBeGreaterThanOrEqual(baslik.y + baslik.height - 1);
    expect(u.y + u.height).toBeLessThanOrEqual(metin.y + 1);
    // Gözetim: dar ekranda hata uyarısı kısa metinle en çok ~2 sıra (eski 121 px'ten düşük).
    if ((page.viewportSize()?.width ?? 1000) <= 430) expect(u.height, `uyarı yüksekliği ${u.height}`).toBeLessThanOrEqual(90);

    // Kapat → Oynat: tam uyarı geri gelmez, kısa hatırlatma çıkar.
    await uyari.getByRole("button", { name: "Ses uyarısını kapat" }).click();
    await expect(uyari).toHaveCount(0);
    await player.locator("[data-alt-kontrol]").getByRole("button", { name: "Oynat" }).click();
    await expect(player.locator("[data-ses-hatirlatma]")).toBeVisible();
    await expect(uyari).toHaveCount(0);
    await player.locator("[data-alt-kontrol]").getByRole("button", { name: "Oynat" }).click();
    await expect(uyari).toHaveCount(0);
  });

  test("\"Kendim Okuyorum'a geç\" tek dokunuşla modu değiştirir ve uyarıyı kapatır", async ({ page }) => {
    await sesMotorunuKaldir(page);
    await seed(page);
    const player = await devamKartiniAc(page);
    const uyari = player.locator("[data-ses-uyarisi]");
    await expect(uyari).toBeVisible();
    await uyari.getByRole("button", { name: "Kendim Okuyorum'a geç" }).click();
    await expect(player).toHaveAttribute("data-okuma-modu-aktif", "kendim");
    await expect(uyari).toHaveCount(0);
    await expect(player.locator("[data-ses-hatirlatma]")).toHaveCount(0);
  });

  test("Türkçe ses yoksa bunu söyler, modu değiştirmez", async ({ page }) => {
    await sesSenaryosu(page, { voices: [{ name: "English", lang: "en-US", localService: true }] });
    await seed(page);
    const player = await devamKartiniAc(page);
    const uyari = player.locator('[data-ses-uyarisi][data-ses-nedeni="turkce-ses-yok"]');
    await expect(uyari).toBeVisible();
    await expect(uyari).toContainText("Bu cihazda Türkçe ses bulunamadı");
    await expect(uyari).not.toContainText(/internet/i);
    await expect(uyari.getByRole("button", { name: "Kendim Okuyorum'a geç" })).toBeVisible();
    await expect(player).toHaveAttribute("data-okuma-modu-aktif", "dinliyorum");
  });

  test("bilgi uyarısı okuma sürerken birkaç saniye sonra tek satıra küçülür, düğmeler 44 px kalır", async ({ page }) => {
    await sesSenaryosu(page, { voices: [{ name: "English", lang: "en-US", localService: true }] });
    await seed(page);
    const player = await devamKartiniAc(page);
    const uyari = player.locator('[data-ses-uyarisi][data-ses-nedeni="turkce-ses-yok"]');
    await expect(uyari).toBeVisible();
    await expect(player).toHaveAttribute("data-playing", "1");
    await expect(uyari).toHaveAttribute("data-ses-uyarisi-kucuk", "1", { timeout: 10000 });
    await expect(uyari).toContainText("Türkçe ses yok");
    await expect(uyari).toHaveAttribute("title", /Bu cihazda Türkçe ses bulunamadı/);
    const kutu = await uyari.boundingBox();
    expect(kutu.height, `küçük uyarı ${JSON.stringify(kutu)}`).toBeLessThanOrEqual(56);
    const gec = uyari.getByRole("button", { name: "Kendim Okuyorum'a geç" });
    const kapat = uyari.getByRole("button", { name: "Ses uyarısını kapat" });
    for (const dugme of [gec, kapat]) {
      const b = await dugme.boundingBox();
      expect(b.height).toBeGreaterThanOrEqual(44);
      expect(b.x + b.width).toBeLessThanOrEqual(kutu.x + kutu.width + 1);
    }
    await expect(player).toHaveAttribute("data-okuma-modu-aktif", "dinliyorum");
    await gec.click();
    await expect(player).toHaveAttribute("data-okuma-modu-aktif", "kendim");
  });

  test("okur metne dokununca bilgi uyarısı hemen küçülür", async ({ page }) => {
    await sesSenaryosu(page, { voices: [{ name: "English", lang: "en-US", localService: true }] });
    await seed(page);
    const player = await devamKartiniAc(page);
    const uyari = player.locator('[data-ses-uyarisi][data-ses-nedeni="turkce-ses-yok"]');
    await expect(uyari).toBeVisible();
    await expect(uyari).not.toHaveAttribute("data-ses-uyarisi-kucuk", "1");
    await player.locator("[data-okuma-metin]").dispatchEvent("pointerdown");
    await expect(uyari).toHaveAttribute("data-ses-uyarisi-kucuk", "1", { timeout: 1500 });
  });

  test("hata uyarısı kendiliğinden küçülmez", async ({ page }) => {
    await sesMotorunuKaldir(page);
    await seed(page);
    const player = await devamKartiniAc(page);
    const uyari = player.locator("[data-ses-uyarisi]");
    await expect(uyari).toBeVisible();
    await player.locator("[data-okuma-metin]").dispatchEvent("pointerdown");
    await page.waitForTimeout(500);
    await expect(uyari).not.toHaveAttribute("data-ses-uyarisi-kucuk", "1");
    await expect(uyari).toContainText("Bu tarayıcı sesli okumayı desteklemiyor");
  });

  test("ses listesi boşken konuşma hata verirse internet değil ses eksikliği söylenir", async ({ page }) => {
    await sesSenaryosu(page, { voices: [], errorCode: "synthesis-failed" });
    await seed(page);
    const player = await devamKartiniAc(page);
    const uyari = player.locator("[data-ses-uyarisi]");
    await expect(uyari).toHaveAttribute("data-ses-nedeni", "ses-yok");
    await expect(uyari).toContainText("yüklü bir ses bulunamadı");
    await expect(uyari).not.toContainText(/internet/i);
    await expect(player).toHaveAttribute("data-playing", "0");
  });

  test("ağ hatasında çevrimiçi sesin alınamadığı söylenir", async ({ page }) => {
    await sesSenaryosu(page, { voices: [{ name: "Çevrimiçi Natural Türkçe", lang: "tr-TR", localService: false }], errorCode: "network" });
    await seed(page);
    const player = await devamKartiniAc(page);
    const uyari = player.locator("[data-ses-uyarisi]");
    await expect(uyari).toHaveAttribute("data-ses-nedeni", "internet");
    await expect(uyari).toContainText("Çevrimiçi ses alınamadı");
  });

  test("Birlikte düşünelim kartı kendiliğinden açılmaz, düğmeyle açılır ve kapanır", async ({ page }) => {
    await installSpeechSynthesisMock(page, "normal");
    await seed(page, { sectionIndex: 6, wordIndex: 9999, pos: 700 });
    const player = await devamKartiniAc(page);
    await expect(player).toHaveAttribute("data-okuma-bitti", "1", { timeout: 15000 });
    const kart = page.locator("[data-birlikte-dusunelim]");
    const davet = player.getByRole("button", { name: "Birlikte düşünelim" });
    await expect(davet).toBeVisible();
    // Biraz bekle: kart gecikmeli de açılmamalı.
    await page.waitForTimeout(600);
    await expect(kart).toHaveCount(0);
    await davet.click();
    await expect(kart).toBeVisible();
    await expect(kart).toBeFocused();
    await kart.getByRole("button", { name: "Metne dön" }).click();
    await expect(kart).toHaveCount(0);
    await expect(davet).toBeFocused();
  });

  test("Kaldığın yerden devam et kartı klavyeyle açılır ve odak halkası görünür", async ({ page }) => {
    await installSpeechSynthesisMock(page, "normal");
    await seed(page);
    await page.goto("/");
    const kart = page.locator("[data-devam-karti]");
    await expect(kart).toBeVisible();
    await expect(kart).toHaveAttribute("role", "button");
    await expect(kart).toHaveAttribute("tabindex", "0");
    // Klavye kipinde odağa gel (Shift+Tab, Tab) ve halkayı denetle.
    await kart.focus();
    await page.keyboard.press("Shift+Tab");
    await page.keyboard.press("Tab");
    await expect(kart).toBeFocused();
    const halka = await kart.evaluate((el) => {
      const s = getComputedStyle(el);
      return { stil: s.outlineStyle, kalinlik: parseFloat(s.outlineWidth) };
    });
    expect(halka.stil).toBe("solid");
    expect(halka.kalinlik).toBeGreaterThanOrEqual(2);
    await page.keyboard.press("Enter");
    await expect(page.locator("[data-mobile-stability]")).toBeVisible();
  });

  test("Space tuşu da devam kartını açar", async ({ page }) => {
    await installSpeechSynthesisMock(page, "normal");
    await seed(page);
    await page.goto("/");
    const kart = page.locator("[data-devam-karti]");
    await kart.focus();
    await page.keyboard.press(" ");
    await expect(page.locator("[data-mobile-stability]")).toBeVisible();
  });

  test("Okuma yolumu başlat kaydırmadan görünür ve sayfa sonunda içeriği örtmez", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("[data-onboarding-page]")).toBeVisible();
    const dugme = page.getByRole("button", { name: /Okuma yolumu başlat/i });
    await expect(dugme).toBeVisible();
    const viewport = page.viewportSize();
    const kutu = await dugme.boundingBox();
    expect(kutu.y).toBeGreaterThanOrEqual(0);
    expect(kutu.y + kutu.height, `düğme ${JSON.stringify(kutu)} görünür alan ${JSON.stringify(viewport)}`).toBeLessThanOrEqual(viewport.height);
    // Sayfa sonuna kaydırınca profil önizlemesi yapışkan alanın altında kalmaz.
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    const onizleme = await page.getByText("Profil önizlemesi", { exact: true }).locator("..").boundingBox();
    const alan = await page.locator("[data-onboarding-baslat]").boundingBox();
    expect(onizleme.y + onizleme.height).toBeLessThanOrEqual(alan.y + 1);
    const sonKutu = await dugme.boundingBox();
    expect(sonKutu.y + sonKutu.height).toBeLessThanOrEqual(viewport.height);
    await dugme.click();
    await expect(page.locator("[data-onboarding-page]")).toHaveCount(0);
  });
});
