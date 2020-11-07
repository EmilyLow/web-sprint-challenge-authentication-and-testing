const knex = require('knex');

const knexConfig = require('../knexfile.js');

//!! Why the .developement. Why not just knexConfig
module.exports = knex(knexConfig.development);
