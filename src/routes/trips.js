import express from "express";
import { createTrip, getTrips, getTripById, updateTrip, deleteTrip } from "../controllers/tripController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createTrip);
router.get("/", auth, getTrips);
router.get("/:id", auth, getTripById);
router.put("/:id", auth, updateTrip);
router.delete("/:id", auth, deleteTrip);

export default router;
