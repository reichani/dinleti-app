import { test, expect } from "@playwright/test";

// C1 · Ayar güveni (W3C COGA iç denetimi, 21.10.2026). Sözleşme:
// - Bir ihtiyaç seçimi okurun elle yaptığı ayarları (yazı boyutu, aralık, atlama,
//   okuma yolundan gelen odak) silmez; yalnız o ihtiyacın asgari değerlerini ekler.
// - İhtiyaç kapanınca yalnız onun açtığı ve okurun sonradan değiştirmediği alanlar döner.
// - Her değişiklikten sonra "Ayarlar güncellendi · Geri al" bildirimi (aria-live) görünür.
// - "Kısa günlük hedef" gösterilmez; eski kayıtta bulunursa uygulama sorunsuz açılır.

const OKUMA_YOLU = {
  secildi: true,
  yolId: "okuma_guveni_8_10",
  evreId: "paragraf",
  destekler: ["kelime_takibi", "genis_aralik", "yumusak_zemin"],
};
const METIN = "Kaplumbağa sabah erkenden yola çıktı. Ormanın kenarında küçük bir dere vardı. Dere sessizce akıyordu.";

async function sesUyarisiniKapat(page) {
  const uyari = page.getByRole("button", { name: "Ses uyarısını kapat" });
  // Uyarı okuyucu açıldıktan kısa süre sonra gelebilir; tıklamaların önünü kesmesin.
  await uyari.waitFor({ state: "visible", timeout: 1500 }).then(() => uyari.click()).catch(() => {});
}

async function tohumla(page, { okumaYolu = OKUMA_YOLU, ayar = null } = {}) {
  await page.addInitScript(({ okumaYolu, ayar }) => {
    if (sessionStorage.getItem("ayar-guveni-hazir")) return;
    sessionStorage.setItem("ayar-guveni-hazir", "1");
    localStorage.clear();
    if (okumaYolu) {
      localStorage.setItem("okurio-okuma-yolu-v1", JSON.stringify(okumaYolu));
      localStorage.setItem("dinleti:okurio-okuma-yolu-v1", JSON.stringify(okumaYolu));
    }
    if (ayar) {
      // Uygulama iki depolama yolundan birini kullanır (önekli/öneksiz); kayıt ikisine de yazılır.
      localStorage.setItem("dinleti-okuma-ayar-v1", JSON.stringify(ayar));
      localStorage.setItem("dinleti:dinleti-okuma-ayar-v1", JSON.stringify(ayar));
    }
  }, { okumaYolu, ayar });
}

async function okuyucuyuAc(page, secenekler) {
  await tohumla(page, secenekler);
  await page.goto("/");
  await expect(page.locator("[data-kendi-metnim]")).toBeVisible();
  await page.getByRole("button", { name: /Kendi metnini oku/i }).click();
  await page.getByLabel("Kendi metnim", { exact: true }).fill(METIN);
  await page.getByRole("button", { name: "Okuma moduna al", exact: true }).click();
  const metin = page.locator("[data-okuma-metin]");
  await expect(metin).toBeVisible();
  await sesUyarisiniKapat(page);
  await page.locator("[data-reader-settings-toggle]").click();
  const panel = page.locator("[data-reader-settings]");
  await expect(panel).toBeVisible();
  await sesUyarisiniKapat(page);
  return { metin, panel };
}

const puntoDugmesi = (panel) => panel.getByRole("button", { name: /^Yazı boyutu:/ });
const aralikDugmesi = (panel) => panel.getByRole("button", { name: /^Harf ve satır aralığı:/ });
const ihtiyac = (panel, id) => panel.locator(`[data-profil="${id}"]`);

async function puntoyaGetir(panel, px) {
  for (let i = 0; i < 4; i += 1) {
    if ((await puntoDugmesi(panel).getAttribute("aria-label")) === `Yazı boyutu: ${px} piksel`) return;
    await puntoDugmesi(panel).click();
  }
  await expect(puntoDugmesi(panel)).toHaveAttribute("aria-label", `Yazı boyutu: ${px} piksel`);
}

