/* 
    Routes handled :
    1. /api/services/{x} 
*/

const express = require("express");
const passport = require("passport");
const router = express.Router();

const fp = require("lodash/fp");
const ServiceModel = require("../../../models/Service");

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
 * @route POST /api/services
 * @desc: Gets collection of all services with filter
 * @access Public
 */
router.post("/", async (req, res) => {
  
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
 * @route GET /api/services/:serviceid
 * @desc: Gets specific service
 * @access Private
 */
router.get("/:serviceid", async (req, res) => {
  const serviceid = req.params.serviceid;
  console.log(serviceid);
  res.status(501).json({
    message: "Resource not implemented"
  });
});

module.exports = router;
