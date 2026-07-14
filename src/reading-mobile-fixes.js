const ACTIVE_SELECTOR = '[data-okuma-metin] [data-aktif="1"]';
const MIN_SCROLL_INTERVAL_MS = 650;
let lastScrollAt = 0;

function speechIsActuallyRunning() {
  try {
    return Boolean(window.speechSynthesis?.speaking && !window.speechSynthesis?.paused);
  } catch {
    return false;
  }
}

export function scrollActiveWord(
  activeWord = document.querySelector(ACTIVE_SELECTOR),
  { force = false, now = Date.now() } = {},
) {
  if (!(activeWord instanceof HTMLElement)) return false;

  const readingText = activeWord.closest('[data-okuma-metin]');
  if (!(readingText instanceof HTMLElement)) return false;

  // Kendim Okuyorum, duraklatılmış oynatıcı ve bölüm sonlarında React'in
  // tahmini kelime sayacı değişse bile ekran kendi kendine akmamalı.
  if (!force && !speechIsActuallyRunning()) return false;
  if (!force && now - lastScrollAt < MIN_SCROLL_INTERVAL_MS) return false;

  const containerRect = readingText.getBoundingClientRect();
  const wordRect = activeWord.getBoundingClientRect();
  const comfortTop = containerRect.top + containerRect.height * 0.24;
  const comfortBottom = containerRect.bottom - containerRect.height * 0.24;

  if (wordRect.top >= comfortTop && wordRect.bottom <= comfortBottom) return true;

  const wordCenterInsideContainer =
    activeWord.offsetTop + activeWord.offsetHeight / 2;
  const targetTop = Math.max(
    0,
    wordCenterInsideContainer - readingText.clientHeight / 2,
  );

  // scrollIntoView tüm üst kapsayıcıları da oynatıyordu. Yalnızca metin kartını
  // kaydırarak ekranın zıplamasını ve hızlı akış hissini engelliyoruz.
  readingText.scrollTo({ top: targetTop, behavior: 'auto' });
  lastScrollAt = now;
  return true;
}

export function markInteractiveControls(root = document) {
  root.querySelectorAll('button').forEach((button) => {
    const label = (button.textContent || '').replace(/\s+/g, ' ').trim();

    if (label.includes('Takıldım') || label.includes('Bana oku')) {
      button.dataset.yardimOku = '1';
      button.setAttribute('aria-label', 'Takıldım, bana oku');
    }

    if (label === 'Dinliyorum') button.dataset.okumaModu = 'dinliyorum';
    if (label === 'Birlikte Okuyorum') button.dataset.okumaModu = 'birlikte';
    if (label === 'Kendim Okuyorum') button.dataset.okumaModu = 'kendim';
  });
}

let frame = 0;
function scheduleRefresh({ forceScroll = false } = {}) {
  if (frame) cancelAnimationFrame(frame);
  frame = requestAnimationFrame(() => {
    frame = 0;
    markInteractiveControls();
    scrollActiveWord(undefined, { force: forceScroll });
  });
}

export function installReadingMobileFixes() {
  markInteractiveControls();

  const observer = new MutationObserver((mutations) => {
    const relevant = mutations.some((mutation) => {
      if (mutation.type === 'attributes') {
        return mutation.attributeName === 'data-aktif';
      }
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
    refresh: scheduleRefresh,
    speechIsActuallyRunning,
  };

  return () => {
    observer.disconnect();
    window.removeEventListener('resize', refreshLayout);
    window.removeEventListener('orientationchange', refreshLayout);
    if (frame) cancelAnimationFrame(frame);
  };
}
