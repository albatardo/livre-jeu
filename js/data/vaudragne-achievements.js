import { hasItem } from '../engine/character.js';

// Succès propres à *La Captive de Château Vaudragne*. Le château est un
// espace partagé : quelle que soit l'entrée choisie au §2, l'aile noble et
// les communs/sous-sols restent explorables dans n'importe quel ordre, et
// tous les objets qui s'y trouvent sont communs (seul le fumigène est un
// petit bonus propre à l'entrée par la brèche).
export const VAUDRAGNE_ACHIEVEMENTS = [
  {
    id: 'objet-fumigene',
    icon: '💨',
    category: 'Objets trouvés',
    title: 'Une fumée providentielle',
    description: 'Trouver le fumigène (en libérant le prisonnier de la brèche).',
    check: (state) => hasItem(state.character, 'fumigene'),
  },
  {
    id: 'objet-epee',
    icon: '⚔️',
    category: 'Objets trouvés',
    title: 'L\'arme des inquisiteurs',
    description: 'Trouver l\'épée d\'argent bénie, dans l\'armurerie.',
    check: (state) => hasItem(state.character, 'epee_benie'),
  },
  {
    id: 'objet-sceau',
    icon: '🔏',
    category: 'Objets trouvés',
    title: 'Les bonnes grâces',
    description: 'Trouver le sceau de Vaudragne, au bal masqué.',
    check: (state) => hasItem(state.character, 'sceau_vaudragne'),
  },
  {
    id: 'objet-parchemin',
    icon: '📜',
    category: 'Objets trouvés',
    title: 'Le contre-rituel',
    description: 'Trouver le parchemin du rite inversé, dans la bibliothèque.',
    check: (state) => hasItem(state.character, 'parchemin_rituel'),
  },
  {
    id: 'objet-cle-cachots',
    icon: '🗝️',
    category: 'Objets trouvés',
    title: 'Une clé oubliée',
    description: 'Trouver la clé des cachots, dans la cellule d\'Élyne.',
    check: (state) => hasItem(state.character, 'cle_cachots'),
  },
  {
    id: 'objet-poison',
    icon: '🧴',
    category: 'Objets trouvés',
    title: 'Un poison discret',
    description: 'Trouver la fiole de poison paralysant, dans le cellier.',
    check: (state) => hasItem(state.character, 'fiole_poison'),
  },
  {
    id: 'objet-explorateur-complet',
    icon: '🏰',
    category: 'Objets trouvés',
    title: 'Rien ne t\'a échappé',
    description: 'Explorer le château assez à fond pour porter en même temps l\'épée, la clé des cachots, le poison, et le sceau ou le parchemin.',
    check: (state) =>
      ['epee_benie', 'cle_cachots', 'fiole_poison'].every((id) => hasItem(state.character, id)) &&
      (hasItem(state.character, 'sceau_vaudragne') || hasItem(state.character, 'parchemin_rituel')),
  },
  {
    id: 'usage-fumigene',
    icon: '💨',
    category: 'Objets utilisés',
    title: 'Disparu dans la fumée',
    description: 'Utiliser le fumigène pour passer le chevalier revenant sans combattre.',
    check: (state) => state.currentId === 125,
  },
  {
    id: 'usage-epee',
    icon: '⚔️',
    category: 'Objets utilisés',
    title: 'Le fer sacré',
    description: 'Affronter la Comtesse avec l\'épée d\'argent bénie.',
    check: (state) => state.currentId === 403,
  },
  {
    id: 'usage-sceau',
    icon: '🔏',
    category: 'Objets utilisés',
    title: 'Passage de courtoisie',
    description: 'Utiliser le sceau de Vaudragne pour passer la garde de la tour sans un mot de plus.',
    check: (state) => state.currentId === 124,
  },
  {
    id: 'usage-parchemin',
    icon: '📜',
    category: 'Objets utilisés',
    title: 'Sans effusion de sang',
    description: 'Tenter le rite inversé contre la Comtesse.',
    check: (state) => state.currentId === 405,
  },
  {
    id: 'usage-cle-cachots',
    icon: '🗝️',
    category: 'Objets utilisés',
    title: 'Le chemin des geôliers',
    description: 'Utiliser la clé des cachots pour emprunter le passage détourné vers la tour.',
    check: (state) => state.currentId === 126,
  },
  {
    id: 'usage-poison',
    icon: '🧴',
    category: 'Objets utilisés',
    title: 'Le calice trahi',
    description: 'Verser le poison dans la coupe rituelle de la Comtesse.',
    check: (state) => state.currentId === 407,
  },
  {
    id: 'usage-elixir',
    icon: '🧪',
    category: 'Objets utilisés',
    title: 'Un instant de répit',
    description: 'Boire l\'élixir de vigueur.',
    check: (state) => state.stats.potionsUsed > 0,
  },
  {
    id: 'cartographe-vaudragne',
    icon: '🗺️',
    category: 'Exploration',
    title: 'Le château sans secrets',
    description: 'Visiter tous les paragraphes du récit, toutes parties confondues.',
    check: (state, context) => context.visitedCount >= context.totalParagraphs,
  },
];
