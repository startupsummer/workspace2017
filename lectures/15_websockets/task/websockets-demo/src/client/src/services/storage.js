export default {
  getItem(key) {
    const value = localStorage[key];
    return (value && JSON.parse(value)) || null;
  },

  setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  removeItem(key) {
    localStorage.removeItem(key);
  },
};
