const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path');

//sends the email
let transporter = nodemailer.createTransport({
    service : 'gmail',
    host : 'smtp.gmail.com',
    port : 587,
    secure:false,
    auth:{
        user : 'ritikdigital12@gmail.com',
        pass : 'ritik123#'
    }
});


let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile (
        path.join(__dirname, '../views/mailers, relativePath'),
        data,
        function(err, template){
            if(err){console.log('error in rendering template'); return }

            mailHTML = template;
        }
    )
    return mailHTML;
}

module.exports = {
    transporter : transporter,
    renderTemplate:renderTemplate
}