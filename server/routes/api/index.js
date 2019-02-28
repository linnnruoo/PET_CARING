const express = require('express');
const passport = require('passport');
const router = express.Router();

const userSubRouter = require('./users');

const db = require('../../controller/db');

/**
 * @route POST /api/me
 * @desc: Test token auth
 * @access Private
 */
router.post('/me', passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    res.json({
      me: {
        email: req.user.email
      }
    });
  }
);

router.use('/user', userSubRouter);

module.exports = router;
