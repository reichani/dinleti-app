import { ALL_CURATED_STORIES } from "../src/content/pilotCatalogAdapter.js";

// Her okuma seviyesinin hak ettiği entelektüel kelime limitini Source of Truth'tan alıyoruz
function getDynamicWordLimit(targetLevel) {
  switch (targetLevel) {
    case 'temel-zenginleşen': 
      return 12; // 7-10 yaş grubu için odaklanmayı artıran kısa cümleler
    case 'orta-ileri': 
      return 18; // 11-16 yaş grubu için muhakeme yeteneğini geliştiren yan cümleler
    case 'ileri-edebi': 
      return 35; // 16+ yetişkin grubu için edebî zenginlik ve serbestlik
    default: 
      return 12;
  }
}

export function validateCuratedContent() {
  let hasError = false;

  for (const story of ALL_CURATED_STORIES) {
    const targetLevel = story.metadata?.vocabularyPlan?.targetLevel;
    const maxWordLimit = getDynamicWordLimit(targetLevel);

    for (const bolum of story.legacy.bolumler) {
      // Cümleleri ayırıp kelime sayılarını dinamik limite göre kontrol ediyoruz
      const sentences = bolum.metin.split(/(?<=[.!?])\s+/);
      
      for (const sentence of sentences) {
        const wordCount = sentence.trim().split(/\s+/).filter(Boolean).length;
        
        if (wordCount > maxWordLimit) {
          console.error(`❌ HATA: "${story.legacy.baslik}" içerisindeki cümle limitini aştı!`);
          console.error(`Cümle (${wordCount} kelime): "${sentence}"`);
          console.error(`Bu seviye (${targetLevel}) için izin verilen maksimum limit: ${maxWordLimit}\n`);
          hasError = true;
        }
      }
    }
  }

  if (hasError) {
    process.exit(1);
  } else {
    console.log("✅ Tüm içerikler seviye bazlı dinamik Source of Truth kontrolünden başarıyla geçti!");
  }
}
