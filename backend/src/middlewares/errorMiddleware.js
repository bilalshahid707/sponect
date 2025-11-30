const AppError = require('../utils/AppError')

const handleDuplicateFieldsError = (err)=>{
    const key = Object.keys(err.fields)[0]
    const value = err.fields[key]
    const msg = `${key}: ${value} already exists`

    return new AppError(msg,409)

}

const handleValidationError = (err)=>{
    let msg
    if (err.errors[0].type==="notNull violation"){
        msg=`${err.errors[0].path} required`
    } else if (err.errors[0].type==="Validation error"){
        msg=`Invalid ${err.errors[0].path}`
    }
    return new AppError(msg,400)
}

const handleInavlidToken = (err)=>{
    return new AppError("Invalid Token",400)
}

const handleMulterError = (err)=>{
    if(err.code==="LIMIT_UNEXPECTED_FILE"){
        return new AppError("Too many files are uploaded",400)
    }
}


// Sending Errors
const sendErrorDev = (err,req,res,next)=>{
    if (err.isOperational){
        
        res.status(err.statusCode).json({
            status:err.status,
            message:err.message,
            error:err
        })
    }else{
        console.log(err)
        res.status(500).json({
            status:'error',
            message:'something went wrong',
            error:err,
            name:err.name
        })
    }
}

const sendErrorProd = (err,req,res,next)=>{
    if (err.isOperational){
        
        res.status(err.statusCode).json({
            status:err.status,
            message:err.message
        })
    }else{
        res.status(500).json({
            status:'error',
            message:'something went wrong'
        })
    }
}

const errorMiddleware = (err,req,res,next)=>{
    if (err.name==="SequelizeUniqueConstraintError") err=handleDuplicateFieldsError(err)
    if (err.name==="SequelizeValidationError") err=handleValidationError(err)
    if (err.name==="JsonWebTokenError") err=handleInavlidToken(err)
    if (err.name==="MulterError") err=handleMulterError(err)

    if (process.env.NODE_ENV==="development"){
        sendErrorDev(err,req,res,next)
    }else{
        sendErrorProd(err,req,res,next)
    }
}

module.exports = errorMiddleware
