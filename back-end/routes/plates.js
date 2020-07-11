const express = require('express');
const router = express.Router();

// Import mongoose Plate model for easy data manipulation between MongoDB and Back-end part
const Plate = require('./../model/plate')

// Get all plate records
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
    .catch(() => {
      console.error('Failed to retrieve Plates from database')
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
    .catch(() => {
      console.error('Failed to save Plate into database')
    });
});

// Update plate record by given id and return it or throw record not found error
router.put('/:id', (req, res) => {
  const { id } = req.params;

  res.status(200).json({
    "req.body": req.body,
    "id": id
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
    .catch(() => {
      console.error('Failed to delete Plate from database')
    });
});

module.exports = router;
