// Objectif : vérifier que les types publics sont importables.
import { takeoverCase, assessBusinessTakeover } from "../src/index.mjs";
const dossier = takeoverCase({
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
});
void assessBusinessTakeover(dossier, { decide: async () => ({}) });
