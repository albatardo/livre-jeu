import { roll2D6 } from './dice.js';
import { createCharacter, applyStatDelta, addItem, removeItem, hasItem } from './character.js';
import { createCombatState } from './combat.js';
import { getStoryById } from '../data/stories.js';

export function createGameState(storyId) {
  return {
    storyId,
    character: null,
    currentId: null,
    combat: null,
    lastLuckRoll: null,
    stats: { paragraphsVisited: 0, combatsWon: 0, luckTestsTaken: 0, luckTestsSucceeded: 0, potionsUsed: 0 },
  };
}

export function getCurrentParagraph(state) {
  return getStoryById(state.storyId).paragraphs[state.currentId];
}

function resolveDestination(state, intendedTargetId, deathTargetId) {
  const fallback = deathTargetId ?? getStoryById(state.storyId).deathFallbackId;
  return state.character.isAlive ? intendedTargetId : fallback;
}

function enterParagraph(state, targetId) {
  state.currentId = targetId;
  state.stats.paragraphsVisited += 1;
  const paragraph = getStoryById(state.storyId).paragraphs[targetId];
  state.combat = paragraph.combat ? createCombatState(paragraph.combat.enemy) : null;
}

export function startNewGame(state) {
  state.character = createCharacter('Aventurier');
  state.lastLuckRoll = null;
  enterParagraph(state, 1);
  return state;
}

export function chooseOption(state, choiceIndex) {
  const paragraph = getCurrentParagraph(state);
  const choice = paragraph.choices?.[choiceIndex];
  if (!choice) return false;
  if (choice.requiresItem && !hasItem(state.character, choice.requiresItem)) return false;

  if (choice.grantItem) addItem(state.character, choice.grantItem);
  if (choice.removeItem) removeItem(state.character, choice.removeItem);
  if (choice.effect) applyStatDelta(state.character, choice.effect.stat, choice.effect.amount);

  enterParagraph(state, resolveDestination(state, choice.targetId, choice.deathTarget));
  return true;
}

export function resolveLuckTest(state) {
  const paragraph = getCurrentParagraph(state);
  if (!paragraph.luckTest) return false;
  const { successTarget, failTarget, successEffect, failEffect, deathTarget } = paragraph.luckTest;

  const luckBeforeTest = state.character.luck.current;
  const roll = roll2D6();
  const success = roll <= luckBeforeTest;
  state.character.luck.current = Math.max(0, state.character.luck.current - 1);

  const effect = success ? successEffect : failEffect;
  if (effect) applyStatDelta(state.character, effect.stat, effect.amount);

  state.stats.luckTestsTaken += 1;
  if (success) state.stats.luckTestsSucceeded += 1;

  state.lastLuckRoll = { roll, threshold: luckBeforeTest, success };
  enterParagraph(state, resolveDestination(state, success ? successTarget : failTarget, deathTarget));
  return true;
}

export function finishCombatIfDone(state) {
  if (!state.combat?.finished) return false;
  const paragraph = getCurrentParagraph(state);
  const won = state.combat.outcome === 'playerWins';
  if (won) state.stats.combatsWon += 1;
  const targetId = won ? paragraph.combat.winTarget : paragraph.combat.loseTarget;
  enterParagraph(state, resolveDestination(state, targetId, paragraph.combat.loseTarget));
  return true;
}

export function usePotionOfHealing(state) {
  const character = state.character;
  const items = getStoryById(state.storyId).items;
  const healingEntry = character.inventory.find((e) => items[e.itemId]?.healAmount && e.quantity > 0);
  if (!healingEntry) return false;
  if (character.stamina.current >= character.stamina.initial) return false;

  const item = items[healingEntry.itemId];
  applyStatDelta(character, 'stamina', item.healAmount);
  removeItem(character, healingEntry.itemId);
  state.stats.potionsUsed += 1;
  return true;
}
