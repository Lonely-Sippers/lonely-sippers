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

router.post('/', async (req, res, next) => {
  try {
    const newProd = await Product.create(req.body);
    res.json(newProd);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  await product.destroy();
  res.send(product);
});

router.put('/:id', async (req, res, next) => {
  try {
    const change = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    // const updatedProduct = await Product.findOne({
    //   where: {
    //     id: req.params.productId,
    //   },
    // });
    res.json(change);
  } catch (err) {
    next(err);
  }
});
