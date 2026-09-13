// Ambiance sonore, pilotée par des pistes choisies dans assets/ selon la scène
// en cours (exploration, combat, boss, victoire, mort). Sélection faite sur la
// base des noms de fichiers uniquement — cette machine n'a pas de lecteur audio
// pour vérifier l'ambiance réelle, à confirmer/ajuster à l'oreille. Pour changer
// une piste, il suffit de modifier la valeur correspondante dans TRACKS.
const TRACKS = {
  exploration: 'assets/Dungeon_Deep.mp3',
  combat: 'assets/Random Battle.mp3',
  boss: 'assets/Boss_01.ogg',
  victory: 'assets/Musica Universalis.ogg',
  death: 'assets/danger.ogg',
};

const VOLUME = 0.35;

let audioEl = null;
let currentTrackKey = null;
let muted = false;

function ensureAudioEl() {
  if (!audioEl) {
    audioEl = new Audio();
    audioEl.loop = true;
    audioEl.volume = VOLUME;
  }
  return audioEl;
}

export function playTrack(key) {
  if (!TRACKS[key] || key === currentTrackKey) return;
  const el = ensureAudioEl();
  currentTrackKey = key;
  el.src = encodeURI(TRACKS[key]);
  el.muted = muted;
  el.play().catch(() => {
    // Lecture automatique bloquée par le navigateur tant qu'aucune interaction utilisateur n'a eu lieu.
    // Sans gravité : la musique démarrera normalement au prochain clic (playTrack est rappelée à chaque re-render).
  });
}

export function stopAudio() {
  if (audioEl) audioEl.pause();
  currentTrackKey = null;
}

export function toggleMute() {
  muted = !muted;
  if (audioEl) audioEl.muted = muted;
  return muted;
}

export function isMuted() {
  return muted;
}
