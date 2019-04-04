/* /api/pets/{x} */

const express = require('express');
const passport = require('passport');
const AuthHelper = require('../../../util/helper/auth');
const router = express.Router();

/**
 * @route POST /api/add_pets
 * @desc: 
 * @access Private ?
 */
router.post('/add_pets', async (req, res, next) => {
    passport.authenticate('add_pets', async (err, pet, info) => {
      if (err) {
        next(err);
      }
      if (!pet) {
        res.status(400).send({
          success: false, ...info
        });
      }
      else {
        const { name, age, gender, type, breeds, likes, ...petAdded}  = pet; 
        res.json({
          success: true,
          message: 'Pet added',
          petAdded
        });
      }
    })(req, res, next);
  });
  
  module.exports = router;