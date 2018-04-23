const router = require('express').Router();
const { Cart, Product, ProductCart } = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  if (req.user) {
    const userId = req.user.id;
    Cart.findOrCreate({
      where: {
        userId,
      },
      include: [{ model: Product }],
    })
      .then(cart => {
        res.json(cart);
      })
      .catch(next);
  } else {
    try {
      res.json(req.session.cart);
    } catch (err) {
      console.log(err);
    }
  }
});

router.put('/', (req, res, next) => {
  if (req.user) {
    ProductCart.upsert(req.body).then(
      ProductCart.find({
        where: {
          productId: req.body.productId,
          cartId: req.body.cartId,
        },
      })
        .then(cart => {
          if (cart !== null) cart.increment('quantity');
        })
        .then(cart => res.json(cart))
        .catch(next),
    );
  } else {
    try {
      const productId = req.body.id;
      if (!req.session.cart[productId]) {
        req.session.cart[productId] = req.body;
        req.session.cart[productId].quantity = 1;
        res.json(req.session.cart);
      } else {
        req.session.cart[productId].quantity++;
        res.json(req.session.cart);
      }
    } catch (err) {
      console.log(err);
    }
  }
});

router.put('/update', (req, res, next) => {
  if (req.user) {
    ProductCart.find({
      where: {
        productId: req.body.productCart.productId,
        cartId: req.body.productCart.cartId,
      },
    })
      .then(cart => {
        const curCart = cart.dataValues.quantity
        const nextCart = req.body.productCart.quantity
        if (curCart < nextCart) cart.increment('quantity')
        else cart.decrement('quantity')
      })
      .then(cart => res.json(cart))
      .catch(next);
  } else {
    try {
      const productId = req.body.id;
      let curQuant = req.session.cart[productId].quantity;
      const nextQuant = req.body.quantity;
      if (curQuant < nextQuant) {
        req.session.cart[productId].quantity++;
      } else {
        req.session.cart[productId].quantity--;
      }
      res.json(req.session.cart);
    } catch (err) {
      console.log(err);
    }
  }
});

router.put('/delete', (req, res, next) => {
  if (req.user) {
    ProductCart.destroy({
      where: {
        productId: req.body.productId,
        cartId: req.body.cartId,
      },
    })
      .then(cart => res.json(cart))
      .catch(next);
  } else {
    try {
      const productId = req.body.id;
      delete req.session.cart[productId];
      res.json(req.session.cart);
    } catch (err) {
      console.log(err);
    }
  }
});
