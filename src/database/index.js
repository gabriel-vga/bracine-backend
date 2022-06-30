const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/bracine");
mongoose.Promise = global.Promise;

module.exports = mongoose;
