const AppError = require("../utils/AppError");
const cloudinary = require("../config/cloudinary");

exports.uploadImage = async (
  buffer,
  folder,
) => {
  try {
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder,
            resource_type: "image",
            allowed_formats: ['jpg','png','webp'],
            size_limit: 5 * 1024 * 1024,
          },
          (err, result) => {
            if (err) return reject(new AppError(err.message, err.http_code));
            resolve(result);
          }
        )
        .end(buffer);
    });

    return {
      secureUrl: uploadResult.secure_url,
      publicID: uploadResult.public_id,
    };
  } catch (err) {
    throw new AppError(err.message, err.http_code);
  }
};

exports.uploadDocument = async (buffer, folder) => {
  try {
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder,
            resource_type: "raw",
            allowed_formats: ["pdf"],
            size_limit: 10 * 1024 * 1024,
          },
          (err, result) => {
            if (err) return reject(new AppError(err.message, err.http_code));
            resolve(result);
          }
        )
        .end(buffer);
    });
    return {
      secureUrl: uploadResult.secure_url,
      publicID: uploadResult.public_id,
    };
  } catch (err) {
    throw new AppError(err.message, err.http_code);
  }
};

exports.deleteResource = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
    console.log("Resource deleted successfully");
  } catch (err) {
    throw new AppError(err.message, err.http_code);
  }
};
