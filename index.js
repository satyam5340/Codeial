const express = require("express");
const port = 8000;

const app = express();

//use express router

app.use("/",require("./routes/index"));
app.listen(port,function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log("serven is up on and running on port number",port);
})