const Datastore = require("nedb");
const database = new Datastore({filename: "origins.db", autoload: true});

module.exports = database;