test.describe("Ayar güveni: ihtiyaç seçimi okurun ayarlarını silmez", () => {
  test("elle 26 px → 'Harfler kayıyor' → 26 px ve atlama korunur, aralık açılır; kapatınca aralık önceki değere döner", async ({ page }) => {
    const { metin, panel } = await okuyucuyuAc(page);
    await puntoyaGetir(panel, 26);
    await panel.getByRole("button", { name: /^Atlama:/ }).click();
    await expect(panel.getByRole("button", { name: "Atlama: 15 / 30 saniye" })).toBeVisible();
    await expect(aralikDugmesi(panel)).toHaveAttribute("aria-label", "Harf ve satır aralığı: Rahat");

    await ihtiyac(panel, "dis").click();
    await expect(ihtiyac(panel, "dis")).toHaveAttribute("aria-pressed", "true");
    await expect(puntoDugmesi(panel)).toHaveAttribute("aria-label", "Yazı boyutu: 26 piksel");
    await expect(aralikDugmesi(panel)).toHaveAttribute("aria-label", "Harf ve satır aralığı: Geniş");
    await expect(panel.getByRole("button", { name: "Atlama: 15 / 30 saniye" })).toBeVisible();
    await expect(panel.getByRole("button", { name: "Kelime vurgusu" })).toHaveAttribute("aria-pressed", "true");
    await expect(metin).toHaveCSS("font-size", "26px");
    await expect(metin).toHaveCSS("letter-spacing", "2.6px"); // 0,1em × 26 px
    await expect(metin).toHaveCSS("line-height", "45.5px");   // 1,75 × 26 px

    await ihtiyac(panel, "dis").click();
    await expect(ihtiyac(panel, "dis")).toHaveAttribute("aria-pressed", "false");
    await expect(aralikDugmesi(panel)).toHaveAttribute("aria-label", "Harf ve satır aralığı: Rahat");
    await expect(puntoDugmesi(panel)).toHaveAttribute("aria-label", "Yazı boyutu: 26 piksel");
    await expect(panel.getByRole("button", { name: "Atlama: 15 / 30 saniye" })).toBeVisible();
    await expect(metin).toHaveCSS("letter-spacing", "1.3px"); // 0,05em × 26 px
  });

  test("ihtiyaç açıkken okurun sonradan değiştirdiği alan, ihtiyaç kapanınca geri alınmaz", async ({ page }) => {
    const { panel } = await okuyucuyuAc(page);
    await ihtiyac(panel, "dis").click();
    await expect(aralikDugmesi(panel)).toHaveAttribute("aria-label", "Harf ve satır aralığı: Geniş");
    await aralikDugmesi(panel).click();
    await expect(aralikDugmesi(panel)).toHaveAttribute("aria-label", "Harf ve satır aralığı: Ekstra geniş");
    await ihtiyac(panel, "dis").click();
    await expect(aralikDugmesi(panel)).toHaveAttribute("aria-label", "Harf ve satır aralığı: Ekstra geniş");
  });

  test("'Gözüm çabuk yoruluyor' daha büyük elle seçilmiş yazıyı küçültmez", async ({ page }) => {
    const { panel } = await okuyucuyuAc(page);
    await puntoyaGetir(panel, 32);
    await ihtiyac(panel, "gorsel").click();
    await expect(puntoDugmesi(panel)).toHaveAttribute("aria-label", "Yazı boyutu: 32 piksel");
    await ihtiyac(panel, "gorsel").click();
    await expect(puntoDugmesi(panel)).toHaveAttribute("aria-label", "Yazı boyutu: 32 piksel");

    await puntoyaGetir(panel, 22);
    await ihtiyac(panel, "gorsel").click();
    await expect(puntoDugmesi(panel)).toHaveAttribute("aria-label", "Yazı boyutu: 26 piksel");
    await ihtiyac(panel, "gorsel").click();
    await expect(puntoDugmesi(panel)).toHaveAttribute("aria-label", "Yazı boyutu: 22 piksel");
  });

  test("okuma yolundan gelen odak, ihtiyaç açılıp kapanınca korunur; ortak alan açık ihtiyaçta kalır", async ({ page }) => {
    const { panel } = await okuyucuyuAc(page, { okumaYolu: { ...OKUMA_YOLU, destekler: [...OKUMA_YOLU.destekler, "odak"] } });
    const odak = panel.getByRole("button", { name: "Odak modu", exact: true });
    await expect(odak).toHaveAttribute("aria-pressed", "true");
    await ihtiyac(panel, "dehb").click();
    await ihtiyac(panel, "dehb").click();
    await expect(odak).toHaveAttribute("aria-pressed", "true");
    await ihtiyac(panel, "dis").click();
    await ihtiyac(panel, "dis").click();
    await expect(odak).toHaveAttribute("aria-pressed", "true");

    // Yoldan gelmeyen odak: iki ihtiyaç aynı alanı ister; biri kapanınca diğeri açık tutar.
    await odak.click();
    await expect(odak).toHaveAttribute("aria-pressed", "false");
    await ihtiyac(panel, "dehb").click();
    await expect(odak).toHaveAttribute("aria-pressed", "true");
    await ihtiyac(panel, "sade").click();
    await ihtiyac(panel, "dehb").click();
    await expect(odak).toHaveAttribute("aria-pressed", "true");
    await ihtiyac(panel, "sade").click();
    await expect(odak).toHaveAttribute("aria-pressed", "false");
  });
});

