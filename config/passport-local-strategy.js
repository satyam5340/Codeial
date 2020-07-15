const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require("../model/user");
//authentication using passport 
passport.use(new LocalStrategy({
    usernameField:"email",
    passReqToCallback:true
},
function(req,email,password,done){
    //find a user and establish identity
    User.findOne({email:email},function(err,user){
        if(err){
            req.flash('error','error occoured')
            console.log(err);
            return done(err);
        }
        if(!user || user.password != password){
            req.flash('error','invalid username/passsword')
            console.log("invalid username/passsword");
           return done(null,false); 
        }

        return done(null,user);
    })
}

))

//serializeing a user for cookie

passport.serializeUser(function(user,done){
    done(null,user.id);
});
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log(err);
            return;
        }
        return done(null,user);
    })
})

passport.checkAuthentication = function(req,res,next){
    if (req.isAuthenticated()){
        return next();
        
    }
    return res.redirect("/users/sign-in");
}
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the user from the cookie and we are just sending it to the locals for the view
        res.locals.user = req.user
        
    }
    next();
}

module.exports = passport;