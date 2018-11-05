var mongoose = require('mongoose');

var schema = mongoose.Schema;

gradeSchema = new  schema({
    name:{
        type: Number,
        require: true
    },
    thumbnail:{
      data: Buffer,
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    numStudents:{
        type: Number,
        require: true,
        default: 0
    },
    isActive:{
        type: Boolean,
        require:true,
        default: 0
    },
    createdAt: Date,
    updatedAt: Date,
});

var Grade = mongoose.model('Grade',gradeSchema);

// make this available to our accounts in our Node applications
module.exports = Grade;
