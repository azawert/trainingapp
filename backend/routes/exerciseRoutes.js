import { Router } from "express";
import handleValidation from "../utils/handleValidation.js";
import { exerciseValidator } from "../validations.js";
import { protect } from "../utils/authMiddleware.js";
import { addNewExercise } from "../controllers/exercise/mainController.js";
import { createNewExerciseLog } from "../controllers/exercise/log/createController.js";
import { getExerciseLog } from "../controllers/exercise/log/getController.js";
import {
  updateCompleteExerciseLog,
  updateExerciseLog,
} from "../controllers/exercise/log/updateController.js";

const router = Router();
router.post("/", exerciseValidator, handleValidation, protect, addNewExercise);
router.post("/log", protect, createNewExerciseLog);
router.get("/log/:id", protect, getExerciseLog);
router.put("/log", protect, updateExerciseLog);
router.put("/log/completed", protect, updateCompleteExerciseLog);

export default router;
