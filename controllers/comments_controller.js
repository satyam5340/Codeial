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

module.exports.destroy = function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        
        if(err){
            console.log(err);
            return;
        }
       
            
        Post.findById(comment.post,function(err,post){
        
        if(comment.user == req.user.id || post.user == req.user.id){
            
            let postId = comment.post;
            comment.remove()
            Post.findByIdAndUpdate(postId,{$pull: {comments:req.params.id}},function(err,post){
                
                if(err){
                    console.log("error in updating the comments list",err);
                    return;
                }
                return res.redirect("/")
            })
        }else{
            return res.redirect("/");
        }
    });
});
    
        
}