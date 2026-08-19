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
const planName = document.getElementById("planName");
const quotaText = document.getElementById("quotaText");
const quotaNote = document.getElementById("quotaNote");
const smartReadButton = document.getElementById("smartRead");
const upgradeButton = document.getElementById("upgrade");
const schoolLoginButton = document.getElementById("schoolLogin");

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

async function renderPlan() {
  const [entitlement, usage] = await Promise.all([
    window.OkurioEntitlement.getEntitlement(),
    window.OkurioUsage.getUsage()
  ]);
  const names = {
    free: "Okurio Free",
    individual_premium: "Okurio Premium",
    school: "Okurio School",
    staff: "Okurio Staff"
  };
  planName.textContent = names[entitlement.plan] || "Okurio Free";
  if (entitlement.unlimited) {
    quotaText.textContent = "Sınırsız Smart Reading";
    smartReadButton.disabled = false;
    quotaNote.textContent = entitlement.plan === "school"
      ? "Premium erişimin okul lisansın tarafından sağlanıyor."
      : "Premium özelliklerin aktif.";
    return;
  }
  const limit = entitlement.smartReadsLimit ?? 10;
  const remaining = Math.max(0, limit - usage.used);
  quotaText.textContent = `${remaining} / ${limit} Smart Read kaldı`;
  smartReadButton.disabled = remaining === 0;
  quotaNote.textContent = remaining === 0
    ? "Bu ayki ücretsiz Smart Reading hakkını tamamladın. Temel okuma ayarların çalışmaya devam eder."
    : "Temel erişilebilirlik ayarların her zaman ücretsiz kalır.";
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

async function startSmartRead() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const result = await window.OkurioUsage.consumeSmartRead(tab?.url || "");
  await renderPlan();
  if (result.upgradeRequired) {
    quotaNote.textContent = "Ücretsiz kotan doldu. Premium veya okul lisansıyla sınırsız devam edebilirsin.";
    return;
  }
  if (tab?.id) {
    try {
      await chrome.tabs.sendMessage(tab.id, { type: "OKURIO_SMART_READ", entitlement: result.unlimited ? "unlimited" : "metered" });
    } catch {}
  }
}

chrome.storage.sync.get(DEFAULTS).then(renderValues);
renderPlan();

controls.enabled.addEventListener("change", () => save({ enabled: controls.enabled.checked }));
controls.fontFamily.addEventListener("change", () => save({ fontFamily: controls.fontFamily.value }));
controls.fontSize.addEventListener("input", () => save({ fontSize: Number(controls.fontSize.value) }));
controls.lineHeight.addEventListener("input", () => save({ lineHeight: Number(controls.lineHeight.value) }));
controls.letterSpacing.addEventListener("input", () => save({ letterSpacing: Number(controls.letterSpacing.value) }));
controls.focusLine.addEventListener("change", () => save({ focusLine: controls.focusLine.checked }));
controls.simplify.addEventListener("change", () => save({ simplify: controls.simplify.checked }));
themeButtons.forEach((button) => button.addEventListener("click", () => save({ theme: button.dataset.theme })));
smartReadButton.addEventListener("click", startSmartRead);
upgradeButton.addEventListener("click", () => {
  quotaNote.textContent = "Premium ödeme bağlantısı backend abonelik servisi bağlandığında burada açılacak.";
});
schoolLoginButton.addEventListener("click", () => {
  quotaNote.textContent = "Okul hesabı girişi auth servisi bağlandığında burada açılacak.";
});
document.getElementById("reset").addEventListener("click", async () => {
  await chrome.storage.sync.set(DEFAULTS);
  renderValues(DEFAULTS);
  await sendToActiveTab(DEFAULTS);
});
