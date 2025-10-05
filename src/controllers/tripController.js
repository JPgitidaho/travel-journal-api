import Trip from "../models/Trip.js";

export const createTrip = async (req, res) => {
  try {
    const trip = new Trip({ ...req.body, user: req.user.id });
    await trip.save();
    res.status(201).json({ message: "Trip created", trip });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user.id });
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, user: req.user.id });
    if (!trip) return res.status(404).json({ error: "Trip not found" });
    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!trip) return res.status(404).json({ error: "Trip not found" });
    res.status(200).json({ message: "Trip updated", trip });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!trip) return res.status(404).json({ error: "Trip not found" });
    res.status(200).json({ message: "Trip deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
