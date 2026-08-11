const MAX_TXT_BYTES = 5 * 1024 * 1024;

function setReactControlledValue(element, value) {
  const prototype = element instanceof HTMLTextAreaElement
    ? HTMLTextAreaElement.prototype
    : HTMLInputElement.prototype;
  const setter = Object.getOwnPropertyDescriptor(prototype, "value")?.set;
  if (!setter) return;
  setter.call(element, value);
  element.dispatchEvent(new Event("input", { bubbles: true }));
}

function ensureStatus(dialog) {
  let status = dialog.querySelector("[data-document-import-message]");
  if (status) return status;
  status = document.createElement("div");
  status.dataset.documentImportMessage = "1";
  status.setAttribute("aria-live", "polite");
  status.style.cssText = "color:#8B94A7;font-size:12px;line-height:1.45;margin-top:8px";
  const actions = dialog.querySelector("[data-kendi-metin-actions]");
  actions?.parentNode?.insertBefore(status, actions);
  return status;
}

function setStatus(dialog, message) {
  ensureStatus(dialog).textContent = message;
}

function enhanceLabels() {
  const card = document.querySelector("[data-kendi-metnim]");
  const cardButton = card?.querySelector(":scope > button");
  const strong = cardButton?.querySelector("strong");
  if (strong && strong.textContent !== "Kendi İçeriğini Ekle") strong.textContent = "Kendi İçeriğini Ekle";
  const subtitle = strong?.parentElement?.querySelector("span:not([aria-hidden])");
  if (subtitle) subtitle.textContent = "Dosya yükle veya metin yapıştır";

  const dialog = document.querySelector("[data-kendi-metin-dialog]");
  if (!dialog) return;
  const heading = dialog.querySelector("#kendi-metin-basligi");
  if (heading) heading.textContent = "Kendi İçeriğini Ekle";
  const intro = heading?.parentElement?.querySelector("div");
  if (intro) intro.textContent = "Dosyanı veya metnini önce önizle, sonra mevcut Okurio Reader’da aç.";

  const fileInput = dialog.querySelector('input[type="file"]');
  if (fileInput) {
    fileInput.accept = ".txt,text/plain,.docx,.pdf,.pptx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation";
    const label = fileInput.closest("label");
    if (label) {
      for (const node of label.childNodes) {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          node.textContent = "Dosya seç ";
          break;
        }
      }
    }
  }

  let hint = dialog.querySelector("[data-document-import-hint]");
  if (!hint) {
    hint = document.createElement("div");
    hint.dataset.documentImportHint = "1";
    hint.textContent = "TXT bu sürümde aktif. Word, PDF ve PowerPoint aynı güvenli içe aktarma hattının sonraki dilimidir.";
    hint.style.cssText = "color:#8B94A7;font-size:11px;line-height:1.45;margin-top:8px";
    dialog.querySelector("[data-kendi-metin-actions]")?.insertAdjacentElement("afterend", hint);
  }
}

async function handleFileSelection(event) {
  const input = event.target;
  if (!(input instanceof HTMLInputElement) || input.type !== "file" || !input.closest("[data-kendi-metin-dialog]")) return;

  // App.jsx'nin eski doğrudan-Reader handler'ının bu feature diliminde çalışmasını engelle.
  event.stopImmediatePropagation();
  event.preventDefault();

  const dialog = input.closest("[data-kendi-metin-dialog]");
  const file = input.files?.[0];
  if (!file) return;

  const lower = file.name.toLowerCase();
  if (lower.endsWith(".docx") || lower.endsWith(".pdf") || lower.endsWith(".pptx")) {
    setStatus(dialog, `${file.name}: format tanındı; güvenli metin çıkarma parser'ı henüz bu dilimde aktif değil. TXT ile devam edebilirsin.`);
    input.value = "";
    return;
  }

  if (!lower.endsWith(".txt") && !file.type.startsWith("text/")) {
    setStatus(dialog, "Desteklenmeyen dosya türü. Bu dilimde TXT seç.");
    input.value = "";
    return;
  }
  if (file.size > MAX_TXT_BYTES) {
    setStatus(dialog, "TXT dosyası 5 MB sınırını aşıyor. Daha küçük bir dosya seç.");
    input.value = "";
    return;
  }

  try {
    const text = (await file.text()).replace(/\r\n/g, "\n").trim();
    if (text.length < 20) {
      setStatus(dialog, "Dosyada okunabilir yeterli metin bulunamadı.");
      input.value = "";
      return;
    }
    const textarea = dialog.querySelector('textarea[aria-label="Kendi metnim"]');
    const title = dialog.querySelector('input[aria-label="Kendi metnim başlık"]');
    if (!textarea || !title) throw new Error("import-fields-missing");
    setReactControlledValue(title, file.name.replace(/\.txt$/i, ""));
    setReactControlledValue(textarea, text);
    setStatus(dialog, `${file.name} okumaya hazır. Önizlemeyi kontrol edip “Okuma moduna al”a dokun.`);
    textarea.focus({ preventScroll: true });
  } catch {
    setStatus(dialog, "Dosya okunamadı. Lütfen farklı bir TXT dosyası dene.");
  } finally {
    input.value = "";
  }
}

export function installDocumentImportEnhancer() {
  enhanceLabels();
  const observer = new MutationObserver(enhanceLabels);
  observer.observe(document.body, { childList: true, subtree: true });
  document.addEventListener("change", handleFileSelection, true);
  return () => {
    observer.disconnect();
    document.removeEventListener("change", handleFileSelection, true);
  };
}
