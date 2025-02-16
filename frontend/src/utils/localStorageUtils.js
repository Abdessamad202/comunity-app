// Utility function to manage localStorage interactions
export const setLocalStorageItem = (key, value) => {
  if (value) {
    localStorage.setItem(key, value);
  } else {
    localStorage.removeItem(key);
  }
};

export const getLocalStorageItem = (key, defaultValue = null) => {
  return localStorage.getItem(key) || defaultValue;
};
