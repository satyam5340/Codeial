const Post = require('../model/posts');
const User = require("../model/user");
module.exports.home = async function(req,res){
   try{
    let post = await Post.find({})
    //bhai variable name change krne se kuch farak padta hai kya kyuki aap sirf like ko likes kr rahe ho merad
    .sort("-createdAt")
    .populate("user")
    
    .populate({
        path:"comments",
        populate:{
            path:"user"
        },
        populate:{
            path:'like'
        }
    }).populate('like')
    
    let user = await User.find({})
    console.log(post)
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