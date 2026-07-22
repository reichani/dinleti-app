const DEFAULTS = {
  enabled: true,
  fontFamily: "system",
  fontSize: 19,
  lineHeight: 1.7,
  letterSpacing: 0.03,
  theme: "cream",
  focusLine: false,
  simplify: false
};

const FONT_MAP = {
  system: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  arial: "Arial, sans-serif",
  verdana: "Verdana, sans-serif",
  georgia: "Georgia, serif"
};

let ruler;

function ensureRuler() {
  if (ruler) return ruler;
  ruler = document.createElement("div");
  ruler.id = "okurio-reading-ruler";
  ruler.setAttribute("aria-hidden", "true");
  document.documentElement.appendChild(ruler);
  window.addEventListener("mousemove", (event) => {
    ruler.style.transform = `translateY(${Math.max(0, event.clientY - 22)}px)`;
  }, { passive: true });
  return ruler;
}

function apply(settings) {
  const root = document.documentElement;
  const active = Boolean(settings.enabled);
  root.classList.toggle("okurio-enabled", active);
  root.classList.toggle("okurio-simplify", active && settings.simplify);
  root.dataset.okurioTheme = active ? settings.theme : "";
  root.style.setProperty("--okurio-font-family", FONT_MAP[settings.fontFamily] || FONT_MAP.system);
  root.style.setProperty("--okurio-font-size", `${settings.fontSize}px`);
  root.style.setProperty("--okurio-line-height", String(settings.lineHeight));
  root.style.setProperty("--okurio-letter-spacing", `${settings.letterSpacing}em`);

  const readingRuler = ensureRuler();
  readingRuler.hidden = !(active && settings.focusLine);
}

chrome.storage.sync.get(DEFAULTS).then(apply);
chrome.runtime.onMessage.addListener((message) => {
  if (message?.type === "OKURIO_SETTINGS") apply({ ...DEFAULTS, ...message.settings });
});
