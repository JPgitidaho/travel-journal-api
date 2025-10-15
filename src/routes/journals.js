import express from "express";
import {
  createJournal,
  getJournals,
  getJournalById,
  updateJournal,
  deleteJournal
} from "../controllers/journalController.js";
import auth from "../middleware/auth.js";
import { validateJournal } from "../middleware/validation.js";

const router = express.Router();

router.post("/", auth, validateJournal, createJournal);
router.get("/", auth, getJournals);
router.get("/:id", auth, getJournalById);
router.put("/:id", auth, validateJournal, updateJournal);
router.delete("/:id", auth, deleteJournal);

export default router;
