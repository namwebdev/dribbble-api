const { Trip, Station } = require("../models/index");

const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.findAll({
      include: [
        {
          model: Station,
          as: "from",
        },
        {
          model: Station,
          as: "to",
        },
      ],
    });
    res.status(200).json({ data: trips || [] });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

const createTrip = async (req, res) => {
  const { from_station, to_station, start_time, price } = req.body;
  try {
    const newTrip = await Trip.create({
      from_station,
      to_station,
      start_time,
      price,
    });
    res
      .status(201)
      .json({ message: "Create Trip successfully", data: newTrip });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = { getAllTrips, createTrip };
