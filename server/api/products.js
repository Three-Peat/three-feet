const router = require('express').Router();
const { Product, Review } = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  Product.findAll()
    .then(products => res.json(products))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Product.create(req.body)
    .then(products => res.json(products))
    .catch(next);
});

router.get('/:productId', (req, res, next) => {
  Product.findById(req.params.productId, {
    include: {
      model: Review,
    },
  })
    .then(product => res.json(product))
    .catch(next);
});
