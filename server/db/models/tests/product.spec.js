/* global describe beforeEach it */

const { expect } = require('chai');
const db = require('../../index');
const Product = db.model('product');

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  let product;
  beforeEach(() => {
    return Product.create({
      name: `running shoe`,
      description: `it's a shoe`,
      price: 99,
      inventory: 12,
      brand: `shoe brand`,
      size: 10,
      color: `blue`,
      photoUrl: `http://icons.iconarchive.com/icons/iconsmind/outline/256/Running-Shoes-icon.png`,
    }).then(entry => {
      product = entry;
    });
  });

  it('includes `name`, `description`, `price`, `inventory`, `brand`, `size`, `color`, and `photoUrl` fields', function() {
    return product.save().then(function(savedProduct) {
      expect(Object.keys(savedProduct.dataValues)).to.eql([
        'id',
        'name',
        'description',
        'price',
        'inventory',
        'brand',
        'size',
        'color',
        'photoUrl',
        'updatedAt',
        'createdAt',
      ]);
      expect(savedProduct.name).to.equal(`running shoe`);
      expect(savedProduct.description).to.equal(`it's a shoe`);
      expect(savedProduct.price).to.equal(99);
      expect(savedProduct.inventory).to.equal(12);
      expect(savedProduct.brand).to.equal(`shoe brand`);
      expect(savedProduct.size).to.equal(10);
      expect(savedProduct.color).to.equal(`blue`);
      expect(savedProduct.photoUrl).to.equal(
        `http://icons.iconarchive.com/icons/iconsmind/outline/256/Running-Shoes-icon.png`
      );
    });
  });
});
