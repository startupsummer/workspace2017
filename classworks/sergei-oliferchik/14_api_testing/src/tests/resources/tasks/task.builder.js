const faker = require('faker')

class Builder {
  constructor()  {
    this.data = {}
  }

  addId(id) {
    this.data._id = id;
    return this;
  }

  addCreaterId(id) {
    this.data.createrId = id;
    return this;
  }

  title(title) {
    this.data.title = title;
    return this;
  }

  description(description) {
    this.data.description = description;
    return this;
  }

  participatorIds(members) {
    this.data.participatorIds = members ? [...members] : [];
    return this;
  }

  build() {
    return this.data
  }
}

module.exports = Builder
