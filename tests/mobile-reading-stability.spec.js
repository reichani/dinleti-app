import { test, expect } from "@playwright/test";

test.describe("Sprint 4 mobil okuma stabilitesi", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForFunction(() => Boolean(window.__okurioReadingFixes));
  });

  test("aktif kelime yalnızca metin kartının içinde merkeze kaydırılır", async ({ page }) => {
    const result = await page.evaluate(() => {
      const area = document.createElement("div");
      area.setAttribute("data-okuma-metin", "1");
      area.style.height = "120px";
      area.style.overflowY = "auto";
      area.innerHTML = `<div style="height:420px"></div><span data-aktif="1">aktif kelime</span><div style="height:200px"></div>`;
      document.body.appendChild(area);

      const active = area.querySelector('[data-aktif="1"]');
      let options = null;
      area.scrollTo = (received) => { options = received; };
      const scrolled = window.__okurioReadingFixes.scrollActiveWord(active, { force: true, now: 1000 });
      area.remove();
      return { scrolled, options };
    });

    expect(result.scrolled).toBe(true);
    expect(result.options.behavior).toBe("auto");
    expect(result.options.top).toBeGreaterThanOrEqual(0);
    expect(result.options.left).toBe(0);
  });

  test("ses çalışmıyorsa otomatik metin akışı yapılmaz", async ({ page }) => {
    const result = await page.evaluate(() => {
      const area = document.createElement("div");
      area.setAttribute("data-okuma-metin", "1");
      area.style.height = "100px";
      area.innerHTML = `<div style="height:300px"></div><span data-aktif="1">kelime</span>`;
      document.body.appendChild(area);
      const active = area.querySelector('[data-aktif="1"]');
      let callCount = 0;
      area.scrollTo = () => { callCount += 1; };
      const scrolled = window.__okurioReadingFixes.scrollActiveWord(active, { now: 2000 });
      area.remove();
      return { scrolled, callCount };
    });

    expect(result.scrolled).toBe(false);
    expect(result.callCount).toBe(0);
  });

  test("normal kelimeler doğal satır kırar, heceleme kapalı kalır", async ({ page }) => {
    const styles = await page.evaluate(() => {
      const text = document.createElement("div");
      text.setAttribute("data-okuma-metin", "1");
      const word = document.createElement("span");
      word.textContent = "Director-Level";
      text.appendChild(word);
      document.body.appendChild(text);
      const textStyle = getComputedStyle(text);
      const wordStyle = getComputedStyle(word);
      const result = {
        hyphens: textStyle.hyphens,
        wordBreak: wordStyle.wordBreak,
        whiteSpace: wordStyle.whiteSpace,
        overflowWrap: wordStyle.overflowWrap,
      };
      text.remove();
      return result;
    });

    expect(styles.hyphens).toBe("none");
    expect(styles.wordBreak).toBe("normal");
    expect(styles.whiteSpace).toBe("normal");
    expect(styles.overflowWrap).toBe("anywhere");
  });

  test("açılır seçicideki üç okuma modu mobilde kırpılmadan görünür kalır", async ({ page }) => {
    const styles = await page.evaluate(() => {
      const modes = document.createElement("div");
      modes.setAttribute("data-okuma-modlari", "1");
      modes.innerHTML = "<button>Dinliyorum</button><button>Birlikte Okuyorum</button><button>Kendim Okuyorum</button>";
      document.body.appendChild(modes);
      window.__okurioReadingFixes.markInteractiveControls(modes);
      const style = getComputedStyle(modes);
      const result = {
        maxHeight: style.maxHeight,
        overflowY: style.overflowY,
        modeCount: modes.querySelectorAll("[data-okuma-modu]").length,
      };
      modes.remove();
      return result;
    });

    expect(styles.maxHeight).toBe("none");
    expect(styles.overflowY).toBe("visible");
    expect(styles.modeCount).toBe(3);
  });

  test("kompakt mod seçicisi tek bir mod seçeneği gibi yeniden işaretlenmez", async ({ page }) => {
    const result = await page.evaluate(() => {
      const button = document.createElement("button");
      button.dataset.okumaModuKompakt = "1";
      button.textContent = "Mod: Kendim Okuyorum ▾";
      button.setAttribute("aria-label", "Okuma modu: Kendim Okuyorum");
      document.body.appendChild(button);
      window.__okurioReadingFixes.markInteractiveControls(document);
      const value = {
        concreteMode: button.dataset.okumaModu,
        label: button.getAttribute("aria-label"),
      };
      button.remove();
      return value;
    });

    expect(result.concreteMode).toBeUndefined();
    expect(result.label).toBe("Okuma modu: Kendim Okuyorum");
  });
});
