const {AirplaneService} = require("../services/index.js");
const {StatusCodes} = require("http-status-codes");
const {SuccessResponse, ErrorResponse} = require("../utils/common");
async function createAirplane(req,res){
    try {
        console.log(req.body);
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        });
        SuccessResponse.message="Successfully created an airplane";
        SuccessResponse.data = airplane;
        return res
        .status(StatusCodes.CREATED)
        .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = "Something went wrong while creating airplane";
        ErrorResponse.error = error;
        return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ErrorResponse);
    }
}

module.exports = {
    createAirplane,
}