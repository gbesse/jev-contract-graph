# jev-contract-graph — contrôle d’adoption · adoption check · comprobación de adopción

## Français

Point de départ local, après la préparation indiquée dans le README :

```sh
npm run demo:depth
```

Un écart de prix apparent disparaît si la profondeur disponible ne couvre pas les deux jambes. Comparez les quantités du carnet synthétique avant de parler d’opportunité.

## English

Local starting point, after the setup described in the README:

```sh
npm run demo:depth
```

An apparent price spread disappears when available depth cannot cover both legs. Compare synthetic order-book quantities before calling it an opportunity.

## Español

Punto de partida local, después de la preparación descrita en el README:

```sh
npm run demo:depth
```

Una diferencia de precios aparente desaparece si la profundidad disponible no cubre ambas partes. Compare las cantidades del libro sintético antes de considerarla una oportunidad.
## Variante synthétique · Synthetic variation · Variante sintética

```text
requested_quantity=10; available_quantity=3
```

FR : adaptez une copie de la fixture locale à cette situation, puis vérifiez le comportement décrit ci-dessus. Les valeurs sont illustratives, pas des résultats Jev mesurés.

EN: adapt a copy of the local fixture to this situation, then check the behavior described above. Values are illustrative, not measured Jev output.

ES: adapte una copia de la fixture local a esta situación y compruebe el comportamiento descrito arriba. Los valores son ilustrativos, no resultados Jev medidos.

## Second cas · Second case · Segundo caso

```text
quote_age_seconds=120; max_age_seconds=30
```

**FR :** Un carnet périmé ne permet pas de conclure à un prix exécutable. Rafraîchissez les deux jambes avant de comparer les preuves de payoff.

**EN:** A stale order book cannot establish an executable price. Refresh both legs before comparing payoff proofs.

**ES:** Un libro de órdenes obsoleto no establece un precio ejecutable. Actualice ambas partes antes de comparar las pruebas de pago.
