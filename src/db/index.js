   import mongoose from "mongoose"
   import { DB_NAME } from "../constants.js";

//    second approach to connect database

   const connectDb=async ()=>{
  try{
   const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
   console.log(`mongoodb connected ritika at ${connectionInstance.connection.host}`);
  }
  catch(error){
      console.log("connection failed",error);
      process.exit(1)
  }
   }
   export default connectDb