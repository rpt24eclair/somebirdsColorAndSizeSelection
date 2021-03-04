const fs = require('fs');
const csvWriter = require('csv-write-stream');
const couchimport = require('couchimport');
const { username, password } = require('../../db_creds.js');

const writer = csvWriter();
const url = `http://${username}:${password}@127.0.0.1:5984`;

const gender = ['Men\'s', 'Women\'s', 'Gender Neutral', 'Child\'s', 'Girl\'s', 'Boy\'s', 'Toddler\'s', 'Toddler Girl\'s', 'Toddler Boy\'s', 'Baby\'s', 'Baby Girl\'s', 'Baby Boy\'s', 'Infant\'s', 'Infant Girl\'s', 'Infant Boy\'s', 'Teen\'s', 'Teen Girl\'s', 'Teen Boy\'s', 'Senior\'s', 'Junior\'s'];
const material = ['Wool', 'Cotton', 'Polyester', 'Nylon', 'Leather', 'Silk', 'Rubber', 'Fiber', 'Synthetic', 'Polyurethane', 'Artificial', 'Adhesive', 'Felt', 'Kevlar', 'Cowhide', 'Velvet', 'Microfiber', 'Nanotech', 'Invisible', 'Indestructible'];
const action = ['Runners', 'Skippers', 'Sprinters', 'Joggers', 'Walkers', 'Trotters', 'Climbers', 'Dashers', 'Pipers', 'Loungers', 'Marathoners', 'Hurdlers', 'Trackers', 'Racers', 'Bikers', 'Slippers', 'Sneakers', 'Tennis Shoes', 'Footgear', 'Moccasins'];

async function repeat(func, times) {
  await func();
  times && --times && await repeat(func, times);
}

let model = 9000001;
const shoeData = async () => {
  await gender.forEach((gender) => {
    material.forEach((material) => {
      action.forEach((action) => {
        writer.write({ name: `${gender} ${material} ${action}`, model: model });
        model += 1;
      });
    });
  });
};

exports.seed = async () => {
  await writer.pipe(fs.createWriteStream('db/couchdb/shoes.csv'));
  await repeat(shoeData, 125);
  await writer.end();
};