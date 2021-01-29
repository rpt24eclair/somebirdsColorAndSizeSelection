const { Shoe, Color, Size, Quantity, Shoecolor, Shoesize } = require('./index.js');

const gender = ['Men\'s', 'Women\'s', 'Gender Neutral', 'Child\'s', 'Girl\'s', 'Boy\'s', 'Toddler\'s', 'Toddler Girl\'s', 'Toddler Boy\'s', 'Baby\'s', 'Baby Girl\'s', 'Baby Boy\'s', 'Infant\'s', 'Infant Girl\'s', 'Infant Boy\'s', 'Teen\'s', 'Teen Girl\'s', 'Teen Boy\'s', 'Senior\'s', 'Junior\'s'];
const material = ['Wool', 'Cotton', 'Polyester', 'Nylon', 'Leather', 'Silk', 'Rubber', 'Fiber', 'Synthetic', 'Polyurethane', 'Artificial', 'Adhesive', 'Felt', 'Kevlar', 'Cowhide', 'Velvet', 'Microfiber', 'Nanotech', 'Invisible', 'Indestructible'];
const action = ['Runners', 'Skippers', 'Sprinters', 'Joggers', 'Walkers', 'Trotters', 'Climbers', 'Dashers', 'Pipers', 'Loungers', 'Marathoners', 'Hurdlers', 'Trackers', 'Racers', 'Bikers', 'Slippers', 'Sneakers', 'Tennis Shoes', 'Footgear', 'Moccasins'];

let model = 1;
const shoeData = async () => {
  const shoeBulkData = [];
  await gender.forEach((gender) => {
    material.forEach((material) => {
      action.forEach((action) => {
        shoeBulkData.push({ name: `${gender} ${material} ${action}`, model: model });
        model += 1;
      });
    });
  });
  await Shoe.bulkCreate(shoeBulkData);
};

async function repeat(func, times) {
  await func();
  times && --times && await repeat(func, times);
}

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
  {
    name: 'Blue Burst',
    shoe_color: 'Deep Sky Blue',
    sole_color: 'Navy',
    shoe_hex: '#00BFFF',
    sole_hex: '#000080',
    limited: false,
  },
  {
    name: 'Red Waters',
    shoe_color: 'Crimson',
    sole_color: 'Aqua',
    shoe_hex: '#DC143C',
    sole_hex: '#00FFFF',
    limited: false,
  },
  {
    name: 'White Washed',
    shoe_color: 'Alice Blue',
    sole_color: 'Ivory',
    shoe_hex: '#F0F8FF',
    sole_hex: '#FFFFF0',
    limited: false,
  },
  {
    name: 'Cement',
    shoe_color: 'Light Gray',
    sole_color: 'Dark Gray',
    shoe_hex: '#D3D3D3',
    sole_hex: '#A9A9A9',
    limited: false,
  },
  {
    name: 'Woodworks',
    shoe_color: 'Burly Wood',
    sole_color: 'Saddle Brown',
    shoe_hex: '#DEB887',
    sole_hex: '#8B4513',
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
  {
    name: 'Lavender Dream',
    shoe_color: 'Lavender',
    sole_color: 'Plum',
    shoe_hex: '#E6E6FA',
    sole_hex: '#DDA0DD',
    limited: true,
  },
  {
    name: 'Orange Crush',
    shoe_color: 'Orange',
    sole_color: 'White',
    shoe_hex: '#FFA500',
    sole_hex: '#FFFFFF',
    limited: true,
  },
  {
    name: 'Quasimodo',
    shoe_color: 'Gold',
    sole_color: 'Dark Orchid',
    shoe_hex: '#FFD700',
    sole_hex: '#9932CC',
    limited: true,
  },
  {
    name: 'Spriest',
    shoe_color: 'Dark Magenta',
    sole_color: 'Indigo',
    shoe_hex: '#8B008B',
    sole_hex: '#4B0082',
    limited: true,
  },
  {
    name: 'Manzanilla',
    shoe_color: 'Olive',
    sole_color: 'Fire Brick',
    shoe_hex: '#808000',
    sole_hex: '#B22222',
    limited: true,
  },
];

const colorBulkData = [...classicColorData, ...limitedColorData];

const colorSeed = async () => {
  await Color.bulkCreate(colorBulkData);
};

const shoeSize = ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13', '13.5', '14'];
const sizeBulkData = shoeSize.map((size) => ({ size: size }));
const sizeSeed = async () => {
  await Size.bulkCreate(sizeBulkData);
};

const SHOE_MULTIPLIER = 8000;
const NUMBER_OF_COLORS = 25;

const randomNumberGenerator = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

