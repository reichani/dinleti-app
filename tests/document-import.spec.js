import { test, expect } from "@playwright/test";

const DOCUMENTS = [
  ["ornek.docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  ["ornek.pdf", "application/pdf"],
  ["ornek.pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation"],
];

const REAL_FIXTURES = {
  docx: "UEsDBBQAAAAIADooC109GYgd3QAAADYBAAARAAAAd29yZC9kb2N1bWVudC54bWxtjzFOxDAQRXtOMXJPHCgQipJswYqWBiTaWWc2a8UeW2OHkBPRsmcgByNZQQXN13x9zZs/9e7dO3gjSTZwo26KUgGxCZ3lvlEvz4/X9wpSRu7QBaZGzZTUrr2qp6oLZvTEGVYCp2pq1CnnWGmdzIk8piJE4jU7BvGYVyu9noJ0UYKhlNYD3unbsrzTHi2rdkUeQjdf2HFzsklu908Pr9CTfH3QAAdyPUGmlG1R6y3eVC4a/6wun4NlYyGiYC94hL1lR9lCGMZ5NOOMgENGWc5uOcu/QP3Taht+P26/AVBLAQIUAxQAAAAIADooC109GYgd3QAAADYBAAARAAAAAAAAAAAAAACAAQAAAAB3b3JkL2RvY3VtZW50LnhtbFBLBQYAAAAAAQABAD8AAAAMAQAAAAA=",
  pptx: "UEsDBBQAAAAIADooC11m7aea8gAAAJUBAAAVAAAAcHB0L3NsaWRlcy9zbGlkZTEueG1sjZDBSsQwEIbvPkXI3Wb1IFLaLnjwvGAFr0MzdkPTJGSmun0ir+4z2Acz6SqL4sHLR5Lh/+cj1fYwWvGCkYx3tbwqNlKg67w2rq/lY3t/eSsFMTgN1jus5Ywkt81FFUqyWqSwozLUcs8cSqWo2+MIVPiALs2efRyB0zX2KkQkdAycFo1WXW82N2oE4+RXCfynREd4TWY/8qtM92B1k6VCGxFPp0w+3Hk9NxWUISNmcLPbtU+ix/jxhoMgCzMLRmJTVCqPM+PK8Du5vA/GdUYQ8HKMwg/TPHXTDAIGhrgcbXr9q0WdVdTJTZ1l1be/Wn+1+QRQSwECFAMUAAAACAA6KAtdZu2nmvIAAACVAQAAFQAAAAAAAAAAAAAAgAEAAAAAcHB0L3NsaWRlcy9zbGlkZTEueG1sUEsFBgAAAAABAAEAQwAAACUBAAAAAA==",
  pdf: "JVBERi0xLjMKJZOMi54gUmVwb3J0TGFiIEdlbmVyYXRlZCBQREYgZG9jdW1lbnQgKG9wZW5zb3VyY2UpCjEgMCBvYmoKPDwKL0YxIDIgMCBSCj4+CmVuZG9iagoyIDAgb2JqCjw8Ci9CYXNlRm9udCAvSGVsdmV0aWNhIC9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nIC9OYW1lIC9GMSAvU3VidHlwZSAvVHlwZTEgL1R5cGUgL0ZvbnQKPj4KZW5kb2JqCjMgMCBvYmoKPDwKL0NvbnRlbnRzIDcgMCBSIC9NZWRpYUJveCBbIDAgMCA1OTUuMjc1NiA4NDEuODg5OCBdIC9QYXJlbnQgNiAwIFIgL1Jlc291cmNlcyA8PAovRm9udCAxIDAgUiAvUHJvY1NldCBbIC9QREYgL1RleHQgL0ltYWdlQiAvSW1hZ2VDIC9JbWFnZUkgXQo+PiAvUm90YXRlIDAgL1RyYW5zIDw8Cgo+PiAKICAvVHlwZSAvUGFnZQo+PgplbmRvYmoKNCAwIG9iago8PAovUGFnZU1vZGUgL1VzZU5vbmUgL1BhZ2VzIDYgMCBSIC9UeXBlIC9DYXRhbG9nCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9BdXRob3IgKGFub255bW91cykgL0NyZWF0aW9uRGF0ZSAoRDoyMDI2MDgxMTA1MDIwNyswMCcwMCcpIC9DcmVhdG9yIChhbm9ueW1vdXMpIC9LZXl3b3JkcyAoKSAvTW9kRGF0ZSAoRDoyMDI2MDgxMTA1MDIwNyswMCcwMCcpIC9Qcm9kdWNlciAoUmVwb3J0TGFiIFBERiBMaWJyYXJ5IC0gXChvcGVuc291cmNlXCkpIAogIC9TdWJqZWN0ICh1bnNwZWNpZmllZCkgL1RpdGxlICh1bnRpdGxlZCkgL1RyYXBwZWQgL0ZhbHNlCj4+CmVuZG9iago2IDAgb2JqCjw8Ci9Db3VudCAxIC9LaWRzIFsgMyAwIFIgXSAvVHlwZSAvUGFnZXMKPj4KZW5kb2JqCjcgMCBvYmoKPDwKL0ZpbHRlciBbIC9BU0NJSTg1RGVjb2RlIC9GbGF0ZURlY29kZSBdIC9MZW5ndGggMTcwCj4+CnN0cmVhbQpHYXI/KFltUz81JjRIRENgS1kqTERhUFlILG1haG0oQWUzc1olaHAoJk1BOHJybmE6YEpkYj0tXUpmdSJMIzIyRGk1QFNiIktLN106Z01aMSRbT0c2U1xBYzlUZiEkOkA8XylDTiJWXCtnYSVpMSxZUVIrJXQ5JD5zJ0YwJ11YLTVDLjJKQzBVPTIrbjtFVEE2WmNmRCdvdVRaNClMbkFVXUUlKDYvTyd+PmVuZHN0cmVhbQplbmRvYmoKeHJlZgowIDgKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDYxIDAwMDAwIG4gCjAwMDAwMDAwOTIgMDAwMDAgbiAKMDAwMDAwMDE5OSAwMDAwMCBuIAowMDAwMDAwNDAyIDAwMDAwIG4gCjAwMDAwMDA0NzAgMDAwMDAgbiAKMDAwMDAwMDczMSAwMDAwMCBuIAowMDAwMDAwNzkwIDAwMDAwIG4gCnRyYWlsZXIKPDwKL0lEIApbPDU1Yjk0MmEwZGQ2ODRmMTFiZTUyNGEwMmUzNGI2YzE4Pjw1NWI5NDJhMGRkNjg0ZjExYmU1MjRhMDJlMzRiNmMxOD5dCiUgUmVwb3J0TGFiIGdlbmVyYXRlZCBQREYgZG9jdW1lbnQgLS0gZGlnZXN0IChvcGVuc291cmNlKQoKL0luZm8gNSAwIFIKL1Jvb3QgNCAwIFIKL1NpemUgOAo+PgpzdGFydHhyZWYKMTA1MAolJUVPRgo=",
};

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

  test("real DOCX, PPTX and PDF parsers extract readable text", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chrome", "Parser smoke runs once; flow contract runs on the full device matrix.");
    const fixtures = [
      ["gercek.docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", REAL_FIXTURES.docx, /DOCX gerçek belge testi/i],
      ["gercek.pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation", REAL_FIXTURES.pptx, /PPTX gerçek slayt testi/i],
      ["gercek.pdf", "application/pdf", REAL_FIXTURES.pdf, /PDF gercek belge testi/i],
    ];

    for (const [name, mimeType, base64, expected] of fixtures) {
      const dialog = await openOwnTextDialog(page);
      await page.evaluate(() => { delete window.__OKURIO_DOCUMENT_IMPORT_TEST_PARSER__; });
      const input = dialog.locator('input[type="file"]');
      await input.setInputFiles({ name, mimeType, buffer: Buffer.from(base64, "base64") });
      await expect(dialog).toBeHidden({ timeout: 20_000 });
      await expect(page.getByText(expected)).toBeVisible({ timeout: 20_000 });
    }
  });
});
