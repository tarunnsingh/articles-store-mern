const express = require("express");
const userRouter = express.Router();
const Todo = require("../models/Todo");
const keys = require("../config/keys");

userRouter.get("/all", (req, res) => {
  Todo.find()
    .sort("-date")
    .exec(function (err, cursor) {
      if (err) {
        res
          .status(500)
          .json({ message: { msgBody: "An error occured", msgError: true } });
      } else {
        // console.log(cursor);
        // Reverse to get latest articles first
        let results = cursor.slice().reverse();
        res.status(200).json({ todos: results, authenticated: false });
      }
    });
});

userRouter.post("/search", (req, res) => {
  // console.log("REQ BODY", req.body.searchQuery);
  let query = req.body.searchQuery;
  Todo.find({ tags: { $elemMatch: { $eq: query } } }).exec(function (
    err,
    cursor
  ) {
    if (err) {
      return res
        .status(500)
        .json({ message: { msgBody: "An error occured", msgError: true } });
    } else {
      if (cursor.length == 0) {
        return res
          .status(404)
          .json({ message: { msgBody: "No Articles Found.", msgError: true } });
      }
      console.log(cursor.length);
      return res.status(200).json({ todos: cursor, authenticated: false });
    }
  });
});

module.exports = userRouter;
