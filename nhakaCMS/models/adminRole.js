var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// create a schema
var adminRoleSchema = new Schema({
    adminId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Admin'
    },
    roleId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Role'
    }
});

var AdminRole = mongoose.model('adminRole', adminRoleSchema);

// make this available to our roles in our Node applications
module.exports = AdminRole;
