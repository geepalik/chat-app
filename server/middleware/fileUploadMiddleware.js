import cloudinary from 'cloudinary'
import dotenv from 'dotenv';
dotenv.config();

export default function fileUploadMiddleware(req, res, next) {
  if(!req.file){
    next();
  }else{
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    cloudinary.uploader.upload_stream((result) => {
      //add url to req and continue to next middleware
      req.image_url = result.secure_url;
      next();
    }).end(req.file.buffer);
  }
};