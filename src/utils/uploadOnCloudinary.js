import { v2 as cloudinary } from "cloudinary";

export const uploadOnCloudinary = async (file, folder) => {
  const buffer = await file.arrayBuffer();
  const buytes = new Buffer.from(buffer);
  return new Promise(async (resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
          folder: folder,
        },
        async (err, result) => {
          if (err) {
            reject(err.message);
          }
          resolve(result);
        },
      )
      .end(buytes);
  });
};
