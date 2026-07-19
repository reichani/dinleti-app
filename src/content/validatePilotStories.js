// Seviyeye göre dinamik üst sınır belirleyen yardımcı fonksiyon
export function getWordLimitForLevel(targetLevel) {
  switch (targetLevel) {
    case 'temel-zenginleşen': return 12;
    case 'orta-ileri': return 18;
    case 'ileri-edebi': return 35; // Odysseia hikayeleri bu esnekliğe kavuşuyor
    default: return 12; // Varsayılan/Eski içerikler koruma altında
  }
}

export function validatePilotStory(story) {
  const errors = [];
  const targetLevel = story.metadata?.vocabularyPlan?.targetLevel || 'temel-zenginleşen';
  const maxWordLimit = getWordLimitForLevel(targetLevel);

  if (story.legacy && story.legacy.bolumler) {
    for (const bolum of story.legacy.bolumler) {
      if (!bolum.metin) continue;
      
      const sentences = bolum.metin.split(/(?<=[.!?])\s+/);
      for (const sentence of sentences) {
        const wordCount = sentence.trim().split(/\s+/).filter(Boolean).length;
        
        // Sabit 12 yerine artık dinamik limit kontrol ediliyor
        if (wordCount > maxWordLimit) {
          errors.push(`Sentence exceeds word limit for ${targetLevel} (maximum is ${maxWordLimit}, got ${wordCount})`);
        }
      }
    }
  }

  // Klinik dil kontrolleri vb. diğer mevcut kurallar aynen kalıyor...
  return {
    valid: errors.length === 0,
    errors
  };
}
