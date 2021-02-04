const nano = require('nano');
const { username, password } = require('../../db_creds.js');

module.exports = nano(process.env.COUCHDB_URL || `http://${username}:${password}@127.0.0.1:5984`);
