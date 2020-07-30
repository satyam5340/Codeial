const nodemailer = require('../config/nodemailer');
//this is another way of exporting a method
exports.newComment = (comment) => {
    let htmlString = nodemailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');
    console.log(comment);
    nodemailer.transporter.sendMail({
        from:'satyampd5340@gmail.com',
        to: comment.user.email,
        subject:"new comment posted",
        html:htmlString
    },
    (err,info)=>{
        if(err){
            console.log("error in sending the mail",err);
            return;
        }

        console.log("mail is sent successfully");
        return;
    })
}
//save and run//the seeror is printed already save and run