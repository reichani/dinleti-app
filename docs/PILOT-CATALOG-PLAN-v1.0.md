# Okurio Pilot Catalog Plan v1.0

## Purpose

This plan converts the manifesto and PRD into a controlled 25-story pilot catalog. Every story remains primarily a reading experience. Social-emotional themes are delivered through character situations and optional reflection, never through diagnosis, therapy or clinical instruction.

## Approval status legend

- `DRAFT`
- `CONTENT REVIEW`
- `EXPERIENCE REVIEW`
- `APPROVED`
- `CHANGES REQUIRED`

## Track 1 — İlk Okuma

| ID | Working title | Primary theme | Main characters | Reflection |
|---|---|---|---|---|
| OR-01 | Oki A Sesini Buluyor | sound awareness | Oki | none |
| OR-02 | Oki E Sesini Duyuyor | sound awareness | Oki, Lili | none |
| OR-03 | Mino ve N Sesi | sound recognition | Mino | none |
| OR-04 | Lili ile L Sesi | early fluency | Lili | none |
| OR-05 | Toto T Sesini Arıyor | attention to letters | Toto | none |

## Track 2 — Dikkat ve Odak

| ID | Working title | Primary theme | Main characters | Reflection |
|---|---|---|---|---|
| OF-01 | Sessiz Ormandaki Ses | selective attention | Oki, Mino | none |
| OF-02 | Kırmızı Balonu Takip Et | visual focus | Lili, Oki | none |
| OF-03 | Kayıp Şapkanın Üç İpucu | task sequence | Oki | optional |
| OF-04 | Küçük Dedektif Oki | noticing details | Oki, Nana | none |
| OF-05 | İstasyondaki Tek Görev | one-step focus | Toto, Lili | optional |

## Track 3 — Duygu Tanıma ve İfade

| ID | Working title | Primary theme | Main characters | Reflection |
|---|---|---|---|---|
| OE-01 | Mino Neden Üzüldü? | recognising sadness | Mino, Oki | Sence Mino ne hissetti? |
| OE-02 | Lili'nin İçindeki Kıpırtı | naming worry | Lili, Nana | Lili duygusunu nasıl anlatabilirdi? |
| OE-03 | Toto Çok Sevindi | recognising excitement | Toto, Oki | Sevinç bedende nasıl hissedilebilir? |
| OE-04 | Oki Kırıldığını Söylüyor | expressing hurt | Oki, Mino | Oki duygusunu başka nasıl söyleyebilirdi? |
| OE-05 | Mino'nun Karışık Günü | mixed emotions | Mino, Lili | Aynı anda iki duygu olabilir mi? |

## Track 4 — Empati ve Perspektif Alma

| ID | Working title | Primary theme | Main characters | Reflection |
|---|---|---|---|---|
| OP-01 | Oki Yanlış Anladı | checking intent | Oki, Toto | Oki önce ne sorabilirdi? |
| OP-02 | Balon Kimin? | avoiding assumptions | Lili, Mino | İki arkadaş durumu farklı görmüş olabilir mi? |
| OP-03 | Mino'nun Sessiz Cevabı | noticing non-verbal cues | Mino, Oki | Mino konuşmasa da ne anlatmış olabilir? |
| OP-04 | Toto'nun Yerinden Bakınca | perspective taking | Toto, Lili | Toto'nun gördüğü şey neden farklıydı? |
| OP-05 | Yeni Arkadaşın İlk Günü | welcoming and inclusion | Oki, Lili, Mino | Yeni arkadaş ne hissetmiş olabilir? |

## Track 5 — Öz Düzenleme ve Dürtü Farkındalığı

| ID | Working title | Primary theme | Main characters | Reflection |
|---|---|---|---|---|
| OS-01 | Toto Bir An Durdu | pause before acting | Toto, Lili | Toto durunca ne değişti? |
| OS-02 | Sıra Bana Ne Zaman Gelecek? | waiting and turn-taking | Toto, Mino | Beklerken ne yardımcı olabilir? |
| OS-03 | Dokununca Ne Oldu? | interpreting accidental contact | Oki, Toto | Oki tepki vermeden önce ne sorabilirdi? |
| OS-04 | Kırılan Kule | frustration tolerance | Mino, Oki | Kule yıkılınca başka ne yapılabilirdi? |
| OS-05 | Önce Sor, Sonra Karar Ver | checking facts before reacting | Toto, Nana | Toto hangi soruyu sorabilirdi? |

## Content production order

### Template Package A

1. `OE-01 Mino Neden Üzüldü?`
2. `OS-01 Toto Bir An Durdu`

These two stories are the first implementation templates because together they validate:

- emotion recognition
- impulse awareness
- character dignity
- optional reflection
- glossary metadata
- Social-Emotional Reading Lead review
- Dyslexia and ADHD experience review

### Package B

- OR-01
- OF-01
- OP-01
- OS-02

### Package C

- remaining 19 stories after template acceptance

## Story acceptance record

Each story must store:

- `contentStatus`
- `productOwnerApproved`
- `accessibilityApproved`
- `dyslexiaExperienceApproved`
- `adhdExperienceApproved`
- `socialEmotionalReviewStatus`
- `clinicalBoundaryChecked`
- `copyrightChecked`
- `validationReport`

## Social-emotional editorial rules

1. Show the situation; do not lecture the reader.
2. Do not present one emotion as bad or wrong.
3. Do not label a character as aggressive, problematic, disordered or difficult.
4. Do not promise that one technique will control behaviour.
5. Allow repair, asking, waiting, explaining and choosing as narrative possibilities.
6. Keep reflection optional and open-ended.
7. Never store or score the child's reflection response in the pilot.
8. Avoid stories that reproduce a real child's identifiable incident too closely.

## Glossary target

- 3–8 words per story
- Initial target: approximately 125 controlled entries
- Definitions: one short age-appropriate sentence
- No clinical definitions in child-facing glossary
- Pronunciation is optional

## Pilot review roles

| Review area | Accountable role |
|---|---|
| Story quality and character consistency | Content Product Owner |
| Readability and interaction accessibility | Accessibility Product Owner |
| Decoding load and sentence complexity | Dyslexia Product Experience Lead |
| Attention load and story rhythm | ADHD Product Experience Lead |
| Emotion, empathy, impulse framing and clinical boundary | Social-Emotional Reading Lead |

## Immediate next implementation tasks

- [ ] Create the metadata schema in code
- [ ] Add content validator
- [ ] Draft `OE-01 Mino Neden Üzüldü?`
- [ ] Draft `OS-01 Toto Bir An Durdu`
- [ ] Add glossary records for both templates
- [ ] Add optional reflection metadata
- [ ] Run all five review gates
- [ ] Integrate approved templates into pilot catalog surface
