const Promise = require('bluebird');
const db = require('./server/db');

const faker = require('faker');

const data = {
  address: [],
  category: [],
  order: [],
  orderItem: [],
  product: [],
  productCategory: [],
  review: [],
  user: [],
  cart: [],
};

for (let i = 0; i < 10; i++) {
  const address = {
    name: faker.name.findName(),
    street: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    zip: faker.address.zipCode(),
  };
  data.address.push(address);
}

for (let i = 0; i < 10; i++) {
  const orderItem = {
    price: faker.random.number({ min: 99, max: 50000 }),
    productId: faker.random.number({ min: 1, max: 10 }),
    orderId: faker.random.number({ min: 1, max: 5 }),
  };
  data.orderItem.push(orderItem);
}

for (let i = 0; i < 10; i++) {
  const order = {
    userId: faker.random.number({ min: 1, max: 7 }),
    addressId: faker.random.number({ min: 1, max: 10 }),
  };
  data.order.push(order);
}



for (let i = 0; i < 40; i++) {
  const product = {
    name: `${faker.commerce.productAdjective()} ${faker.commerce.productMaterial()} Shoe`,
    description: faker.company.bs(),
    price: faker.random.number({ min: 99, max: 50000 }),
    inventory: faker.random.number({ min: 0, max: 50 }),
    brand: faker.company.companyName(),
    size: faker.random.number({ min: 6, max: 15 }),
    color: faker.commerce.color(),
    photoUrl: i % 2 === 0
    ? `https://image.flaticon.com/icons/svg/360/${360178 + i}.svg`
    : `https://image.flaticon.com/icons/svg/358/${358408 + i}.svg`,
  };
  data.product.push(product);
}

for (let i = 0; i < 10; i++) {
  const category = {
    name: faker.commerce.productMaterial(),
    description: faker.company.bs(),
  };
  data.category.push(category);
}

const checker = [];
for (let i = 0; i < 80; i++) {
  const productCategory = {
    productId: faker.random.number({ min: 1, max: 20 }),
    categoryId: faker.random.number({ min: 1, max: 10 }),
  };
  const stringId = `${productCategory.productId}${productCategory.categoryId}`;
  if (!checker.includes(stringId)) {
    data.productCategory.push(productCategory);
    checker.push(stringId);
  }
}

for (let i = 0; i < 30; i++) {
  const review = {
    rating: faker.random.number({ min: 1, max: 5 }),
    name: faker.company.catchPhraseDescriptor(),
    description: faker.lorem.paragraph(3),
    userId: faker.random.number({ min: 1, max: 10 }),
    productId: faker.random.number({ min: 1, max: 20 }),
  };
  data.review.push(review);
}

for (let i = 0; i < 10; i++) {
  const user = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
  data.user.push(user);
}

data.user.push({
  email: `admin@admin.com`,
  password: `admin`,
  isAdmin: true,
})

for (let i = 0; i < 10; i++) {
  const cart = {
    purchased: faker.random.boolean(),
    userId: i + 1,
  };
  data.cart.push(cart);
}

db.sync({ force: true }).then(function() {
  console.log('Dropped old data, now inserting data.');
  return Promise.all([
    // Promise.map(data.address, function (entry) {
    //   return db.model(`address`)
    //     .create(entry)
    // }),
    // Promise.map(data.order, function (entry) {
    //   return db.model(`order`)
    //     .create(entry)
    // }),
    // Promise.map(data.orderentry, function (entry) {
    //   return db.model(`orderentry`)
    //     .create(entry)
    // }),
    Promise.map(data.product, function(entry) {
      return db.model(`product`).create(entry);
    }),
    Promise.map(data.category, function(entry) {
      return db.model(`category`).create(entry);
    }),
    Promise.map(data.user, function(entry) {
      return db.model(`user`).create(entry);
    }),
    Promise.map(data.address, function(entry) {
      return db.model(`address`).create(entry);
    }),
  ])
    .then(() => {
      return Promise.all([
        Promise.map(data.cart, function(entry) {
          return db.model(`cart`).create(entry);
        }),
        Promise.map(data.productCategory, function(entry) {
          return db.model(`productCategory`).create(entry);
        }),
        Promise.map(data.review, function(entry) {
          return db.model(`review`).create(entry);
        }),
        Promise.map(data.order, function(entry) {
          return db.model(`order`).create(entry);
        }),
        Promise.map(data.orderItem, function(entry) {
          return db.model(`orderItem`).create(entry);
        }),
      ]);
    })
    .then(function() {
      console.log(`Finished inserting data.`);
      process.exit();
    })
    .catch(function(err) {
      console.error('Error', err, err.stack);
    });
});
