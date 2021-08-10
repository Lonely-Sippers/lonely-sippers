"use strict";

const faker = require("faker");

const {
  db,
  models: { User, Product, Order },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "cody", password: "one", email: "cody@email.com" }),
    User.create({
      username: "murphy",
      password: "two",
      email: "murphy@email.com",
    }),
    User.create({
      username: "sara",
      password: "three",
      email: "sara@email.com",
    }),
  ]);

  const liquorTypes = ["Brandy", "Gin", "Rum", "Tequila", "Vodka", "Whiskey"];
  const bottleImages = [
    "https://glassbottlesmanufacturer.com/wp-content/uploads/2017/10/clear-liquor-bottles.jpg",
    "https://glassbottlesmanufacturer.com/wp-content/uploads/2017/09/round-shape-glass-bottles-for-alcohol.jpg",
    "https://glassbottlesmanufacturer.com/wp-content/uploads/2017/08/custom-glass-bottles-500ml-unique-spirit-bottle.jpg",
  ];

  let liquorImageCounter = -1;
  // Creating Products
  const products = await Promise.all(
    new Array(200).fill("_").map((_) => {
      if (liquorImageCounter === 3) {
        liquorImageCounter = -1;
      }
      liquorImageCounter++;
      return Product.create({
        category: faker.commerce.productName(),
        alcohol_type: liquorTypes[Math.floor(Math.random() * 6)],
        alcohol_percentage: Math.round(Math.random() * 60 + 36),
        region: faker.address.country(),
        //random price between 10 and 210 dollars, rounded to two decimals for the cents
        price: Math.random() * 200 + 10,
        year: Math.round(Math.random() * 31) + 1990,
        image_URL: bottleImages[liquorImageCounter],
      });
    })
  );

  const orders = await Promise.all([
    Order.create({ inProgress: true, itemsTotal: 2, priceTotal: 0 }),
    Order.create({ inProgress: true, itemsTotal: 1, priceTotal: 0 }),
    Order.create({ inProgress: true, itemsTotal: 4, priceTotal: 0 }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
      sara: users[2],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
