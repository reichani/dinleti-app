const REQUIRED_METADATA_FIELDS = [
  "ageBand",
  "estimatedMinutes",
  "pilotEligible",
  "contentTrack",
  "primaryDevelopmentTheme",
  "contentStatus",
  "productOwnerApproved",
  "accessibilityApproved",
  "dyslexiaExperienceApproved",
  "adhdExperienceApproved",
  "socialEmotionalReviewStatus",
  "characters",
  "glossary",
  "clinicalBoundaryChecked",
  "copyrightChecked",
];

const CLINICAL_OR_SHAMING_PATTERNS = [
  /tedavi/iu,
  /terapi/iu,
  /tanı/iu,
  /teşhis/iu,
  /bozukluk/iu,
  /problemli çocuk/iu,
  /yaramaz/iu,
  /kötü çocuk/iu,
  /saldırgan çocuk/iu,
];

const splitSentences = (text) =>
  text
    .split(/(?<=[.!?])\s+/u)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

const countWords = (text) =>
  text
    .trim()
    .split(/\s+/u)
    .filter(Boolean).length;

export function validatePilotStory(story) {
  const errors = [];
  const warnings = [];

  if (!story?.legacy || !story?.metadata) {
    return {
      valid: false,
      errors: ["Story must contain legacy and metadata objects."],
      warnings,
      metrics: null,
    };
  }

  const { legacy, metadata } = story;

  if (!legacy.id) errors.push("Missing story id.");
  if (!legacy.baslik) errors.push(`Story ${legacy.id || "unknown"} is missing a title.`);
  if (!Array.isArray(legacy.bolumler) || legacy.bolumler.length === 0) {
    errors.push(`Story ${legacy.id || "unknown"} must contain at least one section.`);
  }

  for (const field of REQUIRED_METADATA_FIELDS) {
    if (metadata[field] === undefined || metadata[field] === null) {
      errors.push(`Story ${legacy.id || "unknown"} is missing metadata.${field}.`);
    }
  }

  if (metadata.estimatedMinutes < 2 || metadata.estimatedMinutes > 5) {
    errors.push(`Story ${legacy.id} must be between 2 and 5 minutes.`);
  }

  if (!Array.isArray(metadata.characters) || metadata.characters.length === 0) {
    errors.push(`Story ${legacy.id} must list at least one Okurio character.`);
  }

  if (!Array.isArray(metadata.glossary) || metadata.glossary.length < 3 || metadata.glossary.length > 8) {
    errors.push(`Story ${legacy.id} must contain 3 to 8 glossary entries.`);
  }

  for (const item of metadata.glossary || []) {
    if (!item.word || !item.definition) {
      errors.push(`Story ${legacy.id} has an incomplete glossary entry.`);
    }
    if (item.definition && countWords(item.definition) > 14) {
      warnings.push(`Glossary definition for "${item.word}" is longer than 14 words.`);
    }
  }

  if (metadata.optionalReflectionPrompt) {
    if (!metadata.clinicalBoundaryChecked) {
      errors.push(`Story ${legacy.id} has a reflection prompt without clinical boundary review.`);
    }
    if (countWords(metadata.optionalReflectionPrompt) > 12) {
      warnings.push(`Story ${legacy.id} reflection prompt is longer than 12 words.`);
    }
  }

  const sectionTexts = (legacy.bolumler || []).map((section) => section.metin || "");
  const fullText = sectionTexts.join(" ").trim();
  const sentences = splitSentences(fullText);
  const wordCounts = sentences.map(countWords);
  const totalWords = wordCounts.reduce((sum, value) => sum + value, 0);
  const averageWordsPerSentence = sentences.length ? totalWords / sentences.length : 0;

  wordCounts.forEach((wordCount, index) => {
    if (wordCount > 12) {
      errors.push(
        `Story ${legacy.id}, sentence ${index + 1} has ${wordCount} words; maximum is 12.`,
      );
    }
  });

  if (averageWordsPerSentence < 6 || averageWordsPerSentence > 10) {
    warnings.push(
      `Story ${legacy.id} averages ${averageWordsPerSentence.toFixed(1)} words per sentence; target is 6 to 10.`,
    );
  }

  for (const section of legacy.bolumler || []) {
    const sentenceCount = splitSentences(section.metin || "").length;
    if (sentenceCount > 4) {
      warnings.push(
        `Section "${section.ad}" contains ${sentenceCount} sentences. Keep visible paragraphs to a maximum of three sentences in the UI.`,
      );
    }
  }

  for (const pattern of CLINICAL_OR_SHAMING_PATTERNS) {
    if (pattern.test(fullText) || pattern.test(legacy.ozet || "")) {
      errors.push(`Story ${legacy.id} contains prohibited clinical or shaming language: ${pattern}.`);
    }
  }

  if (!metadata.primaryDevelopmentTheme) {
    errors.push(`Story ${legacy.id} must have one primary developmental theme.`);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    metrics: {
      storyId: legacy.id,
      sentenceCount: sentences.length,
      totalWords,
      averageWordsPerSentence: Number(averageWordsPerSentence.toFixed(2)),
      longestSentenceWords: wordCounts.length ? Math.max(...wordCounts) : 0,
      glossaryCount: metadata.glossary?.length || 0,
      estimatedMinutes: metadata.estimatedMinutes,
    },
  };
}

export function validatePilotCatalog(stories) {
  const seenIds = new Set();
  const catalogErrors = [];
  const storyReports = [];

  for (const story of stories) {
    const id = story?.legacy?.id;
    if (id && seenIds.has(id)) {
      catalogErrors.push(`Duplicate story id: ${id}.`);
    }
    if (id) seenIds.add(id);
    storyReports.push(validatePilotStory(story));
  }

  return {
    valid: catalogErrors.length === 0 && storyReports.every((report) => report.valid),
    catalogErrors,
    storyReports,
    summary: {
      storyCount: stories.length,
      validStoryCount: storyReports.filter((report) => report.valid).length,
      errorCount:
        catalogErrors.length +
        storyReports.reduce((sum, report) => sum + report.errors.length, 0),
      warningCount: storyReports.reduce(
        (sum, report) => sum + report.warnings.length,
        0,
      ),
    },
  };
}
