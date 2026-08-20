import assert from "node:assert/strict";
import test from "node:test";

import {
  detectDocumentType,
  DOCUMENT_IMPORT_LIMITS,
  DocumentImportError,
  extractDocumentText,
  normalizeDocumentText,
  SUPPORTED_DOCUMENT_ACCEPT,
} from "../../src/documentImport.js";

function file(name, type, body = "") {
  return new File([body], name, { type });
}

test("advertises PDF, DOCX and TXT without legacy DOC", () => {
  assert.match(SUPPORTED_DOCUMENT_ACCEPT, /\.pdf/);
  assert.match(SUPPORTED_DOCUMENT_ACCEPT, /\.docx/);
  assert.match(SUPPORTED_DOCUMENT_ACCEPT, /\.txt/);
  assert.doesNotMatch(SUPPORTED_DOCUMENT_ACCEPT, /(^|,)\.doc(,|$)/);
});

test("detects supported document types and rejects legacy Word", () => {
  assert.equal(detectDocumentType(file("paper.pdf", "")), "pdf");
  assert.equal(detectDocumentType(file("paper.docx", "")), "docx");
  assert.equal(detectDocumentType(file("notes.txt", "")), "txt");
  assert.throws(() => detectDocumentType(file("legacy.doc", "")), (error) => {
    assert.equal(error.code, "legacy-word");
    return true;
  });
});

test("normalizes whitespace but preserves paragraph boundaries", () => {
  assert.equal(normalizeDocumentText("Başlık\r\n\r\n  İlk   paragraf.\n\n\nİkinci."), "Başlık\n\nİlk paragraf.\n\nİkinci.");
});

test("extracts TXT for local preview", async () => {
  const result = await extractDocumentText(file("araştırma-notu.txt", "text/plain", "Başlık\n\nBu yeterince uzun bir araştırma notudur."));
  assert.equal(result.type, "txt");
  assert.equal(result.title, "araştırma-notu");
  assert.match(result.text, /araştırma notudur/);
});

test("extracts text PDF pages in reading order through PDF.js", async () => {
  const pages = [
    [{ str: "Bilimsel", hasEOL: false }, { str: "başlık", hasEOL: true }],
    [{ str: "İkinci sayfadaki yeterince uzun açıklama metni.", hasEOL: true }, { str: "2", hasEOL: true }],
  ];
  const result = await extractDocumentText(file("makale.pdf", "application/pdf", "fake"), {
    pdfLoader: async () => ({
      getDocument: () => ({
        promise: Promise.resolve({
          numPages: pages.length,
          getPage: async (pageNumber) => ({
            getTextContent: async () => ({ items: pages[pageNumber - 1] }),
            cleanup() {},
          }),
          async destroy() {},
        }),
      }),
    }),
  });
  assert.equal(result.type, "pdf");
  assert.match(result.text, /Bilimsel başlık/);
  assert.match(result.text, /İkinci sayfadaki/);
  assert.doesNotMatch(result.text, /\n2$/);
});

test("extracts DOCX text through Mammoth", async () => {
  const result = await extractDocumentText(file("çalışma.docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "fake"), {
    docxLoader: async () => ({
      extractRawText: async () => ({ value: "Çalışma başlığı\n\nBu Word belgesindeki yeterince uzun bilimsel özettir." }),
    }),
  });
  assert.equal(result.type, "docx");
  assert.equal(result.title, "çalışma");
  assert.match(result.text, /bilimsel özettir/);
});

test("rejects image-only documents with an OCR-specific message", async () => {
  await assert.rejects(
    extractDocumentText(file("scan.pdf", "application/pdf", "fake"), {
      pdfLoader: async () => ({
        getDocument: () => ({
          promise: Promise.resolve({
            numPages: 1,
            getPage: async () => ({ getTextContent: async () => ({ items: [] }) }),
            async destroy() {},
          }),
        }),
      }),
    }),
    (error) => error instanceof DocumentImportError && error.code === "no-readable-text" && /OCR/.test(error.message),
  );
});

test("fails closed for oversized uploads", async () => {
  const oversized = {
    name: "huge.pdf",
    type: "application/pdf",
    size: DOCUMENT_IMPORT_LIMITS.maxFileBytes + 1,
  };
  await assert.rejects(extractDocumentText(oversized), (error) => error.code === "file-too-large");
});
