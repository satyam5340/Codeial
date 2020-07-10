const Post = require('../model/posts');

module.exports.home = function(req,res){
    Post.find({},function(err,post){
        return res.render("home",{
            title:"Codeial || Home",
            posts:post
        })
    })

}