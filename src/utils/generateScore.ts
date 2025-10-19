export const KEYS: string[] = ['A', 'S', 'D', 'F', 'G'];

export const generateScore = (): string[] => {
  const length = Math.floor(Math.random() * 3) + 2;
  return Array.from({ length }, () => KEYS[Math.floor(Math.random() * KEYS.length)]);
};
