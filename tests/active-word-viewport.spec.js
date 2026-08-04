import { test, expect } from "@playwright/test";

const OKUMA_YOLU = {
  secildi: true,
  yolId: "okuma_guveni_8_10",
  evreId: "paragraf",
  destekler: ["kelime_takibi", "buyuk_yazi", "genis_aralik", "yumusak_zemin"],
};

test("Birlikte Okuyorum aktif kelimeyi metin panelinin güvenli alanında tutar", async ({ page }) => {
  await page.addInitScript((okumaYolu) => {
    localStorage.clear();
    localStorage.setItem("okurio-okuma-yolu-v1", JSON.stringify(okumaYolu));

    class FakeUtterance {
      constructor(text) {
        this.text = text;
        this.onboundary = null;
        this.onend = null;
        this.onerror = null;
      }
    }

    const engine = {
      paused: false,
      speaking: false,
      getVoices: () => [],
      addEventListener: () => {},
      removeEventListener: () => {},
      cancel: () => {},
      speak: (utterance) => {
        const offsets = [];
        const pattern = /\S+/gu;
        let match;
        while ((match = pattern.exec(utterance.text))) offsets.push(match.index);
        offsets.forEach((charIndex, index) => {
          window.setTimeout(
            () => utterance.onboundary?.({ name: "word", charIndex }),
            45 * (index + 1),
          );
        });
      },
    };

    Object.defineProperty(window, "SpeechSynthesisUtterance", { configurable: true, value: FakeUtterance });
    Object.defineProperty(window, "speechSynthesis", { configurable: true, value: engine });
  }, OKUMA_YOLU);

  await page.goto("/");
  await page.getByRole("button", { name: /Kendi metnini oku/i }).click();
  const metin = Array.from(
    { length: 55 },
    (_, index) => `okunan kelime ${index + 1} sakin biçimde ilerler`,
  ).join(" ") + ".";
  await page.getByLabel("Kendi metnim", { exact: true }).fill(metin);
  await page.getByRole("button", { name: "Okuma moduna al", exact: true }).click();

  const player = page.locator("[data-mobile-stability]");
  const panel = player.locator("[data-okuma-metin]");
  await panel.evaluate((element) => {
    element.style.height = "220px";
    element.style.maxHeight = "220px";
  });

  await player.locator("[data-reader-settings-toggle]").click();
  await player.getByRole("button", { name: /Okuma modu:/ }).click();
  await player.getByRole("button", { name: "Birlikte Okuyorum", exact: true }).click();
  await player.getByRole("button", { name: "Oynat", exact: true }).click();

  await expect.poll(() => panel.evaluate((element) => element.scrollTop), { timeout: 8000 }).toBeGreaterThan(0);
  await expect.poll(() => panel.evaluate((element) => {
    const active = element.querySelector('[data-aktif="1"]');
    if (!active) return false;
    const panelRect = element.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    return activeRect.top >= panelRect.top + element.clientHeight * 0.20
      && activeRect.bottom <= panelRect.top + element.clientHeight * 0.72;
  }), { timeout: 8000 }).toBe(true);
});
