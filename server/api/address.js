const router = require('express').Router();
const { Cart, Product, ProductCart, Address } = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  Address.findAll()
    .then(addresses => {
      res.json(addresses);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Address.findById(req.params.id)
    .then(result => {
      res.json(result);
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  const newAddress = req.body;
  Address.create(newAddress)
    .then(createdAddress => {
      res.status(201).json(createdAddress);
    })
    .catch(next);
});
