const couchimport = require('couchimport');
const { username, password } = require('../../db_creds.js');
const sizes = require('./generate_data_sizes.js');
const colors = require('./generate_data_colors.js');
const shoesizes = require('./generate_data_shoesizes.js');
const shoes = require('./generate_data_shoes.js');
const menquant = require('./generate_data_quantity.js');
const womenquant = require('./generate_data_quantity_women.js');

const url = `http://${username}:${password}@127.0.0.1:5984`;

const csvGenerator = async () => {
  await sizes();
  await colors();
  await shoesizes();
  await shoes();
  await menquant();
  await menquant();
  await womenquant();
  await womenquant();
};

const sendToDb = async () => {
  const sizeOpts = { delimiter: ',', url: url, database: 'sizes' };
  await couchimport.importFile('db/couchdb/sizes.csv', sizeOpts, (err, data) => {
    if (err) {
      console.log('Failed to import');
    } else {
      console.log('CSV Import success', data);
    }
  });

  const shoeSizeOpts = { delimiter: ',', url: url, database: 'shoesizes' };
  await couchimport.importFile('db/couchdb/shoesizes.csv', shoeSizeOpts, (err, data) => {
    if (err) {
      console.log('Failed to import');
    } else {
      console.log('CSV Import success', data);
    }
  });

  const shoeOpts = { delimiter: ',', url: url, database: 'shoes' };
  await couchimport.importFile('db/couchdb/shoes.csv', shoeOpts, (err, data) => {
    if (err) {
      console.log('Failed to import');
    } else {
      console.log('Import success', data);
    }
  });

  const colorOpts = { delimiter: ',', url: url, database: 'colors' };
  await couchimport.importFile('db/couchdb/colors.csv', colorOpts, (err, data) => {
    if (err) {
      console.log('Failed to import');
    } else {
      console.log('CSV Import success', data);
    }
  });

  const quantSizeOpts = { delimiter: ',', url: url, database: 'quantities' };
  await couchimport.importFile('db/couchdb/quantities.csv', quantSizeOpts, (err, data) => {
    if (err) {
      console.log('Failed to import');
    } else {
      console.log('CSV Import success', data);
    }
  });

  await couchimport.importFile('db/couchdb/quantities_women.csv', quantSizeOpts, (err, data) => {
    if (err) {
      console.log('Failed to import');
    } else {
      console.log('CSV Import success', data);
    }
  });
};

csvGenerator().then(() => {
  sendToDb();
});
