const nodeMailer = require("../config/nodemailer");

// module.exports = newComment
//THis is another way of exporting a method we can write in simple way as,
exports.newComment = (comment) => {
    console.log('inside newComment mailer');


    nodeMailer.transporter.sendMail({
        from : 'subhampawar41599@gmail.com',
        to : comment.user.email,
        subject: "New comment published",
        html : '<h1>Yup, Your comment is now published</h1>'
    }, (err, info) => {
        if(err){
            console.log('Error in sending mail', err);
            return;
        }
        console.log('Message sent', info);
        return;
    });
}


