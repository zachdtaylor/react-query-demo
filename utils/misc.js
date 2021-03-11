export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function range(length) {
  return Array.from(Array(length).keys());
}
