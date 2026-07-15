import fs from 'node:fs';

const path = 'src/App.jsx';
let s = fs.readFileSync(path, 'utf8');
const before = s;

s = s.replace('const SURUM = "2.5.1";', 'const SURUM = "2.6.0";');
s = s.replace('data-mobile-stability="v2.5.1"', 'data-mobile-stability="v2.6.0" data-story-id={aktif.id}');
s = s.replace('  const [kendiMetinMesaji, setKendiMetinMesaji] = useState("");', '  const [kendiMetinMesaji, setKendiMetinMesaji] = useState("");\n  const [modPaneliAcik, setModPaneliAcik] = useState(false);');
s = s.replace('    KATALOG.unshift(kitap);', '    if (!KATALOG.some((k) => k.id === id)) KATALOG.unshift(kitap);');
s = s.replace('    setAktifId(id); setPozisyon(0); setKelimeIx(0); setOynaticiAcik(true); setKendiMetin(""); setKendiMetinMesaji("Metin okuma moduna alındı.");', '    setAktifId(id); setDetayId(null); setSekme("ana"); setPozisyon(0); setKelimeIx(0); setOynaticiAcik(true); setCaliyor(false); setKendiMetin(""); setKendiMetinMesaji("Metin okuma moduna alındı.");');
s = s.replace('{p > 10 ? `Devam et · ${sureYaz(p)}` : "Okumaya başla"}', '{p > 10 ? `Okumaya devam et · ${sureYaz(p)}` : "Okumaya başla"}');

s = s.replace(/<div data-okuma-modlari[\s\S]*?<\/div>\n\s*<div data-okuma-modu-ipucu[\s\S]*?<\/div>/, `<div data-okuma-modu-kompakt style={{ display: "flex", justifyContent: "center", marginTop: 7 }}>
              <button onClick={() => setModPaneliAcik((v) => !v)} aria-expanded={modPaneliAcik} aria-label={\`Okuma modu: \${okumaModuAyar.ad}\`} style={{ ...cip(true), minWidth: 180, minHeight: 44, justifyContent: "center" }}>Mod: {okumaModuAyar.ad} ▾</button>
            </div>
            {modPaneliAcik && (
              <div data-okuma-modlari style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
                {OKUMA_MODLARI.map((m) => (
                  <button key={m.id} data-okuma-modu={m.id} onClick={() => { okumaModuDegistir(m.id); setModPaneliAcik(false); }} title={m.aciklama} style={{ ...cip(okumaModu === m.id), minHeight: 44 }}>{m.ad}</button>
                ))}
              </div>
            )}
            <div data-okuma-modu-ipucu style={{ margin: "5px auto 0", maxWidth: 390, color: S.soluk, fontSize: 11, lineHeight: 1.35, textAlign: "center" }}>{okumaModuAyar.ad}: {okumaModuAyar.aciklama}</div>`);

s = s.replace(/\{okumaModu === "kendim" && \([\s\S]*?<\/div>\n\s*\)\}/, `{okumaModu === "kendim" && (
              <div data-kelime-yardimi="1" role="note" style={{ margin: "6px auto 0", color: S.vurgu, fontSize: 11, textAlign: "center" }}>
                Kelime yardımını açmak için metindeki hedef kelimeye dokun.
              </div>
            )}`);

s = s.replace(/<div style=\{\{ display: "flex", justifyContent: "center", gap: 10, marginTop: 5, flexWrap: "wrap" \}\}>[\s\S]*?<\/div>/, `<div data-alt-araclar style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 6 }}>
              <button onClick={hizDegistir} style={{ ...cip(false), minHeight: 44, padding: "6px 9px" }}><Gauge size={13} /> {hiz}x</button>
              <button onClick={sesTonuDegistir} title={sesTonuAyar.aciklama} style={{ ...cip(etkinSeslendirme), minHeight: 44, padding: "6px 9px" }}><Volume2 size={13} /> Ses: {etkinSeslendirme ? sesTonuAyar.kisa : "Kapalı"}</button>
              <button onClick={uykuDegistir} style={{ ...cip(uyku > 0), minHeight: 44, padding: "6px 9px" }}><Moon size={13} /> {uyku > 0 ? sureYaz(uyku) : "Uyku"}</button>
            </div>`);

s = s.replace(/<DalgaBar kitap=\{aktif\} oran=\{oran\} onSar=\{oranaSar\} \/>/g, `<div data-kompakt-ilerleme style={{ marginTop: 6 }}><div onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); oranaSar((e.clientX - r.left) / r.width); }} role="slider" aria-label="Okuma ilerlemesi" aria-valuenow={Math.round(oran * 100)} style={{ height: 6, borderRadius: 999, background: "rgba(255,255,255,0.12)", cursor: "pointer", overflow: "hidden" }}><div style={{ width: \`${oran * 100}%\`, height: "100%", background: S.vurgu }} /></div><div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, color: S.soluk, fontSize: 11 }}><span>{sureYaz(pozisyon)}</span><span>{sureYaz(toplam)}</span></div></div>`);

if (s === before) throw new Error('Reader-first patch made no changes');
fs.writeFileSync(path, s);
console.log('Applied reader-first v2.6.0 UX and contextual word-help hooks');
