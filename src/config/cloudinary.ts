import { v2 as cloudinary } from 'cloudinary';

export = cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KE,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
