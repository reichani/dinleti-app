const sentenceList = (text) =>
  String(text ?? "")
    .split(/(?<=[.!?…])\s+/u)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

export function sectionParagraphs(section, { maxSentences = 3 } = {}) {
  const explicit = section?.paragraphs;
  if (Array.isArray(explicit) && explicit.some((paragraph) => String(paragraph ?? "").trim())) {
    return explicit.map((paragraph) => String(paragraph ?? "").trim()).filter(Boolean);
  }

  const text = String(section?.metin ?? section?.text ?? section?.content ?? "").trim();
  if (!text) return [];

  const authored = text.split(/\n\s*\n/u).map((paragraph) => paragraph.trim()).filter(Boolean);
  if (authored.length > 1) return authored;

  const sentences = sentenceList(text);
  if (sentences.length === 0) return [text];

  const paragraphs = [];
  for (let index = 0; index < sentences.length; index += maxSentences) {
    paragraphs.push(sentences.slice(index, index + maxSentences).join(" "));
  }
  return paragraphs;
}

export { sentenceList };
