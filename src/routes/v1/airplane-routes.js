const express = require("express");
const router = express.Router();
const {AirplaneMiddlewares} = require("../../middlewares/index.js");
const {AirplaneController} = require("../../controllers/index.js");

router.post(
    "/",
    AirplaneMiddlewares.validateCreateRequest,
    AirplaneController.createAirplane
);

module.exports = router;