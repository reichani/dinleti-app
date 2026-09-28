# Okurio Release Governance v3.0

## Authority model

Story content review is performed by the Okurio Content Quality Agent. The agent records evidence and may approve a deploy candidate, request changes, or block on unresolved factual, rights, safety or source risk. It never impersonates a human reviewer.

The only mandatory human decision is the Product Owner's end-to-end acceptance of the exact commit running on the permanent production URL.

## State flow

`DRAFT → AGENT_REVIEW → DEPLOY_CANDIDATE → DEPLOYED_AWAITING_PO → PUBLISHED`

A production rejection moves the same release lane to `REJECTED`; work stops and the system is corrected or rolled back to the last accepted production SHA.

## Gates

1. One canonical draft is registered for each production story.
2. Agent review is bound to the candidate commit SHA and all content checks contain evidence.
3. Required tests, catalog validators, build and reader regressions pass for that exact SHA.
4. Only one story is activated and deployed at a time.
5. The deployed SHA is verified on the permanent production URL.
6. Product Owner checks the complete production reading journey, mobile readability, TTS, highlighting, pause/resume and progress persistence.
7. Only an `accepted` decision for the same deployed SHA sets `publicationReady=true` and `PUBLISHED`.
8. The next story cannot start until the current story is accepted or rolled back.

## Field meaning

- `structuralValid`: deterministic story structure and language constraints passed.
- `agentContentReview.status=approved`: the content agent completed its evidence-backed review.
- `candidateDeployReady`: agent review and automated gates passed.
- `releaseReady`: automated candidate gate passed; this is not publication authority.
- `productionAcceptance.status=accepted`: Product Owner accepted the exact production SHA.
- `publicationReady`: exact-SHA production acceptance is complete.

Legacy `contentQualityReview` fields remain readable during migration but no longer represent the mandatory pre-deploy human gate for Governance v3 candidates.
