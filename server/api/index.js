const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));

router.use('/products', require('./products'));

router.use('/orders', require('./orders'));

router.use('/signup', require('../auth/index'));

router.use('/admin', require('./admin'));
router.use('/items', require('./items'));
router.use('/reviews', require('./reviews'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
