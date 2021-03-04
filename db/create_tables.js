const { Shoe, Color, Quantity, Shoecolor } = require('./index.js');

async function synchronizeModels() {
  try {
    await Shoe.sync();
    await Color.sync();
    await Quantity.sync();
    await Shoecolor.sync();
    console.log('Successfully created: shoes, colors, quantities, and shoecolors tables');
  } catch (error) {
    console.error(error);
  }
}

synchronizeModels();
