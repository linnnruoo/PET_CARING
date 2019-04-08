/* 
    Routes handled :
    1. /api/services/{x} 
*/

const express = require('express');
const passport = require('passport');
const router = express.Router();

const fp = require('lodash/fp');
const ServiceModel = require('../../../models/Service');

/**
 * @route POST /api/services
 * @desc: Allows caretaker to add a new service
 * @access Private
 */
router.post('/', passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { role } = req.user;

    const { id, startTime, endTime, expected, typeName } = req.body;
    try {
      const service = await ServiceModel.create(id, startTime, endTime, expected, typeName);
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
 * @route GET /api/services
 * @desc: Gets collection of all services
 * @access Public
 */
router.get('/', async (req, res) => {
  try {
    const services = await ServiceModel.getAll();

    res.json({
      success: true,
      services
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
 * @route GET /api/services/by/:ownerid
 * @desc: Gets services by ownerid
 * @access Private
 */
router.get('/by/:serviceid', async (req, res) => {
  const ownerid = req.params.ownerid;
  console.log(ownerid);
  try {
    const services = await ServiceModel.getCaretakerServices(ownerid);

    res.json({
      success: true,
      services
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
 * @route GET /api/services/:serviceid
 * @desc: Gets specific service
 * @access Private
 */
router.get('/:serviceid', async (req, res) => {
  const serviceid = req.params.serviceid;
  console.log(serviceid);
  res.status(501).json({
    message: 'Resource not implemented'
  });
});

module.exports = router;