const Datastore = require("nedb");
const database = new Datastore({filename: "travels.db", autoload: true});

module.exports = database;