/* 
    Routes handled :
    1. /api/bids/{x} 
*/

const express = require('express');
const passport = require('passport');
const router = express.Router();

const BidModel = require('../../../models/Bid');

/**
 * @route POST /api/bids
 * @desc: Allows caretaker to add a new bid
 * @access Private
 */
router.post('/', passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { role } = req.user;

    const { ownerId, serviceId, amount, petName } = req.body;
    try {
      const bid = await BidModel.create(ownerId, serviceId, amount, petName);
      res.json({
        success: true,
        service
      });
    } catch (error) {
      console.log(error);

      res.status({
        success: false,
        message: 'There was an unexpected error'
      });
    }

  }
);

/**
 * @route GET /api/bids
 * @desc: Gets collection of all bids
 * @access Public
 */
router.get('/', async (req, res) => {
  try {
    const bids = await BidModel.getAll();

    res.json({
      success: true,
      bids
    });
  } catch (error) {
    console.log(error);

    res.status({
      success: false,
      message: 'There was an unexpected error'
    });
  }
});

/**
 * @route GET /api/bids/by/:caretakerid
 * @desc: Gets bids by caretakerid
 * @access Private
 */
router.get('/by/:caretakerid', async (req, res) => {
  const caretakerID = req.params.caretakerid;
  console.log(ownerid);
  try {
    const bids = await BidModel.getCaretakerBids(caretakerID);

    res.json({
      success: true,
      bids
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