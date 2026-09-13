export function rollD6() {
  return 1 + Math.floor(Math.random() * 6);
}

export function roll2D6() {
  return rollD6() + rollD6();
}
