const { Shoe, Color, Quantity, Shoecolor } = require('./index.js');

Shoecolor.drop()
  .then(() => {
    Quantity.drop();
  })
  .then(() => {
    Color.drop();
  })
  .then(() => {
    Shoe.drop();
  })
  .catch((error) => {
    console.error(error);
  });
