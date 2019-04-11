const express = require("express");
const router = express.Router();
const userdata = require("../../../dml/userdata");
const UserModel = require("../../../models/User");


/**
 * @route get /api/insertuserdata/insertuser
 * @desc: register 1000 users from userdata array
 * @access PUBLIC
 */
router.get("/insertuser", async () => {
  for (userdetail in userdata) {
    UserModel.create(userdetail)
    console.log(userdetail)
  }
});

module.exports = router;