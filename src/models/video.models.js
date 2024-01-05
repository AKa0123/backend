import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
 const videoSchema=new Schema({
    video:{
        type:String,
        required:true
    },thumbnail:{
        type:String,
        required:true
    },title:{
        type:String
    },description:{
        type:String,
        required:true
    },owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
 })
   videoSchema.plugin(mongooseAggregatePaginate)
  export const Video=mongoose.model("Video",videoSchema)