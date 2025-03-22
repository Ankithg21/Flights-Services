const {StatusCodes} = require("http-status-codes");
const {ErrorResponse} = require("../utils/common/index.js");
const AppError = require("../utils/errors/app-error.js");

function validateCreateRequest(req,res,next){
    if(!(req.body.name)){
        ErrorResponse.message="Something went wrong while creating airport";
        ErrorResponse.error= new AppError(["Model Number is not found in the incoming request"],StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }

    if(!(req.body.code)){
        ErrorResponse.message="Something went wrong while creating airport code.";
        ErrorResponse.error= new AppError(["Airport Code not found in the incoming request"],StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }

    if(!(req.body.cityId)){
        ErrorResponse.message="Something went wrong while creating airport";
        ErrorResponse.error= new AppError(["City ID not found in the incoming request"],StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }

    next();
};

module.exports = {
    validateCreateRequest,
};