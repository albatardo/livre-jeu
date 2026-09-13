// Vérifie l'intégrité du graphe de paragraphes de chaque récit du registre :
// liens valides, exactement un des quatre champs par paragraphe, accessibilité
// depuis le §1, chaque fin atteignable, chaque combat perdu redirige vers une
// fin de type mort, chaque fin a un title.
//
// Usage : node scripts/verify-story.mjs

import { STORIES } from '../js/data/stories.js';

let totalErrors = 0;

for (const story of STORIES) {
  console.log(`\n=== ${story.title} (${story.id}) ===`);
  totalErrors += verifyStory(story);
}

console.log(`\n${totalErrors === 0 ? 'Tous les récits sont valides.' : `${totalErrors} erreur(s) au total.`}`);
if (totalErrors > 0) process.exit(1);

function verifyStory(story) {
  const { paragraphs: PARAGRAPHS, items: ITEMS, deathFallbackId } = story;
  const ids = Object.keys(PARAGRAPHS).map(Number);
  const errors = [];

  function checkTarget(from, target, label) {
    if (target === undefined) return;
    if (!(target in PARAGRAPHS)) errors.push(`§${from} -> ${label} §${target} n'existe pas`);
  }

  for (const id of ids) {
    const p = PARAGRAPHS[id];
    const fieldCount = ['choices', 'luckTest', 'combat', 'ending'].filter((k) => p[k]).length;
    if (fieldCount !== 1) errors.push(`§${id} a ${fieldCount} champs parmi {choices,luckTest,combat,ending} (1 attendu)`);

    if (p.choices) {
      for (const c of p.choices) {
        checkTarget(id, c.targetId, 'choice target');
        checkTarget(id, c.deathTarget, 'deathTarget');
        if (c.requiresItem && !(c.requiresItem in ITEMS)) errors.push(`§${id} requiresItem inconnu : ${c.requiresItem}`);
        if (c.grantItem && !(c.grantItem in ITEMS)) errors.push(`§${id} grantItem inconnu : ${c.grantItem}`);
        if (c.removeItem && !(c.removeItem in ITEMS)) errors.push(`§${id} removeItem inconnu : ${c.removeItem}`);
      }
    }
    if (p.luckTest) {
      checkTarget(id, p.luckTest.successTarget, 'luckTest successTarget');
      checkTarget(id, p.luckTest.failTarget, 'luckTest failTarget');
      checkTarget(id, p.luckTest.deathTarget, 'luckTest deathTarget');
    }
    if (p.combat) {
      checkTarget(id, p.combat.winTarget, 'combat winTarget');
      checkTarget(id, p.combat.loseTarget, 'combat loseTarget');
    }
    if (p.ending && !p.title) errors.push(`§${id} est une fin sans champ title (requis pour le codex des succès)`);
  }

  if (!(deathFallbackId in PARAGRAPHS)) errors.push(`deathFallbackId ${deathFallbackId} n'existe pas`);
  else if (PARAGRAPHS[deathFallbackId].ending !== 'death') errors.push(`deathFallbackId ${deathFallbackId} n'est pas une fin de type mort`);

  // Accessibilité depuis le §1, en tenant compte du filet de sécurité mort
  // générique utilisé implicitement par le moteur quand un effet fait tomber
  // l'Endurance à 0 sans deathTarget explicite.
  const visited = new Set();
  const queue = [1];
  while (queue.length) {
    const id = queue.pop();
    if (visited.has(id)) continue;
    visited.add(id);
    const p = PARAGRAPHS[id];
    if (!p) continue;
    const targets = [];
    if (p.choices) p.choices.forEach((c) => { targets.push(c.targetId); targets.push(c.deathTarget ?? deathFallbackId); });
    if (p.luckTest) { targets.push(p.luckTest.successTarget, p.luckTest.failTarget); targets.push(p.luckTest.deathTarget ?? deathFallbackId); }
    if (p.combat) targets.push(p.combat.winTarget, p.combat.loseTarget);
    targets.forEach((t) => queue.push(t));
  }

  const orphans = ids.filter((id) => !visited.has(id));
  if (orphans.length) errors.push(`Paragraphes orphelins (inaccessibles depuis le §1) : ${orphans.join(', ')}`);

  const endings = ids.filter((id) => PARAGRAPHS[id].ending);
  const unreachableEndings = endings.filter((id) => !visited.has(id));
  if (unreachableEndings.length) errors.push(`Fins inaccessibles : ${unreachableEndings.join(', ')}`);

  for (const id of ids) {
    const p = PARAGRAPHS[id];
    if (p.combat) {
      const loseP = PARAGRAPHS[p.combat.loseTarget];
      if (!loseP || loseP.ending !== 'death') errors.push(`§${id} combat loseTarget §${p.combat.loseTarget} n'est pas une fin de type mort`);
    }
  }

  console.log(`Paragraphes : ${ids.length}`);
  console.log(`Accessibles depuis le §1 : ${visited.size}`);
  console.log(`Fins : ${endings.length} (${endings.filter((id) => PARAGRAPHS[id].ending === 'death').length} morts, ${endings.length - endings.filter((id) => PARAGRAPHS[id].ending === 'death').length} non mortelles)`);

  if (errors.length) {
    console.log('ERREURS :');
    errors.forEach((e) => console.log(' - ' + e));
  } else {
    console.log('Tous les contrôles sont passés.');
  }

  return errors.length;
}
