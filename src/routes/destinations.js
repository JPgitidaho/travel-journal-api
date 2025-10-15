import express from "express";
import {
  createDestination,
  getDestinations,
  getDestinationById,
  updateDestination,
  deleteDestination
} from "../controllers/destinationController.js";
import { validateDestination } from "../middleware/validation.js";

const router = express.Router();

router.post("/", validateDestination, createDestination);
router.get("/", getDestinations);
router.get("/:id", getDestinationById);
router.put("/:id", validateDestination, updateDestination);
router.delete("/:id", deleteDestination);

export default router;
