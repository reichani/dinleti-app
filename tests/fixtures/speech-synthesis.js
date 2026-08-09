export function installSpeechSynthesisMock(page, scenario = "normal") {
  return page.addInitScript(({ scenario }) => {
    let timer = null;
    let paused = false;
    let current = null;
    let index = 0;
    class MockUtterance {
      constructor(text) { this.text = text; this.rate = 1; this.pitch = 1; }
    }
    const stop = () => { if (timer) clearInterval(timer); timer = null; };
    const tick = () => {
      if (!current || paused) return;
      if (scenario === "silent-stop" && index >= 12) { stop(); return; }
      const charIndex = scenario === "repeated-zero" ? 0 : index;
      if (scenario !== "no-boundary") {
        current.onboundary?.({ name: "word", charIndex, charLength: 1, elapsedTime: index * 50 });
      }
      index += 1;
      if (index >= current.text.length) { stop(); current.onend?.(); }
    };
    window.SpeechSynthesisUtterance = MockUtterance;
    Object.defineProperty(window, "speechSynthesis", { configurable: true, value: {
      speak(utterance) { stop(); current = utterance; index = 0; paused = false; timer = setInterval(tick, 50); },
      cancel() { stop(); current = null; index = 0; },
      pause() { paused = true; },
      resume() { paused = false; },
      getVoices() { return [{ name: "Mock Turkish", lang: "tr-TR", default: true }]; },
      get paused() { return paused; },
      get speaking() { return Boolean(current && timer); }
    }});
  }, { scenario });
}
