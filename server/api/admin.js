const router = require("express").Router();
const {
  models: { User, Product, Order, OrderItem },
} = require("../db");
module.exports = router;

router.get("/users", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: [
        "id",
        "username",
        "email",
        "isAdmin",
        "firstName",
        "lastName",
      ],
    });
    res.json(users);
    console.log(users);
  } catch (err) {
    next(err);
  }
});

router.get("/users/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId * 1);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.get("/products", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get("/products/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId * 1);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

router.get("/orders", async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    next(err);
  }
});
