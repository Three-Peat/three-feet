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
  const userId = req.session.passport.user;
  let orderedItems = req.body;
  return Order.create({
    userId: userId,
  })
    .then(order => {
      const orderId = order.dataValues.id;
      orderedItems = orderedItems.map(item => {
        return {
          productId: item.id,
          price: item.price,
          quantity: item.productCart.quantity,
        };
      });
      orderedItems = orderedItems.map(item => {
        item.orderId = orderId;
        return item;
      });
      return OrderItem.bulkCreate(orderedItems, { individualHooks: true });
    })
    .then(orders => {
      res.json(orders);
    })
    .catch(next);
});
