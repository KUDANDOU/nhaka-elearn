const Paynow = require("paynow");
const Transaction = require('../models/transaction');
const config = require("../config/config");

exports.payment = function(req, res, next)
{
    var response = {};
    req.checkBody("email", "Email is a required field").notEmpty();
    req.checkBody("email", "Email is not valid").isEmail();
    req.checkBody("invoiceNum", "Invoice Number is a required field.").notEmpty();
    req.checkBody("paymentMethod", "Payment Method is a required field.").notEmpty();
    req.checkBody("Item", "Item is a required field.").notEmpty();
    req.checkBody("amount", "Amount is a required field.").notEmpty();
    req.checkBody("mobileNumber", "Mobile Number is a required field.").notEmpty();
    req.checkBody("StudentID", "Student ID is a required field.").notEmpty();
    var errors = req.validationErrors();

    if(errors)
    {
        res.statusCode = 401;
        response = { "error" : "failure", "message" : errors[0].msg };
        return res.json(response);

    }
    else
    {
        var now = new Date();
        var expiryDate = addSubtractDate.add(now,30,"days");
        var email = req.body.email;
        var invoiceNumber = req.body.invoiceNum;
        var  paymentMethod = req.body.paymentMethod;
        var item = req.body.item;
        var amount = req.body.amount;
        var mobileNumber = req.body.mobileNumber;
        var studentID = req.body.studentID;

        //let testIntegrationId = '4198';
        //let testIntegrationKey = '5c74798d-f9b0-42e0-9a61-a48138a7189c';

        // Create instance of Paynow class
        //let paynow= new Paynow(testIntegrationId, testIntegrationKey);
        let paynow = new Paynow(config.INTEGRATION_ID, config.INTEGRATION_KEY);
        console.log(paynow);

        // Set return and result urls
        //paynow.resultUrl = "http://example.com/gateways/paynow/update";
        //paynow.returnUrl = "http://example.com/return?gateway=paynow";

        //let payment = paynow.createPayment("Invoice 007", "james@mailinator.com");
        let payment = paynow.createPayment(invoiceNumber, "sales@nhakaelearning.com");

        payment.add(item, amount);
        //payment.add("Glock 19", 5.49);
        console.log(payment);

        // Send off the payment to Paynow
        paynow.sendMobile(payment, mobileNumber, paymentMethod).then(response =>
        {
            // Check if request was successful
            if(response.success)
            {
                // Get the link to redirect the user to, then use it as you see fit
                let link = response.redirectUrl;

                // Save poll url, maybe (recommended)?
                let pollUrl = response.pollUrl;

                // Check the status of the transaction with the specified pollUrl
                // Now you see why you need to save that url ;-)
                let status = paynow.pollTransaction(pollUrl);

                if (status.paid())
                {
                    // Yay! Transaction was paid for
                    console.log('Went through');
                    res.send('successful');
                }
                else
                    {
                        console.log("Why you no pay?");
                    }

                var transactioncreate = new Transaction({
                    email: req.body.email,
                    invoiceNumber: req.body.invoiceNum,
                    paymentMethod: req.body.paymentMethod,
                    item: req.body.item,
                    amount: req.body.amount,
                    mobileNumber: req.body.mobileNumber,
                    paymentBy: req.body.studentID,
                    paymentDate: now,
                    expiryDate: expiryDate
                });

                transactioncreate.save(function(err,transaction)
                {
                    console.log("Error:"+err);
                    if (err)
                    {
                        res.statusCode = 401;
                        return res.json({"status": "failure", "statusCode": 401, "message": 'Error Recording Transaction', "result": err});
                    }
                    else
                    {
                        //mail.welcomeRegisterEmail(student);
                        res.statusCode = 200;
                        return res.json({"status": "success", "statusCode": 200, "message": "Transaction Logged Successfully", "result": transaction});
                    }
                });
            }
            else
                {
                    res.statusCode = 401;
                    response = {
                                "error" : "failure",
                                "message" : " Transaction Failed!!"
                                };
                    return res.json(response);
                }
        });
    }
};
