const { getHash  } = require('infrastructure/helpers/crypto.helper');

module.exports = class UserBuilder {
  constructor() {
    this.data = {};
  }

  setParticipatorIds(participatorIds) {
    this.data.participatorIds = participatorIds;
    return this;
  }
  setCreaterId(createrId) {
    this.data.createrId = createrId;
    return this;
  }

  setLastName(lastName) {
    this.data.lastName = lastName;
    return this;
  }

  setTitle(title) {
    this.data.title = title;
    return this;
  }

  setDescription(description) {
    this.data.description  = description;
    return this;
  }

  build() {
    return this.data;
  }
}
