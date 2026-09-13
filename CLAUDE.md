# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Livres-jeux — Notes de passation

Livres dont vous êtes le héros classiques (paragraphes numérotés, arborescence figée écrite à la main, règles Fighting Fantasy). Vanilla JS/HTML/CSS, aucun build tool, ES Modules natifs. Deux récits jouables aujourd'hui, choisis depuis l'écran d'accueil — voir "Récits disponibles" plus bas.

**Projet frère indépendant** d'un roguelite personnel ("Les Cryptes Oubliées") — même univers dark fantasy, mais aucune génération procédurale ici : chaque récit est écrit entièrement à la main dans son propre fichier `js/data/<récit>-story.js`. Ne pas réintroduire de mécaniques roguelite (postures de combat, classes, XP, donjon procédural) — c'est précisément ce que ce projet évite.

## Lancer le projet

```
npx serve .
```

## Vérifier l'intégrité du récit et du moteur

```
node scripts/verify-story.mjs
node scripts/test-engine.mjs
```

`verify-story.mjs` (statique) : pour **chaque récit du registre** — liens de paragraphes valides, exactement un des quatre champs par paragraphe, accessibilité depuis le §1, chaque fin atteignable, chaque `loseTarget` de combat pointe vers une fin de mort, chaque fin a un `title`, `deathFallbackId` valide. À relancer après toute modification d'un fichier `data/*-story.js`.

`test-engine.mjs` (dynamique) : bornes des caractéristiques à la création, clamp/`isAlive` de `applyStatDelta`, inventaire avec quantités, invariants de `combatRound` sur 100 combats simulés, et pour **chaque récit du registre** 200 parties aléatoires jouées du §1 jusqu'à une fin via les vrais modules moteur (pas de mock des dés) — détecte les cycles, les culs-de-sac et les incohérences `isAlive`/type de fin. À relancer après toute modification de `engine/` ou d'un fichier `data/*-story.js`.

## Récits disponibles

Choisis depuis l'écran d'accueil (une carte par récit, avec ses propres boutons Nouvelle partie / Continuer / Succès) :

- **La Clé des Cryptes** (`cle-des-cryptes`) — 79 paragraphes, exploration d'un donjon avec plusieurs embranchements optionnels qui convergent vers un tronc commun. 15 fins (4 non mortelles, 11 de mort contextuelle). 4 objets optionnels (torche, dague, amulette, clochette) — tous obtenables dans la même partie, débloquant des approches alternatives au climax final.
- **La Captive de Château Vaudragne** (`chateau-vaudragne`) — 82 paragraphes, mission de sauvetage, structure **hub-and-spoke** (pas 3 histoires isolées) : au §2, l'entrée choisie (grande porte = intrigue de cour, brèche = assaut, poterne = infiltration) ne colore que la première rencontre et rejoint vite une cour commune (§103/§203/§303), d'où deux ailes explorables — l'aile noble (grande salle/bibliothèque/bal masqué) et les communs (armurerie/caves/cachots) — sont accessibles **dans n'importe quel ordre et depuis n'importe quelle entrée**, avec des nœuds-pont (§130/§230 entre les deux ailes, §214/§242 entre armurerie et caves-cachots) qui permettent de tout visiter en une seule partie. Presque tous les objets sont communs (épée bénie, clé des cachots, poison) ; seuls le sceau et le parchemin restent mutuellement exclusifs l'un de l'autre (sous-choix à l'intérieur de l'aile noble, pas une exclusion de voie), et le fumigène est un petit bonus propre à l'entrée par la brèche. Au climax (§400), l'approche reste conditionnée aux objets réellement en poche, quelle que soit la façon dont ils ont été rassemblés. 17 fins (5 non mortelles dont une résolution non-violente, 12 de mort).

## Architecture

