const router = require('express').Router();
const { Cart, User, Product } = require('../db/models');
Product.belongsToMany(Cart, { through: 'productCart' });
Cart.belongsToMany(Product, { through: 'productCart' });
const db = require('../db/db');
const ProductCart = db.model('productCart');
module.exports = router;

router.get('/', (req, res, next) => {
  // console.log(req.user)
  if (req.user) {
    const userId = req.user.id;
    Cart.findOrCreate({
      where: {
        userId,
      },
      include: [{ model: Product }],
    })
      .then(cart => {
        // console.log(cart);
        res.json(cart);
      })
      .catch(next);
  } else {
    console.log(' I am here');
    Cart.create({})
      .then(cart => res.json(cart))
      .catch(next);
  }
});

router.put('/', (req, res, next) => {
  const userId = req.user.id;
  // console.log(req.user)
  // console.log(req.body)

  ProductCart.create(req.body)
    .then(cart => res.json(cart))
    .catch(next);
});
