var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// create a schema
var adminSchema = new Schema({
    accountId: {
        type: Schema.Types.ObjectId,
        //required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    department:{
        type: Schema.Types.ObjectId,
        ref: 'Department'
    },
    verified: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    userRoles: [{
        type: Schema.Types.ObjectId,
        ref: 'Role'
    }],
    salt: String,
    createdAt: Date,
    updatedAt: Date,
    createdBy: {
        type: Schema.Types.ObjectId,
    },
    lastmodifiedBy: {
        type: Schema.Types.ObjectId,
    }
});

var Admin = mongoose.model('Admin', adminSchema);

// make this available to our users in our Node applications
module.exports = Admin;
