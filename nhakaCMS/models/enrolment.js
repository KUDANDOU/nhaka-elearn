var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var enrolmentSchema = new Schema({

});

var Enrolement = mongoose.model('Enrolment',enrolmentSchema);

module.exports = Enrolement;
