var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Create a schema
var departmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    managerId: {
        type: Schema.Types.ObjectId,
        ref: 'Admin'
    },
    supervisorId: {
        type: Schema.Types.ObjectId,
        ref: 'Admin'
    },
    isActive: {
        type: Boolean,
        default: true
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

var Department = mongoose.model('Department', departmentSchema);

// make this available to our accounts in our Node applications
module.exports = Department;
