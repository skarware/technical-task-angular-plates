const express = require('express');
const router = express.Router();

// Temporary mock up data
const PLATES = [
  {
    id: 0,
    name: 'Justine',
    surname: 'Snyder',
    plateNr: 'AAA 000'
  },
  {
    id: 1,
    name: 'Leona',
    surname: 'Miller',
    plateNr: 'BBB 111'
  },
  {
    id: 2,
    name: 'Angel',
    surname: 'Reyes',
    plateNr: 'CCC 222'
  }
];

// Get all plate records
router.get('/', (req, res) => {

  res.status(200).json(PLATES);
});

// Create new plate record, save and return it
router.post('/', (req, res) => {

  // Assign received body data
  const plate = req.body;

  // push it to mock up array
  PLATES.push(plate);

  console.log(plate);  /////// FOR DEVELOPING PURPOSES ///////

  res.status(201).json(req.body);
});

// Update plate record by given id and return it or throw record not found error
router.put('/:id', (req, res) => {
  const { id } = req.params;

  res.status(200).json({
    "req.body": req.body,
    "id": id
  });
});

// Delete plate record by given id and return it or throw record not found error
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  res.status(200).json({ "deleted": id });
});

module.exports = router;
