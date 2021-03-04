const fs = require('fs');
const csvWriter = require('csv-write-stream');

const writer = csvWriter();

async function repeat(func, times) {
  await func();
  times && --times && await repeat(func, times);
}

const randomNumberGenerator = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const womensSizeIDs = [5, 6, 7, 8, 9, 10];
let womensQuantCountMin = 2;
let womensQuantCountMax = 1000;
const womenQuantData = async () => {
  for (let shoeID = womensQuantCountMin; shoeID <= womensQuantCountMax; shoeID += 2) {
    const classicCount = randomNumberGenerator(2, 5);
    const classicColorIndexes = [];
    for (let i = 0; i < classicCount; i += 1) {
      const choice = randomNumberGenerator(1, 5);
      if (!classicColorIndexes.includes(choice)) {
        classicColorIndexes.push(choice);
      } else {
        i -= 1;
      }
    }
    const limitedCount = randomNumberGenerator(1, 4);
    const limitedColorIndexes = [];
    for (let i = 0; i < limitedCount; i += 1) {
      const choice = randomNumberGenerator(6, 15);
      if (!limitedColorIndexes.includes(choice)) {
        limitedColorIndexes.push(choice);
      } else {
        i -= 1;
      }
    }
    const allColors = [...limitedColorIndexes, ...classicColorIndexes];
    allColors.forEach((color) => {
      womensSizeIDs.forEach((sizeID) => {
        writer.write({
          shoe_id: shoeID,
          color_id: color,
          size_id: sizeID,
          quantity: randomNumberGenerator(0, 9),
        });
      });
    });
  }
  womensQuantCountMin += 1000;
  womensQuantCountMax += 1000;
};

exports.seed = async () => {
  await writer.pipe(fs.createWriteStream('db/couchdb/quantities_women.csv'));
  await repeat(womenQuantData, 500);
  await writer.end();
};
