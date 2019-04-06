/* 
    Routes handled :
    1. /api/petbreeds/{x} 
*/

const express = require('express');
const passport = require('passport');
const router = express.Router();

const PetBreedModel = require('../../../models/PetBreed');

/**
 * @route POST /api/petbreeds
 * @desc: Allows an admin to add a new pet breed
 * @param Requires petBreed & petType
 * @access Private {Admin}
 */
router.post('/', passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { role } = req.user;
    if (!req.body.petBreed || !req.body.petType) {
      res.status(401).json({
        message: 'Missing parameters in request'
      });
    }
    else {
      const { petBreed, petType } = req.body;
      if (role === 'admin') {
        try {
          const breed = await PetBreedModel.create(petBreed, petType);
          res.json({
            success: true,
            breed
          });
        } catch (error) {
          console.log(error);

          res.status({
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
 * @route GET /api/petbreeds
 * @desc: Gets collection of all pet breeds
 * @access Public
 */
router.get('/', async (req, res) => {
  try {
    const petBreeds = await PetBreedModel.getAll();
   
    res.json({
      success: true,
      petBreeds
    });
  } catch (error) {
    console.log(error);

    res.status({
      success: false,
      message: 'There was an unexpected error'
    });
  }
});

module.exports = router;