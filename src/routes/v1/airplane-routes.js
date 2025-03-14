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

// /api/v1/airplanes/:id GET
router.get(
    "/:id",
    AirplaneController.getAirplane
);

// /api/v1/airplanes/:id DELETE
router.delete(
    "/:id",
    AirplaneController.destroyAirplane
);

router.patch(
    "/:id",
    AirplaneController.updateAirplane
);

module.exports = router;