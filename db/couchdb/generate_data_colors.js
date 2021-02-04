const fs = require('fs');
const csvWriter = require('csv-write-stream');
const couchimport = require('couchimport');
const { username, password } = require('../../db_creds.js');

const writer = csvWriter();
const url = `http://${username}:${password}@127.0.0.1:5984`;

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
  colorBulkData.forEach((color) => {
    writer.write(color);
  });
};

exports.seed = async () => {
  await writer.pipe(fs.createWriteStream('db/couchdb/colors.csv'));
  await colorSeed();
  await writer.end();
};
