/* 
    Routes handled :
    1. /api/bids/{x} 
*/

const express = require("express");
const passport = require("passport");
const router = express.Router();

const BidModel = require("../../../models/Bid");

/**
 * @route POST /api/bids
 * @desc: Allows owner to add a new bid
 * @access Private
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { role } = req.user;

    const { ownerId, serviceId, amount, petName } = req.body;
    try {
      const bid = await BidModel.create(ownerId, serviceId, amount, petName);
      res.json({
        success: true,
        bid
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
 * @route GET /api/bids
 * @desc: Gets collection of all bids
 * @access Public
 */
router.get("/", async (req, res) => {
  try {
    const bids = await BidModel.getAll();

    res.json({
      success: true,
      bids
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: "There was an unexpected error"
    });
  }
});

/**
 * @route GET /api/bids/by/:caretakerid
 * @desc: Gets bids by caretakerid
 * @access Private
 */
router.get("/by/:caretakerid", async (req, res) => {
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

    res.status(400).json({
      success: false,
      message: "There was an unexpected error"
    });
  }
});

/**
 * @route GET /api/bids/on/:serviceid/top/:limit
 * @desc: Gets top :limit number bids by serviceid
 * @access Private
 */
router.get("/on/:serviceid/top/:limit", async (req, res) => {
  const serviceID = req.params.serviceid;
  const limit = req.params.limit;

  try {
    const bids = await BidModel.getTopBidsForService(serviceID, limit);

    res.json({
      success: true,
      bids
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: "There was an unexpected error"
    });
  }
});

/**
 * @route GET /api/bids/on/:serviceid
 * @desc: Gets bids by serviceid
 * @access Private
 */
router.get("/on/:serviceid", async (req, res) => {
  const serviceID = req.params.serviceid;
  try {
    const bids = await BidModel.filterByService(serviceID);

    res.json({
      success: true,
      bids
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: "There was an unexpected error"
    });
  }
});

/**
 * @route GET /api/bids/on/:userid_serviceid
 * @desc: Check if user has bid on unique service
 * @access Private
 */
router.get("/on/:userid:serviceid", async (req, res) => {
  const serviceID = req.params.serviceid;
  const userID = req.params.userid;
  try {
    const bids = await BidModel.getCheckUserBidUniqueService(userID, serviceID);
    res.json({
      success: true,
      bids
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: "User has no bids for selected service"
    });
  }
});

/**
 * @route: Patch /api/bids/update
 * @desc: Update a bid made by owner to a service
 * @access: Private | Pet Owner
 */
router.patch(
  "/update",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const {
      id, sid, newAmount, newPetName
    } = req.body;
    console.log(req.body);
    BidModel.updateOne(
      id,
      sid,
      newAmount,
      newPetName
    )
      .then(result => res.json({ success: true }))
      .catch(err => console.log(err));
  }
);

module.exports = router;
