// import mongoose from "mongoose"
import dotenv from "dotenv";

import connectDb from "./db/index.js";

dotenv.config({
    path: './env'
})
connectDb()









// first approach to connect database

//   const app=express();
//     ;(async ()=>{
//         try{
//             await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//       app.on("error",(error)=>{
//      console.log(error);
//       })
//      app.listen(process.env.PORT,()=>{
//         console.log(`app is listening${process.env.PORT}`);
//      })



//         }catch(error){
//             console.log(error);
//         }
//     } )
