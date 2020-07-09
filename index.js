const express = require("express");
const port = 8000;

const app = express();
const db = require("./config/mongoose");
const expressSession = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require('cookie-parser');
const passport = require("passport");

const passportLocal = require("./config/passport-local-strategy");
app.use(expressLayouts);
app.use(express.urlencoded());
app.use(cookieParser())
app.use(express.static("./assets"));
//set view engine and set the view folder
app.set("view engine","ejs");
app.set("views","views");

app.use(expressSession({
    name:"session",
    //TODO change the secret before deployment 
    secret:"blahSomething",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    }

}))
// extract styles and scripts from sub pages into layouts
app.set("layout extractStyles",true);
app.set("layout extractScripts", true)
//use express router
app.use(passport.initialize());
app.use(passport.session());
app.use("/",require("./routes/index"));
app.listen(port,function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log("serven is up on and running on port number",port);
})