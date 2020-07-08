const express = require("express");
const port = 8000;

const app = express();
const db = require("./config/mongoose");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require('cookie-parser');
app.use(expressLayouts);
app.use(express.urlencoded());
app.use(cookieParser())
app.use(express.static("./assets"));
//set view engine and set the view folder
app.set("view engine","ejs");
app.set("views","views");
// extract styles and scripts from sub pages into layouts
app.set("layout extractStyles",true);
app.set("layout extractScripts", true)
//use express router

app.use("/",require("./routes/index"));
app.listen(port,function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log("serven is up on and running on port number",port);
})