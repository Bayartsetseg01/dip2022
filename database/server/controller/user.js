const mongoose = require("mongoose");
const users = require("../models/users");
const Users = require("../models/users");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await Users.find();
    res.status(200).json({
      success: true,
      data: users,
      // "get all users....",
      // user: req.userId,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err,
      // user: req.userId,
    });
  }
};
exports.createUser = async (req, res, next) => {
  console.log("data: ", req.body);
  try {
    const users = await Users.create(req.body);
    res.status(200).json({
      success: true,
      data: users,
      // data: "post create user",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err,
    });
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const users = await Users.findById(req.params.id);
    if (!users) {
      return res.status(400).json({
        success: false,
        error: req.params.id + " id-t хэрэглэгч байхгүй",
      });
    }
    res.status(200).json({
      success: true,
      data: users,
      // `${req.params.id} id-t get user`,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err,
    });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const users = await Users.findByIdAndUpdate(req.params.id, req.body, {
        new: true,             // shine utga harah
        runValidators: true,   //model utga shalgah
    });

    if (!users) {
      return res.status(400).json({
        success: false,
        error: req.params.id + " id -тай хэрэглэгч байхгүй.",
      });
    }
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err,
    });
  }
  //   res.status(200).json({
  //     success: true,
  //     data: `${req.params.id} id-t update user`,
  //   });
};

exports.deleteUser = async (req, res, next) => {
  try {
    const users = await Users.findByIdAndDelete(req.params.id);
    if (!users) {
      return res.status(400).json({
        success: false,
        error: req.params.id + " id -тэй хэрэглэгч байхгүй.",
      });
    }
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err,
    });
  }
};
