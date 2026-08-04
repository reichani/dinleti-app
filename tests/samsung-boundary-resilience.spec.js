import { test, expect } from "@playwright/test";

const OKUMA_YOLU = {
  secildi: true,
  yolId: "okuma_guveni_8_10",
  evreId: "paragraf",
  destekler: ["kelime_takibi", "genis_aralik", "yumusak_zemin"],
};

test("Samsung charIndex=0 tekrarları kelime takibini ilk kelimede kilitlemez", async ({ page }) => {
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

    let speaking = false;
    const engine = {
      paused: false,
      get speaking() { return speaking; },
      getVoices: () => [],
      addEventListener: () => {},
      removeEventListener: () => {},
      cancel: () => { speaking = false; },
      speak: (utterance) => {
        speaking = true;
        [100, 300, 500].forEach((delay) => {
          window.setTimeout(() => utterance.onboundary?.({ name: "word", charIndex: 0 }), delay);
        });
      },
    };

    Object.defineProperty(window, "SpeechSynthesisUtterance", { configurable: true, value: FakeUtterance });
    Object.defineProperty(window, "speechSynthesis", { configurable: true, value: engine });
  }, OKUMA_YOLU);

  await page.goto("/");
  await page.getByRole("button", { name: /Kendi metnini oku/i }).click();
  await page.getByLabel("Kendi metnim", { exact: true }).fill(
    "Yılın son gecesiymiş, kar lapa lapa yağıyormuş. Oki pencereye yaklaşmış ve sessizce dışarı bakmış."
  );
  await page.getByRole("button", { name: "Okuma moduna al", exact: true }).click();
  const player = page.locator("[data-mobile-stability]");
  await expect(player).toBeVisible();
  await player.getByRole("button", { name: "Oynat", exact: true }).click();

  await expect.poll(async () => player.locator("[data-okuma-metin]").evaluate((element) =>
    [...element.querySelectorAll("span")].findIndex((span) => span.dataset.aktif === "1")
  ), { timeout: 3000 }).toBeGreaterThan(0);
});
