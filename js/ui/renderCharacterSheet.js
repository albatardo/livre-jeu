import { el, clear } from './domHelpers.js';

export function renderCharacterSheet(container, character, items, handlers) {
  clear(container);

  const inventoryRows = character.inventory.map((entry) => {
    const item = items[entry.itemId];
    return el('li', {}, `${item.icon} ${item.name}${entry.quantity > 1 ? ` × ${entry.quantity}` : ''}`);
  });

  const parts = [
    el('h2', {}, character.name),
    el('ul', { class: 'stat-list' }, [
      el('li', {}, `⚔️ Compétence : ${character.skill.current} / ${character.skill.initial}`),
      el('li', {}, `❤️ Endurance : ${character.stamina.current} / ${character.stamina.initial}`),
      el('li', {}, `🍀 Chance : ${character.luck.current} / ${character.luck.initial}`),
    ]),
    el('h3', {}, 'Inventaire'),
    inventoryRows.length > 0
      ? el('ul', { class: 'inventory-list' }, inventoryRows)
      : el('p', { class: 'item-description' }, 'Ton sac est vide.'),
  ];

  const healingEntry = character.inventory.find((e) => items[e.itemId]?.healAmount);
  if (healingEntry && character.stamina.current < character.stamina.initial) {
    const item = items[healingEntry.itemId];
    parts.push(
      el('button', { type: 'button', class: 'btn', onclick: handlers.onUsePotion }, `${item.icon} Boire ${item.name.toLowerCase()} (+${item.healAmount} Endurance)`)
    );
  }

  parts.push(
    el('button', { type: 'button', class: 'btn btn-abandon', onclick: handlers.onAbandon }, '🚪 Abandonner l\'aventure')
  );

  container.append(el('div', { class: 'character-sheet' }, parts));
}
