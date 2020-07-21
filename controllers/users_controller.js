const User = require("../model/user");
const fs = require("fs");
module.exports.profile = function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render("user_profile",{
            title:"codeial || profile",
            profile_user:user
        })
    })
    
}
module.exports.update = async function(req,res){
    
    // if(req.user.id == req.params.id){

    //     User.findByIdAndUpdate(req.params.id,{name:req.body.name,email:req.body.email},function(err,user){
    //         return res.redirect("/");
    //     });
        
    // }
    // else{
    //     return res.status(401)
    // }

    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);

            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log(req.file);
                    console.log(err,"error occoured");
                    return;
                }
                

                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){
                    if(user.avatar){
                        fs.unlinkSync(__dirname,"..",user.avatar);
                    }
                    

                    user.avatar = User.avatarPath+"/"+req.file.filename;
                }
                user.save();
                return res.redirect("back");
            })
        }catch(err){
            console.log("Error",err);
        }
    }else{
        return res.redirect('back');
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
    
    if(req.user){
        return res.redirect("/");
    }
    else{
        return res.render("users_sign_in",{
            title:"Codeial||sign_in"
        })
    }
    
}
module.exports.create = async function(req,res){
    
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    let user = User.findOne({email:req.body.email},function(err,user){
        
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
    
    req.flash('success','logged in Successfully')
    return res.redirect("/");
}
module.exports.destroy = function(req,res){
    req.logout();
    req.flash('success','logged out Successfully')
    return res.redirect("/users/sign-in");
}
