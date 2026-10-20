import { test, expect } from "@playwright/test";

// Kaynak: 20.10.2026 mobil UX denetimi U1, U2, U14 (onay: Reyhan Açar).
// U1  odak modunda bağlam cümleleri WCAG 1.4.3 (4,5:1) eşiğini karşılar
// U2  kaydırılabilir okuma metni klavyeyle odaklanır ve kaydırılır (WCAG 2.1.1)
// U14 krem zemindeki odak halkası en az 3:1 kontrast verir (WCAG 1.4.11)

const OKUMA_YOLU = {
  secildi: true,
  yolId: "okuma_guveni_8_10",
  evreId: "paragraf",
  destekler: ["kelime_takibi", "odak", "genis_aralik", "yumusak_zemin"],
};

const METIN = Array.from({ length: 30 }, (_, i) =>
  `Cümle ${i + 1} sakin bir okuma için yazıldı ve metnin bağlamı korunur.`
).join(" ");

async function okuyucuyuAc(page) {
  await page.addInitScript((okumaYolu) => {
    localStorage.clear();
    localStorage.setItem("okurio-okuma-yolu-v1", JSON.stringify(okumaYolu));
  }, OKUMA_YOLU);
  await page.goto("/");
  await expect(page.locator("[data-kendi-metnim]")).toBeVisible();
  await page.getByRole("button", { name: /Kendi metnini oku/i }).click();
  await page.getByLabel("Kendi metnim", { exact: true }).fill(METIN);
  await page.getByRole("button", { name: "Okuma moduna al", exact: true }).click();
  const metin = page.locator("[data-okuma-metin]");
  await expect(metin).toBeVisible();
  return metin;
}

// Opaklık zincirini zemine karıştırıp WCAG kontrast oranını hesaplar.
async function baglamKontrasti(metin) {
  return metin.evaluate((kutu) => {
    const parse = (c) => (c.match(/[\d.]+/g) || []).map(Number);
    const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
    const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
    let zemin = null;
    for (let el = kutu; el && !zemin; el = el.parentElement) {
      const [r, g, b, a = 1] = parse(getComputedStyle(el).backgroundColor);
      if (a > 0.5) zemin = [r, g, b];
    }
    zemin = zemin || [20, 24, 31];
    const kelime = [...kutu.querySelectorAll("[data-kelime-ix]")].find((el) => parseFloat(getComputedStyle(el).opacity) < 1);
    if (!kelime) return { soluk: false };
    const [r, g, b, a = 1] = parse(getComputedStyle(kelime.querySelector("[data-kelime-govde]") || kelime).color);
    const op = parseFloat(getComputedStyle(kelime).opacity) * a;
    const on = [r, g, b].map((v, i) => v * op + zemin[i] * (1 - op));
    const [l1, l2] = [lum(on), lum(zemin)].sort((x, y) => y - x);
    return { soluk: true, opaklik: parseFloat(getComputedStyle(kelime).opacity), oran: (l1 + 0.05) / (l2 + 0.05) };
  });
}

test.describe("Okuma yüzeyi erişilebilirliği", () => {
  test("odak modunda bağlam cümleleri 4,5:1 eşiğini krem ve koyu zeminde karşılar", async ({ page }) => {
    const metin = await okuyucuyuAc(page);
    await expect(metin).toHaveAttribute("data-odak", "1");
    const krem = await baglamKontrasti(metin);
    expect(krem.soluk).toBe(true);
    expect(krem.opaklik).toBeCloseTo(0.67, 2);
    expect(krem.oran).toBeGreaterThanOrEqual(4.5);

    await page.locator("[data-reader-settings-toggle]").click();
    const panel = page.locator("[data-reader-settings]");
    await panel.getByRole("button", { name: /^Zemin:/ }).click();
    await expect(metin).toHaveAttribute("data-tema", "koyu");
    const kapat = panel.locator("[data-reader-settings-close]");
    if (await kapat.isVisible()) await kapat.click();
    const koyu = await baglamKontrasti(metin);
    expect(koyu.oran).toBeGreaterThanOrEqual(4.5);
  });

  test("aktif cümle odak modunda zemin bandıyla ayrılır", async ({ page }) => {
    const metin = await okuyucuyuAc(page);
    const bant = metin.locator('[data-odak-cumle="1"]').first();
    await expect(bant).toBeAttached();
    // Bant yalnız aktif cümlede: soluk bağlam kelimeleri bant taşımaz.
    const bantliSoluk = await metin.evaluate((el) => [...el.querySelectorAll('[data-odak-cumle="1"]')].some((k) => parseFloat(getComputedStyle(k).opacity) < 1));
    expect(bantliSoluk).toBe(false);
    const zemin = await bant.evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(zemin).toMatch(/0\.18\)$/);
  });

  test("okuma metni klavyeyle odaklanır, adlandırılmıştır ve klavyeyle kayar", async ({ page }) => {
    const metin = await okuyucuyuAc(page);
    await expect(metin).toHaveAttribute("tabindex", "0");
    await expect(metin).toHaveAttribute("role", "region");
    await expect(metin).toHaveAttribute("aria-label", /^Okuma metni:/);
    await expect(metin).not.toHaveAttribute("aria-live", /.+/);
    await metin.focus();
    await expect(metin).toBeFocused();
    const once = await metin.evaluate((el) => el.scrollTop);
    await page.keyboard.press("PageDown");
    await expect.poll(() => metin.evaluate((el) => el.scrollTop)).toBeGreaterThan(once);
  });

  test("krem zeminde metin içi odak halkası en az 3:1 kontrast verir", async ({ page }) => {
    const metin = await okuyucuyuAc(page);
    await expect(metin).toHaveAttribute("data-tema", "krem");
    // Metin içindeki odaklanabilir öğe (ör. sözlük kelimesi) klavyeyle odaklanır.
    await metin.evaluate((kutu) => {
      const deneme = document.createElement("span");
      deneme.tabIndex = 0;
      deneme.id = "odak-denemesi";
      deneme.textContent = "odak";
      kutu.appendChild(deneme);
    });
    await metin.focus();
    await page.keyboard.press("Tab");
    await expect(page.locator("#odak-denemesi")).toBeFocused();
    const renk = await page.locator("#odak-denemesi").evaluate((el) => getComputedStyle(el).outlineColor);
    expect(renk).toBe("rgb(154, 90, 18)");
  });
});
