import express from "express";
import { getUserProfile, login, logout, register } from "../controllers/userController.js"
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile").get(isAuthenticated,getUserProfile);
router.route("/logout").get(logout);

export default router;