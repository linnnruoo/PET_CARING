const express = require('express');
const passport = require('passport');
const router = express.Router();

const petTypeSubRouter = require('./pettypes');
const serviceSubRouter = require('./services');
const userSubRouter = require('./users');

const db = require('../../controller/db');

/**
 * @route POST /api/me
 * @desc: Test token auth
 * Note the chained middleware usage : Passport Auth Middleware -> async(req,res) handler
 * If auth fails, async handler will never be reached
 * @access Private
 */
router.post('/me', passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    res.json({
      me: {
        ...req.user
      }
    });
  }
);

/**
 * @route * /api/pettypes/*
 * @desc: API related to user endpoint such as /api/user/register
 * @access Variable
 */
router.use('/pettypes', petTypeSubRouter);

/**
 * @route * /api/user/*
 * @desc: API related to user endpoint such as /api/user/register
 * @access Public
 */
router.use('/user', userSubRouter);

/**
 * @route * /api/services/*
 * @desc: API related to services endpoint such as /api/service/:serviceid
 * @access Variable
 */
router.use('/services', serviceSubRouter);

module.exports = router;
