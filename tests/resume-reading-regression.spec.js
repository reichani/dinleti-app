import { test, expect } from "@playwright/test";

const READING_PATH = {
  secildi: true,
  yolId: "okuma_guveni_8_10",
  evreId: "paragraf",
  destekler: ["kelime_takibi", "odak", "genis_aralik", "yumusak_zemin", "kisa_hedef"],
};

const secondSectionWords = [
  ...Array.from({ length: 18 }, (_, index) => `once${index}${index === 17 ? "." : ""}`),
  "hedef18",
  "hedef19",
  "hedef20",
  "hedef21.",
  "sonraki22",
  "sonraki23",
];

const PERSONAL_BOOK = {
  id: "resume-regression-book",
  baslik: "Devam Test Kitabı",
  yazar: "Okurio Regression",
  seslendiren: "Oki Anlatıcı",
  kategori: "Kendi Metnim",
  yas: "8–10",
  renk: ["#3B465C", "#9FB3D7"],
  puan: 5,
  sureDk: 3,
  kullaniciIcerigi: true,
  ozet: "Kaldığın yerden devam et regresyon testi için kişisel metin.",
  bolumler: [
    {
      ad: "Birinci Bölüm",
      dk: 1,
      metin: "Bu ilk bölüm yalnızca başlangıç bağlamını temsil eder. Okur ikinci bölüme ilerlemiştir. Bu metin geri dönüş testinde aktif olmamalıdır.",
    },
    {
      ad: "İkinci Bölüm",
      dk: 2,
      metin: secondSectionWords.join(" "),
    },
  ],
};

const PERSONAL_METADATA = {
  yasMin: 8,
  yasMax: 10,
  segmentler: ["okuma_guveni"],
  okumaEvreleri: ["paragraf"],
  destekler: ["kelime_takibi", "odak", "genis_aralik", "yumusak_zemin"],
  icerikTuru: "kullanici_metni",
  subject: "kendi_metin",
  oql: 3,
};

async function seedResumeState(page) {
  await page.addInitScript(({ readingPath, book, metadata }) => {
    localStorage.clear();
    localStorage.setItem("dinleti:okurio-okuma-yolu-v1", JSON.stringify(readingPath));
    localStorage.setItem("okurio-okuma-yolu-v1", JSON.stringify(readingPath));
    localStorage.setItem("dinleti:dinleti-mod-v1", "cocuk");
    localStorage.setItem(
      "dinleti:okurio-kendi-icerik-v1",
      JSON.stringify([{ kitap: book, metadata, eklenmeZamani: Date.now() - 60_000 }]),
    );
    localStorage.setItem(
      "dinleti:dinleti-durum-v1",
      JSON.stringify({
        favoriler: [],
        hiz: 1,
        sonKitap: book.id,
        ilerlemeler: {
          [book.id]: {
            pos: 30,
            sectionIndex: 1,
            wordIndex: 18,
            storyId: book.id,
            ts: Date.now(),
            version: 2,
          },
        },
      }),
    );

    class FakeUtterance {
      constructor(text) {
        this.text = text;
      }
    }
    const spoken = [];
    Object.defineProperty(window, "SpeechSynthesisUtterance", { configurable: true, value: FakeUtterance });
    Object.defineProperty(window, "speechSynthesis", {
      configurable: true,
      value: {
        speaking: false,
        paused: false,
        cancel() {},
        getVoices() { return []; },
        addEventListener() {},
        removeEventListener() {},
        speak(utterance) { spoken.push(utterance.text); },
      },
    });
    window.__okurioResumeSpoken = spoken;
  }, { readingPath: READING_PATH, book: PERSONAL_BOOK, metadata: PERSONAL_METADATA });
}

test.describe("Kaldığın yerden devam et regresyonu", () => {
  test("v2 cursor reload sonrası aynı bölüm ve kelimeden devam eder", async ({ page }) => {
    await seedResumeState(page);
    await page.goto("/");

    const resumeLabel = page.getByText("Kaldığın yerden devam et", { exact: true });
    await expect(resumeLabel).toBeVisible();
    await expect(page.getByText("Devam Test Kitabı", { exact: true })).toBeVisible();

    await resumeLabel.click();

    const player = page.locator("[data-mobile-stability]");
    await expect(player).toBeVisible();
    const readingText = player.locator("[data-okuma-metin]");
    await expect(readingText).toContainText("hedef18");
    await expect(readingText).not.toContainText("Bu ilk bölüm yalnızca başlangıç bağlamını temsil eder");

    const activeWord = readingText.locator('[data-kelime-ix="18"][data-aktif="1"]');
    await expect(activeWord).toBeAttached();
    await expect(activeWord).toContainText("hedef18");

    await expect.poll(async () => page.evaluate(() => window.__okurioResumeSpoken?.[0] || "")).toMatch(/^hedef18\b/);
  });

  test("eski pos tabanlı kayıtlar için backward compatibility korunur", async ({ page }) => {
    await page.addInitScript(({ readingPath, book, metadata }) => {
      localStorage.clear();
      localStorage.setItem("dinleti:okurio-okuma-yolu-v1", JSON.stringify(readingPath));
      localStorage.setItem("okurio-okuma-yolu-v1", JSON.stringify(readingPath));
      localStorage.setItem("dinleti:dinleti-mod-v1", "cocuk");
      localStorage.setItem("dinleti:okurio-kendi-icerik-v1", JSON.stringify([{ kitap: book, metadata, eklenmeZamani: Date.now() }]));
      localStorage.setItem("dinleti:dinleti-durum-v1", JSON.stringify({
        favoriler: [],
        hiz: 1,
        sonKitap: book.id,
        ilerlemeler: { [book.id]: { pos: 30, ts: Date.now() } },
      }));
    }, { readingPath: READING_PATH, book: PERSONAL_BOOK, metadata: PERSONAL_METADATA });

    await page.goto("/");
    await expect(page.getByText("Kaldığın yerden devam et", { exact: true })).toBeVisible();
    await page.getByText("Kaldığın yerden devam et", { exact: true }).click();
    await expect(page.locator("[data-mobile-stability] [data-okuma-metin]")).toBeVisible();
  });
});
