import { renderStory } from './ui/renderStory.js';
import { renderCombat } from './ui/renderCombat.js';
import { renderCharacterSheet } from './ui/renderCharacterSheet.js';
import { renderHome } from './ui/renderHome.js';
import { renderAchievements } from './ui/renderAchievements.js';
import {
  createGameState,
  startNewGame,
  getCurrentParagraph,
  chooseOption,
  resolveLuckTest,
  finishCombatIfDone,
  usePotionOfHealing,
} from './engine/story.js';
import { combatRound, tryLuck } from './engine/combat.js';
import {
  saveGame,
  loadGame,
  clearSave,
  hasSave,
  recordParagraphVisited,
  getVisitedParagraphs,
  unlockAchievement,
  getUnlockedAchievements,
} from './engine/persistence.js';
import { playTrack, stopAudio, toggleMute, isMuted } from './ui/audio.js';
import { showToast } from './ui/toast.js';
import { STORIES, getStoryById } from './data/stories.js';

const els = {
  characterSheet: document.getElementById('character-sheet'),
  storyView: document.getElementById('story-view'),
  layout: document.querySelector('.layout'),
  muteToggle: document.getElementById('mute-toggle'),
};

let state = null;
let screen = 'home'; // 'home' | 'game' | 'achievements'
let achievementsStoryId = null; // quel récit est affiché sur l'écran des succès

if (els.muteToggle) {
  updateMuteButton();
  els.muteToggle.addEventListener('click', () => {
    toggleMute();
    updateMuteButton();
  });
}

function updateMuteButton() {
  els.muteToggle.textContent = isMuted() ? '🔇' : '🔊';
  els.muteToggle.setAttribute('aria-label', isMuted() ? 'Activer le son' : 'Couper le son');
}

function pickAmbientTrack() {
  const paragraph = getCurrentParagraph(state);
  if (state.combat) {
    return paragraph?.combat?.boss ? 'boss' : 'combat';
  }
  if (paragraph?.ending === 'victory' || paragraph?.ending === 'partial') return 'victory';
  if (paragraph?.ending === 'death') return 'death';
  return 'exploration';
}

renderView();

function persistState() {
  const storyId = state.storyId;
  recordParagraphVisited(storyId, state.currentId);
  evaluateAchievements();

  if (!state.combat) {
    const paragraph = getCurrentParagraph(state);
    if (paragraph?.ending) {
      clearSave(storyId);
      return;
    }
  }
  saveGame(state);
}

function evaluateAchievements() {
  const story = getStoryById(state.storyId);
  const unlocked = getUnlockedAchievements(state.storyId);
  const context = { visitedCount: getVisitedParagraphs(state.storyId).size, totalParagraphs: Object.keys(story.paragraphs).length };
  for (const achievement of story.achievements) {
    if (unlocked.has(achievement.id)) continue;
    if (achievement.check(state, context)) {
      unlockAchievement(state.storyId, achievement.id);
      showToast(`🏆 ${achievement.title}`);
    }
  }
}

function renderView() {
  if (screen === 'home') {
    stopAudio();
    els.characterSheet.hidden = true;
    els.layout.classList.add('layout--home');
    renderHome(els.storyView, {
      stories: STORIES.map((story) => ({
        id: story.id,
        title: story.title,
        description: story.description,
        hasSave: hasSave(story.id),
        achievementsUnlocked: getUnlockedAchievements(story.id).size,
        achievementsTotal: story.achievements.length,
      })),
      onNewGame: handleStartNewGame,
      onContinue: handleContinueGame,
      onOpenAchievements: handleOpenAchievements,
    });
    return;
  }

  if (screen === 'achievements') {
    stopAudio();
    els.characterSheet.hidden = true;
    els.layout.classList.add('layout--home');
    const story = getStoryById(achievementsStoryId);
    renderAchievements(els.storyView, {
      storyTitle: story.title,
      achievements: story.achievements,
      unlocked: getUnlockedAchievements(achievementsStoryId),
      visitedCount: getVisitedParagraphs(achievementsStoryId).size,
      totalParagraphs: Object.keys(story.paragraphs).length,
      onBack: handleBackToHome,
    });
    return;
  }

  els.characterSheet.hidden = false;
  els.layout.classList.remove('layout--home');
  persistState();
  playTrack(pickAmbientTrack());
  const items = getStoryById(state.storyId).items;
  renderCharacterSheet(els.characterSheet, state.character, items, { onUsePotion: handleUsePotion, onAbandon: handleAbandonGame });

  if (state.combat) {
    renderCombat(els.storyView, state.character, state.combat, {
      onCombatRound: handleCombatRound,
      onTryLuck: handleTryLuck,
      onContinue: handleContinueAfterCombat,
    });
  } else {
    renderStory(els.storyView, state, {
      getCurrentParagraph: () => getCurrentParagraph(state),
      onChooseOption: handleChooseOption,
      onResolveLuckTest: handleResolveLuckTest,
      onRestart: handleRestart,
    });
  }
}

function handleStartNewGame(storyId) {
  clearSave(storyId);
  state = createGameState(storyId);
  startNewGame(state);
  screen = 'game';
  renderView();
}

function handleContinueGame(storyId) {
  const saved = loadGame(storyId);
  if (!saved) {
    handleStartNewGame(storyId);
    return;
  }
  state = saved;
  if (!state.stats) {
    // Sauvegarde antérieure à l'ajout du récapitulatif de fin de partie : on initialise des compteurs à zéro plutôt que de perdre la partie en cours.
    state.stats = { paragraphsVisited: 0, combatsWon: 0, luckTestsTaken: 0, luckTestsSucceeded: 0, potionsUsed: 0 };
  }
  if (state.stats.potionsUsed === undefined) {
    // Sauvegarde antérieure à l'ajout du succès "Premiers soins"/"Un instant de répit".
    state.stats.potionsUsed = 0;
  }
  screen = 'game';
  renderView();
}

function handleOpenAchievements(storyId) {
  achievementsStoryId = storyId;
  screen = 'achievements';
  renderView();
}

function handleBackToHome() {
  screen = 'home';
  renderView();
}

function handleCombatRound() {
  combatRound(state.character, state.combat);
  renderView();
}

function handleTryLuck() {
  tryLuck(state.character, state.combat);
  renderView();
}

function handleContinueAfterCombat() {
  finishCombatIfDone(state);
  renderView();
}

function handleChooseOption(targetId) {
  chooseOption(state, targetId);
  renderView();
}

function handleResolveLuckTest() {
  resolveLuckTest(state);
  renderView();
}

function handleUsePotion() {
  usePotionOfHealing(state);
  renderView();
}

function handleRestart() {
  screen = 'home';
  renderView();
}

function handleAbandonGame() {
  const confirmed = window.confirm('Abandonner cette aventure et revenir à l\'accueil ? Ta progression ne sera pas sauvegardée.');
  if (!confirmed) return;
  clearSave(state.storyId);
  screen = 'home';
  renderView();
}
