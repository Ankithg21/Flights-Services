const {AirportRepository} = require("../repositories/index.js");
const {StatusCodes} = require("http-status-codes");
const AppError = require("../utils/errors/app-error");

const airportRepository = new AirportRepository();

async function createAirport(data){
    try {
        const airport = await airportRepository.create(data);
        return airport;
    } catch (error) {
        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach( err => {
                explanation.push(err.message);
            });
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Cannot create new Airport object",StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

async function getAirports(){
    try {
        const airport = await airportRepository.getAll();
        return airport; 
    } catch (error) {
        throw new AppError("Cannot Fetch data of all airports",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirport(id){
    try {
        const airport = await airportRepository.get(id);
        return airport;
    } catch (error) {
        if(error.statusCode === StatusCodes.NOT_FOUND){
            throw new AppError("The Airport you requested is not present!",StatusCodes.NOT_FOUND);
        }
        throw new AppError("Cannot Fetch data of Specified Airport",StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

async function destroyAirport(id){
    try {
        const response = await airportRepository.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode === StatusCodes.NOT_FOUND){
            throw new AppError("The Airport you requested to Delete is not present!",StatusCodes.NOT_FOUND);
        }
        throw new AppError("Not Deleted",StatusCodes.NOT_FOUND);
    }
};

async function updateAirport(id,data){
    try {
        const airport = await airportRepository.update(id, data);
        return airport;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('Airport with the requested ID do not exists', error.statusCode);
        }
        throw new AppError('Cannot update the data of requested airport', StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport,
};