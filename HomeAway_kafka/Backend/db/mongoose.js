var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose
  .connect("mongodb://kavya:homeawaylab2@ds249583.mlab.com:49583/lab2/lab2")
  .then(() => console.log("Connected to MongoDB"))
  .catch(() => console.log("could not connect to mongodb:"));
module.exports = { mongoose };
