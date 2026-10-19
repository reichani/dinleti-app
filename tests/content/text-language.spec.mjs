import test from "node:test";
import assert from "node:assert/strict";

import { detectTextLanguage } from "../../src/textLanguage.js";

test("detects an English imported document for the TTS voice", () => {
  assert.equal(
    detectTextLanguage("The little fox was in the garden, and she looked at the stars with her friend."),
    "en",
  );
});

test("keeps a Turkish imported document on the Turkish TTS voice", () => {
  assert.equal(
    detectTextLanguage("Küçük tilki bahçedeydi ve arkadaşı ile gökyüzündeki yıldızlara baktı."),
    "tr",
  );
});

test("does not misclassify short or ambiguous personal text", () => {
  assert.equal(detectTextLanguage("Ali ile Ada"), "tr");
  assert.equal(detectTextLanguage("2026 araştırma notları"), "tr");
});

test("uses the dominant language in realistic academic text", () => {
  assert.equal(
    detectTextLanguage("This study examines how attention changes during reading. The results are discussed in relation to earlier research, and the method is described in detail."),
    "en",
  );
});

test("İngilizce 'I' Türkçe yerelinde 'ı' sayılmaz (v2.10 kök neden)", () => {
  assert.equal(
    detectTextLanguage("Every morning I wake up early. I have breakfast and I walk to school with my friends."),
    "en",
  );
  assert.equal(detectTextLanguage("IŞIK ODAYA YAVAŞÇA GİRDİ VE HER ŞEYİ AYDINLATTI."), "tr");
});

test("v2.9.3: capital I/It/In/Is no longer flips English text to Turkish", () => {
  const samples = [
    "It was a cold morning. I looked out of the window. In the garden, a small bird sang. It is spring now, I said.",
    "Once upon a time there lived a giant. In his garden, children played. I will build a wall, he said. It was high.",
    "Hello my name is Atlas. I like football. I play every day after school. My friends are nice.",
    "Isabella opened the door. Inside, it was dark. Ice covered the windows and the floor. I am cold, she whispered.",
  ];
  for (const sample of samples) assert.equal(detectTextLanguage(sample), "en", sample);
});

test("v2.9.3: Turkish text with capital I and dotless ı stays Turkish", () => {
  assert.equal(detectTextLanguage("Ilık bir sabahtı. Ishak ile Irmak ırmak kıyısında yürüdü. Işık suyun üstünde parlıyordu."), "tr");
  assert.equal(detectTextLanguage("Okul bitti. Sonra eve gittim. Annem ve babam beni bekliyordu, çok mutluydum."), "tr");
});
