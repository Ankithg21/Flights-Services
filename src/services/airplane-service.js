const {AirplaneRepository} = require("../repositories/index.js");
const {StatusCodes} = require("http-status-codes");
const AppError = require("../utils/errors/app-error");

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data){
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch (error) {
        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach( err => {
                explanation.push(err.message);
            });
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Cannot create new Airplane object",StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

async function getAirplanes(){
    try {
        const airplanes = await airplaneRepository.getAll();
        return airplanes; 
    } catch (error) {
        throw new AppError("Cannot Fetch data of all airplanes",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplane(id){
    try {
        const airplane = await airplaneRepository.get(id);
        return airplane;
    } catch (error) {
        if(error.statusCode === StatusCodes.NOT_FOUND){
            throw new AppError("The Airplane you requested is not present!",StatusCodes.NOT_FOUND);
        }
        throw new AppError("Cannot Fetch data of Specified Airplane",StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

async function destroyAirplane(id){
    try {
        const response = await airplaneRepository.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode === StatusCodes.NOT_FOUND){
            throw new AppError("The Airplane you requested to Delete is not present!",StatusCodes.NOT_FOUND);
        }
        throw new AppError("Not Deleted",StatusCodes.NOT_FOUND);
    }
};

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
};