import { Router } from "express";
import { getUserProfile } from "../controllers/user/profileController.js";
import { registerUser } from "../controllers/user/regController.js";
import handleValidation from "../utils/handleValidation.js";
import { registrationValidator } from "../validations.js";
import { protect } from "../utils/authMiddleware.js";
import { authUser } from "../controllers/user/authController.js";
const router = Router();
router.get("/profile", protect, getUserProfile);
router.post("/", registrationValidator, handleValidation, registerUser);
router.post("/login", registrationValidator, handleValidation, authUser);

export default router;
