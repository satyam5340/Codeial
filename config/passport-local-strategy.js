const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require("../model/user");
//authentication using passport 
passport.use(new LocalStrategy({
    usernameField:"email"
},
function(email,password,done){
    //find a user and establish identity
    User.findOne({email:email},function(err,user){
        if(err){
            console.log(err);
            return done(err);
        }
        if(!user || user.password != password){
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


module.exports = passport;