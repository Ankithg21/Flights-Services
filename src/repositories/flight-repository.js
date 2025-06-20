const CrudRepository = require("./crud-repository.js");
const {Flight, Airplane, Airport, City} = require("../models/index.js");
const { Sequelize, where } = require("sequelize");

class FlightRepository extends CrudRepository{
    constructor(){
        super(Flight);
    }

    async getAllFlights(filter,sort){
        const response = await Flight.findAll({
            where:filter,
            order:sort,
            include: [
                {
                    model: Airplane,
                    required: true,
                    as:'airplane_details'
                },
                {
                    model:Airport,
                    required:true,
                    as:'departure_airport',
                    on:{
                        col1:Sequelize.where(Sequelize.col("Flight.departureAirportId"),"=",Sequelize.col("departure_airport.code")),                    
                    },
                    include:{
                        model:City,
                        required:true,
                    }
                },
                {
                    model:Airport,
                    required:true,
                    as:'arrival_airport',
                    on:{
                        col1:Sequelize.where(Sequelize.col("Flight.arrivalAirportId"),"=",Sequelize.col("arrival_airport.code")),                    
                    },
                    include:{
                        model:City,
                        required:true,
                    }
                }
            ]  
        });
        return response;
    }
};

module.exports = FlightRepository;
