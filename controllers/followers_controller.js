const User = require('../model/user');
const Follow = require("../model/follow");


module.exports.toggleFollow = async function(req,res){

    try{
        
        
        let alreadyFollowing = false;
        let sender = await User.findById(req.user.id);
        let followExisit = await Follow.findOne({
            from_user:req.user._id,
            to_user:req.query.to
        });
        console.log(sender,"sender")
        console.log(followExisit,"followExisit")
        
    
        if(!followExisit){
            let newFollow = await Follow.create({
            from_user:req.user._id,
            to_user:req.query.to
            });
            console.log("inside if")
            sender.followers.push(req.query.to);
            
            sender.save();
            console.log(sender.followers);
        }else{
            console.log("inside else")
            alreadyFollowing = true;
            sender.followers.pull(req.query.to);
            sender.save();
            followExisit.remove();
            followExisit.save();
            
        }

        return res.redirect("back");
        
    }catch(err){
        console.log(err);
        return res.json(500,{
            message:"Internal Server Error"
        })
    }
}
