var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// create a schema
var studentSchema = new Schema({
    accountId: {
        type: String
    },
    username:{
        type: String,
        unique: true
    },
    profilepic:{
        data: Buffer,
        contentType: String,
    },
    fullname:{
      type: String,
      required: true
    },
/*    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    }, */
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    nationality:{
        type:String,
        required:true
    },
    nationalID:{
        type:String,
        required:true,
        unique: true
    },
    faith:{
        type: String,
        required: true
    },
    language:{
        type: String,
        required: true
    },
    specialneeds:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    grade:{
        type: String,
        required: true
    },
    schoolName:{
        type: String,
        required: true
    },
    schoolAddress:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    suburb:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    guardian:{
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
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

// the schema is useless so far
var Student = mongoose.model('Student', studentSchema);

// make this available to our users in our Node applications
module.exports = Student;
