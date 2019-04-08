/* 
    Routes handled :
    1. /api/pettypes/{x} 
*/

const express = require('express');
const passport = require('passport');
const router = express.Router();

const fp = require('lodash/fp');
const PetTypeModel = require('../../../models/PetType');

/**
 * @route POST /api/pettypes
 * @desc: Allows an admin to add a new pet type
 * @access Private {Admin}
 */
router.post('/', passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { role } = req.user;
    if (!req.body.petName) {
      res.status(401).json({
        message: 'Missing parameters in request'
      });
    }
    else {
      const petName = req.body.petName;
      if (role === 'admin') {
        try {
          const petType = await PetTypeModel.create(petName);
          res.json({
            success: true,
            petType
          });
        } catch (error) {
          console.log(error);

          res.status(400).json({
            success: false,
            message: 'There was an unexpected error'
          });
        }
      }
      else {
        res.status(401).json({
          message: "You are not authorized to access this resource"
        });
      }
    }
  }
);

/**
 * @route GET /api/pettypes
 * @desc: Gets collection of all pet types
 * @access Public
 */
router.get('/', async (req, res) => {
  try {
    const petTypes = await PetTypeModel.getAll();
    
    const petTypesArray = fp.map('typename')(petTypes);
    
    res.json({
      success: true,
      petTypes : petTypesArray
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: 'There was an unexpected error'
    });
  }
});

module.exports = router;