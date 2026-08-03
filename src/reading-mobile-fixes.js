const ACTIVE_SELECTOR = '[data-okuma-metin] [data-aktif="1"]';
const MIN_SCROLL_INTERVAL_MS = 320;
const COMFORT_TOP_RATIO = 0.28;
const COMFORT_BOTTOM_RATIO = 0.68;
const TARGET_RATIO = 0.42;
const MANUAL_SCROLL_PAUSE_MS = 4200;
const MAX_SCROLL_VIEWPORT_RATIO = 0.45;
let lastScrollAt = 0;
let manualScrollUntil = 0;
let frame = 0;
let calmFlowFrame = 0;
let lastActiveWord = null;

function speechIsActuallyRunning() {
  try {
    return Boolean(window.speechSynthesis?.speaking && !window.speechSynthesis?.paused);
  } catch {
    return false;
  }
}

function normalizedLabel(element) {
  return (element?.textContent || '').replace(/\s+/g, ' ').trim();
}

function getPlayer(root = document) {
  return root.querySelector('[data-mobile-stability]');
}

function isManualMode(player = getPlayer()) {
  if (!(player instanceof HTMLElement)) return false;
  const manualMode = player.querySelector('[data-okuma-modu="kendim"]');
  return Boolean(
    (manualMode instanceof HTMLElement
      && (manualMode.getAttribute('aria-pressed') === 'true'
        || /rgba\(232,\s*163,\s*61/i.test(manualMode.getAttribute('style') || '')))
      || /Kendim Okuyorum:/i.test(normalizedLabel(player)),
  );
}

function playerIsRunning(player = getPlayer()) {
  if (!(player instanceof HTMLElement)) return false;
  if (speechIsActuallyRunning()) return true;

  const pauseControl = [...player.querySelectorAll('button')].find((button) => {
    const label = `${button.getAttribute('aria-label') || ''} ${normalizedLabel(button)}`;
    return /duraklat|pause/i.test(label);
  });
  return Boolean(pauseControl);
}

function isLongToken(text) {
  const value = (text || '').trim();
  return value.length > 24 || /^https?:\/\//i.test(value) || /\S+@\S+\.\S+/.test(value);
}

export function markReadingTokens(root = document) {
  root.querySelectorAll('[data-okuma-metin] span').forEach((span) => {
    if (isLongToken(span.textContent)) span.dataset.uzunToken = '1';
    else delete span.dataset.uzunToken;
  });
}

export function markActiveSentence(root = document) {
  const readingText = root.querySelector?.('[data-okuma-metin]') || root.closest?.('[data-okuma-metin]');
  if (!(readingText instanceof HTMLElement)) return false;

  const tokens = [...readingText.querySelectorAll(':scope > span')];
  tokens.forEach((token) => delete token.dataset.aktifCumle);
  const activeIndex = tokens.findIndex((token) => token.dataset.aktif === '1');
  if (activeIndex < 0) return false;

  let start = activeIndex;
  while (start > 0 && !/[.!?…][”"')\]]?\s*$/u.test(tokens[start - 1].textContent || '')) start -= 1;

  let end = activeIndex;
  while (end < tokens.length - 1 && !/[.!?…][”"')\]]?\s*$/u.test(tokens[end].textContent || '')) end += 1;

  for (let index = start; index <= end; index += 1) tokens[index].dataset.aktifCumle = '1';
  readingText.dataset.cumleTakibi = '1';
  return true;
}

function noteManualInteraction(event) {
  if (!event.isTrusted) return;
  manualScrollUntil = Date.now() + MANUAL_SCROLL_PAUSE_MS;
}

function bindReadingViewport(readingText) {
  if (!(readingText instanceof HTMLElement) || readingText.dataset.readerUxBound === '1') return;
  readingText.dataset.readerUxBound = '1';
  readingText.addEventListener('touchstart', noteManualInteraction, { passive: true });
  readingText.addEventListener('pointerdown', noteManualInteraction, { passive: true });
  readingText.addEventListener('wheel', noteManualInteraction, { passive: true });
}

export function scrollActiveWord(
  activeWord = document.querySelector(ACTIVE_SELECTOR),
  { force = false, now = Date.now() } = {},
) {
  if (!(activeWord instanceof HTMLElement)) return false;

  const readingText = activeWord.closest('[data-okuma-metin]');
  if (!(readingText instanceof HTMLElement)) return false;
  bindReadingViewport(readingText);

  const player = activeWord.closest('[data-mobile-stability]') || getPlayer();
  const pacedManualReading = isManualMode(player) && playerIsRunning(player);
  if (!force && !speechIsActuallyRunning() && !pacedManualReading) return false;
  if (!force && now < manualScrollUntil) return false;
  if (!force && now - lastScrollAt < MIN_SCROLL_INTERVAL_MS) return false;

  const containerRect = readingText.getBoundingClientRect();
  const wordRect = activeWord.getBoundingClientRect();
  const comfortTop = containerRect.top + containerRect.height * COMFORT_TOP_RATIO;
  const comfortBottom = containerRect.top + containerRect.height * COMFORT_BOTTOM_RATIO;

  if (wordRect.top >= comfortTop && wordRect.bottom <= comfortBottom) {
    if (readingText.scrollLeft !== 0) readingText.scrollLeft = 0;
    lastActiveWord = activeWord;
    return true;
  }

  const targetY = containerRect.top + containerRect.height * TARGET_RATIO;
  const wordCenter = wordRect.top + wordRect.height / 2;
  const rawDelta = wordCenter - targetY;
  const maxStep = Math.max(48, containerRect.height * MAX_SCROLL_VIEWPORT_RATIO);
  const delta = Math.max(-maxStep, Math.min(maxStep, rawDelta));

  if (Math.abs(delta) < 2) return true;

  const maxTop = Math.max(0, readingText.scrollHeight - readingText.clientHeight);
  const targetTop = Math.max(0, Math.min(maxTop, readingText.scrollTop + delta));
  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  readingText.scrollTo({
    top: targetTop,
    left: 0,
    behavior: prefersReducedMotion || force ? 'auto' : 'smooth',
  });
  lastScrollAt = now;
  lastActiveWord = activeWord;
  return true;
}

export function ensureCalmReadingFlow(root = document) {
  const player = getPlayer(root);
  if (!(player instanceof HTMLElement)) return false;

  const readingText = player.querySelector('[data-okuma-metin]');
  if (readingText instanceof HTMLElement) {
    bindReadingViewport(readingText);
    readingText.dataset.kullaniciKaydirma = '1';
    readingText.dataset.akilliTakip = isManualMode(player) ? 'kendim' : 'sesli';
    readingText.style.overflowY = 'auto';
    readingText.style.touchAction = 'pan-y';
    readingText.style.overscrollBehavior = 'contain';
    readingText.style.scrollbarGutter = 'stable';
    markActiveSentence(readingText);
  }

  player.dataset.personaFlow = 'calm';
  return true;
}

function scheduleCalmFlowGuard() {
  if (calmFlowFrame) cancelAnimationFrame(calmFlowFrame);
  calmFlowFrame = requestAnimationFrame(() => {
    calmFlowFrame = 0;
    ensureCalmReadingFlow();
    window.setTimeout(() => scrollActiveWord(undefined, { force: true }), 80);
  });
}

export function markInteractiveControls(root = document) {
  root.querySelectorAll('button').forEach((button) => {
    const label = normalizedLabel(button);

    if (label.endsWith('Dinliyorum')) button.dataset.okumaModu = 'dinliyorum';
    if (label.endsWith('Birlikte Okuyorum')) button.dataset.okumaModu = 'birlikte';
    if (label.endsWith('Kendim Okuyorum')) button.dataset.okumaModu = 'kendim';

    if (button.dataset.okumaModu && button.dataset.calmFlowBound !== '1') {
      button.dataset.calmFlowBound = '1';
      button.addEventListener('click', scheduleCalmFlowGuard);
    }
  });
  markReadingTokens(root);
  markActiveSentence(root);
}

function scheduleRefresh({ forceScroll = false } = {}) {
  if (frame) cancelAnimationFrame(frame);
  frame = requestAnimationFrame(() => {
    frame = 0;
    markInteractiveControls();
    ensureCalmReadingFlow();
    const activeWord = document.querySelector(ACTIVE_SELECTOR);
    const activeChanged = activeWord !== lastActiveWord;
    scrollActiveWord(activeWord, { force: forceScroll || activeChanged });
  });
}

export function installReadingMobileFixes() {
  markInteractiveControls();
  ensureCalmReadingFlow();

  const observer = new MutationObserver((mutations) => {
    const relevant = mutations.some((mutation) => {
      if (mutation.type === 'attributes') {
        return mutation.attributeName === 'data-aktif'
          || mutation.attributeName === 'aria-pressed'
          || mutation.attributeName === 'style';
      }
      return mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0;
    });
    if (relevant) scheduleRefresh();
  });

  observer.observe(document.body, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ['data-aktif', 'aria-pressed', 'style'],
  });

  const refreshLayout = () => scheduleRefresh({ forceScroll: true });
  window.addEventListener('resize', refreshLayout, { passive: true });
  window.addEventListener('orientationchange', refreshLayout, { passive: true });

  window.__okurioReadingFixes = {
    scrollActiveWord,
    markInteractiveControls,
    markReadingTokens,
    markActiveSentence,
    ensureCalmReadingFlow,
    refresh: scheduleRefresh,
    speechIsActuallyRunning,
    isManualMode,
    playerIsRunning,
    config: {
      minScrollIntervalMs: MIN_SCROLL_INTERVAL_MS,
      comfortTopRatio: COMFORT_TOP_RATIO,
      comfortBottomRatio: COMFORT_BOTTOM_RATIO,
      targetRatio: TARGET_RATIO,
      manualScrollPauseMs: MANUAL_SCROLL_PAUSE_MS,
      maxScrollViewportRatio: MAX_SCROLL_VIEWPORT_RATIO,
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
