const AppError = require("../utils/AppError");
const cloudinary = require("../config/cloudinary");

exports.uploadImage = async (buffer, folder) => {
  try {
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder, resource_type: "image" },
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      ).end(buffer);
    });

    return {
      secureUrl: uploadResult.secure_url,
      publicID: uploadResult.public_id,
    };
  } catch (err) {
    throw new AppError(err.message, err.http_code);
  }
};