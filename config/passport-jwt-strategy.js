const passport = require('passport');

const passportJWTStrategy = require('passport-jwt').Strategy

const extractJWT = require('passport-jwt').ExtractJwt
const User = require("../model/user");

const opts = {
    jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: "codeial"

}

passport.use(new passportJWTStrategy(opts,function(jwtPayload,done){
    User.findById(jwtPayload._id,function(err,user){
        if(err){
            console.log(err,"Error occoured");
            return;
        }
        if(user){
            console.log(user,"from config");
            return done(null,user);
        }else{
            return done(null,false);
        }
    });
}));

module.exports = passport;