const fs = require('fs');

const gender = ['Men\'s', 'Women\'s', 'Gender Neutral', 'Child\'s', 'Girl\'s', 'Boy\'s', 'Toddler\'s', 'Toddler Girl\'s', 'Toddler Boy\'s', 'Baby\'s', 'Baby Girl\'s', 'Baby Boy\'s', 'Infant\'s', 'Infant Girl\'s', 'Infant Boy\'s', 'Teen\'s', 'Teen Girl\'s', 'Teen Boy\'s', 'Senior\'s', 'Junior\'s'];
const material = ['Wool', 'Cotton', 'Polyester', 'Nylon', 'Leather', 'Silk', 'Rubber', 'Fiber', 'Synthetic', 'Polyurethane', 'Artificial', 'Adhesive', 'Felt', 'Kevlar', 'Cowhide', 'Velvet', 'Microfiber', 'Nanotech', 'Invisible', 'Indestructible'];
const action = ['Runners', 'Skippers', 'Sprinters', 'Joggers', 'Walkers', 'Trotters', 'Climbers', 'Dashers', 'Pipers', 'Loungers', 'Marathoners', 'Hurdlers', 'Trackers', 'Racers', 'Bikers', 'Slippers', 'Sneakers', 'Tennis Shoes', 'Footgear', 'Moccasins'];

const shoeData = async () => {
  const writeModel = fs.createWriteStream('db/shoes.csv');
  let model = 1;
  writeModel.write('name,model\n', 'utf8');
  for (let i = 0; i < 1250; i += 1) {
    for (let j = 0; j < gender.length; j += 1) {
      for (let k = 0; k < material.length; k += 1) {
        for (let l = 0; l < action.length; l += 1) {
          const name = `${gender[j]} ${material[k]} ${action[l]}`;
          const data = `${name}, ${model}\n`;
          if (!writeModel.write(data)) {
            await new Promise((resolve) => writeModel.once('drain', resolve));
          }
          model += 1;
        }
      }
    }
  }
};

const classicColorData = [
  {
    name: 'Blue Whale',
    shoe_color: 'Dodger Blue',
    sole_color: 'Light Cyan',
    shoe_hex: '#1E90FF',
    sole_hex: '#E0FFFF',
    limited: false,
  },
  {
    name: 'Red Sky',
    shoe_color: 'Orange Red',
    sole_color: 'Light Sky Blue',
    shoe_hex: '#FF4500',
    sole_hex: '#87CEFA',
    limited: false,
  },
  {
    name: 'Green Lake',
    shoe_color: 'Dark Sea Green',
    sole_color: 'Sea Green',
    shoe_hex: '#8FBC8F',
    sole_hex: '#2E8B57',
    limited: false,
  },
  {
    name: 'Cosmos',
    shoe_color: 'Dark Slate Blue',
    sole_color: 'Indigo',
    shoe_hex: '#483D8B',
    sole_hex: '#4B0082',
    limited: false,
  },
  {
    name: 'Pink Plunge',
    shoe_color: 'Hot Pink',
    sole_color: 'Deep Pink',
    shoe_hex: '#FF69B4',
    sole_hex: '#FF1493',
    limited: false,
  },
];

const limitedColorData = [
  {
    name: 'Blue Lagoon',
    shoe_color: 'Medium Blue',
    sole_color: 'Light Sky Blue',
    shoe_hex: '#0000CD',
    sole_hex: '#87CEFA',
    limited: true,
  },
  {
    name: 'Aurora Borealis',
    shoe_color: 'Chartreuse',
    sole_color: 'Lime',
    shoe_hex: '#7FFF00',
    sole_hex: '#00FF00',
    limited: true,
  },
  {
    name: 'Pale Wood',
    shoe_color: 'Moccasin',
    sole_color: 'Papaya Whip',
    shoe_hex: '#FFE4B5',
    sole_hex: '#FFEFD5',
    limited: true,
  },
  {
    name: 'Azure Canyon',
    shoe_color: 'Dark Cyan',
    sole_color: 'Pale Goldenrod',
    shoe_hex: '#008B8B',
    sole_hex: '#EEE8AA',
    limited: true,
  },
  {
    name: 'Burning Desire',
    shoe_color: 'Crimson',
    sole_color: 'Red',
    shoe_hex: '#DC143C',
    sole_hex: '#FF0000',
    limited: true,
  },
  {
    name: 'Sunset',
    shoe_color: 'Coral',
    sole_color: 'Orange Red',
    shoe_hex: '#FF7F50',
    sole_hex: '#FF4500',
    limited: true,
  },
  {
    name: 'New Moon',
    shoe_color: 'Dark Slate Gray',
    sole_color: 'Black',
    shoe_hex: '#2F4F4F',
    sole_hex: '#000000',
    limited: true,
  },
  {
    name: 'Harvest Moon',
    shoe_color: 'Orange',
    sole_color: 'Dark Orange',
    shoe_hex: '#FFA500',
    sole_hex: '#FF8C00',
    limited: true,
  },
  {
    name: 'Sea Breeze',
    shoe_color: 'Pale Turquoise',
    sole_color: 'Light Cyan',
    shoe_hex: '#AFEEEE',
    sole_hex: '#E0FFFF',
    limited: true,
  },
  {
    name: 'Galaxy',
    shoe_color: 'Gainsboro',
    sole_color: 'Dark Gray',
    shoe_hex: '#DCDCDC',
    sole_hex: '#A9A9A9',
    limited: true,
  },
];

