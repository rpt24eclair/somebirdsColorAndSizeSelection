const async = require('async');
const couch = require('./couchdb');

const databases = ['colors', 'quantities', 'shoecolors', 'shoes', 'shoesizes'];

const createDatabase = (db, cb) => {
  couch.db.create(db, (err) => {
    if (err && err.statusCode === 412) {
      err = null;
    }
    cb(err);
  });
};

const createDatabases = (cb) => {
  async.each(databases, createDatabase, cb);
};

createDatabases(function (err) {
  if (err) {
    throw err;
  } else {
    console.log('couchdb initialized');
  }
});
