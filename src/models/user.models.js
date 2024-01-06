import mongoose, { Schema } from "mongoose";
import { Jwt } from "jsonwebtoken";
import bcrypt from "bcrypt"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        index:true
    },
    fullname:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        
    },
    password:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        index:true
    },
    refreshTocken:{
        type:String,
    }
},{timestamps:true})
//    userSchema.plugin(mongooseAggregatePaginate)

   userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
       this.password=bcrypt.hash(this.password,10)
    })
    userSchema.method.isPasswordCorrect=async function(password){
   return await  bcrypt.compare(password,this.password)
    }
   
    userSchema.methods.generateAccessToken=function(){
        Jwt.sign(
            {
                _id:this.id,
                email:this.email,
                username:this.username,
                password:this.password
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn:process.env.ACCESS_TOKEN_EXPIRE
            }
        )
    }
     userSchema.methods.generateRefreshToken=function(){
        return  Jwt.sign(
            {
                _id:this.id,
               
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn:process.env.ACCESS_TOKEN_EXPIRE
            }
        )
     }

  export const User=mongoose.model("User",userSchema)