const colorBulkData = [...classicColorData, ...limitedColorData];
const colorSeed = async () => {
  const colorModel = fs.createWriteStream('db/colors.csv');
  colorModel.write('name,shoe_color,sole_color,shoe_hex,sole_hex,limited\n', 'utf8');
  for (let i = 0; i < colorBulkData.length; i += 1) {
    const data = `${colorBulkData[i].name},${colorBulkData[i].shoe_color},${colorBulkData[i].sole_color},${colorBulkData[i].shoe_hex},${colorBulkData[i].sole_hex},${colorBulkData[i].limited}\n`;
    if (!colorModel.write(data)) {
      await new Promise((resolve) => colorModel.once('drain', resolve));
    }
  }
};

const randomNumberGenerator = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const mensSizes = [8, 9, 10, 11, 12, 13];
const womensSizes = [5, 6, 7, 8, 9, 10];

const menQuantData = async () => {
  const quantModel = fs.createWriteStream('db/quantity.csv');
  quantModel.write('shoe_id color_id quantity\n', 'utf8');

  const shoecolorModel = fs.createWriteStream('db/shoecolors.csv');
  shoecolorModel.write('shoe_id color_id\n', 'utf8');

  for (let shoeID = 1; shoeID <= 10000000; shoeID += 2) {
    const classicCount = randomNumberGenerator(2, 5);
    const colorIndexes = [];
    for (let i = 0; i < classicCount; i += 1) {
      const choice = randomNumberGenerator(1, 5);
      if (!colorIndexes.includes(choice)) {
        colorIndexes.push(choice);
      } else {
        i -= 1;
      }
    }

    const limitedCount = randomNumberGenerator(1, 4);
    for (let i = 0; i < limitedCount; i += 1) {
      const choice = randomNumberGenerator(6, 15);
      if (!colorIndexes.includes(choice)) {
        colorIndexes.push(choice);
      } else {
        i -= 1;
      }
    }

    const shoecolorData = `${shoeID} ${colorIndexes.toString()}\n`;
    if (!shoecolorModel.write(shoecolorData)) {
      await new Promise((resolve) => shoecolorModel.once('drain', resolve));
    }

    for (let j = 0; j < colorIndexes.length; j+= 1) {
      const idQuants = [];
      mensSizes.forEach((sizeID) => {
        idQuants.push(`"size_id":${sizeID},"quantity":${randomNumberGenerator(0, 9)}`);
      });
      const quantData = `${shoeID} ${colorIndexes[j]} ${idQuants.join('-')}\n`;
      if (!quantModel.write(quantData)) {
        await new Promise((resolve) => quantModel.once('drain', resolve));
      }
    }
  }
};

const womenQuantData = async () => {
  const quantModel = fs.createWriteStream('db/quantity_women.csv');
  quantModel.write('shoe_id color_id quantity\n', 'utf8');

  const shoecolorModel = fs.createWriteStream('db/shoecolors_women.csv');
  shoecolorModel.write('shoe_id color_id\n', 'utf8');

  for (let shoeID = 2; shoeID <= 10000000; shoeID += 2) {
    const classicCount = randomNumberGenerator(2, 5);
    const colorIndexes = [];
    for (let i = 0; i < classicCount; i += 1) {
      const choice = randomNumberGenerator(1, 5);
      if (!colorIndexes.includes(choice)) {
        colorIndexes.push(choice);
      } else {
        i -= 1;
      }
    }

    const limitedCount = randomNumberGenerator(1, 4);
    for (let i = 0; i < limitedCount; i += 1) {
      const choice = randomNumberGenerator(6, 15);
      if (!colorIndexes.includes(choice)) {
        colorIndexes.push(choice);
      } else {
        i -= 1;
      }
    }
    const shoecolorData = `${shoeID} ${colorIndexes.toString()}\n`;
    if (!shoecolorModel.write(shoecolorData)) {
      await new Promise((resolve) => shoecolorModel.once('drain', resolve));
    }

    for (let j = 0; j < colorIndexes.length; j += 1) {
      const womenIdQuants = [];
      womensSizes.forEach((sizeID) => {
        womenIdQuants.push(`"size_id":${sizeID},"quantity":${randomNumberGenerator(0, 9)}`);
      });
      const quantData = `${shoeID} ${colorIndexes[j]} ${womenIdQuants.join('-')}\n`;
      if (!quantModel.write(quantData)) {
        await new Promise((resolve) => quantModel.once('drain', resolve));
      }
    }
  }
};

const seed = async () => {
  await shoeData();
  await colorSeed();
  await menQuantData();
  await womenQuantData();
};
seed();
