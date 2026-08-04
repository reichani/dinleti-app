import { test, expect } from "@playwright/test";

const OKUMA_YOLU = {
  secildi: true,
  yolId: "okuma_guveni_8_10",
  evreId: "paragraf",
  destekler: ["kelime_takibi", "genis_aralik", "yumusak_zemin"],
};

test("Kendim Okuyorum TTS'yi durdurur ve donmuş kelime vurgusunu kaldırır", async ({ page }) => {
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
    window.__cancelCount = 0;
    const engine = {
      paused: false,
      get speaking() { return speaking; },
      getVoices: () => [],
      addEventListener: () => {},
      removeEventListener: () => {},
      cancel: () => {
        speaking = false;
        window.__cancelCount += 1;
      },
      speak: (utterance) => {
        speaking = true;
        window.setTimeout(() => utterance.onboundary?.({ name: "word", charIndex: 6 }), 100);
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
  await player.getByRole("button", { name: "Oynat", exact: true }).click();
  await expect(player.getByRole("button", { name: "Duraklat", exact: true })).toBeVisible();
  await expect.poll(() => player.locator("[data-okuma-metin] [data-aktif='1']").count()).toBe(1);

  await player.locator("[data-reader-settings-toggle]").click();
  await player.getByRole("button", { name: /Okuma modu:/ }).click();
  await player.getByRole("button", { name: "Kendim Okuyorum", exact: true }).click();

  await expect(player.getByRole("button", { name: "Oynat", exact: true })).toBeVisible();
  await expect(player.locator("[data-okuma-metin] [data-aktif='1']")).toHaveCount(0);
  await expect.poll(() => page.evaluate(() => window.__cancelCount)).toBeGreaterThan(0);
  await expect(player.locator("[data-kelime-yardimi='1']")).toBeVisible();
});