```
index.html                  Page unique : fiche d'aventure (sidebar) + zone de lecture/accueil, bouton muet dans l'en-tête
css/style.css
assets/                     Fournis par l'utilisateur (musique, sprites, icônes) — seule une petite sélection est référencée par le code aujourd'hui (voir ambiance sonore ci-dessous) ; le reste attend un usage futur (portraits d'ennemis, icônes d'objets, etc.)
scripts/
  verify-story.mjs  Contrôle d'intégrité du graphe de paragraphes, pour chaque récit du registre (voir ci-dessus)
  test-engine.mjs   Tests du moteur : invariants + parties aléatoires complètes, pour chaque récit du registre (voir ci-dessus)
js/
  data/
    story.js / items.js                              Paragraphes/objets de *La Clé des Cryptes*
    vaudragne-story.js / vaudragne-items.js           Paragraphes/objets de *La Captive de Château Vaudragne*
    cryptes-achievements.js / vaudragne-achievements.js  Succès "objets/exploration" propres à chaque récit (voir Système de succès plus bas)
    achievementsShared.js  buildEndingAchievements(story) : génère automatiquement la catégorie "Fins découvertes" à partir des paragraphes de fin d'UN récit — la seule partie du système de succès qui est générique
    stories.js     Registre : STORIES (tableau) + getStoryById(id). Chaque entrée = { id, title, description, paragraphs, items, deathFallbackId, achievements }. C'est le SEUL endroit qui assemble un récit ; tout le reste du code lit `getStoryById(state.storyId)`, jamais d'import direct de PARAGRAPHS/ITEMS d'un récit particulier
  engine/          Logique pure, aucun accès au DOM, générique vis-à-vis du récit actif
    dice.js          rollD6/roll2D6
    character.js     createCharacter (stats FF classiques : Compétence/Endurance/Chance), inventaire
    combat.js        Combat classique FF (jet opposé 2D6+Compétence, -2 Endurance au perdant du round), Tenter sa Chance
    story.js         `createGameState(storyId)` — l'état de partie porte son `storyId` et reste ainsi toujours cohérent avec son récit (paragraphes, objets, `deathFallbackId` résolus via `getStoryById(state.storyId)` à chaque appel, jamais mis en cache). `usePotionOfHealing` trouve l'objet soignant générique via son champ `healAmount`, sans connaître son id.
    persistence.js   Sauvegarde/chargement de la partie via localStorage (`lcdc:save:<storyId>:v1`), plus 2 registres cumulés par récit et indépendants de la partie en cours : paragraphes visités toutes parties confondues (`lcdc:visited:<storyId>:v1`), succès débloqués dont les fins (`lcdc:achievements:<storyId>:v1`) — toutes les clés préfixées par storyId pour qu'aucun récit ne corrompe la progression d'un autre ; échoue silencieusement si localStorage indisponible (navigation privée, quota)
  ui/
    domHelpers.js         el()/clear()
    endingLabels.js        ENDING_LABELS partagé (icône + libellé par type de fin), utilisé par renderStory (bandeau de fin en jeu, pas la fenêtre des succès)
    audio.js                Ambiance sonore : une piste par scène (exploration/combat/boss/victoire/mort) choisie dans assets/, partagée entre tous les récits ; le combat "boss" est repéré via le flag générique `combat.boss: true` sur le paragraphe (pas par nom d'ennemi)
    toast.js                Notification éphémère (succès débloqué) en bas à droite de l'écran, conteneur créé à la volée, aucune balise dédiée dans index.html
    renderHome.js          Écran d'accueil : une carte par récit du registre (titre/résumé, Nouvelle partie / Continuer si sauvegarde, bouton "🏆 Succès (X%)")
    renderAchievements.js  Fenêtre des succès d'UN récit (reçoit sa liste `achievements` et son titre en paramètres) : groupée par catégorie, icône 🔒 pour les non débloqués, titre/description masqués ("❓ Fin non découverte") pour les succès `spoiler` non débloqués, compteur de progression pour la catégorie "Exploration"
    renderStory.js        Texte du paragraphe courant + choix (boutons désactivés si objet requis manquant) ; récapitulatif de fin de partie (stats finales, paragraphes traversés, combats gagnés, tests de Chance) sur les paragraphes terminaux
    renderCombat.js       Vue de combat (journal, bouton Attaquer, Tenter sa Chance)
    renderCharacterSheet.js  Fiche d'aventure permanente (stats, inventaire — reçoit le catalogue `items` du récit actif en paramètre —, bouton "boire" générique basé sur `healAmount`, bouton "Abandonner l'aventure")
  main.js          Point d'entrée : bascule les 3 écrans (accueil/partie/succès), câblage handlers → engine → re-render, persistance + évaluation des succès (avec notification toast) à chaque action, sélection de la piste audio selon la scène
```

