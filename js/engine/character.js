import { rollD6, roll2D6 } from './dice.js';

export function createCharacter(name = 'Aventurier') {
  const skillBase = rollD6() + 6;
  const staminaBase = roll2D6() + 12;
  const luckBase = rollD6() + 6;
  return {
    name,
    skill: { current: skillBase, initial: skillBase },
    stamina: { current: staminaBase, initial: staminaBase },
    luck: { current: luckBase, initial: luckBase },
    gold: 0,
    inventory: [],
    isAlive: true,
  };
}

export function applyStatDelta(character, stat, delta) {
  const track = character[stat];
  if (!track) return;
  track.current = Math.max(0, Math.min(track.initial, track.current + delta));
  if (stat === 'stamina' && track.current === 0) {
    character.isAlive = false;
  }
}

export function addItem(character, itemId, quantity = 1) {
  const existing = character.inventory.find((entry) => entry.itemId === itemId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    character.inventory.push({ itemId, quantity });
  }
}

export function removeItem(character, itemId, quantity = 1) {
  const existing = character.inventory.find((entry) => entry.itemId === itemId);
  if (!existing) return;
  existing.quantity -= quantity;
  if (existing.quantity <= 0) {
    character.inventory = character.inventory.filter((entry) => entry.itemId !== itemId);
  }
}

export function hasItem(character, itemId) {
  return character.inventory.some((entry) => entry.itemId === itemId && entry.quantity > 0);
}

export function addGold(character, amount) {
  character.gold = Math.max(0, character.gold + amount);
}
