const fs = require('fs');
const csvWriter = require('csv-write-stream');
const couchimport = require('couchimport');
const { username, password } = require('../../db_creds.js');

const writer = csvWriter();
const url = `http://${username}:${password}@127.0.0.1:5984`;

const shoeSize = ['5', '6', '7', '8', '9', '10', '11', '12', '13'];
const sizeSeed = () => {
  shoeSize.forEach((size) => {
    writer.write({ size: size });
  });
};

exports.seed = async () => {
  await writer.pipe(fs.createWriteStream('db/couchdb/sizes.csv'));
  await sizeSeed();
  await writer.end();
};
