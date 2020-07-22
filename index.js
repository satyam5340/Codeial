const express = require("express");
const port = 8000;

const app = express();
const db = require("./config/mongoose");
const expressSession = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require('cookie-parser');
const passport = require("passport");
const mongoStore = require("connect-mongo")(expressSession);
const passportLocal = require("./config/passport-local-strategy");
const JwtStrategy = require("./config/passport-jwt-strategy");
const sassMiddleware = require("node-sass-middleware");
const flash = require("connect-flash");
const customMware = require("./config/middleware");
app.use(sassMiddleware({
    src:"./assets/scss",
    dest:"./assets/css",
    debug:true,
    outputStyle:"extended",
    prefix:"/css"
}))
app.use(expressLayouts);
app.use(express.urlencoded());
app.use(cookieParser())
app.use(express.static("./assets"));
//set view engine and set the view folder
app.set("view engine","ejs");
app.set("views","views");
//mongostore is used to store session cookie
app.use(expressSession({
    name:"session",
    //TODO change the secret before deployment 
    secret:"blahSomething",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: new mongoStore({
        mongooseConnection: db,
        autoRemove:"disabled"
    },function(err){
        console.log(err || "connect")
    })

}))
// extract styles and scripts from sub pages into layouts
app.set("layout extractStyles",true);
app.set("layout extractScripts", true)
//use express router
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);
app.use("/uploads",express.static(__dirname+"/uploads"));
app.use("/",require("./routes/index"));
app.listen(port,function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log("serven is up on and running on port number",port);
})