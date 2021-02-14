const expect = require('chai').expect
const shoes = require('../model');
const exampleData = require('./exampleData/endpoint_responses.js');
const [shoeID, colorID] = [1, 1];

describe('API Endpoints', () => {

  it('GET request to /shoes/:shoeId/colors should return data that matches example data', async () => {
    return shoes.get.colors(shoeID)
    .then(colorData => {
      expect(JSON.stringify(colorData)).to.equal(JSON.stringify(exampleData.colors));
    })
  });

  it('GET request to /shoes/:shoeId/sizes should return data that matches example data', () => {
    let sizeData = shoes.get.sizes(shoeID);
    return shoes.get.sizes(shoeID)
      expect(JSON.stringify(sizeData)).to.equal(JSON.stringify(exampleData.sizes));
  });

  describe('GET request to /shoes/:shoeId/colors/:colorId/quantities should return data with the correct shape', () => {
    it('Returns an array of objects', () => {
      return shoes.get.quantity(shoeID, colorID)
      .then(quantityData => {
        expect(Array.isArray(quantityData)).to.equal(true);
      })
    });
    it(`Objects within array should have a 'size_id' and 'quantity' properties with values of type 'number'`, () => {
      return shoes.get.quantity(shoeID, colorID)
      .then(quantityData => {
        expect(JSON.stringify(Object.keys(quantityData[0]))).to.equal(JSON.stringify(['size_id', 'quantity']));
        expect(typeof quantityData[0].size_id).to.equal('string');
        expect(typeof quantityData[0].quantity).to.equal('string');
      })
    });
  });

  describe('POST request to /shoes should create a shoe with the correct data', () => {
    it('Creates a shoe with colors and sizes', () => {
      shoes.create({
        "name": "Test Shoe",
        "model": 10000001,
        "color": [1, 2, 3],
        "quantity": `"size_id": 4,"quantity": 10-"size_id": 5,"quantity": 10- "size_id": 6,"quantity": 10`
    }).then(() => {
      return shoes.get.quantity(10000001, '2')
      .then(quantityData => {
        expect(Array.isArray(quantityData)).to.equal(true);
      })
    })

    });
  });

  describe('DELETE request to /shoes should delete a shoe with the correct data', () => {
    it('Deletes a shoe by id', () => {
      shoes.recycle(10000001)
      .then(() => {
        return shoes.get.quantity(10000001, '2')
        .then(quantityData => {
          expect(quantityData.length).to.equal(0);
        })
      })
    });
  });
});
