import { findGlossaryEntry } from "./content/pilotCatalogAdapter.js";

const CARD_ID = "okurio-kelime-yardimi";

function closeCard() {
  document.getElementById(CARD_ID)?.remove();
}

function pronounce(word) {
  if (!("speechSynthesis" in window) || !word) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "tr-TR";
  utterance.rate = 0.82;
  window.speechSynthesis.speak(utterance);
}

function showCard(entry, anchor) {
  closeCard();
  const card = document.createElement("aside");
  card.id = CARD_ID;
  card.dataset.kelimeAnlamiKarti = "1";
  card.setAttribute("role", "dialog");
  card.setAttribute("aria-live", "polite");
  card.setAttribute("aria-label", `${entry.word} kelime anlamı`);
  Object.assign(card.style, {
    position: "fixed",
    left: "50%",
    bottom: "calc(16px + env(safe-area-inset-bottom, 0px))",
    transform: "translateX(-50%)",
    width: "min(360px, calc(100vw - 28px))",
    zIndex: "80",
    boxSizing: "border-box",
    borderRadius: "16px",
    padding: "14px",
    background: "#FFF9E9",
    color: "#1F2933",
    boxShadow: "0 14px 40px rgba(0,0,0,.28)",
    fontFamily: "inherit",
  });

  const head = document.createElement("div");
  Object.assign(head.style, { display: "flex", justifyContent: "space-between", gap: "12px", alignItems: "flex-start" });
  const title = document.createElement("strong");
  title.textContent = entry.word;
  title.style.fontSize = "20px";
  const close = document.createElement("button");
  close.type = "button";
  close.textContent = "×";
  close.setAttribute("aria-label", "Kelime açıklamasını kapat");
  Object.assign(close.style, { minWidth: "44px", minHeight: "44px", border: "0", borderRadius: "12px", background: "rgba(31,41,51,.08)", fontSize: "24px", cursor: "pointer" });
  close.addEventListener("click", closeCard);
  head.append(title, close);

  const definition = document.createElement("p");
  definition.dataset.yasaUygunTanim = "1";
  definition.textContent = entry.definition;
  Object.assign(definition.style, { margin: "8px 0 12px", fontSize: "16px", lineHeight: "1.5" });

  const listen = document.createElement("button");
  listen.type = "button";
  listen.dataset.kelimeyiDinle = "1";
  listen.textContent = "🔊 Kelimeyi dinle";
  listen.setAttribute("aria-label", `${entry.word} kelimesini dinle`);
  Object.assign(listen.style, { minHeight: "44px", padding: "8px 12px", borderRadius: "12px", border: "1px solid rgba(31,41,51,.25)", background: "transparent", cursor: "pointer", fontWeight: "700" });
  listen.addEventListener("click", () => pronounce(entry.word));

  card.append(head, definition, listen);
  document.body.appendChild(card);
  close.focus();
  anchor?.setAttribute("aria-describedby", CARD_ID);
}

function onDocumentClick(event) {
  const word = event.target.closest?.("[data-okuma-metin] span");
  if (!word) return;
  const player = word.closest("[data-mobile-stability]");
  const storyId = player?.dataset.storyId;
  if (!storyId) return;
  const entry = findGlossaryEntry(storyId, word.textContent);
  if (!entry) return;
  event.preventDefault();
  showCard(entry, word);
}

function onKeyDown(event) {
  if (event.key === "Escape") closeCard();
}

export function installContextualWordHelp() {
  document.addEventListener("click", onDocumentClick);
  document.addEventListener("keydown", onKeyDown);
  window.__okurioWordHelp = { closeCard };
  return () => {
    document.removeEventListener("click", onDocumentClick);
    document.removeEventListener("keydown", onKeyDown);
    closeCard();
  };
}
