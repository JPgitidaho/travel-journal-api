import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String },
  image: { type: String }
});

export default mongoose.model("Destination", destinationSchema);
