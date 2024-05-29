import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({ 
    cloud_name:process.env.CLOUDINARY_API_NAME , 
    api_key: process.env.CLOUDINARY_API_KEY , 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
});


const uploadCloudinary = async (localFilePath)=>{
    try{
        if(!localFilePath) return null
        //upload the file ion cloudinary
       const cloudinaryResponse = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        })
        //file has been uploaded successfuly then
        console.log("file have been sucessfully uploaded")
        return cloudinaryResponse;
    }catch(error){
        console.log(error)
        fs.unlinkSync(localFilePath)
        //remove the locally save temporary file.
    }
}



export {uploadCloudinary}