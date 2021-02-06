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

// let mensQuantCountMin = 9750000;
// let mensQuantCountMax = 10000000;
let mensQuantCountMin = 9750001;
let mensQuantCountMax = 9750500;
const menQuantData = async () => {
  for (let shoeID = mensQuantCountMin; shoeID <= mensQuantCountMax; shoeID += 2) {
    const IDquants = [];
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
        IDquants.push(
          `{color_id: ${color},
        size_id: ${sizeID},
        quantity: ${randomNumberGenerator(0, 9)},}`
        )
      });
    });
    // writer.write({
    //   shoe_id: shoeID,
    //   quantity: IDquants,
    // });
    // function write() {
    //   let i = shoeID;
    //   let ok = true;
    //   do {
    //     i -= 1;
    //     //id += 1;
    //     if (i === 0) {
    //       writer.write({
    //         shoe_id: shoeID,
    //         quantity: IDquants,
    //       });
    //     } else {
    //       ok = writer.write({
    //         shoe_id: shoeID,
    //         quantity: IDquants,
    //       });
    //     }
    //   } while (i > 0 && ok);
    //   if (i > 0) {
    //     writer.once('drain', write);
    //   }
    // }
    // write()
      writer.write({
            shoe_id: shoeID,
            quantity: IDquants,
          });
  }

  mensQuantCountMin += 500;
  mensQuantCountMax += 500;
};

let seed = async () => {
  // await writer.pipe(fs.createWriteStream('db/couchdb/quantities.csv'));
  // await repeat(menQuantData, 500);
  // await writer.end();

  const quantSizeOpts = { delimiter: ',', url: url, database: 'quantities' };
  await couchimport.importFile('db/couchdb/quantities.csv', quantSizeOpts, (err, data) => {
    if (err) {
      console.log('Failed to import');
    } else {
      console.log('CSV Import success', data);
    }
  });
};
seed()