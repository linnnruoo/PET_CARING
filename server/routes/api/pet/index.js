/* /api/pet/{x} */

const express = require('express');
const passport = require('passport');
const AuthHelper = require('../../../util/helper/auth');
const router = express.Router();

/**
 * @route POST /api/pet/add
 * @desc: 
 * @access Private ?
 */
router.post('/add', passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      const { name, breedName, age, gender} = req.body;
        res.json({
            me: {
              ...req.pets,
              message = 'Pet added!',
            }
          });
      try {
        const pet = await PetModel.create(name, id, breedName, age, gender);
        console.log(message);
      } catch (error) {
        console.log(error);

      }    
    },
  );
      
/**
 * @route * /api/pet/*
 * @desc: API related to user endpoint such as /api/user/register
 * @access Public
 */
router.use('/user', userSubRouter);
  
module.exports = router;