const express = require("express");
const router = express.Router();
const {AirplaneMiddlewares} = require("../../middlewares/index.js");
const {AirplaneController} = require("../../controllers/index.js");

// /api/v1/airplanes POST
router.post(
    "/",
    AirplaneMiddlewares.validateCreateRequest,
    AirplaneController.createAirplane
);

// /api/v1/airplanes GET
router.get(
    "/",
    AirplaneController.getAirplanes
);

module.exports = router;