const MAX_FILE_BYTES = 12 * 1024 * 1024;
const MAX_TEXT_CHARS = 300_000;

export const SUPPORTED_DOCUMENT_ACCEPT = [
  ".txt",
  ".pdf",
  ".docx",
  "text/plain",
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
].join(",");

export class DocumentImportError extends Error {
  constructor(code, message) {
    super(message);
    this.name = "DocumentImportError";
    this.code = code;
  }
}

function extensionOf(name = "") {
  const match = name.toLowerCase().match(/\.([a-z0-9]+)$/);
  return match?.[1] || "";
}

export function detectDocumentType(file) {
  const extension = extensionOf(file?.name);
  const mime = String(file?.type || "").toLowerCase();
  if (extension === "pdf" || mime === "application/pdf") return "pdf";
  if (
    extension === "docx" ||
    mime === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) return "docx";
  if (extension === "txt" || mime.startsWith("text/")) return "txt";
  if (extension === "doc") {
    throw new DocumentImportError("legacy-word", "Eski .doc biçimi desteklenmiyor. Belgeyi Word'de .docx olarak kaydet.");
  }
  throw new DocumentImportError("unsupported", "Yalnızca PDF, Word (.docx) veya TXT dosyası seç.");
}

export function normalizeDocumentText(value) {
  return String(value || "")
    .replace(/\r\n?/g, "\n")
    .replace(/[\t\f\v]+/g, " ")
    .replace(/[ ]{2,}/g, " ")
    .replace(/ *\n */g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function validateExtractedText(text) {
  const normalized = normalizeDocumentText(text);
  if (normalized.length < 20) {
    throw new DocumentImportError(
      "no-readable-text",
      "Belgede okunabilir metin bulunamadı. Taranmış/görüntü PDF'leri bu sürümde OCR gerektirir.",
    );
  }
  if (normalized.length > MAX_TEXT_CHARS) {
    throw new DocumentImportError("text-too-long", "Belge çok uzun. En fazla 300.000 karakterlik bir bölüm yükle.");
  }
  return normalized;
}

function pdfPageText(items) {
  let result = "";
  for (const item of items) {
    if (!item || typeof item.str !== "string") continue;
    result += item.str;
    result += item.hasEOL ? "\n" : " ";
  }
  const lines = result.trim().split("\n");
  if (/^\d{1,4}$/.test(lines[0]?.trim())) lines.shift();
  if (/^\d{1,4}$/.test(lines.at(-1)?.trim())) lines.pop();
  return lines.join("\n").trim();
}

async function extractPdf(arrayBuffer, pdfLoader) {
  const pdfjs = pdfLoader ? await pdfLoader() : await import("pdfjs-dist/legacy/build/pdf.mjs");
  if (!pdfLoader && pdfjs.GlobalWorkerOptions && !pdfjs.GlobalWorkerOptions.workerSrc) {
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
      import.meta.url,
    ).toString();
  }
  let document;
  try {
    document = await pdfjs.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
    const pages = [];
    for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
      const page = await document.getPage(pageNumber);
      const content = await page.getTextContent();
      const pageText = pdfPageText(content.items);
      if (pageText) pages.push(pageText);
      page.cleanup?.();
    }
    return pages.join("\n\n");
  } catch (error) {
    if (error?.name === "PasswordException") {
      throw new DocumentImportError("password-protected", "Şifreli PDF açılamıyor. Şifreyi kaldırıp yeniden yükle.");
    }
    throw new DocumentImportError("invalid-pdf", "PDF okunamadı. Dosyanın bozuk veya yalnızca görüntü olmadığını kontrol et.");
  } finally {
    await document?.destroy?.();
  }
}

async function extractDocx(arrayBuffer, docxLoader) {
  try {
    const module = docxLoader ? await docxLoader() : await import("mammoth/mammoth.browser.js");
    const mammoth = module.default || module;
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  } catch {
    throw new DocumentImportError("invalid-docx", "Word belgesi okunamadı. Dosyayı .docx biçiminde yeniden kaydet.");
  }
}

export async function extractDocumentText(file, { pdfLoader, docxLoader } = {}) {
  if (!file) throw new DocumentImportError("missing-file", "Önce bir dosya seç.");
  if (Number(file.size || 0) > MAX_FILE_BYTES) {
    throw new DocumentImportError("file-too-large", "Dosya çok büyük. En fazla 12 MB yükleyebilirsin.");
  }

  const type = detectDocumentType(file);
  let text;
  if (type === "txt") text = await file.text();
  else {
    const arrayBuffer = await file.arrayBuffer();
    text = type === "pdf"
      ? await extractPdf(arrayBuffer, pdfLoader)
      : await extractDocx(arrayBuffer, docxLoader);
  }

  return {
    type,
    title: file.name.replace(/\.(txt|pdf|docx)$/i, ""),
    text: validateExtractedText(text),
  };
}

export const DOCUMENT_IMPORT_LIMITS = Object.freeze({
  maxFileBytes: MAX_FILE_BYTES,
  maxTextChars: MAX_TEXT_CHARS,
});
