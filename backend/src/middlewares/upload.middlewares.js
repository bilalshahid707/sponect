const catchAsync = require('../utils/CatchAsync')
const AppError = require('../utils/AppError')
const cloudinary = require('../config/cloudinary')

exports.uploadFile = catchAsync(async (req, res, next) => {

    if (!req.file) return next()

    const { buffer } = req.file

    if (req.user && req.user.profileImage) {
        try {
            const parsed = JSON.parse(req.user.profileImage)
            const publicID = parsed?.publicID
            if (publicID) {
                await cloudinary.uploader.destroy(publicID)
                console.log('Image deleted successfully')
            }
        } catch (err) {
            throw new AppError(err.message, err.http_code)
        }
    }

    await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({folder:"users",allowed_formats:["jpg","png"]},(err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        }).end(buffer);
    }).then((uploadResult) => {
        req.image = {
            secureUrl: uploadResult.secure_url,
            publicID: uploadResult.public_id,
        }
    }).catch((err) => {
        return next(new AppError(err.message, err.http_code))
    });

    next()

})