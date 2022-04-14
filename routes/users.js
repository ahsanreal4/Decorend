const express = require("express");
const router = express.Router();
const User = require("../models/user/user.model");
const Canvas = require("../models/canvas.model");
const sendMail = require("../mailer/nodeMailer");
const crypto = require("crypto");

//Sign up user
router.post("/signup", async (req, res) => {
  try {
    const json2 = {
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      userType: req.body.userType,
      number: req.body.number,
      city: req.body.city,
      zipCode: req.body.zipCode,
      address: req.body.address,
      gender: req.body.gender,
      Canvas: req.body.canvas,
    };
    await User.create(json2);
    res.json({ status: "ok", data: json2 });
  } catch (err) {
    res.json({ status: "error", error: "Email already registered" });
  }
});

//Login user
router.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (user) {
    // const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    return res.json({ status: "ok", data: user, user: true });
  } else {
    return res.json({ status: "error", user: false });
  }
});

//Check if email exist and reset password
router.post("/emailExist", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  if (user) {
    const reset_code = crypto.randomBytes(6).toString("hex");
    sendMail(
      user.email,
      "Reset Password",
      "This is an email to inform you that your reset password is " + reset_code
    );

    return res.json({ status: "ok", data: user, user: true, code: reset_code });
  } else {
    return res.json({ status: "error", user: false });
  }
});

//Update user
router.put("/updateUser", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.password = req.body.password;
    const new_user = await User.findByIdAndUpdate(
      user._id,
      { $set: user },
      { new: true }
    );
    return res.json({ status: "ok" });
  } catch (err) {
    return res.json({ status: "error" });
  }
});

//Save Canvas
router.post("/saveCanvas", async (req, res) => {
  try {
    const user = await User.findOne({
      email: "ahsan.btph123@gmail.com",
    });
    const tempCanvas = await Canvas.findOne({
      userID: user._id,
    });
    if (tempCanvas) {
      await Canvas.deleteOne({
        userID: user._id,
      });
    }
    const json2 = {
      userID: user._id,
      canvas: req.body.canvas,
    };
    await Canvas.create(json2);
    return res.json({ status: "ok" });
  } catch (err) {
    return res.json({ status: "error" });
  }
});

//Get Canvas
router.get("/loadCanvas", async (req, res) => {
  try {
    const user = await User.findOne({
      email: "ahsan.btph123@gmail.com",
    });
    const canvas = await Canvas.findOne({
      userID : user._id,
    });

    if (canvas) {
      return res.json({ status: "ok", data: canvas});
    }
    return res.json({ status: "error" });
  } catch (err) {
    return res.json({ status: "error" });
  }
});

module.exports = router;
