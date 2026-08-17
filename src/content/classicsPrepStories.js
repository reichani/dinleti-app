import { ODYSSEY_STORIES } from "./odysseyStories.js";

const highSchoolEdition = ODYSSEY_STORIES.find(
  ({ legacy }) => legacy.id === "odysseia-01-yetiskin-truvadan-ayrilis",
);

if (!highSchoolEdition) {
  throw new Error("Odysseia lise sürümü bulunamadı.");
}

const legacy = structuredClone(highSchoolEdition.legacy);
const metadata = structuredClone(highSchoolEdition.metadata);

legacy.id = "odysseia-01-klasiklere-hazirlik";
legacy.baslik = "Odysseia: Dönüş, Hafıza ve Kimlik";
legacy.yas = "14-16 yaş";
legacy.kategori = "Mitoloji ve Klasiklere Hazırlık";
legacy.ozet = "Odysseus'un dönüş kararlarını hafıza, aidiyet, liderlik ve sorumluluk kavramları üzerinden izleyen klasiklere hazırlık sürümü.";

metadata.ageBand = "14-16";
metadata.readingPathId = "klasiklere_hazirlik_14_16";
metadata.contentTrack = "classics-preparation";
metadata.primaryDevelopmentTheme = "memory-identity-and-responsible-return";
metadata.pilotEligible = false;
metadata.contentStatus = "candidate-deployed-human-review-pending";
metadata.optionalReflectionPrompt = "Odysseus'un eve dönüşü neden yalnızca bir yere ulaşmak değildir?";
metadata.vocabularyPlan = {
  targetLevel: "klasiklere-hazirlik",
  recurrence: ["aidiyet", "feraset", "metanet"],
  reviewOwner: "Türk dili ve klasikler editörü",
};
metadata.reviewNotes = [
  "Lise sürümünün kısa cümleli tam metni 14–16 klasiklere hazırlık sözleşmesine göre ayrı kanonik sürüm olarak paketlendi.",
  "Soyut kavramlar gemi denetimi, nöbet, rota ve aileye dönüş kararlarıyla somutlaştırılır.",
  "Kaynak çerçevesi Homeros'un Odysseia eseridir; modern Türkçe çevirilerden cümle alınmaz.",
  "Nihai yayın kararı isimli insan kalite incelemesine bağlıdır.",
];

export const CLASSICS_PREP_STORIES = [{ legacy, metadata }];
