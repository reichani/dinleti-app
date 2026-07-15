const ACTIVE_SELECTOR = '[data-okuma-metin] [data-aktif="1"]';
const MIN_SCROLL_INTERVAL_MS = 1400;
const COMFORT_TOP_RATIO = 0.12;
const COMFORT_BOTTOM_RATIO = 0.82;
const MAX_SCROLL_LINE_MULTIPLIER = 1.25;
let lastScrollAt = 0;
let frame = 0;
let calmFlowFrame = 0;

function speechIsActuallyRunning() {
  try {
    return Boolean(window.speechSynthesis?.speaking && !window.speechSynthesis?.paused);
  } catch {
    return false;
  }
}

function isLongToken(text) {
  const value = (text || '').trim();
  return value.length > 24 || /^https?:\/\//i.test(value) || /\S+@\S+\.\S+/.test(value);
}

function normalizedLabel(element) {
  return (element?.textContent || '').replace(/\s+/g, ' ').trim();
}

export function markReadingTokens(root = document) {
  root.querySelectorAll('[data-okuma-metin] span').forEach((span) => {
    if (isLongToken(span.textContent)) span.dataset.uzunToken = '1';
    else delete span.dataset.uzunToken;
  });
}

export function scrollActiveWord(
  activeWord = document.querySelector(ACTIVE_SELECTOR),
  { force = false, now = Date.now() } = {},
) {
  if (!(activeWord instanceof HTMLElement)) return false;

  const readingText = activeWord.closest('[data-okuma-metin]');
  if (!(readingText instanceof HTMLElement)) return false;

  if (!force && !speechIsActuallyRunning()) return false;
  if (!force && now - lastScrollAt < MIN_SCROLL_INTERVAL_MS) return false;

  const containerRect = readingText.getBoundingClientRect();
  const wordRect = activeWord.getBoundingClientRect();
  const comfortTop = containerRect.top + containerRect.height * COMFORT_TOP_RATIO;
  const comfortBottom = containerRect.top + containerRect.height * COMFORT_BOTTOM_RATIO;

  if (wordRect.top >= comfortTop && wordRect.bottom <= comfortBottom) {
    if (readingText.scrollLeft !== 0) readingText.scrollLeft = 0;
    return true;
  }

  const style = window.getComputedStyle(readingText);
  const parsedLineHeight = Number.parseFloat(style.lineHeight);
  const parsedFontSize = Number.parseFloat(style.fontSize) || 18;
  const lineHeight = Number.isFinite(parsedLineHeight) ? parsedLineHeight : parsedFontSize * 1.8;
  const maxStep = lineHeight * MAX_SCROLL_LINE_MULTIPLIER;

  let delta = 0;
  if (wordRect.bottom > comfortBottom) {
    delta = Math.min(maxStep, wordRect.bottom - comfortBottom + lineHeight * 0.25);
  } else if (wordRect.top < comfortTop) {
    delta = -Math.min(maxStep, comfortTop - wordRect.top + lineHeight * 0.25);
  }

  if (Math.abs(delta) < 2) return true;

  const maxTop = Math.max(0, readingText.scrollHeight - readingText.clientHeight);
  const targetTop = Math.max(0, Math.min(maxTop, readingText.scrollTop + delta));
  readingText.scrollTo({ top: targetTop, left: 0, behavior: 'auto' });
  lastScrollAt = now;
  return true;
}

function focusSentenceIndicator(root = document) {
  return [...root.querySelectorAll('[data-mobile-stability] div')]
    .find((element) => /Odak modu:\s*cümle/i.test(normalizedLabel(element)));
}

function focusToggle(root = document) {
  return root.querySelector('[data-mobile-stability] button[aria-label="Odak modu"]');
}

