const ENDING_ICONS = { victory: '🏆', partial: '⚖️', flee: '🏃', death: '💀' };

// Une fin = un succès à part entière, catégorie "Fins découvertes". `spoiler:
// true` indique à renderAchievements.js de masquer le titre/la description
// tant que le succès n'est pas débloqué, pour ne pas gâcher la découverte.
// Générique : ne connaît rien du récit en dehors de ses paragraphes de fin.
export function buildEndingAchievements(story) {
  return Object.keys(story.paragraphs)
    .map(Number)
    .filter((id) => story.paragraphs[id].ending)
    .sort((a, b) => a - b)
    .map((id) => {
      const paragraph = story.paragraphs[id];
      return {
        id: `fin-${id}`,
        icon: ENDING_ICONS[paragraph.ending] ?? '🏁',
        category: 'Fins découvertes',
        title: paragraph.title,
        description: 'Atteindre cette fin.',
        spoiler: true,
        check: (state) => state.currentId === id,
      };
    });
}
