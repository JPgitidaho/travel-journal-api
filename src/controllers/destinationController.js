import Destination from "../models/Destination.js";

export const createDestination = async (req, res) => {
  try {
    const destination = new Destination(req.body);
    await destination.save();
    res.status(201).json({ message: "Destination created", destination });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) return res.status(404).json({ error: "Destination not found" });
    res.status(200).json(destination);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!destination) return res.status(404).json({ error: "Destination not found" });
    res.status(200).json({ message: "Destination updated", destination });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);
    if (!destination) return res.status(404).json({ error: "Destination not found" });
    res.status(200).json({ message: "Destination deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
