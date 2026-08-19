import fs from "node:fs";

const path = "src/App.jsx";
let source = fs.readFileSync(path, "utf8");

function replaceOnce(label, before, after) {
  if (source.includes(after)) return;
  const count = source.split(before).length - 1;
  if (count !== 1) {
    throw new Error(`${label}: expected exactly one match, found ${count}`);
  }
  source = source.replace(before, after);
}

replaceOnce(
  "reader-core import",
  'import { cursorFromPosition, positionFromCursor, readingProgressSnapshot, monotonicBoundaryWord } from "./reader-core.js";',
  'import { cursorFromPosition, positionFromCursor, normalizeReadingProgress, readingProgressSnapshot, monotonicBoundaryWord } from "./reader-core.js";',
);

replaceOnce(
  "hydrate last-book cursor",
  `        if (d.sonKitap && kitapBul(d.sonKitap) && icerikSunumu(kitapBul(d.sonKitap)).deployable) {\n          setAktifId(d.sonKitap);\n          setPozisyon(d.ilerlemeler?.[d.sonKitap]?.pos || 0);\n        }`,
  `        if (d.sonKitap && kitapBul(d.sonKitap) && icerikSunumu(kitapBul(d.sonKitap)).deployable) {\n          const k = kitapBul(d.sonKitap);\n          const progress = normalizeReadingProgress({\n            sections: k.bolumler,\n            progress: d.ilerlemeler?.[d.sonKitap],\n            durationForSection: bolumSn,\n          });\n          setAktifId(d.sonKitap);\n          setPozisyon(progress.pos);\n          setKelimeIx(progress.wordIndex);\n        }`,
);

replaceOnce(
  "resume another book cursor",
  `      const p = ilerlemeler[id]?.pos || 0;\n      const k = kitapBul(id);\n      const kayitli = ilerlemeler[id];\n      const cursor = kayitli?.version === 2\n        ? { sectionIndex: kayitli.sectionIndex || 0, wordIndex: kayitli.wordIndex || 0 }\n        : cursorFromPosition(k.bolumler, p, bolumSn);\n      setPozisyon(p);\n      setKelimeIx(cursor.wordIndex);\n      setCaliyor(true);\n      seriGuncelle();\n      if (etkinSeslendirme) konusmayiBaslat(k, cursor.sectionIndex, cursor.wordIndex);`,
  `      const k = kitapBul(id);\n      const progress = normalizeReadingProgress({\n        sections: k.bolumler,\n        progress: ilerlemeler[id],\n        durationForSection: bolumSn,\n      });\n      setPozisyon(progress.pos);\n      setKelimeIx(progress.wordIndex);\n      setCaliyor(true);\n      seriGuncelle();\n      if (etkinSeslendirme) konusmayiBaslat(k, progress.sectionIndex, progress.wordIndex);`,
);

fs.writeFileSync(path, source);
console.log("Applied guarded resume hydration fix to src/App.jsx");
