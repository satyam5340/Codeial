const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join("/uploads/users/avatar");
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true

    },
    password:{
        type:String,
        required:true

    },
    name:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    },
    followers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Follow'
        }
    ]
        
    
    
},{
    timestamps:true
})

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(path.join(__dirname,"..",AVATAR_PATH),"path");
      cb(null, path.join(__dirname,"..",AVATAR_PATH))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })

  //statics

  userSchema.statics.uploadedAvatar = multer({storage:storage}).single("avatar");
  userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model("User",userSchema);
module.exports = User;