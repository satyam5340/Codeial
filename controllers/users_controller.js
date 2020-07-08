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
    //TODO later
}
module.exports.createSession = function(req,res){
    //TODO later
}
