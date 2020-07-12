const User = require("../model/user");
module.exports.profile = function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render("user_profile",{
            title:"codeial || profile",
            profile_user:user
        })
    })
    
}
module.exports.update = function(req,res){
    console.log(req.user.id == req.params.id)
    if(req.user.id == req.params.id){

        User.findByIdAndUpdate(req.params.id,{name:req.body.name,email:req.body.email},function(err,user){
            return res.redirect("/");
        });
        
    }
    else{
        return res.status(401)
    }
}
//sign_up
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect("/users/profile");
    }

    return res.render("users_sign_up",{
        title:"Codeial||sign_up"
    })
}
module.exports.signIn = function(req,res){
    
    if(req.isAuthenticated()){
        
        return res.redirect("/");
    }
    else{
        return res.render("users_sign_in",{
            title:"Codeial||sign_in"
        })
    }
    
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
    

    return res.redirect("/");
}
module.exports.destroy = function(req,res){
    req.logout();
    return res.redirect("/users/sign-in");
}
