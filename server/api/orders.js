const router = require('express').Router();
const { Product, Review, OrderItem, Order } = require('../db/models');
const sendEmail = require('./status-emails');

module.exports = router;

router.get('/', (req, res, next) => {
  Order.findAll({
    include: {
      model: OrderItem,
    },
  })
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
  let orderedItems = req.body.cart;
  let { addressId } = req.body;

  return Order.create({
    userId,
    addressId,
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

router.put('/:orderId', (req, res, next) => {
  const id = req.params.orderId;
  const { status, email } = req.body;
  sendEmail(email, id, status);
  Order.update(
    { status },
    {
      where: {
        id,
      },
    }
  )
    .then(orders => {
      res.json(orders);
    })
    .catch(next);
});
