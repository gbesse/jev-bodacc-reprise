// Objectif : montrer qu’une décision incertaine est explicitement envoyée en revue humaine.
import assert from "node:assert/strict";
import { assessBusinessTakeover } from "../src/index.mjs";
import { createFakeProvider } from "../src/jev.mjs";
const dossier = {
  "id": "revue-1",
  "text": "L’annonce décrit une activité compatible avec le projet de reprise, mais le bail et la situation des salariés restent à confirmer.",
  "source": {
    "url": "https://example.test/dossier-ambigu",
    "date": "2026-09-20"
  },
  "details": {
    "origine": "donnée synthétique",
    "signal": "informations incomplètes"
  }
};
const provider = createFakeProvider(() => ({
  model: "jev-1.13.0",
  answers: { decision: {
    type: "choice",
    choice: "diligence_required",
    probabilities: {
  "promising_fit": 0.15,
  "diligence_required": 0.55,
  "high_risk": 0.15,
  "closed": 0.15
},
    confidence: 0.62,
  } },
  usage: { input_tokens: 140, output_tokens: 0 },
}));
const résultat = await assessBusinessTakeover(dossier, provider);
assert.equal(résultat.decision, "diligence_required");
assert.equal(résultat.review, true);
assert.equal(provider.calls, 1);
console.log(`Décision : ${résultat.label} · revue humaine : ${résultat.review} · confiance : ${résultat.confidence}`);
