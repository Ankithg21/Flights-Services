const {AirplaneRepository} = require("../repositories/index.js");

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data){
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createAirplane,
};