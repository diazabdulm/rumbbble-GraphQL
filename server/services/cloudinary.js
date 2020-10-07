const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports.saveFileToCloudinary = (readable) => {
  return new Promise((resolve, reject) => {
    const options = { allowed_formats: ["jpg", "png"] };

    const callback = (error, image) => {
      if (error) reject(error);
      resolve(image.secure_url);
    };

    const uploadStream = cloudinary.uploader.upload_stream(options, callback);
    readable.pipe(uploadStream);
  });
};
