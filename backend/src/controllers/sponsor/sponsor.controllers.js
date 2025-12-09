const Sponsor = require('../../models/sponsor.model')
const catchAsync = require('../../utils/CatchAsync')
const AppError = require('../../utils/AppError')

exports.getSponsor = catchAsync(async (req, res, next) => {
    const { id: userId } = req.user 
    const sponsor = await Sponsor.findOne({ where: { userId: userId } })
    if (!sponsor) {
        return next(new AppError("no sponsor found with this user id", 404))
    }
    res.status(200).json({
        status: "success",
        data: sponsor
    })
})

exports.updateSponsor = catchAsync(async (req, res, next) => {
    const { id: userId } = req.user

    const allowedFields = [
        "organizationName",
        "organizationDescription",
        "industry",
        "website",
        "socialLinks",
        "budgetRange",
        "preferences",
        "logo",
        "status",
    ];

    const keys = Object.keys(req.body).filter(key => allowedFields.includes(key))
    const filteredBody = {}
    keys.forEach(key => {
        filteredBody[key] = req.body[key]
    })
    // setting profile image
    if(req.image){
        filteredBody["logo"]=req.image
    }

    const sponsor = await Sponsor.findOne({ where: { userId: userId } })
    if (!sponsor) {
        return next(new AppError("no sponsor found with this user id", 404))
    }
    await sponsor.update(filteredBody)

    res.status(200).json({
        status: "success",
        data: sponsor
    })

})