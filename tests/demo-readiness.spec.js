import { test, expect } from "@playwright/test";

const TEST_OKUMA_YOLU = {
  secildi: true,
  yolId: "okuma_guveni_8_10",
  evreId: "paragraf",
  destekler: ["kelime_takibi", "genis_aralik", "yumusak_zemin", "kisa_hedef"],
};

const oynatici = (page) => page.locator("[data-mobile-stability]");
const modButonu = (page, id) => oynatici(page).locator(`[data-okuma-modu="${id}"]`);

async function onboardingTamamla(page) {
  await page.addInitScript((okumaYolu) => {
    localStorage.setItem("okurio-okuma-yolu-v1", JSON.stringify(okumaYolu));
    localStorage.setItem("dinleti-mod-v1", "cocuk");
  }, TEST_OKUMA_YOLU);
  await page.goto("/");
  await expect(page.locator("[data-kendi-metnim]")).toBeVisible();
  await expect(page.getByText(/İçerik durumu/i)).toBeVisible();
}

async function kendiMetniniAc(page, text) {
  await onboardingTamamla(page);
  await page.getByRole("button", { name: /Kendi metnini oku/i }).click();
  const input = page.getByLabel("Kendi metnim", { exact: true });
  await input.scrollIntoViewIfNeeded();
  await input.fill(text);
  await expect(input).toHaveValue(text);
  const ac = page.getByRole("button", { name: "Okuma moduna al", exact: true });
  await ac.scrollIntoViewIfNeeded();
  await ac.click();
  await expect(oynatici(page)).toBeVisible({ timeout: 10000 });
  await expect(oynatici(page).locator("[data-okuma-metin]")).toBeVisible();
  await page.waitForFunction(() => Boolean(window.__okurioReadingFixes));
}

async function modaGec(page, id, ipucu) {
  const compact = oynatici(page).locator("[data-okuma-modu-kompakt] button");
  const button = modButonu(page, id);
  if (!(await compact.isVisible())) {
    await oynatici(page).locator("[data-reader-settings-toggle]").click();
    await expect(compact).toBeVisible();
  }
  if (!(await button.isVisible())) await compact.click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(oynatici(page).locator("[data-okuma-modu-ipucu]")).toContainText(ipucu);
}

function uzunMetin() {
  return Array.from({ length: 30 }, (_, i) =>
    `Bölüm ${i + 1}. Oki sakin biçimde okur, kullanıcı kelimeleri takip eder ve gerektiğinde durur.`
  ).join(" ");
}

test.describe("1. Mod geçişleri ve kullanıcı durumu", () => {
  test("Dinliyorum → Birlikte → Kendim akışı ses durumunu ve yardımı doğru günceller", async ({ page }) => {
    await kendiMetniniAc(page, "Oki bu metni sakin ve anlaşılır biçimde okur. Kullanıcı üç okuma modunu sırayla dener.");
    await expect(oynatici(page).locator("[data-okuma-modu-kompakt] button")).toBeVisible();
    await modaGec(page, "birlikte", "Birlikte Okuyorum");
    await modaGec(page, "kendim", "Kendim Okuyorum");
    await expect(oynatici(page).locator('[data-kelime-yardimi="1"]')).toBeVisible();
    await expect(oynatici(page).getByRole("button", { name: /Ses: Kapalı/i })).toBeVisible();
  });
});

test.describe("2. Zaman ve ses senkronu", () => {
  test("ses çalışmıyorsa aktif kelime değişse bile kart kaymaz", async ({ page }) => {
    await page.goto("/");
    await page.waitForFunction(() => Boolean(window.__okurioReadingFixes));
    const result = await page.evaluate(() => {
      const card = document.createElement("div");
      card.dataset.okumaMetin = "1";
      card.style.height = "100px";
      card.style.overflow = "auto";
      card.innerHTML = `<div style="height:350px"></div><span data-aktif="1">son kelime</span>`;
      document.body.appendChild(card);
      let calls = 0;
      card.scrollTo = () => { calls += 1; };
      const active = card.querySelector("[data-aktif='1']");
      const moved = window.__okurioReadingFixes.scrollActiveWord(active, { now: 5000 });
      card.remove();
      return { moved, calls };
    });
    expect(result).toEqual({ moved: false, calls: 0 });
  });

  test("ses çalışırken kaydırma yalnızca metin kartına uygulanır ve yatay konum sıfırlanır", async ({ page }) => {
    await page.goto("/");
    await page.waitForFunction(() => Boolean(window.__okurioReadingFixes));
    const result = await page.evaluate(() => {
      Object.defineProperty(window, "speechSynthesis", { configurable: true, value: { speaking: true, paused: false } });
      const card = document.createElement("div");
      card.dataset.okumaMetin = "1";
      card.style.height = "100px";
      card.style.overflow = "auto";
      card.scrollLeft = 22;
      card.innerHTML = `<div style="height:350px"></div><span data-aktif="1">son kelime</span>`;
      document.body.appendChild(card);
      let options = null;
      card.scrollTo = (value) => { options = value; };
      const active = card.querySelector("[data-aktif='1']");
      const moved = window.__okurioReadingFixes.scrollActiveWord(active, { now: 100000 });
      card.remove();
      return { moved, options };
    });
    expect(result.moved).toBe(true);
    expect(result.options.left).toBe(0);
    expect(result.options.behavior).toBe("auto");
  });
});

