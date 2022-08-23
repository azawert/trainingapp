import { Router } from "express";
import handleValidation from "../utils/handleValidation.js";
import { workoutValidator } from "../validations.js";
import { protect } from "../utils/authMiddleware.js";
import {
  addNewWorkout,
  getWorkout,
} from "../controllers/workout/workoutController.js";

const router = Router();
router.post("/", workoutValidator, handleValidation, protect, addNewWorkout);
router.get("/:id", protect, getWorkout);

export default router;
