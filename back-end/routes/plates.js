const express = require('express');
const router = express.Router();

// Import mongoose Plate model for easy data manipulation between MongoDB and Back-end part
const Plate = require('./../model/plate')

// Get all Plate collection
router.get('/', (req, res) => {
  // Retrieve all Plate documents from database sorted by name in asc
  Plate.find()
    .sort({ name: 1 })
    // If find operation successful then:
    .then((documents) => {
      // Reassign restructured received data from db to match Plate's Model in front-end
      documents = documents.map((el) => {
        return {
          id: el._id,
          plateNr: el.plateNr,
          name: el.name,
          surname: el.surname,
        }
      });
      // Response with code 200 and converted data as JSON
      res.status(200).json(documents);
    })
    .catch((error) => {
      console.error('Failed to retrieve Plates from database', error)
    });
});

// Get a plate document by its id
router.get('/:id', (req, res) => {
  // Find Plate document by id from database
  Plate.findById(req.params.id)
    // If find operation successful then:
    .then((doc) => {
      // And plate doc found on database then
      if (doc) {
        // Response with code 201 and,
        // restructured found plate doc for front-end Plate Model,
        // as JSON
        res.status(200).json({
          id: doc._id,
          plateNr: doc.plateNr,
          name: doc.name,
          surname: doc.surname
        });
      } else {
        // Else 404
        res.status(404).json({ message: 'Plate document not found on database.' });
      }
    })
    .catch((error) => {
      console.error('Failed to retrieve Plate by id from database', error)
    });
});

// Create new plate record, save and return it
router.post('/', (req, res) => {
  // Create an instance of a Plate model a MongoDB document with passed values from request body data
  const plate = new Plate({
    plateNr: req.body.plateNr,
    name: req.body.name,
    surname: req.body.surname
  });
  // Save new plate data into database
  plate.save()
    // If save operation successful then:
    .then(() => {
      // Response with code 201 and,
      // restructured persisted data for front-end Plate Model,
      // as JSON
      res.status(201).json({
        id: plate._id,
        plateNr: plate.plateNr,
        name: plate.name,
        surname: plate.surname,
      });
    })
    .catch((error) => {
      console.error('Failed to save Plate into database', error)
    });
});

// Update plate record by given id and return it or throw record not found error
router.put('/:id', (req, res) => {
  // Destructure path id
  const { id } = req.params;

  // Create an updated instance of a Plate model a MongoDB document with passed values from request body data
  const newPlate = new Plate({
    _id: id,
    plateNr: req.body.plateNr,
    name: req.body.name,
    surname: req.body.surname
  });

  // Update document in database where id from path === _id in plates collection
  Plate.updateOne({ _id: id }, newPlate)
    // If updateOne operation successful then:
    .then(() => {
      // Response with code 200 and,
      // restructured updated data for front-end Plate Model,
      // as JSON
      res.status(200).json({
        id: newPlate._id,
        plateNr: newPlate.plateNr,
        name: newPlate.name,
        surname: newPlate.surname,
      });
    })
    .catch((error) => {
      console.error('Failed to update Plate in database', error)
    });
});

// Delete plate document by given id and return it or throw record not found error
router.delete('/:id', (req, res) => {
  // Destructure path id
  const { id } = req.params;

  // Delete document from database where id from path === _id in plates collection
  Plate.deleteOne({ _id: id })
    // If deleteOne operation successful then:
    .then(() => {
      // Response with code 200 and delete data id as JSON
      res.status(200).json({ "deleted": id });
    })
    .catch((error) => {
      console.error('Failed to delete Plate from database', error)
    });
});

module.exports = router;
