# Jev Contract Graph

Verify implications between reviewed binary contracts, inspect conditional payoff proofs, and simulate both legs against supplied order books.

[![CI](https://github.com/gbesse/jev-contract-graph/actions/workflows/ci.yml/badge.svg)](https://github.com/gbesse/jev-contract-graph/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**Research prototype · read-only · synthetic demo included.** This is working software, not evidence of profitable trading or validated model superiority. The UI and detailed usage notes are in French. No wallet or financial execution is implemented.

## Quick start

Node.js 22 or later. No dependencies to install.

```bash
git clone https://github.com/gbesse/jev-contract-graph.git
cd jev-contract-graph
npm start
```

Open <http://127.0.0.1:4318>. The server binds to loopback only. Use `PORT=4320 npm start` to choose another port.

## Utilisation

Le scénario initial est entièrement fictif. Modifier les paramètres, inspecter les preuves et exporter le dossier JSON. Pour analyser ses données, télécharger l’exemple dans l’interface, le compléter puis l’importer. [data/demo.json](data/demo.json) documente le format `contracts` ; importer cet objet ou un dossier exporté précédemment. Les changements restent dans la page ; recharger restaure la démonstration.


Chaque marché contient : `id`, `title`, `rulesText`, `reviewed`, `reviewEvidence`, `normalized` et éventuellement `quotes.yes` / `quotes.no`.

`normalized` précise `asset`, `source`, `currency`, `settlement`, `voidPolicy`, `kind`, `comparator`, `threshold`, `start`, `end`, `payoutCurrency`, `payoutPerShare`. Le paiement pris en charge doit être explicitement déclaré : `payoutCurrency: "USD"`, `payoutPerShare: 1`. Les imports sans cette déclaration sont écartés. `reviewed: true` est une **déclaration du préparateur des données**, pas une vérification cryptographique ou une validation par le modèle. `reviewEvidence` doit décrire les clauses et la revue qui justifient cette déclaration.

Le moteur prend en charge `kind: anytime` (franchissement à un moment de la fenêtre) et `terminal` (valeur à la fin), et les comparateurs `gt` / `gte`. Une implication est dérivée de seuils et fenêtres emboîtés avec mêmes sources et clauses. Deux observations terminales de dates différentes ne sont pas comparées. Le seul règlement pris en charge est binaire 0/1, `voidPolicy: binary-only` ; les annulations et remboursements exigent une extension du modèle d’états.

Un carnet contient `currency: "USD"`, `observedAt` et `asks: [{price, size}]`. Les niveaux sont triés et consommés pour calculer le coût réel à la taille demandée. Les carnets futurs, trop vieux ou désynchronisés, les marchés échus et les profondeurs insuffisantes sont écartés. `feeBps` et `bufferBps` sont des hypothèses proportionnelles ; ils ne reproduisent pas le barème effectif d’une plateforme. Aucun routage d’ordre, aucune vente à découvert, aucun wallet, aucun profit garanti.


## Exemple hors ligne · Offline example · Ejemplo sin conexión

`npm run demo:stale` compare la fixture synthétique avec une copie dont un carnet est périmé. Le moteur exclut alors le candidat ; aucun ordre ni appel Jev n'est lancé. Cela illustre une règle de refus, sans prédire un gain réel.

`npm run demo:stale` compares the synthetic fixture with a copy whose order book is stale. The engine then excludes the candidate; it places no order and makes no Jev call. This demonstrates a rejection rule, not a real return forecast.

`npm run demo:stale` compara la fixture sintética con una copia cuyo libro de órdenes está desactualizado. El motor excluye entonces el candidato; no envía órdenes ni llama a Jev. Muestra una regla de rechazo, no una predicción de beneficio real.

## Jev, en option

Les moteurs fonctionnent sans clé. Copier `.env.example` vers `.env`, définir `TYPESAFE_API_KEY`, puis démarrer avec :

```bash
node --env-file=.env src/server.js
```

La clé reste côté serveur. Les textes saisis sont envoyés à TypeSafe uniquement lorsque vous cliquez sur « Évaluer avec Jev ». La classification d’incident envoie aussi les noms des cibles proposées. Les jugements restent séparés de la validation des données : Jev ne certifie ni les clauses ni la réalité d’un incident, et ne modifie pas les analyses automatiquement.

L’adaptateur utilise la [System One API](https://docs.typesafe.ai/api), avec `jev-1.13.0` par défaut. Les distributions sont validées ; les reçus incluent modèle demandé/résolu, empreinte de requête et latence. Une erreur ne devient jamais un résultat fictif. Des appels réels ont été exécutés le 2 octobre 2026 : voir la [revue et les résultats](docs/REVIEW-2026-10-02.md).

## Sources publiques

Le connecteur Polymarket Gamma consulte les 100 premiers marchés actifs et filtre les mots-clés crypto. C’est une découverte partielle de règles brutes, sans normalisation certifiée ni carnets live. La connexion a rencontré une erreur TLS dans l’environnement de développement ; la validation des certificats reste active.

## Tests et évaluation

```bash
npm test
npm run check
npm run eval                        # plan seulement, aucun appel
node --env-file=.env src/evaluate.js --live --max-calls 4
```

Le jeu d’évaluation contient quatre cas synthétiques. L’option `--live` réalise des appels fournisseur potentiellement payants, plafonnés par `--max-calls`. Les labels ne sont pas transmis au modèle. Le rapport `output/jev-evaluation.json` contient exactitude, Brier multiclasse, couverture et exactitude au seuil de confiance. Il ne mesure pas une calibration financière sur données réelles. Un échec interrompt l’exécution ; la reprise et les checkpoints ne sont pas encore implémentés.

[Protocole de recherche et limites](docs/RESEARCH.md) · [Contribuer](CONTRIBUTING.md) · [Sécurité](SECURITY.md)

## Licence

[MIT](LICENSE). Projet indépendant, sans affiliation revendiquée avec TypeSafe ou les fournisseurs de données.

Projet compagnon : [jev-exposure-radar](https://github.com/gbesse/jev-exposure-radar).

## Revue du 4 octobre 2026

Les tables de preuve des contrats équivalents ne présentent désormais que les deux états possibles (tous deux faux ou tous deux vrais), chacun payant 1 USD par paire. Le plancher calculé reste inchangé. Une cible HTTP malformée reçoit une erreur 400 sans arrêter le serveur local. Les 25 tests hors ligne, le plan d’évaluation et l’exemple de carnets périmés passent ; aucun nouvel appel Jev n’a été nécessaire pour ces corrections.

## October 2026 improvement · Amélioration d’octobre 2026 · Mejora de octubre de 2026

Run `npm run demo:depth` to see how shallow synthetic order books remove an apparent candidate, despite an attractive best price. This is paper analysis only.

Exécutez `npm run demo:depth` pour voir comment des carnets synthétiques peu profonds écartent un candidat apparent malgré un meilleur prix attrayant. Il s’agit uniquement d’une analyse sur papier.

Ejecute `npm run demo:depth` para ver cómo libros de órdenes sintéticos poco profundos descartan un candidato aparente pese a un mejor precio atractivo. Es solo un análisis teórico.
