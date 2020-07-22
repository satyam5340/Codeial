const Post = require('../model/posts');
const User = require("../model/user");
module.exports.home = async function(req,res){
   try{
    let post = await Post.find({})
    
    .sort("-createdAt")
    .populate("user")
    .populate({
        path:"comments",
        populate:{
            path:"user"
        }
    })
    
    let user = await User.find({})
    return res.render("home",{
        title:"Codeial||Home",
        posts:post,
        users:user
    })    
   }catch(err){
       console.log("Error",err);
       return;
   } 
    

}