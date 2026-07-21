import { test, expect } from "@playwright/test";

const TEST_OKUMA_YOLU = {
  secildi: true,
  yolId: "okuma_guveni_8_10",
  evreId: "paragraf",
  destekler: ["kelime_takibi", "odak", "genis_aralik", "yumusak_zemin", "kisa_hedef"],
};

async function uygulamayiHazirla(page) {
  await page.addInitScript((okumaYolu) => {
    localStorage.clear();
    localStorage.setItem("okurio-okuma-yolu-v1", JSON.stringify(okumaYolu));
    localStorage.setItem("dinleti:okurio-okuma-yolu-v1", JSON.stringify(okumaYolu));
    localStorage.setItem("dinleti:dinleti-mod-v1", "cocuk");
  }, TEST_OKUMA_YOLU);
  await page.goto("/");
  await expect(page.locator("[data-kendi-metnim]")).toBeVisible();
}

async function kendiMetniniAc(page, text) {
  await uygulamayiHazirla(page);
  await page.getByRole("button", { name: /Kendi metnini oku/i }).click();
  const input = page.getByLabel("Kendi metnim", { exact: true });
  await input.fill(text);
  await page.getByRole("button", { name: "Okuma moduna al", exact: true }).click();
  await expect(page.locator("[data-mobile-stability]")).toBeVisible();
  await page.waitForFunction(() => Boolean(window.__okurioReadingFixes));
}

async function ayarlariAc(page) {
  const player = page.locator("[data-mobile-stability]");
  const panel = player.locator("[data-reader-settings]");
  if (!(await panel.isVisible())) {
    await player.locator("[data-reader-settings-toggle]").click();
    await expect(panel).toBeVisible();
  }
  return panel;
}

async function ayarlariKapat(page) {
  const player = page.locator("[data-mobile-stability]");
  const panel = player.locator("[data-reader-settings]");
  if (await panel.isVisible()) {
    await panel.locator("[data-reader-settings-close]").click();
    await expect(panel).toBeHidden();
  }
}

const personaMetni = Array.from(
  { length: 18 },
  (_, i) => `Cümle ${i + 1} sakin biçimde okunur ve çocuk bir sonraki satıra hazırlanır.`
).join(" ");

