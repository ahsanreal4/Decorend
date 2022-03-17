const express = require("express");
const router = express.Router();
const User = require("../models/user/user.model");
const sendMail = require("../mailer/nodeMailer");
const crypto = require("crypto");

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
    };
    await User.create(json2);
    res.json({ status: "ok", data: json2 });
  } catch (err) {
    res.json({ status: "error", error: "Email already registered" });
  }
});

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

module.exports = router;
