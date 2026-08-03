const TIME_PATTERN = /^-?\d{1,2}:\d{2}(?::\d{2})?$/;
let lastSecond = null;
let syncing = false;

function parseTime(value) {
  const text = String(value || '').trim().replace(/^−/, '-');
  if (!TIME_PATTERN.test(text)) return null;
  const negative = text.startsWith('-');
  const parts = text.replace(/^-/, '').split(':').map(Number);
  const seconds = parts.length === 3
    ? parts[0] * 3600 + parts[1] * 60 + parts[2]
    : parts[0] * 60 + parts[1];
  return negative ? -seconds : seconds;
}

function normalizedLabel(element) {
  return (element?.textContent || '').replace(/\s+/g, ' ').trim();
}

function isSelfReading(player) {
  const button = player?.querySelector('[data-okuma-modu="kendim"]');
  return Boolean(
    button?.getAttribute('aria-pressed') === 'true'
    || /Kendim Okuyorum:/i.test(normalizedLabel(player)),
  );
}

function isRunning(player) {
  return [...(player?.querySelectorAll('button') || [])].some((button) =>
    /duraklat|pause/i.test(`${button.getAttribute('aria-label') || ''} ${normalizedLabel(button)}`),
  );
}

function readProgress(player) {
  const slider = player?.querySelector('[role="slider"][aria-label="İlerleme"]');
  if (!(slider instanceof HTMLElement)) return null;

  const nearby = slider.parentElement?.textContent || player.textContent || '';
  const matches = nearby.match(/-?\d{1,2}:\d{2}(?::\d{2})?/g) || [];
  const values = matches.map(parseTime).filter((value) => Number.isFinite(value));
  const elapsed = values.find((value) => value >= 0);
  const remaining = values.find((value) => value < 0);
  if (!Number.isFinite(elapsed) || !Number.isFinite(remaining)) return null;

  const total = elapsed + Math.abs(remaining);
  if (total <= 0) return null;
  return { slider, elapsed, ratio: Math.max(0, Math.min(1, elapsed / total)) };
}

function syncSelfReadingPosition() {
  if (syncing) return;
  const player = document.querySelector('[data-mobile-stability]');
  if (!(player instanceof HTMLElement) || !isSelfReading(player) || !isRunning(player)) return;

  const progress = readProgress(player);
  if (!progress || progress.elapsed === lastSecond) return;
  lastSecond = progress.elapsed;

  const rect = progress.slider.getBoundingClientRect();
  if (!rect.width) return;

  syncing = true;
  progress.slider.dispatchEvent(new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    clientX: rect.left + rect.width * progress.ratio,
    clientY: rect.top + rect.height / 2,
    view: window,
  }));
  window.requestAnimationFrame(() => {
    window.__okurioReadingFixes?.refresh?.({ forceScroll: true });
    syncing = false;
  });
}

export function installSelfReadingPositionSync() {
  const observer = new MutationObserver(syncSelfReadingPosition);
  observer.observe(document.body, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: ['aria-pressed', 'aria-valuenow'],
  });

  const interval = window.setInterval(syncSelfReadingPosition, 500);
  syncSelfReadingPosition();

  window.__okurioSelfReadingSync = { sync: syncSelfReadingPosition };
  return () => {
    observer.disconnect();
    window.clearInterval(interval);
  };
}
