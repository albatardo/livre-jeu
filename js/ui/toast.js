// Petite notification éphémère en bas à droite de l'écran (succès débloqué).
// Le conteneur est créé paresseusement au premier appel, pas besoin de balise
// dédiée dans index.html.
let container = null;

function ensureContainer() {
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    container.setAttribute('aria-live', 'polite');
    document.body.appendChild(container);
  }
  return container;
}

export function showToast(message, { duration = 4000 } = {}) {
  const toastEl = document.createElement('div');
  toastEl.className = 'toast';
  toastEl.textContent = message;
  ensureContainer().appendChild(toastEl);

  requestAnimationFrame(() => toastEl.classList.add('toast-visible'));

  setTimeout(() => {
    toastEl.classList.remove('toast-visible');
    toastEl.addEventListener('transitionend', () => toastEl.remove(), { once: true });
  }, duration);
}
