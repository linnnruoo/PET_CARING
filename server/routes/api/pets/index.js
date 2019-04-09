/* /api/pets/{x} */

const express = require("express");
const passport = require("passport");
const PetModel = require("../../../models/Pet");
const router = express.Router();

/**
 * @route GET /api/pets/
 * @desc: Get all the pets
 * @access Public
 */
router.get("/", async (req, res) => {
  PetModel.findAll()
    .then(pets => res.json(pets))
    .catch(err => res.status(500).json("Failed to retrieve all pets"));
});

/**
 * @route POST /api/pets/add
 * @desc: To let pet owners add their pets
 * @access Private to pet owner
 */
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { name, ownerId, typeName, breedName, age, gender } = req.body;
    PetModel.create(name, ownerId, typeName, breedName, age, gender)
      .then(pet => res.json(pet))
      .catch(err => res.status(500).json("Failed to add a new pet!"));
  }
);

/**
 * @route GET /api/pets/:ownerId
 * @desc: Get all the pets under this owner
 * @access Public
 */
router.get("/:ownerId", async (req, res) => {
  const ownerId = req.params.ownerId;
  PetModel.filterByOwner(ownerId)
    .then(pets => res.json(pets))
    .catch(err => res.status(404).json("No pets found under this user."));
});

// this route is kinda ugly, by right it should just be DELETE /api/pet/
/**
 * @route: DELETE /api/pets/delete
 * @desc: Delete a pet of this owner
 * @access: Private | Pet Owner
 */
router.delete(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { name, ownerId } = req.body;
    PetModel.deleteOne(name, ownerId)
      .then(result => res.json({ deleted: true }))
      .catch(err => res.status(500).json("Failed to delete pet!"));
  }
);

/**
 * @route: Patch /api/pets/update
 * @desc: Update a pet of this owner
 * @access: Private | Pet Owner
 */
router.patch(
  "/update",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const {
      oldName,
      newName,
      ownerId,
      typeName,
      breedName,
      age,
      gender
    } = req.body;
    console.log(req.body);
    PetModel.updateOne(
      oldName,
      newName,
      ownerId,
      typeName,
      breedName,
      age,
      gender
    )
      .then(result => res.json({ success: true }))
      .catch(err => console.log(err));
  }
);

module.exports = router;
