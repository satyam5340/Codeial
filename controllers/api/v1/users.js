const User = require("../../../model/user");
const jwt = require("jsonwebtoken");

module.exports.createSession =async function(req,res){
    
    

    try{
        let user = await User.findOne({email:req.body.email});
        console.log(user);
        if(!user || user.password != req.body.password){
            return res.json(422,{
                message: "invalid username/password"
                
            });
        }
        
        return res.json(200,{
            
            message:"sign in successfullt,here is yoy token please keep it safe",
            data:{
                
                token: jwt.sign(user.toJSON(),"codeial",{expiresIn:1000000000000})
            }
        })
    }catch(err){
        
        return res.json(422,{
            message:"internal server error"
            
        })
    }
}