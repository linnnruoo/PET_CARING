/* 
    Routes handled :
    1. /api/ratings/{x} 
*/

const express = require('express');
const passport = require('passport');
const router = express.Router();

const RatingModel = require('../../../models/Rating');

/**
 * @route POST /api/ratings
 * @desc: Add new rating
 * @access Private
 */
router.post('/', passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const { ownerId, caretakerId, value } = req.body;
        try {
        const rating = await RatingModel.create(ownerId, caretakerId, value);
        res.json({
            success: true,
            rating
        });
        } catch (error) {
        console.log(error);
    
        res.status(400).json({
            success: false,
            message: "There was an unexpected error"
        });
        }
    }
);

/**
 * @route GET /api/ratings/:caretakerid
 * @desc: Gets collection of all pet types
 * @access Public
 */
router.get("/:caretakerid", async (req, res) => {
    const caretakerID = req.params.caretakerid;
    try {
      const ratings = await RatingModel.getRatingInfo(caretakerID);
  
      res.json({
        success: true,
        ratings
      });
    } catch (error) {
      console.log(error);
  
      res.status(400).json({
        success: false,
        message: "There was an unexpected error"
      });
    }
  });
  
module.exports = router;