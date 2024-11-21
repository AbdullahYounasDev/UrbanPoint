/** @format */

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const DeleteOnCloudinary = async (public_id) => {
  try {
    const result = await cloudinary.api.delete_resources([public_id], {
      type: "upload",
      resource_type: "image",
    });
    return result; // Return the result so it can be used by the caller
  } catch (error) {
    throw new Error(`Cloudinary Error: ${error.message}`);
  }
};