L'application a trois écrans, pilotés par une variable `screen` (`'home' | 'game' | 'achievements'`) dans `main.js` (pas de routeur, juste des `if` dans `renderView()`) : l'accueil (`renderHome`, une carte par récit), la fenêtre des succès (`renderAchievements`, pour le récit dont la carte a été cliquée — `achievementsStoryId`), et la partie en cours (fiche + zone de lecture/combat, musique d'ambiance selon la scène). À chaque rendu d'écran de jeu, `persistState()` enregistre le paragraphe courant dans le registre cumulé des paragraphes visités **du récit en cours**, réévalue tous les succès non encore débloqués de ce récit (`evaluateAchievements()` dans `main.js`, un simple `check(state, context)` par succès — un succès débloqué le reste pour toujours, même si la condition redevient fausse plus tard, ex. la potion consommée ; chaque nouveau déblocage déclenche `showToast('🏆 ' + titre)`), puis sauvegarde l'état complet tant qu'aucune fin n'est atteinte ; à l'arrivée sur une fin, le succès `fin-<id>` correspondant se débloque via le même mécanisme et la sauvegarde de partie est effacée (rien à "continuer" sur un paragraphe terminal). Le bouton "Abandonner l'aventure" de la fiche (avec confirmation `window.confirm`) ramène à l'accueil à tout moment sans attendre une fin, en effaçant la sauvegarde en cours.

## Format des paragraphes (`data/*-story.js`)

Chaque paragraphe a **exactement un** des quatre champs suivants :
- `choices: [{ label, targetId, requiresItem?, grantItem?, removeItem?, effect?: {stat, amount}, deathTarget? }]` — un ou plusieurs choix ; les effets (objet gagné/perdu, dégât) s'appliquent au moment où le choix est pris, pas à l'arrivée sur le paragraphe cible.
- `luckTest: { successTarget, failTarget, successEffect?, failEffect?, deathTarget? }` — jet de Chance automatique (2D6 ≤ Chance actuelle), Chance décrémentée de 1 dans tous les cas.
- `combat: { enemy: {name, icon, skill, stamina}, winTarget, loseTarget, boss? }` — combat classique FF, résolu round par round dans `renderCombat.js`. `boss: true` sélectionne la piste audio "boss" plutôt que "combat" (voir `main.js::pickAmbientTrack`).
- `ending: 'victory' | 'partial' | 'flee' | 'death'` — paragraphe terminal, aucune navigation possible sinon "Recommencer".

Toute perte de PV (Endurance) à 0 redirige automatiquement vers le `deathFallbackId` du récit actif via `engine/story.js::resolveDestination`, mais **le paragraphe est contextuel, pas générique** : une défaite en combat redirige toujours vers le `loseTarget` propre à ce combat (un texte de mort par ennemi) ; une mort par effet de choix ou de test de Chance peut préciser son propre `deathTarget` (ex. le piège de pierres §18 des Cryptes, la corde du puits §226 de Vaudragne) ou retombe sur le `deathFallbackId` générique du récit (épuisement/dégâts cumulés) si aucun n'est fourni. Chaque récit a le sien : §70 pour les Cryptes, §590 pour Vaudragne — jamais partagés entre récits puisque les espaces d'ids se recoupent.

## État actuel

**Fait** : moteur complet (paragraphes, choix conditionnels par objet, tests de Chance, combat FF classique, morts contextuelles selon la cause), fiche d'aventure permanente, un récit complet jouable de bout en bout — *La Clé des Cryptes* (79 paragraphes numérotés 1-550 avec des trous volontaires, pas de contrainte de contiguïté ; plusieurs embranchements optionnels — passage annexe, raccourci vertical, contournement furtif, salle inondée, galerie des miroirs — offrent des chemins alternatifs qui convergent vers le tronc commun, et chaque victoire est suivie d'une courte scène de fuite/épilogue avant la fin), 5 fins non mortelles (2 victoires, 1 fin mitigée, 1 retraite) et 11 fins de mort distinctes (une par ennemi/piège rencontré, plus une générique d'épuisement et une de chute), 4 objets à collecter influençant les choix disponibles en cours de route et en fin de partie (torche, dague d'argent, amulette bénie, clochette d'argent), une potion de soin utilisable à tout moment.

Depuis la dernière passation : **écran d'accueil** (Nouvelle partie / Continuer si une sauvegarde existe) avec un **codex des fins** (les fins non encore découvertes s'affichent comme "❓ Fin non découverte", incitant à rejouer) ; **sauvegarde automatique** dans `localStorage` après chaque action (y compris en plein combat — reprise round par round, journal inclus) et effacée à l'arrivée sur une fin ; script de vérification du récit **committé en permanence** (`scripts/verify-story.mjs`) plutôt que réécrit puis supprimé à chaque session ; petite passe d'**accessibilité** (`type="button"` explicite sur tous les boutons, `aria-disabled` en plus de `disabled` sur les choix verrouillés, `aria-live="polite"` sur la zone de lecture pour que les lecteurs d'écran annoncent les changements de paragraphe/combat, `aria-label` sur la fiche d'aventure).

