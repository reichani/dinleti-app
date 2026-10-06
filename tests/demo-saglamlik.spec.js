import { test, expect } from "@playwright/test";
import { installSpeechSynthesisMock } from "./fixtures/speech-synthesis.js";

// v2.9.2 demo sağlamlık sözleşmesi:
//  - Diyalog replikleri (kaynak metindeki satır sonları) ekranda ayrı satırlarda görünür.
//  - Ses motoru hata verirse okuma sessizce donmaz: oynatıcı durur ve görünür uyarı çıkar.
//  - Çevrimiçi ses hata verirse cihazdaki yerel sesle aynı cümleden devam edilir.
//  - Masaüstünde "Birlikte Düşünelim" kartı metin kutusunun üstüne binmez.
const BOOK_ID = "mino-nerede-sahnesi";
const READING_PATH = { secildi: true, yolId: "ilk_cumleler_7_8", evreId: "kisa_cumle", destekler: ["kelime_takibi", "odak"] };

async function seed(page, { sectionIndex, wordIndex, pos }) {
  await page.addInitScript(({ readingPath, bookId, sectionIndex, wordIndex, pos }) => {
    if (sessionStorage.getItem("seeded")) return;
    sessionStorage.setItem("seeded", "1");
    localStorage.clear();
    localStorage.setItem("okurio-okuma-yolu-v1", JSON.stringify(readingPath));
    localStorage.setItem("dinleti-mod-v1", "cocuk");
    localStorage.setItem("dinleti-durum-v1", JSON.stringify({
      favoriler: [], hiz: 1, sonKitap: bookId,
      ilerlemeler: { [bookId]: { pos, sectionIndex, wordIndex, storyId: bookId, ts: Date.now(), version: 2 } },
    }));
  }, { readingPath: READING_PATH, bookId: BOOK_ID, sectionIndex, wordIndex, pos });
}

async function devamKartiniAc(page) {
  await page.goto("/");
  const resumeLabel = page.getByText("Kaldığın yerden devam et", { exact: true });
  await expect(resumeLabel).toBeVisible();
  await resumeLabel.locator("..").click();
  const player = page.locator("[data-mobile-stability]");
  await expect(player).toBeVisible();
  return player;
}

// Ses motoru taklidi: `failVoices` içindeki seslerle konuşma hata verir, diğerleri normal okur.
function installVoiceScenario(page, { voices, failVoices }) {
  return page.addInitScript(({ voices, failVoices }) => {
    let timer = null; let current = null; let index = 0;
    class MockUtterance { constructor(text) { this.text = text; this.voice = null; } }
    const stop = () => { if (timer) clearInterval(timer); timer = null; };
    window.__spokenVoices = [];
    window.SpeechSynthesisUtterance = MockUtterance;
    Object.defineProperty(window, "speechSynthesis", { configurable: true, value: {
      speak(u) {
        stop(); current = u; index = 0;
        const name = u.voice?.name || "(varsayılan)";
        window.__spokenVoices.push(name);
        if (failVoices.includes(name)) { setTimeout(() => u.onerror?.({ error: "synthesis-failed" }), 30); return; }
        timer = setInterval(() => {
          if (!current) return;
          current.onboundary?.({ name: "word", charIndex: index, charLength: 1, elapsedTime: index * 50 });
          index += 1;
          if (index >= current.text.length) { stop(); current.onend?.(); }
        }, 50);
      },
      cancel() { stop(); current = null; },
      pause() {}, resume() {},
      getVoices() { return voices; },
      addEventListener() {}, removeEventListener() {},
      get paused() { return false; },
      get speaking() { return Boolean(current && timer); },
    }});
  }, { voices, failVoices });
}

