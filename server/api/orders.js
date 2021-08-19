const router = require("express").Router();
const {
  models: { Order, OrderItem, Product },
} = require("../db");
const User = require("../db/models/User");

module.exports = router;

// shows all processed orders
router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        inProgress: false,
      },
    });
    res.json(orders);
    console.log(orders);
  } catch (err) {
    next(err);
  }
});

//create a cart
router.post("/", async (req, res) => {
  res.status(201).send(await Order.create(req.body));
});


//all orders for a spec user
router.get("/:id", async (req, res, next) => {
  try {
    const orders = await Order.findOne({
      where: {
        inProgress: false,
        userId: req.params.id,
      },
      include: { model: OrderItem, include: { model: Product } },
    });
    res.json(orders);
    console.log(orders);
  } catch (err) {
    next(err);
  }
});

//all carts
router.get("/carts", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        inProgress: true,
      },
    });
    res.json(orders);
    console.log(orders);
  } catch (err) {
    next(err);
  }
});


//cart for a spec user
router.get("/carts/:id", async (req, res, next) => {
  try {
    const orders = await Order.findOne({
      where: {
        inProgress: true,
        userId: req.params.id,
      },
      include: { model: OrderItem, include: { model: Product } },
    });

    res.send(orders);
  } catch (err) {
    next(err);
  }
});


//specific cart item
router.get("/carts/cart/:item");