test.describe("Persona bazlı okuma akışı", () => {
  test("tek saat sözleşmesi: manuel mod ilerlemez, birlikte okuma geçişi aynı kelimede takılmaz", async ({ page }) => {
    await page.addInitScript(() => {
      class FakeUtterance {
        constructor(text) { this.text = text; }
      }
      const spoken = [];
      Object.defineProperty(window, "SpeechSynthesisUtterance", { configurable: true, value: FakeUtterance });
      Object.defineProperty(window, "speechSynthesis", {
        configurable: true,
        value: {
          speaking: true,
          paused: false,
          cancel() {},
          getVoices() { return []; },
          addEventListener() {},
          removeEventListener() {},
          speak(utterance) {
            spoken.push(utterance.text);
            window.setTimeout(() => utterance.onboundary?.({ name: "word", charIndex: 0 }), 40);
            window.setTimeout(() => utterance.onboundary?.({ name: "word", charIndex: 7 }), 120);
            window.setTimeout(() => utterance.onboundary?.({ name: "word", charIndex: 13 }), 200);
          },
        },
      });
      window.__okurioSpoken = spoken;
    });

    await kendiMetniniAc(page, personaMetni);
    const player = page.locator("[data-mobile-stability]");
    await ayarlariAc(page);
    await player.locator("[data-okuma-modu-kompakt] button").click();
    await player.locator('[data-okuma-modu="kendim"]').click();
    await ayarlariKapat(page);
    await player.getByRole("button", { name: "Oynat", exact: true }).click();
    await page.waitForTimeout(500);

    const manual = await player.locator("[data-okuma-metin]").evaluate((element) => ({
      activeIndex: [...element.querySelectorAll("span")].findIndex((span) => span.dataset.aktif === "1"),
      spoken: window.__okurioSpoken.length,
    }));
    expect(manual.activeIndex).toBe(0);
    expect(manual.spoken).toBe(0);

    await ayarlariAc(page);
    await player.locator("[data-okuma-modu-kompakt] button").click();
    await player.locator('[data-okuma-modu="birlikte"]').click();
    await ayarlariKapat(page);
    await page.waitForTimeout(500);
    const together = await player.locator("[data-okuma-metin]").evaluate((element) => ({
      activeIndex: [...element.querySelectorAll("span")].findIndex((span) => span.dataset.aktif === "1"),
      spoken: window.__okurioSpoken.length,
    }));
    expect(together.spoken).toBeGreaterThan(0);
    expect(together.activeIndex).toBeGreaterThan(0);
  });

  test("okul öncesi dinleyici: otomatik kaydırma sık ve büyük adımlar atmaz", async ({ page }) => {
    await page.goto("/");
    await page.waitForFunction(() => Boolean(window.__okurioReadingFixes));

    const result = await page.evaluate(() => {
      Object.defineProperty(window, "speechSynthesis", {
        configurable: true,
        value: { speaking: true, paused: false },
      });

      const card = document.createElement("div");
      card.dataset.okumaMetin = "1";
      Object.assign(card.style, {
        height: "160px",
        width: "320px",
        overflow: "auto",
        fontSize: "20px",
        lineHeight: "40px",
      });
      card.innerHTML = `<div style="height:500px"></div><span data-aktif="1">aktif kelime</span>`;
      document.body.appendChild(card);

      Object.defineProperty(card, "clientHeight", { configurable: true, value: 160 });
      Object.defineProperty(card, "scrollHeight", { configurable: true, value: 600 });
      card.scrollTop = 0;
      let calls = 0;
      let lastOptions = null;
      card.scrollTo = (options) => {
        calls += 1;
        lastOptions = options;
        card.scrollTop = options.top;
      };

      const active = card.querySelector("[data-aktif='1']");
      active.getBoundingClientRect = () => ({ top: 300, bottom: 340, left: 0, right: 100, width: 100, height: 40 });
      card.getBoundingClientRect = () => ({ top: 0, bottom: 160, left: 0, right: 320, width: 320, height: 160 });

      window.__okurioReadingFixes.scrollActiveWord(active, { now: 5000 });
      window.__okurioReadingFixes.scrollActiveWord(active, { now: 5600 });
      const config = window.__okurioReadingFixes.config;
      card.remove();
      return { calls, lastOptions, config };
    });

    expect(result.calls).toBe(1);
    expect(result.lastOptions.left).toBe(0);
    expect(result.lastOptions.top).toBeLessThanOrEqual(50);
    expect(result.config.minScrollIntervalMs).toBeGreaterThanOrEqual(1200);
    expect(result.config.comfortBottomRatio).toBeGreaterThanOrEqual(0.8);
  });

  test("dikkat desteği: kullanıcı seçince odak görünümü açık ve biyonik vurgu kapalı kalır", async ({ page }) => {
    await kendiMetniniAc(page, personaMetni);
    const player = page.locator("[data-mobile-stability]");
    const panel = await ayarlariAc(page);
    await panel.getByRole("button", { name: "Dikkat desteği", exact: true }).click();

    await expect(player.getByText(/Odak modu:\s*cümle/i)).toBeVisible();
    await expect(panel.getByRole("button", { name: "Biyonik vurgu, deneysel" })).toHaveAttribute("aria-pressed", "false");
    const readingText = player.locator("[data-okuma-metin]");
    await expect(readingText).toContainText("Cümle 1");
    await expect(readingText).not.toContainText("Cümle 9");
    await expect(player).toHaveAttribute("data-persona-flow", "calm");
  });

  test("bağımsız okuyucu: Kendim Okuyorum modunda bütün bölüm ve parmakla kaydırma korunur", async ({ page }) => {
    await kendiMetniniAc(page, personaMetni);
    const player = page.locator("[data-mobile-stability]");

    const panel = await ayarlariAc(page);
    await panel.getByRole("button", { name: "Dikkat desteği", exact: true }).click();
    await panel.getByRole("button", { name: "Odak modu", exact: true }).click();
    await player.locator("[data-okuma-modu-kompakt] button").click();
    await player.locator('[data-okuma-modu="kendim"]').click();

    const readingText = player.locator("[data-okuma-metin]");
    await expect(readingText).toContainText("Cümle 1");
    await expect(readingText).toContainText("Cümle 9");
    await expect(readingText).toHaveAttribute("data-kullanici-kaydirma", "1");

    const behavior = await readingText.evaluate((element) => {
      const style = window.getComputedStyle(element);
      return {
        overflowY: style.overflowY,
        touchAction: style.touchAction,
        textLength: element.textContent.trim().length,
      };
    });
    expect(behavior.overflowY).toBe("auto");
    expect(behavior.touchAction).toContain("pan-y");
    expect(behavior.textLength).toBeGreaterThan(500);
    await expect(player.getByRole("button", { name: /Ses: Kapalı/i })).toBeVisible();
  });

  test("disleksi personası: geniş aralıkta uzun bağlantı taşmaz", async ({ page }) => {
    const longToken = "https://okurio.example.com/cok-uzun-bosluksuz-baglanti-1234567890";
    await kendiMetniniAc(page, `Oki bağlantıyı sakin okur. ${longToken} Son cümle de görünür kalır.`);
    const player = page.locator("[data-mobile-stability]");
    const panel = await ayarlariAc(page);
    await panel.getByRole("button", { name: "Okuma kolaylığı desteği" }).click();

    const readingText = player.locator("[data-okuma-metin]");
    await expect(readingText.locator('[data-uzun-token="1"]').first()).toBeVisible();
    const widths = await readingText.evaluate((element) => ({
      clientWidth: element.clientWidth,
      scrollWidth: element.scrollWidth,
    }));
    expect(widths.scrollWidth).toBeLessThanOrEqual(widths.clientWidth + 1);
  });
});