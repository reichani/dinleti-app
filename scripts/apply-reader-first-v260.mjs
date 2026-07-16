import fs from 'node:fs';

const appPath = 'src/App.jsx';
let s = fs.readFileSync(appPath, 'utf8');
const before = s;

const replaceOnce = (from, to, label) => {
  if (!s.includes(from)) throw new Error(`App patch target missing: ${label}`);
  s = s.replace(from, to);
};

if (!s.includes('GlossaryCard')) {
  replaceOnce(
    'import { Play, Pause, RotateCcw, RotateCw, Heart, Search, Home, Library, ChevronDown, ChevronLeft, Moon, Gauge, ListMusic, Volume2, BookOpen, Clock, Type, AlignJustify, Focus, Flame } from "lucide-react";',
    'import { Play, Pause, RotateCcw, RotateCw, Heart, Search, Home, Library, ChevronDown, ChevronLeft, Moon, Gauge, ListMusic, Volume2, BookOpen, Clock, Type, AlignJustify, Focus, Flame } from "lucide-react";\nimport GlossaryCard from "./components/GlossaryCard.jsx";\nimport { findGlossaryEntry } from "./content/pilotCatalogAdapter.js";',
    'contextual dictionary imports',
  );
}

s = s.replace('const SURUM = "2.5.1";', 'const SURUM = "2.6.0";');
s = s.replace('data-mobile-stability="v2.5.1"', 'data-mobile-stability="v2.6.0" data-story-id={aktif.id}');

if (!s.includes('const [modPaneliAcik')) {
  replaceOnce(
    '  const [kendiMetinMesaji, setKendiMetinMesaji] = useState("");',
    '  const [kendiMetinMesaji, setKendiMetinMesaji] = useState("");\n  const [modPaneliAcik, setModPaneliAcik] = useState(false);\n  const [seciliSozluk, setSeciliSozluk] = useState(null);',
    'reader UI state',
  );
}

s = s.replace('    KATALOG.unshift(kitap);', '    if (!KATALOG.some((k) => k.id === id)) KATALOG.unshift(kitap);');
s = s.replace('{p > 10 ? `Devam et · ${sureYaz(p)}` : "Okumaya başla"}', '{p > 10 ? `Okumaya devam et · ${sureYaz(p)}` : "Okumaya başla"}');

if (!s.includes('const kelimeyiSeslendir')) {
  replaceOnce(
    '  const konusmaRef = useRef(null);',
    `  const kelimeyiSeslendir = useCallback((kelime) => {
    if (!kelime || !window.speechSynthesis || typeof window.SpeechSynthesisUtterance !== "function") return;
    window.speechSynthesis.cancel();
    const utterance = new window.SpeechSynthesisUtterance(kelime);
    utterance.lang = "tr-TR";
    utterance.rate = 0.86;
    window.speechSynthesis.speak(utterance);
  }, []);

  const konusmaRef = useRef(null);`,
    'word pronunciation callback',
  );
}

const oldWordBlock = `                      const temiz = k.replace(/[.,!?…;:]+$/u, "");
                       const son = k.slice(temiz.length);
                       const n = Math.max(1, Math.ceil(temiz.length * 0.45));
                       return <span key={gercekIx} data-aktif={aktifMi ? "1" : undefined} style={{
                         background: aktifMi ? (ayar.tema === "krem" ? "rgba(201,139,61,0.45)" : "rgba(232,163,61,0.35)") : "none",
                         borderRadius: 4, padding: aktifMi ? "0 2px" : 0,
                         color: aktifMi ? (ayar.tema === "krem" ? "#1A1510" : "#FFF3DC") : undefined,
                       }}>
                         {ayar.biyonik && temiz.length > 3 ? <><strong style={{ fontWeight: 850 }}>{temiz.slice(0, n)}</strong>{temiz.slice(n)}{son}</> : k}{" "}
                       </span>;`;

