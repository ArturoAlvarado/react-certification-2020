const storage = {
  get(key) {
    try {
      const rawValue = window.localStorage.getItem(key);
      console.log(rawValue);
      return JSON.parse(rawValue);
    } catch (error) {
      console.error(`Error parsing storage item "${key}".`);
      return null;
    }
  },

  set(key, value) {
    console.log(value);
    console.log(JSON.stringify(value));
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
