const mongoose = require("mongoose");
const keys = require("./config/keys");

mongoose.connect(
  keys.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("MongoDB Connected");
  }
);

const conn = mongoose.connection;
