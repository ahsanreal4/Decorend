const express = require("express");
const router = express.Router();
const User = require("../models/user/user.model");
const Canvas = require("../models/canvas.model");
const Product = require("../models/Product");
const Order = require("../models/Order.model");
const ShippingAddress = require("../models/ShippingAddress");
const sendMail = require("../mailer/nodeMailer");
const crypto = require("crypto");
const stripe = require("stripe")("sk_test_51L28mhLptjUB1MRMnsxM0UzVPEsx8kAmuYkZdOZegzt71oWiHHY1edJLLtMpNMjOkDcu2Zf0Q9UufjliZClvoNf700QcJeMGfQ");
const StreamChat = require("stream-chat").StreamChat;
const { connect } = require("getstream");

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const api_id = process.env.STREAM_API_ID;


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
    const serverClient = connect(api_key, api_secret, api_id);
    await User.create(json2);
    const user = await User.findOne({
        email: req.body.email,
    });
    let token;
    if (user) {
      const userID = user.id;
      token = serverClient.createUserToken(userID);
    }
    res.json({ status: "ok", data: json2, token: token });
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
    const serverClient = connect(api_key, api_secret, api_id);
    const client = StreamChat.getInstance(api_key, api_secret);
    const { users } = await client.queryUsers({id: user.id});
    let token;
    if (users?.length > 0) {
      token = serverClient.createUserToken(users[0]?.id);
    }
    return res.json({ status: "ok", data: user, user: true, token: token });
  } else {
    return res.json({ status: "error", user: false });
  }
});

//Create chat token
router.post("/createChatToken", async (req, res) => {
  const user = await User.findOne({
    _id: req.body.id,
  });

  if (user) {
    const serverClient = connect(api_key, api_secret, api_id);
    const client = StreamChat.getInstance(api_key, api_secret);
    const { users } = await client.queryUsers({id: user.id});
    let token;
    if (users?.length > 0) {
      token = serverClient.createUserToken(users[0]?.id);
    }
    else {
      token = serverClient.createUserToken(req.body.id);
    }
    return res.json({ status: "ok", user: true, token: token });
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
      email: req.body.email
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
      imageUrl: req.body.imageUrl,
      width: req.body.width,
      height: req.body.height
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
      imageUrl: req.body.imageUrl,
        width: req.body.width,
      height: req.body.height
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

// GET CANVASES
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

//DELETE CANVAS 
router.post("/deleteCanvas", async (req, res) => {
  try {
    const tempCanvas = await Canvas.findOne({
      _id: req.body.id,
    });
    if (tempCanvas) {
      await Canvas.deleteOne({
        _id: req.body.id,
      });
      return res.json({ status: "ok" });
    }
    else {
      return res.status(404).json({ msg: "Canvas not found" });
    }
  } catch (err) {
    return res.json({ status: "error" });
  }
});

//DELETE PRODUCT 
router.post("/deleteProduct", async (req, res) => {
  try {
    const tempCanvas = await Product.findOne({
      _id: req.body.id,
    });
    if (tempCanvas) {
      await Product.deleteOne({
        _id: req.body.id,
      });
      return res.json({ status: "ok" });
    }
    else {
      return res.status(404).json({ msg: "Canvas not found" });
    }
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
      imagesUrl: req.body.imagesUrl
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
    product.fields.name = req.body.fields.name;
    product.fields.price = req.body.fields.price;
    if (req.body.fields.imageUrl != "") {
      product.fields.imageUrl = req.body.fields.imageUrl;
    }  
    product.fields.quantity = req.body.fields.quantity;
    product.fields.company = req.body.fields.company;
    if (req.body.imagesUrl != "") {
      product.imagesUrl = req.body.imagesUrl;
    }
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

router.post("/addShippingAddress", async (req, res) => {
  try {
    const tempCanvas = await ShippingAddress.findOne({
      userID: req.body.userID,
    });
    const json2 = {
        userID: req.body.userID,
        city: req.body.city,
        zipCode: req.body.zipCode,
        address: req.body.address,
        country: req.body.country,
    };
    if (tempCanvas) {
      await ShippingAddress.deleteOne({
        userID: req.body.userID,
      });
    }
    await ShippingAddress.create(json2);
    return res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", data:err });
  }
});

router.post("/getShippingAddress", async (req, res) => {
  try {
    const tempCanvas = await ShippingAddress.findOne({
      userID: req.body.userID,
    });
    if (tempCanvas) {
      return res.json({ status: "ok", data: tempCanvas });
    }
    return res.json({ status: "error", data:"Shipping Address not found" });
  } catch (err) {
    res.json({ status: "error", data:err });
  }
});

router.post("/createOrder", async (req, res) => {
  try {
    if (req.body.OrderType == "Event") {
      const json2 = {
        OrderType: req.body.OrderType,
        OrderStatus: 0,
        OrderBy: req.body.userID,
        OrderTo: req.body.sellerID,
        OrderAmount: req.body.amount,
        ShippingAddressId: req.body.shippingAddressID,
        OrderItems: [req.body.eventName],
        ItemsQuantities: [1],
        PerItemAmount: [req.body.amount],
        SellerName: req.body.sellerName
      };
      await Order.create(json2);
      return res.json({ status: "ok" });
    }
    else if (req.body.OrderType == "Product") {
      const json2 = {
        OrderType: req.body.OrderType,
        OrderStatus: 0,
        OrderBy: req.body.userID,
        OrderTo: req.body.sellerID,
        OrderAmount: req.body.amount,
        ShippingAddressId: req.body.shippingAddressID,
        OrderItems: req.body.items,
        ItemsQuantities: req.body.quantities,
        PerItemAmount: req.body.perItemAmount,
        SellerName: req.body.sellerName
      };

      await Order.create(json2);
      return res.json({ status: "ok" });
    }
  } catch (err) {
    res.json({ status: "error", data:err });
  }
});

router.post("/setOrderStatus", async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.body.orderID,
    });
    if (order) {
      order.OrderStatus = req.body.orderStatus;
      await Order.findByIdAndUpdate(
      req.body.orderID,
      { $set: order },
        { new: true }
      );
      return res.json({ status: "ok" });
    }
    return res.json({ status: "error", data:err });
  }
     catch (err) {
    res.json({ status: "error", data:err });
  }
});


router.post("/getPendingOrders", async (req, res) => {
  try {
    const orders = await Order.find({
      OrderBy: req.body.userID,
      OrderStatus: {$ne: 4}
    });
    return res.json({ status: "ok", data: orders });
    
  }
     catch (err) {
    res.json({ status: "error", data:err });
  }
});

router.post("/getSellerPendingOrders", async (req, res) => {
  try {
    const orders = await Order.find({
      OrderTo: req.body.sellerID,
      OrderStatus: {$ne: 4}
    });
    return res.json({ status: "ok", data: orders });
    
  }
     catch (err) {
    res.json({ status: "error", data:err });
  }
});

router.post("/getSellerCompletedOrders", async (req, res) => {
  try {
    const orders = await Order.find({
      OrderTo: req.body.sellerID,
      OrderStatus: 4
    });
    return res.json({ status: "ok", data: orders });
    
  }
  catch (err) {
    res.json({ status: "error", data:err });
  }
});

router.post("/getSellerCancelledOrders", async (req, res) => {
  try {
    const orders = await Order.find({
      OrderTo: req.body.sellerID,
      OrderStatus: 5
    });
    return res.json({ status: "ok", data: orders });
    
  }
  catch (err) {
    res.json({ status: "error", data:err });
  }
});

module.exports = router;
