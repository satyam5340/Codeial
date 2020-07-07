const express = require("express");
const port = 8000;

const app = express();
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);
//set view engine and set the view folder
app.set("view engine","ejs");
app.set("views","views");
//use express router

app.use("/",require("./routes/index"));
app.listen(port,function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log("serven is up on and running on port number",port);
})