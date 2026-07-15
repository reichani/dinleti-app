import fs from 'node:fs';

const path = 'src/App.jsx';
let s = fs.readFileSync(path, 'utf8');

const replacements = [
  ['const SURUM = "2.5.0";', 'const SURUM = "2.5.1";'],
  ['data-mobile-stability="v2.5.0"', 'data-mobile-stability="v2.5.1"'],
  ['ŞİMDİ DİNLENİYOR', 'ŞİMDİ OKUNUYOR'],
  ['Şimdi dinleniyor', 'Şimdi okunuyor'],
  ['Dinlemeye başla', 'Okumaya başla'],
  ['Dinlemeye devam', 'Okumaya devam'],
  ['dinlendi', 'okundu'],
  ['Takıldım · Bana oku', 'Yardım · Oku'],
  ['Tanıtım seçkisi: her bölümden kısa bir pasaj seslendirilir. Masal kategorisindeki eserler baştan sona tam anlatımdır.', 'Tanıtım seçkisi: Her bölümden kısa bir okuma bölümü bulunur. Masallar baştan sona okunabilir.'],
  ['height: 52, cursor: "pointer"', 'height: 30, cursor: "pointer"'],
  ['margin: mobilDar ? "8px 0 8px" : "12px 0 10px"', 'margin: mobilDar ? "5px 0 5px" : "8px 0 6px"'],
  ['marginTop: 8, flexWrap: "wrap"', 'marginTop: 5, flexWrap: "wrap"'],
  ['margin: mobilKisa ? "6px auto 0" : "8px auto 0"', 'margin: "5px auto 0"'],
  ['padding: mobilDar ? "7px 9px" : "8px 11px"', 'padding: "6px 9px"'],
  ['Kendim Okuyorum: Ses kapanır; takıldığım yerde yardım alırım. Ses otomatik başlamaz; takıldığım yerde kısa yardım alırım.', 'Kendim okuyorum · Ses kapalı. Gerektiğinde Yardım · Oku düğmesini kullan.'],
];

for (const [from, to] of replacements) {
  if (s.includes(from)) s = s.split(from).join(to);
}

// Kendi metin açılışını kararlı hale getir: ana sayfa yerine tam okuyucu açık kalsın,
// mevcut detay/sekme durumları temizlensin ve sessiz modda otomatik ses başlamasın.
const oldOpen = 'setAktifId(id); setPozisyon(0); setKelimeIx(0); setOynaticiAcik(true); setKendiMetin(""); setKendiMetinMesaji("Metin okuma moduna alındı.");';
const newOpen = 'setAktifId(id); setDetayId(null); setSekme("ana"); setPozisyon(0); setKelimeIx(0); setCaliyor(false); setOynaticiAcik(true); setKendiMetin(""); setKendiMetinMesaji("Metin okuma moduna alındı.");';
if (!s.includes(oldOpen)) throw new Error('Kendi metin açılış bloğu bulunamadı');
s = s.replace(oldOpen, newOpen);

// Okuma yolu kartını kompaktlaştır: slogan ve tüm destek chipleri yerine tek satır özet.
const oldCardStart = '<div data-okuma-yolu style={{ background: "linear-gradient(135deg, rgba(232,163,61,0.15), rgba(255,255,255,0.04))", border: "1px solid rgba(232,163,61,0.28)", borderRadius: 18, padding: 16, marginBottom: 16 }}>';
const newCardStart = '<div data-okuma-yolu style={{ background: "linear-gradient(135deg, rgba(232,163,61,0.12), rgba(255,255,255,0.035))", border: "1px solid rgba(232,163,61,0.24)", borderRadius: 16, padding: 12, marginBottom: 12 }}>';
s = s.replace(oldCardStart, newCardStart);

const oldSlogan = '<div style={{ color: "rgba(242,236,223,0.86)", fontSize: 14, lineHeight: 1.55, marginTop: 10 }}>{okumaYoluDetay.slogan}</div>';
const newSlogan = '<div style={{ color: S.soluk, fontSize: 12, marginTop: 7 }}>{okumaYolu.destekler.length} destek aktif · Düzenlemek için Değiştir</div>';
s = s.replace(oldSlogan, newSlogan);

const chipsRegex = /\n\s*<div style=\{\{ display: "flex", gap: 7, flexWrap: "wrap", marginTop: 12 \}\}>[\s\S]*?\n\s*<\/div>\n\s*<\/div>\n\s*\);/;
const chipsReplacement = '\n    </div>\n  );';
if (chipsRegex.test(s)) s = s.replace(chipsRegex, chipsReplacement);

fs.writeFileSync(path, s);
console.log('Applied Okurio reader UX v2.5.1 patch');
