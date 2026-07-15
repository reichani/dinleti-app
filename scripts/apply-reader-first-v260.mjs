import fs from 'node:fs';

const path = 'src/App.jsx';
let s = fs.readFileSync(path, 'utf8');
const must = (needle, label) => { if (!s.includes(needle)) throw new Error(`Missing patch anchor: ${label}`); };
const rep = (from, to, label) => { must(from, label); s = s.replace(from, to); };

rep('const SURUM = "2.5.1";', 'const SURUM = "2.6.0";', 'version');

rep('  const [kendiMetinMesaji, setKendiMetinMesaji] = useState("");', '  const [kendiMetinMesaji, setKendiMetinMesaji] = useState("");\n  const [profilPaneliAcik, setProfilPaneliAcik] = useState(false);\n  const [modPaneliAcik, setModPaneliAcik] = useState(false);', 'new compact states');

rep('    KATALOG.unshift(kitap);\n    ICERIK_METADATA[id] =', '    if (!KATALOG.some((k) => k.id === id)) KATALOG.unshift(kitap);\n    ICERIK_METADATA[id] =', 'safe user text insert');
rep('    setAktifId(id); setPozisyon(0); setKelimeIx(0); setOynaticiAcik(true); setKendiMetin(""); setKendiMetinMesaji("Metin okuma moduna alındı.");', '    setAktifId(id); setDetayId(null); setSekme("ana"); setPozisyon(0); setKelimeIx(0); setOynaticiAcik(true); setCaliyor(false); setKendiMetin(""); setKendiMetinMesaji("Metin okuma moduna alındı.");', 'user text navigation');

rep('        <button disabled={!profilUyumlu} onClick={() => { oynatDegistir(k.id); setOynaticiAcik(true); }}', '        <button disabled={!profilUyumlu} onClick={() => { oynatDegistir(k.id); setOynaticiAcik(true); }}', 'detail button anchor');
rep('{p > 10 ? `Devam et · ${sureYaz(p)}` : "Okumaya başla"}', '{p > 10 ? `Okumaya devam et · ${sureYaz(p)}` : "Okumaya başla"}', 'primary CTA');

rep('<div data-okuma-modlari style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 8, flexWrap: "wrap" }}>\n              {OKUMA_MODLARI.map((m) => (\n                <button key={m.id} onClick={() => okumaModuDegistir(m.id)} title={m.aciklama} style={cip(okumaModu === m.id)}>\n                  {m.ad}\n                </button>\n              ))}\n            </div>', '<div data-okuma-modu-kompakt style={{ display: "flex", justifyContent: "center", marginTop: 7 }}>\n              <button onClick={() => setModPaneliAcik((v) => !v)} style={{ ...cip(true), minWidth: 180, justifyContent: "center" }}>Mod: {okumaModuAyar.ad} ▾</button>\n            </div>\n            {modPaneliAcik && (\n              <div data-okuma-modlari style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 6, flexWrap: "wrap" }}>\n                {OKUMA_MODLARI.map((m) => (\n                  <button key={m.id} onClick={() => { okumaModuDegistir(m.id); setModPaneliAcik(false); }} title={m.aciklama} style={cip(okumaModu === m.id)}>{m.ad}</button>\n                ))}\n              </div>\n            )}', 'compact mode selector');

rep('<div data-okuma-modu-ipucu style={{ margin: mobilKisa ? "6px auto 0" : "8px auto 0", maxWidth: 390, background: "rgba(255,255,255,0.055)", border: "1px solid rgba(255,255,255,0.075)", borderRadius: 12, padding: mobilDar ? "7px 9px" : "8px 11px", color: "rgba(242,236,223,0.88)", fontSize: mobilDar ? 11 : 12, lineHeight: 1.45, textAlign: "center" }}>\n              <strong style={{ color: S.vurgu }}>{okumaModuAyar.ad}:</strong> {okumaModuAyar.aciklama}\n              {okumaModu === "kendim" ? " Ses otomatik başlamaz; takıldığım yerde kısa yardım alırım." : ""}\n            </div>', '<div data-okuma-modu-ipucu style={{ margin: "5px auto 0", maxWidth: 390, color: S.soluk, fontSize: 11, lineHeight: 1.35, textAlign: "center" }}>{okumaModuAyar.aciklama}</div>', 'compact mode hint');

