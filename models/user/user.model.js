const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
    name: {type: String, required : true},
    email: {type: String, required : true, unique:true},
    userType: {type: String, required : true},
    password : {type: String, required : true},
    number: {type: String, required : true},
    city: {type: String, required : true},
    zipCode: {type: String, required : true},
    address: {type: String, required : true},
    gender: {type: String, required : true}
    },
    {collection: 'User'}
);

module.exports = mongoose.model('User', UserSchema);