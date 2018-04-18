/* global describe beforeEach it */

const { expect } = require('chai');
const db = require('../../index');
const Address = db.model('address');

describe('Address model', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  let address;
  beforeEach(() => {
    return Address.create({
      name: `Joe Smith`,
      street: `123 Main St`,
      city: `Chicago`,
      state: `IL`,
      zip: `60202`,
    }).then(entry => {
      address = entry;
    });
  });

  it('includes `name`, `street`, `city`, `state`, `zip`, `userId`', function() {
    return address.save().then(function(savedAddress) {
      expect(Object.keys(savedAddress.dataValues)).to.eql([
        'id',
        'name',
        'street',
        'city',
        'state',
        'zip',
        'updatedAt',
        'createdAt',
        'userId',
      ]);
      expect(savedAddress.name).to.equal(`Joe Smith`);
      expect(savedAddress.street).to.equal(`123 Main St`);
      expect(savedAddress.city).to.equal(`Chicago`);
      expect(savedAddress.state).to.equal(`IL`);
      expect(savedAddress.zip).to.equal(60202);
      expect(savedAddress.userId).to.equal(null);
    });
  });
});
