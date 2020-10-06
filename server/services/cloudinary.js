const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadStream = (stream) => {
  return new Promise((resolve, reject) => {
    const saveStream = cloudinary.uploader.upload_stream((error, output) => {
      if (error) reject(error);
      resolve(output.secure_url);
      console.log("output.secure_url", output.secure_url);
    });

    stream.pipe(saveStream);
  });
};

module.exports.saveToCloudinary = async (stream) => {
  const fileURL = await uploadStream(stream).catch((error) => {
    throw Error(error);
  });

  console.log("fileURL", fileURL);

  return fileURL;
};
