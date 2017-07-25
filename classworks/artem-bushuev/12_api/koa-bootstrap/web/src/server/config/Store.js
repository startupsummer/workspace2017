class Store {
  constructor() {
    this.map = new Map();
  }
  set(token, user) {
    this.map.set(token, user);
  }
  remove(token) {
    this.map.delete(token);
  }
  get(token) {
    return this.map.get(token);
  }
}
module.exports = Store;
