import { test, expect } from "@playwright/test";

// C2 okur kontrolü: 21 Ekim 2026 W3C COGA iç denetimi bulguları (hedef persona:
// dikkat güçlüğü yaşayan okur). A: ilerleme çubuğu atlaması + "Önceki konuma dön",
// B: elle kaydırınca takip okur dönene kadar durur, C: Kendim Okuyorum konumu,
// D: dikkat profilinde bölüm sonu arası, E: prefers-reduced-motion.

const YETISKIN_YOLU = { secildi: true, yolId: "yetiskin_odak_18", evreId: "okumaya_donus", destekler: ["kelime_takibi"] };
const AYAR = { punto: 3, aralik: 1, odak: false, vurgu: true, tema: "krem", font: "lexend", atlama: "cumle" };
// 14 kelimelik cümleler; yetişkin yolunda bölüm ~280 kelimede (20 cümle) kapanır → 7 bölüm.
const METIN = Array.from({ length: 140 }, (_, i) =>
  `Cümle ${i + 1}: Oki sakin bir sesle ormanın kenarındaki küçük evi ve bahçedeki ağaçları anlattı.`
).join(" ");
const BOLUMDEKI_CUMLE = 20;
// Bölüm sonu testleri için kısa bölümler: 8–10 yolu ~140 kelime (10 cümle) → 3 bölüm.
const GUVEN_YOLU = { secildi: true, yolId: "okuma_guveni_8_10", evreId: "paragraf", destekler: ["kelime_takibi"] };
const KISA_METIN = METIN.split(/(?<=\.) /).slice(0, 30).join(" ");
const KISA_BOLUM_CUMLE = 10;

const oynatici = (page) => page.locator("[data-mobile-stability]");
const metinKutusu = (page) => oynatici(page).locator("[data-okuma-metin]");

async function hazirla(page, { yol = YETISKIN_YOLU, ayar = AYAR } = {}) {
  await page.addInitScript(({ yol, ayar }) => {
    // Yeniden yüklemede kayıtlı konum silinmesin diye kurulum sekme başına bir kez yapılır.
    if (!sessionStorage.getItem("okur-kontrolu-kuruldu")) {
      sessionStorage.setItem("okur-kontrolu-kuruldu", "1");
      localStorage.clear();
      localStorage.setItem("okurio-okuma-yolu-v1", JSON.stringify(yol));
      localStorage.setItem("dinleti-mod-v1", "yetiskin");
      localStorage.setItem("dinleti-okuma-ayar-v1", JSON.stringify(ayar));
    }
    // Hızlı sahte Web Speech: her kelime 40 ms, iptal edilince bekleyen olaylar silinir.
    class FakeUtterance { constructor(text) { this.text = text; } }
    let timers = [];
    let speaking = false;
    const temizle = () => { timers.forEach((t) => clearTimeout(t)); timers = []; };
    const engine = {
      paused: false,
      get speaking() { return speaking; },
      getVoices: () => [], addEventListener() {}, removeEventListener() {},
      pause() {}, resume() {},
      cancel() { temizle(); speaking = false; },
      speak(u) {
        temizle();
        speaking = true;
        const starts = []; const re = /\S+/g; let m;
        while ((m = re.exec(u.text))) starts.push(m.index);
        timers.push(setTimeout(() => u.onstart?.(), 5));
        starts.forEach((ci, k) => timers.push(setTimeout(() => u.onboundary?.({ name: "word", charIndex: ci, elapsedTime: k * 0.04 }), 10 + k * 40)));
        timers.push(setTimeout(() => { speaking = false; u.onend?.(); }, 20 + starts.length * 40));
      },
    };
    window.__okurioSpeakCount = 0;
    const speak = engine.speak;
    engine.speak = (u) => { window.__okurioSpeakCount += 1; speak(u); };
    Object.defineProperty(window, "SpeechSynthesisUtterance", { configurable: true, value: FakeUtterance });
    Object.defineProperty(window, "speechSynthesis", { configurable: true, value: engine });
  }, { yol, ayar });
}

