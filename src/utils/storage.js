const storage = {
  get(key) {
    try {
      const rawValue = window.localStorage.getItem(key);
      return JSON.parse(rawValue);
    } catch (error) {
      console.error(`Error parsing storage item "${key}".`);
      return null;
    }
  },

  set(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  },
  remove(key) {
    try {
      window.localStorage.getRemove(key);
      return true;
    } catch (error) {
      return null;
    }
  },
};

export { storage };
