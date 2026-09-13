import { roll2D6 } from './dice.js';
import { applyStatDelta } from './character.js';

const STAMINA_DAMAGE = 2;

export function createCombatState(enemy) {
  return {
    enemy: {
      name: enemy.name,
      icon: enemy.icon ?? '👤',
      skill: enemy.skill,
      stamina: { current: enemy.stamina, initial: enemy.stamina },
    },
    log: [{ text: `${enemy.icon ?? '👤'} ${enemy.name} te barre la route !`, kind: 'info' }],
    round: 0,
    finished: false,
    outcome: null, // 'playerWins' | 'enemyWins'
    lastEvent: null, // { side: 'player' | 'enemy' } — disponible pour Tenter sa Chance après ce round
  };
}

function pushLog(combatState, text, kind) {
  combatState.log.push({ text, kind });
}

function checkCombatEnd(character, combatState) {
  if (combatState.enemy.stamina.current <= 0) {
    combatState.finished = true;
    combatState.outcome = 'playerWins';
    pushLog(combatState, `Le ${combatState.enemy.name} s'effondre, vaincu.`, 'outcome');
  } else if (character.stamina.current <= 0) {
    combatState.finished = true;
    combatState.outcome = 'enemyWins';
    pushLog(combatState, 'Tes forces t\'abandonnent...', 'outcome');
  }
}

export function combatRound(character, combatState) {
  if (combatState.finished) return combatState;
  combatState.round += 1;

  const playerRoll = roll2D6();
  const enemyRoll = roll2D6();
  const playerScore = playerRoll + character.skill.current;
  const enemyScore = enemyRoll + combatState.enemy.skill;

  pushLog(
    combatState,
    `Round ${combatState.round} — Toi : ${playerRoll} + ${character.skill.current} = ${playerScore} vs ${combatState.enemy.name} : ${enemyRoll} + ${combatState.enemy.skill} = ${enemyScore}`,
    'roll'
  );

  if (playerScore > enemyScore) {
    combatState.enemy.stamina.current = Math.max(0, combatState.enemy.stamina.current - STAMINA_DAMAGE);
    combatState.lastEvent = { side: 'player' };
    pushLog(combatState, `Tu blesses le ${combatState.enemy.name} (-${STAMINA_DAMAGE} Endurance).`, 'player-hit');
  } else if (enemyScore > playerScore) {
    applyStatDelta(character, 'stamina', -STAMINA_DAMAGE);
    combatState.lastEvent = { side: 'enemy' };
    pushLog(combatState, `Le ${combatState.enemy.name} te blesse (-${STAMINA_DAMAGE} Endurance).`, 'enemy-hit');
  } else {
    combatState.lastEvent = null;
    pushLog(combatState, 'Coups parés des deux côtés.', 'tie');
  }

  checkCombatEnd(character, combatState);
  return combatState;
}

export function tryLuck(character, combatState) {
  if (character.luck.current <= 0 || !combatState.lastEvent) return null;

  const luckBeforeTest = character.luck.current;
  const roll = roll2D6();
  const success = roll <= luckBeforeTest;
  character.luck.current = Math.max(0, character.luck.current - 1);

  const { side } = combatState.lastEvent;

  if (side === 'player') {
    if (success) {
      combatState.enemy.stamina.current = Math.max(0, combatState.enemy.stamina.current - 2);
      pushLog(
        combatState,
        `Chance réussie (${roll} ≤ ${luckBeforeTest}) ! Ton coup porte plus loin que prévu : -2 Endurance supplémentaires au ${combatState.enemy.name}.`,
        'luck-success'
      );
    } else {
      combatState.enemy.stamina.current = Math.min(combatState.enemy.stamina.initial, combatState.enemy.stamina.current + 1);
      pushLog(
        combatState,
        `Chance échouée (${roll} > ${luckBeforeTest}). Ton coup était moins efficace que prévu : le ${combatState.enemy.name} récupère 1 point.`,
        'luck-fail'
      );
    }
  } else if (side === 'enemy') {
    if (success) {
      applyStatDelta(character, 'stamina', 1);
      pushLog(combatState, `Chance réussie (${roll} ≤ ${luckBeforeTest}) ! Tu limites les dégâts (+1 Endurance).`, 'luck-success');
    } else {
      applyStatDelta(character, 'stamina', -1);
      pushLog(
        combatState,
        `Chance échouée (${roll} > ${luckBeforeTest}). La blessure est plus grave que prévu (-1 Endurance supplémentaire).`,
        'luck-fail'
      );
    }
  }

  combatState.lastEvent = null;
  checkCombatEnd(character, combatState);
  return { success, roll };
}
