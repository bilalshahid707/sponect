const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorMiddleware");
const morgan = require("morgan")
// Importing routers
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes")
const sponsorRouter = require('./routes/sponsor.routes')
const sponseeRouter = require('./routes/sponsee.routes')
const pitchRouter = require('./routes/pitch.routes')
const socialRouter = require('./routes/social.routes')
const contactRouter = require("./routes/contact.routes")

const app = express()

app.use(morgan('dev'))

app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))

// Body Parser
app.use(cookieParser())
app.use(express.json())

// Header security
app.use(helmet())

// app.use(sanitize({
//     onSanitize: ({ req, key }) => {
//       console.warn(`This request[${key}] is sanitized`, req);
//     }
// }))


// Using routers
app.use("/api/v1/auth",authRouter)
app.use("/api/v1/users",userRouter)
app.use("/api/v1/sponsors",sponsorRouter)
app.use("/api/v1/sponsees",sponseeRouter)
app.use("/api/v1/socials",socialRouter)
app.use("/api/v1/contacts",contactRouter)
app.use('/api/v1/pitches',pitchRouter)



app.use(errorHandler)

module.exports = app
