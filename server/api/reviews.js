const router = require('express').Router();
const Review = require('../db/models/Review');
const Product = require('../db/models/Product');
const User = require('../db/models/User');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      include: [User, Product],
    });
    res.json(reviews);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Review.create(req.body));
  } catch (err) {
    next(err);
  }
});

//find by what?
// router.put('/:id', async (req, res, next) => {
//     try {
//       const review = await Review.update()
//     } catch (err) {
//       next(err);
//     }
//   });