const newWordBlock = `                      const temiz = k.replace(/[.,!?…;:]+$/u, "");
                       const son = k.slice(temiz.length);
                       const n = Math.max(1, Math.ceil(temiz.length * 0.45));
                       const sozluk = findGlossaryEntry(aktif.id, temiz);
                       return <span
                         key={gercekIx}
                         data-aktif={aktifMi ? "1" : undefined}
                         data-hedef-kelime={sozluk ? temiz.toLocaleLowerCase("tr-TR") : undefined}
                         role={sozluk ? "button" : undefined}
                         tabIndex={sozluk ? 0 : undefined}
                         aria-label={sozluk ? \`${temiz} kelimesinin anlamını aç\` : undefined}
                         onClick={() => sozluk && setSeciliSozluk(sozluk)}
                         onKeyDown={(e) => { if (sozluk && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); setSeciliSozluk(sozluk); } }}
                         style={{
                           background: aktifMi ? (ayar.tema === "krem" ? "rgba(201,139,61,0.45)" : "rgba(232,163,61,0.35)") : "none",
                           borderRadius: 4,
                           padding: aktifMi ? "0 2px" : 0,
                           color: aktifMi ? (ayar.tema === "krem" ? "#1A1510" : "#FFF3DC") : undefined,
                           cursor: sozluk ? "help" : undefined,
                           textDecoration: sozluk ? "underline dotted" : undefined,
                           textUnderlineOffset: sozluk ? 3 : undefined,
                         }}>
                         {ayar.biyonik && temiz.length > 3 ? <><strong style={{ fontWeight: 850 }}>{temiz.slice(0, n)}</strong>{temiz.slice(n)}{son}</> : k}{" "}
                       </span>;`;

if (!s.includes('data-hedef-kelime=')) replaceOnce(oldWordBlock, newWordBlock, 'clickable glossary word rendering');

if (!s.includes('data-sozluk-karti')) {
  replaceOnce(
    '                  </div>\n                  {ayar.odak && <div style={{ fontSize: 11, color: S.soluk, marginTop: 8 }}>Odak modu:',
    '                  </div>\n                  {seciliSozluk && (\n                    <div data-sozluk-karti style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>\n                      <GlossaryCard entry={seciliSozluk} onClose={() => setSeciliSozluk(null)} onPronounce={kelimeyiSeslendir} />\n                    </div>\n                  )}\n                  {ayar.odak && <div style={{ fontSize: 11, color: S.soluk, marginTop: 8 }}>Odak modu:',
    'glossary card placement',
  );
}

const oldModes = `<div data-okuma-modlari style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 5, flexWrap: "wrap" }}>
               {OKUMA_MODLARI.map((m) => (
                 <button key={m.id} onClick={() => okumaModuDegistir(m.id)} title={m.aciklama} style={cip(okumaModu === m.id)}>
                   {m.ad}
                 </button>
               ))}
             </div>
             <div data-okuma-modu-ipucu style={{ margin: "5px auto 0", maxWidth: 390, background: "rgba(255,255,255,0.055)", border: "1px solid rgba(255,255,255,0.075)", borderRadius: 12, padding: "6px 9px", color: "rgba(242,236,223,0.88)", fontSize: mobilDar ? 11 : 12, lineHeight: 1.45, textAlign: "center" }}>
               <strong style={{ color: S.vurgu }}>{okumaModuAyar.ad}:</strong> {okumaModuAyar.aciklama}
               {okumaModu === "kendim" ? " Ses otomatik başlamaz; takıldığım yerde kısa yardım alırım." : ""}
             </div>
             {okumaModu === "kendim" && (
               <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
                 <button data-yardim="takildim" onClick={yardimOku} style={{ ...cip(false), borderColor: "rgba(232,163,61,0.45)", color: S.vurgu }}>Yardım · Oku</button>
               </div>
             )}`;

