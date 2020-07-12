const Post = require('../model/posts');
const User = require("../model/user");
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
        User.find({},function(err,user){
            
            return res.render("home",{
                title:"Codeial||Home",
                posts:post,
                users:user
                
            })

        })
        
    })

    
    

}