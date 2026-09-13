// Tests du moteur : invariants statistiques (personnage, combat) + parties
// aléatoires complètes du §1 jusqu'à une fin pour CHAQUE récit du registre, en
// passant par les vrais modules moteur (pas de mock des dés — les invariants
// tiennent quel que soit le tirage). Pas de framework, assertions simples.
//
// Usage : node scripts/test-engine.mjs

import { createCharacter, applyStatDelta, addItem, removeItem, hasItem } from '../js/engine/character.js';
import { createCombatState, combatRound } from '../js/engine/combat.js';
import {
  createGameState,
  startNewGame,
  getCurrentParagraph,
  chooseOption,
  resolveLuckTest,
  finishCombatIfDone,
} from '../js/engine/story.js';
import { STORIES } from '../js/data/stories.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed += 1;
  } else {
    failed += 1;
    console.log(`  ÉCHEC : ${message}`);
  }
}

function section(name, fn) {
  console.log(`\n${name}`);
  fn();
}

section('createCharacter — bornes des caractéristiques (200 tirages)', () => {
  for (let i = 0; i < 200; i += 1) {
    const c = createCharacter();
    assert(c.skill.current >= 7 && c.skill.current <= 12, `Compétence hors bornes : ${c.skill.current}`);
    assert(c.stamina.current >= 14 && c.stamina.current <= 24, `Endurance hors bornes : ${c.stamina.current}`);
    assert(c.luck.current >= 7 && c.luck.current <= 12, `Chance hors bornes : ${c.luck.current}`);
    assert(c.isAlive === true, 'isAlive devrait être true à la création');
    assert(c.inventory.length === 0, 'inventaire devrait être vide à la création');
  }
});

section('applyStatDelta — clamp entre 0 et initial, isAlive à 0 Endurance', () => {
  const c = createCharacter();
  const max = c.stamina.initial;
  applyStatDelta(c, 'stamina', 1000);
  assert(c.stamina.current === max, 'stamina ne doit pas dépasser initial');
  applyStatDelta(c, 'stamina', -1000);
  assert(c.stamina.current === 0, 'stamina ne doit pas descendre sous 0');
  assert(c.isAlive === false, 'isAlive doit passer à false à 0 Endurance');
});

section('inventaire — addItem/removeItem/hasItem avec quantités', () => {
  const c = createCharacter();
  addItem(c, 'torche');
  assert(hasItem(c, 'torche'), 'torche devrait être présente après addItem');
  addItem(c, 'potion_soin', 2);
  addItem(c, 'potion_soin', 1);
  const potion = c.inventory.find((e) => e.itemId === 'potion_soin');
  assert(potion.quantity === 3, `quantité de potion_soin attendue 3, obtenu ${potion.quantity}`);
  removeItem(c, 'potion_soin', 3);
  assert(!hasItem(c, 'potion_soin'), 'potion_soin ne devrait plus être présente après retrait complet');
});

section('combatRound — invariants sur combats simulés (100 combats)', () => {
  for (let i = 0; i < 100; i += 1) {
    const character = createCharacter();
    const combat = createCombatState({ name: 'Adversaire de test', icon: '👤', skill: 8, stamina: 10 });
    let guard = 0;
    while (!combat.finished && guard < 500) {
      combatRound(character, combat);
      guard += 1;
      assert(character.stamina.current >= 0, 'stamina joueur négative pendant le combat');
      assert(combat.enemy.stamina.current >= 0, 'stamina ennemie négative pendant le combat');
    }
    assert(combat.finished, 'le combat devrait se terminer avant la limite de rounds');
    assert(['playerWins', 'enemyWins'].includes(combat.outcome), `outcome inattendu : ${combat.outcome}`);
    if (combat.outcome === 'enemyWins') assert(character.isAlive === false, 'isAlive devrait être false si le joueur perd le combat');
  }
});

