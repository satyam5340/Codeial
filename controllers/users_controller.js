const User = require("../model/user");
module.exports.profile = function(req,res){
    return res.render("user_profile",{
        title:"UserProfile"
    })
}
//sign_up
module.exports.signUp = function(req,res){
    return res.render("users_sign_up",{
        title:"Codeial||sign_up"
    })
}
module.exports.signIn = function(req,res){
    return res.render("users_sign_in",{
        title:"Codeial||sign_in"
    })
}
module.exports.create = function(req,res){
    
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        
        if(err){
            console.log(err);
            return;
        }
        
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log(err);
                    return;
                }
                
                return res.redirect('/users/sign-in'); 
            })
        }else{
            return res.redirect('back');
        }
    })
}
module.exports.createSession = function(req,res){
    //TODO later
}
