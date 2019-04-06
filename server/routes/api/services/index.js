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
 * @access Private {Caretaker}
 */
router.post('/', passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { role } = req.user;
    res.status(501).json({
      message: 'Resource not implemented'
    });
    /*
    if (!req.body.petName) {
      res.status(401).json({
        message: 'Missing parameters in request'
      });
    }
    else {
      const petName = req.body.petName;
      if (role === 'caretaker') {
        try {
          const service = await ServiceModel.create(;
          res.json({
            success: true,
            petType
          });
        } catch (error) {
          console.log(error);

          res.status({
            success: false,
            message: 'There was an unexpected error'
          });
        }
      }
      else {
        res.status(401).json({
          message: "You are not authorized to access this resource"
        });
      }
    }*/
  }
);

/**
 * @route GET /api/services
 * @desc: Gets collection of all services
 * @access Public
 */
router.get('/', async (req, res) => {
  res.status(501).json({
    message: 'Resource not implemented'
  });
  /*try {
    const petTypes = await PetTypeModel.getAll();

    const petTypesArray = fp.map('typename')(petTypes);

    res.json({
      success: true,
      petTypes: petTypesArray
    });
  } catch (error) {
    console.log(error);

    res.status({
      success: false,
      message: 'There was an unexpected error'
    });
  }*/
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