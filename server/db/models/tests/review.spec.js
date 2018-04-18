/* global describe beforeEach it */

const { expect } = require('chai');
const db = require('../../index');
const Review = db.model('review');

describe('Review model', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  let review;
  beforeEach(() => {
    return Review.create({
      name: `not great`,
      description: `honestly these shoes are not great`,
      rating: 4,
    }).then(entry => {
      review = entry;
    });
  });

  it('includes `name`, `description`, `rating`, and `productId`', function() {
    return review.save().then(function(savedReview) {
      expect(Object.keys(savedReview.dataValues)).to.eql([
        'id',
        'name',
        'description',
        'rating',
        'updatedAt',
        'createdAt',
        `userId`,
        'productId',
      ]);
      expect(savedReview.name).to.equal(`not great`);
      expect(savedReview.description).to.equal(
        `honestly these shoes are not great`
      );
      expect(savedReview.rating).to.equal(4);
    });
  });
});
