const ErrorResponse = require("./errorResponse")


const checkRequiredFiled = (filed, message, code) => {
    if(!filed){
        throw new ErrorResponse(`Please Enter A ${message}`, code)
    }
}

module.exports = { checkRequiredFiled }