const express = require("express");
const passport = require("passport");
const router = express.Router();

const adminSubRouter = require("./admin");
const bidSubRouter = require("./bids");
const petTypeSubRouter = require("./pettypes");
const petSubRouter = require("./pets");
const petBreedSubRouter = require("./petbreeds");
const serviceSubRouter = require("./services");
const userSubRouter = require("./users");
const insertDataSubRouter = require("./insertdata");
const ratingSubRouter = require("./ratings");

/**
 * @route POST /api/me
 * @desc: Test token auth
 * Note the chained middleware usage : Passport Auth Middleware -> async(req,res) handler
 * If auth fails, async handler will never be reached
 * @access Private
 */
router.post(
  "/me",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    res.json({
      me: {
        ...req.user
      }
    });
  }
);

/**
 * @route * /api/admin/*
 * @desc: API related to admin endpoint such as /api/admin
 * @access Admin
 */
router.use("/admin", adminSubRouter);

/**
 * @route * /api/bids/*
 * @desc: API related to user endpoint such as /api/bids/by/12
 * @access Public
 */
router.use("/bids", bidSubRouter);

/**
 * @route * /api/pets/*
 * @desc: API related to user endpoint such as /api/pet/add
 * @access Public
 */
router.use("/pets", petSubRouter);

/**
 * @route * /api/petbreeds/*
 * @desc: API related to petbreeds endpoint such as /api/petbreeds
 * @access Variable
*/
router.use("/petbreeds", petBreedSubRouter);

/**
 * @route * /api/pettypes/*
 * @desc: API related to pettypes endpoint such as /api/pettypes
 * @access Variable
 */
router.use("/pettypes", petTypeSubRouter);



/**
 * @route * /api/services/*
 * @desc: API related to services endpoint such as /api/service/:serviceid
 * @access Variable
 */
router.use("/services", serviceSubRouter);

/**
 * @route * /api/user/*
 * @desc: API related to user endpoint such as /api/user/register
 * @access Public
 */
router.use("/user", userSubRouter);

/**
 * @route * /api/ratings/*
 * @desc: API related to ratings endpoint such as /api/ratings
 * @access Variable
 */
router.use("/ratings", ratingSubRouter);


router.use("/insertdata", insertDataSubRouter);

router.get("/teapot", async (req, res) => {
  res.status(418).json({
    message: "I'm a teapot ☕"
  });
});

/**
 * @route GET /api/sleep/
 * @desc: Lynn's Missing Sleep
 * @access Public
 */
router.get("/sleep", async (req, res) => {
  res.status(400).json({
    status: "Error",
    message: "😴 Not Found"
  });
});

module.exports = router;
