'use strict';

const faker = require('faker');

const {
  db,
  models: { User, Product, Order, OrderItem },
} = require('../server/db');

const Review = require('../server/db/models/Review');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  const userImages = [
    'https://i.imgur.com/G2sedfG.jpg',
    'https://i.imgur.com/XvLU6yG.jpg',
    'https://i.imgur.com/AOOE57T.jpg',
    'https://i.imgur.com/7O7uIS9.jpg',
    'https://i.imgur.com/5xjxkSf.jpg',
    'https://i.imgur.com/2ZA8YtO.jpg',
    'https://i.imgur.com/yGoLJ3i.jpg',
    'https://i.imgur.com/dIsB6TA.jpg',
    'https://i.imgur.com/IGUmKSZ.jpg',
    'https://i.imgur.com/Jfh6piS.jpg',
    'https://i.imgur.com/T6n0qlg.jpg',
    'https://i.imgur.com/ycoSJ4g.jpg',
    'https://i.imgur.com/X1LmIiy.jpg',
    'https://i.imgur.com/yS44Oly.jpg',
    'https://i.imgur.com/T0Kw64Q.jpg',
    'https://i.imgur.com/o1YqdjZ.jpg',
    'https://i.imgur.com/Ia7tI2k.jpg',
    'https://i.imgur.com/WmSFe93.jpg',
    'https://i.imgur.com/0crQhMu.jpg',
    'https://i.imgur.com/e8z9R12.jpg',
    'https://i.imgur.com/epWMgDg.jpg',
    'https://i.imgur.com/w4YWOeG.jpg',
    'https://i.imgur.com/YQFZA8r.jpg',
    'https://i.imgur.com/5a4qs8U.jpg',
    'https://i.imgur.com/zdHSGFq.jpg',
    'https://i.imgur.com/uKyeWK8.jpg',
    'https://i.imgur.com/a9bS5q5.jpg',
    'https://i.imgur.com/dfdJ8Iu.jpg',
    'https://i.imgur.com/burUh1S.jpg',
    'https://i.imgur.com/YFEiJO7.jpg',
    'https://i.imgur.com/kSIJ05h.jpg',
    'https://i.imgur.com/nMlQluu.jpg',
    'https://i.imgur.com/uIqClPT.jpg',
    'https://i.imgur.com/WREGKQz.jpg',
    'https://i.imgur.com/X2hYmyn.jpg',
    'https://i.imgur.com/ecNU6zA.jpg',
    'https://i.imgur.com/sA2VPs9.jpg',
    'https://i.imgur.com/bymqRUL.jpg',
    'https://i.imgur.com/WP26v97.jpg',
    'https://i.imgur.com/dsXuFf4.jpg',
    'https://i.imgur.com/4NwFZ6d.jpg',
    'https://i.imgur.com/MBICtQu.jpg',
    'https://i.imgur.com/kMQ68bf.jpg',
    'https://i.imgur.com/UcSTXZu.jpg',
    'https://i.imgur.com/W3KW1o5.jpg',
    'https://i.imgur.com/cOx4m5Z.jpg',
    'https://i.imgur.com/wvGl8dX.jpg',
    'https://i.imgur.com/cHFUr1f.jpg',
    'https://i.imgur.com/9exhJB4.jpg',
    'https://i.imgur.com/Ouv5xtZ.jpg',
  ];

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: 'cody',
      password: 'one',
      email: 'cody@email.com',
      userImage: userImages[4],
      firstName: 'cody',
      lastName: 'juan',
      address: faker.address.streetAddress(),
    }),
    User.create({
      username: 'murphy',
      password: 'two',
      email: 'murphy@email.com',
      userImage: userImages[0],
      firstName: 'murphy',
      lastName: 'dos',
      address: faker.address.streetAddress(),
    }),
    User.create({
      username: 'sara',
      password: 'three',
      email: 'sara@email.com',
      isAdmin: true,
      userImage: userImages[1],
      firstName: 'sara',
      lastName: 'thres',
      address: faker.address.streetAddress(),
    }),
  ]);
  const [sebastien, exp, prof] = await Promise.all([
    User.create({
      username: 'sebastien',
      password: 'one',
      email: 'seb@email.com',
      userImage: userImages[2],
      firstName: 'sebastien',
      lastName: 'quatro',
      address: faker.address.streetAddress(),
    }),
    User.create({
      username: 'exp',
      password: 'onex',
      email: 'xp@email.com',
      userImage: userImages[3],
      firstName: 'exp',
      lastName: 'cinco',
      address: faker.address.streetAddress(),
    }),
    User.create({
      username: 'Prof',
      password: 'one',
      email: 'prof@email.com',
      userImage: '/prof.jpeg',
      firstName: 'Prof',
      lastName: 'Proferson',
      address: faker.address.streetAddress(),
    }),
  ]);

  // console.log(sebastien.__proto__);
  // console.log(sebastien.createOrder());
  // sebastien.cartItem();

  const [cart1, order1] = await Promise.all([
    Order.create({ userId: sebastien.id }),
    Order.create({ userId: sebastien.id, inProgress: false }),
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

  let rumCounter = -1;
  const rumBottles = [
    '/rum/captain-morgan_e3be6682-ba1a-4bb5-90a3-9d206f1b9bdf_400x.png',
    '/rum/chairmens-reserve-spiced-rum_9eed19be-57d2-4ac5-9c91-9b3511a9b546_400x.png',
    '/rum/diplomatico-reserva-exclusiva-rum_400x.png',
    '/rum/malibu-rum_400x.png',
    '/rum/sailor-jerry_400x.png',
  ];

  let vodkaCounter = -1;
  const vodkaBottles = [
    '/vodka/absolut-vodka_a2a01fb8-0d45-4cb7-9e43-f864595c8b6b_400x.png',
    '/vodka/luksusowa-potato-vodka_c5e71ee3-7df1-4f70-9234-6ef63cc15e76_400x.png',
    '/vodka/new-amsterdam-vodka_5315d483-c9ca-447d-98f0-61b689352d2a_400x.png',
    '/vodka/svedka-vodka_9b3a5f35-23e7-4eaa-bf6a-9e4d15cb77f8_400x.png',
    '/vodka/titos-vodka_81e36c4a-59e3-4f28-acf9-66da70beeb2a_400x.png',
  ];

  let brandyCounter = -1;
  const brandyBottles = [
    '/brandy/ciroc-vs-french-brandy_4f8bc41d-69fc-40d4-9254-771661bca815_400x.png',
    '/brandy/hennessy-mbs4_3-2_700x.jpeg',
    '/brandy/hennessy-privilege-v-s-o-p-cognac_400x.png',
    '/brandy/hennessy-privilege-v-s-o-p-cognac-1_926c8406-b01b-4938-86ad-d16bb5d9d746_400x.png',
    '/brandy/martell-blue-swift-v-s-o-p_400x.png',
  ];

  let imageSrc = '';
  let liquorImageCounter = -1;

  // Creating Products
  const products = await Promise.all(
    new Array(200).fill('_').map((_) => {
      let liquorType = liquorTypes[Math.floor(Math.random() * 6)];

      switch (liquorType) {
        case 'Whiskey':
          if (whiskeyCounter === 6) {
            whiskeyCounter = -1;
          }
          whiskeyCounter++;
          imageSrc = whiskeyBottles[whiskeyCounter];

          break;

        case 'Tequila':
          if (tequilaCounter === 4) {
            tequilaCounter = -1;
          }
          tequilaCounter++;
          imageSrc = tequilaBottles[tequilaCounter];
          break;

        case 'Gin':
          if (ginCounter === 4) {
            ginCounter = -1;
          }
          ginCounter++;
          imageSrc = ginBottles[ginCounter];
          break;

        case 'Rum':
          if (rumCounter === 4) {
            rumCounter = -1;
          }
          rumCounter++;
          imageSrc = rumBottles[rumCounter];
          break;

        case 'Vodka':
          if (vodkaCounter === 4) {
            vodkaCounter = -1;
          }
          vodkaCounter++;
          imageSrc = vodkaBottles[vodkaCounter];
          break;

        case 'Brandy':
          if (brandyCounter === 4) {
            brandyCounter = -1;
          }
          brandyCounter++;
          imageSrc = brandyBottles[brandyCounter];
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
        description: faker.lorem.paragraphs(4),
        rating: Math.round(Math.random() * 10),
        region: faker.address.country(),
        price: Math.random() * 200 + 10,
        year: Math.round(Math.random() * 31) + 1990,
        image_URL: imageSrc,
      });
    })
  );

  //new order items
  const [item1, item2, item3] = await Promise.all([
    OrderItem.create({
      total: 1,
      orderId: cart1.id,
      productId: products[0].id,
    }),
    OrderItem.create({
      total: 1,
      orderId: cart1.id,
      productId: products[1].id,
    }),
    OrderItem.create({
      total: 1,
      orderId: cart1.id,
      productId: products[3].id,
    }),
    OrderItem.create({
      total: 1,
      orderId: order1.id,
      productId: products[4].id,
    }),
    OrderItem.create({
      total: 1,
      orderId: order1.id,
      productId: products[5].id,
    }),
    OrderItem.create({
      total: 1,
      orderId: order1.id,
      productId: products[6].id,
    }),
  ]);

  const reviews = [];

  for (let i = 0; i < users.length; i++) {
    let revs = await Promise.all(
      [...products].map((prod) => {
        return Review.create({
          userId: users[i].id,
          productId: prod.id,
          rating: Math.round(Math.random() * 10),
          writtenReview: faker.lorem.paragraphs(2),
        });
      })
    );
    reviews.push(revs);
  }

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
