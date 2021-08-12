'use strict';

const faker = require('faker');

const {
  db,
  models: { User, Product, Order, OrderItem },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: 'one', email: 'cody@email.com' }),
    User.create({
      username: 'murphy',
      password: 'two',
      email: 'murphy@email.com',
    }),
    User.create({
      username: 'sara',
      password: 'three',
      email: 'sara@email.com',
    }),
  ]);
  const [sebastien, exp] = await Promise.all([
    User.create({
      username: 'sebastien',
      password: 'one',
      email: 'seb@email.com',
    }),
    User.create({
      username: 'exp',
      password: 'onex',
      email: 'xp@email.com',
    }),
  ]);

  // console.log(sebastien.__proto__);
  // console.log(sebastien.createOrder());
  // sebastien.cartItem();

  const [order1, order2] = await Promise.all([
    Order.create({ userId: sebastien.id }),
    Order.create({ userId: exp.id }),
  ]);

  const liquorTypes = ['Brandy', 'Gin', 'Rum', 'Tequila', 'Vodka', 'Whiskey'];

  const bottleImages = [
    'https://glassbottlesmanufacturer.com/wp-content/uploads/2017/10/clear-liquor-bottles.jpg',
    'https://glassbottlesmanufacturer.com/wp-content/uploads/2017/09/round-shape-glass-bottles-for-alcohol.jpg',
    'https://glassbottlesmanufacturer.com/wp-content/uploads/2017/08/custom-glass-bottles-500ml-unique-spirit-bottle.jpg',
  ];
  let whiskeyCounter = -1;
  const whiskeyBottles = [
    '/whiskeys/crown-royal_38c513c5-85c8-427e-92a1-8c7c69b3c37f_400x.png',
    '/whiskeys/hakushu-japanese-whiskey_400x.png',
    '/whiskeys/hibiki-harmony_400x.png',
    '/whiskeys/jack-daniels-150-year-anniversary-1l_400x.png',
    '/whiskeys/jameson-irish-whiskey_0c11eb29-2209-4aa3-8993-69ef941a620c_400x.png',
    '/whiskeys/nikka-from-the-barrel_4b25ba4e-0be8-4aeb-8835-35138b4d7416_400x.png',
    '/whiskeys/southern-comfort-100-proof_816e7655-0983-4675-99df-4762cf1aee34_400x.png',
  ];

  let tequilaCounter = -1;
  const tequilaBottles = [
    '/tequila/don-julio-1942_400x.png',
    '/tequila/hornitos-plata_400x.png',
    '/tequila/patron-silver_400x.png',
    '/tequila/teremana-reposado-tequila_400x.png',
    '/tequila/tres-comas-anejo-tequila_f141b8e1-84ab-426d-abf8-0cc359c2fe6d_400x.png',
  ];

  let ginCounter = -1;
  const ginBottles = [
    '/gin/bombay-sapphire-gin_40791d33-088f-42b1-a989-0ca7981ed1d9_400x.png',
    '/gin/empress-1908-gin_6ce733c7-5774-4073-a59e-398877677561_400x.png',
    '/gin/hendricks-midsummer-solstice-gin_39386432-b64c-4339-aeac-ab09255d61a2_400x.png',
    '/gin/new-amsterdam-gin_ba7900c0-fa38-4f89-aded-a7dbd0bf0cbf_400x.png',
    '/gin/tanqueray-gin_ec0c1a53-85b4-438f-8c85-7ac275df33d4_400x.png',
  ];

  let imageSrc = '';
  let liquorImageCounter = -1;

  // Creating Products
  const products = await Promise.all(
    new Array(200).fill('_').map((_) => {
      let liquorType = liquorTypes[Math.floor(Math.random() * 6)];

      switch (liquorType) {
        case 'Whiskey':
          if (whiskeyCounter === 5) {
            whiskeyCounter = -1;
          }
          whiskeyCounter++;
          imageSrc = whiskeyBottles[whiskeyCounter];

          break;

        case 'Tequila':
          if (tequilaCounter === 7) {
            tequilaCounter = -1;
          }
          tequilaCounter++;
          imageSrc = tequilaBottles[whiskeyCounter];
          break;

        case 'Gin':
          if (ginCounter === 7) {
            ginCounter = -1;
          }
          ginCounter++;
          imageSrc = ginBottles[whiskeyCounter];
          break;

        default:
          if (liquorImageCounter === 3) {
            liquorImageCounter = -1;
          }
          liquorImageCounter++;
          imageSrc = bottleImages[liquorImageCounter];
          break;
      }

      return Product.create({
        category: faker.commerce.productName(),
        alcohol_type: liquorType,
        alcohol_percentage: Math.round(Math.random() * 60 + 36),
        description: faker.lorem.paragraph(),
        rating: Math.round(Math.random() * 10),
        region: faker.address.country(),
        //random price between 10 and 210 dollars, rounded to two decimals for the cents
        price: Math.random() * 200 + 10,
        year: Math.round(Math.random() * 31) + 1990,
        image_URL: imageSrc,
      });
    })
  );

  //new order items
  const [cart1, cart2] = await Promise.all([
    OrderItem.create({
      total: 0,
      orderId: order1.id,
      productId: products[0].id,
    }),
    OrderItem.create({
      total: 0,
      orderId: order2.id,
      productId: products[1].id,
    }),
    OrderItem.create({
      total: 0,
      orderId: order1.id,
      productId: products[3].id,
    }),
    OrderItem.create({
      total: 0,
      orderId: order1.id,
      productId: products[4].id,
    }),
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
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
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
