const USAGE_KEY = "okurio-smart-read-usage-v1";
const SESSION_WINDOW_MS = 30 * 60 * 1000;

function monthKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

async function getUsage() {
  const currentMonth = monthKey();
  const stored = await chrome.storage.local.get({ [USAGE_KEY]: { month: currentMonth, used: 0, sessions: {} } });
  const usage = stored[USAGE_KEY];
  if (usage.month !== currentMonth) {
    const reset = { month: currentMonth, used: 0, sessions: {} };
    await chrome.storage.local.set({ [USAGE_KEY]: reset });
    return reset;
  }
  return usage;
}

async function consumeSmartRead(url, now = Date.now()) {
  const usage = await getUsage();
  const normalizedUrl = String(url || "").split("#")[0];
  const last = usage.sessions[normalizedUrl] || 0;
  if (normalizedUrl && now - last < SESSION_WINDOW_MS) {
    return { ...usage, counted: false };
  }

  const access = await window.OkurioEntitlement.canUse("smart_read", usage);
  if (!access.allowed) return { ...usage, counted: false, upgradeRequired: true };

  if (access.entitlement.unlimited) return { ...usage, counted: false, unlimited: true };

  const next = {
    ...usage,
    used: usage.used + 1,
    sessions: { ...usage.sessions, [normalizedUrl]: now }
  };
  await chrome.storage.local.set({ [USAGE_KEY]: next });
  return { ...next, counted: true, remaining: Math.max(0, (access.entitlement.smartReadsLimit ?? 10) - next.used) };
}

window.OkurioUsage = { getUsage, consumeSmartRead, monthKey };
