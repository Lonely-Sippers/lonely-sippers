const router = require('express').Router();

const {
  models: { Order, OrderItem },
} = require('../db');

module.exports = router;

router.get('/:id', async (req, res) => {
  const Item = await OrderItem.findByPk(req.params.id);
  res.json(Item);
});

router.get('/item/:id', async (req, res) => {
  const item = await OrderItem.findAll({
    where: {
      orderId: req.params.id,
    },
  });
});

router.delete('/:id', async (req, res) => {
  const Item = await OrderItem.findByPk(req.params.id);
  await Item.destroy();
  res.sendStatus(204);
});

router.post('/', async (req, res) => {
  res.status(201).send(await OrderItem.create(req.body));
});

//Brian's routes

router.put('/:id', async (req, res, next) => {
  try {
    const item = await OrderItem.findByPk(req.params.id);
    const total = item.total + req.body.total * 1;

    res.send(await item.update({ total }));
  } catch (error) {
    next(error);
  }
});
