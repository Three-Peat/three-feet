const router = require('express').Router();
const { Cart, Product } = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  const userId = req.user.id;
  Cart.findAll({
    where: {
      userId,
    },
  })
    .then(cart => res.json(cart))
    .catch(next);
});

router.post('/:cartId', (req, res, next) => {
  Cart.create(req.body)
    .then(cart => res.json(cart))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Cart.create(req.body)
    .then(cart => res.json(cart))
    .catch(next);
});
