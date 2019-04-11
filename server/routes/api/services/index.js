/* 
    Routes handled :
    1. /api/services/{x} 
*/

const express = require("express");
const passport = require("passport");
const router = express.Router();

const fp = require("lodash/fp");
const ServiceModel = require("../../../models/Service");
const BidModel = require("../../../models/Bid");

const PageSize = 20;
/**
 * @route POST /api/services
 * @desc: Allows caretaker to add a new service
 * @access Private
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { role } = req.user;

    const { id, title, startTime, endTime, expected, typeName } = req.body;
    try {
      const service = await ServiceModel.create(
        id,
        title,
        startTime,
        endTime,
        expected,
        typeName
      );
      res.json({
        success: true,
        service
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
 * @route GET /api/services
 * @desc: Gets collection of all services
 * @access Public
 */
router.get("/", async (req, res) => {
  try {
    const services = await ServiceModel.getAll();

    res.json({
      success: true,
      services
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
 * @route POST /api/services/filter/:page
 * @desc: Gets collection of all services with filter
 * @access Public
 */
router.post("/filter/:page", async (req, res) => {
  const page = req.params.page;
  try {
    if (!req.body.filter) {
      res.status(400).json({
        success: false,
        message: "There was an unexpected error"
      });
    }
    const { filter } = req.body;

    console.log(filter);
    const services = await ServiceModel.getAllWithFilter(filter, page);

    res.json({
      success: true,
      services
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
 * @route POST /api/services/filter/
 * @desc: Returns pages of data corresponding to filter
 * @access Public
 */
router.post("/filter", async (req, res) => {
  try {
    if (!req.body.filter) {
      res.status(400).json({
        success: false,
        message: "There was an unexpected error"
      });
    }
    const { filter } = req.body;

    console.log(filter);
    const pages = await ServiceModel.getFilterPageCount(filter);

    res.json({
      success: true,
      pages: Math.ceil(pages.pages / PageSize)
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
 * @route GET /api/services/by/:caretakerid/potential
 * @desc: Gets caretaker maximum  potential income.
 *        Calculates from all highest bids from owners that caretaker received.
 * @access Private
 */
router.get("/by/:caretakerid/potential", async (req, res) => {
  const caretakerID = req.params.caretakerid;
  try {
    const potentialIncome = await ServiceModel.getCaretakerPotentialIncome(
      caretakerID
    );
    res.json({
      success: true,
      potentialIncome
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
 * @route GET /api/services/by/:caretakerid
 * @desc: Gets services by caretakerid
 * @access Private
 */
router.get("/by/:caretakerid", async (req, res) => {
  const caretakerID = req.params.caretakerid;

  try {
    const services = await ServiceModel.getCaretakerServices(caretakerID);

    res.json({
      success: true,
      services
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
 * @route GET /api/services/:serviceid/stats
 * @desc: Gets bidding stats for specific service
 * @access Private
 */
router.get("/:serviceid/stats", async (req, res) => {
  const serviceid = req.params.serviceid;
  console.log(serviceid);
  BidModel.getBidStats(serviceid)
    .then(stats => {
      res.json({
        success: true,
        stats
      });
    })
    .catch(err => console.log(err));
});

/**
 * @route GET /api/services/:serviceid
 * @desc: Gets specific service
 * @access Private
 */
router.get("/:serviceid", async (req, res) => {
  const serviceid = req.params.serviceid;
  console.log(serviceid);
  ServiceModel.getOne(serviceid)
    .then(service => {
      res.json({
        success: true,
        service
      });
    })
    .catch(err => console.log(err));
});

module.exports = router;
