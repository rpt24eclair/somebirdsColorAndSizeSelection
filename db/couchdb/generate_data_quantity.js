const fs = require('fs');
const csvWriter = require('csv-write-stream');
const couchimport = require('couchimport');
const { username, password } = require('../../db_creds.js');

const writer = csvWriter();
const url = `http://${username}:${password}@127.0.0.1:5984`;

async function repeat(func, times) {
  await func();
  times && --times && await repeat(func, times);
}

const randomNumberGenerator = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const mensSizeIDs = [8, 9, 10, 11, 12, 13];

let mensQuantCountMin = 1;
let mensQuantCountMax = 1000;
const menQuantData = async () => {
  for (let shoeID = mensQuantCountMin; shoeID <= mensQuantCountMax; shoeID += 2) {
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
      mensSizeIDs.forEach((sizeID) => {
        writer.write({
          shoe_id: shoeID,
          color_id: color,
          size_id: sizeID,
          quantity: randomNumberGenerator(0, 9),
        });
      });
    });
  }
  mensQuantCountMin += 1000;
  mensQuantCountMax += 1000;
};

exports.seed = async () => {
  await writer.pipe(fs.createWriteStream('db/couchdb/quantities.csv'));
  await repeat(menQuantData, 500);
  await writer.end();
};
