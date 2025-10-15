import express from "express"
import { getSummary } from "../controllers/summaryController"

const router = express.Router()
router.get("/all", getSummary)
export default router
