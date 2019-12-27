const express = require("express");
const accountRouter = express.Router();
const logger = require("./logger");
const bodyParser = express.json();
const AccountService = require("./AccountService");
const xss = require("xss");
const path = require("path");

accountRouter.post("/api/account-creation", bodyParser, (req, res, next) => {
  const { password, user_name } = req.body;
  for (const field of ["name", "email", "location", "user_name", "password"])
    if (!req.body[field])
      return res.status(400).json({
        error: `Missing '${field}' in request body`
      });

  const passwordError = AccountService.validatePassword(password);

  if (passwordError) {
    return res.status(400).json({ error: passwordError });
  }
  AccountService.hasUserWithUserName(req.app.get("db"), user_name)
    .then(hasUserWithUserName => {
      if (hasUserWithUserName)
        return res.status(400).json({ error: "Username already taken" });

      res.send("ok");
    })
    .catch(next);
});
