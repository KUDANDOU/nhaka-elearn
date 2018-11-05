var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var transactionsSchema = new Schema({
   invoiceNumber:{
       Type: Number,
       required: true
   },
    email:{
       type: String,
        required: true
    },
    paymentMethod:{
       Type: String,
        required: true
    },
    item:{
       Type: String,
        required: true
    },
    mobileNumber:{
       type: Number,
        required: true
    },
    amount:{
       Type: String,
        required: true
    },
    paymentDate: Date,
    expiryDate: Date,
    paymentBy: {
        type: Schema.Types.ObjectId,
        ref: 'Student'
    },
});

var Transaction = mongoose.model("Transaction",transactionsSchema);

module.exports = Transaction;
