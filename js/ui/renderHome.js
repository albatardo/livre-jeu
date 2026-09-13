import { el, clear } from './domHelpers.js';

export function renderHome(container, { stories, onNewGame, onContinue, onOpenAchievements }) {
  clear(container);

  const cards = stories.map((story) => {
    const percent = story.achievementsTotal > 0 ? Math.round((100 * story.achievementsUnlocked) / story.achievementsTotal) : 0;
    const actions = [];
    if (story.hasSave) {
      actions.push(el('button', { type: 'button', class: 'btn btn-primary', onclick: () => onContinue(story.id) }, 'Continuer l\'aventure'));
    }
    actions.push(el('button', { type: 'button', class: 'btn' + (story.hasSave ? '' : ' btn-primary'), onclick: () => onNewGame(story.id) }, 'Nouvelle partie'));
    actions.push(el('button', { type: 'button', class: 'btn', onclick: () => onOpenAchievements(story.id) }, `🏆 Succès (${percent}%)`));

    return el('div', { class: 'story-card' }, [
      el('h2', { class: 'story-title' }, `📖 ${story.title}`),
      el('p', {}, story.description),
      el('div', { class: 'actions' }, actions),
    ]);
  });

  container.append(
    el('div', { class: 'home-panel' }, [
      el('p', { class: 'item-description' }, 'Des livres-jeux inspirés des règles Fighting Fantasy : paragraphes numérotés, tests de Chance, combats au jet opposé. Tes caractéristiques (Compétence, Endurance, Chance) sont tirées aléatoirement à chaque nouvelle partie.'),
      ...cards,
    ])
  );
}
