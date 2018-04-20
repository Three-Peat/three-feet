const router = require('express').Router();
const { Product, Review, OrderItem, Order } = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  Order.findAll()
    .then(orders => res.json(orders))
    .catch(next);
});

router.get('/:orderId', (req, res, next) => {
  Order.findById(req.params.orderId, {
    include: {
      model: OrderItem,
    },
  })
    .then(order => res.json(order))
    .catch(next);
});

router.post('/', (req, res, next) => {
  const orderedItems = req.body;
  Order.create()
    .then(order => {
      OrderItem.bulkCreate(orderedItems, {
        orderId: order.id,
      });
    })
    .then(orders => {
      console.log(orders);
      res.json(orders);
    });
});
