import test from "node:test";
import assert from "node:assert/strict";
import { sentenceStarts, cursorForSentenceStep } from "../../src/reader-core.js";

const BOLUMLER = [
  { metin: "Oki uyandı. Pencereyi açtı. Güneş parlıyordu!" },
  { metin: "Lili geldi. Birlikte bahçeye çıktılar." },
];

test("cümle başları okuyucunun sınır kuralıyla bulunur", () => {
  assert.deepEqual(sentenceStarts(BOLUMLER[0].metin), [0, 2, 4]);
  assert.deepEqual(sentenceStarts("Satır bir\nsatır iki."), [0]);
});

test("tekrarla bulunulan cümlenin başına döner", () => {
  assert.deepEqual(cursorForSentenceStep(BOLUMLER, 0, 3, 0), { sectionIndex: 0, wordIndex: 2 });
});

test("önceki ve sonraki cümle aynı bölümde ilerler", () => {
  assert.deepEqual(cursorForSentenceStep(BOLUMLER, 0, 3, -1), { sectionIndex: 0, wordIndex: 0 });
  assert.deepEqual(cursorForSentenceStep(BOLUMLER, 0, 3, 1), { sectionIndex: 0, wordIndex: 4 });
});

test("bölüm sınırında komşu bölüme geçer, uçlarda durur", () => {
  assert.deepEqual(cursorForSentenceStep(BOLUMLER, 0, 4, 1), { sectionIndex: 1, wordIndex: 0 });
  assert.deepEqual(cursorForSentenceStep(BOLUMLER, 1, 0, -1), { sectionIndex: 0, wordIndex: 4 });
  assert.deepEqual(cursorForSentenceStep(BOLUMLER, 0, 0, -1), { sectionIndex: 0, wordIndex: 0 });
  assert.deepEqual(cursorForSentenceStep(BOLUMLER, 1, 3, 1), { sectionIndex: 1, wordIndex: 2 });
});
