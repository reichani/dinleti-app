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

// Yatay ekranda liste açıkken metin kısa süreliğine tek satıra iner (liste seçimle kapanır);
// burada öncelik oynatma kontrollerinin ekranda kalmasıdır.
const EKRANLAR = [
  { ad: "dikey", width: 360, height: 640, minMetin: 120 },
  { ad: "dikey", width: 375, height: 667, minMetin: 120 },
  { ad: "dikey", width: 412, height: 740, minMetin: 120 },
  { ad: "yatay", width: 740, height: 360, minMetin: 30 },
  { ad: "yatay", width: 844, height: 390, minMetin: 30 },
];

async function sesUyarisiniKapat(page) {
  const uyari = page.getByRole("button", { name: "Ses uyarısını kapat" });
  // Uyarı okuyucu açıldıktan kısa süre sonra gelebilir; tıklamaların önünü kesmesin.
  await uyari.waitFor({ state: "visible", timeout: 1500 }).then(() => uyari.click()).catch(() => {});
}

for (const ekran of EKRANLAR) {
  test(`bölüm listesi açıkken oynatma kontrolleri görünür kalır (${ekran.ad} ${ekran.width}×${ekran.height})`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === "desktop-chrome", "Mobil geometri sözleşmesi");
    await page.setViewportSize({ width: ekran.width, height: ekran.height });
    await page.addInitScript((okumaYolu) => {
      localStorage.clear();
      localStorage.setItem("okurio-okuma-yolu-v1", JSON.stringify(okumaYolu));
    }, OKUMA_YOLU);
    await page.goto("/");
    // Başlığa bağlı kalmamak için okumaya açık ilk kart seçilir.
    await page.locator('[data-kitap-karti][data-reading-enabled="true"]').first().click();
    await page.getByRole("button", { name: "Okumaya başla" }).click();
    const shell = page.locator("[data-reader-shell]");
    await expect(shell).toBeVisible();
    await sesUyarisiniKapat(page);

    const kontroller = shell.locator("[data-transport-controls]");
    await expect(kontroller).toBeInViewport({ ratio: 1 });

    await sesUyarisiniKapat(page);
    await shell.locator("[data-kompakt-baslik]").click();
    await expect(shell.locator("[data-bolum-listesi]")).toBeVisible();
    await expect(kontroller).toBeInViewport({ ratio: 1 });
    const metinYuksekligi = await shell.locator("[data-okuma-metin]").evaluate((el) => el.getBoundingClientRect().height);
    expect(metinYuksekligi).toBeGreaterThanOrEqual(ekran.minMetin);

    const satirYukseklikleri = await shell.locator("[data-bolum-satiri]").evaluateAll((els) => els.map((el) => el.getBoundingClientRect().height));
    expect(satirYukseklikleri.length).toBeGreaterThanOrEqual(2);
    for (const h of satirYukseklikleri) expect(h).toBeGreaterThanOrEqual(44);

    await sesUyarisiniKapat(page);
    await shell.locator("[data-kompakt-baslik]").click();
    await expect(shell.locator("[data-bolum-listesi]")).toBeHidden();
    await expect(kontroller).toBeInViewport({ ratio: 1 });
  });
}
