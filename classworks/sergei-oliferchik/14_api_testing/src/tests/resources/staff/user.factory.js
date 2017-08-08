const UserBuilder = require('./user.builder');
const idGenerator = require('lib/mongo/idGenerator');


exports.user = (password) => {
  let userBuilder = new UserBuilder()
  let user = userBuilder
    .addId(idGenerator.generate())
    .email()
    .passwordHash(password || 'qwerty')
    .firstName('Evgeny')
    .lastName('Zhivitsa')
    .user()
    .build()

    return user
}

exports.admin = () => {
  let userBuilder = new UserBuilder();
  let user = userBuilder
    .addId(idGenerator.generate())
    .email()
    .passwordHash('qwerty')
    .firstName('Evgeny')
    .lastName('Zhivitsa')
    .admin()
    .build();

    return user;
}
