const Comment = require("../model/comments");
const Post = require("../model/posts");
const commentMailer = require('../mailers/comments_mailers');
const Like = require("../model/likes");
const emailWorker = require("../workers/comments_worker");
const queue = require('../config/kue');
module.exports.create = async function(req,res){
    
    try{
        let post = await Post.findById(req.body.post);
        
        if(post){
            let comment = await Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            })
            
           post.comments.push(comment);
                
            post.save();

            comment = await comment.populate("user","name email").execPopulate();
            //commentMailer.newComment(comment);
            let job = queue.create('emails',comment).save(function(err){
                if(err){
                    console.log(err,"error");
                }

                console.log(job.id);
            })
            if(req.xhr){
                
                
                
                return res.status(200).json({
                    data:{
                        comment:comment
                    },
                    message:"posted comment"
                });
            }   
                
            res.redirect("/")
        }
    }
    catch(err){
        console.log(err);
    }
    
    
}

module.exports.destroy = async function(req,res){
    try{
    
    let comment = await Comment.findById(req.params.id) 
    
    let search = comment.post;
       
    let post = await Post.findById(search);
        
        if(comment.user == req.user.id || post.user == req.user.id){
            
            let postId = comment.post;
            
            Like.deleteMany({_id : {$in : comment.like}})
            comment.remove();
            
            
            
            let post = await Post.findByIdAndUpdate(postId, { $pull: {comments:req.params.id}},{new:true});
            
                
                if(req.xhr){
                    
                    return res.status(200).json({
                        data:{
                            comment_id: comment._id
                        },
                        message:"comment deleted sucessFully"
                    });
                }

                return res.redirect("back");
                
        }else{
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err,"error in deleting the comment");
        return;
    }      
}