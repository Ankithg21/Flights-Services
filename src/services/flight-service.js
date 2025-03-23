const {FlightRepository} = require("../repositories/index.js");
const {StatusCodes} = require("http-status-codes");
const AppError = require("../utils/errors/app-error");
const {Op} = require("sequelize");

const flightRepository = new FlightRepository();

async function createFlight(data){
    try {
        const flight = await flightRepository.create(data);
        return flight;
    } catch (error) {
        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach( err => {
                explanation.push(err.message);
            });
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Cannot create new Flight object",StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

async function getAllFlights(query){
    let customFilters={};
    if(query.trips){
        [departureAirportId, arrivalAirportId] = query.trips.split("-");
        customFilters.departureAirportId = departureAirportId;
        customFilters.arrivalAirportId = arrivalAirportId;
    }
    if(query.price){
        [minPrice,maxPrice] = query.price.split("-");
        customFilters.price={
            [Op.between]:[minPrice,((maxPrice == undefined)?20000:maxPrize)],
        }
    }
    try {
        const flights = await flightRepository.getAllFlights(customFilters);
        return flights;
    } catch (error) {
        throw new AppError("Cannot fetch data of all Flights",StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

module.exports = {
    createFlight,
    getAllFlights,
};