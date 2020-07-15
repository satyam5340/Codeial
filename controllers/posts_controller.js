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

module.exports.destroy = async function(req,res){
    
    let post = await Post.findById(req.params.id);
    if(post){
        if(post.user == req.user.id){
            post.remove()
            await Comments.deleteMany({post:req.params.id})
            return res.redirect("/");
            
        }
    }
        
    else{
        return res.redirect("/")
    }
    
}