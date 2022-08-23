import { Router } from "express";
import handleValidation from "../utils/handleValidation.js";
import { exerciseValidator } from "../validations.js";
import { protect } from "../utils/authMiddleware.js";
import { addNewExercise } from "../controllers/exercise/mainController.js";
import { createNewExerciseLog } from "../controllers/exercise/logController.js";

const router = Router();
router.post("/", exerciseValidator, handleValidation, protect, addNewExercise);
router.post("/log", protect, createNewExerciseLog);

export default router;
