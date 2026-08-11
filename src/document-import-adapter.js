const SUPPORTED_EXTENSIONS = new Set(["txt", "pdf", "docx", "pptx"]);
const MAX_FILE_BYTES = 15 * 1024 * 1024;
const MAX_TEXT_CHARS = 500_000;
const PDF_MODULE_URL = "https://esm.sh/pdfjs-dist@4.10.38/legacy/build/pdf.mjs";
const PDF_WORKER_URL = "https://esm.sh/pdfjs-dist@4.10.38/legacy/build/pdf.worker.mjs";
const JSZIP_MODULE_URL = "https://esm.sh/jszip@3.10.1";

function extensionOf(name = "") {
  const match = String(name).toLowerCase().match(/\.([a-z0-9]+)$/);
  return match?.[1] || "";
}

function normalizeExtractedText(value) {
  return String(value || "")
    .replace(/\r\n?/g, "\n")
    .replace(/[\t\u00a0]+/g, " ")
    .replace(/[ ]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, MAX_TEXT_CHARS);
}

function xmlParagraphText(xml, paragraphTag, textTag) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(String(xml || ""), "application/xml");
  if (doc.querySelector("parsererror")) throw new Error("Belge XML içeriği okunamadı.");
  const paragraphs = [...doc.getElementsByTagName(paragraphTag)];
  if (paragraphs.length) {
    return paragraphs
      .map((paragraph) => [...paragraph.getElementsByTagName(textTag)].map((node) => node.textContent || "").join(" ").trim())
      .filter(Boolean)
      .join("\n");
  }
  return [...doc.getElementsByTagName(textTag)].map((node) => node.textContent || "").join(" ");
}

async function loadJsZip() {
  const module = await import(/* @vite-ignore */ JSZIP_MODULE_URL);
  return module.default || module;
}

async function extractDocx(file) {
  const JSZip = await loadJsZip();
  const zip = await JSZip.loadAsync(await file.arrayBuffer());
  const documentFile = zip.file("word/document.xml");
  if (!documentFile) throw new Error("Word belgesinde document.xml bulunamadı.");
  const xml = await documentFile.async("string");
  return normalizeExtractedText(xmlParagraphText(xml, "w:p", "w:t"));
}

function slideNumber(path) {
  return Number(path.match(/slide(\d+)\.xml$/)?.[1] || Number.MAX_SAFE_INTEGER);
}

async function extractPptx(file) {
  const JSZip = await loadJsZip();
  const zip = await JSZip.loadAsync(await file.arrayBuffer());
  const slidePaths = Object.keys(zip.files)
    .filter((path) => /^ppt\/slides\/slide\d+\.xml$/i.test(path))
    .sort((a, b) => slideNumber(a) - slideNumber(b));
  if (!slidePaths.length) throw new Error("PowerPoint belgesinde slayt metni bulunamadı.");
  const slides = [];
  for (const path of slidePaths) {
    const xml = await zip.file(path).async("string");
    const text = normalizeExtractedText(xmlParagraphText(xml, "a:p", "a:t"));
    if (text) slides.push(text);
  }
  return normalizeExtractedText(slides.join("\n\n"));
}

async function extractPdf(file) {
  const pdfjs = await import(/* @vite-ignore */ PDF_MODULE_URL);
  if (pdfjs.GlobalWorkerOptions) pdfjs.GlobalWorkerOptions.workerSrc = PDF_WORKER_URL;
  const task = pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) });
  const pdf = await task.promise;
  if (pdf.numPages > 200) throw new Error("PDF 200 sayfadan uzun; daha küçük bir dosya seç.");
  const pages = [];
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    const text = content.items.map((item) => item.str || "").join(" ");
    if (text.trim()) pages.push(text);
  }
  const result = normalizeExtractedText(pages.join("\n\n"));
  if (!result) throw new Error("Bu PDF'de seçilebilir metin bulunamadı. Taranmış PDF için OCR desteği gerekiyor.");
  return result;
}

