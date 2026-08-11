import { test, expect } from "@playwright/test";

const DOCUMENTS = [
  ["ornek.docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  ["ornek.pdf", "application/pdf"],
  ["ornek.pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation"],
];

async function openOwnTextDialog(page) {
  await page.goto("/");
  await page.getByRole("button", { name: /Kendi metnini oku/i }).click();
  return page.getByRole("dialog", { name: /Kendi metnini oku/i });
}

test.describe("document import regression gate", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.__OKURIO_DOCUMENT_IMPORT_TEST_PARSER__ = async (file) =>
        `Belge içe aktarma doğrulaması: ${file.name}. Bu metin okuma moduna eksiksiz aktarılmalıdır.`;
    });
  });

  test("file picker advertises TXT, PDF, Word and PowerPoint", async ({ page }) => {
    const dialog = await openOwnTextDialog(page);
    const input = dialog.locator('input[type="file"]');
    await expect(input).toHaveAttribute("accept", /\.pdf/);
    await expect(input).toHaveAttribute("accept", /\.docx/);
    await expect(input).toHaveAttribute("accept", /\.pptx/);
    await expect(input).toHaveAttribute("aria-label", /TXT, PDF, Word veya PowerPoint/i);
    await expect(page.getByText(/TXT, PDF, Word, PowerPoint/i)).toBeVisible();
  });

  for (const [name, mimeType] of DOCUMENTS) {
    test(`${name.split(".").pop().toUpperCase()} selection enters the existing reader flow`, async ({ page }) => {
      const dialog = await openOwnTextDialog(page);
      const input = dialog.locator('input[type="file"]');
      await input.setInputFiles({ name, mimeType, buffer: Buffer.from("document-fixture") });

      await expect(dialog).toBeHidden();
      await expect(page.getByText(new RegExp(`Belge içe aktarma doğrulaması: ${name.replace(".", "\\.")}`, "i"))).toBeVisible();
    });
  }

  test("TXT keeps the native local-file path", async ({ page }) => {
    const dialog = await openOwnTextDialog(page);
    const input = dialog.locator('input[type="file"]');
    await input.setInputFiles({
      name: "ornek.txt",
      mimeType: "text/plain",
      buffer: Buffer.from("TXT yerel okuma doğrulaması. Dinleti bu metni doğrudan okuyucuya alır."),
    });

    await expect(dialog).toBeHidden();
    await expect(page.getByText(/TXT yerel okuma doğrulaması/i)).toBeVisible();
  });
});
