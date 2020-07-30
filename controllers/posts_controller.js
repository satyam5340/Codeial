const Post =require("../model/posts");
const Like = require('../model/likes');

const Comments = require("../model/comments");
module.exports.create = async function(req,res){
    
    try{
        let post = await Post.create({
            content:req.body.content,
            user:req.user._id
        });

        
        
        if(req.xhr){
            
            post = await post.populate("user","name").execPopulate();
            
            
            return res.status(200).json({
                data:{
                    
                    post:post
                    
                },
                Message:"post published",
                success:"Post Published"
            });
        }

        
        return res.redirect("back");

    }catch(err){
        console.log(err,"Error Occoured");
        return res.redirect("back");
    }
 
}

module.exports.destroy = async function(req,res){
    try{
        
    let post = await Post.findById(req.params.id)

    

    
        if(post.user == req.user.id){
            
            await Like.deleteMany({likable:post.id,onModel:"Post"});
            
            for(let i = 0; i < post.comments.length;i++){
                await Like.deleteMany({likable:post.comments[i],onModel:"Comment"})
            }
            post.remove()
            await Comments.deleteMany({post:req.params.id})
            if(req.xhr){

                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:"Post Deleted",
                    
                });
                
            }
            return res.redirect("back");
        }else{
            return res.redirect("/")
    
    }
    }catch(err){
        console.log(err);
        return res.redirect("back");
    }  
}