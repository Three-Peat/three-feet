const router = require('express').Router();
const { Product, Review, Category } = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  Product.findAll({
    include: [Review, Category]
  })
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
    include: [Review, Category]
  })
    .then(product => res.json(product))
    .catch(next);
});

router.put('/:productId', (req, res, next) => {
  const id = req.params.productId
  Product.update(req.body, {
    where: {
      id
    }
  })
    .then(product => res.json(product))
    .catch(next);
});
