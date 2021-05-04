const express = require("express");
const { createTrip, getAllTrips } = require("../controllers/trip.controllers");
const { authenticate } = require("../middlewares/auth/authenticate");
const tripRouter = express.Router();

tripRouter.get("/", authenticate, getAllTrips);
tripRouter.post("/", authenticate, createTrip);
// tripRouter.delete(
//   "/:id",
//   authenticate,
//   deleteStation
// );

module.exports = { tripRouter };