test.describe("Ayar güveni: Geri al bildirimi", () => {
  test("bildirim duyurulur, 44 px hedefli Geri al önceki ayarları ve seçimi geri yükler", async ({ page }, testInfo) => {
    const { metin, panel } = await okuyucuyuAc(page);
    await puntoyaGetir(panel, 26);
    const bildirim = panel.locator("[data-ayar-bildirimi]");
    await expect(bildirim).toHaveAttribute("aria-live", "polite");
    await expect(bildirim).toHaveAttribute("role", "status");

    await ihtiyac(panel, "dis").click();
    await expect(bildirim).toContainText("Ayarlar güncellendi");
    const geriAl = bildirim.getByRole("button", { name: "Geri al" });
    await expect(geriAl).toBeVisible();
    const kutu = await geriAl.boundingBox();
    expect(kutu.width).toBeGreaterThanOrEqual(44);
    expect(kutu.height).toBeGreaterThanOrEqual(44);

    if (testInfo.project.name === "desktop-chrome") {
      // Masaüstünde ayarlar okuma metninin yanında durur; bildirim metnin üstüne binmez.
      const b = await bildirim.boundingBox();
      const m = await metin.boundingBox();
      const kesisir = b.x < m.x + m.width && m.x < b.x + b.width && b.y < m.y + m.height && m.y < b.y + b.height;
      expect(kesisir).toBe(false);
    }

    await geriAl.click();
    await expect(ihtiyac(panel, "dis")).toHaveAttribute("aria-pressed", "false");
    await expect(aralikDugmesi(panel)).toHaveAttribute("aria-label", "Harf ve satır aralığı: Rahat");
    await expect(puntoDugmesi(panel)).toHaveAttribute("aria-label", "Yazı boyutu: 26 piksel");
    await expect(bildirim).toContainText("Önceki ayarlar geri yüklendi");
    await expect(bildirim.getByRole("button", { name: "Geri al" })).toHaveCount(0);
  });

  test("Geri al 'Sade ve sakin ekran'ın ses tonunu da geri yükler", async ({ page }) => {
    const { panel } = await okuyucuyuAc(page);
    const ses = panel.locator("[data-alt-araclar] [data-ses-tonu]");
    const onceTon = await ses.getAttribute("data-ses-tonu");
    expect(onceTon).not.toBe("sakin");
    await ihtiyac(panel, "sade").click();
    await expect(ses).toHaveAttribute("data-ses-tonu", "sakin");
    await panel.locator("[data-ayar-bildirimi]").getByRole("button", { name: "Geri al" }).click();
    await expect(ses).toHaveAttribute("data-ses-tonu", onceTon);
    await expect(ihtiyac(panel, "sade")).toHaveAttribute("aria-pressed", "false");
  });

  test("bildirim yaklaşık 8 saniye sonra kendiliğinden kapanır", async ({ page }) => {
    const { panel } = await okuyucuyuAc(page);
    await ihtiyac(panel, "gorsel").click();
    const bildirim = panel.locator("[data-ayar-bildirimi]");
    await expect(bildirim).toContainText("Ayarlar güncellendi");
    await page.mouse.move(0, 0);
    await page.waitForTimeout(6000);
    await expect(bildirim).toContainText("Ayarlar güncellendi");
    await expect(bildirim).not.toContainText("Ayarlar güncellendi", { timeout: 5000 });
  });
});

