import { el, clear } from './domHelpers.js';

export function renderCombat(container, character, combatState, handlers) {
  clear(container);

  const canTryLuck = combatState.lastEvent && character.luck.current > 0 && !combatState.finished;

  const logEl = el(
    'ul',
    { class: 'combat-log' },
    combatState.log.map((entry) => el('li', { class: `log-${entry.kind}` }, entry.text))
  );

  const actionArea = combatState.finished
    ? el('div', { class: 'actions' }, [
        el('button', { type: 'button', class: 'btn btn-primary', onclick: handlers.onContinue }, 'Continuer'),
      ])
    : el('div', { class: 'actions' }, [
        el('button', { type: 'button', class: 'btn btn-primary', onclick: handlers.onCombatRound }, '⚔️ Attaquer'),
      ]);

  container.append(
    el('div', { class: 'combat-panel' }, [
      el('div', { class: 'combat-foes' }, [
        el('div', { class: 'combat-side' }, [
          el('h3', {}, character.name),
          el('p', {}, `❤️ ${character.stamina.current} / ${character.stamina.initial}`),
        ]),
        el('div', { class: 'combat-side' }, [
          el('h3', {}, `${combatState.enemy.icon} ${combatState.enemy.name}`),
          el('p', {}, `❤️ ${combatState.enemy.stamina.current} / ${combatState.enemy.stamina.initial}`),
        ]),
      ]),
      logEl,
      actionArea,
      canTryLuck
        ? el('div', { class: 'actions' }, [
            el('button', { type: 'button', class: 'btn', onclick: handlers.onTryLuck }, `🍀 Tenter ta Chance (${character.luck.current})`),
          ])
        : null,
      canTryLuck
        ? el(
            'p',
            { class: 'item-description' },
            'Jette 2D6 contre ta Chance actuelle : succès, le dernier coup est amplifié ; échec, il est atténué. Ta Chance diminue de 1 dans tous les cas.'
          )
        : null,
    ])
  );

  logEl.scrollTop = logEl.scrollHeight;
}
