import { test, expect } from "@playwright/test";

test.describe("Sprint 3 mobil okuma stabilitesi", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForFunction(() => Boolean(window.__okurioReadingFixes));
  });

  test("aktif kelime görünür alan dışındaysa merkeze kaydırılır", async ({ page }) => {
    const result = await page.evaluate(() => {
      const area = document.createElement("div");
      area.setAttribute("data-okuma-metin", "1");
      area.style.height = "120px";
      area.style.overflowY = "auto";
      area.innerHTML = `<div style="height:420px"></div><span data-aktif="1">aktif kelime</span><div style="height:200px"></div>`;
      document.body.appendChild(area);

      const active = area.querySelector('[data-aktif="1"]');
      let options = null;
      active.scrollIntoView = (received) => { options = received; };
      const scrolled = window.__okurioReadingFixes.scrollActiveWord(active);
      area.remove();
      return { scrolled, options };
    });

    expect(result.scrolled).toBe(true);
    expect(result.options.block).toBe("center");
    expect(result.options.inline).toBe("nearest");
  });

  test("kelimeler satır içinde bölünmez ve otomatik heceleme kapalıdır", async ({ page }) => {
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
        wordBreak: textStyle.wordBreak,
        whiteSpace: wordStyle.whiteSpace,
      };
      text.remove();
      return result;
    });

    expect(styles.hyphens).toBe("none");
    expect(styles.wordBreak).toBe("normal");
    expect(styles.whiteSpace).toBe("nowrap");
  });

  test("üç okuma modu mobilde kırpılmadan görünür kalır", async ({ page }) => {
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

  test("Takıldım butonu erişilebilir yardım kontrolü olarak işaretlenir", async ({ page }) => {
    const result = await page.evaluate(() => {
      const button = document.createElement("button");
      button.textContent = "Takıldım · Bana oku";
      document.body.appendChild(button);
      window.__okurioReadingFixes.markInteractiveControls(document);
      const value = {
        marker: button.dataset.yardimOku,
        label: button.getAttribute("aria-label"),
        minHeight: getComputedStyle(button).minHeight,
      };
      button.remove();
      return value;
    });

    expect(result.marker).toBe("1");
    expect(result.label).toBe("Takıldım, bana oku");
    expect(parseFloat(result.minHeight)).toBeGreaterThanOrEqual(48);
  });
});