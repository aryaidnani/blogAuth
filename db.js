const mongoose = require("mongoose");
const { markAsUntransferable } = require("worker_threads");
const Schema = mongoose.Schema;

const userDetails = new Schema({
  password: String,
  token: String,
});

const userModel = mongoose.model("userDetails", userDetails);

module.exports = {
  userModel,
};
