const Comment = require("../model/comments");
const Post = require("../model/posts");

module.exports.create = function(req,res){
    
    Post.findById(req.body.post,function(err,post){
        if(err){
            console.log(err);
            return;
        }
        
        if(post){
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            },function(err,comment){
                if(err){
                    console.log(err);
                    return;
                }
                post.comments.push(comment);
                post.save();
                return res.redirect("/");
            })
        }else{
            return res.redirect("/");
        }
    })
    
}