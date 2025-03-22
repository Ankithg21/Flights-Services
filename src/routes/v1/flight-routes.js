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

module.exports = router;