test.describe("Ayar güveni: Kısa günlük hedef ve terim birliği", () => {
  test("okuma yolu ekranında 'Kısa günlük hedef' görünmez; odak desteği 'Odak modu' adıyla gelir", async ({ page }) => {
    await tohumla(page, { okumaYolu: null });
    await page.goto("/");
    const sayfa = page.locator("[data-onboarding-page]");
    await expect(sayfa).toBeVisible();
    await expect(sayfa).not.toContainText("Kısa günlük hedef");
    await expect(sayfa.getByRole("button", { name: /Odak modu: okunan cümleyi öne çıkar/ })).toBeVisible();
    await expect(sayfa).not.toContainText("Aktif cümleyi öne çıkar");
    await sayfa.locator('[data-yol="akici_okuma_10_12"]').click();
    await expect(sayfa).not.toContainText("Kısa günlük hedef");
    await page.getByRole("button", { name: "Okuma yolumu başlat" }).click();
    await expect(page.locator("[data-kendi-metnim]")).toBeVisible();
    await expect(page.locator("main").first()).not.toContainText("Kısa günlük hedef");
  });

  test("eski kayıtta kisa_hedef varken uygulama açılır ve kayıt sessizce temizlenir", async ({ page }) => {
    const hatalar = [];
    page.on("pageerror", (e) => hatalar.push(e.message));
    const eskiYol = { secildi: true, yolId: "akici_okuma_10_12", evreId: "paragraf", destekler: ["kelime_takibi", "kisa_hedef"] };
    await tohumla(page, { okumaYolu: eskiYol, ayar: { punto: 2, aralik: 1, odak: false, vurgu: true, tema: "krem", font: "lexend", atlama: "sure", biyonik: false } });
    await page.goto("/");
    await expect(page.locator("[data-kendi-metnim]")).toBeVisible();
    await expect(page.locator("[data-onboarding-page]")).toHaveCount(0);

    await page.getByRole("button", { name: "Değiştir" }).first().click();
    const sayfa = page.locator("[data-onboarding-page]");
    await expect(sayfa).toBeVisible();
    await expect(sayfa).not.toContainText("Kısa günlük hedef");
    await page.getByRole("button", { name: "Okuma yolumu başlat" }).click();
    await expect.poll(() => page.evaluate(() => {
      const ham = localStorage.getItem("okurio-okuma-yolu-v1") || localStorage.getItem("dinleti:okurio-okuma-yolu-v1") || "{}";
      return JSON.parse(ham).destekler;
    })).toEqual(["kelime_takibi"]);
    expect(hatalar).toEqual([]);
  });

  test("yardım metni koda göre doğru", async ({ page }) => {
    const { panel } = await okuyucuyuAc(page);
    const bilgi = panel.locator("[data-destek-bilgi]");
    await bilgi.locator("summary").click();
    await expect(bilgi).toContainText("Harfler kayıyor, karışıyor: harf ve satır aralığını açar, okunan kelimeyi sesle birlikte vurgular.");
    await expect(bilgi).toContainText("Gözüm çabuk yoruluyor: yazıyı büyütür.");
    await expect(bilgi).toContainText("odak modunu açar");
    await expect(bilgi).not.toContainText("aralığı açar.");
  });
});
