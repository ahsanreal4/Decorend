const express = require("express");
const mongoose = require('mongoose');
const User = require('./models/user/user.model.js');

const PORT = process.env.PORT || 3001;

const app = express();
// app.use(express.static(__dirname + '/public'));
app.use(express.json());
const MONGODB_URI = "mongodb+srv://ahsan123:ahsan123@contactkeeper.ouoqz.mongodb.net/Decorend?retryWrites=true&w=majority";


//Database Connection
///mongoose.connect('mongodb://localhost:27017/Decorend');
try {
  mongoose.connect(MONGODB_URI || 'mongodb://localhost:27017/Decorend', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, () =>
    console.log("Database Connected"));
} catch (error) {
  console.log("could not connect");
}


// API

  app.post('/register', async (req,res) => {
      try{
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
        // db.collection("User").insertOne(myobj, function (err, res) {
        //   console.log("1 document inserted");
        //   db.close();
        // });
        res.json({status:'ok', data: json2});
      }
      catch(err){
        res.json({ status: 'error', 'error' : 'Email already registered'});
      }
  });

  app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    
    if(user){
      return res.json({status: 'ok', data:user, user: true});
    }
    else {
      return res.json({status: 'error', user: false});
    }
  })


  // START SERVER
  
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
