/* /api/users/{x} */

const express = require('express');
const passport = require('passport');
const AuthHelper = require('../../../util/helper/auth');
const router = express.Router();

router.post('/register', async (req, res, next) => {
    passport.authenticate('register', async (err, user, info) => {
      if (err) {
        next(err);
      }
      if (!user) {
        res.status(400).send({
          success: false, ...info
        });
      }
      else {
        const { verified, password, ...safeUser }  = user; 
        res.json({
          success: true,
          message: 'Signup successful',
          safeUser
        });
      }
    })(req, res, next);
  });
  
  router.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
      if (err) {
        next(err);
      }
      if (!user) {
        res.status(403).send({
          success: false, ...info
        });
      }
      else {
        const jwt = await AuthHelper.generateToken(user);
        res.json({
          success: true,
          message: 'Login successful',
          token: jwt
        });
      }
    })(req, res, next);
  });
  
  module.exports = router;