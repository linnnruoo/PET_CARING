/* /api/pets/{x} */	

const express = require('express');	
const passport = require('passport');	
const PetModel = require('../../../models/Pet');
const router = express.Router();	


 /**	
 * @route POST /api/pets/add	
 * @desc: To let pet owners add their pets
 * @access Private to pet owner
 */	
router.post('/add', passport.authenticate('jwt', { session: false }),	
    async (req, res) => {	
      
      const { name, breedName, age, gender} = req.body;	

        try {	
          const pet = await PetModel.create(name, id, breedName, age, gender);	
          console.log(message);	
        } catch (error) {	
          console.log(error);	
        
        res.json({	
            me: {	
              ...req.body,	
              message: 'Pet added!',	
            }	
          });	
      
       }    	
    },	
  );	

 module.exports = router; 