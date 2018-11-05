var mongoose = require('mongoose');

var schema = mongoose.Schema;

// Create Schema
var subjectSchema = new schema({
   name:{
       type: String,
       require: true
   },
    thumbnail:{
       type: String,
        require: true
    },
    viewCounter:{
       type: Number,
        default: 0
    },
    description:{
       type: String,
        require: true
    },
    previewURL:{
       type: String,
        require: true
    },
    skillTags:[{
       type: String,
        require: true
    }],
    length:{
       type: String
    },
    createdAt: Date,
    updatedAt: Date,
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Admin'
    },
    lastmodifiedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Admin'
    }
});

var Subject = mongoose.model('Subject',subjectSchema);

// make this available to our accounts in our Node applications
module.exports = Subject;
