const router = require("express").Router();
const {
  models: { Order },
} = require("../db");
module.exports = router;

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
    const orders = await Order.findAll({
      where: {
        inProgress: true,
        userId: req.params.id,
      },
    });
    res.json(orders);
    console.log(orders);
  } catch (err) {
    next(err);
  }
});
