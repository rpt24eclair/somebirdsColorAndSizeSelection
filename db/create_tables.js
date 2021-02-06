const { Shoe, Color, Quantity, Shoecolor, Shoesize } = require('./index.js');

async function synchronizeModels() {
  try {
    await Shoe.sync();
    await Color.sync();
    //await Size.sync();
    await Quantity.sync();
    await Shoecolor.sync();
    await Shoesize.sync();
    console.log('Successfully created: shoes, colors, sizes, quantities, shoecolors, and shoesizes tables');
  } catch (error) {
    console.error(error);
  }
}

synchronizeModels();