test.describe("3. Uzun süre ve mutation fırtınası", () => {
  test("ses kapalıyken 120 kelime güncellemesi sıfır otomatik kaydırma üretir", async ({ page }) => {
    await page.goto("/");
    await page.waitForFunction(() => Boolean(window.__okurioReadingFixes));
    const calls = await page.evaluate(() => {
      const card = document.createElement("div");
      card.dataset.okumaMetin = "1";
      card.style.height = "100px";
      card.style.overflow = "auto";
      card.innerHTML = `<div style="height:400px"></div><span data-aktif="1">kelime</span>`;
      document.body.appendChild(card);
      let count = 0;
      card.scrollTo = () => { count += 1; };
      const active = card.querySelector("[data-aktif='1']");
      for (let i = 0; i < 120; i += 1) {
        active.textContent = `kelime-${i}`;
        window.__okurioReadingFixes.scrollActiveWord(active, { now: 10000 + i * 50 });
      }
      card.remove();
      return count;
    });
    expect(calls).toBe(0);
  });

  test("hızlı mod değişimlerinde tek okuma kartı kalır ve sayfa hata üretmez", async ({ page }) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await kendiMetniniAc(page, uzunMetin());
    if (!(await oynatici(page).locator("[data-okuma-modu-kompakt] button").isVisible())) {
      await oynatici(page).locator("[data-reader-settings-toggle]").click();
    }
    const ids = ["dinliyorum", "birlikte", "kendim"];
    for (let i = 0; i < 12; i += 1) {
      const id = ids[i % ids.length];
      const button = modButonu(page, id);
      if (!(await button.isVisible())) await oynatici(page).locator("[data-okuma-modu-kompakt] button").click();
      await expect(button).toBeVisible();
      await button.click();
      await expect(oynatici(page).locator("[data-okuma-metin]")).toHaveCount(1);
    }
    await expect(oynatici(page).locator("[data-okuma-metin]")).toHaveCount(1);
    expect(errors).toEqual([]);
  });
});

test.describe("4. Görsel ve geometrik stabilite", () => {
  test("okuma kartı mod geçişlerinde yerinden oynamaz, kırpılmaz ve yatay kaymaz", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === "desktop-chrome", "Mobil geometri sözleşmesi");
    await kendiMetniniAc(page, uzunMetin());
    const card = oynatici(page).locator("[data-okuma-metin]");
    const readMetrics = () => card.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      return { left: rect.left, right: rect.right, top: rect.top, height: rect.height, scrollLeft: element.scrollLeft, viewport: window.innerWidth };
    });
    const before = await readMetrics();
    expect(before.height).toBeGreaterThanOrEqual(220);
    await modaGec(page, "birlikte", "Birlikte Okuyorum");
    const together = await readMetrics();
    await modaGec(page, "kendim", "Kendim Okuyorum");
    const self = await readMetrics();
    for (const metrics of [before, together, self]) {
      expect(metrics.left).toBeGreaterThanOrEqual(0);
      expect(metrics.right).toBeLessThanOrEqual(metrics.viewport + 1);
      expect(metrics.scrollLeft).toBe(0);
    }
    expect(Math.abs(before.height - together.height)).toBeLessThanOrEqual(2);
    expect(Math.abs(before.height - self.height)).toBeLessThanOrEqual(2);
    expect(Math.abs(before.top - together.top)).toBeLessThanOrEqual(3);
  });
});

test.describe("5. Erişilebilirlik ve dokunma hedefleri", () => {
  test("temel okuma kontrolleri erişilebilir ada ve en az 40px dokunma alanına sahiptir", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === "desktop-chrome", "Mobil dokunma hedefi sözleşmesi");
    await kendiMetniniAc(page, "Kısa bir erişilebilirlik testi metni.");
    await modaGec(page, "kendim", "Kendim Okuyorum");
    const controls = [
      oynatici(page).locator("[data-okuma-modu-kompakt] button"),
      oynatici(page).locator("[data-alt-araclar] button").first(),
    ];
    for (const control of controls) {
      await expect(control).toBeVisible();
      const box = await control.boundingBox();
      expect(box.height).toBeGreaterThanOrEqual(40);
      expect(box.width).toBeGreaterThanOrEqual(40);
    }
  });
});