Historique condensé des chantiers précédents (tous sur *La Clé des Cryptes* avant l'ajout du second récit) : écran d'accueil, sauvegarde automatique par action, script d'intégrité permanent, passe d'accessibilité, bouton "Abandonner l'aventure", tests moteur permanents (a révélé et corrigé un vrai bug : la chute mortelle du §25 ne mettait pas `isAlive` à `false`), récapitulatif de fin de partie, ambiance sonore + fond d'écran, système de succès (fusionnant les fins dans la fenêtre des succès plutôt qu'un codex séparé), notification toast au déblocage, puis assouplissement des deux fins les plus rares (§72 Acolytes, §79 Piège de Pierre — Compétence 6→8 et dégâts -3→-8, mesuré ×17 et ×18 plus fréquentes sur 20 000 parties aléatoires).

**Chantier : deuxième récit + généralisation du moteur multi-récits.** *La Captive de Château Vaudragne* (voir "Récits disponibles" plus haut) a été ajoutée à côté des Cryptes, sélectionnable depuis l'accueil. Cela a demandé de retirer tout couplage en dur au récit des Cryptes dans le code partagé : `engine/story.js` ne connaît plus PARAGRAPHS/ITEMS d'un récit précis (tout passe par `getStoryById(state.storyId)`, y compris `deathFallbackId` et la détection de l'objet soignant via `healAmount`) ; `persistence.js` préfixe désormais toutes ses clés `localStorage` par `storyId` ; le système de succès sépare la partie générique (fins, via `achievementsShared.js`) de la partie écrite à la main par récit (`cryptes-achievements.js`, `vaudragne-achievements.js`) ; l'ambiance sonore détecte un combat de boss via un flag générique `combat.boss: true` plutôt qu'un nom d'ennemi codé en dur ; l'écran d'accueil et la fenêtre des succès affichent maintenant une carte/un contexte par récit plutôt qu'un seul récit implicite.

**Chantier suivant, correction importante : Vaudragne réécrit en hub-and-spoke.** La toute première version de Vaudragne isolait complètement les 3 voies d'entrée (3 blocs de contenu et d'objets sans le moindre point commun jusqu'au climax) — ce n'était pas ce qui était demandé. Restructuré : l'entrée ne colore plus que la première rencontre avant de rejoindre une cour commune, d'où deux ailes explorables dans n'importe quel ordre (voir "Récits disponibles" plus haut). Un premier passage de cette réécriture avait encore un bug du même type à un niveau plus fin : à l'intérieur même des communs, l'armurerie et les caves/cachots s'excluaient mutuellement (leur sortie menait directement à la sortie de zone, sans possibilité de visiter l'autre) — repéré en simulant une partie complète pas à pas plutôt qu'en se fiant aux seuls scripts statiques, et corrigé avec deux nœuds-pont (§214, §242) sur le même principe que le pont §130/§230 entre les deux ailes. Ce genre de bug (deux zones qui devraient se combiner mais s'excluent silencieusement) n'est pas détecté par `verify-story.mjs` (qui ne vérifie que l'atteignabilité, pas les combinaisons d'objets) — à surveiller si de futurs récits réutilisent ce patron de zones à ponts.

**Vérifié** (`node scripts/verify-story.mjs` + `node scripts/test-engine.mjs`, voir plus haut, désormais sur les DEUX récits) : intégrité référentielle de tous les liens entre paragraphes (y compris `deathTarget`), exactement un des quatre champs par paragraphe, accessibilité depuis le §1, chaque fin atteignable, chaque `loseTarget` de combat pointe vers une fin de mort, chaque fin a un `title`, `deathFallbackId` valide, bornes des caractéristiques et cohérence `isAlive`/type de fin sur 200 parties aléatoires par récit (17 741 assertions au total, 0 échec). Vérifié en plus avec un shim `localStorage` en Node : les succès et la progression de Vaudragne ne se mélangent jamais avec ceux des Cryptes (clés distinctes par `storyId`) ; et avec une partie scriptée pas à pas (entrée par la poterne) que l'épée bénie, la fiole de poison et la clé des cachots sont bien obtenables ensemble dans la même partie, peu importe l'entrée choisie.

**Chantier le plus récent, correctif critique trouvé en jouant pour de vrai : `chooseOption` dispatchait par `targetId`, pas par choix.** Repéré par l'utilisateur en jouant : décliner un objet optionnel ("Poursuivre sans t'attarder") l'accordait quand même. Cause racine : `chooseOption(state, targetId)` faisait `paragraph.choices.find(c => c.targetId === targetId)` — et comme les deux choix "prendre l'objet"/"laisser l'objet" partagent quasi toujours le même `targetId` (ils mènent au même paragraphe suivant), la recherche retombait systématiquement sur le **premier** choix du tableau (celui qui accorde l'objet), quel que soit le bouton réellement cliqué. Ce bug affectait potentiellement **tout** choix à effets divergents partageant un `targetId` avec un autre choix, dans les deux récits, depuis le tout début du projet — il n'avait simplement jamais été détecté parce qu'aucune vérification automatisée ne rejouait un choix par sa position, seulement par son `targetId` (donc invisible à `verify-story.mjs` et à l'ancienne version de `test-engine.mjs`). Corrigé à la racine : `chooseOption(state, choiceIndex)` dispatche maintenant par **index** dans `paragraph.choices`, jamais par `targetId`. Effets de bord : `renderStory.js` passe l'index du choix cliqué (plus `choice.targetId`) ; le pilote de parties aléatoires de `test-engine.mjs` fait de même. **Nouveau test de non-régression permanent** dans `test-engine.mjs` : pour chaque choix de chaque paragraphe des deux récits, vérifie que le sélectionner par son index applique bien *son propre* `grantItem`, jamais celui d'un choix voisin partageant le même `targetId`.

**Même passage : suppression des boutons de choix grisés.** Un choix `requiresItem` non satisfait n'affiche plus un bouton désactivé avec le texte "(nécessite un objet que tu n'as pas)" (jugé immersion-brisant) — il est simplement absent de la liste. À la place, si au moins un choix du paragraphe est ainsi masqué, une ligne discrète en italique apparaît sous les choix visibles ("✨ Une intuition te souffle qu'une autre approche aurait pu s'offrir à toi ici, avec les bons moyens en main."), sans jamais révéler quel objet ni quel choix précisément manquait.

## Limitations connues (prototype)

- La sauvegarde (`localStorage`) est locale au navigateur : pas de synchronisation entre appareils, et elle disparaît si l'utilisateur vide les données du site ou navigue en mode privé (échec silencieux, sans message d'erreur — voir `engine/persistence.js`).
- **Pas de vérification visuelle ni sonore en navigateur réel sur cette machine** (Chrome absent, pas de lecteur audio) — tout ce qui a été ajouté (écran d'accueil multi-récits, fenêtre des succès, toasts, ambiance sonore, fond d'écran, et l'intégralité du récit de Château Vaudragne) est vérifié par lecture de code, `node --check` et les scripts ci-dessus, jamais par un test manuel dans un vrai navigateur. C'est la limitation la plus importante à garder en tête avant de considérer quoi que ce soit comme définitivement acquis.
- Le choix des pistes audio par scène (`js/ui/audio.js`) est fait sur la seule base des noms de fichiers dans `assets/` — à réécouter et ajuster à l'oreille (chaque piste est une simple valeur dans l'objet `TRACKS`, facile à changer). Les deux récits partagent la même ambiance sonore générique ; rien de spécifique à l'un ou l'autre.
- La majorité des assets fournis (sprites, icônes, packs de tuiles) ne sont pas encore utilisés — seules 5 pistes audio et `bg.png` sont référencées ; les emojis restent les icônes d'objets/ennemis dans l'UI, pour les deux récits.
- Le passage de l'ancien codex des fins (`lcdc:endings:v1`) au système de succès n'a pas eu de migration à l'époque : sans conséquence pour une utilisation en local/prototype.
- Château Vaudragne n'a été vérifié que structurellement (scripts + simulations aléatoires) — jamais joué à la main, contrairement aux Cryptes qui ont bénéficié d'itérations de retours utilisateur. Les 3 voies (porte/brèche/poterne) et l'affrontement final (4 approches selon l'objet détenu) sont donc plus susceptibles de contenir un déséquilibre de difficulté non repéré qu'un vrai bug de câblage (les scripts couvrent bien ce dernier point).
