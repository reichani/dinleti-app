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

const ids = ["enabled", "fontFamily", "fontSize", "lineHeight", "letterSpacing", "focusLine", "simplify"];
const controls = Object.fromEntries(ids.map((id) => [id, document.getElementById(id)]));
const themeButtons = [...document.querySelectorAll("[data-theme]")];

function renderValues(settings) {
  controls.enabled.checked = settings.enabled;
  controls.fontFamily.value = settings.fontFamily;
  controls.fontSize.value = settings.fontSize;
  controls.lineHeight.value = settings.lineHeight;
  controls.letterSpacing.value = settings.letterSpacing;
  controls.focusLine.checked = settings.focusLine;
  controls.simplify.checked = settings.simplify;
  document.getElementById("fontSizeValue").textContent = `${settings.fontSize}px`;
  document.getElementById("lineHeightValue").textContent = settings.lineHeight;
  document.getElementById("letterSpacingValue").textContent = `${settings.letterSpacing}em`;
  themeButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.theme === settings.theme)));
}

async function sendToActiveTab(settings) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) return;
  try {
    await chrome.tabs.sendMessage(tab.id, { type: "OKURIO_SETTINGS", settings });
  } catch {
    // Browser internal pages do not accept content-script messages.
  }
}

async function save(patch) {
  const stored = await chrome.storage.sync.get(DEFAULTS);
  const settings = { ...stored, ...patch };
  await chrome.storage.sync.set(settings);
  renderValues(settings);
  await sendToActiveTab(settings);
}

chrome.storage.sync.get(DEFAULTS).then(renderValues);

controls.enabled.addEventListener("change", () => save({ enabled: controls.enabled.checked }));
controls.fontFamily.addEventListener("change", () => save({ fontFamily: controls.fontFamily.value }));
controls.fontSize.addEventListener("input", () => save({ fontSize: Number(controls.fontSize.value) }));
controls.lineHeight.addEventListener("input", () => save({ lineHeight: Number(controls.lineHeight.value) }));
controls.letterSpacing.addEventListener("input", () => save({ letterSpacing: Number(controls.letterSpacing.value) }));
controls.focusLine.addEventListener("change", () => save({ focusLine: controls.focusLine.checked }));
controls.simplify.addEventListener("change", () => save({ simplify: controls.simplify.checked }));
themeButtons.forEach((button) => button.addEventListener("click", () => save({ theme: button.dataset.theme })));
document.getElementById("reset").addEventListener("click", async () => {
  await chrome.storage.sync.set(DEFAULTS);
  renderValues(DEFAULTS);
  await sendToActiveTab(DEFAULTS);
});
