const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport(
    
    {

        //now run its gone //thanks justy eah :)
        // wait let me check .. okay i doubt does the app name in 2 factor auth needs to be same as the registered name of the app in the oauth registration  try this okay lemme try it
    //you looking into it
// open google chrome..okay  save the file and run open browser
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user: "satyampd5340@gmail.com",
        pass:"djydjwncfotvgtvo",
        
    }
    
});

let renderTemplate = (data,relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){
                console.log('error in rendering template',err);
                return;
            }
            mailHTML = template;
        }
    )
    return mailHTML;
}

module.exports = {
    transporter:transporter,
    renderTemplate:renderTemplate
}