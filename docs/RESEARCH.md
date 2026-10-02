# Jev Contract Graph — protocole de recherche


1. Collecter et figer les clauses, versions, sources de résolution, carnets et horodatages de réception. Ne pas reconstruire une disponibilité passée à partir d’une page actuelle.
2. Constituer un jeu initial d’au moins 200 paires annotées, avec ambiguïtés, sources différentes, annulations, égalités de seuil et fenêtres différentes. Ce nombre est une cible de démarrage, pas un calcul de puissance statistique.
3. Faire relire les labels et conserver les désaccords. Séparer les familles d’événements et les périodes entre réglage et test, afin d’éviter les quasi-doublons.
4. Comparer : règles seules ; recherche textuelle + règles ; modèle génératif + même moteur de paiement ; Jev + même moteur. Figer les questions, le modèle et les seuils avant le test réservé.
5. Mesurer précision des relations acceptées, rappel, abstention, Brier par question, latence p50/p95, coût par paire correctement validée et proportion d’opportunités encore présentes à l’arrivée de la décision.
6. Simuler les deux jambes avec barèmes effectifs, profondeur, exécutions partielles et capital immobilisé. Les contrats non binaires et les résolutions litigieuses nécessitent leurs propres états.

Ne retenir l’intégration Jev que si elle améliore le compromis coût/erreur à couverture comparable. Un résultat positif sur clauses ne démontre pas une rentabilité. La validation économique doit être prospective, après gel de la politique et avec intervalles d’incertitude.


## Statut

Moteur, interface, import/export et tests implémentés. Connecteur de découverte et adaptateur Jev implémentés ; disponibilité réseau/clé externe. Évaluation Jev réelle sur les quatre fixtures synthétiques réalisée le 2 octobre 2026 ([rapport](REVIEW-2026-10-02.md)). Corpus réel annoté, comparaison indépendante de modèles et validation prospective non réalisés.
