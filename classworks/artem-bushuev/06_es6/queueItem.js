class User {
  constructor(name, age) {
    this.userName = name;
    this.userAge = age;
  }
  get age() {
    return this.userAge;
  }
  get name() {
    return this.userName;
  }
  set age(age) {
    this.userAge = age;
  }
}

module.exports = User;
