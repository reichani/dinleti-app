import { OKURIO_POSITIONING } from "./product-strategy.js";

const REPLACEMENTS = new Map([
  ["Senkron kelime takibi", "Yaşa uygun okuma yolu"],
  ["Odak modu", "Türkçe kelime desteği"],
  ["Rahat okuma aralığı", "Seviyeye uygun içerik"],
  ["Kısa günlük hedef", "Kişiselleştirilmiş destek"],
]);

function textNodes(root = document.body) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  return nodes;
}

function replaceExactText(root = document.body) {
  for (const node of textNodes(root)) {
    const current = node.nodeValue?.trim();
    if (!current) continue;
    const next = REPLACEMENTS.get(current);
    if (next) node.nodeValue = node.nodeValue.replace(current, next);
  }
}

function updateHomePositioning() {
  const home = document.querySelector("[data-home-page]");
  if (!home) return;

  const title = [...home.querySelectorAll("div")].find((node) => node.textContent?.trim() === "Okurio");
  const subtitle = title?.nextElementSibling;
  if (subtitle) {
    const version = subtitle.querySelector("[data-surum]");
    const versionText = version?.textContent ?? "";
    const desired = `${OKURIO_POSITIONING.consumerLine}${versionText ? ` ${versionText}` : ""}`;
    if (subtitle.textContent?.replace(/\s+/gu, " ").trim() !== desired.replace(/\s+/gu, " ").trim()) {
      subtitle.replaceChildren(document.createTextNode(`${OKURIO_POSITIONING.consumerLine} `));
      if (version) subtitle.appendChild(version);
    }
  }

  home.dataset.productCategory = OKURIO_POSITIONING.category;
  home.dataset.positioning = "vertical-adaptive-reading-platform";
  replaceExactText(home);
}

export function installProductPositioningEnhancer() {
  updateHomePositioning();
  const observer = new MutationObserver(updateHomePositioning);
  observer.observe(document.body, { childList: true, subtree: true });
  return () => observer.disconnect();
}
