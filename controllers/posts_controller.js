const Post =require("../model/posts");
const passport = require("passport");
module.exports.create = function(req,res){

Post.create({
    content:req.body.content,
    user:req.user._id
},function(err,post){
    if(err){
        console.log(err);
        return;
    }
    return res.redirect("/");
}
)
}