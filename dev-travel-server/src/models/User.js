const Datastore = require("nedb");
const database = new Datastore({filename: "users.db", autoload: true});

module.exports = database;