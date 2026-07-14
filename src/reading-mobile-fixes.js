const ACTIVE_SELECTOR = '[data-okuma-metin] [data-aktif="1"]';

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

export function scrollActiveWord(activeWord = document.querySelector(ACTIVE_SELECTOR)) {
  if (!(activeWord instanceof HTMLElement)) return false;

  const readingText = activeWord.closest('[data-okuma-metin]');
  if (!(readingText instanceof HTMLElement)) return false;

  const containerRect = readingText.getBoundingClientRect();
  const wordRect = activeWord.getBoundingClientRect();
  const comfortTop = containerRect.top + containerRect.height * 0.22;
  const comfortBottom = containerRect.bottom - containerRect.height * 0.22;

  if (wordRect.top >= comfortTop && wordRect.bottom <= comfortBottom) return true;

  activeWord.scrollIntoView({
    block: 'center',
    inline: 'nearest',
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  });
  return true;
}

function markInteractiveControls(root = document) {
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
function scheduleRefresh() {
  if (frame) cancelAnimationFrame(frame);
  frame = requestAnimationFrame(() => {
    frame = 0;
    markInteractiveControls();
    scrollActiveWord();
  });
}

export function installReadingMobileFixes() {
  markInteractiveControls();
  scheduleRefresh();

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

  window.addEventListener('resize', scheduleRefresh, { passive: true });
  window.addEventListener('orientationchange', scheduleRefresh, { passive: true });

  window.__okurioReadingFixes = {
    scrollActiveWord,
    markInteractiveControls,
    refresh: scheduleRefresh,
  };

  return () => {
    observer.disconnect();
    window.removeEventListener('resize', scheduleRefresh);
    window.removeEventListener('orientationchange', scheduleRefresh);
    if (frame) cancelAnimationFrame(frame);
  };
}
