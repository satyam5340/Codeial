const Post = require("../../../model/posts");
const Comments = require("../../../model/comments");
module.exports.index = async function(req,res){
    let post = await Post.find({})
    
    .sort("-createdAt")
    .populate("user")
    .populate({
        path:"comments",
        populate:{
            path:"user"
        }
    })
    
    
    return res.json(200,{
        message:"list of posts",
        posts:post
    })
}

module.exports.destroy = async function(req,res){
    try{
        
        let post = await Post.findById(req.params.id);
        console.log(post,"post from destroy");
        console.log(req.user,"from destroy");
        if(post.user == req.user.id){
            post.remove()
            await Comments.deleteMany({post:req.params.id})
            
            
            // if(req.xhr){
                

                
            //     return res.status(200).json({//here i am trying to send the axaj json data to the view for the id to the view now see what hapens
            //         data:{
            //             post_id:req.params.id
            //         },
            //         message:"Post Deleted",
                    
            //     });
                
            // }
            return res.json(200,{
                message:"Post Deleted Sucessfully"
            });
        }else{
            return res.json(401,{
                message:"unauthorized"
            })
            
        
    }

    
        
    
    }catch(err){
        console.log(err);
        return res.json(500,{
            message:"internal server error"
        });
    }
    
    
}