let classicCountMin = 1;
let classicCountMax = SHOE_MULTIPLIER;
const shoeColorsClassic = async () => {
  const classicColorBulkData = [];
  for (let shoeID = classicCountMin; shoeID <= classicCountMax; shoeID += 1) {
    const classicCount = randomNumberGenerator(2, 6);
    const classicColorIndexes = [];
    for (let i = 0; i < classicCount; i += 1) {
      const choice = randomNumberGenerator(1, 10);
      if (!classicColorIndexes.includes(choice)) {
        classicColorIndexes.push(choice);
      } else {
        i -= 1;
      }
    }
    classicColorIndexes.forEach((x) => {
      classicColorBulkData.push({ shoe_id: shoeID, color_id: x });
    });
  }
  await Shoecolor.bulkCreate(classicColorBulkData);
  classicCountMin += SHOE_MULTIPLIER;
  classicCountMax += SHOE_MULTIPLIER;
};

let limitedCountMin = 1;
let limitedCountMax = SHOE_MULTIPLIER;
const shoeColorsLimited = async () => {
  const limitedColorBulkData = [];
  for (let shoeID = limitedCountMin; shoeID <= limitedCountMax; shoeID += 1) {
    const limitedCount = randomNumberGenerator(1, 4);
    const limitedColorIndexes = [];
    for (let i = 0; i < limitedCount; i += 1) {
      const choice = randomNumberGenerator(11, 25);
      if (!limitedColorIndexes.includes(choice)) {
        limitedColorIndexes.push(choice);
      } else {
        i -= 1;
      }
    }
    limitedColorIndexes.forEach((x) => {
      limitedColorBulkData.push({ shoe_id: shoeID, color_id: x });
    });
  }
  await Shoecolor.bulkCreate(limitedColorBulkData);
  limitedCountMin += SHOE_MULTIPLIER;
  limitedCountMax += SHOE_MULTIPLIER;
};

const mensSizeIDs = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
const womensSizeIDs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
let mensSizeCountMin = 1;
let mensSizeCountMax = SHOE_MULTIPLIER;
const mensSizeData = async () => {
  const menSizeBulkData = [];
  for (let shoeID = mensSizeCountMin; shoeID <= mensSizeCountMax; shoeID += 2) {
    mensSizeIDs.forEach((sizeID) => {
      menSizeBulkData.push({ shoe_id: shoeID, size_id: sizeID });
    });
  }
  await Shoesize.bulkCreate(menSizeBulkData);
  mensSizeCountMin += SHOE_MULTIPLIER;
  mensSizeCountMax += SHOE_MULTIPLIER;
};

let womensSizeCountMin = 2;
let womensSizeCountMax = SHOE_MULTIPLIER;
const womensSizeData = async () => {
  const womenSizeBulkData = [];
  for (let shoeID = womensSizeCountMin; shoeID <= womensSizeCountMax; shoeID += 2) {
    womensSizeIDs.forEach((sizeID) => {
      womenSizeBulkData.push({ shoe_id: shoeID, size_id: sizeID });
    });
  }
  await Shoesize.bulkCreate(womenSizeBulkData);
  womensSizeCountMin += SHOE_MULTIPLIER;
  womensSizeCountMax += SHOE_MULTIPLIER;
};

let mensQuantCountMin = 1;
let mensQuantCountMax = 1000;
const menQuantData = async () => {
  const menQuantityBulkData = [];
  for (let shoeID = mensQuantCountMin; shoeID <= mensQuantCountMax; shoeID += 2) {
    for (let colorID = 1; colorID <= NUMBER_OF_COLORS; colorID += 1) {
      mensSizeIDs.forEach((sizeID) => {
        menQuantityBulkData.push({
          shoe_id: shoeID,
          color_id: colorID,
          size_id: sizeID,
          quantity: randomNumberGenerator(0, 9),
        });
      });
    }
  }
  await Quantity.bulkCreate(menQuantityBulkData);
  mensQuantCountMin += 1000;
  mensQuantCountMax += 1000;
};

let womensQuantCountMin = 2;
let womensQuantCountMax = 1000;
const womenQuantData = async () => {
  const womenQuantityBulkData = [];
  for (let shoeID = womensQuantCountMin; shoeID <= womensQuantCountMax; shoeID += 2) {
    for (let colorID = 1; colorID <= NUMBER_OF_COLORS; colorID += 1) {
      womensSizeIDs.forEach((sizeID) => {
        womenQuantityBulkData.push({
          shoe_id: shoeID,
          color_id: colorID,
          size_id: sizeID,
          quantity: randomNumberGenerator(0, 9),
        });
      });
    }
  }
  await Quantity.bulkCreate(womenQuantityBulkData);
  womensQuantCountMin += 1000;
  womensQuantCountMax += 1000;
};

const seed = async () => {
  await repeat(shoeData, 125);
  console.log('shoes');
  await colorSeed();
  console.log('color');
  await sizeSeed();
  console.log('size');
  await repeat(shoeColorsClassic, 125);
  console.log('classic');
  await repeat(shoeColorsLimited, 125);
  console.log('limited');
  await repeat(mensSizeData, 125);
  console.log('men');
  await repeat(womensSizeData, 125);
  console.log('women');
  await repeat(menQuantData, 1000);
  console.log('men');
  await repeat(womenQuantData, 1000);
  console.log('women');
};
seed();
