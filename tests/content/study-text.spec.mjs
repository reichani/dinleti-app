import test from "node:test";
import assert from "node:assert/strict";
import { paragraphLanguages, summarizeLanguages, buildStudySections, dominantLanguage } from "../../src/studyText.js";

const KARISIK = [
  "Unit 3: My Daily Routine",
  "Aşağıdaki metni oku ve soruları cevapla. Bilmediğin kelimelerin altını çiz.",
  "Every morning I wake up at seven o'clock. I have breakfast with my family and then I walk to school with my friends.",
  "In the afternoon we play football in the garden, and in the evening I do my homework.",
  "Metne göre çocuk okula nasıl gidiyor? Cevabını İngilizce yaz.",
].join("\n");

test("karışık ders metninde dil paragraf düzeyinde algılanır", () => {
  const diller = paragraphLanguages(KARISIK).map((p) => p.dil);
  assert.deepEqual(diller, ["tr", "tr", "en", "en", "tr"]);
});

test("kısa İngilizce başlık tek başına sesi değiştirmez", () => {
  const p = paragraphLanguages("Exercise 4\nThe cat is on the table and the dog is in the garden.");
  assert.deepEqual(p.map((x) => x.dil), ["en", "en"]);
});

test("dil özeti karışık metni işaretler", () => {
  const o = summarizeLanguages(KARISIK);
  assert.equal(o.en, 2);
  assert.equal(o.karisik, true);
  assert.equal(o.tamamenIngilizce, false);
});

test("bölümler dil sınırında ayrılır ve İngilizce bölüm etiketlenir", () => {
  const bolumler = buildStudySections(KARISIK);
  assert.deepEqual(bolumler.map((b) => b.dil), ["tr", "en", "tr"]);
  assert.match(bolumler[1].ad, /İngilizce/);
  assert.ok(bolumler[1].metin.includes("\n"), "paragraf sonu korunur");
});

test("kullanıcı İngilizce sesi kapatırsa tüm bölümler Türkçe okunur", () => {
  const bolumler = buildStudySections(KARISIK, { ingilizceSesli: false });
  assert.ok(bolumler.every((b) => b.dil === "tr"));
});

test("uzun metin yaklaşık 90 kelimelik bölümlere ayrılır ve kelime kaybolmaz", () => {
  const cumle = "Fotosentez bitkilerin ışık enerjisini kimyasal enerjiye çevirdiği süreçtir. ";
  const metin = cumle.repeat(40);
  const bolumler = buildStudySections(metin);
  assert.ok(bolumler.length >= 3);
  const say = (s) => (s.match(/\S+/g) || []).length;
  assert.equal(bolumler.reduce((t, b) => t + say(b.metin), 0), say(metin));
  assert.ok(bolumler.every((b) => say(b.metin) <= 130));
});

test("tamamen İngilizce metnin baskın dili İngilizcedir", () => {
  const bolumler = buildStudySections("The water cycle describes how water moves between the ocean, the air and the land. It is driven by the sun.");
  assert.equal(dominantLanguage(bolumler), "en");
});
