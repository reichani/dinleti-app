const OKURIO_PLAN_KEY = "okurio-entitlement-v1";

const PLAN_DEFAULTS = {
  free: { plan: "free", smartReadsLimit: 10, unlimited: false, premiumFeatures: false },
  individual_premium: { plan: "individual_premium", smartReadsLimit: null, unlimited: true, premiumFeatures: true },
  school: { plan: "school", smartReadsLimit: null, unlimited: true, premiumFeatures: true },
  staff: { plan: "staff", smartReadsLimit: null, unlimited: true, premiumFeatures: true }
};

const PREMIUM_FEATURES = new Set(["smart_read", "tts", "age_dictionary", "personal_profile", "reading_history"]);

function normalizePlan(raw = {}) {
  const base = PLAN_DEFAULTS[raw.plan] || PLAN_DEFAULTS.free;
  return { ...base, ...raw };
}

async function getEntitlement() {
  const stored = await chrome.storage.sync.get({ [OKURIO_PLAN_KEY]: PLAN_DEFAULTS.free });
  return normalizePlan(stored[OKURIO_PLAN_KEY]);
}

async function setEntitlement(entitlement) {
  const normalized = normalizePlan(entitlement);
  await chrome.storage.sync.set({ [OKURIO_PLAN_KEY]: normalized });
  return normalized;
}

async function canUse(feature, usage = null) {
  const entitlement = await getEntitlement();
  if (!PREMIUM_FEATURES.has(feature)) return { allowed: true, entitlement };
  if (entitlement.unlimited || entitlement.premiumFeatures) return { allowed: true, entitlement };
  if (feature === "smart_read") {
    const used = usage?.used || 0;
    const limit = entitlement.smartReadsLimit ?? 10;
    return { allowed: used < limit, entitlement, remaining: Math.max(0, limit - used) };
  }
  return { allowed: false, entitlement };
}

window.OkurioEntitlement = { getEntitlement, setEntitlement, canUse, PLAN_DEFAULTS };
