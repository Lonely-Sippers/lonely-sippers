const router = require('express').Router();
const {
  models: { Product, Cart },
  models,
} = require('../db');
const Review = require('../db/models/Review');
const User = require('../db/models/User');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Review, include: { model: User } }],
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const products = await Product.findOne({
      where: { id: req.params.id * 1 },
      include: [{ model: Review, include: { model: User } }],
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});