async function kendiMetniniAc(page, metin = METIN) {
  await page.goto("/");
  await page.getByRole("button", { name: /Kendi metnini oku/i }).click();
  await page.getByLabel("Kendi metnim", { exact: true }).fill(metin);
  await page.getByRole("button", { name: "Okuma moduna al", exact: true }).click();
  await expect(oynatici(page)).toBeVisible();
  await expect(metinKutusu(page)).toBeVisible();
  await page.waitForFunction(() => Boolean(window.__okurioReadingFixes));
}

async function ayarlariAc(page) {
  const panel = oynatici(page).locator("[data-reader-settings]");
  if (!(await panel.isVisible())) {
    await oynatici(page).locator("[data-reader-settings-toggle]").click();
    await expect(panel).toBeVisible();
  }
  return panel;
}

async function ayarlariKapat(page) {
  const kapat = oynatici(page).locator("[data-reader-settings-close]");
  if (await kapat.isVisible()) await kapat.click();
}

async function modaGec(page, id) {
  await ayarlariAc(page);
  const dugme = oynatici(page).locator(`[data-okuma-modu="${id}"]`);
  if (!(await dugme.isVisible())) await oynatici(page).locator("[data-okuma-modu-kompakt] button").click();
  await dugme.click();
  await expect(oynatici(page)).toHaveAttribute("data-okuma-modu-aktif", id);
  await ayarlariKapat(page);
}

const aktifIx = (page) => metinKutusu(page).evaluate((el) => Number(el.querySelector('[data-aktif="1"]')?.dataset.kelimeIx ?? -1));
const aktifGorunur = (page) => metinKutusu(page).evaluate((el) => {
  const w = el.querySelector('[data-aktif="1"]');
  if (!w) return false;
  const c = el.getBoundingClientRect(); const r = w.getBoundingClientRect();
  return r.top >= c.top - 1 && r.bottom <= c.bottom + 1;
});
const bolumYazisi = (page) => oynatici(page).locator("[data-kompakt-baslik]");

