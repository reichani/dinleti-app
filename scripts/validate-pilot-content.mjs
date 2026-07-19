import { ALL_CURATED_STORIES } from "../src/content/pilotCatalogAdapter.js";

function getDynamicWordLimit(targetLevel) {
  switch (targetLevel) {
    case 'temel-zenginleşen': return 12;
    case 'orta-ileri': return 18;
    case 'ileri-edebi': return 35;
    default: return 12;
  }
}

// Dışarıdan doğrudan test edilmesini sağlamak için izole fonksiyon
export function checkSentence(sentence, maxLimit) {
  const wordCount = sentence.trim().split(/\s+/).filter(Boolean).length;
  if (wordCount > maxLimit) {
    throw new Error(`Cümle limiti aşıldı! Maksimum: ${maxLimit}, Alınan: ${wordCount}`);
  }
}

export function validateCuratedContent() {
  let hasError = false;

  for (const story of ALL_CURATED_STORIES) {
    const targetLevel = story.metadata?.vocabularyPlan?.targetLevel || 'temel-zenginleşen';
    const maxWordLimit = getDynamicWordLimit(targetLevel);

    if (!story.legacy || !story.legacy.bolumler) continue;

    for (const bolum of story.legacy.bolumler) {
      if (!bolum.metin) continue;
      
      const sentences = bolum.metin.split(/(?<=[.!?])\s+/);
      for (const sentence of sentences) {
        try {
          checkSentence(sentence, maxWordLimit);
        } catch (err) {
          console.error(`❌ HATA: "${story.legacy.baslik}" -> ${err.message}`);
          console.error(`Cümle: "${sentence}"\n`);
          hasError = true;
        }
      }
    }
  }

  // Eğer gerçek içeriklerde hata varsa süreci durdur
  if (hasError) {
    process.exit(1);
  }
}

// Script doğrudan çalıştırıldığında doğrulamayı tetikle
if (process.argv[1] && process.argv[1].endsWith('validate-pilot-content.mjs')) {
  validateCuratedContent();
}
