const CrudRepository = require("./crud-repository.js");
const {Flight} = require("../models/index.js");
const { where } = require("sequelize");

class FlightRepository extends CrudRepository{
    constructor(){
        super(Flight);
    }

    async getAllFlights(filter){
        const response = await Flight.findAll({
            where:filter
        });
        return response;
    }
};

module.exports = FlightRepository;
