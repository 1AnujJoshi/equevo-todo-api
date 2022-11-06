const mongoose = require("mongoose");

// creating schema for storing the details
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
