const Post =require("../model/posts");
const passport = require("passport");
const Comments = require("../model/comments");
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

module.exports.destroy = function(req,res){
    
    Post.findById(req.params.id,function(err,post){
        console.log(post,"test")
        if(post){
            if(post.user == req.user.id){
                post.remove()
                Comments.deleteMany({post:req.params.id},function(err){
                    return res.redirect("/");
                })
            }
        }else{
            return res.redirect("/")
        }
    })
}