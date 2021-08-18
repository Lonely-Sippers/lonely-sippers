const router = require("express").Router();
const {
  models: { Order, OrderItem },
} = require("../db");

module.exports = router;

router.get("/:id", async (req, res) => {
  const Item = await OrderItem.findByPk(req.params.id);
  res.json(Item);
});

router.delete("/:id", async (req, res) => {
  const Item = await OrderItem.findByPk(req.params.id);
  await Item.destroy();
  res.sendStatus(204);
});

router.post("/", async (req, res) => {
  res.status(201).send(await OrderItem.create(req.body));
});
