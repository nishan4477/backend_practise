import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  //get the user detail from the front end
  //validation- not empty
  //check if user already exists: username, email
  //check for the images, check for the avatar
  //upload them to cloudinary,avatar
  //create user object - create entry in db
  //remove the pasword and refresh token from the response
  //check for the user creation
  //return the res

  const { fullName, email, username, password } = req.body;
  console.log("reqBody", req.body);
  if (
    [fullName, email, username, password].some((field) => field.trim() === "")
  ) {
    throw new ApiError(400, "All field is required");
  }

  const existedUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path
  // const coverImageLocalPath = req.files?.coverImage[0]?.path
let coverImageLocalPath;

if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0){
  coverImageLocalPath = req.files.coverImage[0].path
}

  if(!avatarLocalPath){
    throw new ApiError(400, "Please upload the avatar")
  }


 const avatar=await uploadCloudinary(avatarLocalPath)
 const coverImage = await uploadCloudinary(coverImageLocalPath)


 if(!avatar){
    throw new ApiError(400, "Avatar is required")
 }

 const user = await User.create(
    {
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        username:username?.toLowerCase(),
        password
    }

)

const createdUser = await  User.findById(user._id).select("-password -refreshToken")


if(!createdUser){
    throw new ApiError(500,"something went wrong while while registering the user")
}


return res.status(201).json(
    new ApiResponse(200,createdUser,"User register successfully")

)

});

export { registerUser };


