import { test, expect } from "@playwright/test";

// Kaynak: 20.10.2026 mobil UX incelemesi, bulgu 1 ve PR-B kararı (Reyhan Açar):
// mobilde bölüm listesi metnin üzerine açılan bir alt sayfadır. Okuma alanı
// küçülmez, oynatma kontrolleri görünür kalır, metne dokunmak ya da Escape
// listeyi kapatır ve odak başlığa döner.

const OKUMA_YOLU = {
  secildi: true,
  yolId: "ilk_harfler_6_7",
  evreId: "hece_kelime",
  destekler: ["kelime_takibi", "buyuk_yazi", "genis_aralik", "yumusak_zemin"],
};

const EKRANLAR = [
  { ad: "dikey", width: 360, height: 640 },
  { ad: "dikey", width: 375, height: 667 },
  { ad: "dikey", width: 412, height: 740 },
  { ad: "yatay", width: 740, height: 360 },
  { ad: "yatay", width: 844, height: 390 },
];

async function sesUyarisiniKapat(page) {
  const uyari = page.getByRole("button", { name: "Ses uyarısını kapat" });
  await uyari.waitFor({ state: "visible", timeout: 1500 }).then(() => uyari.click()).catch(() => {});
}

async function okuyucuyuAc(page, ekran) {
  await page.setViewportSize({ width: ekran.width, height: ekran.height });
  await page.addInitScript((okumaYolu) => {
    localStorage.clear();
    localStorage.setItem("okurio-okuma-yolu-v1", JSON.stringify(okumaYolu));
  }, OKUMA_YOLU);
  await page.goto("/");
  await page.locator('[data-kitap-karti][data-reading-enabled="true"]').first().click();
  await page.getByRole("button", { name: "Okumaya başla" }).click();
  const shell = page.locator("[data-reader-shell]");
  await expect(shell).toBeVisible();
  await sesUyarisiniKapat(page);
  return shell;
}

const yukseklik = (loc) => loc.evaluate((el) => Math.round(el.getBoundingClientRect().height));

for (const ekran of EKRANLAR) {
  test(`bölüm listesi alt sayfa olarak açılır, metin küçülmez ve kontroller görünür kalır (${ekran.ad} ${ekran.width}×${ekran.height})`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === "desktop-chrome", "Mobil geometri sözleşmesi");
    const shell = await okuyucuyuAc(page, ekran);
    const kontroller = shell.locator("[data-transport-controls]");
    const metin = shell.locator("[data-okuma-metin]");
    await expect(kontroller).toBeInViewport({ ratio: 1 });
    const metinOnce = await yukseklik(metin);

    await sesUyarisiniKapat(page);
    await shell.locator("[data-kompakt-baslik]").click();
    const liste = shell.locator("[data-bolum-listesi]");
    await expect(liste).toBeVisible();
    await expect(liste).toHaveCSS("position", "absolute");
    await expect(kontroller).toBeInViewport({ ratio: 1 });
    expect(Math.abs((await yukseklik(metin)) - metinOnce)).toBeLessThanOrEqual(2);

    // Liste kontrol bloğuna uzanmaz.
    const listeAlt = await liste.evaluate((el) => el.getBoundingClientRect().bottom);
    const kontrolUst = await shell.locator("[data-alt-kontrol]").evaluate((el) => el.getBoundingClientRect().top);
    expect(listeAlt).toBeLessThanOrEqual(kontrolUst);

    const satirlar = await shell.locator("[data-bolum-satiri]").evaluateAll((els) => els.map((el) => el.getBoundingClientRect().height));
    expect(satirlar.length).toBeGreaterThanOrEqual(2);
    for (const h of satirlar) expect(h).toBeGreaterThanOrEqual(44);

    // Metne dokunmak listeyi kapatır.
    const perde = shell.locator("[data-bolum-perde]");
    const kutu = await perde.boundingBox();
    await perde.click({ position: { x: 20, y: kutu.height - 8 } });
    await expect(liste).toBeHidden();
    await expect(kontroller).toBeInViewport({ ratio: 1 });
  });
}

test("bölüm listesi klavyeyle açılır, odak aktif bölüme gider, Escape kapatır ve odak başlığa döner", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "desktop-chrome", "Mobil alt sayfa davranışı");
  const shell = await okuyucuyuAc(page, { width: 375, height: 667 });
  const baslik = shell.locator("[data-kompakt-baslik]");
  await baslik.focus();
  await page.keyboard.press("Enter");
  const liste = shell.locator("[data-bolum-listesi]");
  await expect(liste).toBeVisible();
  await expect(liste.locator('[aria-current="true"]')).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(liste).toBeHidden();
  await expect(shell).toBeVisible(); // Escape okuyucuyu kapatmaz, yalnız listeyi
  await expect(baslik).toBeFocused();
});
