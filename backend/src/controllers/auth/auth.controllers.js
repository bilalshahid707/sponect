const User = require('../../models/user.model')
const Sponsor = require('../../models/sponsor.model')
const Sponsee = require('../../models/sponsee.model')
const jwt = require('jsonwebtoken')
const catchAsync = require('../../utils/CatchAsync')
const AppError = require('../../utils/AppError')
const bcrypt = require('bcryptjs')
const sendMail = require('../../config/email')

const signToken = (user) => {
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRESIN })
    return token
}

const cookieOptions = {
    expires: new Date(
        Date.now() + Number(process.env.JWT_COOKIE_EXPIRES_IN) * 86400000
    ),
    httpOnly: true,
    secure: true,
    sameSite: 'none'
};

exports.signup = catchAsync(async (req, res) => {
    const { username,email,password,role } = req.body
    const newUser = await User.create({ username, email, password,role })

    if(role==="sponsor"){
        await Sponsor.create({ userId: newUser.id })
    } else if(role==="sponsee"){
        await Sponsee.create({ userId: newUser.id })
    }

    const token = signToken(newUser)
    // sendMail(newUser, {
    //     subject: "Welcome to Sponect",
    //     body: {
    //         fullName: newUser.fullName,
    //         year: new Date().getFullYear()
    //     }
    // }, "welcomeEmail")

    res.cookie('jwt', token, cookieOptions)
    res.status(201).json({
        status: "success",
        data: {
            user: newUser,
            token: token
        }
    })
})

exports.signin = catchAsync(async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        return next(new AppError("Please enter email or password", 400))
    }

    const user = await User.findOne({ where: { email: email } })
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = signToken(user)
        res.cookie('jwt', token, cookieOptions)
        res.status(200).json({
            status: "success",
            data: {
                user: user,
                token: token
            }
        })
    } else {
        return next(new AppError("Invalid email or password", 404))
    }
})

exports.signout = catchAsync(async (req, res, next) => {
    const cookieOptions = {
        expires: new Date(Date.now() + 5 * 1000),
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    };
    res.cookie('jwt', 'loggedOut', cookieOptions);
    res.status(200).json({ status: 'success' });
});
