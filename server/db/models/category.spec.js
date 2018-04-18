import { SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER } from 'constants';

/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../index')
const Category = db.model('category')

describe('Category model', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  let category;
  beforeEach(() => {
    return Category.create({
      name: `cool shoes`,
      description: `shoes that are cool`,
    })
      .then(entry => {
        category = entry
      })
  })

  it('includes `name` and `description`', function () {

      return category.save()
        .then(function (savedCategory) {
          expect(Object.keys(savedCategory.dataValues)).to.eql(['id', 'name', 'description', 'updatedAt', 'createdAt']);
          expect(savedCategory.name).to.equal(`cool shoes`);
          expect(savedCategory.description).to.equal(`shoes that are cool`);
        });

    });

})