test.describe("C2 okur kontrolü", () => {
  test("A: ilerleme çubuğunda büyük atlama ikinci dokunuşla onaylanır ve geri alınabilir", async ({ page }) => {
    await hazirla(page);
    await kendiMetniniAc(page);
    const slider = oynatici(page).getByRole("slider", { name: "Okuma ilerlemesi" });
    await expect(slider).toHaveAttribute("tabindex", "0");
    await expect(bolumYazisi(page)).toContainText("1/7 bölüm");
    const kutu = await slider.boundingBox();
    const hedef = { x: kutu.width * 0.9, y: kutu.height / 2 };

    // Tek dokunuş yalnız önizler: konum değişmez, onay ipucu ve duyuru gelir.
    await slider.click({ position: hedef });
    await expect(oynatici(page).locator("[data-ilerleme-onayi]")).toContainText("onay için yeniden dokun");
    await expect(oynatici(page).locator("[data-okur-duyuru]")).toContainText("yeniden dokun");
    await expect(slider).toHaveAttribute("aria-valuenow", "0");
    await expect(bolumYazisi(page)).toContainText("1/7 bölüm");

    // İkinci dokunuş onaylar; "Önceki konuma dön" görünür ve en az 44 px'tir.
    await slider.click({ position: hedef });
    await expect.poll(async () => Number(await slider.getAttribute("aria-valuenow"))).toBeGreaterThanOrEqual(85);
    await expect(bolumYazisi(page)).not.toContainText("1/7 bölüm");
    const geri = oynatici(page).getByRole("button", { name: "Önceki konuma dön" });
    await expect(geri).toBeVisible();
    const geriKutu = await geri.boundingBox();
    expect(geriKutu.height).toBeGreaterThanOrEqual(44);
    await expect(oynatici(page).locator("[data-okur-duyuru]")).toContainText("gidildi");

    await geri.click();
    await expect(slider).toHaveAttribute("aria-valuenow", "0");
    await expect(bolumYazisi(page)).toContainText("1/7 bölüm");
    await expect(geri).toHaveCount(0);
    await expect(oynatici(page).locator("[data-okur-duyuru]")).toContainText("Önceki konuma dönüldü");

    // Küçük atlama (%5, aynı bölüm) onay istemez ve geri alma düğmesi açmaz.
    await slider.click({ position: { x: kutu.width * 0.05, y: kutu.height / 2 } });
    await expect.poll(async () => Number(await slider.getAttribute("aria-valuenow"))).toBeGreaterThanOrEqual(3);
    await expect(oynatici(page).locator("[data-ilerleme-onayi]")).toHaveCount(0);
    await expect(geri).toHaveCount(0);

    // Klavye (slider semantiği) onaysız uygular; büyük atlamada geri alma yine sunulur ve ~8 sn sonra kaybolur.
    await slider.focus();
    await page.keyboard.press("End");
    await expect(slider).toHaveAttribute("aria-valuenow", "100");
    await expect(geri).toBeVisible();
    await expect(geri).toBeHidden({ timeout: 11000 });
    await page.keyboard.press("Home");
    await expect(slider).toHaveAttribute("aria-valuenow", "0");
  });

  test("B: elle kaydırınca takip süresiz durur, metin geri çekilmez; Takibe dön ve Sonraki takibi açar", async ({ page }) => {
    await hazirla(page);
    await kendiMetniniAc(page);
    await oynatici(page).getByRole("button", { name: "Oynat", exact: true }).click();
    await expect(oynatici(page)).toHaveAttribute("data-playing", "1");
    // Takip metni ilk ekranın epey altına taşıyana kadar bekle.
    await expect.poll(() => metinKutusu(page).evaluate((el) => el.scrollTop > el.clientHeight * 0.6), { timeout: 30000 }).toBe(true);

    await metinKutusu(page).evaluate((el) => {
      el.dispatchEvent(new WheelEvent("wheel", { deltaY: -600, bubbles: true, cancelable: true }));
      el.scrollTop = 0;
    });
    await expect(metinKutusu(page)).toHaveAttribute("data-takip-durdu", "1");
    const once = await aktifIx(page);
    // Eski davranış ~1,8 sn sonra metni geri çekiyordu; 3 sn boyunca yerinde kalmalı, ses sürmeli.
    await page.waitForTimeout(3000);
    expect(await metinKutusu(page).evaluate((el) => el.scrollTop)).toBeLessThan(5);
    expect(await aktifIx(page)).toBeGreaterThan(once);
    await expect(oynatici(page)).toHaveAttribute("data-playing", "1");

    const takibeDon = oynatici(page).getByRole("button", { name: /Takibe dön/ });
    await expect(takibeDon).toBeVisible();
    const dugme = await takibeDon.boundingBox();
    const metinKutu = await metinKutusu(page).boundingBox();
    expect(dugme.height).toBeGreaterThanOrEqual(44);
    expect(dugme.width).toBeGreaterThanOrEqual(44);
    // Düğme metnin üstüne binmez.
    expect(dugme.y + dugme.height).toBeLessThanOrEqual(metinKutu.y + 1);

    await takibeDon.click();
    await expect(metinKutusu(page)).not.toHaveAttribute("data-takip-durdu", "1");
    await expect.poll(() => aktifGorunur(page), { timeout: 5000 }).toBe(true);
    await expect(takibeDon).toHaveCount(0);

    // Yeniden kaydırma durdurur; "Sonraki cümle" takibi yeniden açar.
    await metinKutusu(page).evaluate((el) => {
      el.dispatchEvent(new WheelEvent("wheel", { deltaY: -600, bubbles: true, cancelable: true }));
      el.scrollTop = 0;
    });
    await expect(metinKutusu(page)).toHaveAttribute("data-takip-durdu", "1");
    await oynatici(page).getByRole("button", { name: "Sonraki cümle" }).click();
    await expect(metinKutusu(page)).not.toHaveAttribute("data-takip-durdu", "1");
    await expect.poll(() => aktifGorunur(page), { timeout: 5000 }).toBe(true);
  });

  test("C: Kendim Okuyorum modunda kaydırılan konum kaydedilir, yeniden açılışta oraya dönülür", async ({ page }) => {
    await hazirla(page);
    await kendiMetniniAc(page);
    await modaGec(page, "kendim");

    const konum = oynatici(page).locator("[data-kendim-konum]");
    await expect(konum).toHaveText(`Cümle 1 / ${BOLUMDEKI_CUMLE} · Bölüm 1 / 7`);
    // Boşa dönen Oynat ve sabit süre göstergesi yok; yerine "Sesli dinle".
    await expect(oynatici(page).getByRole("button", { name: "Oynat", exact: true })).toHaveCount(0);
    await expect(oynatici(page).locator("[data-sesli-dinle]")).toBeVisible();
    await expect(oynatici(page).locator("[data-progress-time]")).not.toContainText(/\d:\d\d/);

    await metinKutusu(page).evaluate((el) => { el.scrollTop = Math.round((el.scrollHeight - el.clientHeight) * 0.6); });
    await expect.poll(async () => Number((await konum.textContent()).match(/Cümle (\d+)/)?.[1] ?? 0), { timeout: 5000 }).toBeGreaterThan(3);
    const kayitliCumle = Number((await konum.textContent()).match(/Cümle (\d+)/)[1]);
    const kayitOku = () => page.evaluate(() => {
      const d = JSON.parse(localStorage.getItem("dinleti-durum-v1") || "{}");
      return d.ilerlemeler?.[d.sonKitap] || null;
    });
    await expect.poll(async () => (await kayitOku())?.wordIndex).toBe((kayitliCumle - 1) * 14);
    const kayit = await kayitOku();
    expect(kayit.sectionIndex).toBe(0);

    await page.reload();
    const devam = page.getByText("Kaldığın yerden devam et", { exact: true });
    await expect(devam).toBeVisible();
    await devam.locator("..").click();
    await expect(oynatici(page)).toHaveAttribute("data-okuma-modu-aktif", "kendim");
    await expect(oynatici(page).locator("[data-kendim-konum]")).toHaveText(`Cümle ${kayitliCumle} / ${BOLUMDEKI_CUMLE} · Bölüm 1 / 7`);
    const geriYukleme = await metinKutusu(page).evaluate((el, ix) => {
      const w = el.querySelector(`[data-kelime-ix="${ix}"]`);
      const c = el.getBoundingClientRect(); const r = w.getBoundingClientRect();
      return { scrollTop: el.scrollTop, ust: r.top - c.top, alt: c.bottom - r.bottom };
    }, kayit.wordIndex);
    expect(geriYukleme.scrollTop).toBeGreaterThan(0);
    expect(geriYukleme.ust).toBeGreaterThanOrEqual(0);
    expect(geriYukleme.alt).toBeGreaterThan(0);

    // "Sesli dinle": Dinliyorum moduna geçer, kayıtlı cümleden sesli okur.
    await oynatici(page).locator("[data-sesli-dinle]").click();
    await expect(oynatici(page)).toHaveAttribute("data-okuma-modu-aktif", "dinliyorum");
    await expect(oynatici(page)).toHaveAttribute("data-playing", "1");
    await expect.poll(() => page.evaluate(() => window.__okurioSpeakCount)).toBeGreaterThan(0);
    await expect.poll(() => aktifIx(page)).toBeGreaterThanOrEqual(kayit.wordIndex);
    await expect(oynatici(page).getByRole("button", { name: "Duraklat", exact: true })).toBeVisible();
  });

  async function bolumSonunaGetir(page, cumleSayisi = KISA_BOLUM_CUMLE) {
    // Durdurulmuşken son cümleye geç (Sonraki cümle), sonra oynat: bölüm birkaç yüz ms içinde biter.
    const sonraki = oynatici(page).getByRole("button", { name: "Sonraki cümle" });
    const simdikiCumle = Math.floor(Math.max(0, await aktifIx(page)) / 14);
    for (let i = simdikiCumle; i < cumleSayisi - 1; i += 1) await sonraki.click();
    await expect.poll(() => aktifIx(page)).toBe((cumleSayisi - 1) * 14);
    await oynatici(page).getByRole("button", { name: "Oynat", exact: true }).click();
  }

  test("D: dikkat profilinde bölüm sonunda ara ekranı açılır; Sonraki bölüme geç ve Mola ver çalışır", async ({ page }) => {
    await hazirla(page, { yol: GUVEN_YOLU });
    await kendiMetniniAc(page, KISA_METIN);
    await expect(bolumYazisi(page)).toContainText("1/3 bölüm");
    const panel = await ayarlariAc(page);
    await panel.getByRole("button", { name: "Uzun metinde dikkatim dağılıyor", exact: true }).click();
    await ayarlariKapat(page);

    await bolumSonunaGetir(page);
    const ara = oynatici(page).locator("[data-bolum-arasi]");
    await expect(ara).toBeVisible({ timeout: 10000 });
    await expect(ara).toContainText("Bölüm bitti. Kısa bir mola ister misin?");
    await expect(ara).not.toContainText(/puan|rozet|tebrik/i);
    await expect(oynatici(page)).toHaveAttribute("data-playing", "0");
    await expect(bolumYazisi(page)).toContainText("2/3 bölüm");
    for (const ad of ["Sonraki bölüme geç", "Mola ver"]) {
      const kutu = await ara.getByRole("button", { name: ad }).boundingBox();
      expect(kutu.height).toBeGreaterThanOrEqual(44);
    }
    // Ses kendiliğinden sürmez.
    const konusma = await page.evaluate(() => window.__okurioSpeakCount);
    await page.waitForTimeout(800);
    expect(await page.evaluate(() => window.__okurioSpeakCount)).toBe(konusma);

    await ara.getByRole("button", { name: "Sonraki bölüme geç" }).click();
    await expect(ara).toHaveCount(0);
    await expect(oynatici(page)).toHaveAttribute("data-playing", "1");
    await expect(bolumYazisi(page)).toContainText("2/3 bölüm");
    await oynatici(page).getByRole("button", { name: "Duraklat", exact: true }).click();

    // İkinci bölüm sonu: Mola ver oynatmayı durdurur ve konumu (3. bölüm başı) kaydeder.
    await bolumSonunaGetir(page);
    await expect(ara).toBeVisible({ timeout: 10000 });
    await ara.getByRole("button", { name: "Mola ver" }).click();
    await expect(ara).toHaveCount(0);
    await expect(oynatici(page)).toHaveAttribute("data-playing", "0");
    await expect(oynatici(page).locator("[data-okur-duyuru]")).toContainText("Mola verildi");
    const kayit = await page.evaluate(() => {
      const d = JSON.parse(localStorage.getItem("dinleti-durum-v1") || "{}");
      return d.ilerlemeler?.[d.sonKitap];
    });
    expect(kayit.sectionIndex).toBe(2);
    expect(kayit.wordIndex).toBe(0);
  });

  test("D: profil kapalıyken bölüm sonunda mevcut davranış sürer (otomatik sonraki bölüm)", async ({ page }) => {
    await hazirla(page, { yol: GUVEN_YOLU });
    await kendiMetniniAc(page, KISA_METIN);
    await bolumSonunaGetir(page);
    await expect(bolumYazisi(page)).toContainText("2/3 bölüm", { timeout: 10000 });
    await expect(oynatici(page)).toHaveAttribute("data-playing", "1");
    await expect(oynatici(page).locator("[data-bolum-arasi]")).toHaveCount(0);
  });

  test("E: prefers-reduced-motion açıkken okuyucu yumuşak kaydırma kullanmaz", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await hazirla(page);
    await kendiMetniniAc(page);
    expect(await metinKutusu(page).evaluate((el) => getComputedStyle(el).scrollBehavior)).toBe("auto");
    await metinKutusu(page).evaluate((el) => {
      window.__okurioScrollCagrilari = [];
      const asil = el.scrollTo.bind(el);
      el.scrollTo = (secenek) => { window.__okurioScrollCagrilari.push(secenek?.behavior ?? "yok"); asil(secenek); };
    });
    await oynatici(page).getByRole("button", { name: "Oynat", exact: true }).click();
    await expect.poll(() => metinKutusu(page).evaluate((el) => el.scrollTop), { timeout: 30000 }).toBeGreaterThan(40);
    await page.waitForTimeout(1500);
    const cagrilar = await page.evaluate(() => window.__okurioScrollCagrilari);
    expect(cagrilar).not.toContain("smooth");
    expect(await aktifGorunur(page)).toBe(true);
  });
});
