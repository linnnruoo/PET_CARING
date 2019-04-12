/* 
	Routes handled :
	1. /api/admin/{x} 
*/

const express = require("express");
const passport = require("passport");
const router = express.Router();

const AdminModel = require("../../../models/Admin");
  
router.get("/del/bidsbyowner/:ownerid", passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const {role} = req.user;
    const ownerID = req.params.ownerid
    if (role !== 'admin') {
      res.status(400).json({
        success: false,
        message: "You have no permission"
      });
    }
    try {
      const deletion = await AdminModel.deleteBidsByOwnerID(ownerID);

      res.json({
        success: true,
        deletion
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

router.get("/del/bidsbyservice/:serviceid", passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const {role} = req.user;
    const serviceID = req.params.serviceid
    if (role !== 'admin') {
      res.status(400).json({
        success: false,
        message: "You have no permission"
      });
    }
    try {
      const deletion = await AdminModel.deleteBidsByService(serviceID);

      res.json({
        success: true,
        deletion
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

router.get("/del/bidsbypetname/:petname", passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const {role} = req.user;
    const petname = req.params.petname;
    if (role !== 'admin') {
      res.status(400).json({
        success: false,
        message: "You have no permission"
      });
    }
    try {
      const deletion = await AdminModel.deleteBidsByPetname(petname);

      res.json({
        success: true,
        deletion
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

router.get("/del/bidsbyoidpetname/:ownerid-:petname", passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const {role} = req.user;
    const petname = req.params.petname;
    const ownerid = req.params.ownerid;
    if (role !== 'admin') {
      res.status(400).json({
        success: false,
        message: "You have no permission"
      });
    }
    try {
      const deletion = await AdminModel.deleteBidByOIDPetname(ownerid, petname);

      res.json({
        success: true,
        deletion
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

router.get("/del/servicebycaretakerid/:careid", passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const {role} = req.user;
    const careid = req.params.careid;
    if (role !== 'admin') {
      res.status(400).json({
        success: false,
        message: "You have no permission"
      });
    }
    try {
      const deletion = await AdminModel.deleteServicesByCaretakerId(careid);

      res.json({
        success: true,
        deletion
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

router.get("/del/service/:serviceid", passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const {role} = req.user;
    const serviceid = req.params.serviceid;
    if (role !== 'admin') {
      res.status(400).json({
        success: false,
        message: "You have no permission"
      });
    }
    try {
      const deletion = await AdminModel.deleteServiceByID(serviceid);

      res.json({
        success: true,
        deletion
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
module.exports = router;
