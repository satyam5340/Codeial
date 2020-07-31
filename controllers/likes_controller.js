const Post = require('../model/posts');
const Comment = require('../model/comments');
const  Like = require('../model/likes');

module.exports.toogleLike = async function(req,res){
    try{
        let likable;
        let deleted = false;
        
        if(req.query.type == 'Post'){
            likable = await Post.findById(req.query.id).populate('like');
        }else{
            likable = await Comment.findById(req.query.id).populate('like');
        }
        
        let existingLike = await Like.findOne({
            user:req.user._id,
            likable:req.query.id,
            onModel:req.query.type
        });
        if(existingLike){
            console.log(likable.like)
            likable.like.pull(req.query._id);
            likable.save();

            existingLike.remove();
            deleted = true;
        }else{
            
            let newLike = await Like.create({
                user:req.user._id,
                likable:req.query.id,
                onModel:req.query.type
            });
            likable.like.push(newLike._id);
            
            likable.save();
            console.log(likable.like)
        }
        return res.json(200,{
            message:"Like saved successfully",
            data:{
                deleted:deleted
            }
        })
    }catch(err){
        console.log(err);
        return res.json(500,{
            message:"internal server error"
        })
    }

    
}