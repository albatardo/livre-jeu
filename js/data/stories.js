import { PARAGRAPHS as CRYPTES_PARAGRAPHS } from './story.js';
import { ITEMS as CRYPTES_ITEMS } from './items.js';
import { CRYPTES_ACHIEVEMENTS } from './cryptes-achievements.js';
import { PARAGRAPHS as VAUDRAGNE_PARAGRAPHS } from './vaudragne-story.js';
import { ITEMS as VAUDRAGNE_ITEMS } from './vaudragne-items.js';
import { VAUDRAGNE_ACHIEVEMENTS } from './vaudragne-achievements.js';
import { buildEndingAchievements } from './achievementsShared.js';

// Registre des récits disponibles, choisis depuis l'écran d'accueil. Chaque
// récit est indépendant : ses propres paragraphes, son propre catalogue
// d'objets, son propre paragraphe de mort générique (`deathFallbackId`), et
// ses propres succès (les succès "objets/exploration" sont écrits à la main
// par récit ; les succès "Fins découvertes" sont générés automatiquement par
// `buildEndingAchievements` à partir des paragraphes de fin de CE récit).
// Le moteur (`engine/story.js`) et les vues lisent tout via `getStoryById`,
// jamais d'import direct de PARAGRAPHS/ITEMS — un état de partie porte son
// `storyId` et reste donc toujours cohérent avec son propre récit.
const CRYPTES_STORY = {
  id: 'cle-des-cryptes',
  title: 'La Clé des Cryptes',
  description: 'Un culte fanatique a dérobé la Clé scellant une faille sous les Cryptes Oubliées. Descends la récupérer avant que la faille ne s\'élargisse pour de bon.',
  paragraphs: CRYPTES_PARAGRAPHS,
  items: CRYPTES_ITEMS,
  deathFallbackId: 70,
};
CRYPTES_STORY.achievements = [...CRYPTES_ACHIEVEMENTS, ...buildEndingAchievements(CRYPTES_STORY)];

const VAUDRAGNE_STORY = {
  id: 'chateau-vaudragne',
  title: 'La Captive de Château Vaudragne',
  description: 'La Comtesse Vaudragne, morte depuis un siècle mais toujours régnante, retient une jeune captive dans son château pour un rituel qui doit s\'achever à la prochaine lune rousse. Grande porte, brèche dans le mur, ou poterne dissimulée : la façon dont tu entres décidera de toute la suite.',
  paragraphs: VAUDRAGNE_PARAGRAPHS,
  items: VAUDRAGNE_ITEMS,
  deathFallbackId: 590,
};
VAUDRAGNE_STORY.achievements = [...VAUDRAGNE_ACHIEVEMENTS, ...buildEndingAchievements(VAUDRAGNE_STORY)];

export const STORIES = [CRYPTES_STORY, VAUDRAGNE_STORY];

export function getStoryById(id) {
  return STORIES.find((s) => s.id === id) ?? STORIES[0];
}