export async function extractDocumentText(file) {
  if (!file) throw new Error("Dosya seçilmedi.");
  if (file.size > MAX_FILE_BYTES) throw new Error("Dosya en fazla 15 MB olabilir.");
  const extension = extensionOf(file.name);
  if (!SUPPORTED_EXTENSIONS.has(extension)) throw new Error("Desteklenen türler: TXT, PDF, DOCX ve PPTX.");

  if (typeof window !== "undefined" && typeof window.__OKURIO_DOCUMENT_IMPORT_TEST_PARSER__ === "function") {
    return normalizeExtractedText(await window.__OKURIO_DOCUMENT_IMPORT_TEST_PARSER__(file));
  }

  if (extension === "txt") return normalizeExtractedText(await file.text());
  if (extension === "docx") return extractDocx(file);
  if (extension === "pptx") return extractPptx(file);
  return extractPdf(file);
}

function setStatus(input, message) {
  const dialog = input.closest('[data-kendi-metin-dialog]');
  const live = dialog?.querySelector('[aria-live="polite"]');
  if (live) {
    live.textContent = message;
    live.dataset.documentImportStatus = "true";
  }
}

function patchImportUi(root = document) {
  const input = root.querySelector('input[type="file"][accept*=".txt"]');
  if (!input) return false;
  if (input.dataset.documentImportEnhanced === "true") return true;

  input.dataset.documentImportEnhanced = "true";
  input.accept = ".txt,.pdf,.docx,.pptx,text/plain,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation";
  input.setAttribute("aria-label", "Belge seç: TXT, PDF, Word veya PowerPoint");

  const label = input.closest("label");
  const textNode = label ? [...label.childNodes].find((node) => node.nodeType === Node.TEXT_NODE && /TXT seç/i.test(node.textContent || "")) : null;
  if (textNode) textNode.textContent = "Belge seç ";

  const card = root.querySelector("[data-kendi-metnim]");
  if (card) {
    const hint = [...card.querySelectorAll("span")].find((node) => /Kopyala-yapıştır veya TXT/.test(node.textContent || ""));
    if (hint) hint.textContent = "Kopyala-yapıştır veya TXT, PDF, Word, PowerPoint";
  }
  return true;
}

async function handleDocumentSelection(event) {
  const input = event.target;
  if (!(input instanceof HTMLInputElement) || input.type !== "file") return;
  const file = input.files?.[0];
  if (!file) return;
  const extension = extensionOf(file.name);
  if (extension === "txt") return;
  if (!SUPPORTED_EXTENSIONS.has(extension)) return;

  event.stopImmediatePropagation();
  setStatus(input, "Belge hazırlanıyor…");
  try {
    const text = await extractDocumentText(file);
    if (!text) throw new Error("Belgeden okunabilir metin çıkarılamadı.");
    const baseName = file.name.replace(/\.[^.]+$/, "") || "Kendi metnim";
    const textFile = new File([text], `${baseName}.txt`, { type: "text/plain", lastModified: file.lastModified || Date.now() });
    const transfer = new DataTransfer();
    transfer.items.add(textFile);
    input.files = transfer.files;
    setStatus(input, `${file.name} hazırlandı.`);
    input.dispatchEvent(new Event("change", { bubbles: true }));
  } catch (error) {
    input.value = "";
    setStatus(input, error?.message || "Belge okunamadı. Lütfen başka bir dosya dene.");
  }
}

export function installDocumentImportAdapter() {
  if (typeof document === "undefined" || window.__OKURIO_DOCUMENT_IMPORT_INSTALLED__) return;
  window.__OKURIO_DOCUMENT_IMPORT_INSTALLED__ = true;
  document.addEventListener("change", handleDocumentSelection, true);
  if (patchImportUi(document)) return;
  const observer = new MutationObserver(() => {
    if (patchImportUi(document)) observer.disconnect();
  });
  observer.observe(document.body, { childList: true, subtree: true });
}