section('chooseOption — dispatch par index (régression : choix partageant un targetId)', () => {
  // Bug réel trouvé en jouant : deux choix menant au même targetId (ex. "prendre
  // l'objet" / "poursuivre sans t'attarder") se faisaient auparavant confondre
  // par une résolution basée sur targetId, qui retombait toujours sur le premier
  // choix trouvé — accordant l'objet même quand on choisissait de ne pas le
  // prendre. chooseOption dispatche maintenant par index ; ce test vérifie que
  // CHAQUE choix de CHAQUE paragraphe de CHAQUE récit applique bien ses propres
  // effets quand il est sélectionné par son propre index, quel que soit son
  // targetId ou celui de ses voisins.
  for (const story of STORIES) {
    for (const idKey of Object.keys(story.paragraphs)) {
      const paragraph = story.paragraphs[idKey];
      if (!paragraph.choices) continue;
      paragraph.choices.forEach((choice, index) => {
        const state = createGameState(story.id);
        startNewGame(state);
        state.currentId = Number(idKey);
        state.combat = null;
        if (choice.requiresItem) addItem(state.character, choice.requiresItem);

        const ok = chooseOption(state, index);
        assert(ok, `[${story.id}] §${idKey} choix #${index} ("${choice.label}") aurait dû être accepté`);
        if (choice.grantItem) {
          assert(
            hasItem(state.character, choice.grantItem),
            `[${story.id}] §${idKey} choix #${index} ("${choice.label}") aurait dû accorder ${choice.grantItem}`
          );
        }
      });
    }
  }
});

for (const story of STORIES) {
  section(`[${story.title}] parties aléatoires complètes — §1 jusqu'à une fin (200 parties)`, () => {
    const endingHits = new Map();
    for (let i = 0; i < 200; i += 1) {
      const state = createGameState(story.id);
      startNewGame(state);
      let steps = 0;
      let ended = false;
      while (steps < 600) {
        steps += 1;

        if (state.combat) {
          let guard = 0;
          while (!state.combat.finished && guard < 500) {
            combatRound(state.character, state.combat);
            guard += 1;
          }
          assert(state.combat.finished, 'combat non résolu avant la limite de rounds');
          finishCombatIfDone(state);
          continue;
        }

        const paragraph = getCurrentParagraph(state);
        assert(paragraph !== undefined, `paragraphe introuvable : §${state.currentId}`);
        if (!paragraph) break;

        if (paragraph.ending) {
          ended = true;
          endingHits.set(state.currentId, (endingHits.get(state.currentId) ?? 0) + 1);
          if (paragraph.ending === 'death') {
            assert(state.character.isAlive === false, `isAlive devrait être false sur une fin de mort (§${state.currentId})`);
          } else {
            assert(state.character.isAlive === true, `isAlive devrait être true sur une fin non mortelle (§${state.currentId})`);
          }
          break;
        }

        if (paragraph.luckTest) {
          resolveLuckTest(state);
          continue;
        }

        if (paragraph.choices) {
          const allowed = paragraph.choices
            .map((c, i) => ({ c, i }))
            .filter(({ c }) => !c.requiresItem || hasItem(state.character, c.requiresItem));
          assert(allowed.length > 0, `aucun choix disponible au §${state.currentId}`);
          const { i } = allowed[Math.floor(Math.random() * allowed.length)];
          chooseOption(state, i);
          continue;
        }

        assert(false, `paragraphe §${state.currentId} sans champ reconnu (choices/luckTest/combat/ending)`);
        break;
      }
      assert(ended, `la partie #${i} n'a pas atteint de fin en ${steps} étapes`);
    }
    const summary = [...endingHits.entries()].sort((a, b) => a[0] - b[0]).map(([id, n]) => `§${id}(${n})`).join(', ');
    console.log(`  Fins atteintes sur 200 parties aléatoires : ${summary}`);
  });
}

console.log(`\n${passed} assertions réussies, ${failed} échouées.`);
if (failed > 0) process.exit(1);
