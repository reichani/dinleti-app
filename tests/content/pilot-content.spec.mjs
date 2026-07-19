test("validator rejects sentences longer than target level maximum words", () => {
  const longSentenceStory = structuredClone(PILOT_STORIES[0]);
  longSentenceStory.legacy.id = "long-sentence-test-story";
  
  // Testin kararlı çalışması için hikaye seviyesini en katı kuralı işleten 'temel-zenginleşen' yapıyoruz
  if (!longSentenceStory.metadata.vocabularyPlan) {
    longSentenceStory.metadata.vocabularyPlan = {};
  }
  longSentenceStory.metadata.vocabularyPlan.targetLevel = "temel-zenginleşen";
  
  // Kasıtlı olarak 12 kelime sınırını aşan bir cümle yerleştiriyoruz
  longSentenceStory.legacy.bolumler[0].metin =
    "Oki bugün bahçede çok hızlı koşarken uzaktaki büyük kırmızı balonu birden dikkatle gördü ve hemen yakaladı."; // 15 kelime

  const report = validatePilotStory(longSentenceStory);

  assert.equal(report.valid, false);
  // Sabit "12" dizesi yerine dinamik "maximum is" hata mesajını yakalıyoruz
  assert.ok(report.errors.some((error) => error.includes("maximum is")));
});
