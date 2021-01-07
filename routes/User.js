const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const passportCongfig = require("../passport");
const JWT = require("jsonwebtoken");
const User = require("../models/User");
const Todo = require("../models/Todo");
const keys = require("../config/keys");
const responseHandler = require("./Errors");
const mongoose = require("mongoose");

const signedToken = (userID) => {
  return JWT.sign(
    {
      iss: "TarunSingh",
      sub: userID,
    },
    keys.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );
};

userRouter.post("/register", (req, res) => {
  const { username, password, role, originalName, email } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err) responseHandler(err, null, null, null, res);
    if (user) responseHandler(null, null, user, "usernameTaken", res);
    else {
      const newUser = new User({
        username,
        password,
        role,
        originalName,
        email,
      });
      newUser.save((err) => {
        if (err) responseHandler(err, "userOnSave", null, null, res);
        else responseHandler(null, null, null, "createdAcc", res);
      });
    }
  });
});

userRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, username, role, originalName, email } = req.user;
      const token = signedToken(_id);
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res.status(200).json({
        isAuthenticated: true,
        user: { username, role, originalName },
        message: { msgBody: "Login Succesful", msgError: false },
      });
    }
  }
);

userRouter.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token");
    res.json({ user: { username: "", role: "" }, success: true });
  }
);

userRouter.post(
  "/todo",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.body);
    const todo = new Todo(req.body);
    todo.save((err) => {
      if (err)
        res
          .status(500)
          .json({ message: { msgBody: "An error occured", msgError: true } });
      else {
        req.user.todos.push(todo);
        req.user.save((err) => {
          if (err)
            res.status(500).json({
              message: { msgBody: "An error occured", msgError: true },
            });
          else {
            res.status(200).json({
              message: {
                msgBody: "Succesfully added Article",
                msgError: false,
              },
            });
          }
        });
      }
    });
  }
);

userRouter.delete(
  "/todo/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user._id, (err, document) => {
      if (err) {
        res
          .status(400)
          .json({ message: { msgBody: "User not found", msgError: true } });
      } else {
        document.todos = document.todos.filter((todo) => {
          if (String(todo._id) !== req.params.id) {
            // console.log("DELETE ID", todo._id);
            return todo;
          }
        });
        document.save();
        Todo.findByIdAndDelete(req.params.id, (err, document) => {
          if (err) {
            res
              .status(400)
              .json({ message: { msgBody: "User not found", msgError: true } });
          } else {
            res.status(200).json({
              message: { msgBody: "Successfully Deleted", msgError: false },
            });
          }
        });
      }
    });
  }
);

userRouter.get(
  "/todos",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user._id)
      .populate("todos")
      .exec((err, document) => {
        if (err) {
          res
            .status(500)
            .json({ message: { msgBody: "An error occured", msgError: true } });
        } else {
          res.status(200).json({ todos: document.todos, authenticated: true });
        }
      });
  }
);

userRouter.get(
  "/admin",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role === "admin") {
      res
        .status(200)
        .json({ message: { msgBody: "You are an admin.", msgError: false } });
    } else {
      res.status(401).json({
        message: { msgBody: "You are an not an admin.", msgError: true },
      });
    }
  }
);

userRouter.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role === "admin") {
      User.find({ role: "user" }, function (err, users) {
        res.status(200).json({ data: users });
      });
    } else {
      res.status(401).json({
        message: { msgBody: "You are an not an admin.", msgError: true },
      });
    }
  }
);

userRouter.post(
  "/updateIntro",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // console.log(req.body);
    User.findByIdAndUpdate(
      req.user._id,
      { userIntro: req.body.introText },
      { new: true },
      (err, document) => {
        if (err) {
          return res
            .status(500)
            .json({ message: { msgBody: "An error occured", msgError: true } });
        } else {
          const { username, role, originalName, userIntro } = document;
          return res.status(200).json({
            isAuthenticated: true,
            user: { username, role, originalName, userIntro },
            message: { msgBody: "Intro Updated Succesfully", msgError: false },
          });
        }
      }
    );
  }
);

userRouter.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const {
      username,
      role,
      originalName,
      userIntro,
      createdAt,
      lastUpdated,
      coverPhotoUrl,
    } = req.user;
    res.status(200).json({
      isAuthenticated: true,
      user: {
        username,
        role,
        originalName,
        userIntro,
        createdAt,
        lastUpdated,
        coverPhotoUrl,
      },
    });
  }
);

module.exports = userRouter;
