import { test, expect } from "@playwright/test";

// v2.10 sözleşmesi: "Ders çalışıyorum" evresi Kendi metnim akışına yönlendirir;
// karışık Türkçe-İngilizce ders metninde İngilizce paragraflar İngilizce sesle okunur;
// okuma sonunda çalışma kartı açılır ve notlar bu cihazda saklanır.
const METIN = [
  "Aşağıdaki metni oku ve soruları cevapla. Bilmediğin kelimelerin altını çiz.",
  "Every morning I wake up at seven. I have breakfast with my family and I walk to school.",
  "Metne göre çocuk okula nasıl gidiyor? Cevabını kendi cümlenle yaz.",
].join("\n");

function sesMock(page) {
  return page.addInitScript(() => {
    window.__dilKaydi = [];
    let timer = null;
    window.SpeechSynthesisUtterance = class { constructor(t) { this.text = t; } };
    Object.defineProperty(window, "speechSynthesis", { configurable: true, value: {
      speak(u) {
        clearInterval(timer); let i = 0;
        window.__dilKaydi.push({ lang: u.lang, voice: u.voice?.name, text: u.text });
        setTimeout(() => u.onstart?.(), 5);
        timer = setInterval(() => { i += 6; if (i >= u.text.length) { clearInterval(timer); u.onend?.(); } }, 20);
      },
      cancel() { clearInterval(timer); }, pause() {}, resume() {},
      getVoices() { return [{ name: "Mock Türkçe", lang: "tr-TR", localService: true }, { name: "Mock English", lang: "en-GB", localService: true }]; },
      addEventListener() {}, removeEventListener() {},
      get speaking() { return false; }, get paused() { return false; },
    } });
  });
}

test("ders çalışıyorum: karışık metin bölüm diliyle okunur, çalışma kartı kalıcıdır", async ({ page }) => {
  await sesMock(page);
  await page.addInitScript(() => {
    if (sessionStorage.getItem("seeded")) return;
    sessionStorage.setItem("seeded", "1");
    localStorage.clear();
    localStorage.setItem("okurio-okuma-yolu-v1", JSON.stringify({ secildi: true, yolId: "akici_okuma_10_12", evreId: "ders_calisma", destekler: ["kelime_takibi", "kisa_hedef"] }));
    localStorage.setItem("dinleti-mod-v1", "cocuk");
  });
  await page.goto("/");
  const kart = page.locator("[data-ders-calisma-karti]");
  await expect(kart).toBeVisible();
  await expect(page.locator("main")).toContainText("Ders çalışıyorum");
  await kart.getByRole("button", { name: "Ders metnini ekle" }).click();

  await page.getByLabel("Kendi metnim", { exact: true }).fill(METIN);
  const onay = page.locator("[data-dil-onayi]");
  await expect(onay).toContainText("1 İngilizce paragraf");
  await expect(onay.getByRole("checkbox")).toBeChecked();
  await page.getByRole("button", { name: /Okuma moduna al/ }).click();

  const oynat = page.getByRole("button", { name: "Oynat" }).first();
  await oynat.click();
  await expect.poll(async () => page.evaluate(() => window.__dilKaydi.map((k) => k.lang)), { timeout: 20000 })
    .toEqual(expect.arrayContaining(["tr-TR", "en-GB"]));
  const kayit = await page.evaluate(() => window.__dilKaydi);
  const ingilizce = kayit.find((k) => k.text.includes("Every morning"));
  expect(ingilizce.lang).toBe("en-GB");
  expect(ingilizce.voice).toBe("Mock English");
  expect(kayit.find((k) => k.text.includes("Aşağıdaki")).lang).toBe("tr-TR");

  const calisma = page.locator("[data-calisma-karti]");
  await expect(calisma).toBeVisible({ timeout: 20000 });
  await calisma.getByLabel(/ana fikri/).fill("Çocuk her sabah ailesiyle kahvaltı edip okula yürür.");
  await calisma.getByRole("button", { name: "Metne dön" }).click();
  await expect(calisma).toHaveCount(0);
  await page.getByRole("button", { name: "Çalışma kartı" }).click();
  await expect(page.locator("[data-calisma-karti]").getByLabel(/ana fikri/)).toHaveValue("Çocuk her sabah ailesiyle kahvaltı edip okula yürür.");
  const kayitli = await page.evaluate(() => localStorage.getItem("okurio-calisma-notlari-v1"));
  expect(kayitli).toContain("kahvaltı");
});
