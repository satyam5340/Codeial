const passport = require('passport');

const googleStrategy = require('passport-google-oauth').OAuth2Strategy;

const crypto = require('crypto');

const User = require('../model/user');

passport.use(new googleStrategy({
    clientID: "67219905018-45oevsjfeqhm2r5bk0n12bg6k7vdp1aa.apps.googleusercontent.com",
    clientSecret: "KffEERF7TON6Cij4cjFocFRr",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
},

    function(accessToken,refreshToken,profile,done){
        User.findOne({email:profile.emails[0].value},function(err,user){
            if(err){
                console.log(err,"Error in finding the user google strategy");
                return;
            }

            console.log(profile);

            if(user){
                return done(null,user);
            }else{
                User.create({
                    email:profile.emails[0].value,
                    name:profile.displayName,
                    password:crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){
                        console.log(err,"Error in creatingthe user google strategy");
                        return;
                    }
                    return done(null,user);
                })
            }

        })
    }

));

module.exports = passport