rep('{okumaModu === "kendim" && (\n              <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>\n                <button data-yardim="takildim" onClick={yardimOku} style={{ ...cip(false), borderColor: "rgba(232,163,61,0.45)", color: S.vurgu }}>Yardım · Oku</button>\n              </div>\n            )}', '{okumaModu === "kendim" && (\n              <div style={{ display: "flex", justifyContent: "center", marginTop: 5 }}>\n                <button data-yardim="takildim" onClick={yardimOku} style={{ ...cip(false), padding: "6px 10px", borderColor: "rgba(232,163,61,0.45)", color: S.vurgu }}>? Yardım</button>\n              </div>\n            )}', 'compact help');

rep('<div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 8, flexWrap: "wrap" }}>\n              <button onClick={hizDegistir} style={cip(false)}><Gauge size={14} /> {hiz}x</button>\n              <button onClick={sesTonuDegistir} title={sesTonuAyar.aciklama} style={cip(etkinSeslendirme)}><Volume2 size={14} /> Ses: {etkinSeslendirme ? sesTonuAyar.kisa : "Kapalı"}</button>\n              <button onClick={uykuDegistir} style={cip(uyku > 0)}><Moon size={14} /> {uyku > 0 ? sureYaz(uyku) : "Uyku"}</button>\n            </div>', '<div data-alt-araclar style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 6 }}>\n              <button onClick={hizDegistir} style={{ ...cip(false), padding: "6px 9px" }}><Gauge size={13} /> {hiz}x</button>\n              <button onClick={sesTonuDegistir} title={sesTonuAyar.aciklama} style={{ ...cip(etkinSeslendirme), padding: "6px 9px" }}><Volume2 size={13} /> {etkinSeslendirme ? "Ses" : "Sessiz"}</button>\n              <button onClick={uykuDegistir} style={{ ...cip(uyku > 0), padding: "6px 9px" }}><Moon size={13} /> {uyku > 0 ? sureYaz(uyku) : "Uyku"}</button>\n            </div>', 'compact toolbar');

s = s.replace(/<DalgaBar kitap=\{aktif\} oran=\{oran\} onSar=\{oranaSar\} \/>/g, '<div data-kompakt-ilerleme style={{ marginTop: 6 }}><div onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); oranaSar((e.clientX - r.left) / r.width); }} role="slider" aria-label="Okuma ilerlemesi" aria-valuenow={Math.round(oran * 100)} style={{ height: 6, borderRadius: 999, background: "rgba(255,255,255,0.12)", cursor: "pointer", overflow: "hidden" }}><div style={{ width: `${oran * 100}%`, height: "100%", background: S.vurgu }} /></div><div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, color: S.soluk, fontSize: 11 }}><span>{sureYaz(pozisyon)}</span><span>{sureYaz(toplam)}</span></div></div>');

const profileStart = '<div style={{ color: S.soluk, fontSize: 12, marginTop: 10 }}>Bana göre ayarla (birlikte seçilebilir):</div>';
if (s.includes(profileStart)) {
  s = s.replace(profileStart, '<button onClick={() => setProfilPaneliAcik((v) => !v)} style={{ width: "100%", marginTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.055)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "8px 10px", color: S.metin, fontFamily: "inherit", cursor: "pointer" }}><span><strong>Okuma Profili</strong> · {[profil.dis && "Disleksi", profil.dehb && "DEHB", profil.gorsel && "Görsel hassasiyet"].filter(Boolean).join(" + ") || "Standart"}</span><span style={{ color: S.soluk }}>{profilPaneliAcik ? "Kapat" : "Düzenle"}</span></button>{profilPaneliAcik && <div data-profil-paneli>');
  const closeAnchor = '<button onClick={() => setAyar((a) => ({ ...a, font: sonrakiFont(a.font) }))}';
  const idx = s.indexOf(closeAnchor, s.indexOf('data-profil-paneli'));
  if (idx < 0) throw new Error('Missing profile close anchor');
  const end = s.indexOf('</button>', idx) + 9;
  s = s.slice(0, end) + '</div>}' + s.slice(end);
}

fs.writeFileSync(path, s);
console.log('Applied reader-first v2.6.0 UX patch');