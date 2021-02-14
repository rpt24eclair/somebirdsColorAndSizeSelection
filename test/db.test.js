const expect = require('chai').expect
const { Shoe, Color, Size, Quantity, Shoecolor, Shoesize } = require('../db/index.js');

describe('Database', () => {
  it('has a shoes table with 10 million records', () => {
    return Shoe.max('id')
    .then(shoes => {
      expect(shoes).to.be.at.least(10000000);
    })
  });

  it('has a colors table with 25 records', () => {
    return Color.findAll({})
    .then(colors => {
      expect(colors.length).to.equal(15);
    })
  });

  it('has a quantities table with around 60 million records', () => {
    return Quantity.max('id')
    .then(quantities => {
      expect(quantities).to.be.at.least(59000000);
    })
  });

  it('has a shoecolors table with 10 million records', () => {
    return Shoecolor.max('id')
    .then(shoecolors => {
      expect(shoecolors).to.be.at.least(10000000);
    })
  });
});