const newModes = `<div data-okuma-modu-kompakt style={{ display: "flex", justifyContent: "center", marginTop: 7 }}>
               <button onClick={() => setModPaneliAcik((v) => !v)} aria-expanded={modPaneliAcik} aria-label={\`Okuma modu: \${okumaModuAyar.ad}\`} style={{ ...cip(true), minWidth: 180, minHeight: 44, justifyContent: "center" }}>Mod: {okumaModuAyar.ad} ▾</button>
             </div>
             {modPaneliAcik && (
               <div data-okuma-modlari style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
                 {OKUMA_MODLARI.map((m) => (
                   <button key={m.id} data-okuma-modu={m.id} onClick={() => { okumaModuDegistir(m.id); setModPaneliAcik(false); setSeciliSozluk(null); }} title={m.aciklama} style={{ ...cip(okumaModu === m.id), minHeight: 44 }}>{m.ad}</button>
                 ))}
               </div>
             )}
             <div data-okuma-modu-ipucu style={{ margin: "5px auto 0", maxWidth: 390, color: S.soluk, fontSize: 11, lineHeight: 1.35, textAlign: "center" }}>{okumaModuAyar.ad}: {okumaModuAyar.aciklama}</div>
             {okumaModu === "kendim" && (
               <div data-kelime-yardimi="1" role="note" style={{ margin: "6px auto 0", color: S.vurgu, fontSize: 11, textAlign: "center" }}>
                 Altı çizili hedef kelimeye dokunarak yaşına uygun kısa anlamını aç.
               </div>
             )}`;

if (!s.includes('data-okuma-modu-kompakt')) replaceOnce(oldModes, newModes, 'compact mode selector and contextual help copy');

if (!s.includes('data-kompakt-ilerleme')) {
  replaceOnce(
    '            <DalgaBar kitap={aktif} oran={oran} onSar={oranaSar} />',
    '            <div data-kompakt-ilerleme style={{ marginTop: 6 }}><div onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); oranaSar((e.clientX - r.left) / r.width); }} role="slider" aria-label="Okuma ilerlemesi" aria-valuenow={Math.round(oran * 100)} style={{ height: 6, borderRadius: 999, background: "rgba(255,255,255,0.12)", cursor: "pointer", overflow: "hidden" }}><div style={{ width: `${oran * 100}%`, height: "100%", background: S.vurgu }} /></div></div>',
    'thin progress bar',
  );
}

if (!s.includes('data-alt-araclar')) {
  replaceOnce(
    '<div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 5, flexWrap: "wrap" }}>\n              <button onClick={hizDegistir} style={cip(false)}><Gauge size={14} /> {hiz}x</button>\n              <button onClick={sesTonuDegistir} title={sesTonuAyar.aciklama} style={cip(etkinSeslendirme)}><Volume2 size={14} /> Ses: {etkinSeslendirme ? sesTonuAyar.kisa : "Kapalı"}</button>\n              <button onClick={uykuDegistir} style={cip(uyku > 0)}><Moon size={14} /> {uyku > 0 ? sureYaz(uyku) : "Uyku"}</button>\n            </div>',
    '<div data-alt-araclar style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 6 }}>\n              <button onClick={hizDegistir} style={{ ...cip(false), minHeight: 44, padding: "6px 9px" }}><Gauge size={13} /> {hiz}x</button>\n              <button onClick={sesTonuDegistir} title={sesTonuAyar.aciklama} style={{ ...cip(etkinSeslendirme), minHeight: 44, padding: "6px 9px" }}><Volume2 size={13} /> Ses: {etkinSeslendirme ? sesTonuAyar.kisa : "Kapalı"}</button>\n              <button onClick={uykuDegistir} style={{ ...cip(uyku > 0), minHeight: 44, padding: "6px 9px" }}><Moon size={13} /> {uyku > 0 ? sureYaz(uyku) : "Uyku"}</button>\n            </div>',
    'single compact toolbar',
  );
}

