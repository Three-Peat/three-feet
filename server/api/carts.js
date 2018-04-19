const router = require('express').Router();
const { Cart } = require('../db/models');
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

router.post('/', (req, res, next) => {
  const userId = req.user.id;
  Cart.create({
    where: {
      userId,
    },
  })
    .then(cart => res.json(cart))
    .catch(next);
});
