/* /api/users/{x} */

const express = require("express");
const passport = require("passport");
const AuthHelper = require("../../../util/helper/auth");
const router = express.Router();
const UserModel = require("../../../models/User");
const CaretakerModel = require("../../../models/Caretaker");

/**
 * @route POST /api/register
 * @desc: register a new user
 * @access Private
 */
router.post("/register", async (req, res, next) => {
  passport.authenticate("register", async (err, user, info) => {
    if (err) {
      next(err);
    }
    if (!user) {
      res.status(400).send({
        success: false,
        ...info
      });
    } else {
      const { verified, password, ...safeUser } = user;
      res.json({
        success: true,
        message: "Signup successful",
        safeUser
      });
    }
  })(req, res, next);
});

/**
 * @route POST /api/login
 * @desc: login a user
 * @access Private
 */
router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    if (err) {
      next(err);
    }
    if (!user) {
      res.status(403).send({
        success: false,
        ...info
      });
    } else {
      const jwt = await AuthHelper.generateToken(user);
      res.json({
        success: true,
        message: "Login successful",
        token: jwt
      });
    }
  })(req, res, next);
});

/**
 * @route GET /api/user/profile/:userId
 * @desc: get user profile details
 * @access Public
 */

router.get("/profile/:userId", async (req, res) => {
  const userId = req.params.userId;

  UserModel.retrieveWithId(userId)
    .then(user => res.json(user))
    .catch(err => {
      console.log(err)
      res.status(404).json({ message: "User not found!" })
    });
});

/**
 * @route PATCH /api/user/profile/:userId
 * @desc: Update user details
 * @access Private
 */
router.patch(
  "/profile/:userId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const userId = req.params.userId;
    const { first_name, last_name } = req.body;

    UserModel.updateUser(first_name, last_name, userId)
      .then(user => res.json(user))
      .catch(err => res.status(500).json("Update error"));
  }
);

/**
 * @route GET /api/user/caretakers
 * @desc: gert all caretakers
 * @access public
 */
router.get("/caretakers", async (req, res) => {
    CaretakerModel.getAllCaretaker()
      .then(caretakers => res.json(caretakers))
      .catch(err => res.status(500).json("Error!"));
  }
)
module.exports = router;
