import { Router } from "express";
import { getUserProfile } from "../controllers/user/profileController.js";
import { registerUser } from "../controllers/user/regController.js";
import handleValidation from "../utils/handleValidation.js";
import { registrationValidator } from "../validations.js";
import { protect } from "../utils/authMiddleware.js";
import { authUser } from "../controllers/user/authController.js";
const router = Router();
router.route("/profile").get(protect, getUserProfile);
router.route("/").post(registrationValidator, handleValidation, registerUser);
router.route("/login").post(registrationValidator, handleValidation, authUser);

export default router;
