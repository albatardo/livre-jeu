// Toutes les clés sont préfixées par storyId : deux récits partagent le même
// localStorage mais ne doivent jamais mélanger leurs sauvegardes/progressions
// (les ids de paragraphes se recoupent d'un récit à l'autre).
function saveKey(storyId) {
  return `lcdc:save:${storyId}:v1`;
}
function visitedKey(storyId) {
  return `lcdc:visited:${storyId}:v1`;
}
function achievementsKey(storyId) {
  return `lcdc:achievements:${storyId}:v1`;
}

export function saveGame(state) {
  try {
    localStorage.setItem(saveKey(state.storyId), JSON.stringify(state));
  } catch {
    // Stockage indisponible (navigation privée, quota atteint) : on continue sans sauvegarder.
  }
}

export function loadGame(storyId) {
  try {
    const raw = localStorage.getItem(saveKey(storyId));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearSave(storyId) {
  try {
    localStorage.removeItem(saveKey(storyId));
  } catch {
    // ignore
  }
}

export function hasSave(storyId) {
  try {
    return localStorage.getItem(saveKey(storyId)) !== null;
  } catch {
    return false;
  }
}

export function recordParagraphVisited(storyId, paragraphId) {
  try {
    const visited = getVisitedParagraphs(storyId);
    visited.add(paragraphId);
    localStorage.setItem(visitedKey(storyId), JSON.stringify([...visited]));
  } catch {
    // ignore
  }
}

export function getVisitedParagraphs(storyId) {
  try {
    const raw = localStorage.getItem(visitedKey(storyId));
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}

export function unlockAchievement(storyId, achievementId) {
  try {
    const unlocked = getUnlockedAchievements(storyId);
    unlocked.add(achievementId);
    localStorage.setItem(achievementsKey(storyId), JSON.stringify([...unlocked]));
  } catch {
    // ignore
  }
}

export function getUnlockedAchievements(storyId) {
  try {
    const raw = localStorage.getItem(achievementsKey(storyId));
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}