test("diyalog replikleri ayrı satırlarda görünür ve kelime indeksleri kesintisizdir", async ({ page }) => {
  await installSpeechSynthesisMock(page, "normal");
  await seed(page, { sectionIndex: 1, wordIndex: 0, pos: 121 });
  const player = await devamKartiniAc(page);
  const metin = player.locator("[data-okuma-metin]");
  await expect(metin).toContainText("Oki bahçeye baktı.");
  // Sahne 2: 8 satır → 7 satır sonu.
  await expect(metin.locator("[data-paragraf-sonu]")).toHaveCount(7);
  const durum = await metin.evaluate((el) => {
    const kelimeler = [...el.querySelectorAll("[data-kelime-ix]")];
    const indeksler = kelimeler.map((k) => Number(k.getAttribute("data-kelime-ix")));
    const bul = (yazi) => kelimeler.find((k) => k.textContent.trim() === yazi);
    return {
      kesintisiz: indeksler.every((v, i) => v === i),
      okiTop: bul("Oki:")?.getBoundingClientRect().top,
      baktiTop: bul("baktı.")?.getBoundingClientRect().top,
      okiLeft: bul("Oki:")?.getBoundingClientRect().left,
      ilkLeft: kelimeler[0].getBoundingClientRect().left,
    };
  });
  expect(durum.kesintisiz).toBe(true);
  // Satır sonu öğesi cümle vurgusuna karışmaz (aktif satırın üstünde boyalı şerit çıkmaz).
  await expect(metin.locator('[data-kelime-ix="5"][data-aktif-cumle="1"]')).toBeAttached({ timeout: 15000 });
  await expect(metin.locator("[data-paragraf-sonu][data-aktif-cumle]")).toHaveCount(0);
  await expect(metin.locator("span[data-paragraf-sonu]")).toHaveCount(0);
  expect(durum.okiTop).toBeGreaterThan(durum.baktiTop + 4); // "Oki:" yeni satırda
  expect(Math.abs(durum.okiLeft - durum.ilkLeft)).toBeLessThan(3); // satır başında
});

test("ses motoru hata verince oynatıcı durur ve görünür uyarı çıkar", async ({ page }) => {
  await installVoiceScenario(page, {
    voices: [{ name: "Yerel Türkçe", lang: "tr-TR", localService: true }],
    failVoices: ["Yerel Türkçe"],
  });
  await seed(page, { sectionIndex: 1, wordIndex: 0, pos: 121 });
  const player = await devamKartiniAc(page);
  const uyari = player.locator('[data-ses-uyarisi="hata"]');
  await expect(uyari).toBeVisible();
  await expect(uyari).toContainText("Ses motoru okumayı sürdüremedi");
  await expect(player).toHaveAttribute("data-playing", "0");
  await uyari.getByRole("button", { name: "Ses uyarısını kapat" }).click();
  await expect(uyari).toHaveCount(0);
});

test("çevrimiçi ses hata verince yerel sesle aynı yerden devam edilir", async ({ page }) => {
  await installVoiceScenario(page, {
    voices: [
      { name: "Çevrimiçi Natural Türkçe", lang: "tr-TR", localService: false },
      { name: "Yerel Türkçe", lang: "tr-TR", localService: true },
    ],
    failVoices: ["Çevrimiçi Natural Türkçe"],
  });
  await seed(page, { sectionIndex: 1, wordIndex: 0, pos: 121 });
  const player = await devamKartiniAc(page);
  await expect(player.locator('[data-ses-uyarisi="bilgi"]')).toContainText("cihazdaki sesle devam ediliyor");
  await expect(player).toHaveAttribute("data-playing", "1");
  // Okuma ilerliyor: ikinci cümlenin kelimesi aktif oluyor.
  await expect(player.locator('[data-kelime-ix="3"][data-aktif="1"], [data-kelime-ix="4"][data-aktif="1"], [data-kelime-ix="5"][data-aktif="1"]')).toBeAttached({ timeout: 15000 });
  const sesler = await page.evaluate(() => window.__spokenVoices);
  expect(sesler[0]).toBe("Çevrimiçi Natural Türkçe");
  expect(sesler[1]).toBe("Yerel Türkçe");
  await expect(player.locator('[data-ses-uyarisi="hata"]')).toHaveCount(0);
});

test("masaüstünde soru kartı metin kutusunun üstüne binmez", async ({ page }, testInfo) => {
  test.skip((page.viewportSize()?.width ?? 0) < 1000, "Yalnız iki sütunlu masaüstü yerleşimi");
  await installSpeechSynthesisMock(page, "normal");
  // Son sahnenin son kelimesinden başlat: okuma hemen biter ve kart açılır.
  await seed(page, { sectionIndex: 6, wordIndex: 9999, pos: 700 });
  const player = await devamKartiniAc(page);
  const kart = page.locator("[data-birlikte-dusunelim]");
  await expect(kart).toBeVisible({ timeout: 15000 });
  const kutu = await player.locator("[data-okuma-metin]").boundingBox();
  const k = await kart.boundingBox();
  const kesisim = k.x < kutu.x + kutu.width && k.x + k.width > kutu.x && k.y < kutu.y + kutu.height && k.y + k.height > kutu.y;
  expect(kesisim, `kart ${JSON.stringify(k)} metin ${JSON.stringify(kutu)}`).toBe(false);
});
