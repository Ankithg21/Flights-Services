const express = require("express");
const router = express.Router();
const {CityController} = require("../../controllers/index.js");
const {CityMiddlewares} = require("../../middlewares/index.js");

// /api/v1/cities POST
router.post(
    "/",
    CityMiddlewares.validateCreateRequest,
    CityController.createCity
);

// /api/v1/cities/:id DELETE
router.delete(
    "/:id",
    CityController.destroyCity
);

// /api/v1/cities/:id PATCH
router.patch(
    "/:id",
    CityController.updateCity
);

module.exports = router;