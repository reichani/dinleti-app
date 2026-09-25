import { test, expect } from "@playwright/test";

// Regresyon: TamOynatici App içinde tanımlı bir bileşen olduğu için <TamOynatici />
// her kelime güncellemesinde yeniden mount ediliyordu. Metin kutusunun scrollTop'u
// 0'a dönüyor, aktif kelime ilk ekranın dışına çıktığında vurgu görünmez oluyor ve
// görünüm yukarı-aşağı sıçrıyordu (2026-09-25 ekran kaydı, Uzay Kulübü 2/6).

const OKUMA_YOLU = { secildi: true, yolId: "okuma_guveni_8_10", evreId: "paragraf", destekler: ["kelime_takibi", "genis_aralik", "yumusak_zemin"] };
const CUMLE = "Güneş kendi ışığını ve enerjisini üretiyordu.";
const METIN = Array.from({ length: 24 }, (_, i) => `${i + 1}. ${CUMLE}`).join(" ");

test.use({ viewport: { width: 390, height: 780 }, hasTouch: true, isMobile: true });

test("okuyucu metin kutusu okuma sırasında yeniden mount edilmez ve aktif kelime görünür kalır", async ({ page }) => {
  await page.addInitScript((okumaYolu) => {
    localStorage.clear();
    localStorage.setItem("okurio-okuma-yolu-v1", JSON.stringify(okumaYolu));
    class FakeUtterance { constructor(text) { this.text = text; } }
    let speaking = false;
    const engine = {
      paused: false,
      get speaking() { return speaking; },
      getVoices: () => [], addEventListener: () => {}, removeEventListener: () => {},
      cancel: () => { speaking = false; },
      speak: (u) => {
        speaking = true;
        setTimeout(() => u.onstart?.(), 10);
        const starts = []; const re = /\S+/g; let m;
        while ((m = re.exec(u.text))) starts.push(m.index);
        starts.forEach((ci, k) => setTimeout(() => u.onboundary?.({ name: "word", charIndex: ci, elapsedTime: k * 0.06 }), 20 + k * 60));
        setTimeout(() => u.onend?.(), 40 + starts.length * 60);
      },
    };
    Object.defineProperty(window, "SpeechSynthesisUtterance", { configurable: true, value: FakeUtterance });
    Object.defineProperty(window, "speechSynthesis", { configurable: true, value: engine });
  }, OKUMA_YOLU);

  await page.goto("/");
  await page.getByRole("button", { name: /Kendi metnini oku/i }).click();
  await page.getByLabel("Kendi metnim", { exact: true }).fill(METIN);
  await page.getByRole("button", { name: "Okuma moduna al", exact: true }).click();
  const player = page.locator("[data-mobile-stability]");
  await expect(player).toBeVisible();

  await player.locator("[data-okuma-metin]").evaluate((el) => { el.__okurioMarker = true; });
  await player.getByRole("button", { name: "Oynat", exact: true }).click();

  // İlk ekranın dışına çıkacak kadar ilerlemesini bekle.
  await expect.poll(async () => player.locator("[data-okuma-metin]").evaluate((el) =>
    Number(el.querySelector('[data-aktif="1"]')?.dataset.kelimeIx ?? -1)), { timeout: 20000 }).toBeGreaterThan(70);

  const sonuc = await player.locator("[data-okuma-metin]").evaluate((el) => {
    const w = el.querySelector('[data-aktif="1"]');
    const c = el.getBoundingClientRect(); const r = w.getBoundingClientRect();
    return { ayniDugum: el.__okurioMarker === true, scrollTop: el.scrollTop, gorunur: r.top >= c.top - 1 && r.bottom <= c.bottom + 1 };
  });
  expect(sonuc.ayniDugum).toBe(true);
  expect(sonuc.scrollTop).toBeGreaterThan(0);
  expect(sonuc.gorunur).toBe(true);
});
