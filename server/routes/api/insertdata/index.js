const express = require("express");
const router = express.Router();
const userdata = require("../../../dml/userdata");
const UserModel = require("../../../models/User");


/**
 * @route get /api/insertdata/user
 * @desc: register 1000 users from userdata array
 * @access PUBLIC
 */
router.get("/user", async (req, res) => {
  
  userdata.forEach((userdetail) => {
    const { email, password, firstname, lastname, role} = userdetail;
    UserModel.create(email, password, firstname, lastname, role)
    .then(x => {});
    setTimeout(() => console.log("sleep"), 2000)
  });
  res.json({message : "done"});
});

module.exports = router;