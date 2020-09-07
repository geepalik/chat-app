import cloudinary from 'cloudinary'
import dotenv from 'dotenv';
dotenv.config();

export default function fileUploadMiddleware(req, res, next) {
  if(!req.file){
    res.status(204);
  }else{
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    cloudinary.uploader.upload_stream((result) => {
      res.status(201).json({user_avatar_url: result.secure_url});
    }).end(req.file.buffer);
  }
};