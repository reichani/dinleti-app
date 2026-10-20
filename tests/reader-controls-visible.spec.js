import { test, expect } from "@playwright/test";

// Kaynak: 20.10.2026 mobil UX incelemesi, bulgu 1 — bölüm listesi açıkken
// duraklat/tekrar/sonraki kontrolleri görünür alanın dışına itiliyordu.
// Kabul ölçütü: küçük mobil ekranda, büyük yazı ve açık bölüm listesiyle
// oynatma kontrollerine ek kaydırma yapmadan erişilebilmeli.

const OKUMA_YOLU = {
  secildi: true,
  yolId: "ilk_harfler_6_7",
  evreId: "hece_kelime",
  destekler: ["kelime_takibi", "buyuk_yazi", "genis_aralik", "yumusak_zemin"],
};

const EKRANLAR = [
  { width: 360, height: 640 },
  { width: 375, height: 667 },
  { width: 412, height: 740 },
];

for (const ekran of EKRANLAR) {
  test(`bölüm listesi açıkken oynatma kontrolleri görünür kalır (${ekran.width}×${ekran.height})`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === "desktop-chrome", "Mobil geometri sözleşmesi");
    await page.setViewportSize(ekran);
    await page.addInitScript((okumaYolu) => {
      localStorage.clear();
      localStorage.setItem("okurio-okuma-yolu-v1", JSON.stringify(okumaYolu));
    }, OKUMA_YOLU);
    await page.goto("/");
    await page.getByText(/Keloğlan ve Duran Değirmen/).first().click();
    await page.getByRole("button", { name: "Okumaya başla" }).click();
    const shell = page.locator("[data-reader-shell]");
    await expect(shell).toBeVisible();
    const uyari = page.getByRole("button", { name: "Ses uyarısını kapat" });
    if (await uyari.isVisible()) await uyari.click();

    const kontroller = shell.locator("[data-transport-controls]");
    await expect(kontroller).toBeInViewport({ ratio: 1 });

    await shell.locator("[data-kompakt-baslik]").click();
    await expect(shell.locator("[data-bolum-listesi]")).toBeVisible();
    await expect(kontroller).toBeInViewport({ ratio: 1 });
    await expect(shell.locator("[data-okuma-metin]")).toBeInViewport();

    await shell.locator("[data-kompakt-baslik]").click();
    await expect(shell.locator("[data-bolum-listesi]")).toBeHidden();
    await expect(kontroller).toBeInViewport({ ratio: 1 });
  });
}
