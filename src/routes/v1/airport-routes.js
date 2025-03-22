const express = require("express");
const router = express.Router();
const {AirportMiddlewares} = require("../../middlewares/index.js");
const {AirportController} = require("../../controllers/index.js");

// /api/v1/airport POST
router.post(
    "/",
    AirportMiddlewares.validateCreateRequest,
    AirportController.createAirport
);

// /api/v1/airport GET
router.get(
    "/",
    AirportController.getAirports
);

// /api/v1/airport/:id GET
router.get(
    "/:id",
    AirportController.getAirport
);

// /api/v1/airport/:id DELETE
router.delete(
    "/:id",
    AirportController.destroyAirport
);

module.exports = router;