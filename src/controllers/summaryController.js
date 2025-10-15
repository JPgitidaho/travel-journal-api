import Trip from "../models/tripModel.js"
import Destination from "../models/destinationModel.js"
import Journal from "../models/journalModel.js"

export const getSummary = async (req, res) => {
  try {
    const trips = await Trip.find()
    const destinations = await Destination.find()
    const journals = await Journal.find()
    res.status(200).json({ trips, destinations, journals })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