export function ensureCalmReadingFlow(root = document) {
  const player = root.querySelector('[data-mobile-stability]');
  if (!(player instanceof HTMLElement)) return false;

  const indicator = focusSentenceIndicator(root);
  const toggle = focusToggle(root);
  if (indicator && toggle instanceof HTMLButtonElement) {
    player.dataset.personaFlow = 'calm-pending';
    toggle.click();
    return true;
  }

  const manualMode = player.querySelector('[data-okuma-modu="kendim"]');
  const manualSelected = manualMode instanceof HTMLElement
    && (manualMode.getAttribute('aria-pressed') === 'true'
      || /rgba\(232,\s*163,\s*61/i.test(manualMode.getAttribute('style') || '')
      || /Kendim Okuyorum:/i.test(normalizedLabel(player)));

  const readingText = player.querySelector('[data-okuma-metin]');
  if (manualSelected && readingText instanceof HTMLElement) {
    readingText.dataset.kullaniciKaydirma = '1';
    readingText.style.overflowY = 'auto';
    readingText.style.touchAction = 'pan-y';
  }

  player.dataset.personaFlow = 'calm';
  return false;
}

function scheduleCalmFlowGuard() {
  if (calmFlowFrame) cancelAnimationFrame(calmFlowFrame);
  calmFlowFrame = requestAnimationFrame(() => {
    calmFlowFrame = 0;
    ensureCalmReadingFlow();
  });
}

export function markInteractiveControls(root = document) {
  root.querySelectorAll('button').forEach((button) => {
    const label = normalizedLabel(button);

    if (label.includes('Takıldım') || label.includes('Bana oku')) {
      button.dataset.yardimOku = '1';
      button.setAttribute('aria-label', 'Takıldım, bana oku');
    }

    if (label.endsWith('Dinliyorum')) button.dataset.okumaModu = 'dinliyorum';
    if (label.endsWith('Birlikte Okuyorum')) button.dataset.okumaModu = 'birlikte';
    if (label.endsWith('Kendim Okuyorum')) button.dataset.okumaModu = 'kendim';

    if (button.dataset.okumaModu && button.dataset.calmFlowBound !== '1') {
      button.dataset.calmFlowBound = '1';
      button.addEventListener('click', scheduleCalmFlowGuard);
    }
  });
  markReadingTokens(root);
}

function scheduleRefresh({ forceScroll = false } = {}) {
  if (frame) cancelAnimationFrame(frame);
  frame = requestAnimationFrame(() => {
    frame = 0;
    markInteractiveControls();
    ensureCalmReadingFlow();
    scrollActiveWord(undefined, { force: forceScroll });
  });
}

export function installReadingMobileFixes() {
  markInteractiveControls();
  ensureCalmReadingFlow();

  const observer = new MutationObserver((mutations) => {
    const relevant = mutations.some((mutation) => {
      if (mutation.type === 'attributes') return mutation.attributeName === 'data-aktif';
      return mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0;
    });
    if (relevant) scheduleRefresh();
  });

  observer.observe(document.body, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ['data-aktif'],
  });

  const refreshLayout = () => scheduleRefresh({ forceScroll: true });
  window.addEventListener('resize', refreshLayout, { passive: true });
  window.addEventListener('orientationchange', refreshLayout, { passive: true });

  window.__okurioReadingFixes = {
    scrollActiveWord,
    markInteractiveControls,
    markReadingTokens,
    ensureCalmReadingFlow,
    refresh: scheduleRefresh,
    speechIsActuallyRunning,
    config: {
      minScrollIntervalMs: MIN_SCROLL_INTERVAL_MS,
      comfortTopRatio: COMFORT_TOP_RATIO,
      comfortBottomRatio: COMFORT_BOTTOM_RATIO,
      maxScrollLineMultiplier: MAX_SCROLL_LINE_MULTIPLIER,
    },
  };

  return () => {
    observer.disconnect();
    window.removeEventListener('resize', refreshLayout);
    window.removeEventListener('orientationchange', refreshLayout);
    if (frame) cancelAnimationFrame(frame);
    if (calmFlowFrame) cancelAnimationFrame(calmFlowFrame);
  };
}