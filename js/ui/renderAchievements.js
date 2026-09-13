import { el, clear } from './domHelpers.js';

export function renderAchievements(container, { storyTitle, achievements, unlocked, visitedCount, totalParagraphs, onBack }) {
  clear(container);

  const categories = [...new Set(achievements.map((a) => a.category))];
  const percent = achievements.length > 0 ? Math.round((100 * unlocked.size) / achievements.length) : 0;

  const sections = categories.map((category) => {
    const items = achievements.filter((a) => a.category === category).map((a) => {
      const done = unlocked.has(a.id);
      const hideForSpoiler = a.spoiler && !done;
      const extra = category === 'Exploration' ? ` (${visitedCount} / ${totalParagraphs})` : '';
      const title = hideForSpoiler ? '❓ Fin non découverte' : a.title + extra;
      const description = hideForSpoiler ? null : a.description;
      return el('li', { class: done ? 'achievement-done' : 'achievement-locked' }, [
        el('span', { class: 'achievement-icon' }, done ? a.icon : '🔒'),
        el('span', { class: 'achievement-text' }, [
          el('strong', {}, title),
          description ? el('br') : null,
          description ? el('span', { class: 'item-description' }, description) : null,
        ]),
      ]);
    });
    return el('div', { class: 'achievement-category' }, [el('h2', {}, category), el('ul', { class: 'achievement-list' }, items)]);
  });

  container.append(
    el('div', { class: 'home-panel' }, [
      el('h2', { class: 'story-title' }, `📖 ${storyTitle}`),
      el('p', {}, `Succès débloqués : ${unlocked.size} / ${achievements.length} (${percent}%). Ils se cumulent sur toutes tes parties de ce récit.`),
      ...sections,
      el('div', { class: 'actions' }, [el('button', { type: 'button', class: 'btn btn-primary', onclick: onBack }, 'Retour à l\'accueil')]),
    ])
  );
}
