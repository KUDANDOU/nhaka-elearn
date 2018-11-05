var nodemailer = require('nodemailer');
var config = require("../config/config");

var transporter = nodemailer.createTransport({service: config.SMTP_SERVICE,
    auth: {
        student: config.SMTP_student,
        pass: config.SMTP_PASSWORD
    }
});

exports.sendForgotPasswordLink = function(student)
{
    //console.log(student, "Hello Mohit");
    if(student)
    {
        var link = config.FRONT_ADMIN_URL +'resetpassword/'+ student._id;
        var content = '<div style="backgound:#f5f5f5;padding:10px;text-align:center;"><p>Hi <b>'+student.firstname+'</b></p><p>To complete the forgot password process, please click <a href="'+link+'">Here</a></p></div>';
        var subject = 'Nhaka E-Learning, forgot password email';
        sendmail(student.email,subject,content);
    }
};

exports.welcomeRegisterEmail = function(student)
{
    if(student)
    {
        var linkregister = config.FRONT_ADMIN_URL;
        var content = '<div style="backgound:#f5f5f5;padding:10px;text-align:center;"><p>Hi <b>'+student.firstname+'</b></p><p>You have successfully Register on <a href="'+linkregister+'">Nhaka E-Learning</a></p></div>';
        var subject = 'Nhaka E-Learning welcome email';
        sendmail(student.email,subject,content);
    }
};

//mail type is html or text
function sendmail(to,subject,content)
{
    from = 'no-reply@test.com';
    var mailOptions =
        {
            from: from,
            to: to,
            subject: subject,
            html: content
        };

    transporter.sendMail(mailOptions, function(error, info)
    {
        if (error)
        {
            console.log(error);
        }
        else
            {
                //console.log('Email sent: ' + info.response);
            }
    });

}
