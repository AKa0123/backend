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
   userSchema.plugin(mongooseAggregatePaginate)
  export const User=mongoose.model("User",userSchema)