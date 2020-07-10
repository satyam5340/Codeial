const Post = require('../model/posts');

module.exports.home = function(req,res){
    Post.find({})
    .populate("user")
    .populate({
        path:"comments",
        populate:{
            path:"user"
        }
    })
    .exec(function(err,post){
        
        if(err){
            console.log(err);
            return;
        }
        return res.render("home",{
            title:"Codeial||Home",
            posts:post
            
        })
    })

    
    

}