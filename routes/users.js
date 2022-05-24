const express = require("express");
const router = express.Router();
const User = require("../models/user/user.model");
const Canvas = require("../models/canvas.model");
const Product = require("../models/Product");
const sendMail = require("../mailer/nodeMailer");
const crypto = require("crypto");
const stripe = require("stripe")("sk_test_51L28mhLptjUB1MRMnsxM0UzVPEsx8kAmuYkZdOZegzt71oWiHHY1edJLLtMpNMjOkDcu2Zf0Q9UufjliZClvoNf700QcJeMGfQ");


const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

//Get client secret key
router.post("/create-payment-intent", async (req, res) => {
 const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});


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

//Update user Password
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

//Update user Info
router.put("/updateUserInfo", async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.body._id,
    });
    if (!user) return res.status(404).json({ msg: "User not found" });
    await User.deleteOne({
        _id: req.body.id,
    });
    const user2 = req.body;
    const new_user = await User.findByIdAndUpdate(
      user2._id,
      { $set: user2 },
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
    // const tempCanvas = await Canvas.findOne({
    //   userID: user._id,
    // });
    // if (tempCanvas) {
    //   await Canvas.deleteOne({
    //     userID: user._id,
    //   });
    // }
    const json2 = {
      userID: user._id,
      canvas: req.body.canvas,
      imageUrl: req.body.imageUrl
    };
    await Canvas.create(json2);
    return res.json({ status: "ok" });
  } catch (err) {
    return res.json({ status: "error", data:err });
  }
});

//Update Canvas
router.post("/updateCanvas", async (req, res) => {
  try {
    const tempCanvas = await Canvas.findOne({
      _id: req.body.id,
    });
    if (tempCanvas) {
      await Canvas.deleteOne({
        _id: req.body.id,
      });
      const json2 = {
      userID: tempCanvas.userID,
      canvas: req.body.canvas,
      imageUrl: req.body.imageUrl
    };
    await Canvas.create(json2);
    return res.json({ status: "ok" });
    }
    else {
      return res.status(404).json({ msg: "Canvas not found" });
    }

  } catch (err) {
    return res.json({ status: "error", data:err });
  }
});

//Get Canvas
router.post("/loadCanvas", async (req, res) => {
  try {
    const canvas = await Canvas.findOne({
      _id : req.body.id,
    });

    if (canvas) {
      return res.json({ status: "ok", data: canvas});
    }
    return res.json({ status: "error" });
  } catch (err) {
    return res.json({ status: "error" });
  }
});

//Get Products
router.post("/getProducts", async (req, res) => {
  try {
    const products = await Product.find({productType: "product"});
    return res.json({ status: "ok", data: products });
  } catch (err) {
    return res.json({ status: "error" });
  }
});

//Get Events
router.post("/getEvents", async (req, res) => {
  try {
    const products = await Product.find({productType: "event"});
    return res.json({ status: "ok", data: products });
  } catch (err) {
    return res.json({ status: "error" });
  }
});

//Get Product
router.post("/getProduct", async (req, res) => {
  try {
    let id = req.body.id;
    const product = await Product.findOne({ _id: id });
    return res.json({ status: "ok", data: product });
  } catch (err) {
    return res.json({ status: "error", error: err });
  }
});


router.post("/getSelfCanvases", async (req, res) => {
  try {
    const canvases = await Canvas.find({
      userID: req.body.id,
    });
    return res.json({ status: "ok", data: canvases });
  } catch (err) {
    return res.json({ status: "error" });
  }
});

router.post("/getUserInfo", async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.body.id,
    });
    return res.json({ status: "ok", data: user });
  } catch (err) {
    return res.json({ status: "error" });
  }
});


/*
==================================================================
==================================================================
SELLER 
==================================================================
==================================================================
*/

//Add Product
router.post("/addProduct", async (req, res) => {
  try {
    const json2 = {
      id: req.body.id,
      userID: req.body.userID,
      productType: req.body.productType,
      fields: req.body.fields,
    };
    await Product.create(json2);
    res.json({ status: "ok", data: json2 });
  } catch (err) {
    res.json({ status: "error", data:err });
  }
});

//Get Products
router.post("/getSelfProducts", async (req, res) => {
  try {
    const products = await Product.find({
      userID: req.body.id,
    });
    return res.json({ status: "ok", data: products });
  } catch (err) {
    return res.json({ status: "error" });
  }
});


//Update Product
router.put("/updateProduct", async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.body.id
    });
    if (!product) return res.status(404).json({ msg: "Product not found" });
    console.log(product);
    product.fields.name = req.body.fields.name;
    product.fields.price = req.body.fields.price;
    product.fields.imageUrl = req.body.fields.imageUrl; 
    product.fields.company = req.body.fields.company;
    const new_product = await Product.findByIdAndUpdate(
      product._id,
      { $set: product },
      { new: true }
    );
    return res.json({ status: "ok" });
  } catch (err) {
    return res.json({ status: "error", data:err });
  }
});


/*
==================================================================
==================================================================
EVENT MANAGER
==================================================================
==================================================================
*/


module.exports = router;
