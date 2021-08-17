// const Review = require('../server/db/models/Review');
// const faker = require('faker');

// const reviewSeed = async (products, users) => {
//   const reviews = [];
//   for (let i = 0; i < users.length; i++) {
//     let revs = await Promise.all(
//       [...products].map((prod) => {
//         return Review.create({
//           userId: users[i].id,
//           productId: prod.id,
//           rating: Math.round(Math.random() * 10),
//           writtenReview: faker.lorem.paragraphs(2),
//         });
//       })
//     );
//     reviews.push(revs);
//   }
//   return reviews;
// };

// module.exports = reviewSeed;
