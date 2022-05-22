export const getLocalStorage = <T>(key: string): T | null => {
  const neededItem = localStorage.getItem(key);
  if (neededItem === null) return null;
  return JSON.parse(neededItem);
};

export const setLocalStorage = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};
