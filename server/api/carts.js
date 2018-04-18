const router = require('express').Router();
const { Cart, Product } = require('../db/models');
module.exports = router;

router.get('/:cartId', (req, res, next) => {
  const id = req.params.cartId;
  Cart.findById(id, {
    include: [Product],
  })
    .then(cart => res.json(cart))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Cart.create(req.body)
    .then(cart => res.json(cart))
    .catch(next);
});