test.describe("6. Oturum ve yeniden yükleme dayanıklılığı", () => {
  test("storage köprüsü değerleri yenileme sonrasında korur", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(async () => { await window.storage.set("demo-readiness-check", JSON.stringify({ mode: "kendim", speed: 1.25 })); });
    await page.reload();
    const value = await page.evaluate(async () => (await window.storage.get("demo-readiness-check")).value);
    expect(JSON.parse(value)).toEqual({ mode: "kendim", speed: 1.25 });
  });
});

test.describe("7. Hata ve kısıtlı ortamdan toparlanma", () => {
  test("localStorage yazma engellense bile uygulama siyah ekranda kalmaz", async ({ page }) => {
    await page.addInitScript(() => { Storage.prototype.setItem = () => { throw new DOMException("Quota exceeded", "QuotaExceededError"); }; });
    await page.goto("/");
    await expect(page.locator("#root")).toBeVisible();
    await expect(page.locator("#root")).not.toBeEmpty();
    await expect(page.getByText(/Okurio|Kitaplık açılıyor|Okuma yol/i).first()).toBeVisible();
  });
});

test.describe("8. İçerik sınır durumları", () => {
  test("uzun URL, e-posta ve Türkçe karakterler karttan yatay taşmaz", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === "desktop-chrome", "Mobil içerik taşma sözleşmesi");
    const text = "https://dinleti-app.pages.dev/cok-uzun-bir-demo-baglantisi?parametre=okurio accessibility@okurio.example Çığ Şule ığdır özgürlük süpercalifragilisticexpialidocious";
    await kendiMetniniAc(page, text);
    await page.waitForFunction(() => document.querySelectorAll("[data-mobile-stability] [data-okuma-metin] [data-uzun-token='1']").length >= 2);
    const result = await oynatici(page).locator("[data-okuma-metin]").evaluate((element) => ({
      scrollWidth: element.scrollWidth,
      clientWidth: element.clientWidth,
      longTokens: element.querySelectorAll("[data-uzun-token='1']").length,
      scrollLeft: element.scrollLeft,
    }));
    expect(result.longTokens).toBeGreaterThanOrEqual(2);
    expect(result.scrollWidth).toBeLessThanOrEqual(result.clientWidth + 1);
    expect(result.scrollLeft).toBe(0);
  });
});

test.describe("9. Deployment ve yenileme smoke testi", () => {
  test("ana rota ve doğrudan yenileme uygulamayı yeniden açar", async ({ page }) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const response = await page.goto("/");
    expect(response.status()).toBe(200);
    await expect(page.locator("#root")).not.toBeEmpty();
    await page.reload();
    await expect(page.locator("#root")).not.toBeEmpty();
    expect(errors).toEqual([]);
  });
});

test.describe("10. Reader-first v2.6.0 akışı", () => {
  test("pilot hedef kelime kartı açılır, kapanır ve okuma ilerlemesini değiştirmez", async ({ page }) => {
    await onboardingTamamla(page);
    const pilotCard = page.getByRole("button", { name: "Mino Neden Üzüldü? ayrıntılarını aç" });
    await pilotCard.scrollIntoViewIfNeeded();
    await pilotCard.click();
    await page.getByRole("button", { name: "Okumaya başla", exact: true }).click();

    await expect(oynatici(page)).toBeVisible();
    const pause = oynatici(page).getByRole("button", { name: "Duraklat" });
    if (await pause.isVisible()) await pause.click();
    const target = oynatici(page).locator('[data-hedef-kelime="üzüntü"]');
    await expect(target).toBeVisible();
    const progress = await oynatici(page).getByRole("slider", { name: "Okuma ilerlemesi" }).getAttribute("aria-valuenow");

    await target.click();
    const glossary = oynatici(page).locator("[data-sozluk-karti]");
    await expect(glossary).toBeVisible();
    await expect(glossary).toContainText("İnsan kendini mutsuz hissettiğinde oluşan duygudur.");
    await expect(glossary.getByRole("button", { name: "üzüntü kelimesini seslendir" })).toBeVisible();
    await expect(oynatici(page).getByRole("slider", { name: "Okuma ilerlemesi" })).toHaveAttribute("aria-valuenow", progress || "0");

    await glossary.getByRole("button", { name: "Kelime açıklamasını kapat" }).click();
    await expect(glossary).toHaveCount(0);
    await expect(target).toBeFocused();
  });

  test("masaüstü okuyucu dar uygulama sütunuyla sınırlı kalmaz", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chrome", "Masaüstü genişlik sözleşmesi");
    await kendiMetniniAc(page, uzunMetin());
    const width = await oynatici(page).evaluate((element) => element.getBoundingClientRect().width);
    expect(width).toBeGreaterThanOrEqual(700);
  });
});
