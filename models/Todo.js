const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("Todo", TodoSchema);
