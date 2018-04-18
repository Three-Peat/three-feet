const Promise = require('bluebird');
const db = require('./server/db');

const faker = require('faker')

const data = {
  // address: [],
  category: [],
  // order: [],
  // orderItem: [],
  product: [],
  productCategory: [],
  // review: [],
  // user: [],
}

// for (let i = 0; i < 10; i++) {
//   const address = {
//     name: faker.name.findName(),
//     street: faker.name.streetAddress(),
//     city: faker.address.city(),
//     state: faker.address.state(),
//     zip: faker.address.zipCode(),
//   }
//   data.address.push(address)
// }

// for (let i = 0; i < 10; i++) {
//   const orderItem = {
//     price: faker.commerce.price(),
//   }
//   data.orderItem.push(orderItem)
// }

for (let i = 0; i < 10; i++) {
  const product = {
    name: faker.commerce.productName(),
    description: faker.company.bs(),
    price: faker.random.number({min: 99, max: 50000}),
    inventory: faker.random.number({min: 0, max: 50}),
    brand: faker.company.companyName(),
    size: faker.random.number({min: 6, max: 15}),
    color: faker.commerce.color(),
    photoUrl: `http://icons.iconarchive.com/icons/iconsmind/outline/256/Running-Shoes-icon.png`
  }
  data.product.push(product)
}


for (let i = 0; i < 10; i++) {
  const category = {
    name: faker.commerce.productMaterial(),
    description: faker.company.bs(),
    productId: faker.random.number({min:1, max: 10})
  }
  data.category.push(category)
}

for (let i = 0; i < 30; i++) {
  const productCategory = {
    productId: faker.random.number({min: 1, max: 10}),
    categoryId: faker.random.number({min: 1, max: 10}),
  }
  data.productCategory.push(productCategory)
}

// for (let i = 0; i < 10; i++) {
//   const review = {
//   }
//   data.review.push(review)
// }

// for (let i = 0; i < 10; i++) {
//   const user = {
//   }
//   data.user.push(user)
// }

db.sync({ force: true })
  .then(function () {
    console.log("Dropped old data, now inserting data.");
    return Promise.all([
      // Promise.map(data[`address`], function (entry) {
      //   return db.model(`address`)
      //     .create(entry)
      // }),
      // Promise.map(data[`order`], function (entry) {
      //   return db.model(`order`)
      //     .create(entry)
      // }),
      // Promise.map(data[`orderentry`], function (entry) {
      //   return db.model(`orderentry`)
      //     .create(entry)
      // }),
      Promise.map(data[`product`], function (entry) {
        return db.model(`product`)
          .create(entry)
      }),
      Promise.map(data[`category`], function (entry) {
        return db.model(`category`)
          .create(entry)
      }),
      Promise.map(data[`productCategory`], function (entry) {
        return db.model(`productCategory`)
          .create(entry)
      }),
      // Promise.map(data[`review`], function (entry) {
      //   return db.model(`review`)
      //     .create(entry)
      // }),
      // Promise.map(data[`user`], function (entry) {
      //   return db.model(`user`)
      //     .create(entry)
      // })
    ])
      .then(function () {
        console.log(`Finished inserting data.`)
        process.exit();
      })
      .catch(function (err) {
        console.error('Error', err, err.stack);
      });
  })
