import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.models.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
  
const resisterUser=asyncHandler(async(req,res)=>{
     //get user details from frontend
    //  validation not empty
    // check if user already
    // check for image,avtar
    // upload them to cloudinary avtar
    // creat user object-creat entry in db
    // remove password and refresh token from response
    // check for the user creation
    // return response

    const {username,password,email,fullname}=req.body
    console.log("username",username);
    console.log("password",password)
    if(
        [fullname,password,email,username].some((field)=>
            field?.trim()=="")
        ){

            throw new ApiError(400,"all entry is required")
        }
      const existedUser=  User.findOne({
          $or:[{username},{email}]
        })
         if(existedUser){
            throw new ApiError(409,"user with email or username already exists")
         }
     const avtarLocalPath= req.files?.avatar[0]?.path
    const coverImageLocalPath=req.files?.coverImage[0]?.path
  if (!avtarLocalPath) {
    throw new ApiError(404,"avtar is compulsory")
  }

   const avtar= await uploadOnCloudinary(avtarLocalPath)
   const coverImage=await uploadOnCloudinary(coverImageLocalPath)
if(!avtar){
    throw new ApiError(404,"avtar is compulsory")
}

    const user=await User.create({
    fullname,
    avtar:avtar.url,
    coverImage:coverImage?.url ||"",
    email,
    username:username.toLowercase()
})
  const createdUser=await User.findById(user._id).select(
    "-password -refreshToken"
  )
  if(!createdUser){
    throw new ApiError(502,"somthing went wrong")
  }
   return res.status(200).json(
        new ApiResponse(201,createdUser,"user resister succesfully")
   )

})
 export {resisterUser}