# Bible de style — Livres-jeux

Référence à consulter avant d'écrire un nouveau récit ou d'y retoucher. Capture ce qui fonctionne dans *La Clé des Cryptes* et *La Captive de Château Vaudragne*, pas une théorie générale de l'écriture — à faire évoluer au fil des retours de jeu réels.

## Voix et ton

- Français, deuxième personne ("tu"), dark fantasy, jamais ironique ni méta.
- 2 à 4 phrases par paragraphe en général ; plus long pour l'intro, le climax, les fins. La densité de prose n'a pas besoin d'être uniforme — le nombre de paragraphes compte plus que leur longueur individuelle pour le sentiment de volume.
- Priorité au sensoriel (froid, son, odeur, lumière) sur l'exposition. Une salle se décrit par ce qu'on y sent avant ce qu'elle "est".
- Les noms de lieux/PNJ sont français et évocateurs, jamais anglicisés sauf volontairement (ex. les items ont des noms français : "Fumigène de fortune", pas "Smoke Bomb").
- Intro (§1) toujours multi-paragraphes via `\n\n` (le CSS applique `white-space: pre-line`) : accroche, contexte/enjeux, arrivée sur les lieux. Viser 3-4 paragraphes, jamais un pavé unique.

## Structure narrative

- **Vraie ramification, pas de fausse convergence immédiate.** Un choix d'approche en début de récit doit changer le contenu pendant un vrai tronçon, pas juste la première case. Mais éviter aussi l'isolement total (leçon de Vaudragne v1) : préférer un **hub-and-spoke** — l'entrée colore la première rencontre puis rejoint un espace partagé explorable dans n'importe quel ordre — plutôt que 3 histoires parallèles sans le moindre point commun. Voir "Piège des zones à ponts" plus bas.
- La plupart des objets doivent être **communs** (obtenables quelle que soit l'entrée/l'ordre d'exploration). Réserver l'exclusivité mutuelle à un sous-choix ponctuel et assumé (ex. sceau vs parchemin dans la même aile de Vaudragne), jamais à un bloc entier de récit.
- Le climax final gagne à offrir 3-4 approches alternatives conditionnées par objet (`requiresItem`), plus toujours une option par défaut ("attaquer de front") qui ne nécessite rien — le récit doit rester finissable même sans avoir tout exploré.
- Épilogue bref avant chaque "FIN —" (un ou deux paragraphes de transition), pas de coupure brutale entre le dernier choix et le texte de fin.
- Volume cible pour un récit "comparable" aux deux existants : 75-95 paragraphes, 4-5 fins non mortelles, 10-17 fins de mort selon la richesse structurelle.

## Difficulté et combats (règles FF)

- Stats de départ : Compétence 1D6+6 (7-12), Endurance 2D6+12 (14-24), Chance 1D6+6 (7-12). Ne jamais dévier de cette formule.
- Compétence ennemie comme curseur de rareté de mort : ≤7 face à un joueur moyen (~9,5) → mort très rare (bon pour un ennemi d'ambiance/premier combat) ; 9-10 → menace sérieuse et régulière. Mesurer avec `test-engine.mjs` (200 parties aléatoires) plutôt que deviner — les probabilités FF (2D6 opposé) ne sont pas intuitives.
- Chaque ennemi/piège notable mérite son propre `loseTarget` et son propre texte de mort avec `title` distinct (voir `ENDING_ICONS`/`spoiler` dans `achievementsShared.js` pour les fins comme succès). Toujours prévoir un `deathFallbackId` générique par récit pour l'épuisement/dégâts cumulés — jamais partagé entre récits (les espaces d'ids se recoupent).
- Marquer le ou les combats de climax avec `combat.boss: true` (sélection de la piste audio).

## Objets

- Un item "soin" générique par récit, détecté par le moteur via le champ `healAmount` (pas par id codé en dur) — toujours lui donner ce champ.
- Nommer les items et écrire leur `description` comme des objets qu'on décrirait dans le récit lui-même, pas comme des entrées de catalogue de jeu vidéo.

## Pièges d'ingénierie à ne pas refaire

- **Zones à ponts.** Dès qu'un récit a plusieurs sous-zones explorables censées être combinables (comme les ailes de Vaudragne), chaque sortie de sous-zone doit explicitement proposer l'autre sous-zone en plus de la suite — sinon elles s'excluent silencieusement. `verify-story.mjs` ne détecte PAS ce genre de bug (il vérifie l'atteignabilité, pas les combinaisons d'objets). Le seul moyen fiable de le repérer : une partie scriptée pas à pas qui traverse volontairement plusieurs zones et vérifie l'inventaire final (voir comment le bug §214/§242 de Vaudragne a été trouvé).
- **Choix qui partagent un `targetId`.** C'est très courant ("prendre l'objet" / "laisser l'objet" mènent au même paragraphe suivant) et c'est voulu — le moteur dispatche par **index** dans `paragraph.choices`, jamais par `targetId` (corrigé après un vrai bug trouvé en jouant). Pas d'action requise en écrivant le contenu, juste ne pas réintroduire une résolution par `targetId` côté moteur.
- Toujours donner un `title` à chaque fin (`ending`) — requis par `verify-story.mjs` et par le système de succès.
- Toujours lancer `node scripts/verify-story.mjs` puis `node scripts/test-engine.mjs` après toute modification de `data/*-story.js`, et corriger jusqu'à zéro échec avant de considérer un récit jouable.

## Checklist avant de fusionner un nouveau récit dans `main`

1. `node --check` sur tous les fichiers JS touchés.
2. `node scripts/verify-story.mjs` — zéro erreur, sur tous les récits du registre (pas seulement le nouveau).
3. `node scripts/test-engine.mjs` — zéro échec.
4. Partie scriptée manuelle si le récit a des zones à ponts (voir plus haut) — confirmer que les objets de zones différentes sont bien combinables si c'est l'intention.
5. Playtest humain réel (impossible de le faire moi-même ici, pas de navigateur) — demander au joueur de parcourir chaque approche/branche au moins une fois avant de considérer le récit stable.
6. CLAUDE.md mis à jour (nombre de paragraphes/fins, description du récit dans "Récits disponibles").
7. Travail fait sur une branche dédiée, fusionné dans `main` seulement une fois 1-6 validés (`main` == page publique GitHub Pages, ne jamais y pousser directement du contenu non vérifié).
