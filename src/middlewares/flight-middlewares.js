const {StatusCodes} = require("http-status-codes");
const {ErrorResponse} = require("../utils/common/index.js");
const AppError = require("../utils/errors/app-error.js");

function validateCreateRequest(req,res,next){
    if(!(req.body.flightNumber)){
        ErrorResponse.message="Something went wrong while creating Flight";
        ErrorResponse.error= new AppError(["Flight Number not found in the incoming request"],StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }

    if(!(req.body.airplaneId)){
        ErrorResponse.message="Something went wrong while creating Airplane ID.";
        ErrorResponse.error= new AppError(["Airplane ID not found in the incoming request"],StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }

    if(!(req.body.departureAirportId)){
        ErrorResponse.message="Something went wrong while creating Flight";
        ErrorResponse.error= new AppError(["Departure Airport ID not found in the incoming request"],StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }

    if(!(req.body.arrivalAirportId)){
        ErrorResponse.message="Something went wrong while creating Flight";
        ErrorResponse.error= new AppError(["Arrival Airport ID not found in the incoming request"],StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }

    if(!(req.body.arrivalTime)){
        ErrorResponse.message="Something went wrong while creating Flight";
        ErrorResponse.error= new AppError(["Arrival Time not found in the incoming request"],StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }

    if(!(req.body.departureTime)){
        ErrorResponse.message="Something went wrong while creating Flight";
        ErrorResponse.error= new AppError(["Departure Time not found in the incoming request"],StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }

    if(!(req.body.price)){
        ErrorResponse.message="Something went wrong while creating Flight";
        ErrorResponse.error= new AppError(["Price not found in the incoming request"],StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }

    if(!(req.body.totalSeats)){
        ErrorResponse.message="Something went wrong while creating Flight";
        ErrorResponse.error= new AppError(["Total Seats not found in the incoming request"],StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }

    next();
};

function checkDepartureAndArrivalTime(req,res,next){
    const departureTime=req.body.departureTime;
    const arrivalTime=req.body.arrivalTime;
    if(departureTime > arrivalTime){
        ErrorResponse.message="Arrival time shld be greater than departure time";
        ErrorResponse.error=new AppError(["watch out Departure and Arrival Time"],StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateRequest,
    checkDepartureAndArrivalTime,
};