const express = require("express");
const router = express.Router();
const {FlightMiddlewares} = require("../../middlewares/index.js");
const {FlightController} = require("../../controllers/index.js");

// /api/v1/flights POST
router.post(
    "/",
    FlightMiddlewares.validateCreateRequest,
    FlightMiddlewares.checkDepartureAndArrivalTime,
    FlightController.createFlight
);


// /api/v1/flights?trips=BLR-DEL GET
router.get(
    "/",
    FlightController.getAllFlights
);

module.exports = router;

