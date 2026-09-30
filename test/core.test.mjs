// Objectif : vérifier la normalisation, la règle déterministe et la décision sémantique.
import test from "node:test";
import assert from "node:assert/strict";
import { takeoverCase, assessBusinessTakeover } from "../src/index.mjs";
import { createFakeProvider } from "../src/jev.mjs";
const edge = {
  "id": "limite-1",
  "text": "Cas synthétique traité par une règle déterministe avant toute analyse sémantique.",
  "source": {
    "url": "https://example.test/cas-limite",
    "date": "2026-09-16"
  },
  "saleStatus": "cancelled"
};
test("exige une source", () => assert.throws(() => takeoverCase({ id: "x", text: "y" }), /source/));
test("applique le cas limite sans appel Jev", async () => { const provider = createFakeProvider(() => { throw new Error("appel interdit"); }); assert.equal((await assessBusinessTakeover(edge, provider)).decision, "closed"); assert.equal(provider.calls, 0); });
test("classe un dossier sourcé", async () => { const provider = createFakeProvider(() => ({ model: "jev-1.13.0", answers: { decision: { type: "choice", choice: "diligence_required", probabilities: {
  "promising_fit": 0.05,
  "diligence_required": 0.85,
  "high_risk": 0.05,
  "closed": 0.05
}, confidence: 0.85 } }, usage: { input_tokens: 10, output_tokens: 0 } })); const result = await assessBusinessTakeover({
  "id": "exemple-1",
  "text": "Fonds de commerce de boulangerie cédé avec activité maintenue, bail à examiner et passif non documenté.",
  "source": {
    "url": "https://example.test/donnee-source",
    "date": "2026-09-15"
  },
  "details": {
    "territoire": "Commune Exemple",
    "origine": "donnée synthétique"
  }
}, provider); assert.equal(result.decision, "diligence_required"); assert.equal(result.review, false); });
