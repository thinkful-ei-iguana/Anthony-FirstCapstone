const express = require('express');
const accountRouter = express.Router();
const logger = require('../logger');
const bodyParser = express.json();
const AccountService = require('../Services/AccountService');
const path = require('path');

accountRouter.route('/').post(bodyParser, (req, res, next) => {
  const { name, email, location, password, username } = req.body;
  for (const field of ['name', 'email', 'location', 'username', 'password'])
    if (!req.body[field])
      return res.status(400).json({
        error: `Missing '${field}' in request body`
      });

  const passwordError = AccountService.validatePassword(password);

  if (passwordError) {
    return res.status(400).json({ error: passwordError });
  }
  AccountService.hasUserWithUserName(req.app.get('db'), username)
    .then(hasUserWithUserName => {
      if (hasUserWithUserName)
        return res.status(400).json({ error: 'Username already taken' });

      return AccountService.hashPassword(password).then(hashedPassword => {
        const newAccount = {
          name,
          email,
          location,
          username,
          password: hashedPassword,
          date_created: 'now()'
        };

        return AccountService.insertUser(req.app.get('db'), newAccount).then(
          user => {
            res
              .status(201)
              .location(path.posix.join(req.originalUrl, `/${user.id}`))
              .json(AccountService.serializeUser(user));
          }
        );
      });
    })
    .catch(next);
});

module.exports = accountRouter;
