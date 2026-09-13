import { el, clear } from './domHelpers.js';
import { hasItem } from '../engine/character.js';
import { ENDING_LABELS } from './endingLabels.js';

export function renderStory(container, state, handlers) {
  clear(container);

  const paragraph = handlers.getCurrentParagraph();
  const parts = [el('p', { class: 'paragraph-number' }, `§ ${state.currentId}`), el('p', { class: 'paragraph-text' }, paragraph.text)];

  if (paragraph.ending) {
    const { character, stats } = state;
    const luckTestsLine =
      stats.luckTestsTaken > 0
        ? `🍀 Tests de Chance : ${stats.luckTestsSucceeded} réussis sur ${stats.luckTestsTaken}`
        : '🍀 Tests de Chance : aucun';
    parts.push(
      el('p', { class: 'ending-tag' }, ENDING_LABELS[paragraph.ending] ?? paragraph.ending),
      el('div', { class: 'ending-recap' }, [
        el('h3', {}, 'Récapitulatif de l\'aventure'),
        el('ul', { class: 'recap-list' }, [
          el('li', {}, `⚔️ Compétence finale : ${character.skill.current} / ${character.skill.initial}`),
          el('li', {}, `❤️ Endurance finale : ${character.stamina.current} / ${character.stamina.initial}`),
          el('li', {}, `🍀 Chance finale : ${character.luck.current} / ${character.luck.initial}`),
          el('li', {}, `🗺️ Paragraphes traversés : ${stats.paragraphsVisited}`),
          el('li', {}, `🛡️ Combats remportés : ${stats.combatsWon}`),
          el('li', {}, luckTestsLine),
        ]),
      ]),
      el('div', { class: 'actions' }, [
        el('button', { type: 'button', class: 'btn btn-primary', onclick: handlers.onRestart }, 'Retour à l\'accueil'),
      ])
    );
  } else if (paragraph.luckTest) {
    parts.push(
      el('div', { class: 'actions' }, [
        el('button', { type: 'button', class: 'btn btn-primary', onclick: handlers.onResolveLuckTest }, `🍀 Tenter ta Chance (${state.character.luck.current})`),
      ]),
      el('p', { class: 'item-description' }, 'Jette 2D6 contre ta Chance actuelle. Ta Chance diminue de 1 dans tous les cas.')
    );
  } else if (paragraph.choices) {
    const visible = paragraph.choices
      .map((choice, index) => ({ choice, index }))
      .filter(({ choice }) => !choice.requiresItem || hasItem(state.character, choice.requiresItem));
    const someHidden = visible.length < paragraph.choices.length;

    const choiceButtons = visible.map(({ choice, index }) =>
      el('button', { type: 'button', class: 'btn', onclick: () => handlers.onChooseOption(index) }, choice.label)
    );
    parts.push(el('div', { class: 'choice-list' }, choiceButtons));
    if (someHidden) {
      parts.push(
        el('p', { class: 'item-description hint' }, '✨ Une intuition te souffle qu\'une autre approche aurait pu s\'offrir à toi ici, avec les bons moyens en main.')
      );
    }
  }

  container.append(el('div', { class: 'story-panel' }, parts));
}
