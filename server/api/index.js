const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/products', require('./products'));
router.use('/categories', require('./categories'));
router.use('/carts', require('./carts'));
router.use('/reviews', require('./reviews'));
router.use('/orders', require('./orders'));
router.use('/admin', require('./admin'));
router.use('/addresses', require('./address'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
