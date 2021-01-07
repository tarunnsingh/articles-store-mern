if (process.env.NODE_ENV === "production") {
  module.exports = {
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    MONGODB_URI: process.env.MONGODB_URI,
  };
} else {
  const localkeys = require("./localkeys");
  module.exports = {
    JWT_SECRET_KEY: localkeys.JWT_SECRET_KEY,
    MONGODB_URI: localkeys.MONGODB_URI,
  };
}
