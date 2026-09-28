export const CONTENT_REVIEW_QUEUE_SCHEMA_VERSION = "1.0";

// One canonical review candidate per production story. Paths are data rather
// than imports so pending PR candidates can be recorded without entering the bundle.
export const CONTENT_REVIEW_QUEUE = Object.freeze([
  {
    productionStoryId: "arilar-neden-dans-eder",
    canonicalDraftPath: "src/content/drafts/2026-09-26-arilar-neden-dans-eder.js",
    supersededDraftPaths: ["src/content/drafts/2026-08-24-arilar-neden-dans-eder.js"],
    priority: 1,
  },
  {
    productionStoryId: "bir-tohumun-yolculugu",
    canonicalDraftPath: "src/content/drafts/2026-09-25-bir-tohumun-yolculugu.js",
    supersededDraftPaths: ["src/content/drafts/2026-08-25-bir-tohumun-yolculugu.js"],
    priority: 2,
  },
  {
    productionStoryId: "moon-not-star-en",
    canonicalDraftPath: "src/content/drafts/2026-09-09-moon-not-star-en.js",
    supersededDraftPaths: ["src/content/drafts/2026-08-03-the-moon-is-not-a-star.js"],
    priority: 3,
  },
  {
    productionStoryId: "lili-ile-at",
    canonicalDraftPath: "src/content/drafts/2026-08-30-lili-ile-at.js",
    supersededDraftPaths: ["src/content/drafts/2026-07-27-lili-ile-at.js"],
    priority: 4,
  },
  {
    productionStoryId: "kiyidaki-sessiz-istasyon",
    canonicalDraftPath: "src/content/drafts/2026-07-28-kiyidaki-sessiz-istasyon.js",
    supersededDraftPaths: [],
    priority: 5,
  },
  {
    productionStoryId: "mino-nerede",
    canonicalDraftPath: "src/content/drafts/2026-08-26-mino-nerede.js",
    supersededDraftPaths: ["src/content/drafts/2026-07-27-mino-nerede.js"],
    priority: 6,
  },
  {
    productionStoryId: "ali-ile-ela",
    canonicalDraftPath: "src/content/drafts/2026-08-27-ali-ile-ela.js",
    supersededDraftPaths: ["src/content/drafts/2026-07-25-ali-ile-ela.js"],
    priority: 7,
  },
]);

export function validateContentReviewQueue(queue = CONTENT_REVIEW_QUEUE) {
  const errors = [];
  const ids = new Set();
  const canonicalPaths = new Set();

  for (const item of queue) {
    if (!item.productionStoryId) errors.push("Queue item is missing productionStoryId.");
    if (ids.has(item.productionStoryId)) errors.push(`Duplicate productionStoryId: ${item.productionStoryId}.`);
    ids.add(item.productionStoryId);
    if (!item.canonicalDraftPath) errors.push(`${item.productionStoryId}: canonicalDraftPath is missing.`);
    if (canonicalPaths.has(item.canonicalDraftPath)) errors.push(`Duplicate canonicalDraftPath: ${item.canonicalDraftPath}.`);
    canonicalPaths.add(item.canonicalDraftPath);
    if (item.supersededDraftPaths?.includes(item.canonicalDraftPath)) {
      errors.push(`${item.productionStoryId}: canonical draft cannot supersede itself.`);
    }
  }

  return { valid: errors.length === 0, errors };
}
