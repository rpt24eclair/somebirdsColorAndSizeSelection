const fs = require('fs');
const csvWriter = require('csv-write-stream');
const couchimport = require('couchimport');
const { username, password } = require('../../db_creds.js');

const writer = csvWriter();
const url = `http://${username}:${password}@127.0.0.1:5984`;

const SHOE_MULTIPLIER = 8000;

async function repeat(func, times) {
  await func();
  times && --times && await repeat(func, times);
}

const mensSizeIDs = [8, 9, 10, 11, 12, 13];
const womensSizeIDs = [5, 6, 7, 8, 9, 10];
let mensSizeCountMin = 1;
let mensSizeCountMax = SHOE_MULTIPLIER;
const mensSizeData = async () => {
  for (let shoeID = mensSizeCountMin; shoeID <= mensSizeCountMax; shoeID += 2) {
    mensSizeIDs.forEach((sizeID) => {
      writer.write({ shoe_id: shoeID, size_id: sizeID });
    });
  }
  mensSizeCountMin += SHOE_MULTIPLIER;
  mensSizeCountMax += SHOE_MULTIPLIER;
};

let womensSizeCountMin = 2;
let womensSizeCountMax = SHOE_MULTIPLIER;
const womensSizeData = async () => {
  for (let shoeID = womensSizeCountMin; shoeID <= womensSizeCountMax; shoeID += 2) {
    womensSizeIDs.forEach((sizeID) => {
      writer.write({ shoe_id: shoeID, size_id: sizeID });
    });
  }
  womensSizeCountMin += SHOE_MULTIPLIER;
  womensSizeCountMax += SHOE_MULTIPLIER;
};

exports.seed = async () => {
  await writer.pipe(fs.createWriteStream('db/couchdb/shoesizes.csv'));
  await repeat(mensSizeData, 125);
  await repeat(womensSizeData, 125);
  await writer.end();
};