for (const marker of ['const SURUM = "2.6.0";', 'data-okuma-modu-kompakt', 'data-kompakt-ilerleme', 'data-hedef-kelime=', 'data-sozluk-karti']) {
  if (!s.includes(marker)) throw new Error(`Release marker missing after patch: ${marker}`);
}

if (s === before) throw new Error('Reader-first patch made no changes');
fs.writeFileSync(appPath, s);

const testPath = 'tests/demo-readiness.spec.js';
let t = fs.readFileSync(testPath, 'utf8');
const testBefore = t;

t = t.replace(
  '  const button = modButonu(page, id);\n  await expect(button).toBeVisible();',
  '  const compact = oynatici(page).locator("[data-okuma-modu-kompakt] button");\n  const button = modButonu(page, id);\n  if (!(await button.isVisible())) await compact.click();\n  await expect(button).toBeVisible();',
);
t = t.replace('    await expect(modButonu(page, "dinliyorum")).toBeVisible();', '    await expect(oynatici(page).locator("[data-okuma-modu-kompakt] button")).toBeVisible();');
t = t.replace('    await expect(oynatici(page).locator(\'[data-yardim-oku="1"]\')).toBeVisible();', '    await expect(oynatici(page).locator(\'[data-kelime-yardimi="1"]\')).toBeVisible();');
t = t.replace(
  '      const button = modButonu(page, id);\n      await expect(button).toBeVisible();\n      await button.click();',
  '      const button = modButonu(page, id);\n      if (!(await button.isVisible())) await oynatici(page).locator("[data-okuma-modu-kompakt] button").click();\n      await expect(button).toBeVisible();\n      await button.click();',
);
t = t.replace(
  '    const controls = [\n      modButonu(page, "dinliyorum"),\n      modButonu(page, "birlikte"),\n      modButonu(page, "kendim"),\n      oynatici(page).locator(\'[data-yardim-oku="1"]\'),\n    ];',
  '    const compact = oynatici(page).locator("[data-okuma-modu-kompakt] button");\n    const controls = [compact, oynatici(page).locator("[data-alt-araclar] button").first()];',
);

if (!t.includes('kelime kartı hedef kelimeye dokununca açılır')) {
  t += `\n\ntest.describe("10. Kelime kartı akışı", () => {\n  test("kelime kartı hedef kelimeye dokununca açılır ve ilerlemeyi değiştirmez", async ({ page }) => {\n    await onboardingTamamla(page);\n    const firstCard = page.locator("[data-kitap-karti]").first();\n    if (await firstCard.count()) await firstCard.click();\n    const start = page.getByRole("button", { name: /Okumaya başla|Okumaya devam et/i }).first();\n    if (await start.count()) await start.click();\n    await expect(oynatici(page)).toBeVisible();\n    const target = oynatici(page).locator("[data-hedef-kelime]").first();\n    test.skip((await target.count()) === 0, "Seçilen pilot içerikte sözlük hedefi yok");\n    const progress = await oynatici(page).locator("[role=slider]").getAttribute("aria-valuenow");\n    await target.click();\n    await expect(oynatici(page).locator("[data-sozluk-karti]")).toBeVisible();\n    await expect(oynatici(page).getByRole("button", { name: /kelimesini seslendir/i })).toBeVisible();\n    await expect(oynatici(page).locator("[role=slider]")).toHaveAttribute("aria-valuenow", progress || "0");\n    await oynatici(page).getByRole("button", { name: "Kelime açıklamasını kapat" }).click();\n    await expect(oynatici(page).locator("[data-sozluk-karti]")).toHaveCount(0);\n  });\n});\n`;
}

if (t.includes('data-yardim-oku')) throw new Error('Legacy help selector still exists in regression tests');
if (t === testBefore) throw new Error('Regression patch made no changes');
fs.writeFileSync(testPath, t);

console.log('Applied direct reader-first v2.6.0 code and regression updates');
