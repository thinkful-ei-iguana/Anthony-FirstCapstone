const xss = require('xss');
const bcrypt = require('bcryptjs');

const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;

const AccountService = {
  hasUserWithUserName(db, username) {
    return db('users')
      .where({ username })
      .first()
      .then(user => !!user);
  },
  insertUser(db, newAccount) {
    return db
      .insert(newAccount)
      .into('users')
      .returning('*')
      .then(([user]) => user);
  },
  deleteUser(db, username) {
    return db('users')
      .where({ username })
      .delete();
  },
  deleteListingsOfDeletedUser(db, username) {
    return db('listings')
      .where({ owner: username })
      .delete();
  },
  updateAccount(knex, id, updatedData) {
    return knex('users')
      .where({ id })
      .update(updatedData);
  },
  validatePassword(password) {
    if (password.startsWith(' ') || password.endsWith(' ')) {
      return 'Password must not start or end with empty spaces';
    }
    if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
      return 'Password must contain 1 upper case, lower case, number and special character';
    }
    return null;
  },
  hashPassword(password) {
    return bcrypt.hash(password, 12);
  },
  serializeUser(user) {
    return {
      id: user.id,
      name: xss(user.name),
      email: xss(user.email),
      location: xss(user.location),
      username: xss(user.username),
      password: xss(user.password),
      date_created: new Date(user.date_created),
      avatar: xss(user.avatar)
    };
  }
};

module.exports = AccountService;
