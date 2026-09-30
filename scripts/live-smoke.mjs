// Objectif : effectuer un appel Jev synthétique uniquement sur demande explicite.
import { createJevClient } from "../src/jev.mjs";
import { assessBusinessTakeover } from "../src/index.mjs";
const client = createJevClient();
const résultat = await assessBusinessTakeover({
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
}, client);
console.log(JSON.stringify({ décision: résultat.decision, confiance: résultat.confidence, usage: résultat.usage }, null, 2));
