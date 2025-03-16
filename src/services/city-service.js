const {CityRepository} = require("../repositories/index.js");
const {StatusCodes} = require("http-status-codes");
const AppError = require("../utils/errors/app-error");

const cityRepository = new CityRepository();

async function createCity(data){
    try {
        const city = await cityRepository.create(data);
        return city;
    } catch (error) {
        console.log(error);
        if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError'){
            let explanation = [];
            error.errors.forEach( err => {
                explanation.push(err.message);
            });
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Cannot create new City object",StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

async function deleteCity(id){
    try {
        const response = await cityRepository.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode === StatusCodes.NOT_FOUND){
            throw new AppError("The City you requested to Delete is not present!",StatusCodes.NOT_FOUND);
        }
        throw new AppError("Not Deleted",StatusCodes.NOT_FOUND);
    }
}

async function updateCity(id,data){
    try {
        const response = await cityRepository.update(id, data);
        return response;
    } catch (error) {
        console.log(error);
        if (error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('City with the requested ID do not exists', error.statusCode);
        }
        throw new AppError('Cannot update the data of requested City', StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

module.exports = {
    createCity,
    deleteCity,
    updateCity,
}